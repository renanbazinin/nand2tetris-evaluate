/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assert, assertExists } from "@davidsouther/jiffies/lib/esm/assert.js";
import { range } from "@davidsouther/jiffies/lib/esm/range.js";
import { Err, isErr, Ok, } from "@davidsouther/jiffies/lib/esm/result.js";
import { bin } from "../util/twos.js";
import { Clock } from "./clock.js";
export const HIGH = 1;
export const LOW = 0;
export function isConstantPin(pinName) {
    return (pinName === "false" ||
        pinName === "true" ||
        pinName === "0" ||
        pinName === "1");
}
export class Bus {
    name;
    width;
    state;
    next = [];
    constructor(name, width = 1) {
        this.name = name;
        this.width = width;
        this.state = range(0, this.width).map(() => LOW);
    }
    ensureWidth(newWidth) {
        assert(newWidth <= 16, `Cannot widen past 16 to ${newWidth} bits`);
        if (this.width < newWidth) {
            this.width = newWidth;
            this.state = [
                ...this.state,
                ...range(this.width, newWidth).map(() => LOW),
            ];
        }
    }
    connect(next) {
        this.next.push(next);
        next.busVoltage = this.busVoltage;
    }
    pull(voltage, bit = 0) {
        assert(bit >= 0 && bit < this.width, `Bit out of bounds: ${this.name}@${bit}`);
        this.state[bit] = voltage;
        this.next.forEach((n) => n.pull(voltage, bit));
    }
    voltage(bit = 0) {
        assert(bit >= 0 && bit < this.width);
        return this.state[bit];
    }
    set busVoltage(voltage) {
        for (const i of range(0, this.width)) {
            this.state[i] = ((voltage & (1 << i)) >> i);
        }
        this.next.forEach((n) => (n.busVoltage = this.busVoltage));
    }
    get busVoltage() {
        return range(0, this.width).reduce((b, i) => b | (this.state[i] << i), 0);
    }
    toggle(bit = 0) {
        const nextVoltage = this.voltage(bit) === LOW ? HIGH : LOW;
        this.pull(nextVoltage, bit);
    }
}
export class InSubBus extends Bus {
    bus;
    start;
    width;
    constructor(bus, start, width = 1) {
        super(bus.name);
        this.bus = bus;
        this.start = start;
        this.width = width;
        assert(start >= 0 && start + width <= bus.width, `Mismatched InSubBus dimensions on ${bus.name} (${width} + ${start} > ${bus.width})`);
        this.connect(bus);
    }
    pull(voltage, bit = 0) {
        assert(bit >= 0 && bit < this.width);
        this.bus.pull(voltage, this.start + bit);
    }
    voltage(bit = 0) {
        assert(bit >= 0 && bit < this.width);
        return this.bus.voltage(this.start + bit);
    }
    set busVoltage(voltage) {
        const high = this.bus.busVoltage & ~mask(this.width + this.start);
        const low = this.bus.busVoltage & mask(this.start);
        const mid = (voltage & mask(this.width)) << this.start;
        this.bus.busVoltage = high | mid | low;
    }
    get busVoltage() {
        return (this.bus.busVoltage >> this.start) & mask(this.width);
    }
    connect(bus) {
        assert(this.start + this.width <= bus.width, `Mismatched InSubBus connection dimensions (From ${bus.name} to ${this.name})`);
        this.bus = bus;
    }
}
export class OutSubBus extends Bus {
    bus;
    start;
    width;
    constructor(bus, start, width = 1) {
        super(bus.name);
        this.bus = bus;
        this.start = start;
        this.width = width;
        assert(start >= 0 && width <= bus.width, `Mismatched OutSubBus dimensions`);
        this.connect(bus);
    }
    pull(voltage, bit = 0) {
        if (bit >= this.start && bit < this.start + this.width) {
            this.bus.pull(voltage, bit - this.start);
        }
    }
    set busVoltage(voltage) {
        this.bus.busVoltage =
            (voltage & mask(this.width + this.start)) >> this.start;
    }
    get busVoltage() {
        return (this.bus.busVoltage >> this.start) & mask(this.width);
    }
    connect(bus) {
        assert(this.width <= bus.width, `Mismatched OutSubBus connection dimensions`);
        this.bus = bus;
    }
}
export class ConstantBus extends Bus {
    value;
    constructor(name, value) {
        super(name, 16 /* TODO: get high bit index */);
        this.value = value;
    }
    pullHigh(_ = 0) {
        return undefined;
    }
    pullLow(_ = 0) {
        return undefined;
    }
    voltage(_ = 0) {
        return (this.busVoltage & 0x1);
    }
    set busVoltage(voltage) {
        // Noop
    }
    get busVoltage() {
        return this.value;
    }
}
export const TRUE_BUS = new ConstantBus("true", 0xffff);
export const FALSE_BUS = new ConstantBus("false", 0);
export function parsePinDecl(toPin) {
    const { pin, w } = toPin.match(/(?<pin>[a-zA-Z]+)(\[(?<w>\d+)\])?/)
        ?.groups;
    return {
        pin,
        width: w ? Number(w) : 1,
    };
}
export function parseToPin(toPin) {
    const { pin, i, j } = toPin.match(/(?<pin>[a-z]+)(\[(?<i>\d+)(\.\.(?<j>\d+))?\])?/)?.groups;
    return {
        pin,
        start: i ? Number(i) : undefined,
        end: j ? Number(j) : undefined,
    };
}
export class Pins {
    map = new Map();
    insert(pin) {
        const { name } = pin;
        assert(!this.map.has(name), `Pins already has ${name}!`);
        this.map.set(name, pin);
    }
    emplace(name, minWidth) {
        if (this.has(name)) {
            return assertExists(this.get(name));
        }
        else {
            const pin = new Bus(name, minWidth);
            this.insert(pin);
            return pin;
        }
    }
    has(pin) {
        return this.map.has(pin);
    }
    get(pin) {
        return this.map.get(pin);
    }
    entries() {
        return this.map.values();
    }
    [Symbol.iterator]() {
        return this.map[Symbol.iterator]();
    }
}
function validateWidth(start, width, pin) {
    return start + width <= pin.width
        ? Ok()
        : Err(`Sub-bus index out of range (${pin.name} has width ${pin.width})`);
}
let id = 0;
export class Chip {
    name;
    id = id++;
    ins = new Pins();
    outs = new Pins();
    pins = new Pins();
    insToPart = new Map();
    partToOuts = new Map();
    parts = [];
    clockedPins;
    clockSubscription;
    get clocked() {
        if (this.clockedPins.size > 0) {
            return true;
        }
        for (const part of this.parts) {
            if (part.clocked)
                return true;
        }
        return false;
    }
    constructor(ins, outs, name, internals = [], clocked = []) {
        this.name = name;
        for (const inn of ins) {
            const { pin, width = 1 } = inn.pin !== undefined
                ? inn
                : parsePinDecl(inn);
            this.ins.insert(new Bus(pin, width));
        }
        for (const out of outs) {
            const { pin, width = 1 } = out.pin !== undefined
                ? out
                : parsePinDecl(out);
            this.outs.insert(new Bus(pin, width));
        }
        for (const internal of internals) {
            const { pin, width = 1 } = internal.pin !== undefined
                ? internal
                : parsePinDecl(internal);
            this.pins.insert(new Bus(pin, width));
        }
        this.clockedPins = new Set(clocked);
        this.subscribeToClock();
    }
    subscribeToClock() {
        this.clockSubscription?.unsubscribe();
        this.clockSubscription = Clock.subscribe(() => this.eval());
    }
    reset() {
        for (const [_, pin] of this.ins) {
            pin.busVoltage = 0;
        }
        for (const part of this.parts) {
            part.reset();
        }
        this.eval();
    }
    in(pin = "in") {
        assert(this.hasIn(pin), `No in pin ${pin}`);
        return assertExists(this.ins.get(pin));
    }
    out(pin = "out") {
        assert(this.hasOut(pin), `No in pin ${pin}`);
        return assertExists(this.outs.get(pin));
    }
    hasIn(pin) {
        return this.ins.has(pin);
    }
    hasOut(pin) {
        return this.outs.has(pin);
    }
    pin(name) {
        assert(this.pins.has(name), "Pin not available in ");
        return assertExists(this.pins.get(name));
    }
    get(name, offset) {
        if (this.ins.has(name)) {
            return assertExists(this.ins.get(name));
        }
        if (this.outs.has(name)) {
            return assertExists(this.outs.get(name));
        }
        if (this.pins.has(name)) {
            return assertExists(this.pins.get(name));
        }
        return this.getBuiltin(name, offset);
    }
    getBuiltin(name, offset = 0) {
        if (BUILTIN_NAMES.includes(name)) {
            for (const part of this.parts) {
                const pin = part.get(name, offset);
                if (pin) {
                    return pin;
                }
            }
        }
        return undefined;
    }
    isInPin(pin) {
        return this.ins.has(pin);
    }
    isOutPin(pin) {
        return this.outs.has(pin);
    }
    isExternalPin(pin) {
        return this.isInPin(pin) || this.isOutPin(pin) || isConstantPin(pin);
    }
    isInternalPin(pin) {
        return !this.isExternalPin(pin);
    }
    pathExists(start, end) {
        const nodes = [start];
        while (nodes.length > 0) {
            const node = assertExists(nodes.pop());
            if (typeof node == "string") {
                if (node == end) {
                    return true;
                }
                nodes.push(...(this.insToPart.get(node) ?? []));
            }
            else {
                nodes.push(...(this.partToOuts.get(node) ?? []));
            }
        }
        return false;
    }
    isClockedPin(pin) {
        if (this.isInPin(pin)) {
            return ![...this.outs].some(([out, _]) => this.pathExists(pin, out));
        }
        else {
            return ![...this.ins].some(([in_, _]) => this.pathExists(in_, pin));
        }
    }
    hasConnection(from, to) {
        return [...(this.partToOuts.get(from) ?? [])].some((pin) => this.insToPart.get(pin)?.has(to));
    }
    wire(part, connections) {
        for (let i = 0; i < connections.length; i++) {
            const { from, to } = connections[i];
            if (part.isOutPin(to.name)) {
                const result = this.wireOutPin(part, to, from);
                if (isErr(result)) {
                    return Err({
                        wireIndex: i,
                        lhs: Err(result).lhs,
                        message: Err(result).message,
                    });
                }
            }
            else {
                const result = this.wireInPin(part, to, from);
                if (isErr(result)) {
                    return Err({
                        wireIndex: i,
                        lhs: Err(result).lhs,
                        message: Err(result).message,
                    });
                }
            }
        }
        this.parts.push(part);
        return Ok();
    }
    wireAll(wires) {
        for (const { part, connections } of wires) {
            this.wire(part, connections);
        }
        this.sortParts();
    }
    // Returns whether the part connection graph has a loop. This should be called
    // after wiring pins, so that connections are sorted topologically to best
    // simulate non-order-dependent wiring. This can be handled manually (OrB),
    // by calling sortParts() after wiring (OrA), or by using wireAll for creating
    // wires (OrC).
    sortParts() {
        const sorted = [];
        const visited = new Set();
        const visiting = new Set();
        const stack = this.parts.map((part) => ({
            part,
            isReturning: false,
        }));
        while (stack.length > 0) {
            const node = assertExists(stack.pop());
            if (node.isReturning) {
                // If we are returning to this node, we can safely add it to the sorted list
                visited.add(node.part);
                sorted.push(node.part);
            }
            else if (!visited.has(node.part)) {
                if (visiting.has(node.part)) {
                    return true;
                }
                visiting.add(node.part);
                // Re-push this node to handle it on return
                stack.push({ part: node.part, isReturning: true });
                // Push all its children to visit them
                for (const out of this.partToOuts.get(node.part) ?? []) {
                    stack.push(...Array.from(this.insToPart.get(out) ?? [])
                        .filter((part) => !visited.has(part))
                        .map((part) => ({
                        part,
                        isReturning: false,
                    })));
                }
            }
        }
        this.parts = sorted.reverse();
        return false;
    }
    findPin(from, minWidth) {
        if (from === "true" || from === "1") {
            return TRUE_BUS;
        }
        if (from === "false" || from === "0") {
            return FALSE_BUS;
        }
        if (this.ins.has(from)) {
            return assertExists(this.ins.get(from));
        }
        if (this.outs.has(from)) {
            return assertExists(this.outs.get(from));
        }
        return this.pins.emplace(from, minWidth);
    }
    wireOutPin(part, to, from) {
        const partPin = assertExists(part.outs.get(to.name), () => `Cannot wire to missing pin ${to.name}`);
        to.width ??= partPin.width;
        let chipPin = this.findPin(from.name, from.width ?? to.width);
        const isInternal = this.pins.has(chipPin.name);
        from.width ??= chipPin.width;
        if (chipPin instanceof ConstantBus) {
            return Err({
                message: `Cannot wire to constant bus`,
                lhs: true,
            });
        }
        // Widen internal pins
        if (isInternal && chipPin instanceof Bus) {
            chipPin.ensureWidth(from.start + from.width);
        }
        // Wrap the chipPin in an InBus when the chip side is dimensioned
        if (from.start > 0 || from.width !== chipPin.width) {
            const result = validateWidth(from.start, from.width, chipPin);
            if (isErr(result)) {
                return Err({
                    message: Err(result),
                    lhs: true,
                });
            }
            chipPin = new InSubBus(chipPin, from.start, from.width);
        }
        // Wrap the chipPin in an OutBus when the part side is dimensioned
        if (to.start > 0 || to.width !== partPin.width) {
            const result = validateWidth(to.start, to.width, partPin);
            if (isErr(result)) {
                return Err({
                    message: Err(result),
                    lhs: false,
                });
            }
            chipPin = new OutSubBus(chipPin, to.start, to.width);
        }
        if (!part.clockedPins.has(partPin.name)) {
            const partToOuts = this.partToOuts.get(part) ?? new Set();
            partToOuts.add(chipPin.name);
            this.partToOuts.set(part, partToOuts);
        }
        const loop = this.sortParts();
        if (loop) {
            const partToOuts = this.partToOuts.get(part) ?? new Set();
            partToOuts.delete(chipPin.name);
            this.partToOuts.set(part, partToOuts);
            return Err({ message: "Circular pin dependency", lhs: false });
        }
        else {
            partPin.connect(chipPin);
        }
        return Ok();
    }
    wireInPin(part, to, from) {
        let partPin = assertExists(part.ins.get(to.name), () => `Cannot wire to missing pin ${to.name}`);
        to.width ??= partPin.width;
        const chipPin = this.findPin(from.name, from.width ?? to.width);
        from.width ??= chipPin.width;
        // Wrap the partPin in an InBus when the part side is dimensioned
        if (to.start > 0 || to.width !== partPin.width) {
            const result = validateWidth(to.start, to.width, partPin);
            if (isErr(result)) {
                return Err({
                    message: Err(result),
                    lhs: true,
                });
            }
            partPin = new InSubBus(partPin, to.start, to.width);
        }
        // Wrap the partPin in an OutBus when the chip side is dimensioned
        if (!["true", "false"].includes(chipPin.name)) {
            if (from.start > 0 || from.width !== chipPin.width) {
                const result = validateWidth(from.start, from.width, chipPin);
                if (isErr(result)) {
                    return Err({
                        message: Err(result),
                        lhs: false,
                    });
                }
                partPin = new OutSubBus(partPin, from.start, from.width);
            }
        }
        if (!part.clockedPins.has(partPin.name)) {
            const pinsToPart = this.insToPart.get(chipPin.name) ?? new Set();
            pinsToPart.add(part);
            this.insToPart.set(chipPin.name, pinsToPart);
        }
        const loop = this.sortParts();
        if (loop) {
            const pinsToPart = this.insToPart.get(chipPin.name) ?? new Set();
            pinsToPart.delete(part);
            this.insToPart.set(chipPin.name, pinsToPart);
            return Err({ message: "Circular pin dependency", lhs: true });
        }
        else {
            chipPin.connect(partPin);
        }
        return Ok();
    }
    eval() {
        for (const chip of this.parts) {
            TRUE_BUS.next.forEach((pin) => (pin.busVoltage = TRUE_BUS.busVoltage));
            FALSE_BUS.next.forEach((pin) => (pin.busVoltage = FALSE_BUS.busVoltage));
            chip.eval();
        }
    }
    tick() {
        this.eval();
    }
    tock() {
        this.eval();
    }
    remove() {
        this.clockSubscription?.unsubscribe();
        for (const part of this.parts) {
            part.remove();
        }
    }
    // For the ROM32K builtin to load from a file system
    async load(fs, path) {
        for (const part of this.parts) {
            if (part.name === "ROM32K") {
                await part.load(fs, path);
            }
        }
    }
}
export class Low extends Chip {
    constructor() {
        super([], []);
        this.outs.insert(FALSE_BUS);
    }
}
export class High extends Chip {
    constructor() {
        super([], []);
        this.outs.insert(TRUE_BUS);
    }
}
export class ClockedChip extends Chip {
    get clocked() {
        return true;
    }
    subscribeToClock() {
        this.clockSubscription?.unsubscribe();
        this.clockSubscription = Clock.subscribe(({ level }) => {
            if (level === LOW) {
                this.tock();
            }
            else {
                this.tick();
            }
        });
    }
    remove() {
        this.clockSubscription?.unsubscribe();
        super.remove();
    }
    reset() {
        super.reset();
        this.tick();
        this.tock();
    }
}
function mask(width) {
    return Math.pow(2, width) - 1;
}
function setBus(busses, pin) {
    busses[pin.name] = bin((pin.busVoltage & mask(pin.width)) <<
        pin.start);
    return busses;
}
export function printChip(chip) {
    return {
        id: chip.id,
        name: chip.name ?? chip.constructor.name,
        ins: [...chip.ins.entries()].reduce(setBus, {}),
        outs: [...chip.outs.entries()].reduce(setBus, {}),
        pins: [...chip.pins.entries()].reduce(setBus, {}),
        children: [...chip.parts.values()].map(printChip),
    };
}
export const BUILTIN_NAMES = [
    "Register",
    "ARegister",
    "DRegister",
    "PC",
    "RAM8",
    "RAM64",
    "RAM512",
    "RAM4K",
    "RAM16K",
    "ROM32K",
    "Screen",
    "Keyboard",
    "Memory",
];
//# sourceMappingURL=chip.js.map
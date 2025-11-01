import { cpuTick, cpuTock, emptyState, } from "../../../cpu/cpu.js";
import { KEYBOARD_OFFSET, SCREEN_OFFSET, SCREEN_SIZE, } from "../../../cpu/memory.js";
import { load } from "../../../fs.js";
import { int10 } from "../../../util/twos.js";
import { Bus, Chip, ClockedChip, ConstantBus, FALSE_BUS, HIGH, LOW, } from "../../chip.js";
import { RAM, RAM16K } from "../sequential/ram.js";
export class ROM32K extends RAM {
    constructor() {
        super(15, "ROM");
    }
    async load(fs, path) {
        try {
            (await load(fs, path)).map((v, i) => (this.at(i).busVoltage = v));
        }
        catch (cause) {
            // throw new Error(`ROM32K Failed to load file ${path}`, { cause });
            throw new Error(`ROM32K Failed to load file ${path}`);
        }
    }
}
export class Screen extends RAM {
    static SIZE = SCREEN_SIZE;
    static OFFSET = SCREEN_OFFSET;
    constructor() {
        super(13, "Screen");
    }
}
export class Keyboard extends Chip {
    static OFFSET = KEYBOARD_OFFSET;
    constructor() {
        super([], ["out[16]"], "Keyboard");
    }
    getKey() {
        return this.out().busVoltage;
    }
    setKey(key) {
        this.out().busVoltage = key & 0xffff;
    }
    clearKey() {
        this.out().busVoltage = 0;
    }
    get(name) {
        return name === this.name
            ? new ConstantBus(this.name, this.getKey()) // readonly
            : super.get(name);
    }
}
export class Memory extends ClockedChip {
    ram = new RAM16K();
    screen = new Screen();
    keyboard = new Keyboard();
    address = 0;
    constructor() {
        super(["in[16]", "load", "address[15])"], ["out[16]"], "Memory", [], ["in", "load"]);
        this.parts.push(this.keyboard);
        this.parts.push(this.screen);
        this.parts.push(this.ram);
    }
    tick() {
        const load = this.in("load").voltage();
        this.address = this.in("address").busVoltage;
        if (load) {
            const inn = this.in().busVoltage;
            if (this.address > Keyboard.OFFSET) {
                // out of "physical" bounds, should result in some kind of issue...
            }
            if (this.address == Keyboard.OFFSET) {
                // Keyboard, do nothing
            }
            else if (this.address >= Screen.OFFSET) {
                this.screen.at(this.address - Screen.OFFSET).busVoltage = inn;
            }
            else {
                this.ram.at(this.address).busVoltage = inn;
            }
        }
    }
    tock() {
        this.eval();
    }
    eval() {
        if (!this.ram)
            return;
        this.address = this.in("address").busVoltage;
        let out = 0;
        if (this.address > Keyboard.OFFSET) {
            // out of "physical" bounds, should result in some kind of issue...
        }
        else if (this.address == Keyboard.OFFSET) {
            out = this.keyboard?.out().busVoltage ?? 0;
        }
        else if (this.address >= Screen.OFFSET) {
            out = this.screen?.at(this.address - Screen.OFFSET).busVoltage ?? 0;
        }
        else {
            out = this.ram?.at(this.address).busVoltage ?? 0;
        }
        this.out().busVoltage = out;
    }
    in(pin) {
        if (pin?.startsWith("RAM16K")) {
            const idx = int10(pin.match(/\[(?<idx>\d+)]/)?.groups?.idx ?? "0");
            return this.ram.at(idx);
        }
        if (pin?.startsWith("Screen")) {
            const idx = int10(pin.match(/\[(?<idx>\d+)]/)?.groups?.idx ?? "0");
            return this.screen.at(idx);
        }
        if (pin?.startsWith("Keyboard")) {
            return this.keyboard.out();
        }
        return super.in(pin);
    }
    get(name, offset = 0) {
        if (name.startsWith("RAM16K")) {
            return this.at(offset & 0x3fff);
        }
        if (name.startsWith("Screen")) {
            return this.at(offset & (0x1fff + Screen.OFFSET));
        }
        if (name.startsWith("Keyboard")) {
            return this.at(Keyboard.OFFSET);
        }
        if (name.startsWith("Memory")) {
            return this.at(offset);
        }
        return super.get(name, offset);
    }
    at(offset) {
        if (offset > Keyboard.OFFSET) {
            return FALSE_BUS;
        }
        if (offset == Keyboard.OFFSET) {
            return this.keyboard.out();
        }
        if (offset >= Screen.OFFSET) {
            return this.screen.at(offset - Screen.OFFSET);
        }
        return this.ram.at(offset);
    }
    reset() {
        this.address = 0;
        this.ram.reset();
        this.screen.reset();
        super.reset();
    }
}
class DRegisterBus extends Bus {
    cpu;
    constructor(name, cpu) {
        super(name);
        this.cpu = cpu;
    }
    get busVoltage() {
        return this.cpu.D;
    }
    set busVoltage(num) {
        this.cpu.D = num;
    }
}
class ARegisterBus extends Bus {
    cpu;
    constructor(name, cpu) {
        super(name);
        this.cpu = cpu;
    }
    get busVoltage() {
        return this.cpu.A;
    }
    set busVoltage(num) {
        this.cpu.A = num;
    }
}
class PCBus extends Bus {
    cpu;
    constructor(name, cpu) {
        super(name);
        this.cpu = cpu;
    }
    get busVoltage() {
        return this.cpu.PC;
    }
    set busVoltage(num) {
        this.cpu.PC = num;
    }
}
export class CPU extends ClockedChip {
    _state = emptyState();
    get state() {
        return this._state;
    }
    constructor() {
        super(["inM[16]", "instruction[16]", "reset"], ["outM[16]", "writeM", "addressM[15]", "pc[15]"], "CPU", [], ["pc", "addressM", "reset"]);
    }
    tick() {
        const [state, writeM] = cpuTick(this.cpuInput(), this._state);
        this._state = state;
        this.out("writeM").pull(writeM ? HIGH : LOW);
        this.out("outM").busVoltage = this._state.ALU ?? 0;
    }
    tock() {
        if (!this._state)
            return; // Skip initial tock
        const [output, state] = cpuTock(this.cpuInput(), this._state);
        this._state = state;
        this.out("addressM").busVoltage = output.addressM ?? 0;
        this.out("outM").busVoltage = output.outM ?? 0;
        this.out("writeM").pull(output.writeM ? HIGH : LOW);
        this.out("pc").busVoltage = this._state?.PC ?? 0;
    }
    cpuInput() {
        const inM = this.in("inM").busVoltage;
        const instruction = this.in("instruction").busVoltage;
        const reset = this.in("reset").busVoltage === 1;
        return { inM, instruction, reset };
    }
    get(pin, offset) {
        if (pin?.startsWith("ARegister")) {
            return new ARegisterBus("ARegister", this._state);
        }
        if (pin?.startsWith("DRegister")) {
            return new DRegisterBus("DRegister", this._state);
        }
        if (pin?.startsWith("PC")) {
            return new PCBus("PC", this._state);
        }
        return super.get(pin, offset);
    }
    reset() {
        this._state = emptyState();
        // This is a bit of a hack, but because super.reset() does ticktock,
        // we need to set PC to -1, so that it will be 0 after the reset
        this._state.PC = -1;
        super.reset();
    }
}
export class Computer extends Chip {
    cpu = new CPU();
    ram = new Memory();
    rom = new ROM32K();
    constructor() {
        super(["reset"], []);
        this.wire(this.cpu, [
            { from: { name: "reset", start: 0 }, to: { name: "reset", start: 0 } },
            {
                from: { name: "instruction", start: 0 },
                to: { name: "instruction", start: 0 },
            },
            { from: { name: "oldOutM", start: 0 }, to: { name: "inM", start: 0 } },
            { from: { name: "writeM", start: 0 }, to: { name: "writeM", start: 0 } },
            {
                from: { name: "addressM", start: 0 },
                to: { name: "addressM", start: 0 },
            },
            { from: { name: "newInM", start: 0 }, to: { name: "outM", start: 0 } },
            { from: { name: "pc", start: 0 }, to: { name: "pc", start: 0 } },
        ]);
        this.wire(this.rom, [
            { from: { name: "pc", start: 0 }, to: { name: "address", start: 0 } },
            {
                from: { name: "instruction", start: 0 },
                to: { name: "out", start: 0 },
            },
        ]);
        this.wire(this.ram, [
            { from: { name: "newInM", start: 0 }, to: { name: "in", start: 0 } },
            { from: { name: "writeM", start: 0 }, to: { name: "load", start: 0 } },
            {
                from: { name: "addressM", start: 0 },
                to: { name: "address", start: 0 },
            },
            { from: { name: "oldOutM", start: 0 }, to: { name: "out", start: 0 } },
        ]);
        for (const pin of [...this.ins.entries(), ...this.outs.entries()]) {
            if (this.isClockedPin(pin.name)) {
                this.clockedPins.add(pin.name);
            }
        }
    }
    eval() {
        super.eval();
    }
    get(name, offset) {
        if (name.startsWith("PC") ||
            name.startsWith("ARegister") ||
            name.startsWith("DRegister")) {
            return this.cpu.get(name);
        }
        if (name.startsWith("RAM16K")) {
            return this.ram.get(name, offset);
        }
        return super.get(name, offset);
    }
    async load(fs, path) {
        return await this.rom.load(fs, path);
    }
}
//# sourceMappingURL=computer.js.map
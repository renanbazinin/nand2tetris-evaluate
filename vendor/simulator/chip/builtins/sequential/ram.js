import { assert } from "@davidsouther/jiffies/lib/esm/assert.js";
import { Memory as MemoryChip } from "../../../cpu/memory.js";
import { Bus, ClockedChip } from "../../chip.js";
export class RAM extends ClockedChip {
    width;
    _memory;
    _nextData = 0;
    _address = 0;
    get memory() {
        return this._memory;
    }
    get address() {
        return this._address;
    }
    constructor(width, name) {
        super(["in[16]", "load", `address[${width}]`], [`out[16]`], name, [], ["in", "load"]);
        this.width = width;
        this._memory = new MemoryChip(Math.pow(2, this.width));
    }
    tick() {
        const load = this.in("load").voltage();
        this._address = this.in("address").busVoltage;
        if (load) {
            this._nextData = this.in().busVoltage;
            this._memory.set(this._address, this._nextData);
        }
    }
    tock() {
        this.out().busVoltage = this._memory?.get(this._address) ?? 0;
    }
    eval() {
        const address = this.in("address").busVoltage;
        this.out().busVoltage = this._memory?.get(address) ?? 0;
    }
    at(idx) {
        assert(idx < this._memory.size, () => `Request out of bounds (${idx} >= ${this._memory.size})`);
        return new RamBus(`${this.name}[${idx}]`, idx, this._memory);
    }
    get(name, offset) {
        return name === this.name ? this.at(offset ?? 0) : super.get(name);
    }
    reset() {
        this._memory.reset();
        super.reset();
    }
}
export class RamBus extends Bus {
    index;
    ram;
    constructor(name, index, ram) {
        super(name);
        this.index = index;
        this.ram = ram;
    }
    get busVoltage() {
        return this.ram.get(this.index);
    }
    set busVoltage(num) {
        this.ram.set(this.index, num);
    }
}
export class RAM8 extends RAM {
    constructor() {
        super(3, "RAM8");
    }
}
export class RAM64 extends RAM {
    constructor() {
        super(6, "RAM64");
    }
}
export class RAM512 extends RAM {
    constructor() {
        super(9, "RAM512");
    }
}
export class RAM4K extends RAM {
    constructor() {
        super(12, "RAM4K");
    }
}
export class RAM16K extends RAM {
    constructor() {
        super(14, "RAM16K");
    }
}
//# sourceMappingURL=ram.js.map
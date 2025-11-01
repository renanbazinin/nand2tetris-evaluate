import { Bus, HIGH, LOW, Low } from "../chip/chip.js";
import { Clock } from "../chip/clock.js";
import { fill } from "./builder.js";
import { Test } from "./tst.js";
export class ChipTest extends Test {
    chip = new Low();
    doLoad;
    get chipId() {
        return this.chip.id;
    }
    clock = Clock.get();
    static from(tst, options = {}) {
        const test = new ChipTest(options);
        return fill(test, tst, options.requireLoad);
    }
    constructor({ dir, setStatus, loadAction, compareTo, } = {}) {
        super(dir, setStatus, compareTo);
        this.doLoad = loadAction;
    }
    with(chip) {
        this.chip = chip;
        return this;
    }
    async load(filename) {
        if (!this.dir)
            return;
        const chip = await this.doLoad?.(filename ? `${this.dir}/${filename}` : this.dir);
        if (chip) {
            this.chip = chip;
        }
    }
    hasVar(variable) {
        if (variable === "time") {
            return true;
        }
        variable = `${variable}`;
        // Look up built-in chip state variables
        return this.chip.hasIn(variable) || this.chip.hasOut(variable);
    }
    getVar(variable, offset) {
        variable = `${variable}`;
        if (variable === "time") {
            return this.clock.toString();
        }
        const pin = this.chip.get(variable, offset);
        if (!pin)
            return 0;
        return pin instanceof Bus ? pin.busVoltage : pin.voltage();
    }
    getWidth(variable, offset) {
        const pin = this.chip.get(variable, offset);
        if (!pin)
            return 0;
        return pin.width;
    }
    setVar(variable, value, offset) {
        // Look up built-in chip state variables
        const pinOrBus = this.chip.get(variable, offset);
        if (pinOrBus instanceof Bus) {
            pinOrBus.busVoltage = value;
        }
        else {
            pinOrBus?.pull(value === 0 ? LOW : HIGH);
        }
    }
    eval() {
        this.chip.eval();
    }
    tick() {
        this.chip.eval();
        this.clock.tick();
    }
    tock() {
        this.chip.eval();
        this.clock.tock();
    }
    async loadROM(filename) {
        await this.chip.load(this.fs, [this.dir ?? "", filename].join("/"));
    }
    async run() {
        this.clock.reset();
        await super.run();
    }
}
export class TestEvalInstruction {
    _chipTestInstruction_ = true;
    async do(test) {
        test.eval();
    }
    *steps() {
        yield this;
    }
}
export class TestTickInstruction {
    _chipTestInstruction_ = true;
    async do(test) {
        test.tick();
    }
    *steps() {
        yield this;
    }
}
export class TestTockInstruction {
    _chipTestInstruction_ = true;
    async do(test) {
        test.tock();
    }
    *steps() {
        yield this;
    }
}
//# sourceMappingURL=chiptst.js.map
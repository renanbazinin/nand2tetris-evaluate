import { Bus, ClockedChip, HIGH, LOW } from "../../chip.js";
export class Bit extends ClockedChip {
    bit = LOW;
    constructor(name) {
        super(["in", "load"], ["out"], name, [], ["in", "load"]);
    }
    tick() {
        if (this.in("load").voltage() === HIGH) {
            this.bit = this.in().voltage();
        }
    }
    tock() {
        this.out().pull(this.bit ?? 0);
    }
    reset() {
        this.bit = LOW;
        super.reset();
    }
}
class RegisterBus extends Bus {
    register;
    constructor(name, register) {
        super(name);
        this.register = register;
    }
    get busVoltage() {
        return this.register.bits & 0xffff;
    }
    set busVoltage(num) {
        this.register.bits = num & 0xffff;
    }
}
export class Register extends ClockedChip {
    bits = 0x00;
    constructor(name) {
        super(["in[16]", "load"], ["out[16]"], name, [], ["in", "load"]);
    }
    tick() {
        if (this.in("load").voltage() === HIGH) {
            this.bits = this.in().busVoltage & 0xffff;
        }
    }
    tock() {
        this.out().busVoltage = this.bits & 0xffff;
    }
    get(name, offset) {
        return name === this.name
            ? new RegisterBus(this.name, this)
            : super.get(name, offset);
    }
    reset() {
        this.bits = 0x00;
        super.reset();
    }
}
export class VRegister extends Register {
}
export class PC extends ClockedChip {
    bits = 0x00;
    constructor(name) {
        super(["in[16]", "reset", "load", "inc"], ["out[16]"], name, [], ["in", "reset", "load", "inc"]);
    }
    tick() {
        if (this.in("reset").voltage() === HIGH) {
            this.bits = 0;
        }
        else if (this.in("load").voltage() === HIGH) {
            this.bits = this.in().busVoltage & 0xffff;
        }
        else if (this.in("inc").voltage() === HIGH) {
            this.bits += 1;
        }
    }
    tock() {
        this.out().busVoltage = this.bits & 0xffff;
    }
    get(name, offset) {
        return name === this.name
            ? new RegisterBus(this.name, this)
            : super.get(name, offset);
    }
    reset() {
        this.bits = 0x00;
        super.reset();
    }
}
//# sourceMappingURL=bit.js.map
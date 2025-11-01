import { Chip, HIGH, LOW } from "../../chip.js";
export function and(a, b) {
    return [a === 1 && b === 1 ? HIGH : LOW];
}
export function and16(a, b) {
    return [a & b & 0xffff];
}
export class And extends Chip {
    constructor() {
        super(["a", "b"], ["out"]);
    }
    eval() {
        const a = this.in("a").voltage();
        const b = this.in("b").voltage();
        const [n] = and(a, b);
        this.out().pull(n);
    }
}
export class And16 extends Chip {
    constructor() {
        super(["a[16]", "b[16]"], ["out[16]"]);
    }
    eval() {
        const a = this.in("a").busVoltage;
        const b = this.in("b").busVoltage;
        const [n] = and16(a, b);
        this.out().busVoltage = n;
    }
}
//# sourceMappingURL=and.js.map
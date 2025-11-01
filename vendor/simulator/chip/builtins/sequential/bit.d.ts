import { ClockedChip, Pin, Voltage } from "../../chip.js";
export declare class Bit extends ClockedChip {
    bit: Voltage;
    constructor(name?: string);
    tick(): void;
    tock(): void;
    reset(): void;
}
export declare class Register extends ClockedChip {
    bits: number;
    constructor(name?: string);
    tick(): void;
    tock(): void;
    get(name: string, offset?: number): Pin | undefined;
    reset(): void;
}
export declare class VRegister extends Register {
}
export declare class PC extends ClockedChip {
    bits: number;
    constructor(name?: string);
    tick(): void;
    tock(): void;
    get(name: string, offset?: number): Pin | undefined;
    reset(): void;
}

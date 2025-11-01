import { Chip, Voltage } from "../../chip.js";
export declare function and(a: Voltage, b: Voltage): [Voltage];
export declare function and16(a: number, b: number): [number];
export declare class And extends Chip {
    constructor();
    eval(): void;
}
export declare class And16 extends Chip {
    constructor();
    eval(): void;
}

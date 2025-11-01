import { Chip, Voltage } from "../../chip.js";
export declare function xor(a: Voltage, b: Voltage): [Voltage];
export declare function xor16(a: number, b: number): [number];
export declare class Xor extends Chip {
    constructor();
    eval(): void;
}
export declare class Xor16 extends Chip {
    constructor();
    eval(): void;
}

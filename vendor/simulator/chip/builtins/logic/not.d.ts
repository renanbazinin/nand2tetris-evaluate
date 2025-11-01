import { Chip, Voltage } from "../../chip.js";
export declare function not(inn: Voltage): [Voltage];
export declare function not16(inn: number): [number];
export declare class Not extends Chip {
    constructor();
    eval(): void;
}
export declare class Not16 extends Chip {
    constructor();
    eval(): void;
}

import { Chip, Voltage } from "../../chip.js";
export declare function mux(a: Voltage, b: Voltage, sel: Voltage): [Voltage];
export declare function mux16(a: number, b: number, sel: Voltage): [number];
export declare function mux16_4(a: number, b: number, c: number, d: number, sel: number): [number];
export declare function mux16_8(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, sel: number): [number];
export declare class Mux extends Chip {
    constructor();
    eval(): void;
}
export declare class Mux16 extends Chip {
    constructor();
    eval(): void;
}
export declare class Mux4Way16 extends Chip {
    constructor();
    eval(): void;
}
export declare class Mux8Way16 extends Chip {
    constructor();
    eval(): void;
}

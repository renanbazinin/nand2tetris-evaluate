import { Chip, Voltage } from "../../chip.js";
export declare function or(a: Voltage, b: Voltage): [Voltage];
export declare function or16(a: number, b: number): [number];
export declare function or8way(a: number): [Voltage];
export declare class Or extends Chip {
    constructor();
    eval(): void;
}
export declare class Or16 extends Chip {
    constructor();
    eval(): void;
}
export declare class Or8way extends Chip {
    constructor();
    eval(): void;
}

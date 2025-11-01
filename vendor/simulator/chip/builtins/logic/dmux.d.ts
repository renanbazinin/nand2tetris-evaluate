import { Chip, Voltage } from "../../chip.js";
export declare function dmux(inn: Voltage, sel: Voltage): [Voltage, Voltage];
export declare function dmux4way(inn: Voltage, sel: number): [Voltage, Voltage, Voltage, Voltage];
export declare function dmux8way(inn: Voltage, sel: number): [Voltage, Voltage, Voltage, Voltage, Voltage, Voltage, Voltage, Voltage];
export declare class DMux extends Chip {
    constructor();
    eval(): void;
}
export declare class DMux4Way extends Chip {
    constructor();
    eval(): void;
}
export declare class DMux8Way extends Chip {
    constructor();
    eval(): void;
}

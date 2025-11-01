import { Chip, Voltage } from "../../chip.js";
export declare function fullAdder(a: Voltage, b: Voltage, c: Voltage): [Voltage, Voltage];
export declare class FullAdder extends Chip {
    constructor();
    eval(): void;
}

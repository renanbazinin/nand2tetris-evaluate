import { ClockedChip } from "../../chip.js";
export declare class DFF extends ClockedChip {
    constructor(name?: string);
    tick(): void;
    tock(): void;
}

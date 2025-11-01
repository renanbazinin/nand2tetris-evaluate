import { Memory, Memory as MemoryChip } from "../../../cpu/memory.js";
import { Bus, ClockedChip, Pin } from "../../chip.js";
export declare class RAM extends ClockedChip {
    readonly width: number;
    protected _memory: MemoryChip;
    private _nextData;
    private _address;
    get memory(): Memory;
    get address(): number;
    constructor(width: number, name?: string);
    tick(): void;
    tock(): void;
    eval(): void;
    at(idx: number): Pin;
    get(name: string, offset?: number): Pin | undefined;
    reset(): void;
}
export declare class RamBus extends Bus {
    private readonly index;
    private ram;
    constructor(name: string, index: number, ram: Memory);
    get busVoltage(): number;
    set busVoltage(num: number);
}
export declare class RAM8 extends RAM {
    constructor();
}
export declare class RAM64 extends RAM {
    constructor();
}
export declare class RAM512 extends RAM {
    constructor();
}
export declare class RAM4K extends RAM {
    constructor();
}
export declare class RAM16K extends RAM {
    constructor();
}

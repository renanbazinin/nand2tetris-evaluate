import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { CPUState } from "../../../cpu/cpu.js";
import { KeyboardAdapter } from "../../../cpu/memory.js";
import { Chip, ClockedChip, Pin } from "../../chip.js";
import { RAM, RAM16K } from "../sequential/ram.js";
export declare class ROM32K extends RAM {
    constructor();
    load(fs: FileSystem, path: string): Promise<void>;
}
export declare class Screen extends RAM {
    static readonly SIZE: number;
    static readonly OFFSET = 16384;
    constructor();
}
export declare class Keyboard extends Chip implements KeyboardAdapter {
    static readonly OFFSET = 24576;
    constructor();
    getKey(): number;
    setKey(key: number): void;
    clearKey(): void;
    get(name: string): Pin | undefined;
}
export declare class Memory extends ClockedChip {
    readonly ram: RAM16K;
    readonly screen: Screen;
    private keyboard;
    private address;
    constructor();
    tick(): void;
    tock(): void;
    eval(): void;
    in(pin?: string): Pin;
    get(name: string, offset?: number): Pin | undefined;
    at(offset: number): Pin;
    reset(): void;
}
export declare class CPU extends ClockedChip {
    private _state;
    get state(): CPUState;
    constructor();
    tick(): void;
    tock(): void;
    private cpuInput;
    get(pin: string, offset?: number): Pin | undefined;
    reset(): void;
}
export declare class Computer extends Chip {
    readonly cpu: CPU;
    readonly ram: Memory;
    readonly rom: ROM32K;
    constructor();
    eval(): void;
    get(name: string, offset?: number): Pin | undefined;
    load(fs: FileSystem, path: string): Promise<void>;
}

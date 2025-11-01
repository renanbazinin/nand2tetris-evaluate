import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { CPU } from "../cpu/cpu.js";
import { ROM } from "../cpu/memory.js";
import { Tst } from "../languages/tst.js";
import { Action, AsyncAction } from "../types.js";
import { TestInstruction } from "./instruction.js";
import { Test } from "./tst.js";
export declare class CPUTest extends Test<CPUTestInstruction> {
    cpu: CPU;
    private ticks;
    private doLoad?;
    fileLoaded: boolean;
    hasLoad: boolean;
    static from(tst: Tst, options?: {
        dir?: string;
        rom?: ROM;
        doEcho?: Action<string>;
        doLoad?: AsyncAction<string>;
        compareTo?: Action<string>;
        requireLoad?: boolean;
    }): Result<CPUTest, Error>;
    constructor({ dir, rom, doEcho, doLoad, compareTo, }?: {
        dir?: string;
        rom?: ROM;
        doEcho?: Action<string>;
        doLoad?: AsyncAction<string>;
        compareTo?: Action<string>;
    });
    step(): Promise<boolean>;
    load(filename?: string): Promise<void>;
    reset(): this;
    hasVar(variable: string | number): boolean;
    getVar(variable: string | number, offset?: number): number;
    getWidth(variable: string, offset?: number): number;
    setVar(variable: string, value: number, index?: number): void;
    ticktock(): void;
    loadROM(filename: string): Promise<void>;
}
export interface CPUTestInstruction extends TestInstruction {
    _cpuTestInstruction_: true;
    do(test: CPUTest): Promise<void>;
}
export declare class TestTickTockInstruction implements CPUTestInstruction {
    readonly _cpuTestInstruction_ = true;
    do(test: CPUTest): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestResetRamInstruction implements CPUTestInstruction {
    readonly _cpuTestInstruction_ = true;
    do(test: CPUTest): Promise<void>;
    steps(): Generator<this, void, unknown>;
}

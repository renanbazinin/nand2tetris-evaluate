import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { Chip } from "../chip/chip.js";
import { Tst } from "../languages/tst.js";
import { Action } from "../types.js";
import { TestInstruction } from "./instruction.js";
import { Test } from "./tst.js";
export declare class ChipTest extends Test<ChipTestInstruction> {
    private chip;
    private doLoad?;
    get chipId(): number;
    private clock;
    static from(tst: Tst, options?: {
        dir?: string;
        setStatus?: Action<string>;
        loadAction?: (path: string) => Promise<Chip>;
        compareTo?: Action<string>;
        requireLoad?: boolean;
    }): Result<ChipTest, Error>;
    constructor({ dir, setStatus, loadAction, compareTo, }?: {
        dir?: string;
        setStatus?: Action<string>;
        loadAction?: (path: string) => Promise<Chip>;
        compareTo?: Action<string>;
    });
    with(chip: Chip): this;
    load(filename?: string): Promise<void>;
    hasVar(variable: string | number): boolean;
    getVar(variable: string | number, offset?: number): number | string;
    getWidth(variable: string, offset?: number): number;
    setVar(variable: string, value: number, offset?: number): void;
    eval(): void;
    tick(): void;
    tock(): void;
    loadROM(filename: string): Promise<void>;
    run(): Promise<void>;
}
export interface ChipTestInstruction extends TestInstruction {
    _chipTestInstruction_: true;
    do(test: ChipTest): Promise<void>;
}
export declare class TestEvalInstruction implements ChipTestInstruction {
    readonly _chipTestInstruction_ = true;
    do(test: ChipTest): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestTickInstruction implements ChipTestInstruction {
    readonly _chipTestInstruction_ = true;
    do(test: ChipTest): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestTockInstruction implements ChipTestInstruction {
    readonly _chipTestInstruction_ = true;
    do(test: ChipTest): Promise<void>;
    steps(): Generator<this, void, unknown>;
}

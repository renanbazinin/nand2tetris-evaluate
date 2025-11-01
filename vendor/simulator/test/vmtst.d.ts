import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { Tst } from "../languages/tst.js";
import { Action, AsyncAction } from "../types.js";
import { Vm } from "../vm/vm.js";
import { TestInstruction } from "./instruction.js";
import { Test } from "./tst.js";
export interface VmFile {
    name: string;
    content: string;
}
export declare class VMTest extends Test<VMTestInstruction> {
    vm: Vm;
    private doLoad?;
    static from(tst: Tst, options?: {
        dir?: string;
        doLoad?: AsyncAction<string>;
        doEcho?: Action<string>;
        compareTo?: Action<string>;
    }): Result<VMTest, Error>;
    constructor({ dir, doEcho, doLoad, compareTo, }?: {
        dir?: string;
        doEcho?: Action<string>;
        doLoad?: AsyncAction<string>;
        compareTo?: Action<string>;
    });
    using(fs: FileSystem): this;
    with(vm: Vm): this;
    load(filename?: string): Promise<void>;
    hasVar(variable: string | number, index?: number): boolean;
    getVar(variable: string | number, index?: number): number;
    getWidth(variable: string, offset?: number): number;
    setVar(variable: string, value: number, index?: number): void;
    vmstep(): void;
}
export interface VMTestInstruction extends TestInstruction {
    _vmTestInstruction_: true;
    do(test: VMTest): Promise<void>;
}
export declare class TestVMStepInstruction implements VMTestInstruction {
    readonly _vmTestInstruction_ = true;
    do(test: VMTest): Promise<void>;
    steps(): Generator<this, void, unknown>;
}

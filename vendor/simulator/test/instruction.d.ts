import { Span } from "../languages/base.js";
import { TstOutputSpec } from "../languages/tst.js";
import { Test } from "./tst.js";
export interface TestInstruction {
    span?: Span;
    do(test: Test): Promise<void>;
    steps(test: Test): IterableIterator<TestInstruction>;
}
export declare class TestControlInstruction implements TestInstruction {
    span: Span;
    constructor(span: Span);
    do(): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestStopInstruction extends TestControlInstruction {
}
export declare class TestBreakInstruction extends TestControlInstruction {
}
export declare class TestSetInstruction implements TestInstruction {
    private variable;
    private value;
    private index?;
    constructor(variable: string, value: number, index?: number | undefined);
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestOutputInstruction implements TestInstruction {
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export interface OutputParams {
    id: string;
    style?: "B" | "D" | "S" | "X";
    len?: number;
    lpad?: number;
    rpad?: number;
    builtin?: boolean;
    address?: number;
}
export declare class TestOutputListInstruction implements TestInstruction {
    private outputs;
    constructor(specs?: TstOutputSpec[]);
    addOutput(inst: TstOutputSpec): void;
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestCompoundInstruction implements TestInstruction {
    protected readonly instructions: TestInstruction[];
    span?: Span;
    addInstruction(instruction: TestInstruction): void;
    do(test: Test<TestInstruction>): Promise<void>;
    steps(_test: Test): Generator<TestInstruction>;
}
export declare class TestRepeatInstruction extends TestCompoundInstruction {
    readonly repeat: number;
    constructor(repeat: number);
    do(): Promise<undefined>;
    private innerSteps;
    steps(test: Test): Generator<TestInstruction>;
}
export declare class Condition {
    readonly x: string | number;
    readonly y: string | number;
    readonly op: "<" | "<=" | "=" | ">=" | ">" | "<>";
    constructor(x: string | number, y: string | number, op: "<" | "<=" | "=" | ">=" | ">" | "<>");
    check(test: Test): boolean;
}
export declare class TestWhileInstruction extends TestCompoundInstruction {
    readonly condition: Condition;
    constructor(condition: Condition);
    steps(test: Test): Generator<TestInstruction>;
}
export declare class TestEchoInstruction implements TestInstruction {
    readonly content: string;
    constructor(content: string);
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestClearEchoInstruction implements TestInstruction {
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestLoadROMInstruction implements TestInstruction {
    readonly file: string;
    constructor(file: string);
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestLoadInstruction implements TestInstruction {
    readonly file?: string | undefined;
    constructor(file?: string | undefined);
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestCompareToInstruction implements TestInstruction {
    readonly file?: string | undefined;
    constructor(file?: string | undefined);
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestOutputFileInstruction implements TestInstruction {
    readonly file?: string | undefined;
    constructor(file?: string | undefined);
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestBreakpointInstruction implements TestInstruction {
    readonly variable: string;
    readonly value: number;
    constructor(variable: string, value: number);
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}
export declare class TestClearBreakpointsInstruction implements TestInstruction {
    do(test: Test): Promise<void>;
    steps(): Generator<this, void, unknown>;
}

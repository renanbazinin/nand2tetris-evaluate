import { Test } from "./test/tst.js";
export declare class Output {
    private variable;
    private readonly fmt;
    private readonly lPad;
    private readonly rPad;
    private readonly len;
    private readonly index;
    private readonly builtin;
    constructor(variable: string, format?: string, len?: number, lPad?: number, rPad?: number, builtin?: boolean, index?: number);
    header(test: Test): string;
    print(test: Test): string;
    private padCenter;
    private padLeft;
    private padRight;
}

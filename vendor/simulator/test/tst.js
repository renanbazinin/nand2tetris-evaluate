import { assertExists } from "@davidsouther/jiffies/lib/esm/assert.js";
import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { Output } from "../output.js";
import { TestBreakInstruction, TestStopInstruction, } from "./instruction.js";
export const DEFAULT_TIME_WIDTH = 7;
export class Test {
    instructions = [];
    _outputList = [];
    _log = "";
    fs = new FileSystem();
    doEcho;
    doCompareTo;
    dir;
    outputFileName;
    constructor(path, doEcho, doCompareTo) {
        this.doEcho = doEcho;
        this.doCompareTo = doCompareTo;
        this.dir = path;
    }
    setFileSystem(fs) {
        this.fs = fs;
        return this;
    }
    echo(_content) {
        this.doEcho?.(_content);
        return;
    }
    clearEcho() {
        this.doEcho?.("");
        return;
    }
    async loadROM(_filename) {
        return undefined;
    }
    async load(_filename) {
        return undefined;
    }
    async compareTo(filename) {
        this.doCompareTo?.(filename);
    }
    outputFile(filename) {
        this.outputFileName = filename;
    }
    createOutputs(params) {
        return params.map((param) => {
            if (param.len === -1) {
                if (param.id === "time") {
                    param.len = DEFAULT_TIME_WIDTH;
                    param.style = "S";
                }
                else {
                    const width = this.getWidth(param.id, param.address);
                    if (param.style === "B") {
                        param.len = width;
                    }
                    else if (param.style === "D") {
                        param.len = Math.ceil(Math.log(width));
                    }
                    else if (param.style === "X") {
                        param.len = Math.ceil(width / 4);
                    }
                }
            }
            return new Output(param.id, param.style, param.len, param.lpad, param.rpad, param.builtin, param.address);
        });
    }
    outputList(params) {
        this._outputList = this.createOutputs(params);
    }
    addInstruction(instruction) {
        this.instructions.push(instruction);
    }
    reset() {
        this._steps = (function* (test) {
            for (const instruction of test.instructions) {
                yield* instruction.steps(test);
            }
        })(this);
        this._step = this._steps.next();
        this._log = "";
        return this;
    }
    _steps;
    _step;
    get steps() {
        if (this._steps === undefined) {
            this.reset();
            this._steps = assertExists(this._steps, "Reset did not initialize steps");
            this._step = assertExists(this._step, "Reset did not find first step");
        }
        return this._steps;
    }
    get currentStep() {
        return this._step?.value;
    }
    get done() {
        return this._step?.done ?? false;
    }
    async step() {
        while (!this._step.done) {
            await this._step.value.do(this);
            this._step = this.steps.next();
            if (this._step.value instanceof TestStopInstruction) {
                this._step = this.steps.next();
                return false;
            }
            else if (this._step.value instanceof TestBreakInstruction) {
                return true;
            }
        }
        return true;
    }
    async run() {
        this.reset();
        while (!(await this.step()))
            ;
    }
    breakpoints = new Map();
    addBreakpoint(variable, value) {
        this.breakpoints.set(variable, value);
    }
    clearBreakpoints() {
        this.breakpoints.clear();
    }
    output() {
        const values = this._outputList.map((output) => output.print(this));
        this._log += `|${values.join("|")}|\n`;
    }
    header() {
        const values = this._outputList.map((output) => output.header(this));
        this._log += `|${values.join("|")}|\n`;
    }
    log() {
        return this._log;
    }
}
//# sourceMappingURL=tst.js.map
import { assertExists } from "@davidsouther/jiffies/lib/esm/assert.js";
import { RAM } from "../cpu/memory.js";
import { Vm } from "../vm/vm.js";
import { fill } from "./builder.js";
import { Test } from "./tst.js";
export class VMTest extends Test {
    vm = new Vm();
    doLoad;
    static from(tst, options = {}) {
        const test = new VMTest(options);
        return fill(test, tst);
    }
    constructor({ dir, doEcho, doLoad, compareTo, } = {}) {
        super(dir, doEcho, compareTo);
        this.doLoad = doLoad;
    }
    using(fs) {
        this.fs = fs;
        return this;
    }
    with(vm) {
        this.vm = vm;
        return this;
    }
    async load(filename) {
        if (!this.dir)
            return;
        const dir = assertExists(this.dir?.split("/").slice(0, -1).join("/"));
        const vm = await this.doLoad?.(filename ? `${dir}/${filename}` : dir);
        if (vm) {
            this.vm = vm;
        }
    }
    hasVar(variable, index) {
        if (typeof variable !== "string") {
            index = variable;
            variable = "RAM";
        }
        if (variable === "RAM" &&
            index !== undefined &&
            index > 0 &&
            index < RAM.SIZE) {
            return true;
        }
        return [
            "argument",
            "local",
            "static",
            "constant",
            "this",
            "that",
            "pointer",
            "temp",
        ].includes(variable.toLowerCase());
    }
    getVar(variable, index) {
        if (typeof variable !== "string") {
            index = variable;
            variable = "RAM";
        }
        if (variable === "RAM" && index !== undefined) {
            return this.vm.RAM.get(index);
        }
        return this.vm.memory.getSegment(variable, index ?? 0);
    }
    getWidth(variable, offset) {
        return 16;
    }
    setVar(variable, value, index) {
        if (typeof variable !== "string") {
            index = variable;
            variable = "RAM";
        }
        if (variable === "RAM" && index !== undefined) {
            this.vm.RAM.set(index, value);
            return;
        }
        if (index !== undefined) {
            this.vm.memory.setSegment(variable, index, value);
        }
        else {
            switch (variable.toLowerCase()) {
                case "sp":
                    this.vm.memory.SP = value;
                    break;
                case "arg":
                case "argument":
                    this.vm.memory.ARG = value;
                    this.vm.segmentInitializations["argument"].initialized = true;
                    break;
                case "lcl":
                case "local":
                    this.vm.memory.LCL = value;
                    this.vm.segmentInitializations["local"].initialized = true;
                    break;
                case "this":
                    this.vm.memory.THIS = value;
                    this.vm.invocation.thisInitialized = true;
                    break;
                case "that":
                    this.vm.memory.THAT = value;
                    this.vm.invocation.thatInitialized = true;
                    break;
            }
        }
    }
    vmstep() {
        this.vm.step();
    }
}
export class TestVMStepInstruction {
    _vmTestInstruction_ = true;
    async do(test) {
        test.vmstep();
    }
    *steps() {
        yield this;
    }
}
//# sourceMappingURL=vmtst.js.map
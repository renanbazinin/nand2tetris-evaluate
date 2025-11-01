export class TestControlInstruction {
    span;
    constructor(span) {
        this.span = span;
    }
    async do() {
        return;
    }
    *steps() {
        yield this;
    }
}
export class TestStopInstruction extends TestControlInstruction {
}
export class TestBreakInstruction extends TestControlInstruction {
}
export class TestSetInstruction {
    variable;
    value;
    index;
    constructor(variable, value, index) {
        this.variable = variable;
        this.value = value;
        this.index = index;
    }
    async do(test) {
        test.setVar(this.variable, this.value, this.index);
    }
    *steps() {
        yield this;
    }
}
export class TestOutputInstruction {
    async do(test) {
        test.output();
    }
    *steps() {
        yield this;
    }
}
export class TestOutputListInstruction {
    outputs = [];
    constructor(specs = []) {
        for (const spec of specs) {
            this.addOutput(spec);
        }
    }
    addOutput(inst) {
        this.outputs.push({
            id: inst.id,
            style: inst.format?.style ?? "B",
            len: inst.format?.width ?? -1,
            lpad: inst.format?.lpad ?? 1,
            rpad: inst.format?.rpad ?? 1,
            builtin: inst.builtin,
            address: inst.address,
        });
    }
    async do(test) {
        test.outputList(this.outputs);
        test.header();
    }
    *steps() {
        yield this;
    }
}
export class TestCompoundInstruction {
    instructions = [];
    span;
    addInstruction(instruction) {
        this.instructions.push(instruction);
    }
    async do(test) {
        for (const instruction of this.instructions) {
            instruction.do(test);
        }
    }
    *steps(_test) {
        yield this;
    }
}
export class TestRepeatInstruction extends TestCompoundInstruction {
    repeat;
    constructor(repeat) {
        super();
        this.repeat = repeat;
    }
    async do() {
        return undefined;
    }
    *innerSteps(test) {
        for (const instruction of this.instructions) {
            yield* instruction.steps(test);
        }
    }
    *steps(test) {
        if (this.repeat === -1) {
            yield this;
            while (true) {
                yield* this.innerSteps(test);
            }
        }
        else {
            for (let i = 0; i < this.repeat; i++) {
                yield this;
                yield* this.innerSteps(test);
            }
        }
    }
}
export class Condition {
    x;
    y;
    op;
    constructor(x, y, op) {
        this.x = x;
        this.y = y;
        this.op = op;
    }
    check(test) {
        const x = test.hasVar(this.x) ? test.getVar(this.x) : this.x;
        const y = test.hasVar(this.y) ? test.getVar(this.y) : this.y;
        if (typeof x === "string" || typeof y === "string") {
            switch (this.op) {
                case "=":
                    return `${x}` === `${y}`;
                case "<>":
                    return `${x}` !== `${y}`;
            }
        }
        else {
            switch (this.op) {
                case "<":
                    return x < y;
                case "<=":
                    return x <= y;
                case ">":
                    return x > y;
                case ">=":
                    return x >= y;
                case "=":
                    return x === y;
                case "<>":
                    return x !== y;
            }
        }
        return false;
    }
}
export class TestWhileInstruction extends TestCompoundInstruction {
    condition;
    constructor(condition) {
        super();
        this.condition = condition;
    }
    *steps(test) {
        while (this.condition.check(test)) {
            yield this;
            for (const instruction of this.instructions) {
                yield* instruction.steps(test);
            }
        }
    }
}
export class TestEchoInstruction {
    content;
    constructor(content) {
        this.content = content;
    }
    async do(test) {
        test.echo(this.content);
    }
    *steps() {
        yield this;
    }
}
export class TestClearEchoInstruction {
    async do(test) {
        test.clearEcho();
    }
    *steps() {
        yield this;
    }
}
export class TestLoadROMInstruction {
    file;
    constructor(file) {
        this.file = file;
    }
    async do(test) {
        await test.loadROM(this.file);
    }
    *steps() {
        yield this;
    }
}
export class TestLoadInstruction {
    file;
    constructor(file) {
        this.file = file;
    }
    async do(test) {
        await test.load(this.file);
    }
    *steps() {
        yield this;
    }
}
export class TestCompareToInstruction {
    file;
    constructor(file) {
        this.file = file;
    }
    async do(test) {
        if (this.file) {
            await test.compareTo(this.file);
        }
    }
    *steps() {
        yield this;
    }
}
export class TestOutputFileInstruction {
    file;
    constructor(file) {
        this.file = file;
    }
    async do(test) {
        if (this.file) {
            test.outputFile(this.file);
        }
    }
    *steps() {
        yield this;
    }
}
export class TestBreakpointInstruction {
    variable;
    value;
    constructor(variable, value) {
        this.variable = variable;
        this.value = value;
    }
    async do(test) {
        test.addBreakpoint(this.variable, this.value);
    }
    *steps() {
        yield this;
    }
}
export class TestClearBreakpointsInstruction {
    async do(test) {
        test.clearBreakpoints();
    }
    *steps() {
        yield this;
    }
}
//# sourceMappingURL=instruction.js.map
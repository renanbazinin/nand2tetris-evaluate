import { Err, isErr, Ok, } from "@davidsouther/jiffies/lib/esm/result.js";
import { createError } from "../languages/base.js";
import { isPrimitive, JACK, } from "../languages/jack.js";
import { makeInterface, overridesOsCorrectly, VM_BUILTINS, } from "../vm/builtins.js";
import { validateSubroutine } from "./controlFlow.js";
const osClasses = new Set([
    "Sys",
    "Screen",
    "Output",
    "Keyboard",
    "String",
    "Array",
    "Memory",
    "Math",
]);
function isOsClass(name) {
    return osClasses.has(name);
}
function isError(value) {
    return value.message != undefined;
}
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
export function compile(files) {
    const classes = {};
    for (const [name, content] of Object.entries(files)) {
        const parsed = JACK.parse(content);
        if (isErr(parsed)) {
            classes[name] = Err(parsed);
        }
        else {
            const cls = Ok(parsed);
            const result = validateClass(cls);
            classes[name] =
                cls.name.value == name
                    ? isErr(result)
                        ? Err(result)
                        : cls
                    : createError(`Class name ${cls.name.value} doesn't match file name ${name}`, cls.name.span);
        }
    }
    const validClasses = Object.fromEntries(Object.entries(classes).filter(([_, parsed]) => !isError(parsed)));
    const vms = {};
    for (const [name, parsed] of Object.entries(classes)) {
        if (isError(parsed)) {
            vms[name] = parsed;
        }
        else {
            try {
                const compiled = new Compiler().compile(parsed, validClasses);
                if (isErr(compiled)) {
                    vms[name] = Err(compiled);
                }
                else {
                    vms[name] = Ok(compiled);
                }
            }
            catch (e) {
                vms[name] = e;
            }
        }
    }
    return vms;
}
function validateClass(cls) {
    const subroutineNames = new Set();
    for (const subroutine of cls.subroutines) {
        if (subroutineNames.has(subroutine.name.value)) {
            return Err(createError(`Subroutine ${subroutine.name.value} already declared`, subroutine.name.span));
        }
        subroutineNames.add(subroutine.name.value);
        const result = validateSubroutine(subroutine);
        if (isErr(result)) {
            return result;
        }
    }
    return Ok();
}
const ops = {
    "+": "add",
    "-": "sub",
    "*": "call Math.multiply 2",
    "/": "call Math.divide 2",
    "&": "and",
    "|": "or",
    "<": "lt",
    ">": "gt",
    "=": "eq",
};
const unaryOps = {
    "-": "neg",
    "~": "not",
};
export class Compiler {
    instructions = [];
    globalSymbolTable = {};
    localSymbolTable = {};
    className = "";
    classes = {};
    labelNum = 0;
    fieldNum = 0;
    staticNum = 0;
    localNum = 0;
    get output() {
        return Array.from(this.instructions);
    }
    varData(name) {
        return this.localSymbolTable[name] || this.globalSymbolTable[name];
    }
    var(arg) {
        let name;
        let span;
        if (typeof arg == "string") {
            name = arg;
        }
        else {
            if (typeof arg.name == "string") {
                name = arg.name;
                span = arg.span;
            }
            else {
                name = arg.name.value;
                span = arg.name.span;
            }
        }
        const data = this.varData(name);
        if (!data) {
            throw createError(`Undeclared variable ${name}`, span);
        }
        return `${data.segment} ${data.index}`;
    }
    write(...lines) {
        this.instructions.push(...lines);
    }
    getLabel() {
        const label = `${this.className}_${this.labelNum}`;
        this.labelNum += 1;
        return label;
    }
    compile(cls, other) {
        this.className = cls.name.value;
        this.classes = other ?? {};
        for (const varDec of cls.varDecs) {
            this.compileClassVarDec(varDec);
        }
        for (const subroutine of cls.subroutines) {
            this.compileSubroutineDec(subroutine);
        }
        return Ok(this.instructions
            .map((inst) => inst.startsWith("function") || inst.startsWith("label")
            ? inst
            : "    ".concat(inst))
            .join("\n"));
    }
    validateType(type, span) {
        if (isPrimitive(type) || isOsClass(type) || this.classes[type]) {
            return;
        }
        throw createError(`Unknown type ${type}`, span);
    }
    validateReturnType(returnType, span) {
        if (returnType == "void") {
            return;
        }
        this.validateType(returnType, span);
    }
    compileClassVarDec(dec) {
        this.validateType(dec.type.value, dec.type.span);
        for (const name of dec.names) {
            if (dec.varType == "field") {
                this.globalSymbolTable[name] = {
                    type: dec.type.value,
                    segment: "this",
                    index: this.fieldNum,
                };
                this.fieldNum += 1;
            }
            else {
                this.globalSymbolTable[name] = {
                    type: dec.type.value,
                    segment: "static",
                    index: this.staticNum,
                };
                this.staticNum += 1;
            }
        }
    }
    compileVarDec(dec) {
        this.validateType(dec.type.value, dec.type.span);
        for (const name of dec.names) {
            this.localSymbolTable[name] = {
                type: dec.type.value,
                segment: "local",
                index: this.localNum,
            };
            this.localNum += 1;
        }
    }
    registerArgs(params, offset = false) {
        let argNum = 0;
        for (const param of params) {
            this.validateType(param.type.value, param.type.span);
            this.localSymbolTable[param.name] = {
                type: param.type.value,
                segment: "argument",
                index: argNum + (offset ? 1 : 0), // when compiling a method the first argument is this, so we offset the others by 1
            };
            argNum += 1;
        }
    }
    validateSubroutineDec(subroutine) {
        this.validateReturnType(subroutine.returnType.value, subroutine.returnType.span);
        if (isOsClass(this.className)) {
            const builtin = VM_BUILTINS[`${this.className}.${subroutine.name.value}`];
            if (builtin && !overridesOsCorrectly(this.className, subroutine)) {
                throw createError(`OS subroutine ${this.className}.${subroutine.name.value} must follow the interface ${makeInterface(subroutine.name.value, builtin)})`);
            }
        }
    }
    compileSubroutineDec(subroutine) {
        this.validateSubroutineDec(subroutine);
        switch (subroutine.type) {
            case "method":
                this.compileMethod(subroutine);
                break;
            case "constructor":
                this.compileConstructor(subroutine);
                break;
            case "function":
                this.compileFunction(subroutine);
        }
    }
    compileSubroutineStart(subroutine, isMethod = false) {
        this.localSymbolTable = {};
        this.localNum = 0;
        this.registerArgs(subroutine.parameters, isMethod);
        const localCount = subroutine.body.varDecs
            .map((dec) => dec.names.length)
            .reduce((a, b) => a + b, 0);
        this.write(`function ${this.className}.${subroutine.name.value} ${localCount}`);
        for (const varDec of subroutine.body.varDecs) {
            this.compileVarDec(varDec);
        }
    }
    compileFunction(subroutine) {
        this.compileSubroutineStart(subroutine);
        this.compileStatements(subroutine.body.statements);
    }
    compileMethod(subroutine) {
        this.compileSubroutineStart(subroutine, true);
        this.write("push argument 0", "pop pointer 0");
        this.compileStatements(subroutine.body.statements);
    }
    compileConstructor(subroutine) {
        this.compileSubroutineStart(subroutine);
        this.write(`push constant ${this.fieldNum}`, "call Memory.alloc 1", "pop pointer 0");
        this.compileStatements(subroutine.body.statements);
    }
    compileExpression(expression) {
        this.compileTerm(expression.term);
        for (const part of expression.rest) {
            this.compileTerm(part.term);
            this.compileOp(part.op); // postfix
        }
    }
    compileOp(op) {
        this.write(ops[op]);
    }
    compileTerm(term) {
        switch (term.termType) {
            case "numericLiteral":
                this.write(`push constant ${term.value}`);
                break;
            case "stringLiteral":
                this.compileStringLiteral(term.value);
                break;
            case "variable":
                this.write(`push ${this.var(term)}`);
                break;
            case "keywordLiteral":
                this.compileKeywordLiteral(term.value);
                break;
            case "subroutineCall":
                this.compileSubroutineCall(term);
                break;
            case "arrayAccess":
                this.compileExpression(term.index);
                this.write(`push ${this.var(term)}`, "add", "pop pointer 1", "push that 0");
                break;
            case "groupedExpression":
                this.compileExpression(term.expression);
                break;
            case "unaryExpression":
                this.compileTerm(term.term);
                this.write(unaryOps[term.op]);
        }
    }
    validateArgNum(name, expected, call) {
        const received = call.parameters.length;
        if (expected != received) {
            throw createError(`${name} expected ${expected} arguments, got ${received}`, call.span);
        }
    }
    validateSubroutineCall(className, subroutineName, call, isMethod) {
        const builtin = VM_BUILTINS[`${className}.${subroutineName}`];
        if (builtin) {
            if (builtin.type == "method" && !isMethod) {
                throw createError(`Method ${className}.${subroutineName} was called as a function/constructor`, call.name.span);
            }
            if (builtin.type != "method" && isMethod) {
                throw createError(`${capitalize(builtin.type)} ${className}.${subroutineName} was called as a method`, call.name.span);
            }
            this.validateArgNum(`${className}.${subroutineName}`, builtin.args.length, call);
            return;
        }
        else if (this.classes[className]) {
            for (const subroutine of this.classes[className].subroutines) {
                if (subroutine.name.value == subroutineName) {
                    if (subroutine.type == "method" && !isMethod) {
                        throw createError(`Method ${className}.${subroutineName} was called as a function/constructor`, call.name.span);
                    }
                    if (subroutine.type != "method" && isMethod) {
                        throw createError(`${capitalize(subroutine.name.value)} ${className}.${subroutineName} was called as a method`, call.name.span);
                    }
                    this.validateArgNum(`${className}.${subroutineName}`, subroutine.parameters.length, call);
                    return;
                }
            }
            throw createError(`Class ${className} doesn't contain a function/constructor ${subroutineName}`, call.name.span);
        }
        else {
            throw createError(`Class ${className} doesn't exist`, call.name.span);
        }
    }
    classifySubroutineCall(call) {
        let object;
        let className = "";
        let subroutineName = "";
        if (call.name.value.includes(".")) {
            const [prefix, suffix] = call.name.value.split(".", 2);
            subroutineName = suffix;
            const varData = this.varData(prefix);
            if (varData) {
                // external method call
                object = this.var(prefix);
                className = varData.type;
            }
            else {
                // function / constructor call
                className = prefix;
            }
        }
        else {
            object = "pointer 0"; // this
            className = this.className;
            subroutineName = call.name.value;
        }
        this.validateSubroutineCall(className, subroutineName, call, object != undefined);
        return { className, subroutineName, object };
    }
    compileSubroutineCall(call) {
        const attributes = this.classifySubroutineCall(call);
        if (attributes.object) {
            this.write(`push ${attributes.object}`);
        }
        for (const param of call.parameters) {
            this.compileExpression(param);
        }
        this.write(`call ${attributes.className}.${attributes.subroutineName} ${call.parameters.length + (attributes.object ? 1 : 0)}`);
    }
    compileStringLiteral(str) {
        this.write(`push constant ${str.length}`, `call String.new 1`);
        for (let i = 0; i < str.length; i++) {
            this.write(`push constant ${str.charCodeAt(i)}`, `call String.appendChar 2`);
        }
    }
    compileKeywordLiteral(keyword) {
        switch (keyword) {
            case "true":
                this.write(`push constant 1`, `neg`);
                break;
            case "false":
                this.write(`push constant 0`);
                break;
            case "null":
                this.write(`push constant 0`);
                break;
            case "this":
                this.write(`push pointer 0`);
        }
    }
    compileStatements(statements) {
        for (const statement of statements) {
            this.compileStatement(statement);
        }
    }
    compileStatement(statement) {
        switch (statement.statementType) {
            case "doStatement":
                this.compileDoStatement(statement);
                break;
            case "ifStatement":
                this.compileIf(statement);
                break;
            case "letStatement":
                this.compileLet(statement);
                break;
            case "returnStatement":
                this.compileReturn(statement);
                break;
            case "whileStatement":
                this.compileWhile(statement);
        }
    }
    compileReturn(statement) {
        if (statement.value) {
            this.compileExpression(statement.value);
        }
        else {
            this.write(`push constant 0`); // return 0
        }
        this.write(`return`);
    }
    compileLet(statement) {
        if (statement.arrayIndex) {
            this.compileExpression(statement.arrayIndex);
            this.write(`push ${this.var(statement)}`, "add");
            this.compileExpression(statement.value);
            this.write("pop temp 0", "pop pointer 1", "push temp 0", "pop that 0");
        }
        else {
            this.compileExpression(statement.value);
            this.write(`pop ${this.var(statement)}`);
        }
    }
    compileDoStatement(statement) {
        this.compileSubroutineCall(statement.call);
        this.write(`pop temp 0`);
    }
    compileIf(statement) {
        const condTrue = this.getLabel();
        const condFalse = this.getLabel();
        this.compileExpression(statement.condition);
        this.write("not", `if-goto ${condFalse}`);
        this.compileStatements(statement.body);
        this.write(`goto ${condTrue}`, `label ${condFalse}`);
        this.compileStatements(statement.else);
        this.write(`label ${condTrue}`);
    }
    compileWhile(statement) {
        const loop = this.getLabel();
        const exit = this.getLabel();
        this.write(`label ${loop}`);
        this.compileExpression(statement.condition);
        this.write(`not`, `if-goto ${exit}`);
        this.compileStatements(statement.body);
        this.write(`goto ${loop}`, `label ${exit}`);
    }
}
//# sourceMappingURL=compiler.js.map
import { checkExhaustive } from "@davidsouther/jiffies/lib/esm/assert.js";
import { Err, Ok } from "@davidsouther/jiffies/lib/esm/result.js";
import { TestEvalInstruction, TestTickInstruction, TestTockInstruction, } from "./chiptst.js";
import { TestResetRamInstruction, TestTickTockInstruction } from "./cputst.js";
import { Condition, TestBreakInstruction, TestClearEchoInstruction, TestCompareToInstruction, TestEchoInstruction, TestLoadInstruction, TestLoadROMInstruction, TestOutputFileInstruction, TestOutputInstruction, TestOutputListInstruction, TestRepeatInstruction, TestSetInstruction, TestStopInstruction, TestWhileInstruction, } from "./instruction.js";
import { TestVMStepInstruction } from "./vmtst.js";
export function isTstCommand(line) {
    return line.op !== undefined;
}
function isTstWhileStatement(line) {
    return line.condition !== undefined;
}
function makeInstruction(inst) {
    const { op } = inst;
    switch (op) {
        case "tick":
            return new TestTickInstruction();
        case "tock":
            return new TestTockInstruction();
        case "ticktock":
            return new TestTickTockInstruction();
        case "eval":
            return new TestEvalInstruction();
        case "vmstep":
            return new TestVMStepInstruction();
        case "output":
            return new TestOutputInstruction();
        case "set":
            return new TestSetInstruction(inst.id, inst.value, inst.index);
        case "output-list":
            return new TestOutputListInstruction(inst.spec);
        case "echo":
            return new TestEchoInstruction(inst.message);
        case "clear-echo":
            return new TestClearEchoInstruction();
        case "loadRom":
            return new TestLoadROMInstruction(inst.file);
        case "load":
            return new TestLoadInstruction(inst.file);
        case "output-file":
            return new TestOutputFileInstruction(inst.file);
        case "compare-to":
            return new TestCompareToInstruction(inst.file);
        case "resetRam":
            return new TestResetRamInstruction();
        default:
            checkExhaustive(op, `Unknown tst operation ${op}`);
    }
}
export function fill(test, tst, requireLoad = true) {
    let span;
    let stepInstructions = [];
    let base = test;
    let commands = [];
    let hasLoad = false;
    for (const line of tst.lines) {
        if (isTstCommand(line)) {
            base = test;
            commands = [line];
        }
        else {
            const repeat = isTstWhileStatement(line)
                ? new TestWhileInstruction(new Condition(line.condition.left, line.condition.right, line.condition.op))
                : new TestRepeatInstruction(line.count);
            repeat.span = line.span;
            test.addInstruction(repeat);
            base = repeat;
            commands = line.statements;
        }
        for (const command of commands) {
            if (command.op.op == "load") {
                hasLoad = true;
            }
            const inst = makeInstruction(command.op);
            if (inst !== undefined) {
                if (span === undefined) {
                    span = line.span;
                }
                else {
                    span.end = line.span.end;
                }
                base.addInstruction(inst);
                stepInstructions.push(inst);
            }
            if (command.separator != ",") {
                if (command.separator == ";") {
                    base.addInstruction(new TestStopInstruction(span ?? command.span));
                }
                else if (command.separator == "!") {
                    base.addInstruction(new TestBreakInstruction(span ?? command.span));
                }
                for (const inst of stepInstructions) {
                    inst.span = span ?? command.span;
                }
                span = undefined;
                stepInstructions = [];
            }
        }
    }
    if (requireLoad && !hasLoad) {
        return Err(new Error("A test script must have a load command"));
    }
    test.reset();
    return Ok(test);
}
//# sourceMappingURL=builder.js.map
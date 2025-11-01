import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { CompilationError, Span } from "../languages/base.js";
import { ArrayAccess, Class, ClassVarDec, DoStatement, Expression, IfStatement, KeywordConstant, LetStatement, Op, Parameter, ReturnStatement, Statement, Subroutine, SubroutineCall, Term, Type, VarDec, Variable, WhileStatement } from "../languages/jack.js";
import { Segment } from "../languages/vm.js";
export declare function compile(files: Record<string, string>): Record<string, string | CompilationError>;
interface VariableData {
    type: Type;
    segment: Segment;
    index: number;
}
interface SubroutineCallAttributes {
    className: string;
    subroutineName: string;
    object?: string;
}
export declare class Compiler {
    private instructions;
    globalSymbolTable: Record<string, VariableData>;
    localSymbolTable: Record<string, VariableData>;
    className: string;
    private classes;
    private labelNum;
    private fieldNum;
    private staticNum;
    private localNum;
    get output(): string[];
    varData(name: string): VariableData | undefined;
    var(name: string): string;
    var(variable: Variable): string;
    var(variable: ArrayAccess): string;
    var(variable: LetStatement): string;
    write(...lines: string[]): void;
    getLabel(): string;
    compile(cls: Class, other?: Record<string, Class>): Result<string, CompilationError>;
    validateType(type: string, span?: Span): void;
    validateReturnType(returnType: string, span?: Span): void;
    compileClassVarDec(dec: ClassVarDec): void;
    compileVarDec(dec: VarDec): void;
    registerArgs(params: Parameter[], offset?: boolean): void;
    validateSubroutineDec(subroutine: Subroutine): void;
    compileSubroutineDec(subroutine: Subroutine): void;
    compileSubroutineStart(subroutine: Subroutine, isMethod?: boolean): void;
    compileFunction(subroutine: Subroutine): void;
    compileMethod(subroutine: Subroutine): void;
    compileConstructor(subroutine: Subroutine): void;
    compileExpression(expression: Expression): void;
    compileOp(op: Op): void;
    compileTerm(term: Term): void;
    validateArgNum(name: string, expected: number, call: SubroutineCall): void;
    validateSubroutineCall(className: string, subroutineName: string, call: SubroutineCall, isMethod: boolean): void;
    classifySubroutineCall(call: SubroutineCall): SubroutineCallAttributes;
    compileSubroutineCall(call: SubroutineCall): void;
    compileStringLiteral(str: string): void;
    compileKeywordLiteral(keyword: KeywordConstant): void;
    compileStatements(statements: Statement[]): void;
    compileStatement(statement: Statement): void;
    compileReturn(statement: ReturnStatement): void;
    compileLet(statement: LetStatement): void;
    compileDoStatement(statement: DoStatement): void;
    compileIf(statement: IfStatement): void;
    compileWhile(statement: WhileStatement): void;
}
export {};

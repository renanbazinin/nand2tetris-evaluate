export declare const JACK = "\nwhile (R0 > 0) {\n    R2 = R2 + R1\n    R0 = R0 - 1\n}";
export declare const VM = "\n(_loop_start)\n  push constant 0\n  push arg 0\n  eq\n  jump-eq _loop_end\n\n  push arg 1\n  push local 0\n  add\n  pop local 0\n\n  push arg 0\n  push constant 1\n  sub\n  pop arg 0\n\n  jump _loop_start\n\n(_loop_end)\n  jump loop_end\n";
export declare const ASM = "\n@R2\nM=0\n(LOOP)\n  @R0\n  D=M\n  @END\n  D;JEQ\n\n  @R1\n  D=M\n  @R2\n  D=D+M\n  M=D\n\n  @R0\n  M=M-1\n  @LOOP\n  0;JMP\n(END)\n  @END\n  0;JMP\n";
export declare const HACK: Int16Array<ArrayBuffer>;

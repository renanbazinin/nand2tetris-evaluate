export declare const sol = "CHIP And {\n    IN a, b;\n    OUT out;\n\n    PARTS:\n    Nand(a=a, b=b, out=x);\n    Not(in=x, out=out);\n}";

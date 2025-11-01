export declare const sol = "CHIP Bit {\n    IN in, load;\n    OUT out;\n\n    PARTS:\n    \n    Mux (a=dffOut, b=in, sel=load, out=muxOut);\n    DFF (in=muxOut, out=dffOut, out=out);\n}";

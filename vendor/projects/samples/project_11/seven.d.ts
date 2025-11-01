export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Seven/Main.jack\n/**\n * Computes the value of 1 + (2 * 3) and prints the result\n * at the top-left of the screen.  \n */\nclass Main {\n\n   function void main() {\n      do Output.printInt(1 + (2 * 3));\n      return;\n   }\n\n}";
export declare const parsed: {
    name: {
        value: string;
        span: {
            start: number;
            end: number;
            line: number;
        };
    };
    varDecs: never[];
    subroutines: {
        type: string;
        returnType: {
            value: string;
            span: {
                start: number;
                end: number;
                line: number;
            };
        };
        name: {
            value: string;
            span: {
                start: number;
                end: number;
                line: number;
            };
        };
        parameters: never[];
        body: {
            varDecs: never[];
            statements: ({
                statementType: string;
                call: {
                    termType: string;
                    name: {
                        value: string;
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    };
                    parameters: {
                        nodeType: string;
                        term: {
                            termType: string;
                            value: number;
                        };
                        rest: {
                            op: string;
                            term: {
                                termType: string;
                                expression: {
                                    nodeType: string;
                                    term: {
                                        termType: string;
                                        value: number;
                                    };
                                    rest: {
                                        op: string;
                                        term: {
                                            termType: string;
                                            value: number;
                                        };
                                    }[];
                                };
                            };
                        }[];
                    }[];
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                span?: undefined;
            } | {
                statementType: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                call?: undefined;
            })[];
        };
    }[];
};
export declare const compiled = "function Main.main 0\n    push constant 1\n    push constant 2\n    push constant 3\n    call Math.multiply 2\n    add\n    call Output.printInt 1\n    pop temp 0\n    push constant 0\n    return";

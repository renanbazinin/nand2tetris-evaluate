export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Average/Main.jack\n\n// Inputs some numbers and computes their average\nclass Main {\n   function void main() {\n      var Array a; \n      var int length;\n      var int i, sum;\n\n      let length = Keyboard.readInt(\"How many numbers? \");\n      let a = Array.new(length); // constructs the array\n     \n      let i = 0;\n      while (i < length) {\n         let a[i] = Keyboard.readInt(\"Enter a number: \");\n         let sum = sum + a[i];\n         let i = i + 1;\n      }\n\n      do Output.printString(\"The average is \");\n      do Output.printInt(sum / length);\n      return;\n   }\n}";
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
            varDecs: {
                type: {
                    value: string;
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                names: string[];
            }[];
            statements: ({
                statementType: string;
                name: {
                    value: string;
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                value: {
                    nodeType: string;
                    term: {
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
                                value: string;
                            };
                            rest: never[];
                        }[];
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        value?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                condition?: undefined;
                body?: undefined;
                call?: undefined;
            } | {
                statementType: string;
                name: {
                    value: string;
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                value: {
                    nodeType: string;
                    term: {
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
                                name: string;
                                span: {
                                    start: number;
                                    end: number;
                                    line: number;
                                };
                            };
                            rest: never[];
                        }[];
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        value?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                condition?: undefined;
                body?: undefined;
                call?: undefined;
            } | {
                statementType: string;
                name: {
                    value: string;
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                value: {
                    nodeType: string;
                    term: {
                        termType: string;
                        value: number;
                        name?: undefined;
                        parameters?: undefined;
                        span?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                condition?: undefined;
                body?: undefined;
                call?: undefined;
            } | {
                statementType: string;
                condition: {
                    nodeType: string;
                    term: {
                        termType: string;
                        name: string;
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    };
                    rest: {
                        op: string;
                        term: {
                            termType: string;
                            name: string;
                            span: {
                                start: number;
                                end: number;
                                line: number;
                            };
                        };
                    }[];
                };
                body: ({
                    statementType: string;
                    name: {
                        value: string;
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    };
                    arrayIndex: {
                        nodeType: string;
                        term: {
                            termType: string;
                            name: string;
                            span: {
                                start: number;
                                end: number;
                                line: number;
                            };
                        };
                        rest: never[];
                    };
                    value: {
                        nodeType: string;
                        term: {
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
                                    value: string;
                                };
                                rest: never[];
                            }[];
                            span: {
                                start: number;
                                end: number;
                                line: number;
                            };
                        };
                        rest: never[];
                    };
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                } | {
                    statementType: string;
                    name: {
                        value: string;
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    };
                    value: {
                        nodeType: string;
                        term: {
                            termType: string;
                            name: string;
                            span: {
                                start: number;
                                end: number;
                                line: number;
                            };
                            parameters?: undefined;
                        };
                        rest: {
                            op: string;
                            term: {
                                termType: string;
                                name: {
                                    value: string;
                                    span: {
                                        start: number;
                                        end: number;
                                        line: number;
                                    };
                                };
                                index: {
                                    nodeType: string;
                                    term: {
                                        termType: string;
                                        name: string;
                                        span: {
                                            start: number;
                                            end: number;
                                            line: number;
                                        };
                                    };
                                    rest: never[];
                                };
                                span: {
                                    start: number;
                                    end: number;
                                    line: number;
                                };
                            };
                        }[];
                    };
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                    arrayIndex?: undefined;
                } | {
                    statementType: string;
                    name: {
                        value: string;
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    };
                    value: {
                        nodeType: string;
                        term: {
                            termType: string;
                            name: string;
                            span: {
                                start: number;
                                end: number;
                                line: number;
                            };
                            parameters?: undefined;
                        };
                        rest: {
                            op: string;
                            term: {
                                termType: string;
                                value: number;
                            };
                        }[];
                    };
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                    arrayIndex?: undefined;
                })[];
                name?: undefined;
                value?: undefined;
                span?: undefined;
                call?: undefined;
            } | {
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
                            value: string;
                        };
                        rest: never[];
                    }[];
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                name?: undefined;
                value?: undefined;
                span?: undefined;
                condition?: undefined;
                body?: undefined;
            } | {
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
                            name: string;
                            span: {
                                start: number;
                                end: number;
                                line: number;
                            };
                        };
                        rest: {
                            op: string;
                            term: {
                                termType: string;
                                name: string;
                                span: {
                                    start: number;
                                    end: number;
                                    line: number;
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
                name?: undefined;
                value?: undefined;
                span?: undefined;
                condition?: undefined;
                body?: undefined;
            } | {
                statementType: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                name?: undefined;
                value?: undefined;
                condition?: undefined;
                body?: undefined;
                call?: undefined;
            })[];
        };
    }[];
};
export declare const compiled = "function Main.main 4\n    push constant 18\n    call String.new 1\n    push constant 72\n    call String.appendChar 2\n    push constant 111\n    call String.appendChar 2\n    push constant 119\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 109\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 110\n    call String.appendChar 2\n    push constant 121\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 110\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 109\n    call String.appendChar 2\n    push constant 98\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 63\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Keyboard.readInt 1\n    pop local 1\n    push local 1\n    call Array.new 1\n    pop local 0\n    push constant 0\n    pop local 2\nlabel Main_0\n    push local 2\n    push local 1\n    lt\n    not\n    if-goto Main_1\n    push local 2\n    push local 0\n    add\n    push constant 16\n    call String.new 1\n    push constant 69\n    call String.appendChar 2\n    push constant 110\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 110\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 109\n    call String.appendChar 2\n    push constant 98\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Keyboard.readInt 1\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push local 3\n    push local 2\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    add\n    pop local 3\n    push local 2\n    push constant 1\n    add\n    pop local 2\n    goto Main_0\nlabel Main_1\n    push constant 15\n    call String.new 1\n    push constant 84\n    call String.appendChar 2\n    push constant 104\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 118\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 103\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 105\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    push local 3\n    push local 1\n    call Math.divide 2\n    call Output.printInt 1\n    pop temp 0\n    push constant 0\n    return";

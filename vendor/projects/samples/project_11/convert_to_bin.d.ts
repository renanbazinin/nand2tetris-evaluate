export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/ConvertToBin/Main.jack\n/**\n * Unpacks a 16-bit number into its binary representation:\n * Takes the 16-bit number stored in RAM[8000] and stores its individual \n * bits in RAM[8001]..RAM[8016] (each location will contain 0 or 1).\n * Before the conversion, RAM[8001]..RAM[8016] are initialized to -1.\n * \n * The program should be tested as follows:\n * 1) Load the program into the supplied VM emulator\n * 2) Put some value in RAM[8000]\n * 3) Switch to \"no animation\"\n * 4) Run the program (give it enough time to run)\n * 5) Stop the program\n * 6) Check that RAM[8001]..RAM[8016] contain the correct bits, and\n *    that none of these memory locations contains -1.\n */\nclass Main {\n    \n    /**\n     * Initializes RAM[8001]..RAM[8016] to -1,\n     * and converts the value in RAM[8000] to binary.\n     */\n    function void main() {\n      var int value;\n        do Main.fillMemory(8001, 16, -1); // sets RAM[8001]..RAM[8016] to -1\n        let value = Memory.peek(8000);    // Uses an OS routine to read the input\n        do Main.convert(value);           // performs the conversion\n        return;\n    }\n    \n    /** Converts the given decimal value to binary, and puts \n     *  the resulting bits in RAM[8001]..RAM[8016]. */\n    function void convert(int value) {\n      var int mask, position;\n      var boolean loop;\n      \n      let loop = true;\n      while (loop) {\n          let position = position + 1;\n          let mask = Main.nextMask(mask);\n      \n          if (~(position > 16)) {\n      \n              if (~((value & mask) = 0)) {\n                  do Memory.poke(8000 + position, 1);\n                 }\n              else {\n                  do Memory.poke(8000 + position, 0);\n                }    \n          }\n          else {\n              let loop = false;\n          }\n      }\n      return;\n    }\n \n    /** Returns the next mask (the mask that should follow the given mask). */\n    function int nextMask(int mask) {\n      if (mask = 0) {\n          return 1;\n      }\n      else {\n      return mask * 2;\n      }\n    }\n    \n    /** Fills 'length' consecutive memory locations with 'value',\n      * starting at 'address'. */\n    function void fillMemory(int address, int length, int value) {\n        while (length > 0) {\n            do Memory.poke(address, value);\n            let length = length - 1;\n            let address = address + 1;\n        }\n        return;\n    }\n}";
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
    subroutines: ({
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
                    parameters: ({
                        nodeType: string;
                        term: {
                            termType: string;
                            value: number;
                            op?: undefined;
                            term?: undefined;
                        };
                        rest: never[];
                    } | {
                        nodeType: string;
                        term: {
                            termType: string;
                            op: string;
                            term: {
                                termType: string;
                                value: number;
                            };
                            value?: undefined;
                        };
                        rest: never[];
                    })[];
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                name?: undefined;
                value?: undefined;
                span?: undefined;
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
                                value: number;
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
                };
                name?: undefined;
                value?: undefined;
                span?: undefined;
            } | {
                statementType: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                call?: undefined;
                name?: undefined;
                value?: undefined;
            })[];
        };
    } | {
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
        parameters: {
            type: {
                value: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
            };
            name: string;
        }[];
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
                        value: string;
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
                    rest: never[];
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
                    condition?: undefined;
                    body?: undefined;
                    else?: undefined;
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
                    else?: undefined;
                } | {
                    statementType: string;
                    condition: {
                        nodeType: string;
                        term: {
                            termType: string;
                            op: string;
                            term: {
                                termType: string;
                                expression: {
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
                                            value: number;
                                        };
                                    }[];
                                };
                            };
                        };
                        rest: never[];
                    };
                    body: {
                        statementType: string;
                        condition: {
                            nodeType: string;
                            term: {
                                termType: string;
                                op: string;
                                term: {
                                    termType: string;
                                    expression: {
                                        nodeType: string;
                                        term: {
                                            termType: string;
                                            expression: {
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
                            };
                            rest: never[];
                        };
                        body: {
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
                        }[];
                        else: {
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
                        }[];
                    }[];
                    else: {
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
                                value: string;
                            };
                            rest: never[];
                        };
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    }[];
                    name?: undefined;
                    value?: undefined;
                    span?: undefined;
                })[];
                name?: undefined;
                value?: undefined;
                span?: undefined;
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
            })[];
        };
    } | {
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
        parameters: {
            type: {
                value: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
            };
            name: string;
        }[];
        body: {
            varDecs: never[];
            statements: {
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
                            value: number;
                        };
                    }[];
                };
                body: {
                    statementType: string;
                    value: {
                        nodeType: string;
                        term: {
                            termType: string;
                            value: number;
                        };
                        rest: never[];
                    };
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                }[];
                else: {
                    statementType: string;
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
                }[];
            }[];
        };
    } | {
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
        parameters: {
            type: {
                value: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
            };
            name: string;
        }[];
        body: {
            varDecs: never[];
            statements: ({
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
                            value: number;
                        };
                    }[];
                };
                body: ({
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
                    call?: undefined;
                })[];
                span?: undefined;
            } | {
                statementType: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                condition?: undefined;
                body?: undefined;
            })[];
        };
    })[];
};
export declare const compiled = "function Main.main 1\n    push constant 8001\n    push constant 16\n    push constant 1\n    neg\n    call Main.fillMemory 3\n    pop temp 0\n    push constant 8000\n    call Memory.peek 1\n    pop local 0\n    push local 0\n    call Main.convert 1\n    pop temp 0\n    push constant 0\n    return\nfunction Main.convert 3\n    push constant 1\n    neg\n    pop local 2\nlabel Main_0\n    push local 2\n    not\n    if-goto Main_1\n    push local 1\n    push constant 1\n    add\n    pop local 1\n    push local 0\n    call Main.nextMask 1\n    pop local 0\n    push local 1\n    push constant 16\n    gt\n    not\n    not\n    if-goto Main_3\n    push argument 0\n    push local 0\n    and\n    push constant 0\n    eq\n    not\n    not\n    if-goto Main_5\n    push constant 8000\n    push local 1\n    add\n    push constant 1\n    call Memory.poke 2\n    pop temp 0\n    goto Main_4\nlabel Main_5\n    push constant 8000\n    push local 1\n    add\n    push constant 0\n    call Memory.poke 2\n    pop temp 0\nlabel Main_4\n    goto Main_2\nlabel Main_3\n    push constant 0\n    pop local 2\nlabel Main_2\n    goto Main_0\nlabel Main_1\n    push constant 0\n    return\nfunction Main.nextMask 0\n    push argument 0\n    push constant 0\n    eq\n    not\n    if-goto Main_7\n    push constant 1\n    return\n    goto Main_6\nlabel Main_7\n    push argument 0\n    push constant 2\n    call Math.multiply 2\n    return\nlabel Main_6\nfunction Main.fillMemory 0\nlabel Main_8\n    push argument 1\n    push constant 0\n    gt\n    not\n    if-goto Main_9\n    push argument 0\n    push argument 2\n    call Memory.poke 2\n    pop temp 0\n    push argument 1\n    push constant 1\n    sub\n    pop argument 1\n    push argument 0\n    push constant 1\n    add\n    pop argument 0\n    goto Main_8\nlabel Main_9\n    push constant 0\n    return";

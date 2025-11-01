export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/ComplexArrays/Main.jack\n/**\n * Performs several complex array processing tests.\n * For each test, the expected result is printed, along with the\n * actual result. In each test, the two results should be equal.\n */\nclass Main {\n\n    function void main() {\n        var Array a, b, c;\n        \n        let a = Array.new(10);\n        let b = Array.new(5);\n        let c = Array.new(1);\n        \n        let a[3] = 2;\n        let a[4] = 8;\n        let a[5] = 4;\n        let b[a[3]] = a[3] + 3;  // b[2] = 5\n        let a[b[a[3]]] = a[a[5]] * b[((7 - a[3]) - Main.double(2)) + 1];  // a[5] = 8 * 5 = 40\n        let c[0] = null;\n        let c = c[0];\n        \n        do Output.printString(\"Test 1: expected result: 5; actual result: \");\n        do Output.printInt(b[2]);\n        do Output.println();\n        do Output.printString(\"Test 2: expected result: 40; actual result: \");\n        do Output.printInt(a[5]);\n        do Output.println();\n        do Output.printString(\"Test 3: expected result: 0; actual result: \");\n        do Output.printInt(c);\n        do Output.println();\n        \n        let c = null;\n\n        if (c = null) {\n            do Main.fill(a, 10);\n            let c = a[3];\n            let c[1] = 33;\n            let c = a[7];\n            let c[1] = 77;\n            let b = a[3];\n            let b[1] = b[1] + c[1];  // b[1] = 33 + 77 = 110;\n        }\n\n        do Output.printString(\"Test 4: expected result: 77; actual result: \");\n        do Output.printInt(c[1]);\n        do Output.println();\n        do Output.printString(\"Test 5: expected result: 110; actual result: \");\n        do Output.printInt(b[1]);\n        do Output.println();\n        return;\n    }\n    \n    function int double(int a) {\n      return a * 2;\n    }\n    \n    function void fill(Array a, int size) {\n        while (size > 0) {\n            let size = size - 1;\n            let a[size] = Array.new(3);\n        }\n        return;\n    }\n}";
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
                        value?: undefined;
                        index?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                arrayIndex?: undefined;
                call?: undefined;
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
                arrayIndex: {
                    nodeType: string;
                    term: {
                        termType: string;
                        value: number;
                        name?: undefined;
                        index?: undefined;
                        span?: undefined;
                    };
                    rest: never[];
                };
                value: {
                    nodeType: string;
                    term: {
                        termType: string;
                        value: number;
                        name?: undefined;
                        parameters?: undefined;
                        span?: undefined;
                        index?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                call?: undefined;
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
                arrayIndex: {
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
                        index: {
                            nodeType: string;
                            term: {
                                termType: string;
                                value: number;
                                name?: undefined;
                                index?: undefined;
                                span?: undefined;
                            };
                            rest: never[];
                        };
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        value?: undefined;
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
                        index: {
                            nodeType: string;
                            term: {
                                termType: string;
                                value: number;
                                name?: undefined;
                                index?: undefined;
                                span?: undefined;
                            };
                            rest: never[];
                        };
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        parameters?: undefined;
                        value?: undefined;
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
                arrayIndex: {
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
                        index: {
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
                                index: {
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
                                value?: undefined;
                            };
                            rest: never[];
                        };
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        value?: undefined;
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
                        index: {
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
                                index: {
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
                                value?: undefined;
                            };
                            rest: never[];
                        };
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        parameters?: undefined;
                        value?: undefined;
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
                                    expression: {
                                        nodeType: string;
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
                                                                value: number;
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
                call?: undefined;
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
                arrayIndex: {
                    nodeType: string;
                    term: {
                        termType: string;
                        value: number;
                        name?: undefined;
                        index?: undefined;
                        span?: undefined;
                    };
                    rest: never[];
                };
                value: {
                    nodeType: string;
                    term: {
                        termType: string;
                        value: string;
                        name?: undefined;
                        parameters?: undefined;
                        span?: undefined;
                        index?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                call?: undefined;
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
                        index: {
                            nodeType: string;
                            term: {
                                termType: string;
                                value: number;
                                name?: undefined;
                                index?: undefined;
                                span?: undefined;
                            };
                            rest: never[];
                        };
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        parameters?: undefined;
                        value?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                arrayIndex?: undefined;
                call?: undefined;
                condition?: undefined;
                body?: undefined;
                else?: undefined;
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
                arrayIndex?: undefined;
                condition?: undefined;
                body?: undefined;
                else?: undefined;
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
                                    value: number;
                                };
                                rest: never[];
                            };
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
                arrayIndex?: undefined;
                condition?: undefined;
                body?: undefined;
                else?: undefined;
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
                arrayIndex?: undefined;
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
                        value: string;
                        name?: undefined;
                        parameters?: undefined;
                        span?: undefined;
                        index?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                arrayIndex?: undefined;
                call?: undefined;
                condition?: undefined;
                body?: undefined;
                else?: undefined;
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
                            value: string;
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
                        parameters: ({
                            nodeType: string;
                            term: {
                                termType: string;
                                name: string;
                                span: {
                                    start: number;
                                    end: number;
                                    line: number;
                                };
                                value?: undefined;
                            };
                            rest: never[];
                        } | {
                            nodeType: string;
                            term: {
                                termType: string;
                                value: number;
                                name?: undefined;
                                span?: undefined;
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
                                    value: number;
                                };
                                rest: never[];
                            };
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
                    call?: undefined;
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
                    arrayIndex: {
                        nodeType: string;
                        term: {
                            termType: string;
                            value: number;
                        };
                        rest: never[];
                    };
                    value: {
                        nodeType: string;
                        term: {
                            termType: string;
                            value: number;
                            name?: undefined;
                            index?: undefined;
                            span?: undefined;
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
                            value: number;
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
                            index: {
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
                            value?: undefined;
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
                                        value: number;
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
                    call?: undefined;
                })[];
                else: never[];
                name?: undefined;
                value?: undefined;
                span?: undefined;
                arrayIndex?: undefined;
                call?: undefined;
            } | {
                statementType: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                name?: undefined;
                value?: undefined;
                arrayIndex?: undefined;
                call?: undefined;
                condition?: undefined;
                body?: undefined;
                else?: undefined;
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
export declare const compiled = "function Main.main 3\n    push constant 10\n    call Array.new 1\n    pop local 0\n    push constant 5\n    call Array.new 1\n    pop local 1\n    push constant 1\n    call Array.new 1\n    pop local 2\n    push constant 3\n    push local 0\n    add\n    push constant 2\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 4\n    push local 0\n    add\n    push constant 8\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 5\n    push local 0\n    add\n    push constant 4\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 3\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    push local 1\n    add\n    push constant 3\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    push constant 3\n    add\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 3\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    push local 1\n    add\n    pop pointer 1\n    push that 0\n    push local 0\n    add\n    push constant 5\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    push constant 7\n    push constant 3\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    sub\n    push constant 2\n    call Main.double 1\n    sub\n    push constant 1\n    add\n    push local 1\n    add\n    pop pointer 1\n    push that 0\n    call Math.multiply 2\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 0\n    push local 2\n    add\n    push constant 0\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 0\n    push local 2\n    add\n    pop pointer 1\n    push that 0\n    pop local 2\n    push constant 43\n    call String.new 1\n    push constant 84\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 49\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 120\n    call String.appendChar 2\n    push constant 112\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 100\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 53\n    call String.appendChar 2\n    push constant 59\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    push constant 2\n    push local 1\n    add\n    pop pointer 1\n    push that 0\n    call Output.printInt 1\n    pop temp 0\n    call Output.println 0\n    pop temp 0\n    push constant 44\n    call String.new 1\n    push constant 84\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 50\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 120\n    call String.appendChar 2\n    push constant 112\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 100\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 52\n    call String.appendChar 2\n    push constant 48\n    call String.appendChar 2\n    push constant 59\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    push constant 5\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    call Output.printInt 1\n    pop temp 0\n    call Output.println 0\n    pop temp 0\n    push constant 43\n    call String.new 1\n    push constant 84\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 51\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 120\n    call String.appendChar 2\n    push constant 112\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 100\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 48\n    call String.appendChar 2\n    push constant 59\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    push local 2\n    call Output.printInt 1\n    pop temp 0\n    call Output.println 0\n    pop temp 0\n    push constant 0\n    pop local 2\n    push local 2\n    push constant 0\n    eq\n    not\n    if-goto Main_1\n    push local 0\n    push constant 10\n    call Main.fill 2\n    pop temp 0\n    push constant 3\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    pop local 2\n    push constant 1\n    push local 2\n    add\n    push constant 33\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 7\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    pop local 2\n    push constant 1\n    push local 2\n    add\n    push constant 77\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    push constant 3\n    push local 0\n    add\n    pop pointer 1\n    push that 0\n    pop local 1\n    push constant 1\n    push local 1\n    add\n    push constant 1\n    push local 1\n    add\n    pop pointer 1\n    push that 0\n    push constant 1\n    push local 2\n    add\n    pop pointer 1\n    push that 0\n    add\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    goto Main_0\nlabel Main_1\nlabel Main_0\n    push constant 44\n    call String.new 1\n    push constant 84\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 52\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 120\n    call String.appendChar 2\n    push constant 112\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 100\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 55\n    call String.appendChar 2\n    push constant 55\n    call String.appendChar 2\n    push constant 59\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    push constant 1\n    push local 2\n    add\n    pop pointer 1\n    push that 0\n    call Output.printInt 1\n    pop temp 0\n    call Output.println 0\n    pop temp 0\n    push constant 45\n    call String.new 1\n    push constant 84\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 53\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 120\n    call String.appendChar 2\n    push constant 112\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 100\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 49\n    call String.appendChar 2\n    push constant 49\n    call String.appendChar 2\n    push constant 48\n    call String.appendChar 2\n    push constant 59\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 115\n    call String.appendChar 2\n    push constant 117\n    call String.appendChar 2\n    push constant 108\n    call String.appendChar 2\n    push constant 116\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    push constant 1\n    push local 1\n    add\n    pop pointer 1\n    push that 0\n    call Output.printInt 1\n    pop temp 0\n    call Output.println 0\n    pop temp 0\n    push constant 0\n    return\nfunction Main.double 0\n    push argument 0\n    push constant 2\n    call Math.multiply 2\n    return\nfunction Main.fill 0\nlabel Main_2\n    push argument 1\n    push constant 0\n    gt\n    not\n    if-goto Main_3\n    push argument 1\n    push constant 1\n    sub\n    pop argument 1\n    push argument 1\n    push argument 0\n    add\n    push constant 3\n    call Array.new 1\n    pop temp 0\n    pop pointer 1\n    push temp 0\n    pop that 0\n    goto Main_2\nlabel Main_3\n    push constant 0\n    return";

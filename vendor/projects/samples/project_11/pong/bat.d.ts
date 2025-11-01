export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Pong/Bat.jack\n// (Same as projects/9/Pong/Bat.jack)\n/**\n * A graphical bat in a Pong game. \n * Displayed as a filled horizontal rectangle that has a screen location,\n * a width and a height.\n * Has methods for drawing, erasing, moving left and right, and changing \n * its width (to make the hitting action more challenging).\n * This class should have been called \"Paddle\", following the \n * standard Pong terminology. Unaware of this terminology,\n * we called it \"bat\", and the name stuck. \n */\nclass Bat {\n\n    field int x, y;           // the bat's screen location\n    field int width, height;  // the bat's width and height\n    field int direction;      // direction of the bat's movement\n                              //  (1 = left, 2 = right)\n\n    /** Constructs a new bat with the given location and width. */\n    constructor Bat new(int Ax, int Ay, int Awidth, int Aheight) {\n        let x = Ax;\n        let y = Ay;\n        let width = Awidth;\n        let height = Aheight;\n        let direction = 2;\n        do show();\n        return this;\n    }\n\n    /** Deallocates the object's memory. */\n    method void dispose() {\n        do Memory.deAlloc(this);\n        return;\n    }\n\n    /** Shows the bat. */\n    method void show() {\n        do Screen.setColor(true);\n        do draw();\n        return;\n    }\n\n    /** Hides the bat. */\n    method void hide() {\n        do Screen.setColor(false);\n        do draw();\n        return;\n    }\n\n    /** Draws the bat. */\n    method void draw() {\n        do Screen.drawRectangle(x, y, x + width, y + height);\n        return;\n    }\n\n    /** Sets the bat's direction (0=stop, 1=left, 2=right). */\n    method void setDirection(int Adirection) {\n        let direction = Adirection;\n        return;\n    }\n\n    /** Returns the bat's left edge. */\n    method int getLeft() {\n        return x;\n    }\n\n    /** Returns the bat's right edge. */\n    method int getRight() {\n        return x + width;\n    }\n\n    /** Sets the bat's width. */\n    method void setWidth(int Awidth) {\n        do hide();\n        let width = Awidth;\n        do show();\n        return;\n    }\n\n    /** Moves the bat one step in the bat's direction. */\n    method void move() {\n      if (direction = 1) {\n            let x = x - 4;\n            if (x < 0) { let x = 0; }\n            do Screen.setColor(false);\n            do Screen.drawRectangle((x + width) + 1, y, (x + width) + 4, y + height);\n            do Screen.setColor(true);\n            do Screen.drawRectangle(x, y, x + 3, y + height);\n        }\n        else {\n            let x = x + 4;\n            if ((x + width) > 511) { let x = 511 - width; }\n            do Screen.setColor(false);\n            do Screen.drawRectangle(x - 4, y, x - 1, y + height);\n            do Screen.setColor(true);\n            do Screen.drawRectangle((x + width) - 3, y, x + width, y + height);\n        }\n        return;\n    }\n}";
export declare const parsed: {
    name: {
        value: string;
        span: {
            start: number;
            end: number;
            line: number;
        };
    };
    varDecs: {
        varType: string;
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
                    parameters: never[];
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
                value: {
                    nodeType: string;
                    term: {
                        termType: string;
                        value: string;
                        name?: undefined;
                        span?: undefined;
                    };
                    rest: never[];
                };
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                name?: undefined;
                call?: undefined;
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
        parameters: never[];
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
                            name: string;
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
                    parameters: never[];
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
        parameters: never[];
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
                                value: number;
                            };
                        }[];
                    };
                    body: {
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
                            };
                            rest: never[];
                        };
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    }[];
                    else: never[];
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
                        parameters: ({
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
                                name?: undefined;
                                span?: undefined;
                            };
                            rest: {
                                op: string;
                                term: {
                                    termType: string;
                                    value: number;
                                };
                            }[];
                        } | {
                            nodeType: string;
                            term: {
                                termType: string;
                                name: string;
                                span: {
                                    start: number;
                                    end: number;
                                    line: number;
                                };
                                expression?: undefined;
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
                            };
                            rest: {
                                op: string;
                                term: {
                                    termType: string;
                                    value: number;
                                };
                            }[];
                        } | {
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
                    condition?: undefined;
                    body?: undefined;
                    else?: undefined;
                })[];
                else: ({
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
                    condition?: undefined;
                    body?: undefined;
                    else?: undefined;
                    call?: undefined;
                } | {
                    statementType: string;
                    condition: {
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
                    body: {
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
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                    }[];
                    else: never[];
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
                            };
                            rest: {
                                op: string;
                                term: {
                                    termType: string;
                                    value: number;
                                };
                            }[];
                        } | {
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
                        parameters: ({
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
                                name?: undefined;
                                span?: undefined;
                            };
                            rest: {
                                op: string;
                                term: {
                                    termType: string;
                                    value: number;
                                };
                            }[];
                        } | {
                            nodeType: string;
                            term: {
                                termType: string;
                                name: string;
                                span: {
                                    start: number;
                                    end: number;
                                    line: number;
                                };
                                expression?: undefined;
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
                    condition?: undefined;
                    body?: undefined;
                    else?: undefined;
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
                else?: undefined;
            })[];
        };
    })[];
};
export declare const compiled = "function Bat.new 0\n    push constant 5\n    call Memory.alloc 1\n    pop pointer 0\n    push argument 0\n    pop this 0\n    push argument 1\n    pop this 1\n    push argument 2\n    pop this 2\n    push argument 3\n    pop this 3\n    push constant 2\n    pop this 4\n    push pointer 0\n    call Bat.show 1\n    pop temp 0\n    push pointer 0\n    return\nfunction Bat.dispose 0\n    push argument 0\n    pop pointer 0\n    push pointer 0\n    call Memory.deAlloc 1\n    pop temp 0\n    push constant 0\n    return\nfunction Bat.show 0\n    push argument 0\n    pop pointer 0\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push pointer 0\n    call Bat.draw 1\n    pop temp 0\n    push constant 0\n    return\nfunction Bat.hide 0\n    push argument 0\n    pop pointer 0\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push pointer 0\n    call Bat.draw 1\n    pop temp 0\n    push constant 0\n    return\nfunction Bat.draw 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 3\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push constant 0\n    return\nfunction Bat.setDirection 0\n    push argument 0\n    pop pointer 0\n    push argument 1\n    pop this 4\n    push constant 0\n    return\nfunction Bat.getLeft 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    return\nfunction Bat.getRight 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    push this 2\n    add\n    return\nfunction Bat.setWidth 0\n    push argument 0\n    pop pointer 0\n    push pointer 0\n    call Bat.hide 1\n    pop temp 0\n    push argument 1\n    pop this 2\n    push pointer 0\n    call Bat.show 1\n    pop temp 0\n    push constant 0\n    return\nfunction Bat.move 0\n    push argument 0\n    pop pointer 0\n    push this 4\n    push constant 1\n    eq\n    not\n    if-goto Bat_1\n    push this 0\n    push constant 4\n    sub\n    pop this 0\n    push this 0\n    push constant 0\n    lt\n    not\n    if-goto Bat_3\n    push constant 0\n    pop this 0\n    goto Bat_2\nlabel Bat_3\nlabel Bat_2\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 2\n    add\n    push constant 1\n    add\n    push this 1\n    push this 0\n    push this 2\n    add\n    push constant 4\n    add\n    push this 1\n    push this 3\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 0\n    push constant 3\n    add\n    push this 1\n    push this 3\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    goto Bat_0\nlabel Bat_1\n    push this 0\n    push constant 4\n    add\n    pop this 0\n    push this 0\n    push this 2\n    add\n    push constant 511\n    gt\n    not\n    if-goto Bat_5\n    push constant 511\n    push this 2\n    sub\n    pop this 0\n    goto Bat_4\nlabel Bat_5\nlabel Bat_4\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push constant 4\n    sub\n    push this 1\n    push this 0\n    push constant 1\n    sub\n    push this 1\n    push this 3\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 2\n    add\n    push constant 3\n    sub\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 3\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\nlabel Bat_0\n    push constant 0\n    return";

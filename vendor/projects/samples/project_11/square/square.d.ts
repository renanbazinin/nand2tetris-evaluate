export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Square/Square.jack\n\n/** Implements a graphical square.\n    The square has top-left x and y coordinates, and a size. */\nclass Square {\n\n   field int x, y; // screen location of the top-left corner of this square\n   field int size; // length of this square, in pixels\n\n   /** Constructs and draws a new square with a given location and size. */\n   constructor Square new(int ax, int ay, int asize) {\n      let x = ax;\n      let y = ay;\n      let size = asize;\n      do draw();\n      return this;\n   }\n\n   /** Disposes this square. */\n   method void dispose() {\n      do Memory.deAlloc(this);\n      return;\n   }\n\n   /** Draws this square in its current (x,y) location */\n   method void draw() {\n      // Draws the square using the color black\n      do Screen.setColor(true);\n      do Screen.drawRectangle(x, y, x + size, y + size);\n      return;\n   }\n\n   /** Erases this square. */\n   method void erase() {\n      // Draws the square using the color white (background color)\n      do Screen.setColor(false);\n      do Screen.drawRectangle(x, y, x + size, y + size);\n      return;\n   }\n\n    /** Increments the square size by 2 pixels (if possible). */\n   method void incSize() {\n      if (((y + size) < 254) & ((x + size) < 510)) {\n         do erase();\n         let size = size + 2;\n         do draw();\n      }\n      return;\n   }\n\n   /** Decrements the square size by 2 pixels (if possible). */\n   method void decSize() {\n      if (size > 2) {\n         do erase();\n         let size = size - 2;\n         do draw();\n      }\n      return;\n   }\n\n   /** Moves this square up by 2 pixels (if possible). */\n   method void moveUp() {\n      if (y > 1) {\n         // Erases the bottom two rows of this square in its current location\n         do Screen.setColor(false);\n         do Screen.drawRectangle(x, (y + size) - 1, x + size, y + size);\n         let y = y - 2;\n         // Draws the top two rows of this square in its new location\n         do Screen.setColor(true);\n         do Screen.drawRectangle(x, y, x + size, y + 1);\n      }\n      return;\n   }\n\n   /** Moves the square down by 2 pixels (if possible). */\n   method void moveDown() {\n      if ((y + size) < 254) {\n         do Screen.setColor(false);\n         do Screen.drawRectangle(x, y, x + size, y + 1);\n         let y = y + 2;\n         do Screen.setColor(true);\n         do Screen.drawRectangle(x, (y + size) - 1, x + size, y + size);\n      }\n      return;\n   }\n\n   /** Moves the square left by 2 pixels (if possible). */\n   method void moveLeft() {\n      if (x > 1) {\n         do Screen.setColor(false);\n         do Screen.drawRectangle((x + size) - 1, y, x + size, y + size);\n         let x = x - 2;\n         do Screen.setColor(true);\n         do Screen.drawRectangle(x, y, x + 1, y + size);\n      }\n      return;\n   }\n\n   /** Moves the square right by 2 pixels (if possible). */\n   method void moveRight() {\n      if ((x + size) < 510) {\n         do Screen.setColor(false);\n         do Screen.drawRectangle(x, y, x + 1, y + size);\n         let x = x + 2;\n         do Screen.setColor(true);\n         do Screen.drawRectangle((x + size) - 1, y, x + size, y + size);\n      }\n      return;\n   }\n}";
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
            statements: ({
                statementType: string;
                condition: {
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
                    rest: {
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
                else: never[];
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
                                    name: string;
                                    span: {
                                        start: number;
                                        end: number;
                                        line: number;
                                    };
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
                                    value: number;
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
                })[];
                else: never[];
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
                                    name: string;
                                    span: {
                                        start: number;
                                        end: number;
                                        line: number;
                                    };
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
                                    value: number;
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
                })[];
                else: never[];
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
export declare const compiled = "function Square.new 0\n    push constant 3\n    call Memory.alloc 1\n    pop pointer 0\n    push argument 0\n    pop this 0\n    push argument 1\n    pop this 1\n    push argument 2\n    pop this 2\n    push pointer 0\n    call Square.draw 1\n    pop temp 0\n    push pointer 0\n    return\nfunction Square.dispose 0\n    push argument 0\n    pop pointer 0\n    push pointer 0\n    call Memory.deAlloc 1\n    pop temp 0\n    push constant 0\n    return\nfunction Square.draw 0\n    push argument 0\n    pop pointer 0\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push constant 0\n    return\nfunction Square.erase 0\n    push argument 0\n    pop pointer 0\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push constant 0\n    return\nfunction Square.incSize 0\n    push argument 0\n    pop pointer 0\n    push this 1\n    push this 2\n    add\n    push constant 254\n    lt\n    push this 0\n    push this 2\n    add\n    push constant 510\n    lt\n    and\n    not\n    if-goto Square_1\n    push pointer 0\n    call Square.erase 1\n    pop temp 0\n    push this 2\n    push constant 2\n    add\n    pop this 2\n    push pointer 0\n    call Square.draw 1\n    pop temp 0\n    goto Square_0\nlabel Square_1\nlabel Square_0\n    push constant 0\n    return\nfunction Square.decSize 0\n    push argument 0\n    pop pointer 0\n    push this 2\n    push constant 2\n    gt\n    not\n    if-goto Square_3\n    push pointer 0\n    call Square.erase 1\n    pop temp 0\n    push this 2\n    push constant 2\n    sub\n    pop this 2\n    push pointer 0\n    call Square.draw 1\n    pop temp 0\n    goto Square_2\nlabel Square_3\nlabel Square_2\n    push constant 0\n    return\nfunction Square.moveUp 0\n    push argument 0\n    pop pointer 0\n    push this 1\n    push constant 1\n    gt\n    not\n    if-goto Square_5\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 2\n    add\n    push constant 1\n    sub\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push this 1\n    push constant 2\n    sub\n    pop this 1\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push constant 1\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    goto Square_4\nlabel Square_5\nlabel Square_4\n    push constant 0\n    return\nfunction Square.moveDown 0\n    push argument 0\n    pop pointer 0\n    push this 1\n    push this 2\n    add\n    push constant 254\n    lt\n    not\n    if-goto Square_7\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push constant 1\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push this 1\n    push constant 2\n    add\n    pop this 1\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 2\n    add\n    push constant 1\n    sub\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    goto Square_6\nlabel Square_7\nlabel Square_6\n    push constant 0\n    return\nfunction Square.moveLeft 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    push constant 1\n    gt\n    not\n    if-goto Square_9\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 2\n    add\n    push constant 1\n    sub\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push this 0\n    push constant 2\n    sub\n    pop this 0\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 0\n    push constant 1\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    goto Square_8\nlabel Square_9\nlabel Square_8\n    push constant 0\n    return\nfunction Square.moveRight 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    push this 2\n    add\n    push constant 510\n    lt\n    not\n    if-goto Square_11\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 1\n    push this 0\n    push constant 1\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push this 0\n    push constant 2\n    add\n    pop this 0\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push this 0\n    push this 2\n    add\n    push constant 1\n    sub\n    push this 1\n    push this 0\n    push this 2\n    add\n    push this 1\n    push this 2\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    goto Square_10\nlabel Square_11\nlabel Square_10\n    push constant 0\n    return";

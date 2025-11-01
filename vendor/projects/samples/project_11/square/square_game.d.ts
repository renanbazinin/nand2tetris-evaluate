export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Square/SquareGame.jack\n/**\n * Implements the Square game.\n * This simple game allows the user to move a black square around\n * the screen, and change the square's size during the movement.\n * When the game starts, a square of 30 by 30 pixels is shown at the\n * top-left corner of the screen. The user controls the square as follows.\n * The 4 arrow keys are used to move the square up, down, left, and right.\n * The 'z' and 'x' keys are used, respectively, to decrement and increment\n * the square's size. The 'q' key is used to quit the game.\n */\nclass SquareGame {\n   field Square square; // the square of this game\n   field int direction; // the square's current direction: \n                        // 0=none, 1=up, 2=down, 3=left, 4=right\n\n   /** Constructs a new square game. */\n   constructor SquareGame new() {\n      // The initial square is located in (0,0), has size 30, and is not moving.\n      let square = Square.new(0, 0, 30);\n      let direction = 0;\n      return this;\n   }\n\n   /** Disposes this game. */\n   method void dispose() {\n      do square.dispose();\n      do Memory.deAlloc(this);\n      return;\n   }\n\n   /** Moves the square in the current direction. */\n   method void moveSquare() {\n      if (direction = 1) { do square.moveUp(); }\n      if (direction = 2) { do square.moveDown(); }\n      if (direction = 3) { do square.moveLeft(); }\n      if (direction = 4) { do square.moveRight(); }\n      do Sys.wait(5);  // delays the next movement\n      return;\n   }\n\n   /** Runs the game: handles the user's inputs and moves the square accordingly */\n   method void run() {\n      var char key;  // the key currently pressed by the user\n      var boolean exit;\n      let exit = false;\n      \n      while (~exit) {\n         // waits for a key to be pressed\n         while (key = 0) {\n            let key = Keyboard.keyPressed();\n            do moveSquare();\n         }\n         if (key = 81)  { let exit = true; }     // q key\n         if (key = 90)  { do square.decSize(); } // z key\n         if (key = 88)  { do square.incSize(); } // x key\n         if (key = 131) { let direction = 1; }   // up arrow\n         if (key = 133) { let direction = 2; }   // down arrow\n         if (key = 130) { let direction = 3; }   // left arrow\n         if (key = 132) { let direction = 4; }   // right arrow\n\n         // waits for the key to be released\n         while (~(key = 0)) {\n            let key = Keyboard.keyPressed();\n            do moveSquare();\n         }\n     } // while\n     return;\n   }\n}\n\n\n";
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
        parameters: never[];
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
            } | {
                statementType: string;
                value: {
                    nodeType: string;
                    term: {
                        termType: string;
                        value: string;
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
                name?: undefined;
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
                }[];
                else: never[];
                call?: undefined;
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
                condition?: undefined;
                body?: undefined;
                else?: undefined;
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
                    };
                    rest: never[];
                };
                body: ({
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
                            op?: undefined;
                            term?: undefined;
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
                    })[];
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
                            op?: undefined;
                            term?: undefined;
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
                    else: never[];
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
                            op?: undefined;
                            term?: undefined;
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
                    }[];
                    else: never[];
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
                            op?: undefined;
                            term?: undefined;
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
                            name?: undefined;
                            span?: undefined;
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
                    })[];
                    else?: undefined;
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
    })[];
};
export declare const compiled = "function SquareGame.new 0\n    push constant 2\n    call Memory.alloc 1\n    pop pointer 0\n    push constant 0\n    push constant 0\n    push constant 30\n    call Square.new 3\n    pop this 0\n    push constant 0\n    pop this 1\n    push pointer 0\n    return\nfunction SquareGame.dispose 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    call Square.dispose 1\n    pop temp 0\n    push pointer 0\n    call Memory.deAlloc 1\n    pop temp 0\n    push constant 0\n    return\nfunction SquareGame.moveSquare 0\n    push argument 0\n    pop pointer 0\n    push this 1\n    push constant 1\n    eq\n    not\n    if-goto SquareGame_1\n    push this 0\n    call Square.moveUp 1\n    pop temp 0\n    goto SquareGame_0\nlabel SquareGame_1\nlabel SquareGame_0\n    push this 1\n    push constant 2\n    eq\n    not\n    if-goto SquareGame_3\n    push this 0\n    call Square.moveDown 1\n    pop temp 0\n    goto SquareGame_2\nlabel SquareGame_3\nlabel SquareGame_2\n    push this 1\n    push constant 3\n    eq\n    not\n    if-goto SquareGame_5\n    push this 0\n    call Square.moveLeft 1\n    pop temp 0\n    goto SquareGame_4\nlabel SquareGame_5\nlabel SquareGame_4\n    push this 1\n    push constant 4\n    eq\n    not\n    if-goto SquareGame_7\n    push this 0\n    call Square.moveRight 1\n    pop temp 0\n    goto SquareGame_6\nlabel SquareGame_7\nlabel SquareGame_6\n    push constant 5\n    call Sys.wait 1\n    pop temp 0\n    push constant 0\n    return\nfunction SquareGame.run 2\n    push argument 0\n    pop pointer 0\n    push constant 0\n    pop local 1\nlabel SquareGame_8\n    push local 1\n    not\n    not\n    if-goto SquareGame_9\nlabel SquareGame_10\n    push local 0\n    push constant 0\n    eq\n    not\n    if-goto SquareGame_11\n    call Keyboard.keyPressed 0\n    pop local 0\n    push pointer 0\n    call SquareGame.moveSquare 1\n    pop temp 0\n    goto SquareGame_10\nlabel SquareGame_11\n    push local 0\n    push constant 81\n    eq\n    not\n    if-goto SquareGame_13\n    push constant 1\n    neg\n    pop local 1\n    goto SquareGame_12\nlabel SquareGame_13\nlabel SquareGame_12\n    push local 0\n    push constant 90\n    eq\n    not\n    if-goto SquareGame_15\n    push this 0\n    call Square.decSize 1\n    pop temp 0\n    goto SquareGame_14\nlabel SquareGame_15\nlabel SquareGame_14\n    push local 0\n    push constant 88\n    eq\n    not\n    if-goto SquareGame_17\n    push this 0\n    call Square.incSize 1\n    pop temp 0\n    goto SquareGame_16\nlabel SquareGame_17\nlabel SquareGame_16\n    push local 0\n    push constant 131\n    eq\n    not\n    if-goto SquareGame_19\n    push constant 1\n    pop this 1\n    goto SquareGame_18\nlabel SquareGame_19\nlabel SquareGame_18\n    push local 0\n    push constant 133\n    eq\n    not\n    if-goto SquareGame_21\n    push constant 2\n    pop this 1\n    goto SquareGame_20\nlabel SquareGame_21\nlabel SquareGame_20\n    push local 0\n    push constant 130\n    eq\n    not\n    if-goto SquareGame_23\n    push constant 3\n    pop this 1\n    goto SquareGame_22\nlabel SquareGame_23\nlabel SquareGame_22\n    push local 0\n    push constant 132\n    eq\n    not\n    if-goto SquareGame_25\n    push constant 4\n    pop this 1\n    goto SquareGame_24\nlabel SquareGame_25\nlabel SquareGame_24\nlabel SquareGame_26\n    push local 0\n    push constant 0\n    eq\n    not\n    not\n    if-goto SquareGame_27\n    call Keyboard.keyPressed 0\n    pop local 0\n    push pointer 0\n    call SquareGame.moveSquare 1\n    pop temp 0\n    goto SquareGame_26\nlabel SquareGame_27\n    goto SquareGame_8\nlabel SquareGame_9\n    push constant 0\n    return";

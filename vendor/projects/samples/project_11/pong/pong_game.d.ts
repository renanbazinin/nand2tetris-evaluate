export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Pong/PongGame.jack\n// (Same as projects/9/Pong/PongGame.jack)\n/**\n * Represents a Pong game.\n */\nclass PongGame {\n\n    static PongGame instance; // A Pong game     \n    field Bat bat;            // bat\n    field Ball ball;          // ball\n    field int wall;           // current wall that the ball is bouncing off of\n    field boolean exit;       // true when the game is over\n    field int score;          // current score\n    field int lastWall;       // last wall that the ball bounced off of\n\n    // The current width of the bat\n    field int batWidth;\n\n    /** Constructs a new Pong game. */\n    constructor PongGame new() {\n      do Screen.clearScreen();\n        let batWidth = 50;  // initial bat size\n        let bat = Bat.new(230, 229, batWidth, 7);\n        let ball = Ball.new(253, 222, 0, 511, 0, 229);\n        do ball.setDestination(400,0);\n        do Screen.drawRectangle(0, 238, 511, 240);\n      do Output.moveCursor(22,0);\n      do Output.printString(\"Score: 0\");\n  \n      let exit = false;\n      let score = 0;\n      let wall = 0;\n      let lastWall = 0;\n\n        return this;\n    }\n\n    /** Deallocates the object's memory. */\n    method void dispose() {\n        do bat.dispose();\n      do ball.dispose();\n        do Memory.deAlloc(this);\n        return;\n    }\n\n    /** Creates an instance of a Pong game. */\n    function void newInstance() {\n        let instance = PongGame.new();\n        return;\n    }\n    \n    /** Returns this Pong game. */\n    function PongGame getInstance() {\n        return instance;\n    }\n\n    /** Starts the game, and handles inputs from the user that control\n     *  the bat's movement direction. */\n    method void run() {\n        var char key;\n\n        while (~exit) {\n            // waits for a key to be pressed.\n            while ((key = 0) & (~exit)) {\n                let key = Keyboard.keyPressed();\n                do bat.move();\n                do moveBall();\n                do Sys.wait(50);\n            }\n\n            if (key = 130) { do bat.setDirection(1); }\n          else {\n              if (key = 132) { do bat.setDirection(2); }\n            else {\n                    if (key = 140) { let exit = true; }\n            }\n            }\n\n            // Waits for the key to be released.\n            while ((~(key = 0)) & (~exit)) {\n                let key = Keyboard.keyPressed();\n                do bat.move();\n                do moveBall();\n                do Sys.wait(50);\n            }\n        }\n\n      if (exit) {\n            do Output.moveCursor(10,27);\n          do Output.printString(\"Game Over\");\n      }\n            \n        return;\n    }\n\n    /**\n     * Handles ball movement, including bouncing.\n     * If the ball bounces off a wall, finds its new direction.\n     * If the ball bounces off the bat, increases the score by one\n     * and shrinks the bat's size, to make the game more challenging. \n     */\n    method void moveBall() {\n        var int bouncingDirection, batLeft, batRight, ballLeft, ballRight;\n\n        let wall = ball.move();\n\n        if ((wall > 0) & (~(wall = lastWall))) {\n            let lastWall = wall;\n            let bouncingDirection = 0;\n            let batLeft = bat.getLeft();\n            let batRight = bat.getRight();\n            let ballLeft = ball.getLeft();\n            let ballRight = ball.getRight();\n  \n            if (wall = 4) {\n                let exit = (batLeft > ballRight) | (batRight < ballLeft);\n                if (~exit) {\n                    if (ballRight < (batLeft + 10)) { let bouncingDirection = -1; }\n                    else {\n                        if (ballLeft > (batRight - 10)) { let bouncingDirection = 1; }\n                    }\n\n                    let batWidth = batWidth - 2;\n                    do bat.setWidth(batWidth);      \n                    let score = score + 1;\n                    do Output.moveCursor(22,7);\n                    do Output.printInt(score);\n                }\n            }\n            do ball.bounce(bouncingDirection);\n        }\n        return;\n    }\n}";
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
                        parameters: ({
                            nodeType: string;
                            term: {
                                termType: string;
                                value: number;
                                name?: undefined;
                                span?: undefined;
                            };
                            rest: never[];
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
                                value?: undefined;
                            };
                            rest: never[];
                        })[];
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
                    rest: never[];
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
                        name?: undefined;
                        span?: undefined;
                    };
                    rest: never[];
                };
                body: ({
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
                            name?: undefined;
                            span?: undefined;
                        };
                        rest: {
                            op: string;
                            term: {
                                termType: string;
                                expression: {
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
                            expression?: undefined;
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
                    else: {
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
                        else: {
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
                        }[];
                    }[];
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
                            name?: undefined;
                            span?: undefined;
                        };
                        rest: {
                            op: string;
                            term: {
                                termType: string;
                                expression: {
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
                        name?: undefined;
                        value?: undefined;
                        span?: undefined;
                    })[];
                    else?: undefined;
                })[];
                else?: undefined;
                span?: undefined;
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
                    rest: never[];
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
                condition?: undefined;
                body?: undefined;
                else?: undefined;
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
                                };
                                rest: never[];
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
                            parameters?: undefined;
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
                            parameters?: undefined;
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
                            parameters: never[];
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
                                };
                                rest: {
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
                                        op: string;
                                        term: {
                                            termType: string;
                                            value: number;
                                        };
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
                            }[];
                            name?: undefined;
                            value?: undefined;
                            span?: undefined;
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
                            condition?: undefined;
                            body?: undefined;
                            else?: undefined;
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
                            name?: undefined;
                            value?: undefined;
                            span?: undefined;
                        })[];
                        else: never[];
                        name?: undefined;
                        value?: undefined;
                        span?: undefined;
                    })[];
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
                    condition?: undefined;
                    body?: undefined;
                    else?: undefined;
                })[];
                else: never[];
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
                else?: undefined;
            })[];
        };
    })[];
};
export declare const compiled = "function PongGame.new 0\n    push constant 7\n    call Memory.alloc 1\n    pop pointer 0\n    call Screen.clearScreen 0\n    pop temp 0\n    push constant 50\n    pop this 6\n    push constant 230\n    push constant 229\n    push this 6\n    push constant 7\n    call Bat.new 4\n    pop this 0\n    push constant 253\n    push constant 222\n    push constant 0\n    push constant 511\n    push constant 0\n    push constant 229\n    call Ball.new 6\n    pop this 1\n    push this 1\n    push constant 400\n    push constant 0\n    call Ball.setDestination 3\n    pop temp 0\n    push constant 0\n    push constant 238\n    push constant 511\n    push constant 240\n    call Screen.drawRectangle 4\n    pop temp 0\n    push constant 22\n    push constant 0\n    call Output.moveCursor 2\n    pop temp 0\n    push constant 8\n    call String.new 1\n    push constant 83\n    call String.appendChar 2\n    push constant 99\n    call String.appendChar 2\n    push constant 111\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 58\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 48\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    push constant 0\n    pop this 3\n    push constant 0\n    pop this 4\n    push constant 0\n    pop this 2\n    push constant 0\n    pop this 5\n    push pointer 0\n    return\nfunction PongGame.dispose 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    call Bat.dispose 1\n    pop temp 0\n    push this 1\n    call Ball.dispose 1\n    pop temp 0\n    push pointer 0\n    call Memory.deAlloc 1\n    pop temp 0\n    push constant 0\n    return\nfunction PongGame.newInstance 0\n    call PongGame.new 0\n    pop static 0\n    push constant 0\n    return\nfunction PongGame.getInstance 0\n    push static 0\n    return\nfunction PongGame.run 1\n    push argument 0\n    pop pointer 0\nlabel PongGame_0\n    push this 3\n    not\n    not\n    if-goto PongGame_1\nlabel PongGame_2\n    push local 0\n    push constant 0\n    eq\n    push this 3\n    not\n    and\n    not\n    if-goto PongGame_3\n    call Keyboard.keyPressed 0\n    pop local 0\n    push this 0\n    call Bat.move 1\n    pop temp 0\n    push pointer 0\n    call PongGame.moveBall 1\n    pop temp 0\n    push constant 50\n    call Sys.wait 1\n    pop temp 0\n    goto PongGame_2\nlabel PongGame_3\n    push local 0\n    push constant 130\n    eq\n    not\n    if-goto PongGame_5\n    push this 0\n    push constant 1\n    call Bat.setDirection 2\n    pop temp 0\n    goto PongGame_4\nlabel PongGame_5\n    push local 0\n    push constant 132\n    eq\n    not\n    if-goto PongGame_7\n    push this 0\n    push constant 2\n    call Bat.setDirection 2\n    pop temp 0\n    goto PongGame_6\nlabel PongGame_7\n    push local 0\n    push constant 140\n    eq\n    not\n    if-goto PongGame_9\n    push constant 1\n    neg\n    pop this 3\n    goto PongGame_8\nlabel PongGame_9\nlabel PongGame_8\nlabel PongGame_6\nlabel PongGame_4\nlabel PongGame_10\n    push local 0\n    push constant 0\n    eq\n    not\n    push this 3\n    not\n    and\n    not\n    if-goto PongGame_11\n    call Keyboard.keyPressed 0\n    pop local 0\n    push this 0\n    call Bat.move 1\n    pop temp 0\n    push pointer 0\n    call PongGame.moveBall 1\n    pop temp 0\n    push constant 50\n    call Sys.wait 1\n    pop temp 0\n    goto PongGame_10\nlabel PongGame_11\n    goto PongGame_0\nlabel PongGame_1\n    push this 3\n    not\n    if-goto PongGame_13\n    push constant 10\n    push constant 27\n    call Output.moveCursor 2\n    pop temp 0\n    push constant 9\n    call String.new 1\n    push constant 71\n    call String.appendChar 2\n    push constant 97\n    call String.appendChar 2\n    push constant 109\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 32\n    call String.appendChar 2\n    push constant 79\n    call String.appendChar 2\n    push constant 118\n    call String.appendChar 2\n    push constant 101\n    call String.appendChar 2\n    push constant 114\n    call String.appendChar 2\n    call Output.printString 1\n    pop temp 0\n    goto PongGame_12\nlabel PongGame_13\nlabel PongGame_12\n    push constant 0\n    return\nfunction PongGame.moveBall 5\n    push argument 0\n    pop pointer 0\n    push this 1\n    call Ball.move 1\n    pop this 2\n    push this 2\n    push constant 0\n    gt\n    push this 2\n    push this 5\n    eq\n    not\n    and\n    not\n    if-goto PongGame_15\n    push this 2\n    pop this 5\n    push constant 0\n    pop local 0\n    push this 0\n    call Bat.getLeft 1\n    pop local 1\n    push this 0\n    call Bat.getRight 1\n    pop local 2\n    push this 1\n    call Ball.getLeft 1\n    pop local 3\n    push this 1\n    call Ball.getRight 1\n    pop local 4\n    push this 2\n    push constant 4\n    eq\n    not\n    if-goto PongGame_17\n    push local 1\n    push local 4\n    gt\n    push local 2\n    push local 3\n    lt\n    or\n    pop this 3\n    push this 3\n    not\n    not\n    if-goto PongGame_19\n    push local 4\n    push local 1\n    push constant 10\n    add\n    lt\n    not\n    if-goto PongGame_21\n    push constant 1\n    neg\n    pop local 0\n    goto PongGame_20\nlabel PongGame_21\n    push local 3\n    push local 2\n    push constant 10\n    sub\n    gt\n    not\n    if-goto PongGame_23\n    push constant 1\n    pop local 0\n    goto PongGame_22\nlabel PongGame_23\nlabel PongGame_22\nlabel PongGame_20\n    push this 6\n    push constant 2\n    sub\n    pop this 6\n    push this 0\n    push this 6\n    call Bat.setWidth 2\n    pop temp 0\n    push this 4\n    push constant 1\n    add\n    pop this 4\n    push constant 22\n    push constant 7\n    call Output.moveCursor 2\n    pop temp 0\n    push this 4\n    call Output.printInt 1\n    pop temp 0\n    goto PongGame_18\nlabel PongGame_19\nlabel PongGame_18\n    goto PongGame_16\nlabel PongGame_17\nlabel PongGame_16\n    push this 1\n    push local 0\n    call Ball.bounce 2\n    pop temp 0\n    goto PongGame_14\nlabel PongGame_15\nlabel PongGame_14\n    push constant 0\n    return";

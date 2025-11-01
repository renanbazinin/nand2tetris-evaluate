export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Pong/Ball.jack\n// (Same as projects/9/Pong/Ball.jack)\n/**\n * A graphical ball in a Pong game. Characterized by a screen location and \n * distance of last destination. Has methods for drawing, erasing and moving\n * on the screen. The ball is displayed as a filled, 6-by-6 pixles rectangle. \n */\nclass Ball {\n\n    field int x, y;               // the ball's screen location (in pixels)\n    field int lengthx, lengthy;   // distance of last destination (in pixels)\n\n    field int d, straightD, diagonalD;   // used for straight line movement computation\n    field boolean invert, positivex, positivey;   // (same)\n   \n    field int leftWall, rightWall, topWall, bottomWall;  // wall locations\n   \n    field int wall;   // last wall that the ball was bounced off of\n\n    /** Constructs a new ball with the given initial location and wall locations. */\n    constructor Ball new(int Ax, int Ay,\n                         int AleftWall, int ArightWall, int AtopWall, int AbottomWall) {    \t\n      let x = Ax;\t\t\n      let y = Ay;\n      let leftWall = AleftWall;\n      let rightWall = ArightWall - 6;    // -6 for ball size\n      let topWall = AtopWall; \n      let bottomWall = AbottomWall - 6;  // -6 for ball size\n      let wall = 0;\n        do show();\n        return this;\n    }\n\n    /** Deallocates the Ball's memory. */\n    method void dispose() {\n        do Memory.deAlloc(this);\n        return;\n    }\n\n    /** Shows the ball. */\n    method void show() {\n        do Screen.setColor(true);\n        do draw();\n        return;\n    }\n\n    /** Hides the ball. */\n    method void hide() {\n        do Screen.setColor(false);\n      do draw();\n        return;\n    }\n\n    /** Draws the ball. */\n    method void draw() {\n      do Screen.drawRectangle(x, y, x + 5, y + 5);\n      return;\n    }\n\n    /** Returns the ball's left edge. */\n    method int getLeft() {\n        return x;\n    }\n\n    /** Returns the ball's right edge. */\n    method int getRight() {\n        return x + 5;\n    }\n\n    /** Computes and sets the ball's destination. */\n    method void setDestination(int destx, int desty) {\n        var int dx, dy, temp;\n        let lengthx = destx - x;\n      let lengthy = desty - y;\n        let dx = Math.abs(lengthx);\n        let dy = Math.abs(lengthy);\n        let invert = (dx < dy);\n\n        if (invert) {\n            let temp = dx; // swap dx, dy\n            let dx = dy;\n            let dy = temp;\n             let positivex = (y < desty);\n            let positivey = (x < destx);\n        }\n        else {\n          let positivex = (x < destx);\n            let positivey = (y < desty);\n        }\n\n        let d = (2 * dy) - dx;\n        let straightD = 2 * dy;\n        let diagonalD = 2 * (dy - dx);\n\n      return;\n    }\n\n    /**\n     * Moves the ball one step towards its destination.\n     * If the ball has reached a wall, returns 0.\n     * Else, returns a value according to the wall:\n     * 1 (left wall), 2 (right wall), 3 (top wall), 4 (bottom wall).\n     */\n    method int move() {\n\n      do hide();\n\n        if (d < 0) { let d = d + straightD; }\n        else {\n            let d = d + diagonalD;\n\n            if (positivey) {\n                if (invert) { let x = x + 4; }\n                else { let y = y + 4; }\n            }\n            else {\n                if (invert) { let x = x - 4; }\n                else { let y = y - 4; }\n            }\n      }\n\n        if (positivex) {\n            if (invert) { let y = y + 4; }\n            else { let x = x + 4; }\n      }\n      else {\n            if (invert) { let y = y - 4; }\n            else { let x = x - 4; }\n      }\n\n      if (~(x > leftWall)) {\n          let wall = 1;    \n          let x = leftWall;\n      }\n        if (~(x < rightWall)) {\n          let wall = 2;    \n          let x = rightWall;\n      }\n        if (~(y > topWall)) {\n            let wall = 3;    \n          let y = topWall;\n        }\n        if (~(y < bottomWall)) {\n            let wall = 4;    \n          let y = bottomWall;\n        }\n\n      do show();\n\n      return wall;\n    }\n\n    /**\n     * Bounces off the current wall: sets the new destination\n     * of the ball according to the ball's angle and the given\n     * bouncing direction (-1/0/1=left/center/right or up/center/down).\n     */\n    method void bounce(int bouncingDirection) {\n        var int newx, newy, divLengthx, divLengthy, factor;\n\n      // Since results are too big, divides by 10\n        let divLengthx = lengthx / 10;\n        let divLengthy = lengthy / 10;\n      if (bouncingDirection = 0) { let factor = 10; }\n      else {\n          if (((~(lengthx < 0)) & (bouncingDirection = 1)) | ((lengthx < 0) & (bouncingDirection = (-1)))) {\n                let factor = 20; // bounce direction is in ball direction\n            }\n          else { let factor = 5; } // bounce direction is against ball direction\n      }\n\n      if (wall = 1) {\n          let newx = 506;\n          let newy = (divLengthy * (-50)) / divLengthx;\n            let newy = y + (newy * factor);\n      }\n        else {\n            if (wall = 2) {\n                let newx = 0;\n                let newy = (divLengthy * 50) / divLengthx;\n                let newy = y + (newy * factor);\n          }\n          else {\n                if (wall = 3) {\n                let newy = 250;\n                let newx = (divLengthx * (-25)) / divLengthy;\n                    let newx = x + (newx * factor);\n            }\n                else { // assumes wall = 4\n                let newy = 0;\n                let newx = (divLengthx * 25) / divLengthy;\n                    let newx = x + (newx * factor);\n            }\n            }\n        }\n\n        do setDestination(newx, newy);\n        return;\n    }\n}";
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
                                value: number;
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
                        name: string;
                        span: {
                            start: number;
                            end: number;
                            line: number;
                        };
                        parameters?: undefined;
                        expression?: undefined;
                        value?: undefined;
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
                        expression?: undefined;
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
                                value?: undefined;
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
                            expression?: undefined;
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
                        rest: never[];
                    };
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                })[];
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
                        expression: {
                            nodeType: string;
                            term: {
                                termType: string;
                                value: number;
                                name?: undefined;
                                span?: undefined;
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
                        parameters?: undefined;
                        value?: undefined;
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
                        value: number;
                        name?: undefined;
                        span?: undefined;
                        parameters?: undefined;
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
                        value: number;
                        name?: undefined;
                        span?: undefined;
                        parameters?: undefined;
                        expression?: undefined;
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
                    parameters: never[];
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                };
                condition?: undefined;
                body?: undefined;
                else?: undefined;
                value?: undefined;
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
                        rest: never[];
                    };
                    body: {
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
                            rest: never[];
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
                    name?: undefined;
                    value?: undefined;
                    span?: undefined;
                })[];
                call?: undefined;
                value?: undefined;
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
                body: {
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
                        rest: never[];
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
                call?: undefined;
                value?: undefined;
                span?: undefined;
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
                            value?: undefined;
                        };
                        rest: never[];
                    };
                    span: {
                        start: number;
                        end: number;
                        line: number;
                    };
                })[];
                else: never[];
                call?: undefined;
                value?: undefined;
                span?: undefined;
            } | {
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
                else: {
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
                                                                op: string;
                                                                term: {
                                                                    termType: string;
                                                                    value: number;
                                                                };
                                                            };
                                                            rest: never[];
                                                        };
                                                    };
                                                }[];
                                            };
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
                }[];
                name?: undefined;
                value?: undefined;
                span?: undefined;
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
                            value: number;
                            expression?: undefined;
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
                                        expression: {
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
                                    };
                                }[];
                            };
                            value?: undefined;
                            name?: undefined;
                            span?: undefined;
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
                            value?: undefined;
                            expression?: undefined;
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
                })[];
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
                                value: number;
                                expression?: undefined;
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
                                value?: undefined;
                                name?: undefined;
                                span?: undefined;
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
                                value?: undefined;
                                expression?: undefined;
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
                    })[];
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
                                    value: number;
                                    expression?: undefined;
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
                                                expression: {
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
                                            };
                                        }[];
                                    };
                                    value?: undefined;
                                    name?: undefined;
                                    span?: undefined;
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
                                    value?: undefined;
                                    expression?: undefined;
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
                                    value: number;
                                    expression?: undefined;
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
                                    value?: undefined;
                                    name?: undefined;
                                    span?: undefined;
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
                                    value?: undefined;
                                    expression?: undefined;
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
                        })[];
                    }[];
                }[];
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
                call?: undefined;
            })[];
        };
    })[];
};
export declare const compiled = "function Ball.new 0\n    push constant 15\n    call Memory.alloc 1\n    pop pointer 0\n    push argument 0\n    pop this 0\n    push argument 1\n    pop this 1\n    push argument 2\n    pop this 10\n    push argument 3\n    push constant 6\n    sub\n    pop this 11\n    push argument 4\n    pop this 12\n    push argument 5\n    push constant 6\n    sub\n    pop this 13\n    push constant 0\n    pop this 14\n    push pointer 0\n    call Ball.show 1\n    pop temp 0\n    push pointer 0\n    return\nfunction Ball.dispose 0\n    push argument 0\n    pop pointer 0\n    push pointer 0\n    call Memory.deAlloc 1\n    pop temp 0\n    push constant 0\n    return\nfunction Ball.show 0\n    push argument 0\n    pop pointer 0\n    push constant 1\n    neg\n    call Screen.setColor 1\n    pop temp 0\n    push pointer 0\n    call Ball.draw 1\n    pop temp 0\n    push constant 0\n    return\nfunction Ball.hide 0\n    push argument 0\n    pop pointer 0\n    push constant 0\n    call Screen.setColor 1\n    pop temp 0\n    push pointer 0\n    call Ball.draw 1\n    pop temp 0\n    push constant 0\n    return\nfunction Ball.draw 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    push this 1\n    push this 0\n    push constant 5\n    add\n    push this 1\n    push constant 5\n    add\n    call Screen.drawRectangle 4\n    pop temp 0\n    push constant 0\n    return\nfunction Ball.getLeft 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    return\nfunction Ball.getRight 0\n    push argument 0\n    pop pointer 0\n    push this 0\n    push constant 5\n    add\n    return\nfunction Ball.setDestination 3\n    push argument 0\n    pop pointer 0\n    push argument 1\n    push this 0\n    sub\n    pop this 2\n    push argument 2\n    push this 1\n    sub\n    pop this 3\n    push this 2\n    call Math.abs 1\n    pop local 0\n    push this 3\n    call Math.abs 1\n    pop local 1\n    push local 0\n    push local 1\n    lt\n    pop this 7\n    push this 7\n    not\n    if-goto Ball_1\n    push local 0\n    pop local 2\n    push local 1\n    pop local 0\n    push local 2\n    pop local 1\n    push this 1\n    push argument 2\n    lt\n    pop this 8\n    push this 0\n    push argument 1\n    lt\n    pop this 9\n    goto Ball_0\nlabel Ball_1\n    push this 0\n    push argument 1\n    lt\n    pop this 8\n    push this 1\n    push argument 2\n    lt\n    pop this 9\nlabel Ball_0\n    push constant 2\n    push local 1\n    call Math.multiply 2\n    push local 0\n    sub\n    pop this 4\n    push constant 2\n    push local 1\n    call Math.multiply 2\n    pop this 5\n    push constant 2\n    push local 1\n    push local 0\n    sub\n    call Math.multiply 2\n    pop this 6\n    push constant 0\n    return\nfunction Ball.move 0\n    push argument 0\n    pop pointer 0\n    push pointer 0\n    call Ball.hide 1\n    pop temp 0\n    push this 4\n    push constant 0\n    lt\n    not\n    if-goto Ball_3\n    push this 4\n    push this 5\n    add\n    pop this 4\n    goto Ball_2\nlabel Ball_3\n    push this 4\n    push this 6\n    add\n    pop this 4\n    push this 9\n    not\n    if-goto Ball_5\n    push this 7\n    not\n    if-goto Ball_7\n    push this 0\n    push constant 4\n    add\n    pop this 0\n    goto Ball_6\nlabel Ball_7\n    push this 1\n    push constant 4\n    add\n    pop this 1\nlabel Ball_6\n    goto Ball_4\nlabel Ball_5\n    push this 7\n    not\n    if-goto Ball_9\n    push this 0\n    push constant 4\n    sub\n    pop this 0\n    goto Ball_8\nlabel Ball_9\n    push this 1\n    push constant 4\n    sub\n    pop this 1\nlabel Ball_8\nlabel Ball_4\nlabel Ball_2\n    push this 8\n    not\n    if-goto Ball_11\n    push this 7\n    not\n    if-goto Ball_13\n    push this 1\n    push constant 4\n    add\n    pop this 1\n    goto Ball_12\nlabel Ball_13\n    push this 0\n    push constant 4\n    add\n    pop this 0\nlabel Ball_12\n    goto Ball_10\nlabel Ball_11\n    push this 7\n    not\n    if-goto Ball_15\n    push this 1\n    push constant 4\n    sub\n    pop this 1\n    goto Ball_14\nlabel Ball_15\n    push this 0\n    push constant 4\n    sub\n    pop this 0\nlabel Ball_14\nlabel Ball_10\n    push this 0\n    push this 10\n    gt\n    not\n    not\n    if-goto Ball_17\n    push constant 1\n    pop this 14\n    push this 10\n    pop this 0\n    goto Ball_16\nlabel Ball_17\nlabel Ball_16\n    push this 0\n    push this 11\n    lt\n    not\n    not\n    if-goto Ball_19\n    push constant 2\n    pop this 14\n    push this 11\n    pop this 0\n    goto Ball_18\nlabel Ball_19\nlabel Ball_18\n    push this 1\n    push this 12\n    gt\n    not\n    not\n    if-goto Ball_21\n    push constant 3\n    pop this 14\n    push this 12\n    pop this 1\n    goto Ball_20\nlabel Ball_21\nlabel Ball_20\n    push this 1\n    push this 13\n    lt\n    not\n    not\n    if-goto Ball_23\n    push constant 4\n    pop this 14\n    push this 13\n    pop this 1\n    goto Ball_22\nlabel Ball_23\nlabel Ball_22\n    push pointer 0\n    call Ball.show 1\n    pop temp 0\n    push this 14\n    return\nfunction Ball.bounce 5\n    push argument 0\n    pop pointer 0\n    push this 2\n    push constant 10\n    call Math.divide 2\n    pop local 2\n    push this 3\n    push constant 10\n    call Math.divide 2\n    pop local 3\n    push argument 1\n    push constant 0\n    eq\n    not\n    if-goto Ball_25\n    push constant 10\n    pop local 4\n    goto Ball_24\nlabel Ball_25\n    push this 2\n    push constant 0\n    lt\n    not\n    push argument 1\n    push constant 1\n    eq\n    and\n    push this 2\n    push constant 0\n    lt\n    push argument 1\n    push constant 1\n    neg\n    eq\n    and\n    or\n    not\n    if-goto Ball_27\n    push constant 20\n    pop local 4\n    goto Ball_26\nlabel Ball_27\n    push constant 5\n    pop local 4\nlabel Ball_26\nlabel Ball_24\n    push this 14\n    push constant 1\n    eq\n    not\n    if-goto Ball_29\n    push constant 506\n    pop local 0\n    push local 3\n    push constant 50\n    neg\n    call Math.multiply 2\n    push local 2\n    call Math.divide 2\n    pop local 1\n    push this 1\n    push local 1\n    push local 4\n    call Math.multiply 2\n    add\n    pop local 1\n    goto Ball_28\nlabel Ball_29\n    push this 14\n    push constant 2\n    eq\n    not\n    if-goto Ball_31\n    push constant 0\n    pop local 0\n    push local 3\n    push constant 50\n    call Math.multiply 2\n    push local 2\n    call Math.divide 2\n    pop local 1\n    push this 1\n    push local 1\n    push local 4\n    call Math.multiply 2\n    add\n    pop local 1\n    goto Ball_30\nlabel Ball_31\n    push this 14\n    push constant 3\n    eq\n    not\n    if-goto Ball_33\n    push constant 250\n    pop local 1\n    push local 2\n    push constant 25\n    neg\n    call Math.multiply 2\n    push local 3\n    call Math.divide 2\n    pop local 0\n    push this 0\n    push local 0\n    push local 4\n    call Math.multiply 2\n    add\n    pop local 0\n    goto Ball_32\nlabel Ball_33\n    push constant 0\n    pop local 1\n    push local 2\n    push constant 25\n    call Math.multiply 2\n    push local 3\n    call Math.divide 2\n    pop local 0\n    push this 0\n    push local 0\n    push local 4\n    call Math.multiply 2\n    add\n    pop local 0\nlabel Ball_32\nlabel Ball_30\nlabel Ball_28\n    push pointer 0\n    push local 0\n    push local 1\n    call Ball.setDestination 3\n    pop temp 0\n    push constant 0\n    return";

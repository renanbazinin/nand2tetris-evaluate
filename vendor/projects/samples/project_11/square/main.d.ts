export declare const jack = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/11/Square/Main.jack\n\n/** Initializes a new Square game and starts running it. */\nclass Main {\n    function void main() {\n        var SquareGame game;\n        let game = SquareGame.new();\n        do game.run();\n        do game.dispose();\n        return;\n    }\n}";
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
            } | {
                statementType: string;
                span: {
                    start: number;
                    end: number;
                    line: number;
                };
                name?: undefined;
                value?: undefined;
                call?: undefined;
            })[];
        };
    }[];
};
export declare const compiled = "function Main.main 1\n    call SquareGame.new 0\n    pop local 0\n    push local 0\n    call SquareGame.run 1\n    pop temp 0\n    push local 0\n    call SquareGame.dispose 1\n    pop temp 0\n    push constant 0\n    return";

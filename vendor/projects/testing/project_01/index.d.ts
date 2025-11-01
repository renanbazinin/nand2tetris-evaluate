import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const SOLS: {
    Not: {
        "Not.hdl": string;
    };
    And: {
        "And.hdl": string;
    };
    Or: {
        "Or.hdl": string;
    };
    XOr: {
        "XOr.hdl": string;
    };
    Mux: {
        "Mux.hdl": string;
    };
    DMux: {
        "DMux.hdl": string;
    };
    Not16: {
        "Not16.hdl": string;
    };
    And16: {
        "And16.hdl": string;
    };
    Or16: {
        "Or16.hdl": string;
    };
    Mux16: {
        "Mux16.hdl": string;
    };
    Mux4Way16: {
        "Mux4Way16.hdl": string;
    };
    Mux8Way16: {
        "Mux8Way16.hdl": string;
    };
    DMux4Way: {
        "DMux4Way.hdl": string;
    };
    DMux8Way: {
        "DMux8Way.hdl": string;
    };
    Or8Way: {
        "Or8Way.hdl": string;
    };
};
export declare function loadSolutions(fs: FileSystem): Promise<void>;

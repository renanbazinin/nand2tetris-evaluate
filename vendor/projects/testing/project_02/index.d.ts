import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const SOLS: {
    HalfAdder: {
        "HalfAdder.hdl": string;
    };
    FullAdder: {
        "FullAdder.hdl": string;
    };
    Add16: {
        "Add16.hdl": string;
    };
    Inc16: {
        "Inc16.hdl": string;
    };
    AluNoStat: {
        "AluNoStat.hdl": string;
    };
    ALU: {
        "ALU.hdl": string;
    };
};
export declare function loadSolutions(fs: FileSystem): Promise<void>;

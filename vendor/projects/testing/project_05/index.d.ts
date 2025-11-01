import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const SOLS: {
    Memory: {
        "Memory.hdl": string;
    };
    CPU: {
        "CPU.hdl": string;
    };
    Computer: {
        "Computer.hdl": string;
    };
};
export declare function loadSolutions(fs: FileSystem): Promise<void>;

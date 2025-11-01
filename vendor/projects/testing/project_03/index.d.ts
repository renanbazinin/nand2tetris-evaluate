import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const SOLS: {
    Bit: {
        "Bit.hdl": string;
    };
    Register: {
        "Register.hdl": string;
    };
    PC: {
        "PC.hdl": string;
    };
    RAM8: {
        "RAM8.hdl": string;
    };
    RAM64: {
        "RAM64.hdl": string;
    };
    RAM512: {
        "RAM512.hdl": string;
    };
    RAM4k: {
        "RAM4k.hdl": string;
    };
    RAM16k: {
        "RAM16k.hdl": string;
    };
};
export declare function loadSolutions(fs: FileSystem): Promise<void>;

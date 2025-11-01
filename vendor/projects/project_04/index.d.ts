import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const TESTS: {
    Mult: {
        "Mult.asm": string;
        "Mult.tst": string;
        "Mult.cmp": string;
    };
    Fill: {
        "Fill.asm": string;
        "Fill.tst": string;
        "FillAutomatic.tst": string;
        "FillAutomatic.cmp": string;
    };
};
export declare function resetFiles(fs: FileSystem): Promise<void>;
export declare function resetTests(fs: FileSystem): Promise<void>;

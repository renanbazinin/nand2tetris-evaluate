import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const FILES: {
    "Add.asm": string;
    "Max.asm": string;
    "MaxL.asm": string;
    "Rect.asm": string;
    "RectL.asm": string;
    "Pong.asm": string;
    "PongL.asm": string;
};
export declare const ASM_SOLS: Record<keyof typeof FILES, number[]>;
export declare function resetFiles(fs: FileSystem): Promise<void>;
export declare function resetTests(fs: FileSystem): Promise<void>;

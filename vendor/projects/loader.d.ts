import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { type Projects } from "./full.js";
export declare function resetFiles(fs: FileSystem, projects?: (keyof typeof Projects)[]): Promise<void>;
export declare function resetTests(fs: FileSystem, projects?: (keyof typeof Projects)[]): Promise<void>;
export declare function createFiles(fs: FileSystem): Promise<void>;
export declare function loadSamples(fs: FileSystem): Promise<void>;
export declare function loadSolutions(fs: FileSystem): Promise<void>;
export declare const loaders: {
    resetFiles: typeof resetFiles;
    loadSolutions: typeof loadSolutions;
    loadSamples: typeof loadSamples;
};
export default loaders;

import { Tree } from "@davidsouther/jiffies/lib/esm/fs";
import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare function resetBySuffix(fs: FileSystem, tree: Tree, suffix: string): Promise<void>;
export declare function reset(fs: FileSystem, tree: Tree, base?: string, override?: boolean): Promise<void>;

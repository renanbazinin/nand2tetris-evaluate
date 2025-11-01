import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import * as project_01 from "./project_01/index.js";
import * as project_02 from "./project_02/index.js";
import * as project_03 from "./project_03/index.js";
import * as project_05 from "./project_05/index.js";
export declare const ChipProjects: {
    "01": typeof project_01;
    "02": typeof project_02;
    "03": typeof project_03;
    "05": typeof project_05;
};
export declare const loadSolutions: (fs: FileSystem) => Promise<void>;
export declare const loaders: {
    loadSolutions: (fs: FileSystem) => Promise<void>;
};
export default loaders;

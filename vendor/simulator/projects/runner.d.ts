import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { type Assignment } from "@nand2tetris/projects/base.js";
import type { Runner, RunResult } from "@nand2tetris/runner/types.js";
import { Chip } from "../chip/chip.js";
import { CompilationError } from "../languages/base.js";
import { HdlParse } from "../languages/hdl.js";
import { Tst } from "../languages/tst.js";
import { ChipTest } from "../test/chiptst.js";
export interface AssignmentFiles extends Assignment {
    hdl: string;
    tst: string;
    cmp: string;
}
export interface AssignmentParse extends AssignmentFiles {
    maybeParsedHDL: Result<HdlParse, CompilationError>;
    maybeParsedTST: Result<Tst, CompilationError>;
}
export interface AssignmentBuild extends AssignmentParse {
    maybeChip: Result<Chip, Error>;
    maybeTest: Result<ChipTest, Error>;
}
export interface AssignmentRun extends AssignmentBuild {
    pass: boolean;
    out: string;
    shadow?: RunResult;
}
export declare const hasTest: ({ name, ext, }: {
    name: string;
    ext: string;
}) => boolean;
/** Try parsing the loaded files. */
export declare const maybeParse: (file: AssignmentFiles) => AssignmentParse;
/** After parsing the assignment, compile the Chip and Tst. */
export declare const maybeBuild: (fs: FileSystem) => (file: AssignmentParse) => Promise<AssignmentBuild>;
/** If the assignment parsed, run it! */
export declare const tryRun: (fs: FileSystem) => (assignment: AssignmentBuild) => Promise<AssignmentRun>;
/** Parse & execute a Nand2tetris assignment, possibly also including the Java output in shadow mode. */
export declare const runner: (fs: FileSystem, ideRunner?: Runner) => (assignment: AssignmentFiles) => Promise<AssignmentRun>;
/** Run all tests for a given Nand2Tetris project. */
export declare function runTests(files: Array<Assignment>, loadAssignment: (file: Assignment) => Promise<AssignmentFiles>, fs: FileSystem, ideRunner?: Runner): Promise<AssignmentRun[]>;

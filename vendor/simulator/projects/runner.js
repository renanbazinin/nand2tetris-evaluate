import { Err, isErr, isOk, Ok, } from "@davidsouther/jiffies/lib/esm/result.js";
// Resolve local vendor copy instead of a package alias for runtime without bundler
import { AssignmentStubs, } from "../../projects/base.js";
import { build as buildChip } from "../chip/builder.js";
import { HDL } from "../languages/hdl.js";
import { TST } from "../languages/tst.js";
import { ChipTest } from "../test/chiptst.js";
export const hasTest = ({ name, ext, }) => AssignmentStubs[name] !== undefined &&
    [".hdl", ".tst"].includes(ext);
/** Try parsing the loaded files. */
export const maybeParse = (file) => {
    const maybeParsedHDL = HDL.parse(file.hdl);
    const maybeParsedTST = TST.parse(file.tst);
    return { ...file, maybeParsedHDL, maybeParsedTST };
};
/** After parsing the assignment, compile the Chip and Tst. */
export const maybeBuild = (fs) => async (file) => {
    let maybeChip;
    if (isOk(file.maybeParsedHDL)) {
        const maybeBuilt = await buildChip({
            parts: Ok(file.maybeParsedHDL),
            fs,
        });
        if (isErr(maybeBuilt)) {
            maybeChip = Err(new Error(Err(maybeBuilt).message));
        }
        else {
            maybeChip = maybeBuilt;
        }
    }
    else {
        maybeChip = Err(new Error("HDL Was not parsed"));
    }
    const maybeTest = isOk(file.maybeParsedTST)
        ? ChipTest.from(Ok(file.maybeParsedTST))
        : Err(new Error("TST Was not parsed"));
    return { ...file, maybeChip, maybeTest };
};
/** If the assignment parsed, run it! */
export const tryRun = (fs) => async (assignment) => {
    if (isErr(assignment.maybeChip)) {
        return {
            ...assignment,
            pass: false,
            out: Err(assignment.maybeChip).message,
        };
    }
    if (isErr(assignment.maybeTest)) {
        return {
            ...assignment,
            pass: false,
            out: Err(assignment.maybeTest).message,
        };
    }
    const test = Ok(assignment.maybeTest)
        .with(Ok(assignment.maybeChip))
        .setFileSystem(fs);
    await test.run();
    const out = test.log();
    const pass = out.trim() === assignment.cmp.trim();
    return { ...assignment, out, pass };
};
/** Parse & execute a Nand2tetris assignment, possibly also including the Java output in shadow mode. */
export const runner = (fs, ideRunner) => {
    const tryRunWithFs = tryRun(fs);
    const maybeBuildWithFs = maybeBuild(fs);
    return async (assignment) => {
        const jsRunner = async () => tryRunWithFs(await maybeBuildWithFs(await maybeParse(assignment)));
        const javaRunner = async () => ideRunner?.hdl(assignment);
        const [jsRun, shadow] = await Promise.all([jsRunner(), javaRunner()]);
        return { ...jsRun, shadow };
    };
};
/** Run all tests for a given Nand2Tetris project. */
export async function runTests(files, loadAssignment, fs, ideRunner) {
    const run = runner(fs, ideRunner);
    return Promise.all(files.map(loadAssignment).map(async (assignment) => run(await assignment)));
}
//# sourceMappingURL=runner.js.map
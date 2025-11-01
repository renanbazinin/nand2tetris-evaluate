import { assertExists } from "@davidsouther/jiffies/lib/esm/assert.js";
import { FileSystem, ObjectFileSystemAdapter, } from "@davidsouther/jiffies/lib/esm/fs.js";
import { Ok, unwrap } from "@davidsouther/jiffies/lib/esm/result.js";
import { ASM_PROJECTS, CHIP_PROJECTS, VM_PROJECTS, } from "@nand2tetris/projects/base.js";
import { ChipProjects, VmProjects } from "@nand2tetris/projects/full.js";
import { Max } from "@nand2tetris/projects/samples/hack.js";
import { FILES as ASM_FILES, ASM_SOLS, } from "@nand2tetris/projects/samples/project_06/index.js";
import { ChipProjects as ChipProjectsSols } from "@nand2tetris/projects/testing/index.js";
import { build } from "../chip/builder.js";
import { compare } from "../compare.js";
import { ASM } from "../languages/asm.js";
import { CMP } from "../languages/cmp.js";
import { HDL } from "../languages/hdl.js";
import { TST } from "../languages/tst.js";
import { VM } from "../languages/vm.js";
import { ChipTest } from "../test/chiptst.js";
import { VMTest } from "../test/vmtst.js";
import { Vm } from "../vm/vm.js";
const PROJECTS = new Set(["01", "03", "07", "08"]);
const SKIP = new Set([]);
const INCLUDE = new Set(["And", "And16", "Mux8Way16", "Bit"]);
describe("Chip Projects", () => {
    describe.each(Object.keys(CHIP_PROJECTS).filter((k) => PROJECTS.has(k)))("project %s", (project) => {
        it.each(CHIP_PROJECTS[project]
            .filter((k) => !SKIP.has(k))
            .filter((k) => INCLUDE.has(k)))("Chip %s", async (chipName) => {
            const chipProject = {
                // @ts-ignore
                ...assertExists(ChipProjects[project]),
                // @ts-ignore
                ...assertExists(ChipProjectsSols[project]),
            };
            const hdlFile = chipProject.SOLS[chipName]?.[`${chipName}.hdl`];
            const tstFile = chipProject.CHIPS?.[`${chipName}.tst`];
            const cmpFile = chipProject.CHIPS?.[`${chipName}.cmp`];
            expect(hdlFile).toBeDefined();
            expect(tstFile).toBeDefined();
            expect(cmpFile).toBeDefined();
            const hdl = HDL.parse(hdlFile);
            expect(hdl).toBeOk();
            const tst = TST.parse(tstFile);
            expect(tst).toBeOk();
            const chip = await build({ parts: Ok(hdl) });
            expect(chip).toBeOk();
            const test = unwrap(ChipTest.from(Ok(tst))).with(Ok(chip));
            if (chipName === "Computer") {
                test.setFileSystem(new FileSystem(new ObjectFileSystemAdapter({ "Max.hack": Max })));
            }
            await test.run();
            const outFile = test.log();
            const cmp = CMP.parse(cmpFile);
            expect(cmp).toBeOk();
            const out = CMP.parse(outFile);
            expect(out).toBeOk();
            const diffs = compare(Ok(cmp), Ok(out));
            expect(diffs).toHaveNoDiff();
        });
    });
});
describe("ASM Projects", () => {
    describe.each(Object.keys(ASM_PROJECTS))("project %s", (project) => {
        it.each(Object.keys(ASM_FILES))("%s", (file_name) => {
            const source = ASM_FILES[file_name];
            const parsed = ASM.parse(source);
            expect(parsed).toBeOk();
            const asm = Ok(parsed);
            ASM.passes.fillLabel(asm);
            const filled = ASM.passes.emit(asm);
            expect(filled).toEqual(ASM_SOLS[file_name]);
        });
    });
});
describe("Vm Projects", () => {
    describe.each(Object.keys(VM_PROJECTS).filter((k) => PROJECTS.has(k)))("project %s", (project) => {
        it.each(VM_PROJECTS[project].filter((k) => !SKIP.has(k)))("VM Program %s", async (vmName) => {
            const vmProject = {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ...assertExists(VmProjects[project]),
            };
            const tstFile = vmProject.VMS[vmName]?.[`${vmName}VME.tst`];
            const cmpFile = vmProject.VMS[vmName]?.[`${vmName}.cmp`];
            let vmCode = "";
            for (const filename of Object.keys(vmProject.VMS[vmName])) {
                if (filename.endsWith(".vm")) {
                    const vmFile = vmProject.VMS[vmName]?.[filename];
                    expect(vmFile).toBeDefined();
                    vmCode += vmFile;
                }
            }
            expect(tstFile).toBeDefined();
            expect(cmpFile).toBeDefined();
            const parsed = VM.parse(vmCode);
            expect(parsed).toBeOk();
            const tst = TST.parse(tstFile);
            expect(tst).toBeOk();
            const vm = await Vm.build(unwrap(parsed).instructions);
            expect(vm).toBeOk();
            const test = unwrap(VMTest.from(unwrap(tst))).with(unwrap(vm));
            await test.run();
            const outFile = test.log();
            const cmp = CMP.parse(cmpFile);
            expect(cmp).toBeOk();
            const out = CMP.parse(outFile);
            expect(out).toBeOk();
            const diffs = compare(unwrap(cmp), unwrap(out));
            expect(diffs).toHaveNoDiff();
        });
    });
});
//# sourceMappingURL=all.test.js.map
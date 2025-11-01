import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { NodeFileSystemAdapter } from "@davidsouther/jiffies/lib/esm/fs_node.js";
import { isErr } from "@davidsouther/jiffies/lib/esm/result.js";
import { Assignments } from "../vendor/projects/full.js";
import { maybeParse, maybeBuild, tryRun } from "../vendor/simulator/projects/runner.js";

export interface EvaluationConfig {
  projectID: string;
  chip: string;
}

export interface EvaluationResult {
  executionCode: 0 | 1;
  log: string;
  grade: 0 | 100;
  outExecution: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export type InputFiles = Record<string, string>;

// Minimal local copy of the Assignment shape expected by runner
interface AssignmentFiles {
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
  hdl: string;
  tst: string;
  cmp: string;
}

function parseOutTableToJson(out: string): { headers: string[]; rows: (string | number)[][] } {
  const lines = out
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };
  const parseLine = (line: string) => line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((s) => s.trim());
  const headerCells = parseLine(lines[0]);
  const rows = lines.slice(1).map((ln) => parseLine(ln));
  return { headers: headerCells, rows };
}

async function makeTempWorkDir(prefix = "api-lite-"): Promise<string> {
  const dir = await fs.mkdtemp(join(tmpdir(), prefix));
  return dir;
}

function loadBuiltinTest(chip: string): { tst: string; cmp: string } {
  const exactTst = Assignments[`${chip}.tst` as keyof typeof Assignments] as string | undefined;
  const exactCmp = Assignments[`${chip}.cmp` as keyof typeof Assignments] as string | undefined;
  if (exactTst && exactCmp) return { tst: exactTst, cmp: exactCmp };

  // Fallback: find any tst/cmp that start with the chip name (e.g., ALU-basic)
  const keys = Object.keys(Assignments) as Array<keyof typeof Assignments>;
  const fallbackTstKey = keys.find((k) => typeof k === "string" && k.startsWith(`${chip}`) && (k as string).endsWith(".tst"));
  const fallbackCmpKey = keys.find((k) => typeof k === "string" && k.startsWith(`${chip}`) && (k as string).endsWith(".cmp"));
  const tst = fallbackTstKey ? (Assignments[fallbackTstKey] as string) : undefined;
  const cmp = fallbackCmpKey ? (Assignments[fallbackCmpKey] as string) : undefined;
  if (!tst || !cmp) throw new Error(`No builtin tests found for chip ${chip}`);
  return { tst, cmp };
}

export async function evaluateHDL(
  config: EvaluationConfig,
  files: InputFiles,
): Promise<EvaluationResult> {
  const { chip } = config;

  // Prepare filesystem for potential sub-chip loads
  const workDir = await makeTempWorkDir();
  const fsNode = new FileSystem(new NodeFileSystemAdapter());
  fsNode.cd(workDir);

  // Write all provided HDL files to the temp directory
  const fileWrites: Promise<void>[] = [];
  for (const [name, content] of Object.entries(files)) {
    const target = join(workDir, name);
    fileWrites.push(fs.writeFile(target, content, "utf8").then(() => undefined));
  }
  await Promise.all(fileWrites);

  // Determine HDL content for target chip
  const targetFileNames = [
    `${chip}.hdl`,
    `${chip}.HDL`,
  ];
  let hdl: string | undefined;
  for (const candidate of targetFileNames) {
    if (files[candidate] !== undefined) {
      hdl = files[candidate];
      break;
    }
  }
  if (!hdl) {
    // Try to locate case-insensitively among provided files
    const match = Object.keys(files).find((k) => k.toLowerCase() === `${chip}.hdl`.toLowerCase());
    if (match) hdl = files[match];
  }
  if (!hdl) {
    throw new Error(`HDL for chip ${chip} not provided`);
  }

  const { tst, cmp } = loadBuiltinTest(chip);

  const assignment: AssignmentFiles = {
    root: "",
    dir: workDir,
    base: `${chip}.hdl`,
    ext: ".hdl",
    name: chip,
    hdl,
    tst,
    cmp,
  };

  // Pipeline: parse -> build -> run (to differentiate compile vs compare failures)
  const parsed = maybeParse(assignment);
  const built = await maybeBuild(fsNode)(parsed);
  const run = await tryRun(fsNode)(built);

  const compiledOk = !(isErr(built.maybeChip) || isErr(built.maybeTest));
  const executionCode: 0 | 1 = compiledOk ? 1 : 0;
  const grade: 0 | 100 = run.pass ? 100 : 0;
  const log = run.out ?? "";
  const outExecution = parseOutTableToJson(log);

  return {
    executionCode,
    log,
    grade,
    outExecution,
  };
}

export default evaluateHDL;



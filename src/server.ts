import express, { Request, Response } from "express";
import evaluateHDL, { EvaluationConfig, InputFiles, EvaluationResult } from "./index.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync } from "fs";

const app = express();

// Very permissive CORS for local development / file:// testing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Resolve project root and version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let SERVER_VERSION = "0.0.0";
try {
  const pkg = JSON.parse(readFileSync(resolve(__dirname, "../package.json"), "utf8"));
  SERVER_VERSION = String(pkg.version ?? SERVER_VERSION);
} catch {
  // ignore
}

// Parse JSON bodies (allow reasonably large HDL payloads)
app.use(express.json({ limit: "5mb" }));

// Serve static client files at /client (top-level, not inside routes)
app.use("/client", express.static(resolve(__dirname, "../client")));

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, status: "healthy", version: SERVER_VERSION, timestamp: new Date().toISOString() });
});

// Types for the request body
type GradeChipBody = {
  config?: Partial<EvaluationConfig> & { projectID?: string; chip?: string };
  // Either provide a map of files (filename -> contents),
  // or provide `hdl` and we will map it to `${chip}.hdl`.
  files?: InputFiles;
  hdl?: string;
};

app.post("/gradeChip", async (req: Request<unknown, unknown, GradeChipBody>, res: Response) => {
  try {
    const { config, files, hdl } = req.body ?? {};

    if (!config || !config.chip || !config.projectID) {
      const msg = "Missing config.projectID or config.chip";
      const fallback: EvaluationResult = {
        executionCode: 0,
        "execution code": 0,
        log: msg,
        grade: 0,
        outExecution: { headers: [], rows: [] },
      };
      return res.status(400).json(fallback);
    }

    let filesMap: InputFiles | undefined = files;
    if (!filesMap && typeof hdl === "string") {
      filesMap = { [`${config.chip}.hdl`]: hdl };

    }
    if (!filesMap) {
      const msg = "Provide either `files` (map of filename->content) or `hdl` string";
      const fallback: EvaluationResult = {
        executionCode: 0,
        "execution code": 0,
        log: msg,
        grade: 0,
        outExecution: { headers: [], rows: [] },
      };
      return res.status(400).json(fallback);
    }

    const result = await evaluateHDL({ projectID: String(config.projectID), chip: String(config.chip) }, filesMap);
    return res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const fallback: EvaluationResult = {
      executionCode: 0,
      "execution code": 0,
      log: message,
      grade: 0,
      outExecution: { headers: [], rows: [] },
    };
    return res.status(500).json(fallback);
  }
});

// Start server
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});

export default app;

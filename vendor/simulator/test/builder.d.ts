import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { Tst, TstCommand, TstStatement } from "../languages/tst.js";
import { Test } from "./tst.js";
export declare function isTstCommand(line: TstStatement): line is TstCommand;
export declare function fill<T extends Test>(test: T, tst: Tst, requireLoad?: boolean): Result<T, Error>;

import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { CompilationError } from "../languages/base.js";
import { Subroutine } from "../languages/jack.js";
export declare function validateSubroutine(subroutine: Subroutine): Result<void, CompilationError>;

import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
import { Result } from "@davidsouther/jiffies/lib/esm/result.js";
import { CompilationError } from "../languages/base.js";
import { HdlParse } from "../languages/hdl.js";
import { Chip } from "./chip.js";
export declare function parse(code: string, dir?: string, name?: string, fs?: FileSystem): Promise<Result<Chip, CompilationError>>;
export declare function loadChip(name: string, dir?: string, fs?: FileSystem): Promise<Result<Chip>>;
export declare function build(...args: Parameters<typeof ChipBuilder.build>): Promise<ReturnType<typeof ChipBuilder.build>>;
declare class ChipBuilder {
    private parts;
    private fs?;
    private dir?;
    private expectedName?;
    private chip;
    private internalPins;
    private inPins;
    private outPins;
    private wires;
    static build(options: {
        parts: HdlParse;
        fs?: FileSystem;
        dir?: string;
        name?: string;
    }): Promise<Result<Chip, CompilationError>>;
    private constructor();
    build(): Promise<Result<Chip, CompilationError>>;
    private wireParts;
    private checkLoops;
    private wirePart;
    private validateWire;
    private validateInputWire;
    private validateOutputWire;
    private validateWriteTarget;
    private validateInputSource;
    private validateInternalPins;
    private validateWireWidths;
}
export {};

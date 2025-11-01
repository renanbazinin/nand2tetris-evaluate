import { COMMANDS_OP } from "../../../cpu/alu.js";
import { Chip } from "../../chip.js";
export declare class ALUNoStat extends Chip {
    constructor();
    eval(): void;
}
export declare class ALU extends Chip {
    constructor();
    eval(): void;
    op(): COMMANDS_OP;
}
export declare class ALUAll extends Chip {
    constructor();
    eval(): void;
    op(): COMMANDS_OP;
}

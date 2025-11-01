import { ClockedChip } from "../../chip.js";
export class DFF extends ClockedChip {
    constructor(name) {
        super(["in"], ["out"], name, ["t"], ["in"]);
    }
    tick() {
        // Read in into t
        const t = this.in().voltage();
        this.pin("t").pull(t);
    }
    tock() {
        // write t into out
        const t = this.pin("t").voltage();
        this.out().pull(t);
    }
}
//# sourceMappingURL=dff.js.map
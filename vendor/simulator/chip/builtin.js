export function getBuiltinValue(chip, part, idx) {
    switch (chip) {
        case "Register":
        case "ARegister":
        case "DRegister":
        case "PC":
        case "KEYBOARD":
            return part.out();
        case "RAM8":
        case "RAM64":
        case "RAM512":
        case "RAM4K":
        case "RAM16K":
        case "ROM32K":
        case "Screen":
            return part.at(idx);
        case "Memory":
            return part.at(idx);
        default:
            return undefined;
    }
}
//# sourceMappingURL=builtin.js.map
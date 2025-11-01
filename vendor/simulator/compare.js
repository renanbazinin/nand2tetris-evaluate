function normalLines(str, { trim = true, skipTrimmed = false, } = {}) {
    let lines = str.replace("\r\n", "\n").split("\n");
    if (trim)
        lines = lines.map((line) => line.trim());
    if (skipTrimmed)
        lines = lines.filter((line) => line != "");
    return lines;
}
export function compareLines(as, bs) {
    const resultLines = normalLines(as);
    const compareLines = normalLines(bs);
    if (resultLines.length != compareLines.length) {
        return { lenA: resultLines.length, lenB: compareLines.length };
    }
    for (let line = 0; line < compareLines.length; line++) {
        if (resultLines[line] !== compareLines[line]) {
            return { line };
        }
    }
    return {};
}
export function compare(as, bs) {
    let diffs = [];
    const q = Math.max(as.length, bs.length);
    for (let row = 0; row < q; row++) {
        const a = as[row] ?? [];
        const b = bs[row] ?? [];
        diffs = diffs.concat(diff(a, b).map((diff) => {
            diff.row = row;
            return diff;
        }));
    }
    return diffs;
}
export function diff(as, bs) {
    const diffs = [];
    const q = Math.max(as.length, bs.length);
    for (let col = 0; col < q; col++) {
        const a = as[col] ?? "";
        const b = bs[col] ?? "";
        if (a !== b && !a.match(/\*+/)) {
            diffs.push({ a, b, col });
        }
    }
    return diffs;
}
//# sourceMappingURL=compare.js.map
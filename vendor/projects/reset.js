export async function resetBySuffix(fs, tree, suffix) {
    for (const [key, value] of Object.entries(tree)) {
        if (typeof value === "string") {
            if (key.endsWith(`${suffix}`)) {
                await fs.writeFile(key, value);
            }
        }
        else {
            fs.cd(key);
            await resetBySuffix(fs, value, suffix);
            fs.cd("..");
        }
    }
}
export async function reset(fs, tree, base, override = true) {
    const items = (await fs.scandir(base ?? "/")).map((item) => item.name);
    for (const [key, value] of Object.entries(tree)) {
        const path = `${base ? `${base}/` : ""}${key}`;
        if (typeof value === "string") {
            if (override || !items.includes(key)) {
                await fs.writeFile(path, value);
            }
        }
        else {
            await fs.mkdir(path);
            await reset(fs, value, path);
        }
    }
}
//# sourceMappingURL=reset.js.map
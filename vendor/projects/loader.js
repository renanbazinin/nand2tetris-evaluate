export async function resetFiles(fs, projects) {
    await (await import("./full.js")).resetFiles(fs, projects);
}
export async function resetTests(fs, projects) {
    await (await import("./full.js")).resetTests(fs, projects);
}
export async function createFiles(fs) {
    await (await import("./full.js")).createFiles(fs);
}
export async function loadSamples(fs) {
    (await import("./samples/index.js")).loadSamples(fs);
}
export async function loadSolutions(fs) {
    (await import("./testing/index.js")).loadSolutions(fs);
}
export const loaders = {
    resetFiles,
    loadSolutions,
    loadSamples,
};
export default loaders;
//# sourceMappingURL=loader.js.map
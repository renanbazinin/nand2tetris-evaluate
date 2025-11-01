import * as project_01 from "./project_01/index.js";
import * as project_02 from "./project_02/index.js";
import * as project_03 from "./project_03/index.js";
import * as project_04 from "./project_04/index.js";
import * as project_05 from "./project_05/index.js";
import * as project_07 from "./project_07/index.js";
import * as project_08 from "./project_08/index.js";
import { reset } from "./reset.js";
import * as project_06 from "./samples/project_06/index.js";
export const ChipProjects = {
    "01": project_01,
    "02": project_02,
    "03": project_03,
    "05": project_05,
};
export const VmProjects = {
    "07": project_07,
    "08": project_08,
};
export const Projects = {
    "1": project_01,
    "2": project_02,
    "3": project_03,
    "4": project_04,
    "5": project_05,
    "6": project_06,
    "7": project_07,
    "8": project_08,
};
export const ProjectIDs = Object.keys(Projects);
const ProjectFiles = {
    "1": project_01.CHIPS,
    "2": project_02.CHIPS,
    "3": project_03.CHIPS,
    "4": project_04.TESTS,
    "5": project_05.CHIPS,
    "6": project_06.FILES,
    "7": project_07.VMS,
    "8": project_08.VMS,
};
export const resetFiles = async (fs, projects = ProjectIDs) => {
    for (const project of projects) {
        await Projects[project].resetFiles(fs);
    }
};
export const resetTests = async (fs, projects = ProjectIDs) => {
    for (const project of projects) {
        await Projects[project].resetTests(fs);
    }
};
export const createFiles = async (fs) => {
    await reset(fs, ProjectFiles, "/", false);
};
export const Assignments = {
    ...project_01.CHIPS,
    ...project_02.CHIPS,
    ...project_03.CHIPS,
    ...project_05.CHIPS,
    ...project_07.VMS,
    ...project_08.VMS,
};
//# sourceMappingURL=full.js.map
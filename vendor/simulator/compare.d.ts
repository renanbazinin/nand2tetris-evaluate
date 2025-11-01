export interface Diff {
    a: string;
    b: string;
    row?: number;
    col?: number;
}
export type CompareResultSuccess = Record<string, never>;
export interface CompareResultLengths {
    lenA: number;
    lenB: number;
}
export interface CompareResultLine {
    line: number;
}
export type CompareResult = CompareResultSuccess | CompareResultLine | CompareResultLengths;
export declare function compareLines(as: string, bs: string): CompareResult;
export declare function compare(as: string[][], bs: string[][]): Diff[];
export declare function diff(as: string[], bs: string[]): Diff[];

import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const VMS: {
    BasicLoop: {
        "BasicLoop.vm": string;
        "BasicLoopVME.tst": string;
        "BasicLoop.cmp": string;
        "BasicLoop.tst": string;
    };
    FibonacciSeries: {
        "FibonacciSeries.vm": string;
        "FibonacciSeriesVME.tst": string;
        "FibonacciSeries.cmp": string;
        "FibonacciSeries.tst": string;
    };
    SimpleFunction: {
        "SimpleFunction.vm": string;
        "SimpleFunctionVME.tst": string;
        "SimpleFunction.cmp": string;
        "SimpleFunction.tst": string;
    };
    NestedCall: {
        "Sys.vm": string;
        "NestedCallVME.tst": string;
        "NestedCall.cmp": string;
        "NestedCall.tst": string;
    };
    FibonacciElement: {
        "Sys.vm": string;
        "Main.vm": string;
        "FibonacciElementVME.tst": string;
        "FibonacciElement.cmp": string;
        "FibonacciElement.tst": string;
    };
    StaticsTest: {
        "Class1.vm": string;
        "Class2.vm": string;
        "Sys.vm": string;
        "StaticsTestVME.tst": string;
        "StaticsTest.cmp": string;
        "StaticsTest.tst": string;
    };
};
export declare function resetFiles(fs: FileSystem): Promise<void>;
export declare function resetTests(fs: FileSystem): Promise<void>;

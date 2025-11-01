import { FileSystem } from "@davidsouther/jiffies/lib/esm/fs.js";
export declare const VMS: {
    SimpleAdd: {
        "SimpleAdd.vm": string;
        "SimpleAddVME.tst": string;
        "SimpleAdd.cmp": string;
        "SimpleAdd.tst": string;
    };
    StackTest: {
        "StackTest.vm": string;
        "StackTestVME.tst": string;
        "StackTest.cmp": string;
        "StackTest.tst": string;
    };
    BasicTest: {
        "BasicTest.vm": string;
        "BasicTestVME.tst": string;
        "BasicTest.cmp": string;
        "BasicTest.tst": string;
    };
    PointerTest: {
        "PointerTest.vm": string;
        "PointerTestVME.tst": string;
        "PointerTest.cmp": string;
        "PointerTest.tst": string;
    };
    StaticTest: {
        "StaticTest.vm": string;
        "StaticTestVME.tst": string;
        "StaticTest.cmp": string;
        "StaticTest.tst": string;
    };
};
export declare function resetFiles(fs: FileSystem): Promise<void>;
export declare function resetTests(fs: FileSystem): Promise<void>;

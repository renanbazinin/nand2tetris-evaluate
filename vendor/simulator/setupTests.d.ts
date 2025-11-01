interface CustomMatchers<R = unknown, T = unknown> {
    toBeOk(expected?: T): R;
    toBeErr(expected?: T): R;
}
interface OhmMatchers<R = unknown> {
    toHaveSucceeded(): R;
    toHaveFailed(message: string): R;
}
interface CmpMatchers<R = unknown> {
    toHaveNoDiff(): R;
}
declare global {
    namespace jest {
        type Expect = CustomMatchers;
        interface Matchers<R, T = unknown> extends CustomMatchers<R, T>, OhmMatchers<R>, CmpMatchers<R> {
        }
        interface InverseAsymmetricMatchers extends CustomMatchers, OhmMatchers {
        }
    }
}
export {};

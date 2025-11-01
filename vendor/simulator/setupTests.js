import { display } from "@davidsouther/jiffies/lib/esm/display.js";
import { Err, isErr, isOk, Ok, } from "@davidsouther/jiffies/lib/esm/result.js";
expect.extend({
    toBeErr(result, expected) {
        if (isOk(result)) {
            return {
                pass: false,
                message: () => `Expected Err(${display(expected)}), got Ok(${display(Err(result))})`,
            };
        }
        else {
            if (expected) {
                expect(Err(result)).toMatchObject(Err(expected));
            }
        }
        return {
            pass: true,
            message: () => `Err(${display(Err(result))}) is expected`,
        };
    },
    toBeOk(result, expected) {
        if (isErr(result)) {
            return {
                pass: false,
                message: () => `Expected Ok(${display(expected)}), got Err(${display(Err(result))})`,
            };
        }
        else {
            if (expected) {
                expect(Ok(result)).toMatchObject(Ok(expected));
            }
        }
        return {
            pass: true,
            message: () => `Ok(${display(Ok(result))}) is expected`,
        };
    },
    toHaveSucceeded(match) {
        if (match.succeeded()) {
            return { pass: true, message: () => "Match succeeded" };
        }
        else {
            return { pass: false, message: () => match.message ?? "Match failed" };
        }
    },
    toHaveFailed(match, message) {
        expect(match.failed()).toBe(true);
        expect(match.shortMessage).toBe(message);
        return {
            pass: true,
            message: () => "Failed to parse with correct message",
        };
    },
    toHaveNoDiff(diffs) {
        expect(diffs.map(({ a, b, col, row }) => `${a} <> ${b} (${row}:${col})`)).toEqual([]);
        return {
            pass: true,
            message: () => "There were no diffs",
        };
    },
});
//# sourceMappingURL=setupTests.js.map
import { Err, isErr, Ok, unwrap, } from "@davidsouther/jiffies/lib/esm/result.js";
import { createError } from "../languages/base.js";
class CFGNode {
    id;
    hasReturn = false;
    children = [];
    static count = 0;
    constructor() {
        this.id = CFGNode.count;
        CFGNode.count += 1;
    }
    alwaysReturns() {
        const visited = new Set();
        function checkReturn(node) {
            if (node.hasReturn) {
                return true;
            }
            else if (node.children.length === 0) {
                return false;
            }
            visited.add(node);
            for (const child of node.children) {
                if (!visited.has(child) && !checkReturn(child)) {
                    return false;
                }
            }
            return true;
        }
        return checkReturn(this);
    }
    getLeafs() {
        const leafs = new Set();
        const visited = new Set();
        function findLeafs(node) {
            if (node.children.length === 0) {
                leafs.add(node);
            }
            else {
                visited.add(node);
                for (const child of node.children) {
                    if (!visited.has(child)) {
                        findLeafs(child);
                    }
                }
            }
        }
        findLeafs(this);
        return Array.from(leafs);
    }
}
function processIf(statement, returnType, current) {
    const ifStart = new CFGNode();
    current.children.push(ifStart);
    current = ifStart;
    const result1 = buildCFG(statement.body, returnType);
    const result2 = buildCFG(statement.else, returnType);
    if (isErr(result1)) {
        return result1;
    }
    if (isErr(result2)) {
        return result2;
    }
    const path1 = unwrap(result1);
    const path2 = unwrap(result2);
    current.children.push(path1, path2);
    const leafs = path1.getLeafs().concat(path2.getLeafs());
    current = new CFGNode();
    for (const leaf of leafs) {
        leaf.children.push(current);
    }
    return Ok(current);
}
function processWhile(statement, returnType, current) {
    const whileStart = new CFGNode();
    current.children.push(whileStart);
    current = whileStart;
    const result = buildCFG(statement.body, returnType);
    if (isErr(result)) {
        return result;
    }
    const body = unwrap(result);
    for (const leaf of body.getLeafs()) {
        leaf.children.push(current);
    }
    const next = new CFGNode();
    current.children.push(body, next);
    current = next;
    return Ok(current);
}
function buildCFG(statements, returnType) {
    const root = new CFGNode();
    let current = root;
    let result;
    for (const statement of statements) {
        switch (statement.statementType) {
            case "letStatement":
            case "doStatement":
                break;
            case "returnStatement":
                if (returnType != "void" && statement.value == undefined) {
                    return Err(createError(`A non void subroutine must return a value`, statement.span));
                }
                current.hasReturn = true;
                break;
            case "ifStatement":
                result = processIf(statement, returnType, current);
                if (isErr(result)) {
                    return result;
                }
                current = unwrap(result);
                break;
            case "whileStatement":
                result = processWhile(statement, returnType, current);
                if (isErr(result)) {
                    return result;
                }
                current = unwrap(result);
                break;
        }
    }
    return Ok(root);
}
export function validateSubroutine(subroutine) {
    const cfg = buildCFG(subroutine.body.statements, subroutine.returnType.value);
    if (isErr(cfg)) {
        return cfg;
    }
    if (!unwrap(cfg).alwaysReturns()) {
        return Err(createError(`Subroutine ${subroutine.name.value}: not all code paths return a value`, subroutine.name.span));
    }
    return Ok();
}
//# sourceMappingURL=controlFlow.js.map
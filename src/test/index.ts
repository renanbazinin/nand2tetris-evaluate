import { evaluateHDL } from "../index.js";

const config = { projectID: "01", chip: "Or" };

const badOr = `
CHIP Or {
    IN a, b;
    OUT out;

    PARTS:
    And(a=a, b=b, out=out);
}
`;

const goodOr = `
CHIP Or {
    IN a, b;
    OUT out;

    PARTS:
    Not(in=a, out=na);
    Not(in=b, out=nb);
    Nand(a=na, b=nb, out=out);
}
`;

async function main() {
  const bad = await evaluateHDL(config, { "Or.hdl": badOr });
  console.log("Bad Or result:");
  console.log(JSON.stringify(bad, null, 2));

  const good = await evaluateHDL(config, { "Or.hdl": goodOr });
  console.log("Good Or result:");
  console.log(JSON.stringify(good, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



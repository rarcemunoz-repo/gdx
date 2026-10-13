// Regression check for the diagnosis rules. Run: node tests/check-examples.js
// Pulls the rule code and the worked examples out of index.html and checks each example
// still gets the global diagnoses below. If you change a rule on purpose, update EXPECTED
// in the same commit and say why in the commit message.
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const js = html.match(/<script>([\s\S]*)<\/script>/)[1];
const grab = (re, name) => { const m = js.match(re); if (!m) throw new Error("Could not find " + name + " in index.html"); return m[0]; };

const code = [
  grab(/const RULES_VERSION[\s\S]*?const DX_ORDER = Object\.keys\(DX\);/, "rule constants"),
  grab(/const has = [\s\S]*?const fmt = [^\n]*\n/, "helpers"),
  grab(/function centralLen[\s\S]*?(?=\/\* ---------- live panel)/, "rules engine"),
  grab(/function T\([\s\S]*?\]\.map\(c => Object\.assign\(c, \{dx: evaluate\(c\)\.dx\.map\(d => d\.code\)\}\)\);/, "examples"),
  "module.exports = {EXAMPLES, evaluate, RULES_VERSION};"
].join("\n");

const m = {exports: {}};
new Function("module", code)(m);
const {EXAMPLES, evaluate, RULES_VERSION} = m.exports;

const EXPECTED = {
  "EX-01": ["APE"],
  "EX-02": ["VME", "CLASS2"],
  "EX-03": ["HYPER_LIP"],
  "EX-04": ["DAE_WEAR", "ATTRITION"],
  "EX-05": ["SHORT_LIP"],
  "EX-06": ["LONG_TOOTH"],
  "EX-07": ["DAE_CANT"],
  "EX-08": ["CLASS3"],
  "EX-09": ["MICRODONTIA"],
  "EX-10": ["VME", "SHORT_LIP", "HYPER_LIP", "APE"],
  "EX-11": [],
  "EX-12": ["HYPER_LIP", "DAE_NOWEAR"]
};

let fail = 0;
for (const ex of EXAMPLES) {
  const got = evaluate(ex).dx.map(d => d.code);
  const want = EXPECTED[ex.caseCode] || [];
  const ok = got.length === want.length && want.every(c => got.includes(c));
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"} ${ex.caseCode}  got [${got.join(", ")}]${ok ? "" : `  expected [${want.join(", ")}]`}`);
}
console.log(`\nRules ${RULES_VERSION}: ${EXAMPLES.length - fail}/${EXAMPLES.length} examples as expected.`);
process.exit(fail ? 1 : 0);

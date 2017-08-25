import test from "ava";
const babel = require("babel-core");
const plugin = require("../");

var source1 = `
var fs = require("fs");
//@promisify<err,data> myPromised
__ = fs.readFile("../package.json", "utf8");

`;

var source2 = `
var fs = require("fs");

const some = async () => await fs.readFile("./package.json", "uft8"); //@promisify<err,data>

`;

let source3 = `
var fs = require("fs");
//@promisify<null,data> myPromised
__ = fs.readFile("../package.json", "utf8");

`;

let source4 = `
var fs = require("fs");
//@promisify<null,data> myPromised
__ = fs.readFile("../package.json", arg1, arg2);

`;

let source5 = `
var fs = require("fs");

async function sample(){
  return await fs.readFile('./package.json','uft8') //@promisify<err,data>
}
`;

let source6 = `
var fs = require("fs");

async function sample(){
  return await fs.readFile('./package.json','uft8') //@promisify<null,data>
}
`;

let source7 = `
var fs = require("fs");

async function sample() {
  let { data } = await fs.readFile("./package.json", "uft8"); //@promisify<err,data>
}

`;

let source8 = `
var fs = require("fs");

async function sample() {
  try {
    let { data } = await fs.readFile("./package.json", "uft8"); //@promisify<err,data>
  } catch (err) {
    console.error(error);
  }
}

`;

let source9 = `
var fs = require("fs");

async function sample() {
  let { data1 } = await fs.readFile("./package.json", "uft8"); //@promisify<err,data>
  let { data2 } = await User.findOne({ _id: "******" }); //@promisify<err,data>
  let { data3 } = await User.findOneAndUpdate(
    { _id: "******" },
    { name: "New name" }
  ); //@promisify<err,data>
}

`;

function trim(str) {
    return str.split("\n").join("");
}

test("Basic promisify using leading comments", t => {
    const { code } = babel.transform(source1, { plugins: [plugin] });
    t.not(trim(code), trim(source1));
});

test("Promisify using leading comments without error handle", t => {
    const { code } = babel.transform(source3, { plugins: [plugin] });
    t.not(trim(code), trim(source3));
});

test("Promisify using leading comments with custom arguments", t => {
    const { code } = babel.transform(source4, { plugins: [plugin] });
    t.not(trim(code), trim(source4));
});

test("Promisify using async/await with arrow function with trailing comments", t => {
    const { code } = babel.transform(source2, { plugins: [plugin] });

    t.not(trim(code), trim(source2));
});

test("Promisify using async/await with trailing comments", t => {
    const { code } = babel.transform(source5, { plugins: [plugin] });

    t.not(trim(code), trim(source5));
});

test("Promisify using async/await with trailing comments without error handle", t => {
    const { code } = babel.transform(source6, { plugins: [plugin] });

    t.not(trim(code), trim(source6));
});

test("Promisify using async/await with trailing comments + object pattern", t => {
    const { code } = babel.transform(source7, { plugins: [plugin] });

    t.not(trim(code), trim(source7));
});

test("Promisify using async/await with trailing comments + object pattern + try/catch", t => {
    const { code } = babel.transform(source8, { plugins: [plugin] });

    t.not(trim(code), trim(source8));
});

test("Promisify using async/await with trailing comments + multiple", t => {
    const { code } = babel.transform(source9, { plugins: [plugin] });
    t.not(trim(code), trim(source9));
});

// MENMA CLI

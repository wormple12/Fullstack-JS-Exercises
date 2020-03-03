const fs = require("fs");
const path = process.argv[2];
const buffer = fs.readFileSync(path);
const str = buffer.toString();
const array = str.split("\n");
const numberOfNewLines = array.length - 1;
console.log(numberOfNewLines);

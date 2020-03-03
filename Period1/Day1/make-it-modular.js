const mymodule = require("./mymodule.js");

const path = process.argv[2];
const extension = process.argv[3];
const printAll = (err, data) => {
  if (err) console.log("ERROR");
  if (data) data.forEach(file => console.log(file));
};

mymodule(path, extension, printAll);

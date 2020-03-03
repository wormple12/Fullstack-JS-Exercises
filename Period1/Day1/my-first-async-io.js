const fs = require("fs");
fs.readFile(process.argv[2], (err, buffer) => {
  if (err) throw err;
  const str = buffer.toString();
  const numberOfNewLines = str.split("\n").length - 1;
  console.log(numberOfNewLines);
});

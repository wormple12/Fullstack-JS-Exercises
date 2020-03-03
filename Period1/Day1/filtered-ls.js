const fs = require("fs");

const path = process.argv[2];
const extension = process.argv[3];
fs.readdir(path, (err, list) => {
  if (err) throw err;
  const result = list.filter(file => file.endsWith("." + extension));
  result.forEach(file => {
    console.log(file);
  });
});

const fs = require("fs");

function doWithFilesInFolderWithExtension(path, extension, callback) {
  fs.readdir(path, (err, list) => {
    if (err) return callback(err);
    const result = list.filter(file => file.endsWith("." + extension));
    callback(null, result);
  });
}

module.exports = doWithFilesInFolderWithExtension;

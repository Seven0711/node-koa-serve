const fs = require('fs');

var fileList = [];

var getPathsSync = (path) => {

  var dirList = fs.readdirSync(path);

  dirList.forEach(function (item) {
    if (fs.statSync(path + '/' + item).isFile()) {
      let oldPath = path + '/' + item;
      let newPath = oldPath.replace('./', '');
      fileList.push(newPath);
    } else if (fs.statSync(path + '/' + item).isDirectory()) {
      getPathsSync(path + '/' + item);
    }
  });

  return fileList;
};

module.exports = getPathsSync;

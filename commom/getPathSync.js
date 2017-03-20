const fs = require('fs');

var fileList = [];

var getPathsSync = async(path) => {

  var dirList = fs.readdirSync(path);

  dirList.forEach(function (item) {
    if (fs.statSync(path + '/' + item).isFile()) {
      let oldPath = path + '/' + item;
      let newPath = oldPath.replace('../koa-server', '');
      console.log(newPath);
      fileList.push(newPath);
    } else if (fs.statSync(path + '/' + item).isDirectory()) {
      getPathsSync(path + '/' + item);
    }
  });

  // console.log(fileList)
  return fileList;
};

module.exports = getPathsSync;
const fs = require('fs');
const path = require('path');

/**
 * @name 注册所有的控制器 registerControllers
 * Register all controllers with provided router
 * @param  {KoaRouter} router API mount point
 * @注意 控制器命名规范：xxxCtrl.js
 */
module.exports = function (router) {
  fs.readdirSync(__dirname)
    .filter((fileName) => fileName.endsWith('Ctrl.js'))
    .forEach((fileName) => {
      const ctrlFilePath = path.join(__dirname, fileName);

      require(ctrlFilePath)(router);
    });
};

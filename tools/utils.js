const glob = require('glob');
const config = require('./config');
const path = require('path');

//获取多级的入口文件
exports.getMultiEntry = function (globPath, extname = 'js') {
  console.log(globPath);
  let entries = {};
  glob.sync(globPath).forEach(function (entry) {
    let name = new RegExp(`.*\/${config.moduleName}\/(.*?)\.${extname}`).exec(entry)[1];
    name = path.dirname(name);
    entries[name] = entry;
  });
  return entries;
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

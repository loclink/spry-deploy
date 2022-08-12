const fs = require("fs");
const path = require("path");
const config = require("../../config");

const  { libPath = "./lib/", workPathMap = {}, port = 7777, password } = config;
const readDir = fs.readdirSync(path.resolve(libPath));
const shellNames = [];
readDir.forEach(item => {
  shellNames.push(item.split(".sh")[0]);
});

const finalConfig = {
  libPath: path.resolve(libPath),
  shellNames,
  port,
  password,
  workPathMap,
};
module.exports = finalConfig;

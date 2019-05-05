const path = require("path");
const lvshouConfig = require("../../config/lvshou-config");
var glob = require("glob");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var PAGE_PATH = path.resolve(__dirname, "../../src/pages");
var merge = require("webpack-merge");

// 那么就作为入口处理
const entries = () => {
  var entryFiles = glob.sync(PAGE_PATH + "/*/*.js");
  var map = {};
  entryFiles.forEach((filePath, key) => {
    var filename = filePath.split("/pages/")[1].split("/")[0];
    map[filename] = ["babel-polyfill", filePath];
  });
  return map;
};

//多页面用于开发环境
const devHtmlWebpackPlugin = () => {
  let entryHtml = glob.sync(PAGE_PATH + "/*/*.html");
  let arr = [];
  entryHtml.forEach(filePath => {
    var filename = filePath.split("/pages/")[1].split("/")[0];
    const chunk = [filename];
    const pageConfig = require(`../../${lvshouConfig.entryRoot}/${filename}/config`); //获取单页面的配置文件
    let conf = {
      filename: filename + "/index.html",
      template: filePath,
      inject: true, // 生成的js 插入body底部
      chunksSortMode: "none",
      title:pageConfig.title || lvshouConfig.title,
      name:pageConfig.title || lvshouConfig.name,
      keywords:pageConfig.keywords || lvshouConfig.keywords,
      description: pageConfig.description || lvshouConfig.description,
      viewport: lvshouConfig.viewport,
      tongji: pageConfig.tongji || lvshouConfig.tongji,
      baiduId: pageConfig.baiduId,
      chunks: chunk // 主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
    };
    arr.push(new HtmlWebpackPlugin(conf));
  });
  return arr;
};
//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
const prodHtmlWebplugin = () => {
  const entryHtmlBuild = process.argv[2];
  let arr = [];
  if (entryHtmlBuild && entryHtmlBuild !== "--inline") {
    const pagesConfig = require(`../../${lvshouConfig.entryRoot}/${entryHtmlBuild}/config`);
    let conf = {
      filename: `${entryHtmlBuild}/index.html`,
      template: `./${lvshouConfig.entryRoot}/${entryHtmlBuild}/index.html`,
      inject: true,
      chunksSortMode: "dependency", // 对引入的chunk模块进行排序
      title: pagesConfig.title || lvshouConfig.title,
      name: pagesConfig.title || lvshouConfig.name,
      keywords: pagesConfig.keywords || lvshouConfig.keywords,
      description: pagesConfig.description || lvshouConfig.description,
      viewport: lvshouConfig.viewport,
      tongji: pagesConfig.tongji || lvshouConfig.tongji,
      baiduId: pagesConfig.baiduId,
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 删除空白符和换行符
        removeAttributeQuotes: true // 移除属性引号
      },
      chunks: ["manifest", "vendor", entryHtmlBuild]
    };
    arr.push(new HtmlWebpackPlugin(conf));
  }
  return arr;
};
module.exports = {
  entries: entries(),
  devHtmlWebpackPlugin: devHtmlWebpackPlugin(),
  prodHtmlWebplugin: prodHtmlWebplugin()
};

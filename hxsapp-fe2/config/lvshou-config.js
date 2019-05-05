/*
 * @desc lvshou 的单独配置文件 用于开发环境 和 生产环境
 * */

module.exports = {
  title: "好享瘦",
  name: "user",
  description: "",
  keywords: "",
  tongji: "<script></script>",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0",
  entryRoot: "src/pages",
  assetsPublicPath: "", // cdn 的URL地址 eq: //static.lvshou.com/
  assetsSubDirectory: process.argv[2], // 局部编辑
  //assetsRoot: "../../dev1.0", // 打包文件所在目录
  assetsRoot: "E:\\www\\hxs\\hxsapp-fe2-online" //迁移进上线目录hxsapp-fe2-online
};

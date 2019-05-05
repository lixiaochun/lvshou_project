'use strict'
var client = require('scp2');
var lvShouConfig = require('../config/lvshou-config')

// var random = Math.random()
var scpConfig = {
  "host": "121.41.83.91",
  "username": "bravo",
  "password": "LrEaAfMty4UD",
  "port": "48022",
  "path": "/apps/data/work/html/hxswap.hxsapp.com"
};

console.log("正在上传您的打包文件到测试环境："+ scpConfig.host+":"+ scpConfig.port  +" ，请稍后...")
console.log("上传中...")

client.scp(lvShouConfig.assetsRoot, scpConfig, function(err) {
  if(!err){
    console.log("\n")
    console.log("========scp2工具上传完毕=============\n远端服务地址："+ scpConfig.host+":"+ scpConfig.port + "\n远端上传文件路径："+ scpConfig.path +"\n \n")
  }else{
    console.log("err",err)
  }
})

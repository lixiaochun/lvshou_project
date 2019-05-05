# vue-hxsapp

> 针对4.0版本app多页面架构的项目[vue2.0 + less + axios + webpack]

## Build Setup

## install dependencies
npm install

## 调起开发环境的服务器
npm run dev

## 打包需要开启局部编译
npm run build test2
test2  表示要打包哪个页面
#这个参数的填写一定注意不能和pages文件夹里面的文件名重复，不然会删除pages文件里面的对应的文件夹，和覆盖原本的内容

##特别注意点
多页面框架，npm run build打包前，针对config文件夹下的lvshou-config.js输入自己本地的开发配置，如：
assetsRoot: "E:\\www\\hxs\\hxsapp-fe2-online" //打包迁移公司开发目录，hxsapp-fe2-online是公司gitlab的项目（用于预发布和线上）
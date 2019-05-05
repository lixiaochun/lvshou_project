# hxsapp-fe

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

#必现npm run dll，对一些不经常变动的类库做预编译的打包处理
(1) 文档： https://segmentfault.com/a/1190000011721918
(2)注意：必须下面的npm run dll 的命令执行成功了，后面的npm run dev 和 npm run build 才可以运行起来
(3)webpack 已经升级为3.5.5

npm run dll

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification 
npm run build

# build for production and view the bundle analyzer report
# 试图可视化：本地查看可以优化的webpack各种资源文件的大小
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

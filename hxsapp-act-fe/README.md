# 应对集团多页面需求 开发的基础架构

> Multi page infrastructure project

# 开发环境的注意事项
```
  # npm run dev ---- 直接使用webpack-dev-server 调起一个开发环境的服务器 (vue-cli 原始的 未修改)

  # npm run dev:server 主要是调用 webpack-dev-middleware 和 webpack-hot-middleware 来搭建的一个 开发环境的服务器

  # npm run dev:nodemon  添加这个命令的原因 避免一些情况下 修改build文件夹时 服务器不会自动重启的情况

  npm run dev:server 与 npm run dev:nodemon 可以开启局部编译
  局部编译主要是为了防止以后项目变得臃肿 从而导致webpack在开发环境下编译生成的时间过长

  开启局部编译
  npm run dev:server index  (npm run dev:nodemon index 也是一样)
  表示只编译index页面 的依赖文件 别的页面的依赖不编译
  注意事项:
  1, 开启局部编译 会使得未编译页面 是打不开的
  2, 现在局部编译 只做到页面级别编译
  3, 不输入任何的页面 表示全局编译

  开启自适应布npm run dev:server all rem/75局
  #  / npm run dev:nodemon all rem/75

  # USAGE
  默认要输入all 表示自适应布局作用于全局 也可以局部开启
  默认输入自适应参数 rem/75  75这个数字是动态的 是根据设计稿的宽度 / 10 得到的

  # 注意事项
  1, all 是默认要写入的
  2, rem/75 也是必填项 75 是根据设计稿的宽度来决定


  # 为了避免打包的文件内容过多 图片这些静态资源不允许打包到发布文件中 图片单独走aliyun oss 流程
  使用流程 
  启动项目后 
  运行gulp task 监控图片
  npm run gulp:oss


```

# 打包 
为了优化打包过程 提升打包速度 
只打包当前开发的页面 只提交当前页面的打包文件
shell 命令
eq: npm run build _templatePage
_templatePage  表示需要打包哪个页面 
##这个参数的填写一定要注意不能和hxsapp-act-fe文件夹里面的文件名重复 不然会删除hxsapp-act-fe里面对应的文件夹 和 覆盖原本的内容



## 特别注意点

用这个开发框架时 一开始就要针对config 文件夹 下的lvshou-config.js 输入自己本地的开发配置如

entryRoot: 'src/pages', // 框架的入口文件

assetsSubDirectory: 'activityStatic', // 打包的静态文件夹名

isCopyDist: true, // 是否需要copy整个dist文件

distPath: '../dev1.0', // 打包后的文件夹名称 (这个可以自定义打包后的位置,, 这个路径是相对路径)

assetsRoot: '../../dev1.0', // 打包文件所在目录 (打包后存放的文件夹, 这个路径是相对路径)

testPath: 'H:\\code\\company\\hxsapp-act-fe', // 迁移进公司开发目录 用于发布到预发布环境 (这个是公司gitlab hxsapp-act-fe在你本地的地址 )


执行 npm run build 操作时 重点关注的地方

1, 会执行两次  npm run gulp 操作 (引入gulp 的sftp 插件性能不怎么好 文件过多的话, 容易造成文件丢失 只能执行多一次操作)

2, 如果图片过多的话 建议手动上传 避免图片上传不成功


# git 操作

1 bug修复可以直接在dev 分支修复 

2 新需求开发 新开分支开发  ( git branch 新分支   git checkout 新分支 )

3 开发完成 合并到dev ( git checkout dev   git merge 开发分支 )

4 删除 本地分支 ( git branch -d 分支名)

5 删除远程仓库分支 ( git push origin --delete 分支名 )

6 整个开发完成
/*
* @desc lvshou 的单独配置文件 用于开发环境 和 生产环境
* @Author chenweiliang@lvshou.com(Ocean)
* */

module.exports = {
  // seo配置
  title: '好享瘦',
  name: 'user',
  description: '',
  keywords: '',
  tongji: '<script></script>',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0',
  // 开发配置
  entryRoot: 'src/pages',
  assetsPublicPath: '', // cdn 的URL地址 eq: //static.lvshou.com/
  assetsSubDirectory: process.argv[2], // CDN 的二级文件名 eq: static
  // assetsSubDirectory: 'ActivityStatic', // CDN 的二级文件名 eq: static
  isCopyDist: true, // 是否需要copy整个dist文件
  distPath: '../dev1.0', // 打包后的文件夹名称
  oldDir: '../hxsapp-act-fe', // 需删除旧的打包文件
  assetsRoot: '../../dev1.0', // 打包文件所在目录
  testPath: 'H:\\code\\company\\hxsapp-act-fe', // 迁移进公司开发目录hxsapp-act-fe (这里一定要填写 你本地hxsapp-act-fe 的地址) 用于发布到预发布环境
  selfAdaption: true, // 自适应配置 为 true 表示自适应 (默认状态) false 取消自适应
  dev: {
  },
  build: {
    assetsSubDirectory: 'actictyStatic/static'
  }
}

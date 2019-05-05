/**
 * @desc 用于配置一些单页面的配置 (非全局配置 全局配置不可写此处)
 * @author chenweiliang@lvshou.com(Ocean)
 */

module.exports = {
  isShare: false, // 调用分享按钮 true 为分享 false 取消分享
  title: '', // 页面title 这个字段非必填 因为可以直接读接口数据 
  name: 'user',
  description: '测试',
  keywords: '测试',
  tongji: '<script></script>',
  baiduId: 'fc9b27cfc85ab0b8f38dcbc7e25d0e38' // 百度埋点 这个id 是必填项 是唯一值
}
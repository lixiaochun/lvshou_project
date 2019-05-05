/**
 * @desc 一些协议封装
 * @author zhoudihang@lvshou.com
 */

// 跳转web浏览器新窗口 https://hxsapp_new_webview#打开链接
export const openWebview = (uri) => {
  window.location.href = 'https://hxsapp_new_webview#' + uri
}
// h5需要关闭app内原生浏览器
export const closeWebview = () => {
  window.location.href = 'https://hxsapp_close'
}

// https://hxsapp_jump_dynamic#话题id 跳转写动态页面
export const jumpDynamic = (id) => {
  window.location.href = 'https://hxsapp_jump_dynamic#' + id
}
// https://hxsapp_user_info#用户user-id 跳转个人主页
export const userInfo = (user_id) => {
  window.location.href = 'https://hxsapp_user_info#' + user_id
}

// https://hxsapp_jump_myactivity#数字 跳转我的活动页面
//
// 1任务福利-我的福利 ，
//
// 0任务福利-已参加
//
// 2任务福利-进行中 （>=3.3.1）
export const jumpMyactivity = (num) => {
  window.location.href = 'https://hxsapp_jump_myactivity#' + num
}
// https://hxsapp_comeback H5返回上一页
export const comeback = () => {
  window.location.href = 'https://hxsapp_comeback'
}

// 暴露 protocol.js 的方法
export default {
  openWebview,
  closeWebview,
  jumpDynamic,
  userInfo,
  jumpMyactivity,
  comeback
}

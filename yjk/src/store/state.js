const USER_PORTRAITURL = require('../common/image/user.png')
const CUSTOM_PORTRAITURL = require('../common/image/custom.png')

const state = {
  config: {
    userPortraitUrl: USER_PORTRAITURL,
    customPortraitUrl: CUSTOM_PORTRAITURL
  },
  isLogin: false, // 是否已经登录
  isConnect: false, // IM是否已经连接
  user: {}, // 当前用户
  messageUser: {},
  conversationUserList: [], // 聊天用户列表
  conversationList: [], // 消息列表
  custom: {}, // 当前客户
  call: {}, // 弹屏
  appointmentNum: 0 // 我的预约
}

export default state

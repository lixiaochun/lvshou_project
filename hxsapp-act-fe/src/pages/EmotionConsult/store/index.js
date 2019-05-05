/*
* @desc state为vuex 状态树管理
* @Author chenweiliang@lvshou.com(Ocean)
* */

import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins'

import Test from './modules/testModule'

Vue.use(Vuex)

// 开发环境开启 debug 模式
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Test
  },
  plugins,
  strict: debug
})

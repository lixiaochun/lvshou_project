/**
 * @desc vuex module 编写模板
 * @author chenweiliang@lvshou.com(Ocean)
 */
import * as types from '../mutation_types'
import * as actions from '../actions/testAction' // 引入对应action文件

const state = {
  teststate: 'test'
}

const getters = {
  pushTest (state) {
    return state.teststate
  }
}

const mutations = {
  [types.TEST] (state, data) {
    state.teststate = data
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

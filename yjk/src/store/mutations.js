import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGIN](state, isLogin) {
    state.isLogin = isLogin
  },
  [types.SET_MESSAGEUSER](state, messageUser) {
    state.messageUser = messageUser
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_LIST_SORT](state, listSort) {
    state.listSort = listSort
  },
  [types.SET_LIST_SORT_ITEM](state, listSortItem) {
    state.listSortItem = listSortItem
  }
}

export default mutations

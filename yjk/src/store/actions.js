import * as types from './mutation-types'
import { setToken, clearStorage, clearToken } from 'common/js/storage'

export const setUser = function({ commit }, user) {
  setToken(user.token)
  commit(types.SET_USER, user)
  commit(types.SET_LOGIN, true)
}

export const userOut = function({ commit, state }) {
  clearStorage()
  clearToken()
  commit(types.SET_LOGIN, false)
}

export const setMessageUser = function({ commit }, messageUser) {
  commit(types.SET_MESSAGEUSER, messageUser)
}

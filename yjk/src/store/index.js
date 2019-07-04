import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import * as getters from './getters'
import initState from './state'
import mutations from './mutations'
import { getStorage, setStorage } from 'common/js/storage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const lsState = getStorage()
const state = initState
if (lsState) {
  state.user = JSON.parse(lsState).user
}

const Store = new Vuex.Store({ /* eslint-disable-line no-undef */
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

Store.subscribe((mutation, state) => {
  setStorage(state)
})

export default Store

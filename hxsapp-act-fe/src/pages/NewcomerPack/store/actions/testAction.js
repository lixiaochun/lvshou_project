/**
 * @desc vuex action 编写模板
 * @author chenweiliang@lvshou.com(Ocean)
 */
import * as types from '../mutation_types'

export const test = ({commit}, options) => {
  commit(types.TEST, options)
}

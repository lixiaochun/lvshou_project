import { get } from 'common/js/ajax'
// 客服聊天列表获取
export function getCsmsgList(obj) {
  const url = '/yjk-operation/csmsg/getCsmsgList'
  return get(url, obj)
}
// 客服聊天记录详情
export function getCsmsgDetails(obj) {
  const url = '/yjk-operation/csmsg/getCsmsgDetails'
  return get(url, obj)
}

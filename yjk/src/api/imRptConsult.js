import { get, post } from 'common/js/ajax'
// 顾问聊天数据汇总列表
export function getConsultList(list) {
  const url = '/yjk-operation/imRptConsult/getList'
  return get(url, list)
}

// 聊天记录查询列表
export function getMsgList(list) {
  const url = '/yjk-operation/imRptMsg/getList'
  return get(url, list)
}
// 聊天记录查询
export function getDetail(list) {
  const url = '/yjk-operation/appConsultantMsg/getMsgDetails'
  return get(url, list)
}
// 获取敏感字列表
export function getSensitiveWordList(list) {
  const url = '/yjk-operation/imSensitiveWord/getSensitiveWordList'
  return get(url, list)
}
// 增加敏感字
export function addSensitiveWord(list) {
  const url = '/yjk-operation/imSensitiveWord/saveSensitiveWord'
  return post(url, list)
}
// 删除敏感词
export function deltSensitiveWord(list) {
  const url = '/yjk-operation/imSensitiveWord/deleteSensitiveWord'
  return post(url, list)
}
// 导出excel
export function exportExcel(list) {
  const url = '/yjk-operation/imRptMsg/exprorExcel'
  return post(url, list)
}
// 聊天记录图片查询
export function getPicList(list) {
  const url = '/yjk-operation/appConsultantMsg/getPictureListByDay'
  return get(url, list)
}
// 查询当天的聊天记录
export function getTodayTotalMsg(list) {
  const url = '/yjk-operation/appConsultantMsg/getTodayTotalMsg'
  return get(url, list)
}

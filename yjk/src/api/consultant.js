import { get, post } from 'common/js/ajax'

// 获取列表
export function getList(obj) {
  const url = '/yjk-operation/plfConsultant/getPlfConsultantList'
  return get(url, obj)
}
// 判断上下线
export function updatePlfConsultantIsShow(obj) {
  const url = '/yjk-operation/plfConsultant/updatePlfConsultantIsShow'
  return post(url, obj)
}
// 获取审批资料列表
export function getPlfConsultAuditHisList(obj) {
  const url = '/yjk-operation/plfConsultant/getPlfConsultAuditHisList'
  return get(url, obj)
}
// 获取审核资料详情
export function getPlfConsultAuditHisById(obj) {
  const url = '/yjk-operation/plfConsultant/getPlfConsultAuditHisById'
  return get(url, obj)
}
// 一线顾问资料审核
export function updatePlfConsultAuditHis(obj) {
  const url = '/yjk-operation/plfConsultant/updatePlfConsultAuditHis'
  return post(url, obj)
}
// 置顶功能
export function updatePlacement (obj) {
  const url = '/yjk-operation/plfConsultant/updateMediaChatterTop'
  return post(url, obj)
}
// 获取一线顾问详情
export function getPlfConsultDetail(obj) {
  const url = '/yjk-operation/plfConsultant/getPlfConsultDetailById'
  return get(url, obj)
}


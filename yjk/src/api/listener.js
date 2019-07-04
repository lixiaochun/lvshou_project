import { post, get } from 'common/js/ajax'
import axios from 'axios'

// 服务收费标准设置列表
export function getListenerServiceList(serviceName = '', pageNum = 1, pageSize = 10) {
  const url = '/yjk-operation/listener/getListenerServiceList'
  return post(url, {
    serviceName: serviceName,
    pageNum: pageNum,
    pageSize: pageSize
  })
}

// 新建服务收费标准
export function saveListenerService(serviceName, serviceItem) {
  const url = '/yjk-operation/listener/saveListenerService'
  return post(url, { serviceName, serviceItem })
}

// 更新服务收费标准
export function updateListenerService(serviceId, serviceName, serviceItem) {
  const url = '/yjk-operation/listener/updateListenerService'
  return post(url, { serviceId, serviceName, serviceItem })
}

// 获取收费标准相关项配置 （下拉框数据服务时长、有效期）
export function getListenerServiceConfig() {
  const url = '/yjk-operation/listener/getListenerServiceConfig'
  return post(url)
}

// 根据id获取收费标准
export function getListenerServiceById(serviceId) {
  const url = '/yjk-operation/listener/getListenerServiceById'
  return post(url, { serviceId })
}

// 倾听者列表
export function getListenerList(params) {
  const url = '/yjk-operation/listener/getListenerList'
  Object.keys(params).forEach(elem => {
    if ((!params[elem] || params[elem] === '') && params[elem] !== 0) {
      delete params[elem]
    }
  })
  params.pageNum = params.pageNum || 1
  params.pageSize = params.pageSize || 10
  return post(url, params)
}

// 更新倾听者上下线状态
export function updateListenerOnlineState(listenerId, onlineState) {
  const url = '/yjk-operation/listener/updateListenerOnlineState'
  return post(url, { listenerId, onlineState })
}

// 选择服务收费标准(下拉框)
export function getAllListenerService() {
  const url = '/yjk-operation/listener/getAllListenerService'
  return post(url)
}

// 更新倾听者收费标准
export function updateListenerByService(listenerId, serviceId) {
  const url = '/yjk-operation/listener/updateListenerByService'
  return post(url, { listenerId, serviceId })
}

// 倾听者业务订单列表
export function getListenerOrderList({ startTime, endTime, state, orderNo, userId, userName, mobile, pageNum = 1, pageSize = 10 }) {
  const url = '/yjk-operation/listener/getListenerOrderList'
  const params = { startTime, endTime, state, orderNo, userId, userName, mobile, pageNum, pageSize }
  const reg = /^\s*$/g
  Object.keys(params).forEach(elem => {
    if (!params[elem] || reg.test(params[elem])) {
      delete params[elem]
    }
  })
  return post(url, params)
}

// 倾听者业务订单详情
export function getListenerOrderDetail(orderNo) {
  const url = '/yjk-operation/listener/getListenerOrderDetail'
  return post(url, { orderNo })
}

// 倾听者服务订单列表
export function getListenerServiceOrderList({ startTime, endTime, operationRecord, orderNo, userId, userName, pageNum = 1, pageSize = 10 }) {
  const url = '/yjk-operation/listener/getListenerServiceOrderList'
  const params = { startTime, endTime, operationRecord, orderNo, userId, userName, pageNum, pageSize }
  const reg = /^\s*$/g
  Object.keys(params).forEach(elem => {
    if (!params[elem] || reg.test(params[elem])) {
      delete params[elem]
    }
  })
  return post(url, params)
}

// 倾听者业务收支统计列表
export function getListenerFlowAggOrderList({ startTime, endTime, state, orderNo, tradeNo, userName, pageNum = 1, pageSize = 10 }) {
  const url = '/yjk-operation/listener/getListenerFlowAggOrderList'
  const params = { startTime, endTime, state, orderNo, tradeNo, userName, pageNum, pageSize }
  const reg = /^\s*$/g
  Object.keys(params).forEach(elem => {
    if (!params[elem] || reg.test(params[elem])) {
      delete params[elem]
    }
  })
  return post(url, params)
}

// 导出倾听者业务收支统计
export function exportListenerFlowOrderListByExcel({ startTime, endTime, state, orderNo, tradeNo, userName }) {
  let url = '/yjk-operation/listener/exportListenerFlowOrderListByExcel'
  const params = { startTime, endTime, state, orderNo, tradeNo, userName }
  const reg = /^\s*$/g
  Object.keys(params).forEach(elem => {
    if (!params[elem] || reg.test(params[elem])) {
      delete params[elem]
    } else {
      if (url.includes('?')) {
        url = url + '&' + elem + '=' + params[elem]
      } else {
        url = url + '?' + elem + '=' + params[elem]
      }
    }
  })
  return axios({
    method: 'GET',
    url: url,
    responseType: 'blob'
  })
}

// 置顶更新
export function topUpdateService(list) {
  const url = '/yjk-operation/listener/updateMediaChatterTop'
  return post(url, list)
}

// 获取入驻资料列表
export function getMcApplyInfoList(obj) {
  const url = '/yjk-operation/mcApplyInfo/getMcApplyInfoList'
  return get(url, obj)
}

// 获取解忧师详情
export function getMediaChatterById(id) {
  const url = '/yjk-operation/listener/getMediaChatterById'
  return get(url, { 'id': id })
}

// 获取入驻资料详情
export function getMcApplyInfoById(id) {
  const url = '/yjk-operation/mcApplyInfo/getMcApplyInfoById'
  return get(url, { 'id': id })
}

// 审核入驻资料
export function updateMcApplyInfo(list) {
  const url = '/yjk-operation/mcApplyInfo/updateMcApplyInfo'
  return post(url, list)
}

// 获取解忧师审核资料列表
export function getMediaChatterAuditHisList(list) {
  const url = '/yjk-operation/listener/getMediaChatterAuditHisList'
  return get(url, list)
}

// 获取解忧师审核资料详情
export function getMediaChatterAuditById(list) {
  const url = '/yjk-operation/listener/getMediaChatterAuditById'
  return get(url, list)
}

// 审核解忧师资料
export function updateMediaChatterAudit(list) {
  const url = '/yjk-operation/listener/updateMediaChatterAudit'
  return post(url, list)
}

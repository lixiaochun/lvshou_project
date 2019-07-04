import { get, post } from 'common/js/ajax'
import axios from 'axios'

// 内容管理 == > table数据
export function getArticleList(article) {
  const url = '/yjk-operation/article/getArticleList'
  return post(url, {
    article
  })
}

// 内容管理 == > 删除数据
export function delArticle(id) {
  const url = '/yjk-operation/article/delArticle'
  return post(url, id)
}

// 内容管理 == > 设置显示状态
export function getArticleState(userInfo) {
  const url = '/yjk-operation/article/getArticleState'
  return get(url, {
    params: userInfo
  })
}

// 内容管理 == > 设置显示状态
export function getArticleLayoutList(userInfo) {
  const url = '/yjk-operation/article/getArticleLayoutList'
  return get(url)
}

// 添加文章
export function saveArticle(article) {
  const url = '/yjk-operation/article/saveArticle'
  const { typeId, title, dataFromUrl, fromName, layoutId, contentUrl, summary, topStartTime, topEndTime, isShow, isTop, content, fileUrl } = article
  return post(url, { typeId, title, dataFromUrl, fromName, layoutId, contentUrl, summary, topStartTime, topEndTime, isShow, isTop, content, fileUrl })
}

// 修改文章
export function upArticle(article) {
  const url = '/yjk-operation/article/upArticle'
  const { id, typeId, title, dataFromUrl, fromName, layoutId, contentUrl, summary, topStartTime, topEndTime, isShow, isTop, content, fileUrl } = article
  return post(url, { id, typeId, title, dataFromUrl, fromName, layoutId, contentUrl, summary, topStartTime, topEndTime, isShow, isTop, content, fileUrl })
}

// 文章详情
export function articleInfo({ id }) {
  const url = '/yjk-operation/article/articleInfo'
  return get(url, { id })
}

// 内容分类管理
// 分类列表
export function vdcategroyList(article) {
  const url = '/yjk-operation/vdcategroy/list'
  return post(url, article)
}

// 分类添加
export function saveBaseType(article) {
  const url = '/yjk-operation/vdcategroy/save'
  return post(url, article)
}

// 分类修改
export function upBaseType(article) {
  const url = '/yjk-operation/vdcategroy/update'
  return post(url, article)
}

// 分类删除
export function delBaseType(article) {
  const url = '/yjk-operation/vdcategroy/delete'
  return post(url, article)
}

// 系统消息 == > 列表展示
export function sysmsgList(article) {
  const url = '/yjk-operation/sysmsg/list'
  return post(url, article)
}

// 系统消息 == > 列表展示修改发送方式
export function updateChannel(article) {
  const url = '/yjk-operation/sysmsg/updateChannel'
  return post(url, article)
}

// 系统消息 == > 获取消息类型
export function baseTypeList(article) {
  const url = '/yjk-operation/baseType/list'
  return post(url, article)
}
// 系统消息 == > 获取系统消息详情
export function sysmsgDetail(article) {
  const url = '/yjk-operation/sysmsg/detail'
  return post(url, article)
}
// 系统消息 == > 修改系统消息
export function sysmsgUpdate(article) {
  const url = '/yjk-operation/sysmsg/update'
  return post(url, article)
}
// 系统消息 == > 获取变量列表
export function variableList(code) {
  const url = '/yjk-operation/sysmsg/variableList'
  return post(url, code)
}

// 系统消息 == > 新建系统消息
export function sysmsgSave(article) {
  const url = '/yjk-operation/sysmsg/save'
  return post(url, article)
}

// 系统消息 == > 删除系统消息
export function sysmsgDelete(article) {
  const url = '/yjk-operation/sysmsg/delete'
  return post(url, article)
}

// 消息模板 == > 列表展示
export function list(article) {
  const url = '/yjk-operation/msgtemp/list'
  return post(url, {
    article
  })
}
// 消息模板 == > 新增消息模板
export function save(article) {
  const url = '/yjk-operation/msgtemp/save'
  return post(url, article)
}

// 消息模板 == > 修改消息模板
export function update(article) {
  const url = '/yjk-operation/msgtemp/update'
  return post(url, article)
}

// 消息模板 == > 回显
export function detail(article) {
  const url = '/yjk-operation/msgtemp/detail'
  return post(url, article)
}

// 消息模板 == > 删除消息模板
export function deletes(article) {
  const url = '/yjk-operation/msgtemp/delete'
  return post(url, article)
}

// 消息模板 == > 删除消息模板
export function deletelist(article) {
  const url = '/yjk-operation/msgtemp/delete'
  return get(url, article)
}

// 群发消息 == > 列表展示
export function groupmsgList(article) {
  const url = '/yjk-operation/groupmsg/list'
  return post(url, article)
}

// 群发消息 == > 删除数据
export function groupmsgDelete(article) {
  const url = '/yjk-operation/groupmsg/delete'
  return post(url, article)
}

// 群发消息 == > 新建群发
export function groupmsgSave(article) {
  const url = '/yjk-operation/groupmsg/save'
  return post(url, article)
}

// 群发消息 == > 消息回显
export function groupmsgDetail(article) {
  const url = '/yjk-operation/groupmsg/detail'
  return post(url, article)
}

// 群发消息 == > 修改群发
export function groupmsgUpdata(article) {
  const url = '/yjk-operation/groupmsg/update'
  return post(url, article)
}

// 群发消息 == > 获取群发消息列表
export function appUserList(article) {
  const url = '/yjk-operation/appUser/list'
  return post(url, article)
}

// 新增系统广播
export function saveAppBroadcastInfo(list) {
  const url = '/yjk-operation/appBroadcast/saveAppBroadcastInfo'
  return post(url, list)
}

// 编辑系统广播
export function updateAppBroadcastInfo(list) {
  const url = '/yjk-operation/appBroadcast/updateAppBroadcastInfo'
  return post(url, list)
}

// 改变状态
export function publishAppBroadcastInfo(list) {
  const url = '/yjk-operation/appBroadcast/publishAppBroadcastInfo'
  return post(url, list)
}

// 获取广播详情
export function getAppBroadcastById(list) {
  const url = '/yjk-operation/appBroadcast/getAppBroadcastById'
  return post(url, list)
}

// 获取系统广播列表
export function getAppBroadcastList(list) {
  const url = '/yjk-operation/appBroadcast/getAppBroadcastList?time=' + new Date().getTime()
  return post(url, list)
}
// 通过excel群发消息
export function sendMsgByExcel(file, sendChannel, title, content, sendType, sendTime, sendStatus, linkUrl, id) {
  const Url = '/yjk-operation/sysmsg/sendMsgByExcel'
  const param = new FormData()
  param.append('file', file, file.name)
  param.append('sendChannel', sendChannel)
  param.append('title', title)
  param.append('content', content)
  param.append('sendType', sendType)
  param.append('sendTime', sendTime)
  param.append('sendStatus', sendStatus)
  param.append('linkUrl', linkUrl)
  param.append('id', id)
  return axios.post(Url,
    param,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  ).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 系统通知上传附件
export function uploadAttachmentFile(file) {
  const Url = '/yjk-operation/file/uploadAttachmentFile'
  const param = new FormData()
  param.append('file', file, file.name)
  return axios.post(Url,
    param,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  ).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取系统广播列表
export function getBroadcastList(list) {
  const url = '/yjk-operation/consultBroadcast/getBroadcastList?time=' + new Date().getTime()
  return post(url, list)
}

// 改变系统通知状态
export function publishBroadcastInfo(list) {
  const url = '/yjk-operation/consultBroadcast/publishBroadcastInfo'
  return post(url, list)
}

import { get, post } from 'common/js/ajax'
// 登录
export function login({ account, passwd }) {
  const url = '/yjk-operation/appLogin/login'
  return post(url, {
    account: account,
    passwd: passwd
  })
}
// 内容管理 == > table数据列表
export function getArticleList(article) {
  const url = '/yjk-operation/article/getArticleList'
  return post(url, article)
}

// 内容管理 == > 删除数据
export function delArticle(id) {
  const url = '/yjk-operation/article/delArticle'
  return post(url, id)
}

// 内容管理 == > 设置显示状态
export function getArticleState(userInfo) {
  const url = '/yjk-operation/article/getArticleState'
  return get(url, userInfo)
}

// 内容管理 == > 设置显示状态
export function getArticleLayoutList(userInfo) {
  const url = '/yjk-operation/article/getArticleLayoutList'
  return get(url, userInfo)
}

// 内容管理 == > 新增内容提交
export function saveArticle(article) {
  const url = '/yjk-operation/article/saveArticle'
  return post(url, {
    article
  })
}

// 会员列表
export function getAppUserList(user) {
  const url = '/yjk-operation/appUser/getAppUserList'
  return get(url, user)
}

// 会员列表 获取非冻结的标签列表
export function getLabelList() {
  const url = '/yjk-operation/appUser/getLabelList'
  return get(url, {})
}

// 批量给用户打标签
export function saveLabelToUser({ ids, labelid }) {
  const url = '/yjk-operation/appUser/saveLabelToUser'
  return post(url, { ids, labelid })
}

// 批量更改用户的状态
export function updateState({ ids, state }) {
  const url = '/yjk-operation/appUser/updateState'
  return post(url, { ids, state })
}

// 根据id查询用户信息
export function getAppUserById({ id }) {
  const url = '/yjk-operation/appUser/getAppUserByIdV20'
  return get(url, { id })
}

// 更新用户资料
export function updateAppUserInfo(user) {
  const url = '/yjk-operation/appUser/updateAppUserInfo'
  return post(url, user)
}

// 更改会员默认收货地址
export function updateAppUserDefaultAddress(user) {
  const url = '/yjk-operation/appUser/updateAppUserDefaultAddress'
  return post(url, user)
}

// 等级设置
export function getList(user) {
  const url = '/yjk-operation/appUserLevelConfig/getList'
  return get(url, user)
}

// 新增等级设置
export function saveConfig(user) {
  const url = '/yjk-operation/appUserLevelConfig/saveConfig'
  return post(url, user)
}

// 编辑等级设置
export function updateConfig(user) {
  const url = '/yjk-operation/appUserLevelConfig/updateConfig'
  return post(url, user)
}

// 等级编辑回显
export function getConfig(user) {
  const url = '/yjk-operation/appUserLevelConfig/getConfig'
  return get(url, user)
}

// 标签管理
export function labelgetList(user) {
  const url = '/yjk-operation/labelLib/getList'
  return get(url, user)
}

// 标签管理 修改状态
export function updateLabelLibStatus(user) {
  const url = '/yjk-operation/labelLib/updateLabelLibStatus'
  return post(url, user)
}

// 标签管理  回显
export function getLabelLib(user) {
  const url = '/yjk-operation/labelLib/getLabelLib'
  return get(url, user)
}

// 标签管理 编辑一条数据
export function updateLabelLib(user) {
  const url = '/yjk-operation/labelLib/updateLabelLib'
  return post(url, user)
}

// 标签管理 新增标签
export function saveLabelLib(user) {
  const url = '/yjk-operation/labelLib/saveLabelLib'
  return post(url, user)
}
// 删除标签
export function deleteLabelLib(id) {
  const url = '/yjk-operation/labelLib/deleteLabelById'
  return post(url, id)
}
// 等级权益  回显
export function getiRghtsList(user) {
  const url = '/yjk-operation/rights/getList'
  return get(url, user)
}

// 等级权益  提交
export function getiRghtsUpdate(user) {
  const url = '/yjk-operation/rights/update'
  return post(url, user)
}

// 任务奖励设置 列表展示
export function gettaskRewardConfigList(user) {
  const url = '/yjk-operation/taskRewardConfig/getList'
  return get(url, user)
}

// 任务奖励设置 状态更新
export function updateStatusById(user) {
  const url = '/yjk-operation/taskRewardConfig/updateStatusById'
  return post(url, user)
}

// 任务奖励设置 回显
export function getTaskRewardConfigById(user) {
  const url = '/yjk-operation/taskRewardConfig/getTaskRewardConfigById'
  return get(url, user)
}

// 任务奖励设置 提交数据
export function updateTaskRewardConfigById(user) {
  const url = '/yjk-operation/taskRewardConfig/updateTaskRewardConfigById'
  return post(url, user)
}

// 规则设置 兑换规则设置
export function systemParamsUpdate(list) {
  const url = '/yjk-operation/systemParams/update'
  const str = JSON.stringify(list)
  const strList = { 'list': str }
  return post(url, strList)
}

// 规则设置 兑换规则回显
export function systemParamsGetList(user) {
  const url = '/yjk-operation/systemParams/getList'
  return post(url, user)
}

// 会员登录日志
export function appLogingetList(user) {
  const url = '/yjk-operation/appLogin/getList'
  return get(url, user)
}
// 获取一线顾问会员数
export function getOneLineConsUserNumber(list) {
  const url = '/yjk-operation/appUser/getOneLineConsUserNumber'
  return post(url, list)
}
// 指定数量批量转会员资料
export function setManualBatchDistributionUser(list) {
  const url = '/yjk-operation/appUser/setManualBatchDistributionUser'
  return post(url, list)
}
// 根据会员账号或者手机查询会员
export function getMemberInfo(list) {
  const url = '/yjk-operation/appUser/getMemberInfo'
  return post(url, list)
}
// 单个会员手动分配一线顾问
export function setConsByMemberInfo(list) {
  const url = '/yjk-operation/appUser/setConsByMemberInfo'
  return post(url, list)
}
// 自助支付记录
export function getPaymentList(list) {
  const url = '/yjk-operation/appPaybillTrace/getList'
  return get(url, list)
}
// 导出数据
export function getExportInfo(list) {
  const url = '/yjk-operation/appPaybillTrace/exportInfo'
  return get(url, list)
}
// 支付收支记录
export function getPayList(list) {
  const url = '/yjk-operation/appPaybillTrace/getPayList'
  return get(url, list)
}

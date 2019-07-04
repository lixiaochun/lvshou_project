// 营销活动接口
import { get, post } from 'common/js/ajax'

// 获取营销活动接口
export function getMarketList(list) {
  const url = '/yjk-operation/marketCampaign/getList'
  return get(url, list)
}
// 添加营销活动
export function saveMarketList(list) {
  const url = '/yjk-operation/marketCampaign/saveMarketCampaign'
  return post(url, list)
}
// 更新状态
export function updateMarketCampaignIsOnline(list) {
  const url = '/yjk-operation/marketCampaign/updateMarketCampaignIsOnline'
  return post(url, list)
}
// 获取广告列表
export function getMarketAdvertiseList() {
  const url = '/yjk-operation/marketAdvertise/getList'
  return get(url)
}
// 新增广告
export function saveMarketAdvertise(list) {
  const url = '/yjk-operation/marketAdvertise/saveMarketAdvertise'
  return post(url, list)
}
// 更新广告位
export function updateMarketAdvertise(list) {
  const url = '/yjk-operation/marketAdvertise/updateMarketAdvertise'
  return post(url, list)
}
// 更新广告状态
export function updateMarketAdvertiseIsOnline(list) {
  const url = '/yjk-operation/marketAdvertise/updateMarketAdvertiseIsOnline'
  return post(url, list)
}
// 查询广告详情
export function getMarketAdvertiseById(list) {
  const url = '/yjk-operation/marketAdvertise/getMarketAdvertiseById'
  return get(url, list)
}
// 查询活动详情
export function getMarketCampaignById(id) {
  const url = '/yjk-operation/marketCampaign/getMarketCampaignById'
  return get(url, id)
}
// 更新活动
export function updateMarketCampaign(list) {
  const url = '/yjk-operation/marketCampaign/updateMarketCampaign'
  return post(url, list)
}
// 获取红包列表
export function getRedPacketActivityList(list) {
  const url = '/yjk-operation/redPacketActivity/getRedPacketActivityList'
  return get(url, list)
}
// 判断红包活动存在上线
export function redHasOnline() {
  const url = '/yjk-operation/redPacketActivity/redHasOnline'
  return get(url)
}
// 修改红包活动上下线状态
export function updateRedPacketActivitySate(list) {
  const url = '/yjk-operation/redPacketActivity/updateRedPacketActivitySate'
  return post(url, list)
}
// 添加红包活动
export function addRedPacketActivity(list) {
  const url = '/yjk-operation/redPacketActivity/addRedPacketActivity'
  return post(url, list)
}
// 根据id获取详情
export function getRedPacketActivityDetail(list) {
  const url = '/yjk-operation/redPacketActivity/getRedPacketActivityDetail'
  return get(url, list)
}
// 更新活动
export function editRedPacketActivity(list) {
  const url = '/yjk-operation/redPacketActivity/editRedPacketActivity'
  return post(url, list)
}
// 获取红包修改记录详情
export function getUpdateRedPacketActivityLog(list) {
  const url = '/yjk-operation/redPacketActivity/getUpdateRedPacketActivityLog'
  return get(url, list)
}
// Banner设置首页查询
export function getAppIndexBannerList(list) {
  const url = '/yjk-operation/appIndexBanner/getAppIndexBannerList'
  return post(url, list)
}
// 新增首页banner
export function saveAppIndexBannerInfo(list) {
  const url = '/yjk-operation/appIndexBanner/saveAppIndexBannerInfo'
  return post(url, list)
}
// 修改首页banner
export function updateAppIndexBannerInfo(list) {
  const url = '/yjk-operation/appIndexBanner/updateAppIndexBannerInfo'
  return post(url, list)
}
// 获取banner详细信息
export function getAppIndexBannerInfoById(list) {
  const url = '/yjk-operation/appIndexBanner/getAppIndexBannerInfoById'
  return post(url, list)
}
// 设置首页Banner上线下线状态
export function setAppIndexBannerOnline(list) {
  const url = '/yjk-operation/appIndexBanner/setAppIndexBannerOnline'
  return post(url, list)
}
// 获取首页Banner上线状态列表信息
export function getAppIndexBannerOnlieList(list) {
  const url = '/yjk-operation/appIndexBanner/getAppIndexBannerOnlieList'
  return post(url, list)
}
// 设置首页Banner上线数据顺序
export function setAppIndexBannerOnlieSort(list) {
  const url = '/yjk-operation/appIndexBanner/setAppIndexBannerOnlieSort'
  return post(url, list)
}

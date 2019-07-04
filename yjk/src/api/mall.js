import { get, post } from 'common/js/ajax'
// 商城概括
// 订单数据
export function getSalesOrderInfo(obj) {
  const url = '/yjk-operation/shopInfoSalesOrder/getSalesOrderInfo'
  return get(url, obj)
}

// 销售排行
export function getGoodsOrder(obj) {
  const url = '/yjk-operation/shopInfoSalesOrder/getGoodsOrder'
  return get(url, obj)
}

// 线性图表
export function getSalesOrderTotal(obj) {
  const url = '/yjk-operation/shopInfoSalesOrder/getSalesOrderTotal'
  return get(url, obj)
}

// 商城管理
// 商品分类列表接口
export function getGoodsCategoryList() {
  const url = '/yjk-operation/goodsCategory/getGoodsCategoryList'
  return get(url, {})
}

// 商品分类添加
export function saveBaseType(list) {
  const url = '/yjk-operation/goodsCategory/saveGoodsCategory'
  return post(url, list)
}

// 商品分类修改
export function upBaseType(list) {
  const url = '/yjk-operation/goodsCategory/updateGoodsCategoryById'
  return post(url, list)
}

// 分商品类删除接口
export function delBaseType(list) {
  const url = '/yjk-operation/goodsCategory/deleteGoodsCategoryById'
  return post(url, list)
}

// 商品管理页面
// 获取商品列表
export function getGoodsList(obj) {
  const url = '/yjk-operation/goods/getGoodsList'
  return get(url, obj)
}

// 更改商品状态
export function updateGoodsStata(list) {
  const url = '/yjk-operation/goods/updateGoodsStata'
  return post(url, list)
}

// 更改商品状态
export function updateBatch(list) {
  const url = '/yjk-operation/goods/updateBatch'
  return post(url, list)
}

// 更改商品状态
export function updateSku(list) {
  const url = '/yjk-operation/goods/updateSku'
  return post(url, list)
}

// 获取商品列表
export function getSku(obj) {
  const url = '/yjk-operation/goods/getSku'
  return get(url, obj)
}

// 获取关联商品列表
export function getGoods(obj) {
  const url = '/yjk-operation/goods/getGoods'
  return get(url, obj)
}

// 新增商品
export function saveGoods(list) {
  const url = '/yjk-operation/goods/saveGoods'
  return post(url, list)
}

// 编辑视频
export function updateGoodsById(list) {
  const url = '/yjk-operation/goods/updateGoodsById'
  return post(url, list)
}

// 单个商品详情
export function getGoodsById(obj) {
  const url = '/yjk-operation/goods/getGoodsById'
  return get(url, obj)
}

// 订单管理
// 订单查询列表
export function getOrderList(obj) {
  const url = '/yjk-operation/order/getOrderList'
  return post(url, obj)
}

// 订单明细
export function getOrderdetail(obj) {
  const url = '/yjk-operation/order/getOrderdetail'
  return post(url, obj)
}

// 订单商品信息(交易信息)
export function getGoodsByOrder(obj) {
  const url = '/yjk-operation/goods/getGoodsByOrder'
  return get(url, obj)
}

// 物流明细
export function getOrderLogistics(obj) {
  const url = '/yjk-operation/order/getOrderLogistics'
  return post(url, obj)
}
// 标品订单查询列表
export function getStandardOrderList(obj) {
  const url = '/yjk-operation/order/getStandardOrderList'
  return post(url, obj)
}
// 订单商品信息（详情）
export function getGoodsStandardByOrderList(obj) {
  const url = '/yjk-operation/goods/getGoodsStandardByOrderList'
  return get(url, obj)
}
// 魅力分兑换比例
// 更新魅力分兑换比例
export function getSystemParams(obj) {
  const url = '/yjk-operation/systemParams/getSystemParams'
  return get(url, obj)
}

// 更新魅力分兑换比例
export function updateSytemParams(list) {
  const url = '/yjk-operation/systemParams/updateSytemParams'
  return post(url, list)
}
// 提交商城上传备注
export function subOrderRemark(list) {
  const url = '/yjk-operation/order/subOrderRemark'
  return post(url, list)
}

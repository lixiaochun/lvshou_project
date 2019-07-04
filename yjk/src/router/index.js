import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('components/login/login') // 登录

// const Home = () => import('components/home/home') // 首页

const Slot = () => import('components/slot/slot') // 分发组件

// 内容管理
const contentList = () => import('components/content/content-list') // 文章管理
const addArticle = () => import('components/content/add-article') // 文章添加
const contentManage = () => import('components/content/content-manage') // 分类管理
const contentChuffling = () => import('components/content/content-chuffling') // 轮播设置
const contentChufflingAdd = () => import('components/content/content-chuffling-add')// 轮播编辑
const contentManageItem = () => import('components/content/content-manage-item') // 分类管理-修改
const contentEdit = () => import('components/content/content-edit') // 文章编辑
const preiew = () => import('components/content/content-preiew') // 文章预览
const columnManage = () => import('components/content/columnManage') // 栏目管理
const firstPage = () => import('components/content/firstPage')
// 内容管理->短视频管理
const VideoAdd = () => import('components/content/video-add') // 添加视频
const videoReleased = () => import('components/content/video-released') // 待发布
const videoList = () => import('components/content/video-list') // 视频列表
const videoManage = () => import('components/content/video-manage') // 视频分类
const videoManageItem = () => import('components/content/video-manage-item') // 添加分类

// 消息管理
const systemMessage = () => import('components/message/system-message') // 系统消息
const systemEdit = () => import('components/message/system-edit') // 系统编辑
const consultantEdit = () => import('components/message/system-consultant-edit') // 顾问端-编辑
const groupMessage = () => import('components/message/group-message') // 群发推送
const groupEdit = () => import('components/message/gronp-edit') // 新建群发
const groupAdd = () => import('components/message/gronp-add') // 群发列表
const unifiedMessage = () => import('components/message/unified-message') // 消息模板
const unifiedEdit = () => import('components/message/unified-Edit') // 消息模板
const systemBroadcast = () => import('components/message/system-broadcast') // 系统广播
const systemNotice = () => import('components/message/system-notice') // 系统通知
const systemNoticeEdit = () => import('components/message/system-notice-edit') // 编辑系统通知

// 会员
const memberList = () => import('components/member/member-list') // 会员列表
const memberInfo = () => import('components/member/member-info') // 会员详情
const memberEdit = () => import('components/member/member-edit') // 会员编辑
const tagManage = () => import('components/member/tag-manage') // 标签管理
const addManage = () => import('components/member/tag-manage-add') // 标签管理
const payment = () => import('components/member/payment') // 自助支付记录
const beanRecharge = () => import('components/member/bean-recharge') // 壹豆充值记录
const beanSpend = () => import('components/member/bean-spend') // 壹豆消费记录
const beanGift = () => import('components/member/bean-gift') // 赠送壹豆记录
const listenerData = () => import('components/member/listener-data') // 解忧师数据统计
const paymentRecord = () => import('components/member/payment-record')// 自助支付记录表
const tagClassification = () => import('components/member/tag-classification') // 标签分类
const memberTagAdd = () => import('components/member/tag-classification-add') // 添加标签分类
const levelSet = () => import('components/member/level-set') // 等级设置
const setEdit = () => import('components/member/level-set-edit') // 等级编辑
const levelInterests = () => import('components/member/level-interests') // 等级权益
// 会员->标品管理
const sampleAdd = () => import('components/member/sample-add') // 添加标品
const sampleReleased = () => import('components/member/sample-released') // 待发布
const sampleList = () => import('components/member/sample-list') // 已发布
//  会员->规则设置
const rewardSet = () => import('components/member/rules-reward-set') // 任务奖励设置
const rewardEdit = () => import('components/member/rules-reward-edit') // 商城-添加/编辑
const exchangeSet = () => import('components/member/rules-exchange-set') // 兑换规则设置
const dataDistribution = () => import('components/member/data-distribution') // 资料分配机制
const manDistribution = () => import('components/member/man-distribution') // 人工分配资料
const beanRules = () => import('components/member/bean-rules')
//  会员->日志管理
const loginLog = () => import('components/member/log-login-manage') // 会员登录管理

// 解忧师
const listenerFeeScale = () => import('components/listener/listener-fee-scale') // 服务收费标准设置
const listenerList = () => import('components/listener/listener-list') // 解忧师列表
const listenerListDetail = () => import('components/listener/listener-list-detail') // 解忧师列表详情
const listenerEnterAudit = () => import('components/listener/listener-enter-audit') // 解忧师入驻资料审核
const listenerLiteratureReviewList = () => import('components/listener/listener-literature-review-list') // 解忧师资料审核列表
const listenerLiteratureReviewListDetail = () => import('components/listener/listener-literature-review-list-detail') // 解忧师资料审核列表详情
const listenerDataAudit = () => import('components/listener/listener-data-audit') // 解忧师资料审核
const listenerDataAuditDetails = () => import('components/listener/listener-data-audit-details') // 解忧师资料审核详情
const componentTest = () => import('components/listener/listener-literature-review-list-test') // 解忧师资料审核详情
const listenerSalesOrder = () => import('components/listener/listener-sales-order') // 解忧师业务订单
const listenerSalesOrderDetails = () => import('components/listener/listener-sales-order-details') // 解忧师业务订单详情
const listenerServiceOrder = () => import('components/listener/listener-service-order') // 解忧师服务订单
const listenerPaymentsStatistics = () => import('components/listener/listener-payments-statistics') // 解忧师业务收支统计

//  商城
const summary = () => import('components/shop/mall-summary') // 概括
const goods = () => import('components/shop/mall-goods') // 商品管理
const Warning = () => import('components/shop/mall-goods-warning') // 商品预警
const Edit = () => import('components/shop/mall-goods-edit') // 添加/编辑
const classification = () => import('components/shop/mall-classification') // 商品分类
const classificationAdd = () => import('components/shop/mall-classification-add') // 商品分类
const order = () => import('components/shop/mall-order') // 订单管理
const Details = () => import('components/shop/mall-order-details') // 订单管理
const exchange = () => import('components/shop/mall-exchange') // 魅力分兑换比例
const single = () => import('components/shop/mall-single') // 建立售后单
const sampleOrder = () => import('components/shop/mall-sampleOrder') // 标品订单
const sampleOrderDetails = () => import('components/shop/mall-sampleOrder-detail') // 标品订单详情

// 聊天监管
const record = () => import('components/chat/chat-record') // 历史顾问聊天查询
const recordNow = () => import('components/chat/chat-record-now') // 当天顾问聊天查询
const sensitive = () => import('components/chat/chat-sensitive') // 敏感字过滤
const chatSummary = () => import('components/chat/chat-summary') // 聊天记录汇总
const sensitiveAdd = () => import('components/chat/chat-sensitive-add') // 添加敏感词

// 客服聊天监管
const customerRecord = () => import('components/customer/customer-record')

// 营销
const marketList = () => import('components/market/market-list') // 营销活动列表
const adsList = () => import('components/market/ads-list') // 广告活动列表
const redPacket = () => import('components/market/redPacket')// 红包
const banner = () => import('components/market/banner') // 首页banner

// 版块
const plate = () => import('components/plate/plateList') // 首页版块
const NotFound = () => import('components/not-found/not-found') // 404

// 顾问
const consultantList = () => import('components/consultant/consultant-list') // 顾问列表
const consultantAudit = () => import('components/consultant/consultant-audit') // 顾问资料审核
const consultantDetail = () => import('components/consultant/consultant-detail') // 顾问详情
export default new VueRouter({ /* eslint-disable-line no-undef */
  routes: [
    {
      path: '/',
      redirect: '/member/memberList'
    },
    {
      path: '/customerChat',
      component: Slot,
      children: [{
        path: 'record',
        component: customerRecord
      }, {
        path: 'sensitive',
        component: sensitive,
        children: [{
          path: 'add',
          component: sensitiveAdd
        }]
      }, {
        path: 'summary',
        component: chatSummary,
        children: []
      }, {
        path: 'recordNow',
        component: recordNow
      }]
    },
    {
      path: '/chat',
      component: Slot,
      children: [{
        path: 'record',
        component: record
      }, {
        path: 'sensitive',
        component: sensitive,
        children: [{
          path: 'add',
          component: sensitiveAdd
        }]
      }, {
        path: 'summary',
        component: chatSummary,
        children: []
      }, {
        path: 'recordNow',
        component: recordNow
      }]
    },
    {
      path: '/member/memberList',
      component: memberList,
      children: []
    }, {
      path: '/content',
      component: Slot,
      children: [{
        path: 'columnManage',
        component: columnManage
      }, {
        path: 'firstPage',
        component: firstPage
      }, {
        path: 'contentList',
        component: contentList,
        children: [{
          path: 'addarticle',
          component: addArticle
        }, {
          path: 'preiew',
          component: preiew
        }]
      }, {
        path: 'contentManage',
        component: contentManage,
        children: [{
          path: 'item',
          component: contentManageItem
        }]
      }, {
        path: 'chuffling',
        component: contentChuffling
      }, {
        path: 'chufflingAdd',
        component: contentChufflingAdd
      }, {
        path: 'contentEdit',
        component: contentEdit,
        meta: {
          keepLive: true
        },
        children: [{
          path: 'preiew',
          component: preiew
        }]
      }, {
        path: 'add',
        component: VideoAdd
      }, {
        path: 'released',
        component: videoReleased
      }, {
        path: 'list',
        component: videoList
      }, {
        path: 'videoManage',
        component: videoManage,
        children: [{
          path: 'item',
          component: videoManageItem
        }]
      }]
    },
    {
      path: '/shop',
      component: Slot,
      children: [{
        path: 'sampleOrder',
        component: sampleOrder,
        children: []
      }, {
        path: 'sampleDetails',
        component: sampleOrderDetails,
        children: []
      }, {
        path: 'summary',
        component: summary,
        children: []
      }, {
        path: 'goods',
        component: goods,
        children: [{
          path: 'warning',
          component: Warning,
          children: []
        }]
      }, {
        path: 'edit',
        component: Edit,
        children: []
      }, {
        path: 'classification',
        component: classification,
        children: [{
          path: 'add',
          component: classificationAdd,
          children: []
        }]
      }, {
        path: 'order',
        component: order,
        children: []
      }, {
        path: 'details',
        component: Details,
        children: []
      }, {
        path: 'exchange',
        component: exchange,
        children: []
      }, {
        path: 'single',
        component: single,
        children: []
      }]
    },
    {
      path: '/plate',
      component: Slot,
      children: [{
        path: 'plateList',
        component: plate
      }]
    },
    {
      path: '/report',
      component: Slot,
      children: [{
        path: 'payment',
        component: payment
      }, {
        path: 'paymentRecord',
        component: paymentRecord
      }]
    },
    {
      path: '/market',
      component: Slot,
      children: [{
        path: 'marketList',
        component: marketList
      }, {
        path: 'adsList',
        component: adsList
      }, {
        path: 'redPacket',
        component: redPacket
      }, {
        path: 'banner',
        component: banner
      }]
    },
    {
      path: '/message',
      component: Slot,
      children: [{
        path: 'systemMessage',
        component: systemMessage
      }, {
        path: 'edit',
        component: systemEdit
      }, {
        path: 'consultantEdit',
        component: consultantEdit
      }, {
        path: 'groupMessage',
        component: groupMessage,
        children: []
      }, {
        path: 'groupEdit',
        component: groupEdit,
        children: []
      }, {
        path: 'groupAdd',
        component: groupAdd,
        children: []
      }, {
        path: 'unifiedMessage',
        component: unifiedMessage,
        children: []
      }, {
        path: 'unifiededit',
        component: unifiedEdit,
        children: []
      }, {
        path: 'systemBroadcast',
        component: systemBroadcast,
        children: []
      }, {
        path: 'systemNotice',
        component: systemNotice,
        children: []
      }, {
        path: 'systemNoticeEdit',
        component: systemNoticeEdit,
        children: []
      }]
    },
    {
      path: '/login',
      component: Login,
      children: []
    },
    {
      path: '/member',
      component: Slot,
      children: [{
        path: 'memberList',
        component: memberList
      }, {
        path: 'memberInfo',
        component: memberInfo
      }, {
        path: 'memberEdit',
        component: memberEdit
      }, {
        path: 'tagManage',
        component: tagManage,
        children: [{
          path: 'add',
          component: addManage
        }]
      }, {
        path: 'tagClassification',
        component: tagClassification,
        children: [{
          path: 'add',
          component: memberTagAdd
        }]
      }, {
        path: 'sampleList',
        component: sampleList
      }, {
        path: 'sampleReleased',
        component: sampleReleased
      }, {
        path: 'sampleAdd',
        component: sampleAdd
      }, {
        path: 'levelSet',
        component: levelSet
      }, {
        path: 'setEdit',
        component: setEdit
      }, {
        path: 'levelInterests',
        component: levelInterests
      }, {
        path: 'payment',
        component: payment
      }, {
        path: 'paymentRecord',
        component: paymentRecord
      }, {
        path: 'rewardSet',
        component: rewardSet,
        children: [{
          path: 'edit',
          component: rewardEdit
        }]
      }, {
        path: 'exchangeSet',
        component: exchangeSet
      }, {
        path: 'dataDistribution',
        component: dataDistribution
      }, {
        path: 'manDistribution',
        component: manDistribution
      }, {
        path: 'beanRules',
        component: beanRules
      }, {
        path: 'loginLog',
        component: loginLog
      }, {
        path: 'beanSpend',
        component: beanSpend
      }, {
        path: 'beanGift',
        component: beanGift
      }, {
        path: 'beanRecharge',
        component: beanRecharge
      }, {
        path: 'listenerData',
        component: listenerData
      }]
    },
    {
      path: '/listener',
      component: Slot,
      children: [{
        path: 'listenerFeeScale',
        component: listenerFeeScale
      }, {
        path: 'listenerList',
        component: listenerList
      }, {
        path: 'listenerListDetail',
        component: listenerListDetail
      }, {
        path: 'listenerEnterAudit',
        component: listenerEnterAudit
      }, {
        path: 'listenerLiteratureReviewList',
        component: listenerLiteratureReviewList
      }, {
        path: 'listenerLiteratureReviewListDetail',
        component: listenerLiteratureReviewListDetail
      }, {
        path: 'listenerDataAudit',
        component: listenerDataAudit
      }, {
        path: 'listenerDataAuditDetails',
        component: listenerDataAuditDetails
      }, {
        path: 'componentTest',
        component: componentTest
      }, {
        path: 'listenerSalesOrder',
        component: listenerSalesOrder
      }, {
        path: 'listenerSalesOrderDetails',
        component: listenerSalesOrderDetails
      }, {
        path: 'listenerServiceOrder',
        component: listenerServiceOrder
      }, {
        path: 'listenerPaymentsStatistics',
        component: listenerPaymentsStatistics
      }]
    },
    {
      path: '/consultant',
      component: Slot,
      children: [{
        path: 'consultantList',
        component: consultantList
      }, {
        path: 'consultantAudit',
        component: consultantAudit
      }, {
        path: 'consultantDetail',
        component: consultantDetail
      }]
    },
    {
      path: '/404',
      component: NotFound,
      children: []
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

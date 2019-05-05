import Vue from 'vue'
import Router from 'vue-router'

// const Hello = resolve => require(['@/components/Hello'],resolve)
// import Hello from '@/components/Hello'

// 使得项目可以拆分成若干个 js 小包，和一个略大的 vendor，运行时按需去加载
// https://mmxiaowu.com/article/5848239bd4352863efb55469

// const test = resolve => require(['@/components/getVote'], resolve)
const test568109135 = r => require.ensure([], () => r(require('@/components/Hello.vue')), 'test568109135')


// const achieve = resolve => require(['@/pages/achieve'], resolve)
import achieve from '@/pages/achieve'

// const shopDetail = resolve => require(['@/pages/shopDetail'], resolve)
import shopDetail from '@/pages/shopDetail'

// const newShopDetail = resolve => require(['@/pages/newShopDetail'], resolve)
import newShopDetail from '@/pages/newShopDetail'
// const newShopDetail = resolve => require(['@/pages/newShopDetail'], resolve)
import newShopDetail2 from '@/pages/newShopDetail2'
import test from '@/pages/test'


// const dynamicInfo = resolve => require(['@/pages/dynamicInfo'], resolve)
import dynamicInfo from '@/pages/dynamicInfo'

// const commentChild = resolve => require(['@/pages/commentChild'], resolve)
import commentChild from '@/pages/commentChild'

// const dynamic = resolve => require(['@/pages/dynamic'], resolve)
import dynamic from '@/pages/dynamic'
// const dynamic = resolve => require(['@/pages/newDynamic'], resolve)
import newDynamic from '@/pages/newDynamic'

// const reward = resolve => require(['@/pages/reward'], resolve)
import reward from '@/pages/reward'

// const msgDetail = resolve => require(['@/pages/msgDetail'], resolve)
import msgDetail from '@/pages/msgDetail'

// const welfareRule = resolve => require(['@/pages/welfareRule'], resolve)
import welfareRule from '@/pages/welfareRule'

// const communityProtocol = resolve => require(['@/pages/communityProtocol'], resolve)
import communityProtocol from '@/pages/communityProtocol'

// const healthyData = resolve => require(['@/pages/healthyData'], resolve)
import healthyData from '@/pages/healthyData'

// const geneMsg = resolve => require(['@/pages/geneMsg'], resolve)
import geneMsg from '@/pages/geneMsg'

// const userSign = resolve => require(['@/pages/userSign'], resolve)
import userSign from '@/pages/userSign'

// const geneDetail = resolve => require(['@/pages/geneDetail'], resolve)
import geneDetail from '@/pages/geneDetail'

// const signUpProtocol = resolve => require(['@/pages/signUpProtocol'], resolve)
import signUpProtocol from '@/pages/signUpProtocol'

import signUpPage from '@/pages/signUpPage'
import signUpPageAct from '@/pages/signUpPageAct'
import signUpSuccess from '@/pages/signUpSuccess'
import signUpFail from '@/pages/signUpFail'
import Fail1 from '@/pages/signUpFail1'
import Fail2 from '@/pages/signUpFail2'


// const feed = resolve => require(['@/pages/feedBack'], resolve)
import feed from '@/pages/feedBack'

// const feedBack = resolve => require(['@/pages/myFeedBack'], resolve)
import feedBack from '@/pages/myFeedBack'

// const dailyTask = resolve => require(['@/pages/dailyTask'], resolve)
import dailyTask from '@/pages/dailyTask'

// const articleDetail = resolve => require(['@/pages/articleDetail'], resolve)
import articleDetail from '@/pages/articleDetail'

import demoDetail from '@/pages/demoDetail'

// const videoSpecial = resolve => require(['@/pages/videoSpecial'], resolve)
import videoSpecial from '@/pages/videoSpecial'

// const faqList = resolve => require(['@/pages/faqList'], resolve)
import faqList from '@/pages/faqList'

// const runReady = resolve => require(['@/pages/runReady'], resolve)
import runReady from '@/pages/runReady'

import runningShoes from '@/pages/runningShoes'

// const sportsLessonDetail = resolve => require(['@/pages/sportsLessonDetail'], resolve)
import sportsLessonDetail from '@/pages/sportsLessonDetail'

import newSportsLessonDetail from '@/pages/newSportsLessonDetail'


// const sportsLessonGraphic = resolve => require(['@/pages/sportsLessonGraphic'], resolve)
import sportsLessonGraphic from '@/pages/sportsLessonGraphic'

import bodyTest from '@/pages/bodyTest'
import bodyTestReport from '@/pages/bodyTestReport'

// 静态页面
// const staticPageMeilijia = resolve => require(['@/pages/staticPageMeilijia'], resolve)
import staticPageMeilijia from '@/pages/staticPageMeilijia'

// const staticPageJianfei = resolve => require(['@/pages/staticPageJianfei'], resolve)
import staticPageJianfei from '@/pages/staticPageJianfei'

// const taskPrize = resolve => require(['@/pages/taskPrize'], resolve)
import taskPrize from '@/pages/taskPrize'

// const integralRule = resolve => require(['@/pages/integralRule'], resolve)
import integralRule from '@/pages/integralRule'

// const integralRule = resolve => require(['@/pages/integralRule'], resolve)
import invitation from '@/pages/invitation'
import solution from '@/pages/solution'

import outSign from '@/pages/outSign'
import outSignResult from '@/pages/outSignResult'

import lvshouRoute from "./lvshou"

import geneReport from '@/pages/geneReport'
import geneReportDetail from '@/pages/geneReportDetail'
import personalHome from '@/pages/personalHome'
import diaryDetail from '@/pages/diaryDetail'

//检测报告
import detectedReport from '@/pages/report/detectedReport'
import explainReport from '@/pages/report/explainReport'
import itemReport from '@/pages/report/itemReport'
import stateReport from '@/pages/report/stateReport'

import enjoyBeauty from '@/pages/enjoyBeauty'

import _membershipRules from '@/pages/ruleDesc/membershipRules/index1.vue'
import _grilMsg from '@/pages/gene/grilMsg.vue'
import _showMsg from '@/pages/gene/showMsg.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "/hxsweb/",
  routes: [
    lvshouRoute,
    // 会员规则说明
    {
      path: '/membershipRules',
      name: 'membershipRules',
      component: _membershipRules
    },

    // 基因检测填写信息
    {
      path: '/grilMsg',
      name: 'grilMsg',
      component: _grilMsg
    },

    // 基因检测知情同意书
    {
      path: '/showMsg',
      name: 'showMsg',
      component: _showMsg
    },

    //我的成就
    {
      path: '/achieve',
      name: 'achieve',
      component: achieve
    },
    //商品详情页
    {
      path: '/shopDetail/:id',
      name: 'shopDetail',
      component: shopDetail
    },
    //商品详情页
    {
      path: '/newShopDetail/:id',
      name: 'newShopDetail',
      component: newShopDetail
    },
    // 绿豆商城商品详情页
    {
      path: '/newShopDetail2/:id',
      name: 'newShopDetail2',
      component: newShopDetail2
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    //反馈意见页
    {
      path: '/feed',
      name: 'feed',
      component: feed
    },
    //我的反馈意见页
    {
      path: '/feedBack',
      name: 'feedBack',
      component: feedBack
    },
    //个人主页
    {
      path: '/dynamic/:id',
      name: 'dynamic',
      component: dynamic
    },
    //新版个人主页（3.2.0）
    {
      path: '/newDynamic/:id',
      name: 'newDynamic',
      component: newDynamic
    },
    //动态详情页面
    {
      path: '/dynamicInfo/:id',
      name: 'dynamicInfo',
      component: dynamicInfo
    },
    //打赏页面
    {
      path: '/reward/:articleId',
      name: 'reward',
      component: reward
    },
    //每日任务－发记
    {
      path: '/dailyTask',
      name: 'dailyTask',
      component: dailyTask
    },
    //奖品细则/我的福利－发记
    {
      // localhost:8082/hxsweb/welfareRule/1416?sess_token=493e848de56901c996971d1782a25daba12148c8&utime=1502784699&sign=ZDFhMzJkNGY2OTc1NTFmNTQ1ZDBmMWE4NDI0YTc3MTE=
      path: '/welfareRule/:id',
      name: 'welfareRule',
      component: welfareRule
    },
    //积分规则
    {
      path: '/integralRule',
      name: 'integralRule',
      component: integralRule
    },
    //每日任务分享中奖图片
    {
      path: '/taskPrize/:name/:prizeName/:headImg/:prizeImg',
      name: 'taskPrize',
      component: taskPrize
    },
    //消息详情
    {
      path: '/msgDetail/:msgId',
      name: 'msgDetail',
      component: msgDetail
    },
    {
      //社区协议
      path: '/communityProtocol',
      name: 'communityProtocol',
      component: communityProtocol
    },
    //注册好享瘦页面
    {
      path: '/signUpPage',
      name: 'signUpPage',
      component: signUpPage
    },
    //注册好享瘦页面
    {
      path: '/signUpPageAct',
      name: 'signUpPageAct',
      component: signUpPageAct
    },

    {
      path: '/geneProgress',
      component: r => require.ensure([], () => r(require(`@/pages/geneProgress.vue`)), 'geneProgress')
    },


    //注册成功页面
    {
      path: '/signUpSuccess',
      name: 'signUpSuccess',
      component: signUpSuccess
    },

    // {
    //     path: '/signUpFail',
    //     name: 'signUpFail',
    //     component: signUpFail,
    //     children: [
    //       {
    //         path: 'signUpFail1',
    //         name: 'signUpFail1',
    //         component: Fail1
    //       },
    //       {
    //         path: 'signUpFail2',
    //         name: 'signUpFail2',
    //         component: Fail2
    //       }
    //     ]
    // },

    //注册协议页面
    {
      path: '/signUpProtocol',
      name: 'signUpProtocol',
      component: signUpProtocol
    },
    { //邀请码页面
      path: '/invitation/:userId',
      name: 'invitation',
      // 覆盖到站外注册页
      component: outSign
    },
    //站外注册页面
    // {
    //     path: '/outSign/:userId',
    //     name: 'outSign',
    //     component: outSign
    // },
    { //站外注册成功页面
      path: '/outSignResult/:userId',
      name: 'outSignResult',
      component: outSignResult
    },
    //全部评论回复页面（文章类型/文章id，父级评论id）
    {
      path: '/commentChild/:type/:data_id/:parent_comment_id',
      name: 'commentChild',
      component: commentChild
    },
    // 测试组件的demo页面，上线之前会干掉的，去掉这个路由的
    {
      path: '/test568109135',
      name: 'test568109135',
      component: test568109135
    },

    // 文章资讯详情 包含app推广使用的页面路有，使用query参数 appExtend >= 0 来区分推广的业务
    {
      path: '/articleDetail/:article_id',
      name: 'articleDetail',
      component: articleDetail
    },

    // 案例详情
    {
      path: '/demoDetail/:demo_id',
      name: 'demoDetail',
      component: demoDetail
    },


    // 视频专题详情 参数是栏目id
    {
      path: '/videoSpecial/:type_id',
      name: 'videoSpecial',
      component: videoSpecial
    },

    // 新的训练运动课程详情 这里是参事sport_id
    {
      path: '/newSportsLessonDetail/:sport_id',
      name: 'newSportsLessonDetail',
      component: newSportsLessonDetail
    },

    // 运动课程详情（ 慢慢废弃）
    {
      path: '/sportsLessonDetail/:scheme_id/:plan_id/:course_id',
      name: 'sportsLessonDetail',
      component: sportsLessonDetail
    },
    // 运动图解详情（ 慢慢废弃）
    {
      path: '/sportsLessonGraphic/:scheme_id/:plan_id/:course_id',
      name: 'sportsLessonGraphic',
      component: sportsLessonGraphic
    },

    // 常用问题列表
    {
      path: '/faqList',
      name: 'faqList',
      component: faqList
    },
    // 身体数据报告－转发act下的业务－小琴
    {
      path: "/healthyData/:report_id",
      name: "healthyData",
      component: healthyData
    },
    // 静态页面－美丽家会员
    {
      path: '/staticPageMeilijia',
      name: 'staticPageMeilijia',
      component: staticPageMeilijia
    },
    // 静态页面－减肥训练营会员
    {
      path: '/staticPageJianfei',
      name: 'staticPageJianfei',
      component: staticPageJianfei
    },
    // 基因检测同意书  geneMsg－阿祖
    {
      path: '/geneMsg',
      name: 'geneMsg',
      component: geneMsg
    },
    //3.9.0 基因检测报告
    {
      path: '/detectedReport',
      name: 'detectedReport',
      // component: () => import('@/pages/geneReport')
      component: detectedReport
    },
    {
      path: '/explainReport',
      name: 'explainReport',
      // component: () => import('@/pages/geneReport')
      component: explainReport
    },
    {
      path: '/stateReport',
      name: 'stateReport',
      // component: () => import('@/pages/geneReport')
      component: stateReport
    },
    {
      path: '/itemReport',
      name: 'itemReport',
      // component: () => import('@/pages/geneReport')
      component: itemReport
    },
    
    // 3.2.6 基因检测报告
    {
      path: '/geneReport',
      name: 'geneReport',
      // component: () => import('@/pages/geneReport')
      component: geneReport
    },
    {
      path: '/geneReportDetail',
      name: 'geneReportDetail',
      // component: () => import('@/pages/geneReportDetail')
      component: geneReportDetail
    },
    // 常用问题列表
    {
      path: '/faqList',
      name: 'faqList',
      component: faqList
    },
    // 常用问题列表
    {
      path: '/runReady',
      name: 'runReady',
      component: runReady
    },
    // 跑机帮助页
    {
      path: '/runningShoes',
      name: 'runningShoes',
      component: runningShoes
    },
    // 身体数据报告－转发act下的业务－小琴
    {
      path: "/healthyData/:report_id",
      name: "healthyData",
      component: healthyData
    },
    // 静态页面－美丽家会员
    {
      path: '/staticPageMeilijia',
      name: 'staticPageMeilijia',
      component: staticPageMeilijia
    },
    // 静态页面－减肥训练营会员
    {
      path: '/staticPageJianfei',
      name: 'staticPageJianfei',
      component: staticPageJianfei
    },
    // 基因检测同意书  geneMsg－阿祖
    {
      path: '/geneMsg',
      name: 'geneMsg',
      component: geneMsg
    },
    // 3.2.6 基因检测报告
    {
      path: '/geneReport',
      name: 'geneReport',
      // component: () => import('@/pages/geneReport')
      component: geneReport
    },
    {
      path: '/geneReportDetail',
      name: 'geneReportDetail',
      // component: () => import('@/pages/geneReportDetail')
      component: geneReportDetail
    },

    // 签到 sign－阿祖
    {
      path: '/sign',
      name: 'sign',
      component: userSign
    },
    // 身体检测
    {
      path: '/bodyTest',
      name: 'bodyTest',
      component: bodyTest
    },

    // 身体检测报告 参数:报告id
    {
      path: '/bodyTestReport/:report_id',
      name: 'bodyTestReport',
      component: bodyTestReport
    },
    // 基因检测的正常/异常页面 geneDetail
    {
      path: '/geneDetail',
      name: 'geneDetail',
      component: geneDetail
    },
    // 新版个人主页
    {
      path: '/personalHome/:id',
      name: 'personalHome',
      component: personalHome
    },
    // 日记详情
    {
      path: '/diaryDetail/:id',
      name: 'diaryDetail',
      component: diaryDetail
    },
    // 享受美吧
    {
      path: '/enjoyBeauty',
      name: 'enjoyBeauty',
      component: enjoyBeauty
    },
    // 解决方案
    {
      path: '/solution',
      name: 'solution',
      component: solution
    }

  ]
})

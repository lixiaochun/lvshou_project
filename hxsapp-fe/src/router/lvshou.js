// import orderList from '@/pages/lvshou/orderList'
// import orderDetail from '@/pages/lvshou/orderDetail'

import personalCenter from '@/pages/lvshou/personalCenter'
import newPersonalCenter from '@/pages/lvshou/newPersonalCenter'
import vipClub from '@/pages/lvshou/vipClub'
import declaration from '@/pages/lvshou/declaration'
import consult from '@/pages/lvshou/consult'
import securityCheck from '@/pages/lvshou/securityCheck'
import healthyEvaluation from '@/pages/lvshou/healthyEvaluation'
import healthyEvaluationReport from '@/pages/lvshou/healthyEvaluationReport'
import healthyPackageInfo from '@/pages/lvshou/healthyPackageInfo'

import dietPlan from '@/pages/lvshou/dietPlan'
import dietPlanDetail from '@/pages/lvshou/dietPlanDetail'
import sportsPlan from '@/pages/lvshou/sportsPlan'
import editPersonalInfo from '@/pages/lvshou/editPersonalInfo'
import measureTip from '@/pages/lvshou/measureTip'

// import assess from '@/pages/lvshou/assess'


const test568109135 = r => require.ensure([], () => r(require('@/components/Hello.vue')), 'test568109135')
import bodyTest from '@/pages/bodyTest'

// 绿瘦会员路由开始－－－－
var route = { 
  path: '/lvshou/', 
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    {
      path: '',
      redirect: "vipClub"
    },
    // {
    //   path: 'index',
    //   name:'index',
    //   component: index
    // },
    // 全部订单列表页面
    // {
    //   path: 'orderList',
    //   name:"lvshouOrderList",
    //   component: orderList
    // },
    // 订单详情页面
    // {
    //   path: 'orderDetail/:orderNo',
    //   name:'lvshouOrderDetail',
    //   component: orderDetail
    // },
    
    // 健康评测页面
    {
      path: 'healthyEvaluation/:question_id',
      name:"healthyEvaluation",
      component: healthyEvaluation
    },
    // 健康评测报告页面
    {
      path: 'healthyEvaluationReport',
      name:"healthyEvaluationReport",
      component: healthyEvaluationReport
    },
    // 健康套餐介绍页面
    {
      path: 'healthyPackageInfo',
      name:"healthyPackageInfo",
      component: healthyPackageInfo
    },
    
    // 饮食计划页面
    {
      path: 'dietPlan',
      name:"dietPlan",
      component: dietPlan
    },
    // 饮食计划详情页面
    {
      path: 'dietPlanDetail/:recipes_id/:recipes_date/:recipes_eat_type',
      name:"dietPlanDetail",
      component: dietPlanDetail
    },
    // 运动计划页面
    {
      path: 'sportsPlan',
      name:"sportsPlan",
      component: sportsPlan
    },
      
    // 个人中心页面
    {
      path: 'personalCenter',
      name:"personalCenter",
      component: personalCenter
    },
      
    // 新版个人中心页面（2.0版本）
    {
      path: 'newPersonalCenter',
      name:"newPersonalCenter",
      component: newPersonalCenter
    },
    // 会员俱乐部页面
    {
      path: 'vipClub',
      name:"vipClub",
      component: vipClub
    },
    // 编辑个人信息
    {
      path: 'editPersonalInfo',
      name:"editPersonalInfo",
      component: editPersonalInfo
    },
    // 测量贴士
    {
      path: 'measureTip',
      name:"measureTip",
      component: measureTip
    },

    // 协议及及声明页面
    {
      path: 'declaration',
      name:"declaration",
      component: declaration
    },
    // 协议及及声明页面
    {
      path: 'consult',
      name:"consult",
      component: consult
    },
    // 防伪查询
    {
      path: 'securityCheck',
      name:"securityCheck",
      component: securityCheck
    }
    // 错误页面的处理
    // {
    //   path: '*',
    //   redirect: "vipClub"
    // }
  ]
}
// 绿瘦会员路由结束－－－－

export default route;


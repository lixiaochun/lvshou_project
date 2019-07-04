<template>
  <div id="app">
  <el-menu mode="horizontal" class="app-header"
      :default-active="menuPath"
      background-color="#474c59"
      @select="selectNav"
      text-color="#fff">
    <el-menu-item  v-for="nav in menuNavs" :index="nav.path" :key="nav.path" v-show="nav.show">
      {{nav.name}}
    </el-menu-item>
    <div class="outLogin">
       <span class="admin">
          <img src="../src/static/people.png">
       </span>
       <span style="float: right" @click="outLogin">
          退出登录
        </span>
    </div>

  </el-menu>
  <div class="app-sideBar">
    <el-menu
      router
      :default-active="$route.path"
      :default-openeds="openeds"
      background-color="#f2f2f2"
      text-color="#6A686B"
      active-text-color="#4897f9">
      <!--如果是-->
      <template v-for="items in submenuNavs">
        <template v-if="items.item">
          <el-submenu
            class="app-sideBar-submenu"
            :key="items.name"
            :index="items.name"
          >
              <template slot="title">{{items.name}}</template>
              <el-menu-item v-for="(n,i) in items.item" :index="n.path" :key="i" class="">
                {{n.name}}
              </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="items.path" class="" :key="items.name">
            {{items.name}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
  <section class="app-content">
      <router-view :key="$route.path"></router-view>
  </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { menu, MenuItem, Submenu } from 'element-ui'
import { mapActions } from 'vuex'
const homeNavs1 = [{
  name: '会员',
  path: '/member',
  item: [
    { name: '会员列表', path: '/member/memberList' },
    { name: '标签管理', path: '/member/tagManage' },
    // {name: '标签分类', path: '/member/tagClassification'},
    { name: '等级设置', path: '/member/levelSet' },
    { name: '等级权益', path: '/member/levelInterests' },
    { name: '自助支付记录表', path: '/member/paymentRecord' },
    { name: '自助支付收支表', path: '/member/payment' },
    { name: '壹豆充值记录', path: '/member/beanRecharge' },
    { name: '壹豆消费记录', path: '/member/beanSpend' },
    { name: '赠送壹豆记录', path: '/member/beanGift' },
    { name: '解忧师通话数据统计', path: '/member/listenerData' }
  ]
},
{
  name: '标品管理',
  path: '/member',
  item: [
    { name: '已发布', path: '/member/sampleList' },
    { name: '待审核', path: '/member/sampleReleased' }
  ]
},
{
  name: '规则设置',
  path: '/member',
  item: [
    { name: '任务奖励设置', path: '/member/rewardset' },
    { name: '兑换规则设置', path: '/member/exchangeSet' },
    // {name: '资料分配机制', path: '/member/dataDistribution'},
    { name: '人工分配资料', path: '/member/manDistribution' },
    { name: '赠送壹豆规则', path: '/member/beanRules' }
  ]
}, {
  name: '日志管理',
  path: 'member',
  item: [
    { name: '会员登录日志', path: '/member/loginLog' }
  ]
}]
const homeNavs2 = [{
  name: '聊天监管',
  path: '/chat',
  item: [
    { name: '顾问聊天汇总', path: '/chat/summary' },
    { name: '历史聊天记录查询', path: '/chat/record' },
    { name: '当天聊天记录查询', path: '/chat/recordNow' },
    { name: '敏感字过滤', path: '/chat/sensitive' }
  ]
}]
const homeNavs3 = [{
  name: '客服聊天监管',
  path: '/customerChat',
  item: [
    { name: '聊天记录查询', path: '/customerChat/record' }
  ]
}]
const homeNavs4 = [{
  name: '财务报表',
  path: '/report',
  item: [
    { name: '自助支付收支表', path: '/report/payment' },
    { name: '自助支付记录表', path: '/report/paymentRecord' }
  ]
}]
const memberNavs = [{
  name: '会员',
  path: '/member/memberList',
  item: [
    { name: '会员列表', path: '/member/memberList' },
    { name: '标签管理', path: '/member/tagManage' },
    // {name: '标签分类', path: '/member/tagClassification'},
    { name: '等级设置', path: '/member/levelSet' },
    { name: '等级权益', path: '/member/levelInterests' },
    { name: '自助支付记录表', path: '/member/paymentRecord' },
    { name: '自助支付收支表', path: '/member/payment' },
    { name: '壹豆充值记录', path: '/member/beanRecharge' },
    { name: '壹豆消费记录', path: '/member/beanSpend' },
    { name: '赠送壹豆记录', path: '/member/beanGift' },
    { name: '解忧师通话数据统计', path: '/member/listenerData' }
  ]
},
{
  name: '标品管理',
  path: '/member',
  item: [
    { name: '已发布', path: '/member/sampleList' },
    { name: '待审核', path: '/member/sampleReleased' }
  ]
},
{
  name: '规则设置',
  path: '/member',
  item: [
    { name: '任务奖励设置', path: '/member/rewardset' },
    { name: '兑换规则设置', path: '/member/exchangeSet' },
    // {name: '资料分配机制', path: '/member/dataDistribution'},
    { name: '人工分配资料', path: '/member/manDistribution' },
    { name: '赠送壹豆规则', path: '/member/beanRules' }
  ]
}, {
  name: '日志管理',
  path: 'member',
  item: [
    { name: '会员登录日志', path: '/member/loginLog' }
  ]
}]
const messageNavs = [{
  name: '消息管理',
  path: '/message',
  item: [
    { name: '系统消息', path: '/message/systemMessage' },
    { name: '群发消息', path: '/message/groupMessage' },
    { name: '消息模板', path: '/message/unifiedMessage' },
    { name: '系统广播', path: '/message/systemBroadcast' },
    { name: '系统通知', path: '/message/systemNotice' }
  ]
}]
const shopNavs = [{
  name: '商城概况',
  path: '/shop/summary'
}, {
  name: '商品管理',
  path: '/shop',
  item: [
    { name: '商品列表', path: '/shop/goods' },
    { name: '商品分类', path: '/shop/classification' }
  ]
}, {
  name: '订单管理',
  path: '/shop/summary',
  item: [
    { name: '商城订单', path: '/shop/order' },
    { name: '标品订单', path: '/shop/sampleOrder' }
  ]
}, {
  name: '魅力分金钱比例',
  path: '/shop/exchange'
}]
const contentNavs = [{
  name: '内容管理',
  path: '/content',
  item: [
    { name: '栏目管理', path: '/content/columnManage' },
    { name: '首页内容', path: '/content/firstPage' },
    { name: '文章列表', path: '/content/contentList' },
    { name: '分类管理', path: '/content/contentManage' },
    { name: '轮播设置', path: '/content/chuffling' }
  ]
}, {
  name: '短视频管理',
  item: [
    { name: '添加视频', path: '/content/add' },
    { name: '待发布', path: '/content/released' },
    { name: '视频列表', path: '/content/list' },
    { name: '视频分类', path: '/content/videoManage' }
  ]
}]
const marketNavs = [{
  name: '营销',
  path: '/market',
  item: [
    { name: '营销活动列表', path: '/market/marketList' },
    { name: '广告列表', path: '/market/adsList' },
    { name: '红包管理', path: '/market/redPacket' },
    { name: '首页Banner设置', path: '/market/banner' }
  ]
}]
const chatNavs = [{
  name: '聊天监管',
  path: '/chat',
  item: [
    { name: '顾问聊天汇总', path: '/chat/summary' },
    { name: '历史聊天记录查询', path: '/chat/record' },
    { name: '当天聊天记录查询', path: '/chat/recordNow' },
    { name: '敏感字过滤', path: '/chat/sensitive' }
  ]
}]
const customerChatNavs = [{
  name: '客服聊天监管',
  path: '/customerChat',
  item: [
    { name: '聊天记录查询', path: '/customerChat/record' }
  ]
}]
const FinancialReport = [{
  name: '财务报表',
  path: '/report',
  item: [
    { name: '自助支付收支表', path: '/report/payment' },
    { name: '自助支付记录表', path: '/report/paymentRecord' }
  ]
}]
const plate = [{
  name: '版块',
  path: '/plate',
  item: [
    { name: '首页版块', path: '/plate/plateList' }
  ]
}]
// ,
//     {name: '解忧师资料审核', path: '/listener/listenerDataAudit'}
const listener = [{
  name: '解忧师业务',
  path: '/listener',
  item: [
    { name: '服务收费标准设置', path: '/listener/listenerFeeScale' },
    { name: '解忧师列表', path: '/listener/listenerList' },
    { name: '解忧师入驻审核列表', path: '/listener/listenerEnterAudit' },
    { name: '解忧师资料审核列表', path: '/listener/listenerLiteratureReviewList' }
    // { name: '組件测试', path: '/listener/componentTest' }    ---可删，只作为测试组件使用
  ] }, {
  name: '订单管理',
  path: '/listener',
  item: [
    { name: '解忧师业务订单', path: '/listener/listenerSalesOrder' },
    { name: '解忧师服务订单', path: '/listener/listenerServiceOrder' },
    { name: '解忧师业务收支统计', path: '/listener/listenerPaymentsStatistics' }
  ]
}]

const consultant = [{
  name: '顾问业务',
  path: '/consultant',
  item: [
    { name: '顾问列表', path: '/consultant/consultantList' },
    { name: '顾问资料审核', path: '/consultant/consultantAudit' }
  ]
}]
const menuNavs1 = [
//  {
//    name: '首页',
//    path: '/home',
//    submenuNavs: homeNavs
//  },
  {
    name: '会员',
    path: '/member/memberList',
    show: true,
    submenuNavs: memberNavs
  },
  {
    name: '消息管理',
    path: '/message',
    show: true,
    submenuNavs: messageNavs
  },
  {
    name: '商城',
    path: '/shop',
    show: true,
    submenuNavs: shopNavs
  },
  {
    name: '内容管理',
    path: '/content',
    show: true,
    submenuNavs: contentNavs
  }, {
    name: '营销',
    path: '/market',
    show: true,
    submenuNavs: marketNavs
  }, {
    name: '版块',
    path: '/plate',
    show: true,
    submenuNavs: plate
  }, {
    name: '解忧电台',
    path: '/listener',
    show: true,
    submenuNavs: listener
  }, {
    name: '顾问',
    path: '/consultant',
    show: true,
    submenuNavs: consultant
  }
//   {
//     name: '监管',
//     path: '/chat',
//     show: false,
//     submenuNavs: chatNavs
//   },
//   {
//     name: '客服聊天监管',
//     path: '/customerChat',
//     show: false,
//     submenuNavs: customerChatNavs
//   }
]

const menuNavs2 = [{
  name: '监管',
  path: '/chat',
  show: false,
  submenuNavs: chatNavs
}]
const menuNavs3 = [{
  name: '客服聊天监管',
  path: '/customerChat',
  show: false,
  submenuNavs: customerChatNavs
}]
const menuNavs4 = [{
  name: '财务报表',
  path: '/report',
  show: false,
  submenuNavs: FinancialReport
}]
const menuNavs5 = [{
  name: '内容管理',
  path: '/content',
  show: false,
  submenuNavs: contentNavs
}]
export default {
  name: 'App',
  data() {
    return {
      menuNavs: [],
      menuPath: '',
      menuIndex: '',
      // menuPath: menuNavs[0].path,
      // menuIndex: menuNavs[0].name,
      // menuNavs: menuNavs,
      // submenuNavs: homeNavs,
      submenuNavs: [],
      openData: ['/customerChat/record', '/member/memberList', '/chat/summary', '/content/columnManage'],
      openeds: ['会员', '消息管理', '内容管理', '营销', '解忧师业务', '顾问业务']
      // openeds: ['会员', '标品管理', '规则设置', '日志管理']
    }
  },
  computed: {
    // onRoutes () {
    //   return this.$route.path.replace('/', '')
    // }
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
  methods: {
    selectNav(e, i, jk, fs) {
      for (const item of this.menuNavs) {
        if (item.path === e) {
          this.submenuNavs = item.submenuNavs
          break
        }
      }
    },
    // replaceUrl (path) {
    //   this.$router.push({
    //     path,
    //     query: {
    //      t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
    //    }
    //  })
    // },
    outLogin() {
      this.userOut()
      window.location.reload()
    },
    ...mapActions(['userOut'])
  },
  watch: {
    $route() {
      // const { path } = this.$route
      // for (let item of this.menuNavs) {
      //   const str = `^${item.path}`
      //   const reg = new RegExp(str)
      //   if (reg.test(path)) {
      //     this.submenuNavs = item.submenuNavs
      //     this.menuPath = item.path
      //     break
      //   }
      // }
      // 前端权限设置
      const name = sessionStorage.getItem('name')
      if (name === 'zhangheng' || name === 'dailihua') {
        this.menuNavs = menuNavs2
        this.menuPath = menuNavs2[0].path
        this.menuIndex = menuNavs2[0].name
        this.submenuNavs = homeNavs2
        const navBar = this.menuNavs
        for (let i = 0; i < navBar.length; i++) {
          const element = navBar[i]
          if (element.name === '监管') {
            this.menuPath = '/chat/summary'
            element.show = true
          }
        }
      } else if (name === 'maomeifeng') {
        this.menuNavs = menuNavs3
        this.menuPath = menuNavs3[0].path
        this.menuIndex = menuNavs3[0].name
        this.submenuNavs = homeNavs3
        const navBar = this.menuNavs
        for (let i = 0; i < navBar.length; i++) {
          const element = navBar[i]
          if (element.name === '客服聊天监管') {
            this.menuPath = '/customerChat/record'
            element.show = true
          }
        }
      } else if (name === 'caiwu') {
        this.menuNavs = menuNavs4
        this.menuPath = menuNavs4[0].path
        this.menuIndex = menuNavs4[0].name
        this.submenuNavs = homeNavs4
        const navBar = this.menuNavs
        for (let i = 0; i < navBar.length; i++) {
          const element = navBar[i]
          if (element.name === '财务报表') {
            this.menuPath = '/report/payment'
            element.show = true
          }
        }
      } else if (name === 'content') {
        this.menuNavs = menuNavs5
        this.menuPath = menuNavs5[0].path
        this.menuIndex = menuNavs5[0].name
        this.submenuNavs = contentNavs
        const navBar = this.menuNavs
        for (let i = 0; i < navBar.length; i++) {
          const element = navBar[i]
          if (element.name === '内容管理') {
            this.menuPath = '/content/columnManage'
            element.show = true
          }
        }
      } else {
        const { path } = this.$route
        this.menuNavs = menuNavs1
        this.submenuNavs = homeNavs1
        for (const item of this.menuNavs) {
          const str = `^${item.path}`
          const reg = new RegExp(str)
          if (reg.test(path)) {
            this.submenuNavs = item.submenuNavs
            this.menuPath = item.path
            break
          }
        }
      }
    }
  },
  components: {
    [Submenu.name]: Submenu,
    [menu.name]: menu,
    [MenuItem.name]: MenuItem
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

#app
  position relative
  width 100%
  height 100%
  & >>> .ps__rail-y
    z-index 100
  .app-header
    width 100%
    height 50px
    & >>> .el-menu-item
      height 50px
      line-height 50px
      &.is-active
        color $color-background
        font-weight 500
        border rgba(255,255,255,0.6) !important
        background-color rgba(255,255,255,0.6) !important
  .app-sideBar
    position absolute
    top 50px
    bottom 0
    left 0
    width 200px
    background-color #f2f2f2
    overflow-y auto
  .app-content
    position absolute
    top 50px
    bottom 0
    left 200px
    right 0
    // overflow hidden
  .outLogin
    margin-top 4px
    margin-right 10px
    float right
    color #fff
    span
      cursor pointer
      line-height 40px
      font-size 12px
    .admin
      width 40px
      height 40px
      margin-right 4px
      border-radius 50%
      display inline-block
      overflow hidden
      img
        max-width 100%
</style>

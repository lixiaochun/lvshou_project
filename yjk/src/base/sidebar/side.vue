<template>
<div>
  <el-menu mode="horizontal" class="app-header"
           :default-active="menuPath"
           background-color="#474c59"
           @select="selectNav"
           text-color="#fff">
    <el-menu-item  v-for="nav in menuNavs" :index="nav.path" :key="nav.path">
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
  <!--:default-openeds="[submenuNavs[0].name]"-->
  <div class="app-sideBar">
    <el-menu
      router
      :default-active="$route.path"
      background-color="#f2f2f2"
      text-color="#6A686B"
      active-text-color="#4897f9">
      <!--如果是-->
      <template v-for="(items, index) in submenuNavs">
        <template v-if="items.item">
          <el-submenu
            class="app-sideBar-submenu"
            :key="index"
            :index="items.name"
          >
            <template>
              <template slot="title">{{items.name}}</template>
              <el-menu-item v-for="(n, i) in items.item" :index="n.path" :key="i" class="">
                {{n.name}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="items.path" class="" :key="index">
            {{items.name}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
import { menu, MenuItem, Submenu } from 'element-ui'
import { mapActions } from 'vuex'
const homeNavs = [{
  name: '会员',
  path: '/home',
  item: [
    {name: '会员列表', path: '/member/memberList'},
    {name: '标签管理', path: '/member/tagManage'},
    {name: '等级设置', path: '/member/levelSet'},
    {name: '等级权益', path: '/member/levelInterests'}
  ]
}, {
  name: '规则设置',
  path: '/member',
  item: [
    {name: '任务奖励设置', path: '/member/rewardset'},
    {name: '兑换规则设置', path: '/member/exchangeSet'}
  ]
}, {
  name: '日志管理',
  path: 'member',
  item: [
    {name: '会员登录日志', path: '/member/login'}
  ]
}]
const memberNavs = [{
  name: '会员',
  path: '/member/memberList',
  item: [
    {name: '会员列表', path: '/member/memberList'},
    {name: '标签管理', path: '/member/tagManage'},
    {name: '等级设置', path: '/member/levelSet'},
    {name: '等级权益', path: '/member/levelInterests'}
  ]
}, {
  name: '规则设置',
  path: '/member',
  item: [
    {name: '任务奖励设置', path: '/member/rewardset'},
    {name: '兑换规则设置', path: '/member/exchangeSet'}
  ]
}, {
  name: '日志管理1',
  path: 'member',
  item: [
    {name: '会员登录日志', path: '/member/loginLog'}
  ]
}]
const messageNavs = [{
  name: '消息管理',
  path: '/message',
  item: [
    {name: '系统消息', path: '/message/systemMessage'},
    {name: '群发消息', path: '/message/groupMessage'},
    {name: '消息模板', path: '/message/unifiedMessage'}
  ]
}]
const shopNavs = [{
  name: '商城概况',
  path: '/shop/summary'
}, {
  name: '商城管理',
  path: '/shop',
  item: [
    {name: '商品管理', path: '/shop/goods'},
    {name: '商品分类', path: '/shop/classification'}
  ]
}, {
  name: '订单管理',
  path: '/shop/summary',
  item: [
    {name: '发货订单', path: '/shop/order'}
  ]
}, {
  name: '魅力分金钱比例',
  path: '/shop/exchange'
}]
const contentNavs = [{
  name: '内容管理',
  path: '/content',
  item: [
    {name: '文章列表', path: '/content/contentList'},
    {name: '分类管理', path: '/content/contentManage'}
  ]
}, {
  name: '短视频管理',
  item: [
    {name: '视频列表', path: '/content/contentManagess'},
    {name: '分类管理', path: '/content/contentManagesss'}
  ]
}]
const permissionNavs = [{
  name: '权限',
  path: '/permission',
  item: []
}]

const menuNavs = [
//  {
//    name: '首页',
//    path: '/home',
//    submenuNavs: homeNavs
//  },
  {
    name: '会员',
    path: '/member/memberList',
    submenuNavs: memberNavs
  },
  {
    name: '消息管理',
    path: '/message',
    submenuNavs: messageNavs
  },
  {
    name: '商城',
    path: '/shop',
    submenuNavs: shopNavs
  },
  {
    name: '内容管理',
    path: '/content',
    submenuNavs: contentNavs
  },
  {
    name: '权限',
    path: '/permission',
    submenuNavs: permissionNavs
  }
]

export default {
  name: 'App',
  data () {
    return {
      menuPath: menuNavs[0].path,
      menuIndex: menuNavs[0].name,
      menuNavs: menuNavs,
      submenuNavs: homeNavs
    }
  },
  computed: {
  },
  created () {
    this.$nextTick(() => {
    })
  },
  methods: {
    selectNav (e, i, jk, fs) {
      for (let item of this.menuNavs) {
        if (item.path === e) {
          this.submenuNavs = item.submenuNavs
          break
        }
      }
    },
    outLogin () {
      this.userOut()
      window.location.reload()
    },
    ...mapActions(['userOut'])
  },
  watch: {
    $route () {
      const { path } = this.$route
      for (let item of this.menuNavs) {
        const str = `^${item.path}`
        const reg = new RegExp(str)
        if (reg.test(path)) {
          this.submenuNavs = item.submenuNavs
          this.menuPath = item.path
          break
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
  overflow hidden
.app-content
  position absolute
  top 50px
  bottom 0
  left 200px
  right 0
  overflow hidden
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

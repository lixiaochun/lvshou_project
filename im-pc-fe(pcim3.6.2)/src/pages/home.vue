<template>
  <div id="home" class="flex">
    <audio autoplay="autoplay" id="auto"></audio>
    <leftMenu class="left-tabbar" v-show="TabarIndex!=3" :TabarIndex="TabarIndex"></leftMenu>
    <imMessage v-if="is_Login" v-show="TabarIndex==0"></imMessage>
    <imFriend v-if="TabarIndex==1"></imFriend>
    <imSetting v-if="TabarIndex==2"></imSetting>
    <login v-if="TabarIndex==3"></login>
    <conduct class="showClass" v-if="is_conductCheck"></conduct>
  </div>
</template>

<script>
import leftMenu from '@/components/leftMenu'
import imFriend from '@/pages/imFriend'
import imSetting from '@/pages/imSetting'
import imMessage from '@/pages/imMessage'
import conduct from '@/pages/conductPage'
import login from '@/pages/login'
import axios from 'axios'
export default {
  name: 'home',
  data() {
    return {
      TabarIndex: 0,
      messageTime: 0,
      is_Login: false,
      is_conductCheck: false ,//是否显示 新页面 （行为数据点击交互页面）
      Timing:0
    }
  },
  components: {
    leftMenu,
    imFriend,
    imSetting,
    imMessage,
    login,
    conduct
  },
  watch: {
    // 监听 左侧菜单栏切换
    '$store.getters.tabidxGette'(value) {
      var that = this
      this.TabarIndex = value
    },
    // 监听登录状态
    '$store.getters.isLoginGetter'(value) {
      var that = this
      that.is_Login = value
    },
    // 监听行为数据点击
    '$store.getters.conductGetter'(value) {
      var that = this
      that.is_conductCheck = value.status
    }
  },
  created() {
    this.TabarIndex = this.$store.getters.tabidxGette
    document.oncontextmenu = function() {
      return false
    }
    this.is_Login = this.$store.getters.isLoginGetter
    if (!sessionStorage.getItem('brm_userId')) {
      // 判断当前的token是否存在
      this.$store.commit('changeTabidx', 3)
    } else {
      this.$store.commit('changeIsLogin', true)
    }
  },
  methods: {
    isChageTabbar(index) {
      var that = this
      that.$store.commit('changeTabidx', index)
    },
    loginStatus(index) {
      this.TabarIndex = index
    }
  }
}
</script>
<style>
#home {
  font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 5px;
}
</style>



<template>
  <div class="login-page">
   <div class="login-wrapper">
    <div class="login-logo"></div>
    <h3 class="login-title">壹邦运营平台</h3>
    <div class="login-inpit-item">
      <el-input v-model="account" placeholder="请输入账号"></el-input>
    </div>
    <div class="login-inpit-item">
      <el-input v-model="passwd" type="password" placeholder="请输入密码" ref="passwordRef"></el-input>
    </div>
    <div class="login-inpit-item">
      <el-button type="primary" @click="handleClick">登录</el-button>
    </div>
   </div>
   <div class="copyright">
     <div style="margin-bottom:10px;">Copyright ©2019 壹健康健康产业有限公司 版权所有 粤ICP备17067268号-14</div>
      <a href="http://www.miitbeian.gov.cn" target="_Blank">
         粤ICP备17067268号
      </a>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import { Input, Button, Message } from 'element-ui'
import { login } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
export default {
  name: 'login-page',
  data() {
    return {
      account: '',
      passwd: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      const that = this
      this.$refs.passwordRef && this.$refs.passwordRef.$el.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
          that.handleClick()
        }
      })
    })
  },
  computed: {
  },
  methods: {
    handleClick() {
      const { account, passwd } = this
      login({ account, passwd }).then(res => {
        if (res.code === ERR_SUCCESS) {
          sessionStorage.setItem('name', account)
          this.setUser({
            name: this.account,
            token: res.data.opToken
          })
          const name = sessionStorage.getItem('name')
          if (name === 'zhangheng' || name === 'dailihua') {
            this.$router.replace('/chat/summary')
          } else if (name === 'maomeifeng') {
            this.$router.replace('/customerChat/record')
          } else if (name === 'caiwu') {
            this.$router.replace('/report/payment')
          } else if (name === 'content') {
            this.$router.replace('/content/columnManage')
          } else {
            this.$router.replace('/member/memberList')
          }
        } else {
          Message.error(res.msg)
        }
      })
    },
    ...mapActions(['setUser'])
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.login-page
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $color-mark
  .login-wrapper
    position absolute
    top 50%
    left 50%
    padding 0 25px
    width 300px
    height 350px
    background-color $color-background
    border-radius 5px
    transform translate(-50%, -50%)
  .login-logo
    margin 25px auto
    width 60px
    height 60px
    background url("./logo.png") no-repeat
    background-size 100% 100%
  .login-title
    margin-bottom 25px
    width 100%
    font-size 24px
    color rgb(52, 152, 219)
    text-align center
  .login-inpit-item
    margin-bottom 20px
    & >>> button
      width 100%
  .copyright
    text-align center
    font-size 14px
    position fixed
    bottom 10px
    left 50%
    transform translate(-50%, 0)
</style>

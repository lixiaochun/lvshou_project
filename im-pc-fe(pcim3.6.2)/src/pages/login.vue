<template>
  <div class="bigmain drag">
    <div class="center-header login flex flex-align-center flex-pack-end drag">
      <div class="header-img flex flex-align-center  no-drag" @click="minSmall">
        <img src="../assets/img/header/icon_minimize.png">
      </div>
      <div class="header-img flex flex-align-center  no-drag" @click="maxBig">
        <img src="../assets/img/header/icon_fullscreen.png">
      </div>
      <div class="header-img flex flex-align-center  no-drag" @click="close">
        <img src="../assets/img/header/icon_close.png">
      </div>
    </div>
    <div class="login-bg">
      <div class="login-box drag">
        <div class="login-title">
          <img src="../assets/img/logo@3x.png" alt="">
        </div>
        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="login-input-body no-drag">
          <el-form-item label="账号" prop="name">
            <el-input type="text" v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="padding-top:5px;">
            <el-input type="password" v-model="ruleForm.password" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="login-foot-btn ">
          <div class="login-btn no-drag" @click="submitForm('ruleForm')">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonJs from '@/util/common.js'
// 左侧菜单栏组件
import axios from 'axios'
// 引入打包工具
var ipc
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isBig: 0, //1最大化 0最小化
      isClose: false //又上角关闭
    }
  },
  watch: {},
  components: {},
  created() {
    var localIsbig = localStorage.getItem('isBig') || '0'
    this.isBig = localIsbig
    this.ruleForm.name = localStorage.getItem('user_name') || ''
    this.ruleForm.password = localStorage.getItem('pass_word') || ''
  },
  methods: {
    //设置最大化 /还原
    maxBig() {
      if (commonJs.isIpc()) {
        if (this.isBig == 0) {
          ipc.send('window-max')
          this.isBig = 1
          localStorage.setItem('isBig', 1)
        } else {
          ipc.send('window-restore')
          this.isBig = 0
          localStorage.setItem('isBig', 0)
        }
      }
    },
    //设置最小化
    minSmall() {
      if (commonJs.isIpc()) {
        ipc.send('window-min')
      }
    },
    // 关闭聊天框
    close() {
      if (commonJs.isIpc()) {
        ipc.send('window-close')
      }
    },
    submitForm(formName) {
      var _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url:
              'http://api.lvshou.com/post/login?account=' +
              this.ruleForm.name +
              '&password=' +
              md5(this.ruleForm.password).toUpperCase(),
            data: {}
          }).then(res => {
            if (res.data.status == '200') {
              if (res.data.data.sign == 'true') {
                this.getBrmUserId(res.data.data.token)
              } else {
                this.$message.error('登录失败,请检查账号密码或联系管理员')
              }
            }
          })
        } else {
          return false
        }
      })
    },
    getBrmUserId(token) {
      var _this = this
      axios({
        method: 'post',
        url: 'http://api.lvshou.com/post/brm/user/getUserByAccount?token=' + token + '&account=' + this.ruleForm.name,
        data: {}
      }).then(res => {
        if (res.data.status == '200') {
          localStorage.setItem('user_name', this.ruleForm.name)
          localStorage.setItem('pass_word', this.ruleForm.password)
          sessionStorage.setItem('brm_userId', res.data.data.info.id)
          this.$store.commit('changeIsLogin', true)
          _this.$store.commit('changeTabidx', 0)
          axios
            .get('https://api.hxsapp.com/api/Brm/getAdviserInfoByAdviserId', {
              params: {
                brm_adviser_id: res.data.data.info.id
              }
            })
            .then(res => {
              if (res.data.code == '200') {
                if (res.data.data) {
                  sessionStorage.setItem('adviserType', res.data.data.adviserType)
                }
              }
            })
          if (window.require) {
            axios
              .get('https://api.hxsapp.com/api/Tim/recordLoginLog', {
                params: {
                  brm_adviser_id: sessionStorage.getItem('brm_userId'),
                  brm_adviser_account: _this.ruleForm.name,
                  host_name: sessionStorage.getItem('hostname'),
                  content: sessionStorage.getItem('networkInterfaces')
                }
              })
              .then(res => {})
          }
        } else {
          this.$message.error('登录失败,请检查账号密码或联系管理员')
        }
      })
    },
    changeStatus() {
      if (!this.isLoginErro) return false
      this.isLoginErro = false
    }
  }
}
</script>
<style >
.bigmain {
  border-radius: 5px;
}
.login {
  width: 100%;
  height: 65px;
  padding: 0 15px;
  line-height: 65px;
  z-index: 2;
  border-radius: 5px 5px 0 0;
  background: #fff;
}
.center-header .iconfont {
  font-size: 20px !important;
  color: rgba(101, 114, 147, 0.5) !important;
  margin-right: 20px;
}
.center-header .iconfont:last-of-type {
  margin-right: 0px;
}
.login-bg {
  background: #f5f5f8;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: left;
  border-radius: 5px;
}
.login-box {
  position: absolute;
  width: 600px;
  height: 400px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(234, 237, 255, 1);
  margin: auto;
  border-radius: 6px;
}
.login-box .el-input__inner {
  border: 0 !important;
}
.login-title {
  padding-top: 50px;
  margin-bottom: 30px;
  text-align: center;
}
.login-box .el-form-item__label::before {
  display: none;
}
.login-title img {
  width: 200px;
}
.login-input-body {
  width: 50%;
  margin: auto;
  min-width: 150px;
}
.input-lable {
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
}

.login-input:focus {
  border: 1px rgba(101, 114, 147, 0.5) solid !important;
}
.forget-password {
  text-align: right;
  padding-top: 10px;
  color: #888;
}
.forget-password:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #1d91ec;
}
.login-foot-btn {
  width: 50%;
  margin: auto;
  min-width: 150px;
}
.login-btn {
  background: #657293;
  padding: 0 15px;
  text-align: center;
  line-height: 44px;
  border-radius: 5px;
  color: #fff;
  margin: auto;
  margin-top: 50px;
  cursor: pointer;
}
.login-btn:hover {
  background: rgba(101, 114, 147, 0.8);
}
.login-tip {
  position: absolute;
  padding: 5px;
  font-size: 14px;
  color: red;
  margin-top: -10px;
}
.erro-input {
  border: 1px red solid;
}
.login-box .el-form-item {
  margin-bottom: 10px !important;
}
.login-box .el-form-item__label {
  padding: 0 !important;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  color: #999;
}
.login-box .el-input__inner {
  border: 0;
  border-bottom: 1px rgba(153, 153, 153, 1) solid !important;
  border-radius: 0;
  height: 30px;
  color: #657293 !important;
  outline: none !important;
  padding-left: 0 !important;
  font-size: 16px;
}
</style>
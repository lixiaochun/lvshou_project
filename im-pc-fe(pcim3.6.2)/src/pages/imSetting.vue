<template>
  <div class="bigmain  drag " onselectstart="return false" style="border-radius:0 5px 5px 0">
    <div class="setting-right">
      <div class="center-header flex flex-align-center flex-pack-end drag">
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
    </div>
    <div class="setting-body ">
      <div class="setting-item flex">
        <div class="user-setting-box no-drag" style="width:calc((100% / 3) - 50px)">
          <div class="select-item-lable">账号设置</div>
          <div class="brm-id-content no-drag">当前登录:{{brm_id}}</div>
        </div>
        <div class="select-body " style="width:50%">
          <div class="select-item-lable" style="padding-bottom:20px;">快捷设置</div>
          <span>发送消息:</span>
          <el-select class="no-drag" v-model="value" placeholder="请选择" size="mini" style="margin-left:25px;width:300px;margin-top: 10px;border-radius:6px;height:26px;line-height:26px;" @change="optionChange">
            <el-option class="no-drag " v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="setting-item flex  statistics-time">
        <div class="user-setting-box no-drag">
          <div class="select-item-lable">登录时长:</div>
          <div class="echars-title">最近七天时长趋势图</div>
          <div id="echars" style="width:200px;height:200px;margin-top: 25px;"></div>
          <div class="statistics-label no-drag">今日登录:{{resultFormat(loginTime)}}</div>
        </div>
        <div class="user-setting-box no-drag">
          <div class="select-item-lable">普通电话:</div>
          <div class="echars-title">最近7天时长趋势图</div>
          <div class="echars-title" style="padding-left:15px;padding-bottom:4px;"> (顾问拨打时长)</div>
          <div class="echars-title" id="echars1" style="width:200px;height:200px;"></div>
          <div class="echars-title" v-show="isEchars2" id="echars2" style="width:200px;height:200px;"></div>
          <div class="statistics-label no-drag">今日拨打次数:{{telTime.count1}}</div>
          <div class="statistics-label no-drag">今日时长:{{resultFormat(telTime.totalTime1)}}</div>
          <div class="statistics-label no-drag">今日拨打次数（顾问端+BRM）:{{telTime.count2}}</div>
          <div class="statistics-label no-drag">今日时长（顾问端+BRM）:{{resultFormat(telTime.totalTime2)}}</div>
        </div>
      <!--   <div class="user-setting-box no-drag">
          <div class="select-item-lable">网络电话:</div>
          <div class="echars-title" style="padding-bottom:25px;">最近七天时长趋势图</div>
          <div class="echars-title" id="echars3" style="width:200px;height:200px;"></div>
          <div class="statistics-label no-drag">今日拨打次数:{{audioTime.count}}</div>
          <div class="statistics-label no-drag">今日时长:{{resultFormat(audioTime.totalTime)}}</div>
        </div> -->
      </div>
      <div class="tuichu-btn no-drag" @click="tuichu">退出登录</div>
    </div>
    <div class="version-number no-drag">
      <el-tooltip placement="top">
        <div slot="content">1、增加用户资料交互<br/> 2、增加转授权关系<br/> 3、增加登录信息日志<br/> 4、优化消息输入框</div>
        <el-button style="margin-bottom:20px; border:0;border-bottom:1px;"> v3.6.2</el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import commonJs from '@/util/common.js'
import leftMenu from '@/components/leftMenu'
import axios from 'axios'
// 引入打包工具
var ipc
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
// 左侧菜单栏组件
export default {
  name: 'imSetting',
  data() {
    return {
      isBig: 0, //1最大化 0最小化
      isClose: false, //又上角关闭
      options: [
        {
          value: '13',
          label: 'Enter'
        },
        {
          value: '17,13',
          label: 'Ctrl+Enter'
        }
      ],
      value: '',
      userName: null,
      brm_id: sessionStorage.getItem('brm_userId'),
      isEchars2: false,
      loginTime:"",// 今日登录次数
      telTime:{
        count1:"",
        totalTime1:"",
        count2:"",
        totalTime2:"",
      },
      audioTime:{
        count:"",
        totalTime:"",
      }
    }
  },
  watch: {},
  components: {
    leftMenu
  },
  created() {
    var localIsbig = localStorage.getItem('isBig') || '0'
    this.isBig = localIsbig
    this.getSetting()
  },
  mounted() {
    this.getStatistics()

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
    // 退出登录
    tuichu() {
      if (window.loginInfo.identifier) {
        if (this.$store.getters.showAudioGetter) {
          this.$message.error('当前正在通话中')
          return
        }
        //sdk登出
        webim.logout(resp => {
          loginInfo.identifier = null
          loginInfo.userSig = null
          sessionStorage.removeItem('brm_userId')
          sessionStorage.removeItem('adviserType')
          this.$store.commit('changeIsLogin', false)
          this.$store.commit('changeTabidx', 3)
        })
      } else {
        alert('未登录')
      }
    },
    //  设置快捷键
    optionChange(value) {
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/im/Chat/setSendShortcuts', {
          params: {
            brm_adviser_id: brm_userId,
            send_shortcuts: value
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            sessionStorage.setItem('keyCode', value)
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 时分秒转换
    resultFormat(result) {
      var h = Math.floor((result / 3600) % 24)
      var m = Math.floor((result / 60) % 60)
      if (h < 1) {
        return (result ='0小时'+ m + '分钟')
      } else {
        return (result = h + '小时' + m + '分钟')
      }
    },
    // 获取用户设置的快捷键
    getSetting() {
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/im/Chat/getAdviserConfig', {
          params: {
            brm_adviser_id: brm_userId
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            if (res.data.data) {
              if (res.data.data.send_shortcuts == '17,13') {
                this.value = 'Ctrl+Enter'
              } else if (res.data.data.send_shortcuts == '13') {
                this.value = 'Enter'
              }
              localStorage.setItem('keyCode', res.data.data.send_shortcuts)
            } else {
              this.value = 'Ctrl+Enter'
              localStorage.setItem('keyCode', '17,13')
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 获取顾问端统计情况
    getStatistics() {
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/im/Chat/dataStatistics', {
          params: {
            brm_adviser_id: brm_userId
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            this.statisticsData = res.data.data;
            this.loginTime=res.data.data.loginTimeData[6].totalTime
            this.audioTime={
              count:res.data.data.networkPhoneData[6].count,
              totalTime:res.data.data.networkPhoneData[6].totalTime,
            }
            this.telTime={
              count1:res.data.data.adviserPhoneData[6].count,
              totalTime1:res.data.data.adviserPhoneData[6].totalTime,
              count2:res.data.data.allPlatformPhoneData[6].count,
              totalTime2:res.data.data.allPlatformPhoneData[6].totalTime,
            }
            this.setStatistics()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    setStatistics() {
      var _this = this
      const myChart = echarts.init(document.getElementById('echars'))
      const myChart1 = echarts.init(document.getElementById('echars1'))
      const myChart2 = echarts.init(document.getElementById('echars2'))
      // const myChart3 = echarts.init(document.getElementById('echars3'))
      let myCharList = [
        {
          obj: myChart,
          seriesData: [],
          Xdata: [],
          seriesName: '登录时长(小时)'
        },
        {
          obj: myChart1,
          seriesData: [],
          Xdata: [],
          seriesName: '普通电话通话时长(分)'
        },
        {
          obj: myChart2,
          seriesData: [],
          Xdata: [],
          seriesName: '网络电话通话时长(顾问端+BRM)(分)'
        }
        // ,
        // {
        //   obj: myChart3,
        //   seriesData: [],
        //   Xdata: [],
        //   seriesName: '网络电话通话时长(小时)'
        // }
      ]
      myCharList.forEach((item, index) => {
        if (index == 0) {
          _this.statisticsData.loginTimeData.forEach((_item, idx) => {
            let time = null
            time = parseFloat(_item.totalTime / 3600).toFixed(2)
            item.seriesData.push(time)
            item.Xdata.push(_item.date)
          })
        }
        if (index == 1) {
          _this.statisticsData.adviserPhoneData.forEach((_item, idx) => {
            let time = null
            if (parseFloat(_item.totalTime / 60).toFixed(2) > 60) {
              time = parseFloat(_item.totalTime / 3600).toFixed(2)
            } else {
              time = parseFloat(_item.totalTime / 60).toFixed(2)
            }
            item.seriesData.push(time)
            item.Xdata.push(_item.date)
          })
        }
        if (index == 2) {
          _this.statisticsData.allPlatformPhoneData.forEach((_item, idx) => {
            let time = null
            if (parseFloat(_item.totalTime / 60).toFixed(2) > 60) {
              time = parseFloat(_item.totalTime / 3600).toFixed(2)
            } else {
              time = parseFloat(_item.totalTime / 60).toFixed(2)
            }
            item.seriesData.push(time)
            item.Xdata.push(_item.date)
          })
        }
        // if (index == 3) {
        //   _this.statisticsData.networkPhoneData.forEach((_item, idx) => {
        //     let time = null
        //     if (parseFloat(_item.totalTime / 60).toFixed(2) > 60) {
        //       time = parseFloat(_item.totalTime / 3600).toFixed(2)
        //     } else {
        //       time = parseFloat(_item.totalTime / 60).toFixed(2)
        //     }
        //     item.seriesData.push(time)
        //     item.Xdata.push(_item.date)
        //   })
        // }
      })
      myCharList.forEach((item, index) => {
        let objName = item.obj
        objName.setOption({
          color: ['#657293'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '-10px',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: '#657293', // 颜色
                  width: 2 // 粗细
                }
              },
              data: ["六天前","五天前","四天前","三天前","前天","昨天","今天"]
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: item.seriesName,
              type: 'bar',
              barWidth: '10',
              data: item.seriesData,
              itemStyle: {
                normal: {
                  barBorderRadius: [8, 8, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#A0B3E4' },
                    { offset: 0.5, color: '#657293' },
                    { offset: 1, color: '#657293' }
                  ])
                }
              }
            }
          ]
        })
      })
    }
  }
}
</script>
<style scoped>
.center-header {
  border-bottom: 1px rgba(129, 141, 207, 0.16) solid;
}

.setting-right {
  width: 100%;
}

.setting-body {
  padding: 0 81px;
  padding-top: 60px;
}

.setting-body .tuichu-btn {
  position: relative;
  top:30px;
  bottom: 0;
  cursor: pointer;
  width: 200px;
  height: 44px;
  background: #657293;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  line-height: 44px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  z-index: 3333;
}

.setting-body .tuichu-btn:hover {
  background: rgba(101, 114, 147, 1.8);
}

.select-item-lable {
  text-align: left;
  font-size: 20px;
  padding-bottom: 10px;
  font-weight: bold;
  font-family: PingFang-SC-Bold;
  color: rgba(101, 114, 147, 1);
}

.select-body {
  position: relative;
  left: 50px;
}

.select-body span {
  font-size: 16px;
  color: #657293;
  font-weight: 400;
}
.statistics-time {
  padding-top: 30px;
}
.statistics-label {
  padding-top: 5px;
  font-size: 14px;
  color: rgba(101, 114, 147, 1);
}
.statistics-time .user-setting-box {
  width: calc(100% / 3);
}
.echars-title {
  width: 190px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(101, 114, 147, 1);
}
.brm-id-content {
  height: 18px;
  font-size: 15px;
  color: rgba(101, 114, 147, 1);
  line-height: 18px;
  padding-top: 20px;
}

.version-number {
  position: absolute;
  right:30px;
  bottom: 10px;
  line-height: 51px;
  width: 100%;
  text-align: right;
  color: #999;
}
</style>
<template>
  <div class="wrapper">
    <!-- pv与loading -->
    
    <ls-loading></ls-loading>
    <div class="ls-pv">
      <ls-pv></ls-pv>
    </div>
   
    <div class="home-box">
      <!-- pv与loading -->
      <header class="head">
        <h4 class="head-state">
          <el-button class="rules-btn"  > 
            <router-link to="state">说明活动</router-link>
          </el-button>
        </h4>

        <div class="img-r head-img">
          <img src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/iqq03xa7icdmevlcxa8a5j547b2edfph'>
        </div>

        <h4 class="award-box flex-c center">
          <span class="flex-c" v-if="showTime!='已开奖'">
            距开奖还:
            <span class="block">{{hours}}</span>时
            <span class="block">{{minutes}}</span>分
            <span class="block">{{seconds}}</span>秒
          </span>
          <span v-if="showTime=='已开奖'">{{showTime}}</span>
          <!-- <span v-test="showTime" v-if="showTime=='已开奖'">{{showTime}}</span> -->
        </h4>
      </header>
      <section class="goods-list">
        <!-- 商品的列表，只有5个 -->
        <GoodsItem v-for="(item,index) in imgLists" :key="index" :total="total" :itemsrc="item.img" :itemdata="item"
    >
        </GoodsItem>
      </section>

      <GoMyCenter :userId="userId"></GoMyCenter>
    </div>
  </div>
</template>

<script>
  import GoodsItem from '../common/GoodsItem'
  import GoMyCenter from '../common/GoMyCenter'
  import axios from 'axios'
  import {
    urlGet,
    isApp,
    getHxsAppVersion,
    compareAppVersion,
    LsShare
  } from 'Utils/common'
  import LvshouFetch from 'Api/common'

  export default {
    name: 'index',
    data() {
      return {
        service_openim_account: null,
        nickname: '绿豆夺宝',
        baseInformation: {
          act_id: urlGet('id'),
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        },
        topicId: null,
        imgLists: [],
        //开奖时间
        endDateStr: "1543559256",
        showTime: "已开奖",
        dialogContent: false,
        userId: "",
        total: {},
        hours: "",
        minutes: "",
        seconds: "",
      }
    },
    components: {
      GoodsItem,
      GoMyCenter
    },
    created() {
      // this.getData();
      this.getBaseInfo();
      // this.topicId = this.$route.params.topicId;
      this.getActInfo();
    },
    mounted: function () {
      document.title = '';
      
      this.$nextTick(() => {
        _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '页面初始化'])
      })
      // this.TimeDown();
    },
    methods: {
      async getBaseInfo() {
        // 通过接口获取基础信息
        const data = this.baseInformation
        //  url=http://act.hxsapp.com/base/Api/actInfo?act_id=276
        const apiData = await LvshouFetch({
          url: 'https://act.hxsapp.com/base/Api/actInfo',
          data
        })
        // 通过api 接口 动态改变title
        document.title = apiData.title
        let link = "https://app.hxsapp.com/actweb/SnatchActivity/share"
        // 调起app 的分享协议
        LsShare({
           shareLink: link,
           shareTitle: apiData.title,
           shareImages: apiData.share_pic,
           shareDescr: apiData.descr,
          shareType: apiData.share_type
         })

        console.log(apiData)
      },
      imagesClick(key) {
        console.log(key)
        if (key === 7) {
          this.suspension()
        }
        if (key === 6) {
          this.hxsapp_jump_dynamic()
        }
      },
      getData() {
        var _this = this
        let userInfo = {
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        }
        axios
          .get('https://api.hxsapp.com/account/userInfo/getSelfUserInfo', {
            params: userInfo
          })
          .then(res => {
            if (parseInt(res.data.code) === 200) {
              _this.userId = res.data.data.user_id;

            } else {
              this.$message({
                message: '网络错误',
                center: true
              });
            }
          })
      },
      verification() {
        if (!isApp()) {
          /* 下载APP */
          window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=549'
          return false
        }
        if (!urlGet('sess_token')) {
          window.location.href = 'https://hxsapp_showloginpage'
          return false
        }
        return true
      },
      suspension() {
        var _this = this
        /* 判断是否APP操作 */
        if (!this.verification()) {
          return false
        }
        let appVersion = getHxsAppVersion()
        let isTrue = compareAppVersion(appVersion, '3.1.1')
        var serviceOpenimAccount
        if (!_this.service_openim_account) {
          Toast('接口异常，稍后再试')
          return
        }
        if (isTrue || appVersion === '3.1.1') {
          serviceOpenimAccount =
            'https://hxsapp_openim_page?service_id=' + _this.service_openim_account + '&title=' + _this.nickname
        } else {
          serviceOpenimAccount = 'https://hxsapp_openim#' + _this.service_openim_account
        }

        window.location.href = serviceOpenimAccount
      },
      hxsapp_jump_dynamic() {
        /* 判断是否APP操作 || 没有话题ID */
        if (!this.verification() || !this.topicId) {
          return false
        }
        /* https://hxsapp_jump_dynamic#话题id */
        window.location.href = 'https://hxsapp_jump_dynamic#' + this.topicId
      },
      getActInfo() {
        var that = this;
        let dataInfo = {
          sess_token: urlGet('sess_token'),
          act_id: urlGet('id'),
        }
        axios
          .get('https://act.hxsapp.com/beanTreasure/BeanTreasure/actInfo', {
            params: dataInfo
          })
          .then(res => {
            if (parseInt(res.data.code) === 200) {
              that.total = res.data.data.total;
              delete res.data.data.total;
              that.imgLists = res.data.data;
              that.endDateStr = res.data.data[0].time;
              if (that.total.actinfo == '已开奖') return;
              that.TimeDown();
            } else {
              this.$message({
                message: '网络错误',
                center: true
              });
            }
          });
      },
      TimeDown() {
        var that = this;
        //结束时间
        let endDate = new Date(parseInt(that.endDateStr) * 1000)
        //当前时间
        let nowDate = new Date()
        //相差的总秒数
        let totalSeconds = parseInt((endDate - nowDate) / 1000)
        let modulo = totalSeconds % (60 * 60 * 24)
        //小时数
        let hours = Math.floor(modulo / (60 * 60))
        modulo = modulo % (60 * 60)
        //分钟
        let minutes = Math.floor(modulo / 60);
        //秒
        let seconds = modulo % 60;
        //输出到页面
        that.showTime = '开奖前';
        that.seconds = seconds;
        that.hours = hours;
        that.minutes = minutes;
        setTimeout(function () {
          if (totalSeconds <= 0) {
            that.showTime = "已开奖";
            // axios.get('https://act.hxsapp.com/beanTreasure/BeanTreasure/AfterResults').then(res => {
            // });
            window.location.reload();

            return;
          }
          that.TimeDown();
        }, 1000);
      },

    }
  }

</script>

<style lang="less">
  * {
    margin: 0px;
    padding: 0px;
  }

  .ls-pv {
    z-index: 99;
    position: fixed;
    line-height: 1.1rem;
    text-align: center;
  }

  .ls-pv h5 {
    line-height: 0.4rem !important;
  }

  body {
    padding: 0px !important;
  }

  .flex-c {
    display: flex !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    vertical-align: middle;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-align: center;
    /* -webkit-flex-wrap:wrap; */
    /* flex-wrap:wrap; */
  }

  .flex-r {
    display: flex !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    vertical-align: middle;
    -webkit-align-items: center;
    align-items: end;
    -ms-flex-align: end;
  }

  .flex {
    display: flex !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    zoom: 1;
    /* -webkit-flex-wrap:wrap; -moz-flex-wrap:wrap;-ms-flex-wrap:wrap;-o-flex-wrap:wrap; flex-wrap:wrap; */
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
  }

  .flex-item {
    flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
    -webkit-box: 1;
    -webkit-box-flex: 1;
    position: relative;
  }

  .flex-item * {
    vertical-align: middle;
  }

  .img-r {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    /* background-color: #f2f2f2; */
  }

  .img-r img {
    width: 100%;
    height: auto;
    max-width: none;
  }

  .el-button {
    background-color: #0000003d;
    line-height: 0.02rem;

    padding: 0rem;
    border: 0px;
  }

  button {
    min-width: 2rem;
    background-color: white;
    border: 0.014rem solid black;
    vertical-align: middle;
    border-radius: 0.7rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 0.3rem;
    height: 0.65rem;
    font-size: 0.35rem;
    line-height: 0.6rem;
  }

  a {
    text-decoration: none;
    font-size: 0.35rem;
    line-height: 0.35rem;
    color: white;
  }

  .center {
    text-align: center;
    margin: 0 auto;
  }

  .home-box .el-progress-bar__inner {
    background-color: #fdd032;
  }

  span {
    color: white;
  }

  body {
     background-color: white;
  }

</style>
<style lang="less" scoped>
  .home-box {
    background-color: white;
  }

  .home-box {
    h5 {
      font-size: 0.2rem;
      margin: 0px;
      text-align: left;
      color: #ffffff;
      font-family: PingFangSC-Regular;
    }

    h4 {
      font-size: 0.35rem;
      line-height: 0.35rem;
      font-family: PingFangSC-Regular;
      margin: 0px;
      text-align: left;

      color: #ffffff;
    }

    .head-btn {
      margin: 10px 0px;
    }

    .award-box {
    
      color: white;
      padding: 0rem 0rem;
      height: 1rem;
      background-image: url('http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/sbo4k9tl7f9kjkr2p8b5997lmkr3gzbn');
      background-size: 100%; 
      text-align: center;

    }

    .award-box .block {
      background-color: white;
      height: 0.55rem;
      width: 0.55rem;
      margin: 0.4rem 0.1rem;
      color: #fe495f;
      line-height: 0.6rem;
      border-radius: 2rem;
    }

    .goods-list {
      padding: 0.4rem 0.95rem;
      padding-bottom: 0.5rem;
      background-image: url('http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/gvbf0odtsjyucwj211ap80f9fm24kpoq');
      background-size: 100%;
      background-repeat: repeat-y;
      padding-top: 1.2rem;
    background-position: initial;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-color: #49159b;
    }

    .head {
      position: relative;
    }

    .head-state {
      position: absolute;
      top: 0px;
      left: 0px;
    }

    .award-box {
      text-align: center;
      position: absolute;
      bottom: 0px;
      height: 1rem;
      background-color: rgba(0,0,0,0);
      width: 100%;
      color: #ffffff;
      justify-content: center;
      letter-spacing: 1px;
      z-index: 9;
      height: 1.1rem;
      bottom: -0.7rem;
      background-repeat: no-repeat;
      width: 95%;
      left: 2.5%;
    }

    .rules-btn {
      border-top-left-radius: 0rem;
      border-bottom-left-radius: 0rem;
      border: 0px;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      color: white;
      height: 0.78rem;
      padding: 0rem 0.35rem;
      line-height: 0.85rem;
      font-size: 0.35rem;
      margin-top: 0.3rem;
      background-image: url('http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/jpdlli241kr0u3vu0rsd86ktlnn1a09q');
      background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: rgba(0,0,0,0);
    }
    .rules-btn>span{
      height: 0.78rem;
      width: 1rem;
    }

    .rules-btn a {
      font-size: 0.35rem;
      opacity: 0;
    }

    .join-btn {
      margin-right: 30px;
    }

    .head-img {
      min-width: 100%;
      width: 100%;
      height: auto;
    }
  }

</style>

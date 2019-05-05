<template>
  <div class="wrapper">
    <ls-pv></ls-pv>
    <ls-loading></ls-loading>
    <img src="../../assets/images/header.png">
    <div class="main_img2" v-if="imgType==true"  @click="backImg"></div>
    <img src="../../assets/images/gzhe.png" v-if="imgType==true"  class="main_img" >

    <img src="../../assets/images/back2.png" class="button_img "  @click="imgDialog">
    <div class="data-box">
      <img src="../../assets/images/center.png">
      <div class="look-box">
        <ul>
          <li class="flex-c">
            <span class="flex-item"> 排名 </span>
            <span class="flex-item"> 用户昵称 </span>
            <span class="flex-item"> 点赞数 </span>
          </li>
          <li class="flex-c">
            <span class="flex-item"> {{ranking}}</span>
            <span class="flex-item">{{userName}}</span>
            <span class="flex-item" >{{like}}</span>
          </li>
        </ul>
        <button class="center"   @click="lookNum">
          <router-link :to="lossStart"  v-if="endType!=true">查看排行榜</router-link>
          <p v-if="endType==true"> 查看排行榜</p>
        </button>
      </div>
    </div>
    <img src="../../assets/images/bottom.png">
    <div class="helper" >
      <img src="../../assets/images/img_8.png"  @click="suspension">
    </div>
    <div class="bottom-btn" @click="hxsapp_jump_dynamic">
      <img src="../../assets/images/buttom.png">
    </div>
  </div>
</template>

<script>
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
        nickname: '新年好礼第一波',
        baseInformation: {
          act_id: urlGet('id'),
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        },
        ranking: "未参与",
        userName: "我",
        like: "---",
        topicId: null,
        lossStart: '',
        userId: "",
        endType:false,
        imgType:false
      }
    },
    created() {
      this.getData();
      this.getBaseInfo();
      //路由的处理的拼接
      this.lossStart = '/item/' + this.$route.params.topicId;
      if (this.$route.fullPath.indexOf('?') > -1) {
        this.lossStart = this.lossStart + '?' + this.$route.fullPath.split('?')[1];
      }
   
      this.topicId = this.$route.params.topicId;
      this.getActInfo();
    },
    mounted: function () {
      this.$nextTick(() => {
        _hmt.push(['_trackEvent', '按钮', '新年好礼第一波', '页面初始化'])
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
        document.title = apiData.title
        let link = "https://app.hxsapp.com/actweb/SendJewelry/share";
        LsShare({
           shareLink: link,
           shareTitle: apiData.title,
           shareImages: apiData.share_pic,
           shareDescr: apiData.descr,
          shareType: apiData.share_type
         })
      },
      imgDialog() {
        this.imgType=true;
      },
      backImg() {
        this.imgType=false;
      },
      lookNum() {
        var _this=this;
        if(_this.endType==true){
          window.event? window.event.cancelBubble = true : e.stopPropagation();
          _this.$message({
                message: "该活动已结束",
                center: true
              });
          return false;
        }
      },
      getData() {
        var _this = this;
        let IMjson = {
          sess_token: urlGet('sess_token')
        };

        axios
          .get('https://api.hxsapp.com/account/userAccount/getOpenIMAccount', {
            params: IMjson
          })
          .then(res => {
            if (parseInt(res.data.code) === 200 && res.data.data.service_openim_account) {
              _this.service_openim_account = res.data.data.service_openim_account;
              let json = {
                chat_account: _this.service_openim_account
              };
              axios
                .get(
                  'https://api.hxsapp.com/account/UserInfo/getChatInfoByChatAccount', {
                    params: json
                  }
                )
                .then(resp => {
                  console.log('------resp.data--------')
                  console.log(resp.data)
                  if (resp.data.data) {
                    _this.nickname = resp.data.data[_this.service_openim_account].nickname;
                  }
                });
            }
          });
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
        _hmt.push(['_trackEvent', '按钮', '新年好礼第一波','瘦身咨询']);
        var _this = this;
        if(_this.endType==true){
          _this.$message({
                message: "该活动已结束",
                center: true
              });
          return false;
        }
        /* 判断是否APP操作 */
        // if (!this.verification()) {
        //   return false
        // }
        let appVersion = getHxsAppVersion()
        let isTrue = compareAppVersion(appVersion, '3.1.1')
        var serviceOpenimAccount;
        if (!_this.service_openim_account) {
          Toast('接口异常，稍后再试')
          return
        }
        if (isTrue || appVersion === '3.1.1') {
          serviceOpenimAccount =
            'https://hxsapp_openim_page?service_id=' + _this.service_openim_account + '&title=' + _this.nicknname
        } else {
          serviceOpenimAccount = 'https://hxsapp_openim#' + _this.service_openim_account
        }
      
        window.location.href = serviceOpenimAccount
      },
      //判断话题的功能
      hxsapp_jump_dynamic() {
        var _this = this;
        _hmt.push(['_trackEvent', '按钮', '新年好礼第一波','马上参与']);
        if(_this.endType==true){
          _this.$message({
                message: "该活动已结束",
                center: true
              });
          return false;
        }
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
          move_id: that.topicId,
          act_id: urlGet('id'),
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        }
        axios
          .get('https://act.hxsapp.com/rankings/NewYear/getActInfo', {
            params: dataInfo
          })
          .then(res => {
            if (parseInt(res.data.code) === 200) {
              document.title = res.data.data[0].descr;
              that.nickname = res.data.data[0].descr;
              that.ranking = res.data.data[1].rank;
              that.userName = res.data.data[1].my;
              that.like = res.data.data[1].like;
              let newTime=new Date();
              that.endType=( (newTime.getTime())/1000 )>=(res.data.data[0].end_time)?true:false;
            } else {

              this.$message({
                message: res.data.code,
                center: true
              });
            }
          });
      },
    }
  }

</script>

<style lang="less" scoped>
  .wrapper {
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

    .helper {
      width: 2.0rem;
      position: fixed;
      bottom: 10%;
      right: 2%;
    }

    .look-box {
      font-size: 0 !important;
      position: absolute;
      bottom: 0px;
      width: 80%;
      margin-left: 12%;
    }

    ul {
      margin: 0rem;
      padding: 0rem;
    }

    div {
      font-size: 0 !important;
    }

    .data-box {
      position: relative;
      border: 0px;
      box-sizing: border-box;
      margin-top: -0.4rem;
    }

    .look-box span {
      color: #7d1d1d;
      font-size: 0.35rem;
    }

    .look-box li:nth-child(1) span {
      color: #ff5b5b;
      padding-bottom: 0.1rem;
      margin-bottom: 0.2rem;
      border-bottom: 2px solid #fbc6c6;
    }

    .look-box button {
      background-image: linear-gradient(90deg,
        #fd9473 0%,
        #fe806b 26%,
        #ff6b62 52%,
        #fe4237 100%);
      border-radius: 0.5rem;
      border: 0px;
      color: #ffffff;
      font-size: 0.5rem;
      height: 1.0rem;
      padding: 0rem 0.9rem;
      vertical-align: middle;
      margin-top: 0.2rem;
    }

    a {
      color: #ffffff;
      font-size: 0.5rem;
      text-decoration: none;
    }
    .center p {
      color: #ffffff;
      font-size: 0.5rem;
      text-decoration: none;
      padding: 0rem;
      margin: 0rem;
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

    img {
      font-size: 0 !important;
      max-width: 100%;
      -webkit-box-flex: 0;
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
    }

    .bottom-btn {
      position: fixed;
      bottom: 0rem;
      left: 0%;
      width: 100%;
      font-size: 0 !important;
    }
    .button_img{
       position:fixed;
       top: 1.85%;
       left: 0%;
       color: white;
       border: 0px;
       border-radius: 0rem;
       width: 1.5rem;
       height: auto;
       font-size: 0rem !important;
    }
    .main_img{
      position:fixed;
      width: 100%;
      height: 100vh;
      z-index: 999;
      left: 0px;
      top: 0px;
      background-color: rgba(0,0,0,0.5);
    }
    .main_img2{
      position:fixed;
      width: 100%;
    height: 30vh;
    z-index: 9999;
    top: 0px;
    }
  }

</style>

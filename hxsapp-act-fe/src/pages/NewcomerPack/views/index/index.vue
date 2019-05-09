<template>
  <div class="wrapper">
    <!-- pv与loading -->

    <ls-3></ls-3 m 
      
      
      >
    <div class="ls-pv">
      <ls-pv></ls-pv>
    </div>

    <div class="home-box">
      <!-- pv与loading -->
      <header class="head">
        <div class="img-r head-img">
          <img src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/1o42pmo02983uuurjobq38s47d76on8p'>
          <h5 class="pos-a-c title"> </h5>
        </div>
      </header>


      <section class="goods-list">
        <ul class="">
          <ll class="item " v-for="(item,index) in imgLists" :key="index">
             <div class="img-r item-img"  @click="getCoupon(item.id,item.is_finished)">
                <img :src="item.img">
             </div>
          </ll>
          <ll class="item " >
            <div class="img-r item-img"  >
              <img src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/jg3b8xtcbzdbg62c7havlcpuvhinujbz'>
           </div>
         </ll>

        </ul>

      </section>
      <!-- <div class="img-r">
        <img class="" src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/zmorismc1ij71520hb7kntfuhbgyt371'>
      </div> -->
      <div class="content-b-img img-r">
        <img class="" src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/oxpaxmdxt168yieawf00lwni49ildfrv'>
      </div>
      <section class="bottom-c">
        <div class="flex-c b-top">
          <div class="img-r" @click="lookCoupon()">
            <img class="" src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/gfx5mdab8geyi891q1uu1ji88jhhcac0'>
          </div>
          <div class="img-r" @click="toShop()">
            <img class="" src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/k4kq5qw3sn5zzsnsadu38exf62zjd4hl'>
          </div>
        </div>
        <div class="img-r c-b-title">
          <img class="" src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/l54gdqnouifh9nczk3pndjqtnl7wv1ub'>
        </div>
        <div class="img-r  c-b-img1" @click="toCell()">
          <img class="" src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/0lnjusp2smcffol3nqtmz8w5x1y1c5jx'>
        </div>
        <div class="img-r c-b-img2" @click="toWelfare()">
          <img class="" src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/wox2g07s17z79lbnmvkhrvymzf0ly8dz'>
        </div>
      </section>

      <GoMyCenter :userId="userId"></GoMyCenter>
    </div>
  </div>
</template>

<script>
  import GoodsItem from '../common/GoodsItem'
  import GoMyCenter from '../common/GoMyCenter'
  import { Toast } from 'mint-ui';
  import axios from 'axios'
  import {
    urlGet,
    isApp,
    getHxsAppVersion,
    compareAppVersion,
    LsShare,
    userAgent
  } from 'Utils/common'
  import LvshouFetch from 'Api/common'
  export default {
    name: 'index',
    data() {
      return {
        service_openim_account: null,
        nickname: '新手礼包',
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
        imgaddres: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/57lwabzvdtetq8m7lzp6s5kbea3txzgu',
        isLogin: true,
        axiosList: [],
      }
    },
    components: {
      GoodsItem,
      GoMyCenter
    },
    created() {
       this.getData();
      this.getBaseInfo();
      // this.topicId = this.$route.params.topicId;
      this.getActInfo();
    },
    mounted: function () {
      this.$nextTick(() => {
        _hmt.push(['_trackEvent', '按钮', '新手礼包二期', '页面初始化'])
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
        let link = "https://app.hxsapp.com/actweb/NewcomerPack/share"
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
        var _this = this
        /* 判断是否APP操作 */
        if (!this.verification()) {
          return false
        }
        let appVersion = getHxsAppVersion()
        let isTrue = compareAppVersion(appVersion, '3.1.1')
        var serviceOpenimAccount
        if (!_this.service_openim_account) {
          that.$message({
                message: '接口异常',
                center: true
          });
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
      getImgList(array) {
        var that = this;
        var imgaddres = "../../assets/yhj/";
        var length=that.axiosList.length;
        if(that.isLogin==false){
          length=7;
        }
 
        for(var i=0;i<length;i++){
          var element=that.axiosList[i];
          if(that.isLogin==false){
            element={};
            element.is_receive=false;
            element.c_id=0;
            element.is_receive=false;
          }
          var item = {};
          switch (i+1) {
            case 1:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/19qfmb9k3flta5w7rcfkg19c361pkwf5';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/oe1byk2456k3ak8nqdz6n9z5b4c3v4uo';
              }
              break;
            case 2:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/r9xwhxzhg9bmljya0gxu1y3qzx5c6k45';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/1q49p9zvvudnysqyk4a9dzf3kqdkabvs';
              }
              break;
            case 3:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/v9vdak4zqt770ctndiz3d7o0cdrwxbj2';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/p91bnm0j5up91qbgp49szu8g89wshl2t';
              }
              break;
            case 4:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/fcbn8fok8rg0mr1dcdrkrkcce8jxchf8';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/iu74kpfxdslrrzn7cek7iwr6dqh4qq00';
              }
              break;
            case 5:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/n2lrrztaa0dehogalj48bfzxgg0jdqbs';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/5lzcmeikvc2dpv8qy5hjrz5x9qh91ksg';
              }
              break;
            case 6:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/j9x71zl0fi2as5mkeua9kolme293t7en';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/z1p0rqeypcobirg6pjy01bucd3j9m2o3';
              }
              break;
            case 7:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/guynoj9kk7fctsibon0zvqbdwd5t0lp2';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/5evxafcjhjqjrl66ayy28lda714a1zvm';
              }
              break;
            case 8:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/5i410iwvffh3uoicejmmwdlimrpc8m1g';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/7os9xziv3ny6p3z4zpqol9ypqhd8f3np';
              }
              break;
            case 9:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/k5ks85x4cfbc4org8bbzweqv8tbkvdvj';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/zvzab5y45w30o3tfvjor91yup1vptplm';
              }
              break;
            case 10:
              if (element.is_receive == true) {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/dotz4f60bqpr4fcdwu55rukmexnl19ps';
              } else {
                that.imgaddres = 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/dgaiv0dposltdpfnfhum61pcr912jsal';
              }
              break;
            default:
          }
          item.img = that.imgaddres;
          item.id = element.c_id;
          item.is_receive = element.is_receive;
          item.is_finished = element.is_finished;
          that.imgLists.push(item);

        }
      },
      getActInfo() {
        var that = this;

        let dataInfo = {
          sess_token: urlGet('sess_token'),
          act_id: urlGet('id'),
        }
    
        axios
          .get('https://act.hxsapp.com/draw/NewcomerGift/getCouponList', {
            params: dataInfo
          })
          .then(res => {
            if (parseInt(res.data.code) === 200) {
              that.imgLists=[];
              let datalist=res.data.data;
              datalist.sort(that.compare('c_id'));
              debugger;
              that.axiosList =datalist;
              that.getImgList();
            } else if (parseInt(res.data.code) == 401) {
              that.imgLists=[];
              that.isLogin = false;
              that.getImgList();
            } else {
              this.$message({
                message: '网络错误',
                center: true
              });
            }
          });
      },
      compare(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
          }
      },
      getCoupon(id,is_finished) {
        var that = this;

      
        if(is_finished==false){
        
              Toast({
                message: '该优惠券已领完',
                position: 'bottom',
                duration: 3000
              });


          return;
        }
        //判断是否登录
        if(that.isLogin==false){
          if (!urlGet('sess_token')) {
            window.location.href = 'https://hxsapp_showloginpage';
            return ;
          }
        }
   
        let dataInfo = {
          sess_token: urlGet('sess_token'),
          act_id: urlGet('id'),
          c_id:id
        }
        axios
          .get('https://act.hxsapp.com/draw/NewcomerGift/receiveCoupon', {
            params: dataInfo
          })
          .then(res => {
            if (parseInt(res.data.code) === 200) {
              
              that.getActInfo();
             
              Toast({
                message:  '领取'+res.data.msg,
                position: 'bottom',
                duration: 3000
              });

            }else if (parseInt(res.data.code) === 201){
            
              Toast({
                message: '您已领取该优惠劵',
                position: 'bottom',
                duration: 3000
              });
            }else{
              Toast({
                message:  res.data.msg,
                position: 'bottom',
                duration: 3000
              });
            }

        });

      },
      lookCoupon() {
        var _this = this;;
        let appVersion = getHxsAppVersion()
        let isTrue = compareAppVersion(appVersion, '3.8.5')
        if (isTrue || appVersion === '3.8.5') {
          _hmt.push(['_trackEvent', '按钮', '新手礼包二期', '查看我的优惠价']);
          window.location.href = 'https://hxsapp_coupon?page=0';
        } else {
          _this.$message({
            message: '请更新至最新版本后查看',
            center: true
          });
        }
      },
      //跳转商城首页
      toShop() {
        _hmt.push(['_trackEvent', '按钮', '新手礼包二期', '前往商城']);

        if (userAgent() === 'ios') {
         // window.location.href = 'https://hxsapp_gopage?page_name=MallHomeController'
            window.location.href = 'https://hxsapp_gopage?page_name=HXSMallHomeViewController'
        } else if (userAgent() === 'and') {
       //   window.location.href = 'https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.shop.ShopActivity'
           window.location.href = 'https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.shop.ShopSecondActivity'
        }
      },
      //跳转顾问
      toCell() {
        _hmt.push(['_trackEvent', '按钮', '新手礼包二期', '官方咨询顾问']);
        var _this = this;;
        let appVersion = getHxsAppVersion()
        let isTrue = compareAppVersion(appVersion, '3.1.1');
        var serviceOpenimAccount;
        if (!_this.service_openim_account) {
          Toast('接口异常，稍后再试')
          return
        }
        if (isTrue || appVersion === '3.1.1') {
          serviceOpenimAccount='https://hxsapp_openim_page?service_id=' + _this.service_openim_account + '&title=' +
            _this.nickname
        } else {
          serviceOpenimAccount='https://hxsapp_openim#' + _this.service_openim_account
        }
        window.location.href = serviceOpenimAccount
      },
      //跳转福利也
      toWelfare() {
        _hmt.push(['_trackEvent', '按钮', '新手礼包二期', '马上参与']);
        window.location.href = 'https://hxsapp_jump_myactivity#2';
      }
    }
  }
</script>

<style lang="less">
  * {
    margin: 0px;
    padding: 0px;
  }
  .mint-toast.is-placebottom{
    border-radius: 50px;
    padding: 0.2rem 0.8rem !important;
    color:white;
    height: auto;
     width: auto;
     max-width: 95%;
     white-space:nowrap;
  }
   .mint-toast-text{
   
     line-height: 0.35rem;
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
    width: 100vw;
    overflow: hidden;
  }

  .home-box {
    .head-b-img {
      width: 100%;
      height: auto;
      position: relative;
    }

    .c-b-title {
      width: 76%;
      margin: 0.1rem auto;
      margin-top: 1.0rem;
    }

    .c-b-img1 {
      width: 88%;
      margin: 0rem auto;
    }

    .c-b-img2 {
      width: 80%;
      margin: 0rem auto;
      margin-bottom: 1rem
    }

    .b-top {
      width: 88%;
      margin: 0 auto;
      padding-top: 0.2rem;
    }

    .b-top .img-r {
      width: auto;
      height: 108px;
    }

    .content-b-img {
      width: 100%;
      height: auto;
      position: relative;
    }

    .content-b-img .title {
      position: absolute;
      text-align: left;
      width: 78%;
      top: 10px;
      font-size: 0.32rem;
    }

    .head-img .title {
      position: absolute;
      text-align: center;
      width: 100%;
      bottom: 8px;
      font-size: 0.32rem;
    }

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
      background-image: url('http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/mc6cs1e0ceof2sgcrs2eprqovkuroqkq');
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
      background-image: url('http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/nl3uzxapil6ayllqy431edvf7g7wksoh');
      background-size: 100% auto;
      min-height: 50vh;
      height: 100%;
      background-repeat: repeat-y;
      background-position: initial;
      background-color: #49159b;
    }

    .goods-list ul {
      width: 88%;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }

    .goods-list .item {
      width: 50%;
      float: left;
      height: 2.25rem;
      padding: 0rem 0.2rem
    }

    .bottom-c {
      background-image: url('http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/7p87u1ezmtkmsjmc9rky8lymnflnowow');
      background-size: 100% auto;
      min-height: 20vh;
      height: 100%;
      background-repeat: repeat-y;
      background-position: initial;
      background-color: #49159b;
      margin-top: -0.15rem;
    position: relative;
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
      background-color: rgba(0, 0, 0, 0);
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
      background-image: url('http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/ewn23fwik2s6nk13fxx3k3d12v53lgda');
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-color: rgba(0, 0, 0, 0);
    }

    .rules-btn>span {
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

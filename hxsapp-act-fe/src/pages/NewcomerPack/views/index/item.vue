<template>
  <div class="wrapper home-box">
    <!-- pv与loading -->
    <ls-loading></ls-loading>
    <header class="head">
      <div class="award-box">
        <div class="img-r head-img">
        <div class="img-r head-img">
          <img :src="dataInfo.img" v-if="dataInfo.img">
        </div>
        <img src="../../assets/images/border2.png" class="itembg2" >
      </div>
        <h4 class="title center">{{dataInfo.goods_name}}</h4>
      </div>
      <div class="img-r head-img2">
          <img src="../../assets/images/header3.png">
        </div>
    </header>
    <section class="goods-list" style="padding-bottom: 130px;">

      <div class="head-title">
        <h3 class="center box1">{{datamsg}}</h3>
        <span class="center box2">
          <h4 class="title">{{'您的夺宝号 : '+order_id}}</h4>
        </span>
        <div class="img-r img-t">
          <img src="../../assets/images/bg-t.png">
        </div>
      </div>
      <ul class="award-list">
        <li class="flex-c center award-head">
          <h4 class="flex-item center">中奖人</h4>
          <h4 class="flex-item center">中奖号码</h4>
        </li>
        <li class="flex-c">
          <h4 class="flex-item center">{{dataInfo.nickname}}</h4>
          <h4 class="flex-item center">{{dataInfo.order_id}}</h4>
        </li>
      </ul>
      <div class="img-r img-b">
        <img src="../../assets/images/bg-b.png">
      </div>
    </section>

    <div class="box-bottom center">
      <el-button round @click="rewardsLook()">{{buttonMsg}}</el-button>
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
        goods_id: this.$route.query.goods_id,
        sess_token: this.$route.query.sess_token,
        act_id: this.$route.query.act_id,
        dataInfo: {},
        order_id: '',
        buttonMsg:"返回",
        datamsg: "",
      }
    },
    components: {},
    created() {
      this.$nextTick(() => {
        _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '页面初始化'])
      })
      var that = this;
      that.addActivity();
    },
    mounted: function () {},
    methods: {
      rewardsLook() {
        var that=this;
        if(that.buttonMsg ==="返回"){
          that.$router.go(-1);//返回上一层
          return;
        }
        window.location.href = 'https://hxsapp_jump_myactivity#1';
      },
      addActivity() {
        var that = this;
        let dataInfo = {
          sess_token: that.sess_token,
          act_id: that.act_id,
          goods_id: that.goods_id,
        }
        axios
          .get('https://act.hxsapp.com/beanTreasure/BeanTreasure/AfterPrize', {
            params: dataInfo
          })
          .then(res => {
            debugger;
            if (parseInt(res.data.code) === 200) {
              this.datamsg = res.data.msg;
              if(res.data.data==null){
                that.dataInfo = {};
              }else{
                that.dataInfo = res.data.data;
              }
              that.order_id = res.data.order_id;
              if(res.data.msg=="恭喜您，夺宝成功，请等待工作人员联系"){
                that.buttonMsg="立即查看";
              }
            } else {

            }
          });
      }
    }
  }

</script>
<style lang="less">
  * {
    margin: 0px;
    padding: 0px;
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
    letter-spacing: 1px;
    color: #ffffff;
  }

  h3 {
    color: white;
    font-size: 0.60rem;
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
    background-color: #740aaa;
  }

  html {
    background-color: #740aaa;
  }

  .home-box {
    background-color: #740aaa;
  }

</style>
<style lang="less" scoped>
  .home-box {
    background-color: #740aaa;
  }

  .award-list {
    border: 0.06rem solid white;
    margin-top: 0.1rem;
    background-image: url("../../assets/images/bg-c.png");
      background-size: 100%;
      background-repeat: repeat-y;
    background-position: initial;
    border-width: 0px;
    margin-top: -0.09rem;
    margin-right: -0.01rem;
  }
  .award-list li {
    padding: 0.3rem 0.2rem;
  }
  .award-list .award-head {
    background-position: bottom;
    padding: 0rem;
    padding-bottom: 0.5rem;
    background-size: 100%; 
    background-image: url("../../assets/images/banner2.png");
      background-repeat: no-repeat;
      padding: 0rem;
    padding-bottom: 0.5rem;
    margin: 0rem 0.3rem;
  }

  

  .award-list span {}

  .home-box {
    .head-btn {
      margin: 10px 0px;
    }

    .box1 {
      color: white;
      padding: 0.2rem 0px;
      margin-bottom: 0.3rem;
      width: 80%;
      display: inline-block;
      border-bottom: 2px dashed white;
    }

    .box2 {}

    .box2 .title {
      margin-bottom: 0.7rem;
      padding-top: 0.2rem;

      text-align: center;
      letter-spacing: 1px;
    }

    .award-box {
      background-color: rgba(0, 0, 0, 0.05);
      color: white;
      padding: 6% 6% 4% 6%;
    }

    .award-box .title {
      padding-top: 0.6rem;
      font-size: 0.35rem;
      letter-spacing: 1px;
    }

    .goods-list {
      padding: 0.4rem 0.7rem;
      padding-bottom: 0.6rem;
      background-image: url("../../assets/images/bg.png");
      background-size: 100%;
      background-repeat: repeat-y;
      padding-top: 0.2rem;
    background-position: initial;
    min-height: 100vh;
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
      width: 100%;
      color: #ffffff;
      letter-spacing: 1px;
      position:absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 99;
    }

    .head-img {
      width: 5rem;
      height: 5rem;
      min-height: 1.5rem;
      margin: 0 auto;
      position: relative;
      overflow:inherit;
    }
    .head-img   .head-img  {
      width: 5rem;
      height: 5rem;
      background-color: white;
      border-radius: 0.1rem;
    margin-top: -0.01rem;
    }
    .itembg2{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 110%;
  }
    .head-img2 {
      min-width: 100%;
      width: 100%;
      height: auto;
      min-height: 1.5rem;
    }

    .goods-list h5 {
      line-height: 0.55rem;
      letter-spacing: 1px;
    }

    .box-bottom {
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      background: linear-gradient(to right, #654bfc, #9e4bfc);
    }

    .box-bottom .el-button {
      width: 100%;
      background: linear-gradient(to right, #654bfc, #9e4bfc);
      color: white;
      font-size: 0.7rem;
      line-height: 0.65rem;
      border-radius: 0px;
      height: 1.2rem;
      box-sizing: border-box;
      border: 0px;
      letter-spacing: 2px;
      height: 0.9rem;
    }
  }

</style>

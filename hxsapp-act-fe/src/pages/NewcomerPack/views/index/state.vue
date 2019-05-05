<template>
  <div class="wrapper home-box">
    <!-- pv与loading -->
    <ls-loading></ls-loading>
    <header class="head">
      <div class="img-r  head-img"><img src="../../assets/images/header2.png"/></div>
    </header>
    <div class="box-bottom center flex-c">
        <span @click="back()">返回</span>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import {
//   urlGet,
//   isApp,
//   getHxsAppVersion,
//   compareAppVersion,
//   LsShare
// } from 'Utils/common'
// import LvshouFetch from 'Api/common'
export default {
  name: 'index',
  data() {
    return {}
  },
  components: {},
  created() {
  },
  mounted: function () {
  },
  methods: {
    back(){
      var that=this;
      that.$router.go(-1);//返回上一层
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
    border: 0px

  }
  button {
    min-width: 2.0rem;
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
    background-color: #740aaa;
  }

  html {
    background-color: #740aaa;
  }

  .home-box {
    background-color:#740aaa;
  }
</style>
<style lang="less" scoped>
  .home-box {
    background-color: #740aaa;
    padding-bottom: 60px;
  }

  .home-box {
    .head-btn {
      margin: 10px 0px;
    }

    h5 {
      font-size: 0.35rem;
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
    .award-box {
      background-color: rgba(0, 0, 0, 0.1);
      color: white;

    }

    .goods-list {
      padding: 0.4rem 0.7rem;
      padding-bottom: 0.8rem;
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
      padding: 0.2rem 0rem;
      position: absolute;
      bottom: 0px;
      height: 0.8rem;
      background-color: #ef387a;
      width: 100%;
      color: #ffffff;
      letter-spacing: 1px;

    }

    .head-img {
      min-width: 100%;
      width: 100%;
      height: auto;
    }
    .goods-list h5 {
      line-height: 0.55rem;
      letter-spacing: 1px;
    }

    .box-bottom {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 90px;
    justify-content: center;
    background-color: rgba(157, 75, 252, 1);
    background: -webkit-gradient(linear, left top, right top, from(#654bfc), to(#9e4bfc));
    background: linear-gradient(to right, #654bfc, #9e4bfc);
    span {
      font-size: 48px;
    }
  }
  }

</style>

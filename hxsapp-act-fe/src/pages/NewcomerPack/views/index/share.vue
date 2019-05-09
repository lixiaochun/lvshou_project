<template>
  <div class="wrapper home-box">
    <!-- pv与loading -->
    <!-- <ls-loading></ls-loading> -->
    <div class="head">
      <div class="img-r head-img">
        <img src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/mhz1ob4ko3e5nmm7opor69yop8svwcqa'>
      </div>
        <div @click="addButtom()" class="img-r">
          <img src='http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/w7rbxhkd1kp0jpdn01zroblv01guoqp7'>
        </div>
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
    return {

    }
  },
  components: {},
  created() { },
  mounted: function () { },
  methods: {
    addButtom() {
      window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=571';
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
  // min-width: 2rem;
  // background-color: white;
  // vertical-align: middle;
  // border-radius: 0.7rem;
  // -webkit-box-sizing: border-box;
  // box-sizing: border-box;
  // font-size: 0.3rem;
  // height: 0.65rem;
  // font-size: 0.35rem;
  // line-height: 0.6rem;
  border: 1px solid transparent;
  outline: none;
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

  color: #ffffff;
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

.home-box {
  .head-btn {
    margin: 10px 0px;
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
    background-color: #740aaa;
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
  .box-bottom .el-button {
    width: 100%;
    background: linear-gradient(to right, #654bfc, #9e4bfc);
    color: white;
    font-size: 0.55rem;
    text-align: center;
    border-radius: 0px;
    height: 0.9rem;
    box-sizing: border-box;
    border: 0px;
    letter-spacing: 2px;
  }
}
</style>

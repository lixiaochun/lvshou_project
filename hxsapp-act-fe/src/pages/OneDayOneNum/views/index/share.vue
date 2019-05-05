<template>
  <div class="wrapper ">
    <div class="img-box">
      <img v-for="(item, key) in imgLists" :key="key" :src="item.src">
    </div>
    <!-- <a  class="tocell" @click="addButtom()">
      <img src="../../asstes/images/img21.png">
      <h5 class="head-title">下载好享瘦APP马上参与</h5>
    </a> -->


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
import { LsShare } from 'Utils/common'
import LvshouFetch from 'Api/common';

export default {
  name: 'index',
  data() {
    return {
      imgLists: [
        { src: require('../../asstes/image/s_1.png') },
        { src: require('../../asstes/image/s_2.png') },
        { src: require('../../asstes/image/s_3.png') },
        { src: require('../../asstes/image/s_4.png') },
        { src: require('../../asstes/image/s_5.png') },
        { src: require('../../asstes/image/s_6.png') },
        { src: require('../../asstes/image/s_7.png') },
        { src: require('../../asstes/image/s_8.png') },
      ]
    }
  },
  components: {},
  created() { },
  mounted: function () { },
  methods: {
    addButtom() {
      window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=575';
    }

  }
}

</script>
<style lang="less" scoped>
  body {
    background-clip: white !important; 
    background-color: #ffffff !important;
  }
  html{
    background-color: #ffffff !important;
  }
  .wrapper {
    img {
      font-size: 0px;
      width: 100%;
      height: auto;
      font-size: 0 !important;
    }
    html{
      background-color: #ffffff !important;
    }
    .img-box {
      margin-bottom: 0px;
      font-size: 0 !important;
    }
    .tocell {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0px;
      font-size: 0 !important;
      bottom: -7px;
      background-color: #10987a;
    }
    .head-title{
      position:absolute;
      top: 50%;
      left: 50%; 
      transform: translate(-50%,-50%);
       margin: 0rem;
    color: white;
    font-size: 0.41rem;
    line-height: 0.41rem;
    }
  }
  </style>
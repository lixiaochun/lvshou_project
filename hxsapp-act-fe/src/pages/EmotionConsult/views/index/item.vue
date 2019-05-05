<template>
    <div class="wrapper  emotion-div">
      <div class="img-box" >
        <img v-for="(item, key) in imgLists" :key="key" :src="item.src">
      </div>
      
      <div class="tocell  flex-c">
        <img src="../../asstes/image/button_l.png" @click="consultant">
        <a :href="number" >
          <img src="../../asstes/image/button_r.png">
       </a>
      </div>
    </div>
  </template>
  
  <script>
  import {urlGet, LsShare,isApp,getHxsAppVersion,compareAppVersion} from 'Utils/common'
  import LvshouFetch from 'Api/common';
  export default {
    name: 'index',
    data() {
      return {
        baseInformation: {
            act_id: urlGet('id'),
            sess_token: urlGet('sess_token'),
            utime: urlGet('utime'),
            sign: urlGet('sign'),
            id: parseInt(urlGet('name_id') ),
          },
          imgLists:[],
          number:"",
        imgLists1: [
          { src: require('../../asstes/image/1_1.png') },
          { src: require('../../asstes/image/1_2.png') },
          { src: require('../../asstes/image/1_3.png') },
          { src: require('../../asstes/image/1_4.png') },
        ],
        imgLists2: [
          { src: require('../../asstes/image/2_1.png') },
          { src: require('../../asstes/image/2_2.png') },
          { src: require('../../asstes/image/2_3.png') },
          { src: require('../../asstes/image/2_4.png') },
        ],
        imgLists3: [
          { src: require('../../asstes/image/3_1.png') },
          { src: require('../../asstes/image/3_2.png') },
          { src: require('../../asstes/image/3_3.png') },
          { src: require('../../asstes/image/3_4.png') },
        ]
      }
    },
    created() {
      //this.getBaseInfo();
      var that=this;
      if(that.baseInformation.id==1){
        that.imgLists=that.imgLists1;
        that.number="tel://02028189573"
      }else if(that.baseInformation.id==2){
        that.imgLists=that.imgLists2;
        that.number="tel://02028189572"
      }else{
        that.imgLists=that.imgLists3;
        that.number="tel://02028189687"
      }
    },
    methods: {
      
      consultant(){
        debugger;
          var that = this;
          let appVersion = getHxsAppVersion();
          let isTrue = compareAppVersion(appVersion, '3.1.1');
          var serviceOpenimAccount;
          var service_openim_account="";
          var nickname="";
          if(that.baseInformation.id==1){
              service_openim_account="brm-110354224765685";
              nickname="hxsqg1";
          }else if(that.baseInformation.id==2){
              service_openim_account="brm-110354224765684";
              nickname="hxsqg2";
          }else{
              service_openim_account="brm-110354224765683";
              nickname="hxsqg3";
          }
          if (isTrue || appVersion === '3.1.1') {
            serviceOpenimAccount =
              'https://hxsapp_openim_page?service_id=' + service_openim_account + '&title=' +nickname;
          } else {
            serviceOpenimAccount ='https://hxsapp_openim#' + service_openim_account;
          }
          window.location.href = serviceOpenimAccount;
        }
    }
  }
  </script>
  
  <style lang="less" scoped>

  .wrapper {
    background-color: #740aaa;
    img {
      font-size: 0px;
      width: 100%;
      height: auto;
      font-size: 0 !important;
    }
    .flex-c{
      display: flex;
      align-items: center;
    }
    .flex-c>*{
      flex: 1;
      width: 50%;
    }
    .img-box {
      margin-bottom: 60px;
      font-size: 0 !important;
    }
    .tocell {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0px;
      font-size: 0 !important;
      bottom: -7px;
      background-color: white;
    }
  }
  </style>
  
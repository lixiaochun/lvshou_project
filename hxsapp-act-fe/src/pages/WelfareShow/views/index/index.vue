<template>
  <div class="WareFareShowCom">
     <ls-loading></ls-loading>
     <div class="lvimage">
          <div><img :src="imgTop" ></div>
          <div class="lvimageList">
               <img :src="imgMidOne" alt="左旋肉碱">
               <a href="javascript:;" @click="Producttomin"><img :src="imgMidBtn" alt="咨询领取"></a>
          </div>
          <div class="lvimageList">
               <img :src="imgMidTwo" alt="智能体脂秤">
               <a href="javascript:;" @click="Producttomin"><img :src="imgMidBtn" alt="咨询领取"></a>
          </div>
          <div class="lvimageList">
               <img :src="imgMidThree" alt="智能手环5">
               <a href="javascript:;" @click="Producttomin"><img :src="imgMidBtn" alt="咨询领取"></a>
          </div>
          <div class="lvimageList">
               <img :src="imgMidFour" alt="智能跑鞋">
               <a href="javascript:;" @click="Producttomin"><img :src="imgMidBtn" alt="咨询领取"></a>
          </div>
          <div><img :src="imgMidImg"></div>
     </div>
     <div class="ware_fixedBottom" @click="Producttomin"><img :src="footerImage"></div>
     <popup :popShow="popShow" :serviceOpen="service_openim_account" :nickName="nickname" ref="popup" @showPopup="ProductConsultBtn"></popup>
  </div>
</template>

<script>
import axios from 'axios';
import popup from "./pop.vue";
import {urlGet,getHxsAppVersion,compareAppVersion} from 'Utils/common';
import { Toast } from 'mint-ui';
export default {
  name: 'index',
  data() {
    return {
      popShow:false,
      service_openim_account:null,
      nickname: "瘦身小秘书",
      imgTop:require('../../assets/image/top_1.png'),
      imgMidOne:require('../../assets/image/top_2.png'),
      imgMidTwo:require('../../assets/image/top_3.png'),
      imgMidThree:require('../../assets/image/top_4.png'),
      imgMidFour:require('../../assets/image/top_5.png'),
      imgMidImg:require('../../assets/image/top_6.png'),
      imgMidBtn:require('../../assets/image/btn_1.png'),
      footerImage:require('../../assets/image/btn_down.png'),
    }
  },
  components:{
    popup
  },
  created() {
    document.title = '口令福利专区'
   this.getData();
  },
  mounted() {
  },
  methods: {
    getData(){
      var _this = this;
      let IMjson={
        sess_token:urlGet('sess_token')
      }
      axios.get('https://api.hxsapp.com/account/userAccount/getOpenIMAccount',{
        params:IMjson
      }).then(res =>{
        if(res.data.code =='200' && res.data.data.service_openim_account){
          _this.service_openim_account=res.data.data.service_openim_account;
          let json={
            chat_account:_this.service_openim_account
          };
          axios.get('https://api.hxsapp.com/account/UserInfo/getChatInfoByChatAccount',{
            params:json
          }).then(resp =>{
            if(resp.data.data){
              _this.nickname = resp.data.data[_this.service_openim_account].nickname;
            }
          });
        }
      })

    },
    ProductConsultBtn(){
      var _this = this;
      if(!urlGet('sess_token')){
        window.location.href='https://hxsapp_showloginpage';
        return false;
      }
      let appVersion = getHxsAppVersion();
      let isTrue = compareAppVersion(appVersion,'3.1.1');
      var serviceOpenimAccount;
      if(!_this.service_openim_account){
        Toast('接口异常，稍后再试');
        return;
      }
      if(isTrue || appVersion == '3.1.1'){
        serviceOpenimAccount = 'https://hxsapp_openim_page?service_id=' + _this.service_openim_account + '&title=' + _this.nickname;
      }else{
        serviceOpenimAccount = 'https://hxsapp_openim#' + _this.service_openim_account;
      }
      window.location.href = serviceOpenimAccount;
      setTimeout(function(){
        _this.$refs.popup.hide();
      },1000)
    },
    Producttomin(){
      var _this = this;
      this.$refs.popup.show();
      setTimeout(function(){
       _this.ProductConsultBtn();
      },2000)
    }
    
  }
}
</script>
<style lang="less" scoped>
html, body{font-size: 0px !important;}
body{font-size: 0px !important;}
.WareFareShowCom{ background: #F9E45B;padding-bottom: 2.5rem;}
.ware_fixedBottom{position:fixed; left:0;bottom: 0.5rem; right:0; width:100%;}
.WareFareShowCom img{ width:100%;vertical-align:top;}
.lvimageList{ position:relative; width:100%;}
.lvimageList a{ position:absolute; top:0.8rem; right:0.4rem; width:2.13333rem; height:2.13333rem;}
</style>

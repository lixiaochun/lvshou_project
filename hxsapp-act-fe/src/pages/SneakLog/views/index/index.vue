<template>
  <div class="SneakLogCom">
     <ls-loading></ls-loading>
     <div class="SneakBom">
          <div><img :src="imgBg"></div>
          <div class="SneakBtn"><a @click="imgFun" href="javascript:void(0)"><img :src="imgBtn"></a></div>
     </div>
     <div class="Sneak_fixedBottom">
          <a href="javascript:void(0)" @click="SneakToHome"><img :src="footer_index"></a>
          <a href="javascript:void(0)" @click="ProductConsultBtn"><img :src="footer_tation"></a>
     </div> 
  </div>
</template>

<script>
import axios from 'axios';
import {urlGet,getHxsAppVersion,compareAppVersion} from 'Utils/common';
import { Toast } from 'mint-ui';
export default {
  name: 'index',
  data() {
    return {
      popShow:false,
      service_openim_account:null,
      imgBg:require('../../assets/image/sneak_bg.jpg'),
      imgBtn:require('../../assets/image/lookBtn.png'),
      footer_index:require('../../assets/image/footer_index.png'),
      footer_tation:require('../../assets/image/footer_tation.png')
    }
  },
  components:{
  },
  created() {
    document.title = '智能体脂秤'
   this.getData();
  },
  mounted() {
  },
  methods: {
    imgFun(){
      var _this = this;
      window.location.href='https://app.hxsapp.com/hxsweb/newShopDetail/bodycardio?sess_token=' + urlGet('sess_token');
    },
    SneakToHome(){
      var _this = this;
      window.location.href='https://hxsapp_home_page';
    },
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
    }
  }
}
</script>
<style lang="less" scoped>
html, body{font-size: 0px !important;}
body{font-size: 0px !important;}
.SneakBom{ width: 100%;}
.SneakLogCom img{ width:100%; display:block;}
.SneakBtn{ position: absolute; left:0.466666rem; top: 3.73333rem; width: 3.013333rem;}
.Sneak_fixedBottom{position:fixed; left:0;bottom: 0; right:0; width:100%;}
.Sneak_fixedBottom a{ display: block; float: left; width: 50%; margin: 0; padding: 0;}
</style>

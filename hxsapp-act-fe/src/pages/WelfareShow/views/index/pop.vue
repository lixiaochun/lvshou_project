<template>
  <transition name="fade">
  <div v-show="flagShow" class="result">
      <div class="flagMid">
          <p>您的专属口令为006</p>
          <p>正在为你连线顾问<em class="circle01">•</em><em class="circle02">•</em><em class="circle03">•</em></p>
      </div>
  </div>
  </transition>
</template>

<script>
import axios from 'axios';
import {urlGet,getHxsAppVersion,compareAppVersion} from 'Utils/common';
import { Toast } from 'mint-ui';
export default {
  props:{
    popShow:{
      type:Boolean
    },
    serviceOpen:{
      type:String
    },
    nickName:{
      type:String
    }
  },
  data () {
    return {
      flagShow:false
    }
  },
  mounted() {
    var _this = this;
    
  },
  methods:{
    show(){
      this.flagShow = true;
    },
    hide(){
      this.flagShow = false;
    }
  }
}
</script>
<style lang="less" scoped>
.gradient(@angle:top,@start:#000,@stop:#ff050e){
  /*! autoprefixer: off */
  background: -webkit-linear-gradient(@angle,@start,@stop);
  /* autoprefixer: on */
  background: -moz-linear-gradient(@angle,@start,@stop);
  background: -o-linear-gradient(@angle,@start,@stop);
  background: linear-gradient(@angle,@start,@stop);
}
.result{
  position: fixed; left: 0; top: 0; bottom: 0; right: 0; width: 100%; height:100%; z-index: 9963; overflow:hidden;
.gradient(top,#F4F0FE,#E7EFFE);
display:-webkit-box; 
display:-ms-flexbox; 
/*! autoprefixer: off */
display:-webkit-flex; 
/* autoprefixer: on */
display:flex; 
/*! autoprefixer: off */
-webkit-box-pack:center; 
/* autoprefixer: on */
-ms-flex-pack:center; 
/*! autoprefixer: off */
-webkit-justify-content:center; 
/* autoprefixer: on */
justify-content:center; 
/*! autoprefixer: off */
-webkit-box-align:center; 
/* autoprefixer: on */
box-align:center;
-ms-flex-align:center;
/*! autoprefixer: off */
-webkit-align-items:center;
/* autoprefixer: on */ 
align-items:center; font-size:0.4266666rem;
}
.result p{ margin:0; padding:0;}
.result p em.circle01{-webkit-animation: flash 2s ease 0s infinite both;}
.result p em.circle02{-webkit-animation: flash 2s ease 0.5s infinite both;}
.result p em.circle03{-webkit-animation: flash 2s ease 0.8s infinite both;}
.result.fade-enter-active,.result.fade-leave-active{transition:all 0.2s linear;transform:translate3d(0,0,0)}
.result.fade-enter,.result.fade-leave-to{opacity:0;transform:translate3d(100%,0,0)}
/*! autoprefixer: off */
@-webkit-keyframes flash{
  0%,50%,100%{opacity:1}
  25%,75%{opacity:0}
}
/* autoprefixer: on */ 
@keyframes flash{
  0%,50%,100%{opacity:1}
  25%,75%{opacity:0}
}

</style>

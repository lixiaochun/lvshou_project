<template>
  <div class="staticPageJianfei" v-if="imgUrl && imgUrl.length" ref="container">
    <div v-for="(data,index) in imgUrl " :key="index">
      <img v-lazy="data" lazy="loading" />
    </div>

    <img class="kefu" src="./../assets/img/kefu_btn@3x.png" @click="clickKefuBtn" />
    

    <div class="popupDownLoad" v-if="isPopupDownLoad">
      <div class="share-down">
        <div class="bg"></div>
        <div class="share-cont">
          <span>
            绿瘦减肥训练营咨询热线
          </span>
          <span class="tip">
              <a href="tel:400-6036-331">400-6036-331</a>
          </span>
          
          <span>
            减肥顾问微信
          </span>
          <span class="codeBtn" :data-clipboard-text="wxNumber">
            {{wxNumber}}
          </span>
          

          <div class="cancel" @click="cancelBtn()"></div>


        </div>
      </div>
    </div>

    <preLoading v-if="!imgUrl.length"></preLoading>

    <downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>

  </div>
</template>

<script>
import commonJs from '@/util/common.js'

import Vue from 'vue';
import { Toast } from 'mint-ui'
import Clipboard from "clipboard";
// 初始化loadding的组件
import preLoading from "@/components/preLoading"
import downToLinkedMe from "@/components/downToLinkedMe"

export default {
  name: 'staticPageJianfei',
  data() {
    return {
      linkedMe:null,
      imgUrl: [],
      isPopupDownLoad:false,
      wxNumber: 'lsjfy01'
    }
  },
  created() {
      //点击复制到粘贴板
      this.clipboard();

    var _this = this;
    for (var i = 2; i < 28; i++) {
      var str1 = 0;
      // var isPng = ".png";
      // if ( i == 2 || i == 15){
      //   isPng = ".jpg";
      // }

      if (i >= 10) {
        str1 = ""
      }
      _this.imgUrl.push(
        require("@/assets/img/JianfeiXunlian/jianfei_" + str1 + parseInt(i) + ".jpg" )
      )
    }
  },
  mounted() {
    // 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if( !this.isApp ){
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      var __url = commonJs.config.prefixUrl+ "staticPageJianfei"
			
      this.linkedMe = {
        params:{
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          "key": "hxsapp://web?url="+ __url
        }
      }
    }

    this.setShareContent()
  },

  components: {
    preLoading,
    downToLinkedMe
  },

  computed: {
    isLogin: function() {
      return commonJs.isLogin()
    },
    isApp: function() {
      return commonJs.isApp()
    }
  },

  methods: {
  clipboard(){//点击复制到粘贴板
      var _this = this;
      var isClick = false;//复制限制提示语间隔 (配合setTimeout使用)
      var clipboard = new Clipboard('.codeBtn');

    clipboard.on('success', function(e) {
          clipboardToast('复制成功');
    });

    clipboard.on('error', function(e) {
      alert(3);
          clipboardToast('请长按拷贝');
    });

      function clipboardToast(msg){//点击复制回调信息提示
          if(!isClick){
        isClick = true;
            Toast({
           message: msg,
           duration: 1000
        });

        setTimeout(()=>{
          isClick = false;
        },1000);
          }
      }
    },
    cancelBtn() {
      this.isPopupDownLoad = false;
    },

    clickKefuBtn() {
      // alert("clickKefuBtn")
      this.isPopupDownLoad = true;

      var jsonMar = {
				access_occurred_type: 210407,//发生访问的【页面】类型
				access_occurred_type_id: "",//发生访问的【页面】类型ID
				previous_event_type_obj: '',//【事件】对象类型
				previous_event_type_obj_id: '',//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			};
			commonJs.buriedPoint(jsonMar)

    },
    //H5通知客户端显示分享数据
    setShareContent() {

      // 减肥训练营：
      // 1.标题：健康减脂月瘦18-35斤丨绿瘦-减肥训练营
      // 2.正文：加入我们和小伙伴一起瘦成最美好的模样，重新定义自己

      var shareTitle = encodeURIComponent("健康减脂月瘦18-35斤丨绿瘦-减肥训练营");

      var shareLink = commonJs.config.prefixUrl + 'staticPageJianfei' + '?displayThumbBtn=1';

      
      var shareImages = require("@/assets/img/share/xunlianying.png");
      //分享描述
      var shareDescr = encodeURIComponent("加入我们和小伙伴一起瘦成最美好的模样，重新定义自己");
      
      var shareArticleId = "";
      var shareType = "staticPageJianfei";
      // var shareType = 0;
      var shareMediaLink = "";

      var shareActWindowTitle = "";
      var shareActWindowDescr = "";

      
      var shareData = {
        shareTitle,
        shareLink,
        shareImages,
        shareDescr,
        shareArticleId,
        shareType,
        shareMediaLink,
        shareActWindowTitle,
        shareActWindowDescr
      }

      this.initShare(shareData)
    },

    // app右上角分享
    initShare(shareData) {
      var jsonMar = {
        access_occurred_type: 210406,//发生访问的【页面】类型
        access_occurred_type_id: "",//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      };

      if (this.isApp) {
        // debugger
        console.log(shareData)
        window.hxsapp_visible_share_btn_mar = function(){
          commonJs.buriedPoint(jsonMar)
				}

        commonJs.h5CallAppAction.hxsapp_visible_share_btn(shareData)
      } else {

        //二次分享－微信下
        // setShareContent
        // seconDaryShare(decodeURIComponent(Info.title), decodeURIComponent(Info.desc), Info.link, Info.img, data.appId, data.timestamp, data.noncestr, data.signature);
        var title = shareData.shareTitle;
        var desc = shareData.shareDescr;
        var link = shareData.shareLink;
        var img = shareData.shareImages;

        commonJs.outSideShare({
          title,
          desc,
          link,
          img
        });
      }
    },
  },
  
  beforeDestroy() {
		console.log("beforeDestroy-log")
		window.hxsapp_visible_share_btn_mar &&  delete window.hxsapp_visible_share_btn_mar;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.staticPageJianfei {
  width: 100%;
  margin: 0 auto;
  img {
    width: 100%;
    display: block;
    height: auto;
  }
  img[lazy=loading] {
    display: block;
    height: auto;
    width: 100%;
    background-image: url("./../assets/img/bg_750_230@3x.png");
    height: 120px;
    background-size: 100% 100%;
  }
  .kefu {
    display: block;
    position: fixed;
    top: 50%;
    width: 65px;
    height: 70px;
    margin-top: -40px;
    right: 0;
    z-index: 10;
  }

  .popupDownLoad {

    .share-down {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
    }
    .share-down .bg {
      width: 100%;
      height: 100%;
      background: #333;
      opacity: 0.3;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
    }

    .share-down .share-cont {
      box-sizing: border-box;
      padding-top: 100px;
      width: 275px;
      height: 360px;
      background-size: 275px;
      position: absolute;
      left: 50%;
      top: 50%;
      background: #fff;
      border-radius: 10px;
      margin-left: -137px;
      margin-top: -180px;
      z-index: 10001;
    }

    .share-down .share-cont span {
      margin-top: 25px;
      display: block;
      width: 100%;
      font-size: 18px;
      height: 24px;
      line-height: 24px;
      color: #333;
      text-align: center;
    }
    .share-down .share-cont span.tip a,.share-down .share-cont span.tip{
      margin-top: 5px;
      font-size: 16px;
      color: #999;
    }

    .share-down .share-cont .confirm {
      margin: 15px auto 0;
      width: 130px;
      text-align: center;
      height: 35px;
      line-height: 35px;
      border-radius: 20px;
      background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
      border: 1px solid #FF68B0;
      color: #fff;
    }
    .codeBtn{
      cursor: pointer;
    }
    .share-down .share-cont .cancel {
      position: absolute;
      top: -15px;
      right: -15px;
      width: 35px;
      height: 35px;
      background: url(./../assets/img/close@2x.png) left top no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>

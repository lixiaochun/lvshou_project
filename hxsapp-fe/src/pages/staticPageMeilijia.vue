<template>
  <div class="staticPageMeilijia" v-if="imgUrl && imgUrl.length" ref="container">
    <div v-for="(data,index) in imgUrl " :key="index">
      <img v-lazy="data" lazy="loading" />
    </div>

    <preLoading v-if="!imgUrl.length"></preLoading>
    <downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>

  </div>
</template>

<script>
import commonJs from '@/util/common.js'
// 初始化loadding的组件
import preLoading from "@/components/preLoading"
import downToLinkedMe from "@/components/downToLinkedMe"

export default {
  name: 'staticPageMeilijia',
  data() {
    return {
      linkedMe:null,
      imgUrl: []
    }
  },
  created() {
    var _this = this;
    for (var i = 0; i < 20; i++) {
      var str1 = 0;
      var isPng = ".png";
      if ( i == 0 || i == 6 || i == 8 || i == 11 || i == 13 || i == 15 || i == 17 || i == 19){
        isPng = ".jpg";
      }
      if (i >= 9) {
        str1 = ""
      }

      _this.imgUrl.push(
        require("@/assets/img/MeilijiaHuiyuan/huiyuan_" + str1 + ( parseInt(i) + 1) + isPng )
      )
    }
  },
  mounted() {
    // 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if( !this.isApp ){
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      var __url = commonJs.config.prefixUrl+ "staticPageMeilijia"
			
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
    //H5通知客户端显示分享数据
    setShareContent() {
      // 美丽家：
      // 1.标题：每月15日贵宾专属秒杀日，权益更多尽在“美丽家”丨绿瘦-美丽家会员
      // 2.正文：生日礼遇、大客户专享日、节日祝福、优惠券赠送、专属活动体验...美丽家邀您共享生活，打造美丽与自信

      var shareTitle = encodeURIComponent("每月15日贵宾专属秒杀日，权益更多尽在“美丽家”丨绿瘦-美丽家会员");

      var shareLink = commonJs.config.prefixUrl + 'staticPageMeilijia' + '?displayThumbBtn=1';

      // require("@/assets/img/share/huiyuan.png")
      var shareImages = require("@/assets/img/share/huiyuan.png")

      //分享描述
      var shareDescr = encodeURIComponent("生日礼遇、大客户专享日、节日祝福、优惠券赠送、专属活动体验...美丽家邀您共享生活，打造美丽与自信");
      var shareArticleId = "";
      var shareType = "staticPageMeilijia";
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
      if (this.isApp) {
        // debugger
        console.log(shareData)
        window.hxsapp_visible_share_btn_mar = function(){
          var jsonMar = {
            access_occurred_type: 210409,//发生访问的【页面】类型
            access_occurred_type_id: "",//发生访问的【页面】类型ID
            previous_event_type_obj: '',//【事件】对象类型
            previous_event_type_obj_id: '',//【事件】对象类型ID
            previous_content_sort: ''//【事件】事件参数
          };
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
.staticPageMeilijia {
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
}
</style>

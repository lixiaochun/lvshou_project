<template>
  <div class="home">
    <preloading v-if="!userId"></preloading>
    <div class="top">
      <div id="result1"><img class="mark1" :src="result1"></div>
      <div><img class="mark1" :src="result2"></div>
      <div style="position:relative">
        <img class="mark1" :src="result3">
        <div class="download" id="downloadBtn"><a class="linkedme" href="https://lkme.cc/uFD/0Rg39FxUM">去看看</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import preloading from "@/components/preLoading";

import axios from "axios";

import commonJs from "@/util/common.js";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      result1: require("../assets/img/outSign/result_02.jpg"),
      result2: require("../assets/img/outSign/result_03.jpg"),
      result3: require("../assets/img/outSign/result_04.jpg"),
      outSignCodeStatus: false,

      // 用户ID
      userId: null,
      // 第三方linkedme的接入数据
			linkedMe:null
    };
  },
  computed:{
    isApp: function() {
			return commonJs.isApp()
		}
  },
  created() {},
  components: {
    preloading
  },
  mounted() {
    var _this = this;
    _this.userId = _this.$route.params.userId;
    var t_img;
    var isLoad = true;
    $(".home").css({ backgroundColor: "#FE95CD" });
    if( !this.isApp ){
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      this.linkedMe = {
        domId:'downloadBtn',
        domText:'去查看',
        params:{
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          "key": "hxsapp://home"
        }
      }
      
    }
    _this.download();
    isImgLoad(function() {
      //图片加载完毕
      _this.$nextTick(() => {
        document.title = "输口令领礼品活动";
        
        _this.getUserInfo();

        function adjuest() {
          var windowH = $(window).height();

          var topHeight = $(".top").height();

          if (windowH > topHeight) {
            $("#result1").css({ paddingTop: windowH - topHeight + "px" });
          }
        }

        adjuest();

        window.onresize = adjuest;
      });
    });
    // 判断图片是否加载完毕
    function isImgLoad(callback) {
      $("img").each(function() {
        if (this.height === 0) {
          isLoad = false;
          return false;
        }
      });
      if (isLoad) {
        clearTimeout(t_img);
        callback();
      } else {
        isLoad = true;
        t_img = setTimeout(function() {
          isImgLoad(callback);
        }, 500);
      }
    }
  },
  methods: {
    getUserInfo() {
      //获取用户信息
      var _this = this;
      axios
        .get("https://api.hxsapp.com/account/userInfo/getUserInfo", {
          params: {
            user_id: _this.userId
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data[_this.userId];

            //组合用户信息
            _this.userInfo = {
              name: commonJs.subStlength(data.nickname),
              headImg: data.head_img
            };

            //页面设置标题
            commonJs.setTitle(_this.userInfo.name + "邀请你注册好享瘦");

            //微信分享
            commonJs.outSideShare({
              title: _this.userInfo.name + "邀你一起来变瘦！",
              desc: "多重豪礼送不停，赶快来体验吧！",
              link: "https://app.hxsapp.com/hxsweb/invitation/" + _this.userId,
              img: "https://app.hxsapp.com/static/wechat_invite.png"
            });
          }
        })
        .catch(function(error) {
          console.log(error)
          Toast("接口繁忙，请稍后再试");
        });
    },
    download() {
      if(this.linkedMe && this.linkedMe.params){
				commonJs.linkedMe( this.linkedMe)
			}
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="less">
// @import '../assets/less/bass.less';

.home {
  height: 100%;
  width: 100%;
  position: relative;
  .mark1 {
    width: 100%;
    display: block;
    pointer-events: none;
  }
  #downloadBtn {
    background-color: #fedf0c;
    color: #eb404e;
    position: absolute;
    border: none;
    width: 42.67%;
    font-size: 24px;
    height: unit(96/30, rem);
    border-radius: 8px;
    top: 35.74%;
    left: 50%;
    transform: translate(-50%, 0%);
    text-align:center;
    line-height:unit(96/30,rem);
    .linkedme{
      color: #eb404e;
      display:inline-block;
      text-align:center;
    }
  }
}

</style>

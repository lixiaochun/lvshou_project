<template>
  <div class="aliyunPlayer alyPlayer">

    <div id="J_prismPlayer" class="prism-player" style="display:none;"></div>
    <div class="network-tip netWork" v-if="0" style="display:none;">
      <p>温馨提示: 当前您正在使用非WiFi网络,继续观看将会消耗流量</p>
      <a href="javascript:;">继续观看</a>
    </div>
    <div class="text">
      {{text}}
    </div>
  </div>
</template>

<script>

window.PLAYER = null;

import Vue from 'vue'
// import $ from 'jquery'
import axios from 'axios'
import commonJs from '@/util/common.js'

function jPrismPlayerStyle() {
  $('.playerDiv_none').css({
    height: playerHeight,
    display: 'block'
  });

  $('.prism-controlbar-bg').css({
    'height': $(".prism-controlbar").height() + 'px',
  });

  $('.prism-play-btn').css({
    'float': 'left',
    'margin-left': $(".prism-controlbar").height() / 2 - ($('.prism-play-btn').height() / 2) + 'px',
    'margin-right': '10px',
    'margin-top': $(".prism-controlbar").height() / 2 - ($('.prism-play-btn').height() / 2) + 'px'
  });

  $('.new-prism-play-btn').css({
    'width': '35px',
    'height': '35px',
    'position': 'absolute',
    'left': '12px',
    'margin-right': '10px',
    'top': '15px'
  });

  $('.prism-play-btn.playing').css({
    'float': 'left',
    'margin-left': '12px',
    'margin-right': '10px',
    'margin-top': '15px'
  });

  $('.prism-time-display').css({
    'float': 'left',
    'margin-left': '0',
    'margin-top': $(".prism-controlbar").height() / 2 - ($(".prism-time-display").height() / 2) + 'px'
  });

  $('.prism-fullscreen-btn').css({
    'float': 'right',
    'margin-left': '5px',
    'margin-right': '5px',
    'margin-top': $(".prism-controlbar").height() / 2 - ($('.prism-fullscreen-btn').height() / 2) + 'px'
  });

  //播放按钮居中
  $('.prism-big-play-btn').css({
    left: '50%',
    top: '50%',
    bottom: 'auto',
    'margin-left': '-' + ($('.prism-big-play-btn').width() / 2) + 'px',
    'margin-top': '-' + ($('.prism-big-play-btn').width() / 2) + 'px'
  });

  //时间容器变长
  var playerHeight = $(window).width() * 0.5625;
  var prismTimeWidth = $(window).width() - ($('.prism-play-btn').width() + 12 + 10) - ($('.prism-fullscreen-btn').width() + 11 + 11);
  $('.prism-time-display').css({
    width: prismTimeWidth
  });
  $('.playerDiv_none').css({
    height: playerHeight
  });

  var prismControlbarWidth = $('.prism-time-display').width() - (30 + 7 + 30 + 7 + 2);
  $('.prism-progress').css({
    width: prismControlbarWidth
  });

  $('.prism-player .prism-progress').css({
    left: ($('.prism-play-btn').width() + 12 + 10 + 39 - 4),
    top: $(".prism-controlbar").height() / 2 - ($(".prism-progress").height() / 2) - 5 + 'px'
  });

  $('.time-bound').html('');
  $('.time-bound').css({
    display: 'none'
  });
}

//非wifi网络,展示网络提示 wifi other none
function netWorkState(State) {
  if (State == 'other') {
    $('.netWork').show();
  } else {
    $('.new-prism-play-btn').hide();
    player.play();
    $('.prism-player .prism-fullscreen-btn').show();
    if (clickTrue && !type) {
      $('#J_prismPlayer').attr('state', '1');
      clickTrue = false;
    }
  }
}

//绑定视频播放器上的按钮js事件
function playerCount(_this,obj) {
  
  $(obj).on("click", function() {
    console.log(PLAYER)
    
    if (clickTrue ) {
      $('.prism-player .prism-fullscreen-btn').show();

      clickTrue = false;
    }
  })
}

window.clickTrue = true;

export default {
  name: 'aliyunPlayer',
  data() {
    return {
      // isShow: false
    }
  },
  props: {
    pageSoure:{
      type: String,
      default: "default"
    },
    text: {
      type: String,
      default: "拼命加载中..."
    },
    media_id: {
      type: String,
      default: "0"//默认为0 就是不发请求到接口计数
    },
    sourceUrl: {
      type: String,
      required: true
    },
    coverUrl: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      default: (cb) => {
        console.log("默认的函数callback执行")
        cb && cb();
      }
    }
  },
  computed: {
    isLogin: function() {
      return commonJs.isLogin()
    },
    isApp: function() {
      return commonJs.isApp()
    }
  },
  mounted() {
    var _this = this;
    
    // debugger
    //视频播放器
    var playerHeight = $(window).width() * 0.5625;

    $(".aliyunPlayer").css({
      height: playerHeight + "px"
    })
    $(".aliyunPlayer .text").css({
      "line-height": playerHeight + "px"
    })

    setTimeout(() => {

      this.$nextTick(() => {

        // debugger
        var __cover = process.env.NODE_ENV != 'production' ? 'https://img30.360buyimg.com/da/jfs/t15241/239/1589565695/141627/2b1b88bb/5a52e75cNd323c9a2.jpg' : this.coverUrl;
        var __source =   process.env.NODE_ENV != 'production' ? "https://act.hxsapp.com/html/psychol/img/birds.mp4" :this.sourceUrl;
        PLAYER = new prismplayer({
          id: 'J_prismPlayer',
          source: __source,
          autoplay: false,
          width: '100%',
          playsinline: true,
          showBuffer: true,
          height: playerHeight + 'px',
          // x5_type:"h5",
          // x5_video_position:"top",
          // controlBarVisibility:"always",
          cover: __cover
        });

        //js设置视频区域的样式
        jPrismPlayerStyle();
        // this.isShow = true;

        //显示视频区域
        $('#J_prismPlayer').show();

        //绑定js事件
        playerCount(_this,'.prism-play-btn');

        playerCount(_this,'.prism-big-play-btn');
        // playerCount('.network-tip a');
        

        // 监听播放器的play事件
        PLAYER.on("play", function() {
          // 将播放状态传给父级
          _this.$emit('playStatus',true);
          console.log("播放器播放啦！");
        });

        // 监听播放器的播放位置发生改变时触发，仅H5播放器
        PLAYER.on("timeupdate", function() {

          console.log("播放器-播放位置发生改变-啦！-timeupdate事件");

          var __getCurrentTime = ( PLAYER.getCurrentTime() ) 
          var __duration = ( PLAYER.tag.duration ) 
          console.log( PLAYER.getCurrentTime(),"__getCurrentTime:"+__getCurrentTime )
          console.log( PLAYER.tag.duration,"__duration:"+__duration )
          console.log( 'parseInt( (__getCurrentTime / __duration ) * 100 ):'+ parseInt( (__getCurrentTime / __duration ) * 100 )  )
        });


        // 监听播放器的pause事件
        PLAYER.on("pause", function() {
          // 将播放状态传给父级
          _this.$emit('playStatus',false);
          console.log("播放器暂停啦！");
        });

        // 监听当前视频播放完毕时触发
        // 文档：https://help.aliyun.com/document_detail/62941.html?spm=5176.doc51991.2.9.h7R1fB
        PLAYER.on("ended", function() {
          console.log("播放器结束啦！");
        })  
        
        // debugger
        this.callback()

        $(".aliyunPlayer .text").remove()
      })
    }, 100)

  },
  methods: {
  },
  beforeDestroy() {
    window.player && delete window.player;
    $('.prism-play-btn').off("click");
    // $('.network-tip a').off("click");
    $('.prism-big-play-btn').off("click");

    PLAYER.off("play");
    PLAYER.off("pause");
    PLAYER.off("timeupdate");
    PLAYER.off("ended");

    delete window.PLAYER
    delete window.clickTrue
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.aliyunPlayer {
  width: 100%;
  height: 200px;
  background: #22253E;
  overflow: hidden;
}

.aliyunPlayer .text {
  width: 100%;
  font-size: 16px;
  color: #C7D0FF;
  text-align: center;
}

.aliyunPlayer #J_prismPlayer {
  position: fixed;
  width: 100%;
  height: 200px;
  top: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
}

.aliyunPlayer.alyPlayer #J_prismPlayer {
  position: relative;
}

.aliyunPlayer .prism-player .prism-big-play-btn {
  width: 55px;
  height: 55px;
  background: url('../assets/img/bofang_icon@2x.png') 0px 0px no-repeat;
  background-size: 100%;
}

.aliyunPlayer .prism-player .prism-play-btn {
  width: 20px;
  height: 20px;
  background: url('../assets/img/bf-sp@2x.png') left top no-repeat;
  background-size: 100%;
  cursor: pointer;
}

.aliyunPlayer .prism-player .new-prism-play-btn {
  width: 20px;
  height: 20px;
}

.aliyunPlayer .prism-player .prism-live-display {
  width: 56px;
  height: 19px;
  background: url('../assets/img/bofang_icon@2x.png') -186px -2px no-repeat;
}

.aliyunPlayer .prism-player .prism-play-btn.playing {
  width: 20px;
  height: 20px;
  background: url('../assets/img/zt-sp@2x.png') left top no-repeat;
  background-size: 100%;
}

.aliyunPlayer .prism-player .prism-fullscreen-btn {
  width: 18px;
  height: 18px;
  background: url('../assets/img/qp-sp@2x.png') left top no-repeat;
  background-size: 100%;
  display: none;
}

.aliyunPlayer .prism-player .prism-fullscreen-btn.fullscreen {
  width: 30px;
  height: 30px;
  background: url('../assets/img/bofang_icon@2x.png') -161px -183px no-repeat
}

.aliyunPlayer .prism-player .prism-volume {
  width: 33px;
  height: 30px;
  background: url('../assets/img/bofang_icon@2x.png') -199px -119px no-repeat;
  display: none;
}

.aliyunPlayer .prism-player .prism-volume.mute {
  width: 33px;
  height: 30px;
  background: url('../assets/img/bofang_icon@2x.png') -164px -151px no-repeat
}

.aliyunPlayer .prism-player {
  background-color: #000;
  position: relative
}

.aliyunPlayer .prism-player .prism-cover {
  width: 100%;
  height: 100%;
  background-color: #000;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0
}

.aliyunPlayer .prism-player .prism-controlbar {
  width: 100%;
  height: 45px;
  position: relative;
  z-index: 2;
  background: url('../assets/img/yy-sp@2x.png') left top repeat-x;
  background-size: 4px;
  display: none;
}

.aliyunPlayer .prism-player .prism-controlbar .prism-controlbar-bg {
  width: 100%;
  height: 50px;
  position: absolute;
  opacity: 0.7;
  background: linear-gradient(-180deg, rgba(82, 90, 133, 0.00) 0%, #262A45 98%);
  bottom: 0;
  left: 0;
  z-index: -1
}

.aliyunPlayer .prism-player .prism-time-display {
  height: 33px;
  line-height: 33px;
  color: #666
}

.aliyunPlayer .prism-player .prism-time-display .current-time {
  color: #fff
}

.aliyunPlayer .prism-player .prism-progress {
  cursor: pointer;
  width: 100%;
  height: 4px;
  background-color: #fff;
  position: relative;
  opacity: 0.6;
  border-radius: 3px;
}

.aliyunPlayer .prism-player .prism-progress .prism-progress-loaded {
  position: absolute;
  top: 0;
  left: 1px;
  width: 0;
  height: 100%;
  background: #C7D0FF;
  border-radius: 3px;
}

.aliyunPlayer .prism-player .prism-progress .prism-progress-played {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #FF9AE2;
  border-radius: 3px;
}

.aliyunPlayer .prism-player .prism-progress .prism-progress-cursor {
  position: absolute;
  width: 6px;
  height: 6px;
  top: -5px;
  left: 0;
  margin-left: -6px;
  background-color: #FF9AE2;
  border: 3px solid #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 0 3px #000;
  box-shadow: 0 0 5px #000;
  overflow: hidden;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

 :-webkit-full-screen {
  width: 100%!important;
  height: 100%!important
}

 :-moz-full-screen {
  width: 100%!important;
  height: 100%!important
}

 :-ms-full-screen {
  width: 100%!important;
  height: 100%!important
}

 :-ms-fullscreen {
  width: 100%!important;
  height: 100%!important
}

 :fullscreen {
  width: 100%!important;
  height: 100%!important;
}

body.prism-full-window {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: auto
}

.prism-fullscreen {
  position: fixed;
  overflow: hidden;
  z-index: 99999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%!important;
  height: 100%!important
}

.aliyunPlayer .now_active {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  top: -25px;
}


/*自定义*/

.aliyunPlayer .prism-time-display .duration {
  color: #fff;
}

.aliyunPlayer .current-time {
  float: left;
  font-size: 12px;
}

.aliyunPlayer .duration {
  float: right;
  font-size: 12px;
}

.aliyunPlayer .time-bound {
  display: none;
}
</style>

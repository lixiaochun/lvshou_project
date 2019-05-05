<template>
  <div class="aliyunPlayer">

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

//app的回调事件
// function netWorkPlay( player, playerHeight, playerJson){
//   $('.prism-controlbar').append('<a href="javascript" class="new-prism-play-btn"></a>');
//   $('.network-tip').css('height',playerHeight);

//   $('.new-prism-play-btn').click(function(){
//       setTimeout(function(){
//           window.location.href = 'https://hxsapp_get_network_state';
//       },30);
//       window.location.href = 'https://hxsapp_set_audio_info#pause';
//   });

//   $('.network-tip').click(function(){
//       $('.new-prism-play-btn').hide();
//       $('.prism-player .prism-fullscreen-btn').show();
//       $('.netWork').hide();
//       player.play();
//   });
// }

//绑定视频播放器上的按钮js事件
function playerCount(_this,obj) {
  
  $(obj).on("click", function() {
    console.log(PLAYER)
    
    if (clickTrue ) {
      $('.prism-player .prism-fullscreen-btn').show();

      // js 点击处理ios端事件的埋点
      var ua = window.navigator.userAgent;
      var isIos = new RegExp('iPhone').test(ua);
      var isIpad = new RegExp('iPad').test(ua);
      var isiPhoneX = new RegExp('iPhone X').test(ua);

      if( isIos || isIpad || isiPhoneX ){
        console.log("js 点击处理ios端事件的埋点")
        // 默认处理文章详情里面的视频播放埋点
        var __article_id = window.ARTICLE_ID;
        var __access_occurred_type = 211110
        
        // 这里处理运动课程的视频播放埋点
        if ( Vue.pageSoure == "newSportsLessonDetail" ){
          __article_id = _this.$route.params.sport_id || window.SPORT_ID;
          __access_occurred_type = 210537
        }else if ( Vue.pageSoure == "sportsLessonDetail" ){
          __article_id = _this.$route.params.course_id || window.COURSE_ID;
          __access_occurred_type = 210537
        }else if ( Vue.pageSoure == "videoSpecial" ){
          __article_id = Vue.article_id;
          __access_occurred_type = 210571
        }
        
        commonJs.buriedPoint({
          access_occurred_type: __access_occurred_type,//发生访问的【页面】类型
          access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        });

        
        if( obj == ".prism-big-play-btn" && ! _this.isPlayProgress_1 ){
          console.log("这里相当于播放了")
          console.log("这里对接关其城的播放进度为0%的播放处理！")
          // debugger
          _this.userViewTrainStatus("start", _this.h5_rescorce() )
          _this.isPlayProgress_1 = true;
        }
      }

      // 由于运动课程的视频组件 不需要添加计数的需求
      if( this.media_id ){
        // 接口请求数据
        let json = {
          media_id: this.media_id
        };
        axios.get('https://api.hxsapp.com/content/media/incrMediaPlay',
          { params: json }
        )
      } 

      clickTrue = false;
    }
  })
}

window.clickTrue = true;

export default {
  name: 'aliyunPlayer',
  data() {
    return {
      isPlayProgress_1:false,
      // 播放进度为90％ 埋点
      isPlayProgress_90:false,

      isShow: false
      // _firstFullscreen:true
    }
  },
  props: {
    pageSoure:{
      type: String,
      default: "default"
    },
    // 调用组件页面的上一个页面的来源标记
    pageSoureParent:{
      type: String,
      default: "default"
    },
    text: {
      type: String,
      default: "拼命加载中..."
    },
    article_id:{
      type: String,
      default: ""
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
    console.log($(window).height())
    console.log(this.$route.params)
    
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
        this.isShow = true;

        // $(".info").css({
        //   "margin-top": playerHeight + "px"
        //   // "height":$(window).height() + "px"
        // })

        // $(".aliyunPlayer").css({
        //   height: playerHeight + "px"
        // })
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
          
          // 默认处理文章详情里面的视频播放埋点
          var __article_id = _this.$route.params.article_id || window.ARTICLE_ID;
          var __access_occurred_type = 211110

          // 这里处理运动课程的视频播放埋点
          if ( _this.pageSoure == "sportsLessonDetail" ){
            __article_id = _this.$route.params.course_id || window.COURSE_ID;
            __access_occurred_type = 210537
          }else if ( _this.pageSoure == "newSportsLessonDetail" ){
            __article_id = _this.$route.params.sport_id || window.SPORT_ID;
            __access_occurred_type = 210537
          }else if ( _this.pageSoure == "videoSpecial" ){
            __article_id = _this.article_id;
            __access_occurred_type = 210571
          }
          
          commonJs.buriedPoint({
            access_occurred_type: __access_occurred_type,//发生访问的【页面】类型
            access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
            previous_event_type_obj: '',//【事件】对象类型
            previous_event_type_obj_id: '',//【事件】对象类型ID
            previous_content_sort: ''//【事件】事件参数
          });

        });

        // 监听播放器的播放位置发生改变时触发，仅H5播放器
        PLAYER.on("timeupdate", function() {

          console.log("播放器-播放位置发生改变-啦！-timeupdate事件");

          var __getCurrentTime = ( PLAYER.getCurrentTime() ) 
          var __duration = ( PLAYER.tag.duration ) 
          console.log( PLAYER.getCurrentTime(),"__getCurrentTime:"+__getCurrentTime )
          console.log( PLAYER.tag.duration,"__duration:"+__duration )
          console.log( 'parseInt( (__getCurrentTime / __duration ) * 100 ):'+ parseInt( (__getCurrentTime / __duration ) * 100 )  )
          // 注意条件
          if (  parseInt( (__getCurrentTime / __duration ) * 100 ) == 1 && _this.pageSoure == "newSportsLessonDetail" && ! _this.isPlayProgress_1 ) {
            _this.userViewTrainStatus("start",_this.h5_rescorce())
            _this.isPlayProgress_1 = true;
          }

          if ( parseInt( (__getCurrentTime / __duration ) * 100 )  >= 90 && _this.pageSoure == "newSportsLessonDetail" && ! _this.isPlayProgress_90 ) {
            console.log("发送播放进度为90％的埋点后端接口－这里对接关其城的接口") 
            _this.userViewTrainStatus('finish',_this.h5_rescorce())
            _this.isPlayProgress_90 = true;

            // 是绿瘦会员的sportsPlan页面 来源的
            if ( Vue.pageSoureParent == "lvshou_sportsPlan"  ){  

              if(_this.$parent.sportSaveRecordData){
                var sportSaveRecordData = _this.$parent.sportSaveRecordData;
                _this.sportSaveRecord( sportSaveRecordData, _this.h5_rescorce())
              }
            }
          }

        });


        // 监听播放器的pause事件
        PLAYER.on("pause", function() {
          // 将播放状态传给父级
          _this.$emit('playStatus',false);
          console.log("播放器暂停啦！");
            // 默认处理文章详情里面的视频播放埋点
          var __article_id = _this.$route.params.article_id || window.ARTICLE_ID;
          var __access_occurred_type = 300601
          
          // 这里处理运动课程的视频播放埋点
          if ( _this.pageSoure == "newSportsLessonDetail" ){
            __article_id = _this.$route.params.sport_id || window.SPORT_ID;
            __access_occurred_type = 300603
          }
          
          if ( _this.pageSoure == "sportsLessonDetail" ){
            __article_id = _this.$route.params.course_id || window.COURSE_ID;
            __access_occurred_type = 300603
          }
          commonJs.buriedPoint({
            access_occurred_type: __access_occurred_type,//发生访问的【页面】类型
            access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
            previous_event_type_obj: '',//【事件】对象类型
            previous_event_type_obj_id: '',//【事件】对象类型ID
            previous_content_sort: ''//【事件】事件参数
          });

        });

        // 监听当前视频播放完毕时触发
        // 文档：https://help.aliyun.com/document_detail/62941.html?spm=5176.doc51991.2.9.h7R1fB
        PLAYER.on("ended", function() {
          console.log("播放器结束啦！");
          commonJs.buriedPoint({
            access_occurred_type: 500002,//发生访问的【页面】类型
            access_occurred_type_id: "",//发生访问的【页面】类型ID
            previous_event_type_obj: '',//【事件】对象类型
            previous_event_type_obj_id: "",//【事件】对象类型ID
            previous_content_sort: ''//【事件】事件参数
          });
        })
        //非wifi提醒视频大小 是否是4g网络
        // var playSize = -1;
        // if(playSize > 0){
        //     $('.network-tip p').text('温馨提示：您正在使用非Wifi网络，播放将消耗约' + parseInt(playSize/1024) + 'M流量');
        // }

        // window.setLayout = function(){    
        //   //设置播放器容器的高度
        //   var height ; //根据实际情况设置高度
        //   PLAYER.el().style.height = height;
        // }
        // window.onresize = function(){
        //   setLayout();
        // }

        // PLAYER.on('requestFullScreen',function(){
        //   if(_this._firstFullscreen){
        //       PLAYER.cancelFullScreen();
        //     _this._firstFullscreen = false;
        //   }else {
        //     let video = $( PLAYER.el()).find('video');
        //     video.addClass('center');
        //   }
        // });

        // PLAYER.on('cancelFullScreen',function(){
        //   let video = $( PLAYER.el()).find('video');
        //   video.removeClass('center');
        // })   
        
        // debugger
        this.callback()

        $(".aliyunPlayer .text").remove()
        
        var __action = this.pageSoure;

        this.$parent.renderVideoCall && this.$parent.renderVideoCall({
          action: __action
        })

      })
    }, 100)

  },
  methods: {
    h5_rescorce(){
      var ua = window.navigator.userAgent;
      var iPhone = new RegExp('iPhone').test(ua);
      var isIpad = new RegExp('iPad').test(ua);
      var isWeixin = new RegExp('MicroMessenger').test(ua);
      var isiPhoneX = new RegExp('iPhone X').test(ua);

      var h5_rescorce = ""
      if(this.isApp){
        h5_rescorce="app_yes"
        if( iPhone ){
          h5_rescorce += "|"+ "ios_yes_iPhone"
        }else if( isIpad ){
          h5_rescorce += "|"+ "ios_yes_iPhone"
        }else  if( isIpad ){
          h5_rescorce += "|"+ "ios_yes_iPhone"
        }else{
          h5_rescorce += "|"+ "ios_no_client"
        }
      }else{
        h5_rescorce="app_no"

        if( isWeixin ){
          h5_rescorce += "|"+ "weixin_yes"
        }else{
          h5_rescorce += "|"+ "weixin_no"
        }

        if( iPhone ){
          h5_rescorce += "|"+ "ios_yes_iPhone"
        }else if( isIpad ){
          h5_rescorce += "|"+ "ios_yes_iPhone"
        }else  if( isIpad ){
          h5_rescorce += "|"+ "ios_yes_iPhone"
        }else{
          h5_rescorce += "|"+ "ios_no_client"
        }
      }

      return h5_rescorce

    },
    // 处理绿瘦会员2.0 运动计划跳过去播放视频的业务埋点处理
    sportSaveRecord(sportSaveRecordData,h5_rescorce){
      if(!this.isApp || !this.isLogin){
        console.log("没有登陆或不在app的，都不放松播放的请求逻辑")
        return;
      }
      // 接口请求数据
			let json = sportSaveRecordData;
      json.h5_rescorce = h5_rescorce;

			console.log(json)
			axios.get('https://slim.hxsapp.com/slim/sport/saveRecord',
				{ params: json }
			).then((res) => {
        console.log(res.data)
				if (res.data.code == 200) {
					// Toast(res.data.msg + res.data.incr_score)
					console.log(res.data.msg)
				}

			}).catch((Error) => {
				console.log(Error)
			})
    },
    // 这是关其诚开发的新训练课程详情的播放埋点
    userViewTrainStatus(status ,h5_rescorce ){
      if(!this.isApp || !this.isLogin){
        console.log("没有登陆或不在app的，都不放松播放的请求逻辑")
        return;
      }
      // 接口请求数据
			let json = {
				sess_token: commonJs.getUrlParam("sess_token"),
				id: this.$route.params.sport_id,
        status:status,
        h5_rescorce:h5_rescorce
			};

			console.log(json)
			axios.get('https://api.hxsapp.com/content/Gymnastics/userViewTrainStatus',
				{ params: json }
			).then((res) => {
        console.log(res.data)
				if (res.data.code == 200) {
					// Toast(res.data.msg + res.data.incr_score)
					console.log(res.data.msg)
				}

			}).catch((Error) => {
				console.log(Error)
			})
    },
    getListData() {
      console.log("getListData-getListData")
    },
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

/*
  .aliyunPlayer .info{
    width: 100%;
    padding: 10px 30px;
    box-sizing: border-box;
  }
  .aliyunPlayer .info .title{
    width: 100%;
    display: block;
    overflow: hidden;
    color: #C7D0FF;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }*/

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

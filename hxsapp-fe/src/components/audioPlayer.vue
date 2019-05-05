<template>
  <div class="audioPlayer">

    <div class="analog-audio-box">
      <div v-show="!media_data" style="'height:' + windowWidth_16_9 + 'px;width:100%;'" >
      </div>
      <div class="analog-audio-box-bg" v-if="media_data && media_data.cover" :style="'height:' + windowWidth_16_9 + 'px'" >
      </div>

      <div class="audio_text" style="display:none;"></div>

      <div class="analog-audio" style="display:none;">

        <span class="loaded_time">00:00</span>
        <div class="bar">
          <i id="speed"></i>
          <em class="fixed_point" id="drag"></em>
        </div>
        <span class="time"></span>

        <div class="btn_box">
          <i class="list_btn" @click="showAudioList()"></i>
          <i class="prev_btn" @click="goPage('prev_btn')"></i>
          <i class="play_btn" id="audio_bg"></i>
          <i class="next_btn" @click="goPage('next_btn')"></i>
        </div>
      </div>
    </div>

    <audio id="audio"></audio>

    <div class="change-background"></div>

  </div>
</template>

<script>

import axios from 'axios'
import { Toast } from 'mint-ui';
// import { MessageBox } from 'mint-ui'
import commonJs from '@/util/common.js'

export default {
  name: 'audioPlayer',
  props: {
    pageSoure: {
      type: String,
      default: "default"
    },
    data: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      // msg: "11",
      windowWidth_16_9:0,
      playAudioListData: [],
      media_data: null
    }
  },

  mounted() {
    if (!this.data) {
      return
    }
    // debugger

    this.windowWidth_16_9 = $(window).width() * 0.5625;

    console.log("initAudio-fun-do -code")

    // 接口请求数据
    let json = {
      type_id: this.data.article_type_id,
      last_id: 0,
      show_type: 6
    };
    axios.get("https://api.hxsapp.com/content/Article/getListByTypeId",
      { params: json }
    ).then((res) => {
      console.log(res)
      // debugger
      this.playAudioListData = res.data;

      this.initAudio(() => {
        var __action = this.pageSoure;
        this.$parent.renderAudioCall && this.$parent.renderAudioCall({
          action: __action
        })

      })


      // if (res.data.code == 200) {
      //   Toast(res.data.msg + res.data.incr_score)
      //   $(event).addClass("yes")

      // } else {
      //   Toast(res.data.msg + res.data.incr_score)
      //   $(event).removeClass("yes")

      // }
    }).catch((Error) => {
      console.log(Error)
    })

  },
  methods: {
    showAudioList() {
      console.log("调用父级的－showAudioListCall")
      // 这里有判断列表是否有数据的情况
      // 若没 就toast 提示了
      // 若有 就走下面的逻辑
      var _this = this;

      var __article_id = _this.data.id;
      // debugger
      var __access_occurred_type = "300701";

      commonJs.buriedPoint({
        access_occurred_type: __access_occurred_type,//发生访问的【页面】类型
        access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      });

      this.$parent.showAudioListCall && this.$parent.showAudioListCall({
        action: "showAudioList",
        data: this.playAudioListData
      })


    },
    goPage(str) {
      // alert(str);
      var _this = this;
      var __playAudioListData = this.playAudioListData.data;
      // {{playAudioListData.data.list}}

      // debugger
      console.log(__playAudioListData)
      if(!__playAudioListData){
        return
      }

      var __article_id = _this.data.id;
      var __access_occurred_type = str == "next_btn" ? "300703" : "300702";

      commonJs.buriedPoint({
        access_occurred_type: __access_occurred_type,//发生访问的【页面】类型
        access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      });


      var curIndex = 0;
      var aId = this.data.id;
      for( var i= 0;i<__playAudioListData.list.length;i++ ){
        if( aId == __playAudioListData.list[i].id ){
          curIndex = i
        }
      }
      console.log(curIndex)

      // 弹出框的标题和连接
      var __search = window.location.search
      // var __title = __playAudioListData.list[0].title;
      var __url = commonJs.config.prefixUrl + "articleDetail/" + __playAudioListData.list[0].id + __search;

      if(__playAudioListData.list.length == 1){

      }else if(__playAudioListData.list.length == 2){
        if ( str == "next_btn") {
          var _index = __playAudioListData.list.length - 1;
          // __title = __playAudioListData.list[_index].title;
          __url = commonJs.config.prefixUrl + "articleDetail/" + __playAudioListData.list[_index].id+ __search;
        }

      }else if(__playAudioListData.list.length >= 3){

          var _index;
          if ( str == "prev_btn") {
            _index = curIndex - 1;
          }else if ( str == "next_btn") {
            _index = curIndex + 1;
          }
          console.log("_index:" + _index)


          if( curIndex == __playAudioListData.list.length -1 && str == "next_btn"){
            _index = curIndex
          }

          if( curIndex == 0 && str == "prev_btn"){
            _index = curIndex
          }
          // debugger
          // __title = __playAudioListData.list[_index].title;
          __url = commonJs.config.prefixUrl + "articleDetail/" + __playAudioListData.list[_index].id+ __search;
      }

      // setTimeout(()=>{
      //   $(".mint-msgbox-confirm").css({
      //       color: "#FF68B0"
      //   })
      // },10)

      // MessageBox({
      //   title: '提示',
      //   message: '确定执行此操作,跳转到新的音频名称：<br />' + __title + "?",
      //   showCancelButton: true,
      //   closeOnClickModal: false
      // }).then((action) => {
      //   console.log("actio-value:" + action);
      //   if (action == "confirm") {
          // console.log(action + "-case")

          $("body").removeClass("playAudioListBODY");

          console.log("__url:" + __url);
          setTimeout(() => {
            window.location.replace(__url);
          }, 100)
      //   } else if (action == "cancel") {
      //     console.log(action + "-case")
      //   }
      // });

    },

    initAudio(cb) {
      //音频播放进度条长度
      // var barWidth = $(window).width() - ($('#audio_bg').width() + 12 + 15) - 12 - 60;
      // $('.analog-audio .bar').css({
      //   width: barWidth
      // });

      this.media_data = this.data.media_data;

      // $('.analog-audio-box-bg').css({
      //   // height: $(window).width() * 0.5625
      //   height: $(window).width()
      // });

      // this.windowWidth_16_9 = $(window).width();
      // debugger
      // Time, Src, json
      var __Time = this.media_data.play_time;
      // var __Src = this.media_data.link;
      var __Json = {
        media_id: this.media_data.id
      };

      var media_data = this.media_data

      // alert( "this.media_data.link:"+this.media_data.link )

      if( !this.media_data.play_time || this.media_data.play_time == "" ){
        Toast("音频时间数据异常，无法播放")
        return;
      }

      // 处理数据link 或者不是mp3 格式的问题
      if( this.media_data.link.length == 0 ){
        Toast("数据来源异常，无法播放")
        return;
      }

      if( this.media_data.link.indexOf(".mp3") < 4 ){
        Toast("音频暂时只支持mp3格式")
        return;
      }

      // debugger
      document.getElementById('audio').src= this.media_data.link

      var __propData = this.data;

      audioPlay( __propData, __Time, __Json,()=>{
        cb && cb()
      });

    }
  },

  beforeDestroy() {
    var dragDom = document.getElementById("drag");
    $(dragDom).off('touchstart');
    $(dragDom).off('touchmove');
    $(dragDom).off('touchend');

    var audioDom = document.getElementById('audio');
    // $(audioDom).off('loadeddata')
    $(audioDom).off('pause')
    $(audioDom).off('play')
    $(audioDom).off('ended')

    $('.analog-audio #audio_bg').off('click')

  }
}

//音频播放
function audioPlay(propData,time, json,CallBack) {
  var audio = document.getElementById('audio');

  var Btrue = false;
  var once = true;
  var allTime;
  var clickTrue2 = true;

  var clientL = 0;
  var timer = null;
  var timer2 = null;
  // 总audio的时间
  var secondsTime;

  // var barWidth = $('.analog-audio-box .bar').width() - $('#drag').width();
  var barWidth = $(window).width();

  // debugger
  // audio.src = Src;
  // alert(time)
  console.log("audio",audio)

  allTime = time;
  secondsTime = time;
  console.log("loadeddata:" + allTime)

  // debugger
  $('.analog-audio-box').css({
    height: $(window).width() * 0.5625 + 90
    // height: $(window).width() + 90
  });

  $('.analog-audio .time').text(CountDown(allTime));

  if (window.navigator.userAgent.toLowerCase().indexOf('android') != -1) {
    $('.bar .fixed_point').addClass('fixed_point_android');
  }

  $(".analog-audio").show()

  //暂停/播放/播放完重新播放的dom绑定处理
  clicks()
  //播放时间
  countSeconds()

  //拖拽播放
  mobileDrag()

  //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
  // audio.addEventListener("loadeddata", function() {
  //   alert(audio.duration)

  // }, false);

  //监听暂停（兼容耳机暂停）
  audio.addEventListener('pause', function() {
    var __article_id = propData.article_id || window.ARTICLE_ID;

    commonJs.buriedPoint({
			access_occurred_type: 300604,//发生访问的【页面】类型
			access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

    $('#audio_bg').attr('uid', '');
    if (once) {
      $('#audio_bg').removeClass('audio_bg_active');
    }
  }, false);

  //监听播放（兼容耳机播放）
  audio.addEventListener('play', function() {

    var __article_id = propData.article_id || window.ARTICLE_ID;

    commonJs.buriedPoint({
			access_occurred_type: 211141,//发生访问的【页面】类型
			access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

    $('#audio_bg').attr('uid', '1');
    if (Btrue) {
      audio.currentTime = 0;
      Move();
      Btrue = false;
    }
    $('#audio_bg').addClass('audio_bg_active');
  }, false);

  //监听完毕的事件
  audio.addEventListener('ended', function() {
    // 埋点
    commonJs.buriedPoint({
			access_occurred_type: 500001,//发生访问的【页面】类型
			access_occurred_type_id: "",//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

  }, false);

  // 回调业务函数
  CallBack && CallBack();


  //暂停/播放/播放完重新播放的dom绑定处理
  function clicks() {

    $(document).on('click', '#audio_bg', function() {
      console.log( "clickTrue2:" +clickTrue2 )
      console.log( "Btrue:" +Btrue )

      if (clickTrue2) {
        // debugger
        // 接口请求数据
        let __json = {
          media_id: json.media_data
        };

        axios.get('https://api.hxsapp.com/content/media/incrMediaPlay',
          { params: __json }
        )
        clickTrue2 = false;
      }
      if (Btrue) {
        audio.play();
        audio.currentTime = 0;
        Move();
        $(this).addClass('audio_bg_active');
        Btrue = false;
      } else {
        if (!$(this).attr('uid')) {
          $(this).attr('uid', '1');
          audio.play();
          Move();
          $(this).addClass('audio_bg_active');
        } else {
          $(this).attr('uid', '');
          audio.pause();
          $(this).removeClass('audio_bg_active');
        }
      }
    });
  }

  //播放时间每秒赋值
  function countSeconds() {
    timer2 = setInterval(function() {
      var currentTime = audio.currentTime;
      $('.loaded_time').text(CountDown(currentTime));
    }, 1000);
  }

  // 移动进度的相关处理
  function Move() {
    clearInterval(timer);
    timer = setInterval(function() {
      var scale = audio.currentTime / secondsTime;
      var width1 = barWidth * scale;

      $('.analog-audio .bar i').css({
        'width': width1
      });

      $('#drag').css({
        left: width1
      });

      if (audio.currentTime >= secondsTime) {
        clearInterval(timer);
        audio.pause();
        $('#audio_bg').removeClass('audio_bg_active');
        Btrue = true;
      }
    }, 300);
  }

  // 拖拽播放相关的dom处理
  function mobileDrag() {
    // var obj = 'drag';
    // var speedObj = 'speed';

    clearInterval(timer);
    var dragDom = document.getElementById("drag");
    var speedDom = document.getElementById("speed");

    dragDom.addEventListener('touchstart', function(event) {
      clearInterval(timer);
      event.preventDefault();
      //var touch = event.targetTouches[0];
      var touch = event.touches[0];

      var oldLeft = touch.pageX - dragDom.offsetLeft;

      dragDom.addEventListener('touchmove', __fnMove, false);
      dragDom.addEventListener('touchend', __fnUp, false);

      return false;

      function __fnMove(event) {
        once = false;
        clearInterval(timer);
        event.preventDefault();
        var touch = event.targetTouches[0];
        // if (event.targetTouches.length == 1) {
        clientL = touch.pageX - oldLeft;

        if (clientL < 0) {
          clientL = 0;
        }

        if (clientL >= barWidth) {
          clientL = barWidth;
        }

        dragDom.style.left = clientL + 'px';
        speedDom.style.width = clientL + 'px';
        var currentTime = (clientL / barWidth) * secondsTime;

        $('.loaded_time').text(CountDown(currentTime));
        //}
      }

      function __fnUp(event) {
        //event.preventDefault();
        clearInterval(timer);
        var dragPaddingLeft = dragDom.style.left;
        // debugger
        var change = dragPaddingLeft.replace("px", "");
        var numDragpaddingLeft = parseInt(change);
        var currentTime1 = (numDragpaddingLeft / barWidth) * secondsTime;//拖拽的时间计算
        audio.currentTime = currentTime1;//音频赋值播放时间

        audio.play();
        setTimeout(() => {
          console.log("__fnUp-function-定时器 100")
          once = false;//禁止拖动播放按钮背景播放与暂停切换
          audio.pause();

          if (currentTime1 < secondsTime) {
            setTimeout(function() {
              Move();
              audio.play();
              once = true;
            }, 300);
            Btrue = false;
            $('#audio_bg').addClass('audio_bg_active');
          } else {
            $('#audio_bg').removeClass('audio_bg_active');
            Btrue = true;
            once = true;
          }
          dragDom.removeEventListener('touchmove', __fnMove, false);
          dragDom.removeEventListener('touchend', __fnUp, false);

        }, 100)
      }

    }, false);
  }
}
// 计算音频的播放时间
function CountDown(time) {
  var s = parseInt(time);

  // var h=parseInt(s/3600);
  // s%=3600;

  var m = parseInt(s / 60);
  s %= 60;

  //return toDou(h)+':'+toDou(m)+':'+toDou(s);
  return toDou(m) + ':' + toDou(s);
}

//小于0补零 工具函数操作
function toDou(n) {
  if (n < 10) {
    return '0' + n;
  } else {
    return n;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.audioPlayer {
  width: 100%;


  /*10px 高度*/
  .change-background {
    width: 100%;
    height: 7px;
    background: #f5f5f8;
  }

  img {
    width: 100%;
  }
  .analog-audio-box {
    // height: 270px;
    // background: url("./../assets/img/analog-audio.jpg") center center no-repeat #ccc;
    // background-size: 100%;
    position: relative;
    display: block;
  }
  .analog-audio-box-bg {
    background-size: 100% 100%;
    background-image: url("./../assets/img/analog-audio.jpg");
    display: block;
    width: 100%;
    height: 200px;
  }

  .analog-audio-bottom-bg {
    width: 100%;
    height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url("./../assets/img/yy-sp@2x.png") left top repeat-x;
    background-size: 4px;
    z-index: 1;
  } // 老绿瘦的提示
  .analog-audio-box .audio_text {
    width: 75px;
    height: 35px;
    background: url("./../assets/img/audio_text.png") left top no-repeat;
    background-size: 100%;
    position: absolute;
    right: 12px;
    top: 20px;
  }

  .analog-audio {
    position: relative;
    width: 100%;
    background: #fff; // 时间
    span.loaded_time,
    span.time {
      width: 40px;
      position: absolute;
      font-size: 12px;
      color: #999;
      height: 15px;
      line-height: 15px;
      z-index: 1;
    }
    span.time {
      text-align: right;
      top: 10px;
      right: 5px;
    }
    span.loaded_time {
      top: 10px;
      text-align: left;
      left: 5px;
    } // 按钮区域
    .btn_box {
      position: relative;
      width: 100%;
      padding-top: 20px;
      text-align: center;
      height: 50px;
      overflow: hidden;

      .list_btn {
        width: 15px;
        height: 15px;
        position: absolute;
        background: url("./../assets/img/list@2x.png") 0 0 no-repeat;
        background-size: 100%;
        top: 38px;
        left: 30px;

        &.on {
          background: url("./../assets/img/list_on@2x.png") 0 0 no-repeat;
        }
      }

      .prev_btn {
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        // margin: 8px 10px 10px;
        top: 36px;
        left: 50%;
        margin-left: -85px;
        background: url("./../assets/img/previous@2x.png") 0 0 no-repeat;
        background-size: 100%;
        cursor: pointer;
      }
      .play_btn {
        user-select: none;
        display: inline-block;
        width: 50px;
        height: 50px;
        cursor: pointer;
        background: url("./../assets/img/play@2x.png") 0 0 no-repeat;
        background-size: 100%;
      }
      .next_btn {
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        // margin: 8px 10px 10px;
        top: 36px;
        left: 50%;
        margin-left: 65px;
        background: url("./../assets/img/next@2x.png") 0 0 no-repeat;
        background-size: 100%;
        cursor: pointer;
      }

      .audio_bg_active {
        background-image: url("./../assets/img/pluse@2x.png");
      }
    } // 进度条区域
    .bar {
      width: 100%;
      height: 3px;
      position: relative;
      background: rgba(129, 141, 207, .8);
      // opacity: 0.7; // border-radius: 3px;
      i {
        // width: 33.33%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        background: #ff668c;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }

      .fixed_point {
        width: 14px;
        height: 14px;
        // background: url("./../assets/img/point.png") center center no-repeat;
        // background-size: 100%;
        z-index: 3;
        background-color: #fff;
        box-shadow: 1px 3px 5px rgba(129, 141, 207, .2);
        position: absolute;
        left: -7px;
        top: 50%;
        margin-top: -8px;
        border-radius: 14px;
        cursor: pointer;
      }

      .fixed_point_android {
        width: 16px;
        height: 18px;
        margin-top: -10px;
        padding: 1px;
      }
    }
  }
}
</style>

/**
@desc ls-video
@author zhoudihang@lvshou.com
*/
<template>
   <div class="image_video_js" v-show="isShow">
     <!--<div class="close">close</div>-->
     <div v-bind:class="{ MQQBrowser: MQQBrowser }" style="width: 100%;height: 100%;">
       <video
         :id="vid"
         class="video-js vjs-big-play-centered"
         playsinline
         webkit-playsinline="webkit-playsinline"
         controls
         preload="auto"
         :poster="poster"
         data-setup=""
         style="object-fit:fill">
         <source :src="sourceSrc"  type="application/x-mpegURL">
         <p class="vjs-no-js">
           要查看此视频，请启用JavaScript，并考虑升级Web浏览器
           <a href="http://videojs.com/html5-video-support/" target="_blank">
             支持HTML5视频
           </a>
         </p>
       </video>
     </div>
     <div class="poster_image" v-if="MQQBrowser" @click="vVideoPlayer">
       <img :src="poster" alt="" style="width: 100%;height: 100%;">
       <img :src="icon_poster_image" alt="" class="icon_poster_image">
     </div>
   </div>
</template>

<script>

import videojs from 'video.js/dist/video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'ls-x5-image-video',
  props: ['poster', 'sourceSrc', 'vid'],
  data() {
    return {
      isShow: true,
      MQQBrowser: false,
      icon_poster_image: require('../../assets/images/common/play.png')
    }
  },
  created() {

    // 判断是否是腾讯开发QQ浏览器内核
    let reg = /MQQBrowser/g;
    let UA = window.navigator.userAgent;
    if (reg.test(UA)) {
      this.MQQBrowser = true
      // alert('这是QQ浏览器内核')
    } else {
      this.MQQBrowser = false
      // alert('这~~~~~~~~~不~~~~~~~~~~~~~是QQ浏览器内核')
    }
  },
  mounted: function () {
    this.creadvideoJs();
  },
  methods: {
    closeVideo() {
      this.isShow = false;
    },
    vVideoPlayer() {
      window.videojsPlaying.pause();
      window.videojsPlaying.play();
    },
    creadvideoJs() {
      var self = this;
      window.videojsPlaying = videojs(this.vid, {language: 'zh-CN'}, function onPlayerReady() {
        var _selfvideo = this;
        if (self.MQQBrowser) {
          this.play();
          setTimeout(function () {
            _selfvideo.pause();
          }, 300)
          this.video_first_play = true;
        }
        this.vid = self.vid;
        this.status = 'init';
        this.on('pause', function () {
          this.video_first_play = false;
          // alert(window.videojsPlaying.el_.className);
        })
        this.on('posterchange', function (res) {
          console.log('posterchange ---', res)
        });
        this.on('play', function () {
          // console.log(window.videojsPlaying)
          // alert(window.navigator.userAgent)
          self.$emit('videojs-play', this);
          if (!this.video_first_play && self.MQQBrowser) {
            window.videojsPlaying.requestFullscreen();
          }
          //
          // alert(window.videojsPlaying.el_.className);
        });

        this.on('ended', function () {
          // 离开全屏
          // alert(window.videojsPlaying.isFullScreen());
          // alert(window.videojsPlaying.isFullWindow())
          // console.log(window.videojsPlaying);
          // console.log(window.videojsPlaying.exitFullscreen)
          // window.videojsPlaying.exitFullscreen();
        });
      });
    }
  }
}
</script>

<style lang="less">
  .MQQBrowser{
    position: fixed;
    left: -100000px;
  }
  .image_video_js{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .width .vjs-poster{
    background-size: 100% auto;
  }
  .height .vjs-poster{
    background-size: auto 100%;
  }
  .video-js{
    width:100%;
    height: 5rem;/*no*/
    min-height: 1rem;/*no*/
    background-size: cover;
  }
  .poster_image{
    position: relative;
    img{
      vertical-align: top;
    }
    .icon_poster_image{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100px;
      height: 100px;
      margin-top: -50px;
      margin-left: -50px;
    }
  }
  .video-js .vjs-big-play-button{
    background: none;
    border: none;
    width: 94px;/*no*/
    height: 94px;/*no*/
    margin-top: -47px;/*no*/
    margin-left: -47px;/*no*/
  }
  /* 中间的播放箭头 */
  .vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
    display: none;
  }
  .vjs-big-play-button:before{
    content: url("../../assets/images/common/play.png");
    width: 94px;/*no*/
    height: 94px;/*no*/
  }
  .video-js button{
    outline: none;
    min-width:2.2em;
  }
  .video-js .vjs-control{
    width:2.2em;
  }
  .video-js .vjs-control-bar{
    font-size: 26px;
  }
  .video-js .vjs-remaining-time{
    width: 3em;
    margin-right: 1em;
    margin-left: -0.5em;
  }
  .video-js .vjs-progress-control{
    margin-left: -0.3em;
  }
  .video-js .vjs-volume-panel{
    transition: none;
    -webkit-transition: none;
  }
  :-webkit-full-screen {
    background-color: #000000 !important;
  }
  :-moz-full-screen {
    background-color: #000000 !important;
  }

  :-ms-fullscreen {
    background-color: #000000 !important;
  }
  :fullscreen {
    background-color: #000000 !important;
  }

  /* --------------------------- */
  .starPackageThree  .video-js{
    height: calc( 3.5rem - 12px );
    border-radius: 3px;
    overflow: hidden;
  }
  .starPackageTwo  .video-js{
    height: 100%;
  }
  /* - - - - - - - - - */
  .poster_absolute .poster_image{
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>

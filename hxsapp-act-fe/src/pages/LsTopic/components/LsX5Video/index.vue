/**
@desc ls-video
@author zhoudihang@lvshou.com
*/
<template>
  <video
    :id="vid"
    class="video-js vjs-big-play-centered"
    playsinline
    webkit-playsinline="webkit-playsinline"
    allowsInlineMediaPlayback="true"
    x5-video-player-type="h5"
    x5-video-player-fullscreen="false"
    x5-video-orientation="portrait"
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
</template>

<script>

import videojs from 'video.js/dist/video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'ls-x5-video',
  props: ['poster', 'sourceSrc', 'vid'],
  created() {
    console.log('created-------------')
    if (window.videoJsOnload) {
      self.creadvideoJs();
    }
  },
  mounted: function () {
    let self = this;
    if (window.videojsPlaying) {
      return false;
    }
    setTimeout(() => {
      if (!window.videojsPlaying) {
        self.creadvideoJs();
      }
    }, 1000)
  },
  methods: {
    creadvideoJs() {
      var self = this;
      window.videojsPlaying = videojs(this.vid, {language: 'zh-CN'}, function onPlayerReady() {
        // this.play();
        this.vid = self.vid;
        this.status = 'init';
        this.on('pause', function () {
          // alert(window.videojsPlaying.el_.className);
        })
        this.on('beforeplay', async function () {

        });
        this.on('play', async function () {
          self.$emit('videojs-play', this);
          window.videojsPlaying.requestFullscreen();
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
  .video-js{
    width:100%;
    height: 5rem;/*no*/
    min-height: 5rem;/*no*/
    background-size: cover;
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

</style>

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
    controls
    preload="auto"
    :poster="poster"
    data-setup="{}">
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
export default {
  name: 'ls-video',
  props: ['poster', 'sourceSrc', 'vid'],
  beforeCreate() {
    if (!document.getElementById('videoCss')) {
      var videoCss = document.createElement('link');
      videoCss.href = '//vjs.zencdn.net/7.2/video-js.min.css';
      videoCss.rel = 'stylesheet';
      videoCss.id = 'videoCss';
      document.getElementsByTagName('head')[0].appendChild(videoCss)
    }
    if (!document.getElementById('html5media')) {
      var html5media = document.createElement('script');
      html5media.src = 'https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.js';
      html5media.id = 'html5media';
      document.getElementsByTagName('head')[0].appendChild(html5media)
    }
    if (!document.getElementById('videoJs')) {
      var videoJs = document.createElement('script');
      videoJs.src = '//vjs.zencdn.net/7.2/video.min.js';
      videoJs.id = 'video';
      document.getElementsByTagName('head')[0].appendChild(videoJs)
    }
    window.HELP_IMPROVE_VIDEOJS = false;
  },
  created() {
    console.log('created-------------')
  },
  mounted: function () {
    let self = this;
    console.log(window);
    window.videojsPlaying = null;
    videojs(this.vid, {language: 'zh-CN'}, function onPlayerReady() {
      // this.play();
      this.vid = self.vid;
      this.status = 'init';
      this.on('pause', function () {
        this.status = 'pause';
      })
      this.on('play', function () {
        console.log('播放了----------pause--')
        if (window.videojsPlaying && window.videojsPlaying.vid !== this.vid) {
          window.videojsPlaying.pause();
        }
        window.videojsPlaying = this;
        if (this.status === 'ended') {
          this.status = 'init';
        }
        if (this.status === 'pause') {
          // this.pause();
          return false;
        }
        self.$emit('player', this)
        this.status = 'play';
      });
      this.on('ended', function () {
        this.status = 'ended';
      });
    });
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
    margin-left: -1em;
  }
  .video-js .vjs-progress-control{
    margin-left: -1em;
  }
  .video-js .vjs-volume-panel{
    transition: none;
    -webkit-transition: none;
  }
</style>

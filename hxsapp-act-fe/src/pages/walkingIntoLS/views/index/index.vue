<template>
  <div class=" videoPlayer2">

    <video class="Movies"  autoplay controls preload="auto" width="100%" poster="{$Think.HTML_STATIC}/images/screenshot1.jpg" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true"
    x5-playsinline="true" style="object-fit: fill;" x5-video-player-fullscreen="true" x5-video-player-type='h5'>
 <source src="http://www.w3school.com.cn/example/html5/mov_bbb.mp4" type="video/mp4">
</video>
  </div>
</template>

<script>
  import {
    videoPlayer
  } from 'vue-video-player';
  import 'videojs-contrib-hls'
  require("videojs-contrib-hls");

  export default {
    name: 'videoPlayer2',
    data() {
      return {
        imgType: true,
        playerOptions: {
          //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          //  /   aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: "" //你的视频地址（必填）
          }],
          volume: '0',
          poster: "", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          //bar的控制
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: true, //倒计时的时间
            currentTimeDisplay: false,
            volumePanel: true,
            fullscreenToggle: false //全屏按钮
          }
        },
        videoTime: 0,
        thisTime: 0,
        refs: "",
      }
    },
    components: {
      videoPlayer
    },
    mounted() {
    },
    methods: {
      fPlayBtn() {
        this.imgType = false;
        this.$refs.myPlayer.player.play() //播放
      },
      playBtn() {

      },
      volume() {
        this.$refs.videoPlayer.player.volume(0.5);

      },
      play() {
        // this.playerOptions.autoplay=true;
        this.$refs.myPlayer.player.play() //播放
      },
      pause() {
        // this.playerOptions.autoplay=true;
        this.$refs.myPlayer.player.pause() //播放
      },
      //更新时间
      onPlayerTimeupdate(player) {
        // this.videoTime=player.cache.duration
        var time = player.cache_.currentTime;
        this.videoTime = (player.cache_.duration - player.cache_.currentTime);
        this.countTime(this.videoTime);

      },
      onPlayerLoadeddata(player) {
        this.videoTime = player.cache_.duration
        this.countTime(this.videoTime);
      },
      onPlayerPlay(player) {},
      onPlayerPause(player) {},
      countTime(time) {

        //  if(time>60.5){
        //     const num=parseInt(time/60);
        //     var  data2=Math.round(time%60)
        //     if(data2<10) data2="0"+data2;
        //     if(num<10){
        //        this.thisTime='0'+num+':'+data2;
        //     }else{
        //        this.thisTime=num+':'+data2;
        //     }
        //   }else{
        //       var data2=Math.round(time);
        //       if(data2<10) data2="0"+data2;
        //       if(time>=59.6){
        //         this.thisTime='01'+':00'
        //       }else{
        //         this.thisTime='00'+':'+data2;
        //       }
        //   }

      },
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
      pauser() {
        return this.$refs.videoPlayer.pause
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
  html,
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    -webkit-user-select: none;
    user-select: none;
    overflow: hidden;
  }

  .videobox {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }

  video {
    height: 500px;
    width: 100%;
  }
  canvas{width: 100%;height: 100%;} /*这里是将下面canvas绘制放大后的视频缩小为设备的大小*/

  .videoPlayer2 {
    height: 375px;
  }

  .videoPlayer2 .playBtn_box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    height: 80px;
    height: 100%;
    width: 100%;
    background-color: #0000002e;
  }

  .videoPlayer2 .playBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60px;
    width: auto;
  }


  .videoPlayer2 .vjs-paused.vjs-button>.vjs-icon-placeholder:before {
    font-size: 5.8em;
    padding-top: 130px;
  }

  .videoPlayer2 .vjs-custom-skin>.video-js {
    height: 100%;
    /* width: auto; */
  }

  .videoPlayer2 .vjs-custom-skin>.video-js .vjs-big-play-button {
    display: none;
  }

  .videoPlayer2 .playBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 70%;
    height: 70%;
    justify-content: center;
    align-items: center;
    z-index: 99;

  }

  .videoPlayer2 .video-js .vjs-tech {
    height: auto;
    width: 100%;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .videoPlayer2 .vjs-poster {
    background-size: cover;
  }

  .videoPlayer2 .video-box {
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  .videoPlayer2 .video-js .vjs-play-progress:before {
    display: none;
  }

  .videoPlayer2 .video-js .vjs-progress-holder {
    height: 4px;
  }

  .video-js .vjs-mute-control .vjs-icon-placeholder:before,
  .vjs-icon-volume-high:before {
    content: "" !important;
  }

  .vjs-custom-skin>.video-js .vjs-play-progress,
  .vjs-custom-skin>.video-js .vjs-volume-level {
    background: rgba(255, 102, 140, 1);
  }

  .videoPlayer2 .video-js .vjs-play-progress {
    height: 4px;
    background: rgba(255, 102, 140, 1) !important;
  }

  .videoPlayer2 .video-player {
    width: 100%;
    height: 375px;
    background-color: black;
    display: flex;
    align-items: center;
  }

  .videoPlayer2 .video-js .vjs-control-bar {
    background-color: rgba(43, 51, 63, 0) !important;
  }

  .videoPlayer2 .video-js .vjs-fullscreen-control {
    display: none;
  }

  .videoPlayer2 .video-js .vjs-volume-panel {
    position: absolute;
    right: 20px;
    bottom: 40px;
    padding-left: 4px;
    height: 30px;
  }

  .videoPlayer2 .video-js .vjs-fullscreen-control {
    display: none !important;
  }

  .videoPlayer2 .video-js .vjs-time-control {
    margin-top: -45px !important;
    position: absolute;
    right: 15px;
    height: 30px;
    width: 38px;
    overflow: hidden;
  }

  .vjs-icon-volume-high:before,
  .video-js .vjs-mute-control .vjs-icon-placeholder:before {
    content: "";
  }

  .vjs-icon-volume-mute:before,
  .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before {
    content: "";
  }

  .videoPlayer2 .vjs-vol-1,
  .videoPlayer2 .vjs-vol-2,
  .videoPlayer2 .vjs-vol-3 {
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 60%;
  }

  .videoPlayer2 .vjs-vol-0 {
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 60%;

  }

  .videoPlayer2 .vjs-big-play-button {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }

  .videoPlayer2 .video-js .vjs-progress-control .vjs-progress-holder {
    margin: 0px 0px;
  }

  .videoPlayer2 .video-js .vjs-play-control {}

  .videoPlayer2 .vjs-paused.vjs-button>.vjs-icon-placeholder:before {
    font-size: 5.8em;
  }

  .videoPlayer2 .video-js .vjs-playing {

    position: absolute;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -375px);
    width: 80%;
    height: 220px;

    opacity: 0;
  }

  .videoPlayer2 .video-js .vjs-paused {
    position: absolute;
    top: -375px;
    left: 50% !important;
    transform: translateX(-50%);
    height: 375px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .videoPlayer2 .video-js .vjs-control-bar {
    height: auto
  }

  .videoPlayer2 .vjs-remaining-time-display {
    margin-left: -5px;
    z-index: 1;
    position: absolute;
    font-size: 1.1rem;
    left: 0px;
  }
</style>
<template>
  <video-player  class="video-player-box vjs-big-play-centered"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplay="onPlayerCanplay($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"
                 @statechanged="playerStateChanged($event)"
                 @ready="playerReadied">
  </video-player>
</template>

<script>
// import { urlGet } from 'Utils/common'
export default {
  name: 'ls-video-player',
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: false,
        language: 'zh-cn',
        sources: [{
          type: 'application/x-mpegURL',
          src: 'https://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-hd/video_1543474537.m3u8'
        }],
        poster: require('../../assets/images/img_01.jpg')
      }
    }
  },
  mounted() {
    if (!this.player) {
      return false;
    }
    this.player.$name = Math.random().toString(16).substring(2);
    console.log('this is current player instance object', this.player)
    let userAgent = window.navigator.userAgent;
    if (userAgent.toLowerCase().indexOf('windows') > -1) {
      this.player.el_.className = this.player.el_.className + ' video-window';
    }
    window.onPlayerPlay = this.player;
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log(player)
      // 如果有播放的视频时 先暂停其他视频再播放
      if (window.onPlayerPlay.$name === player.$name) {
        console.log('在播放同一个视频')
        return false;
      }
      window.onPlayerPlay && window.onPlayerPlay.pause();
      let onPlayerPlay = setTimeout(() => {
        window.onPlayerPlay = player;
        clearTimeout(onPlayerPlay)
      }, 300)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    onPlayerLoadeddata(event) {
      console.log('onPlayerLoadeddata')
    },
    onPlayerCanplay(event) {
      console.log('onPlayerCanplay')
    },
    onPlayerCanplaythrough(event) {
      console.log('onPlayerCanplaythrough')
    },
    onPlayerTimeupdate(event) {
      console.log('onPlayerTimeupdate')
    },
    onPlayerPlaying(event) {
      console.log('onPlayerPlaying')
    },
    onPlayerWaiting(event) {
      console.log('onPlayerWaiting')
    },
    onPlayerEnded(event) {
      console.log('onPlayerEnded')
    }
  }
}
</script>

<style lang="less">
  .video-js{
    width:100%;
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
  .width .vjs-poster{
    background-size: 100% auto;
  }
  .height .vjs-poster{
    background-size: auto 100%;
  }
  /* 中间的播放箭头 */
  .vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
    display: none;
  }
  .vjs-big-play-button:before{
    content: url("../../assets/images/play.png");
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
    /*margin-left: -2.2em;*/
  }
  .video-window .vjs-progress-control{
    margin-left: 0em;
  }
  .video-js .vjs-volume-panel{
    transition: none;
    -webkit-transition: none;
  }
</style>

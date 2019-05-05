<template>
    <div class0="Aliplayer2">
  
        <ali-player :source="url1"  
        :playsinline="true" :showBuffer="true"
        :autoplay="autoplay"
        :cover="cover"   ref="player"></ali-player>
        <button @click="play">播放</button>
        <button @click="pause">暂停</button>
        <button @click="replay">重播</button>
        <button @click="reload">重载</button>
    </div>
  </template>
  
  
  <script>
  
    import VueAliplayer from 'vue-aliplayer'
    export default {
      name: 'aliplayer2',
      data() {
        return {
          headerImage: "",
          url1:"http://vjs.zencdn.net/v/oceans.mp4",
          autoplay:'auto',
          cover:"http://hxsupload.oss-cn-hangzhou.aliyuncs.com/2019-03-25/ce4a2773c1987bf5260cffd76d7a5037.jpg"
        };
      },
      components: {
      'ali-player': VueAliplayer
       },
      mounted() {
  
      },
      methods: {
        play: function(){
          const player = this.$refs.player.instance
          player && player.play()
        },
        pause: function() {
          const player = this.$refs.player.instance
          player && player.pause()
        },
        replay: function() {
          const player = this.$refs.player.instance
          player && player.replay()
        },
        reload: function() {
          // 修改source地址后
          const player = this.$refs.player
          player && player.reloadPlayer()
        }
      }
    };
  </script>
  
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
        /* background: url('../assets/img/bofang_icon@2x.png') 0px 0px no-repeat; */
        background-size: 100%;
      }
      
      .aliyunPlayer .prism-player .prism-play-btn {
        width: 20px;
        height: 20px;
        /* background: url('../assets/img/bf-sp@2x.png') left top no-repeat; */
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
        /* background: url('../assets/img/bofang_icon@2x.png') -186px -2px no-repeat; */
      }
      
      .aliyunPlayer .prism-player .prism-play-btn.playing {
        width: 20px;
        height: 20px;
        /* background: url('../assets/img/zt-sp@2x.png') left top no-repeat; */
        background-size: 100%;
      }
      
      .aliyunPlayer .prism-player .prism-fullscreen-btn {
        width: 18px;
        height: 18px;
        /* background: url('../assets/img/qp-sp@2x.png') left top no-repeat; */
        background-size: 100%;
        display: none;
      }
      
      .aliyunPlayer .prism-player .prism-fullscreen-btn.fullscreen {
        width: 30px;
        height: 30px;
        /* background: url('../assets/img/bofang_icon@2x.png') -161px -183px no-repeat */
      }
      
      .aliyunPlayer .prism-player .prism-volume {
        width: 33px;
        height: 30px;
        /* background: url('../assets/img/bofang_icon@2x.png') -199px -119px no-repeat; */
        display: none;
      }
      
      .aliyunPlayer .prism-player .prism-volume.mute {
        width: 33px;
        height: 30px;
        /* background: url('../assets/img/bofang_icon@2x.png') -164px -151px no-repeat */
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
        /* background: url('../assets/img/yy-sp@2x.png') left top repeat-x; */
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
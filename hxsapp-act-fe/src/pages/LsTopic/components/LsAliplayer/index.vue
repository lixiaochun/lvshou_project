<template>
  <div class='prism-player' :id='playerId' :style='playStyle'></div>
</template>

<script>
  export default {
    name: 'ls-aliplayer',
    props: {
      playStyle: {
        type: String,
        default: ''
      },
      aliplayerSdkPath: {
        // Aliplayer 代码的路径
        type: String,
        default: '//g.alicdn.com/de/prismplayer/2.6.0/aliplayer-min.js'
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      isLive: {
        type: Boolean,
        default: false
      },
      playsinline: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '50vw'
      },
      controlBarVisibility: {
        type: String,
        default: 'click'
      },
      useH5Prism: {
        type: Boolean,
        default: true
      },
      useFlashPrism: {
        type: Boolean,
        default: false
      },
      vid: {
        type: String,
        default: ''
      },
      playauth: {
        type: String,
        default: ''
      },
      source: {
        type: String,
        default: ''
      },
      cover: {
        type: String,
        default: ''
      },
      format: {
        type: String,
        default: 'm3u8'
      },
      x5_video_position: {
        type: String,
        default: 'center'
      },
      x5_type: {
        type: String,
        default: 'h5'
      },
      x5_fullscreen: {
        type: Boolean,
        default: true
      },
      x5_orientation: {
        type: String,
        default: 'landscape'
      },
      autoPlayDelay: {
        type: Number,
        default: 0
      },
      autoPlayDelayDisplayText: {
        type: String
      }
    },
    data () {
      return {
        playerId: 'aliplayer_' + Math.random() * 100000000000000000,
        scriptTagStatus: 0,
        instance: null
      }
    },
    created () {
      if (window.Aliplayer !== undefined) {
        // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
        this.scriptTagStatus = 2
        this.initAliplayer()
      } else {
        // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
        this.insertScriptTag()
      }

    },
    mounted () {
      if (window.Aliplayer !== undefined) {
        // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
        this.scriptTagStatus = 2
        this.initAliplayer()
      } else {
        // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
        this.insertScriptTag()
      }
    },
    methods: {
      insertScriptTag () {
        const _this = this
        let playerScriptTag = document.getElementById('playerScriptTag')
        // 如果这个tag不存在，则生成相关代码tag以加载代码
        if (playerScriptTag === null) {
          playerScriptTag = document.createElement('script')
          playerScriptTag.type = 'text/javascript'
          playerScriptTag.src = this.aliplayerSdkPath
          playerScriptTag.id = 'playerScriptTag'
          let s = document.getElementsByTagName('head')[0]
          s.appendChild(playerScriptTag)
        }
        if (playerScriptTag.loaded) {
          _this.scriptTagStatus++
        } else {
          playerScriptTag.addEventListener('load', () => {
            _this.scriptTagStatus++
            playerScriptTag.loaded = true
            _this.initAliplayer()
          })
        }
        _this.initAliplayer()
      },
      initAliplayer () {
        const _this = this
        // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
        if (_this.scriptTagStatus === 2 && _this.instance === null) {
          // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
          // 所以，我们只能在 nextTick 里面初始化 Aliplayer
          _this.$nextTick(() => {
            _this.instance = window.Aliplayer({
              id: _this.playerId,
              autoplay: _this.autoplay,
              isLive: _this.isLive,
              playsinline: _this.playsinline,
              format: _this.format,
              width: _this.width,
              height: _this.height,
              controlBarVisibility: _this.controlBarVisibility,
              useH5Prism: _this.useH5Prism,
              useFlashPrism: _this.useFlashPrism,
              vid: _this.vid,
              playauth: _this.playauth,
              source: _this.source,
              cover: _this.cover,
              x5_video_position: _this.x5_video_position,
              x5_type: _this.x5_type,
              x5_fullscreen: _this.x5_fullscreen,
              x5_orientation: _this.x5_orientation,
              autoPlayDelay: _this.autoPlayDelay,
              autoPlayDelayDisplayText: _this.autoPlayDelayDisplayText
            })
            // 绑定事件，当 AliPlayer 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
            _this.instance.on('ready', () => {
              this.$emit('ready', _this.instance)
            })
            _this.instance.on('play', () => {
              this.$emit('play', _this.instance)
              console.log('_this.instance')
              console.log(_this.instance);
                // setTimeout( () => {
                //   _this.instance.fullscreenService.requestFullScreen();
                // }, 300)
              // alert('0')
            })
            _this.instance.on('pause', () => {
              this.$emit('pause', _this.instance)
            })
            _this.instance.on('ended', () => {
              this.$emit('ended', _this.instance)
            })
            _this.instance.on('liveStreamStop', () => {
              this.$emit('liveStreamStop', _this.instance)
            })
            _this.instance.on('m3u8Retry', () => {
              this.$emit('m3u8Retry', _this.instance)
            })
            _this.instance.on('hideBar', () => {
              this.$emit('hideBar', _this.instance)
            })
            _this.instance.on('waiting', () => {
              this.$emit('waiting', _this.instance)
            })
            _this.instance.on('snapshoted', () => {
              this.$emit('snapshoted', _this.instance)
            })

            // 兼容视频背景拉长 => 去掉小屏按钮
            let userAgent = window.navigator.userAgent;
            _this.instance.on("x5requestFullScreen", function(){
              let filters = /vivo X20Plus/g;
              setTimeout( () => {
                _this.instance.fullscreenService.requestFullScreen();
                setTimeout(() => {
                  _this.instance.el().style.width = '3000px';
                }, 1000)
                // 虚拟返回键
                if (filters.test(userAgent)) {
                  _this.instance.addClass('virtualButton');
                }
              }, 300)
            });

            _this.instance.on("x5cancelFullScreen", function(){
              // alert('x5cancelFullScreen')
              _this.instance.fullscreenService.cancelFullScreen();
              setTimeout( () => {
                _this.instance.el().style.height = _this.height;
                // 虚拟返回键
                _this.instance.removeClass('virtualButton');
              }, 300)
            });
          })
        }
      },
      /**
       * 播放视频
       */
      play: function () {
        this.instance.play()
      },
      /**
       * 暂停视频
       */
      pause: function () {
        this.instance.pause()
      },
      /**
       * 重播视频
       */
      replay: function () {
        this.instance.replay()
      },
      /**
       * 跳转到某个时刻进行播放
       * @argument time 的单位为秒
       */
      seek: function (time) {
        this.instance.seek(time)
      },
      /**
       * 获取当前时间 单位秒
       */
      getCurrentTime: function () {
        return this.instance.getCurrentTime()
      },
      /**
       *获取视频总时长，返回的单位为秒
       * @returns 返回的单位为秒
       */
      getDuration: function () {
        return this.instance.getDuration()
      },
      /**
       获取当前的音量，返回值为0-1的实数ios和部分android会失效
       */
      getVolume: function () {
        return this.instance.getVolume()
      },
      /**
       设置音量，vol为0-1的实数，ios和部分android会失效
       */
      setVolume: function (vol) {
        this.instance.setVolume(vol)
      },
      /**
       *直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
       *@argument url 视频地址
       *@argument time 跳转到多少秒
       */
      loadByUrl: function (url, time) {
        this.instance.loadByUrl(url, time)
      },
      /**
       * 设置播放速度
       *@argument speed 速度
       */
      setSpeed: function (speed) {
        this.instance.setSpeed(speed)
      },
      /**
       * 设置播放器大小w,h可分别为400px像素或60%百分比chrome浏览器下flash播放器分别不能小于397x297
       *@argument w 播放器宽度
       *@argument h 播放器高度
       */
      setPlayerSize: function (w, h) {
        this.instance.setPlayerSize(w, h)
      },
      /**
       * 目前只支持HTML5界面上的重载功能,暂不支持直播rtmp流切换m3u8）之间切换,暂不支持直播rtmp流切换
       *@argument vid 视频id
       *@argument playauth 播放凭证
       */
      reloaduserPlayInfoAndVidRequestMts: function (vid, playauth) {
        this.instance.reloaduserPlayInfoAndVidRequestMts(vid, playauth)
      }
    }
  }
</script>

<style>
  @import url(//g.alicdn.com/de/prismplayer/2.6.0/skins/default/aliplayer-min.css);
  video {
    object-fit: contain !important;
  }

  .video .prism-player{
    overflow: hidden;
  }
  .video .prism-player .prism-big-play-btn{
    left: 50% !important;
    margin-left: -50px !important;
    bottom: 50% !important;
    margin-bottom: -50px !important;
    background: url('../../assets/images/common/play.png') no-repeat !important;
    background-size: 100% !important;
    width: 100px;
    height: 100px;
  }
  .prism-player .prism-big-play-btn:hover {
    cursor: pointer;
    border: none;
    border-radius: 0;
  }
  .prism-player video{
    z-index: 100;
  }
  .prism-player .prism-controlbar{
    z-index: 101 !important;
  }
  .prism-player .prism-fullscreen-btn{
    margin-right: 100px !important;
    display: none !important;
  }
  /* 倍数 */
  .prism-speed-selector .current-speed-selector{
    display: none !important;
  }
  video::-internal-media-controls-download-button{display:none;}
  video::-internal-media-controls-download-button { display:none; } video::-webkit-media-controls-enclosure { overflow:hidden; } video::-webkit-media-controls-panel { width: calc(100% + 30px); }
  /* vivo */
  .video .virtualButton .prism-volume{
    margin-right: 40px !important;
  }
</style>

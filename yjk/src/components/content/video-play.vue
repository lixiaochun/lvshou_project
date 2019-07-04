<template>
 <c-dialog>
  <div>
     <el-button @click.prevent="changeLeft" size="small" type="info" class="el-icon-refresh">旋转</el-button>
      <el-button  class="el-icon-close" type="info"  @click="goBack" size="small"></el-button>
     <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @statechanged="playerStateChanged($event)"
               >
  </video-player>
  </div>
  </c-dialog>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import cDialog from 'base/c-dialog/c-dialog'
import { Button } from 'element-ui'
export default {
  data () {
    return {
      loading: false,
      hasAnimation: true,
      url: '',
      deg: 0,
      i: 0,
      playerOptions: {
        // videojs options
        width: '800px',
        height: '400px',
        muted: false,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        controlBar: {
          fullscreenToggle: false
        },
        sources: [{
          type: 'video/mp4'
        }]
      }
    }
  },
  created () {
    const { path } = this.$route.query
    this.url = path
    this.playerOptions.sources[0].src = this.url
  },
  mounted () {
    console.log('this is current player instance object', this.player)
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    goBack () {
      this.$router.go(-1)
    },
    changeDirection (rotate) {
      let ele = document.getElementsByClassName('vjs-tech')[0]
      ele.style.transform = 'rotate(' + rotate + 'deg' + ')'
    },
    changeLeft () {
      this.i++
      this.deg = 90 * (this.i)
      this.changeDirection(this.deg)
    }
  },
  components: {
    videoPlayer,
    cDialog,
    [Button.name]: Button
  }
}
</script>

<style>
     .vjs-styles-dimensions{
       width: 600px;
       height: 300px;
     }
     .video-js{
       overflow: hidden;
     }
     .video-js .vjs-big-play-button{
       position: absolute;
       left: 45%;
       top: 45%;
     }
     button.el-icon-close{
       position: absolute;
       right: 0;
       top: -25px;
       line-height: 15px;
     }
     button.el-icon-refresh{
       position: absolute;
       top: -25px;
     }
</style>

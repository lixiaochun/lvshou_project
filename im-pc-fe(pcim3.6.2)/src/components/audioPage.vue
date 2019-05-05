<template>
  <div class="audio flex flex-align-center  flex-pack-justify">

    <div class="audio-left flex flex-align-center">
      <div class="audio-left-label">
        <div class="audio-left-title">网络通话</div>
        <div class="audio-left-icon">
          <img src="../assets/img/icon_call@2x.png" alt="">
        </div>
      </div>
      <div class="audio-left-info flex flex-align-center">
        <div class="audio-info-avatar">
          <img :src="audioUserInfo.avatar" alt="">
        </div>
        <div class="audio-info-userName">{{audioUserInfo.nickName}}</div>
      </div>
    </div>
    <div class="audio-loading" v-if="showLoadingTime">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-else>{{Timing}}</div>
    <div class="audio-btn flex">
      <div class="answer" @click="checkAnswer" v-if="!isDial">
        <img src="../assets/img/icon_accept@2x.png" alt="">
      </div>
      <div class="refuse" @click="checkRefuse">
        <img src="../assets/img/icon_reject@2x.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'audioPage',
  props: {
    isDial: {
      type: Boolean,
      default: function() {}
    },
    audioUserInfo: {
      type: Object,
      default: function() {}
    },
    isAnswer:{
      type: Boolean,
      default: function() {}
    },
    showLoadingTime:{
      type: Boolean,
      default: function() {}
    }
  },
  data() {
    return {
      Timing: '00:00:00', // 接听语音后的时间计时
      timeAdd: null, // 倒计时
      showTiming: false, //  倒计时显示状态
    }
  },
  watch: {
    showLoadingTime(data){
      var that=this;
      if(data==false){
        that.timeShow()
      }
    }
  },
  mounted() {
    console.log(this.audioUserInfo)
  },
  methods: {
    // 接听语音
    checkAnswer() {
      // 触发父组件更新
      let data = {
        type: 'answer'
      }
      this.$emit('touchChild', data)
    },
    // 拒绝或挂断语音
    checkRefuse() {
      this.isShogun = false
      this.showTiming = false
      window.clearInterval(this.timeAdd)
      this.Timing = '00:00:00'
      // 触发父组件更新
      let data = {
        type: 'refuse'
      }
      this.$emit('touchChild', data)
    },
    // 接听语音计时
    timeShow() {
      let hour, minute, second, hourTitle, minuteTitle, secondTitle //时 分 秒
      hour = minute = second = 0 //初始化
      let millisecond = 0 //毫秒
      let that = this
      that.timeAdd = setInterval(timer, 50)
      function timer() {
        millisecond = millisecond + 50
        if (millisecond >= 1000) {
          millisecond = 0
          second = second + 1
        }
        if (second >= 60) {
          second = 0
          minute = minute + 1
        }

        if (minute >= 60) {
          minute = 0
          hour = hour + 1
        }
        //计时
        hour < 10 ? (hourTitle = '0' + hour) : (hourTitle = hour)
        minute < 10 ? (minuteTitle = '0' + minute) : (minuteTitle = minute)
        second < 10 ? (secondTitle = '0' + second) : (secondTitle = second)
        that.Timing = hourTitle + ':' + minuteTitle + ':' + secondTitle
      }
    }
  }
}
</script>
<style lang="less">
.audio {
  position: absolute;
  top: 0;
  background: rgba(51, 51, 51, 0.7);
  color: #fff;
  width: calc(100% - 20px);
  height: 60px;
  padding: 0 10px;
  .audio-left {
    .audio-left-title {
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      padding-top: 10px;
    }
    .audio-left-icon {
      width: 30px;
      height: 30px;
      padding-top: 5px;
      margin: auto;
      img {
        width: 24px;
        height: 22px;
      }
    }
    .audio-left-info {
      margin-left: 25px;
      .audio-info-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          min-height: 36px;
        }
      }
      .audio-info-userName {
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-left: 8px;
      }
    }
  }
  .audio-loading {
    div {
      background: rgba(255, 255, 255, 1);
      width: 8px;
      height: 8px;
      border-radius: 100%;
      margin: 2px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      display: inline-block;
      -webkit-animation: ball-beat 1s 0s infinite linear;
      animation: ball-beat 1s 0s infinite linear;
      &:nth-child(2n-1) {
        -webkit-animation-delay: 0.5s !important;
        animation-delay: 0.5s !important;
      }
    }

    @keyframes ball-beat {
      50% {
        opacity: 0.4;
      }

      100% {
        opacity: 1;
      }
    }
  }
  .audio-btn {
    div {
      width: 50px;
      height: 30px;
      border-radius: 4px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
    .answer img {
      width: 30px;
    }
    .refuse img {
      width: 30px;
    }
  }
}
</style>
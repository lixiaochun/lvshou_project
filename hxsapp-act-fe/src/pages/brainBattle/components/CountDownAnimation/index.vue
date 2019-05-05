<template>
  <div class="ctxContent">
    <div v-bind:class="{ctx:true,half:animation.half,init: init}">
      <div class="left" v-bind:style="{ transform: 'rotate(' + leftStyle + 'deg)', WebkitTransform: 'rotate(' + leftStyle + 'deg)'}"></div>
      <div class="right" v-bind:style="{ transform: 'rotate(' + rightStyle + 'deg)', WebkitTransform: 'rotate(' + rightStyle + 'deg)'}"></div>
      <div class="time">
        <span>{{animation.time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'count-down-animation',
  data() {
    return {
      animationInterval: null,
      init: false,
      deg: 3.6,
      rotate: 0,
      animation: {},
      leftStyle: 0,
      rightStyle: 0
    }
  },
  methods: {
    startAnimation(timeout) {
      if (this.animation.isStart) {
        return false;
      }
      this.animation.isStart = true;
      let self = this;
      let lessTime = 100;
      let degtime = self.animation.degtime ? self.animation.degtime : 10000;
      let half = degtime / 2;
      let deg = this.deg * lessTime / 1000;
      this.animationInterval = setInterval(() => {
        self.animation.degtime -= lessTime;
        this.rotate = this.rotate + deg;
        self.animation.time = Math.ceil(self.animation.degtime / 1000);
        if (self.animation.degtime > half) {
          this.leftStyle = this.rotate;
        } else if (self.animation.degtime === half) {
          this.leftStyle = this.rotate;
          this.animation.half = true;
          this.rotate = 0;
        } else if (self.animation.degtime < half && self.animation.degtime >= 0) {
          this.rightStyle = this.rotate;
        }
        if (self.animation.degtime < 0) {
          this.stopAnimation();
          if (timeout && typeof timeout === 'function') {
            timeout()
          }
          return false;
        }
      }, lessTime)
    },
    stopAnimation() {
      clearInterval(this.animationInterval)
      this.animationInterval = null;
    },
    initAnimation(time) {
      this.stopAnimation();
      let t = time || 10;
      let degtime = t * 1000; // 毫秒
      let deg = 180 / t * 2;
      this.animation = {
        half: false,
        degtime: degtime, // 毫秒
        time: t
      }
      this.leftStyle = 0;
      this.rightStyle = 0;
      this.rotate = 0;
      this.deg = deg;
    }
  }
}
</script>

<style lang="less" scoped>
  .ctxContent{
    border: 0.1em solid #000000;
    width: 2.2em;
    height: 2.2em;
    font-size: 1em;
    border-radius: 50%;
    box-sizing: content-box;
    position: relative;
    .ctx{
      position: relative;
      background: #ffffff;
      width: 2em;
      height: 2em;
      border-radius: 50%;
      border: 0.1em solid #ffffff;
      overflow: hidden;
      box-sizing: content-box;
      font-size: 1em;
      .time{
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 109;
        width: 1em;
        height:  1em;
        margin-top: -0.6em;
        margin-left: -0.6em;
        background: #250b6c;
        border-radius: 50%;
        font-weight: 600;
        color: #ffffff;
        font-size: 1em;
        border: 0.1em solid #ffffff;
        box-shadow: 0 0 0 0.1em inset #000000;
        box-sizing: content-box;
        display: flex;
        display: -webkit-flex;
        display: -webkit-inline-flex;
        justify-content: center;
        align-items: center;
        span{
          font-size: 0.52em;
        }
      }
      .left{
        font-size: 1em;
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 2em;
        border-right: 1em solid #ffb400;
        border-left: 1em solid #ffffff;
        border-radius: 50%;
        box-sizing: content-box;
      }
      .right{
        font-size: 1em;
        position: absolute;
        z-index: 100;
        left: 0;
        top: 0;
        width: 0;
        height: 2em;
        border-left:1em solid #ffb400;
        border-right: 1em solid transparent;
        border-radius: 50%;
        box-sizing: content-box;
      }
    }
    .half{
      font-size: 1em;
      .left{
        font-size: 1em;
        z-index: 101;
        border-right:1em solid transparent;
        border-left: 1em solid #ffffff;
        transition: all 0s;
        -webkit-transition: all 0s;
      }
      .right{
        font-size: 1em;
        border-right: 1em solid #ffffff;
      }
    }
  }
</style>

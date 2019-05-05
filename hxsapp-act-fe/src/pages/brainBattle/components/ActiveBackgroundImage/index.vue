<template>
  <div class="ActiveBackgroundImage">
    <div class="animation" v-bind:style="{
      top: top + 'px',
      right: right + 'px'
    }"></div>
  </div>
</template>

<script>
export default {
  name: 'active-background-image',
  data() {
    return {
      animationInterval: null,
      top: 0,
      right: 0
    }
  },
  mounted() {
    // this.startAnimation()
    if (this.$parent.backgroundAnimationActive) {
      this.startAnimation()
    }
  },
  methods: {
    startAnimation() {
      let self = this;
      let width = window.screen.availWidth * 2; // width 10000
      this.animationInterval = setInterval(() => {
        self.top -= 1;
        self.right -= 1;
        // console.log(width - self.top);
        if (width - self.top > 3000) { //  width: 10000px;
          console.log('重新开始动画')
          self.stopAnimation();
          self.initAnimation();
          self.startAnimation();
        }
        // console.log(self.top + '------' + self.right)
      }, 100)
    },
    stopAnimation() {
      clearInterval(this.animationInterval)
      this.animationInterval = null;
    },
    initAnimation() {
      this.top = 0;
      this.right = 0;
    }
  },
  beforeDestroy() {
    this.stopAnimation();
    this.initAnimation();
  }
}
</script>

<style lang="less" scoped>
  .ActiveBackgroundImage{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .animation{
      position: absolute;
      top: 0;
      right: 0;
      background-size: 4%;
      width: 10000px;
      height: 900000px;
      background-image: url("../../assets/images/img_07.png");
    }
  }
</style>

<template>
  <div class="c-loading-wrapper">
    <span v-if="type==='spinners'" class="c-loading-spinners" :style="sizeStyle">
      <i class="c-loading-spinner" v-for="item in balde" :key="item" :style="backgroundColorStyle"></i>
    </span>
    <svg v-else viewBox="25 25 50 50" class="circular" :style="sizeStyle">
      <circle cx="50" cy="50" r="20" fill="none" class="path" :style="strokeStyle"></circle>
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
const COMPONENT_NAME = 'c-loading'

export default {
  name: COMPONENT_NAME,
  props: {
    type: {
      type: String,
      defalut: ''
    },
    color: {
      type: String,
      defalut: ''
    },
    size: {
      type: String,
      defalut: '1em'
    }
  },
  data() {
    return {
      balde: 12
    }
  },
  computed: {
    sizeStyle() {
      return {
        fontSize: this.size
      }
    },
    backgroundColorStyle() {
      return {
        backgroundColor: this.color
      }
    },
    strokeStyle() {
      return {
        stroke: this.color
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.c-loading-wrapper
  width 100%
  height 100%
  .circular
    width 1em
    height 1em
    animation loading-rotate 2s linear infinite
  .path
    animation loading-dash 1.5s ease-in-out infinite
    stroke-dasharray 90, 150
    stroke-dashoffset 0
    stroke-width 2
    stroke #409eff
    stroke-linecap round
  .c-loading-spinners
    position relative
    display inline-block
    vertical-align middle
    width 1em
    height 1em
  .c-loading-spinner
    position absolute
    left 44.5%
    top 37%
    width 2px
    height 25%
    border-radius 50% / 20%
    opacity 0.25
    background-color #333
    animation spinner-fade 1s linear infinite
    for num in (1 .. 12)
      &:nth-child({num})
        animation-delay ((num - 1) / 12)s
        transform rotate(30deg * (num - 6)) translateY(-150%)

@keyframes spinner-fade
  0%
    opacity 0.85
  50%
    opacity 0.25
  100%
    opacity 0.25

@keyframes loading-rotate
  transform rotate(1turn)

@keyframes loading-dash
  0%
    stroke-dasharray 1, 200
    stroke-dashoffset 0
  50%
    stroke-dasharray 90, 150
    stroke-dashoffset -40px
  100%
    stroke-dasharray 90, 150
    stroke-dashoffset -120px
</style>

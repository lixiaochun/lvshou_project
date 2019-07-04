<template>
  <transition @beforeEnter="beforeEnter" @leave="leave">
    <div class="c-dialog-wrapper"  @mouseup='up'  @mousemove='move' @mousedown='down'>
      <div class="c-dialog-mark"></div>
      <div class="c-dialog" ref="dialog" :style='{top:top+"px",left:left+"px"}'>
        <div class="c-dialog-conter" data-type="move">
          <slot name="slot" v-if="hasTitle||title">
            <div class="dialog-header" ref="header">
              <h3>{{title}}</h3>
              <span class="dialog-close icon-close" @click="dialogClose"></span>
            </div>
          </slot>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { addClass, removeClass } from 'common/js/dom'

const COMPONENT_NAME = 'c-dialog'
const ANIMATION_ACTIVE = 'active'
const ANIMATION_UNACTIVE = 'unactive'

export default {
  name: COMPONENT_NAME,
  props: {
    title: {
      type: String,
      defalut: ''
    },
    hasTitle: {
      type: Boolean,
      defalut: true
    },
    hasAnimation: {
      type: Boolean,
      defalut: true
    },
    showWin: {
      type: Boolean
    },
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      Otop: 0,
      Oleft: 0,
      top: 0,
      left: 0,
      canMove: false
    }
  },
  mounted() {
    this.initSize()
  },
  methods: {
    dialogClose() {
      this.$emit('close')
    },
    beforeEnter(el) {
      const mark = el.querySelector('.c-dialog-mark')
      const conter = el.querySelector('.c-dialog-conter')
      mark && addClass(mark, ANIMATION_ACTIVE)
      conter && addClass(conter, ANIMATION_ACTIVE)
    },
    leave(el, done) {
      const mark = el.querySelector('.c-dialog-mark')
      const conter = el.querySelector('.c-dialog-conter')
      if (this.hasAnimation) {
        if (mark) {
          removeClass(mark, ANIMATION_ACTIVE)
          addClass(mark, ANIMATION_UNACTIVE)
        }
        if (conter) {
          removeClass(conter, ANIMATION_ACTIVE)
          addClass(conter, ANIMATION_UNACTIVE)
        }
        setTimeout(() => {
          done()
        }, 300)
      } else {
        done()
      }
    },
    up(e) {
      this.canMove = false
      this.setTandL(e)
    },
    down(e) {
      if (e.target === this.$refs.header) {
        this.canMove = true
        this.setXandY(e)
        this.setTandL(e)
      }
    },
    move(e) {
      e.preventDefault()
      if (this.canMove) {
        this.left = e.pageX - this.startX + this.Oleft
        this.top = e.pageY - this.startY + this.Otop
      }
      return false
    },
    setXandY(e) {
      this.startX = e.pageX
      this.startY = e.pageY
    },
    setTandL(e) {
      this.Otop = this.$refs.dialog.offsetTop
      this.Oleft = this.$refs.dialog.offsetLeft
    },
    initSize() {
      const top = (document.documentElement.clientHeight - this.height) / 2
      const left = (document.documentElement.clientWidth - this.width) / 2
      this.top = this.Otop = top
      this.left = this.Oleft = left
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.c-dialog-wrapper
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index $zIndex-dialog
  .c-dialog-mark
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index $zIndex-mark
    background-color rgba(0, 0, 0, 0.4)
    &.active
      animation amFadeIn .3s linear
      animation-fill-mode both
    &.unactive
      animation amFadeOut .3s linear
      animation-fill-mode both
  .c-dialog
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index $zIndex-dialog
    &.active
      animation BombIn .3s linear
      animation-fill-mode both
    &.unactive
      animation BombOut .3s linear
      animation-fill-mode both
  .c-dialog-conter
    min-width 200px
    min-height 150px
    background-color $color-background
    border-top 2px solid $color-theme
    border-radius 3px
    &.active
      animation fadeInDown .3s linear
      animation-fill-mode both
    &.unactive
      animation fadeOutDown .3s linear
      animation-fill-mode both
  .dialog-header
    width 100%
    height 39px
    line-height 39px
    border-bottom 1px solid #f2f2f5
    cursor move
    h3
      margin-right 39px
      padding 0 0 0 16px
      font-size $font-size-md
      font-weight 700
      inline-block-top()
    .dialog-close
      float right
      width 39px
      height 39px
      line-height 39px
      font-size $font-size-md
      color #696e78
      cursor pointer
      text-align center
      background transparent
      transition background-color .3s
      inline-block-top()
      &:hover
        background-color $color-mark
@keyframes amFadeIn
  0%
    opacity 0
  100%
    opacity 1
@keyframes amFadeOut
  0%
    opacity 1
  100%
    opacity 0

@keyframes fadeInDown
  0%
    opacity 0
    transform translateY(-20px)
  100%
    opacity 1
    transform translateY(0)
@keyframes fadeOutDown
  0%
    opacity 1
    transform translateY(0)
  100%
    opacity 0
    transform translateY(20px)
</style>

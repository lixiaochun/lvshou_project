<template>
  <div class="c-scroll-wrapper" ref="scrollbar" style="padding-right: 10px">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import PerfectScrollbar from 'perfect-scrollbar'

const COMPONENTS_NAME = 'c-scroll'

export default {
  name: COMPONENTS_NAME,
  props: {
    data: {
      type: [Array, Object]
    }
  },
  mounted() {
    if (!this.perfectScrollbar) {
      const scrollbar = this.$refs.scrollbar
      this.perfectScrollbar = new PerfectScrollbar(scrollbar)
    }
  },
  methods: {
    getScroll() {
      return this.perfectScrollbar
    }
  },
  beforeDestroy() {
    if (this.perfectScrollbar) {
      this.perfectScrollbar.destroy()
      this.perfectScrollbar = null
    }
  },
  watch: {
    data() {
      if (this.perfectScrollbar) {
        setTimeout(() => {
          this.perfectScrollbar.update()
        }, 20)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.c-scroll-wrapper
  position relative
  width 100%
  height 100%
  box-sizing border-box
  overflow hidden
.editorText
  p
    height 20px
</style>

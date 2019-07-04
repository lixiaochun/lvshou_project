<template>
  <div class="tag-table">
    <h3 class="tag-table-header">
      <span class="icon-tag"></span>
      {{title}}
    </h3>
    <div class="tag-table-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

const COMPONENT_NAME = 'tag-table'

export default {
  name: COMPONENT_NAME,
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.tag-table
  width 100%
  .tag-table-header
    padding 0 15px
    height 50px
    line-height 50px
    font-size $font-size-md
    color $color-text
    .icon-tag
      height 50px
      line-height 48px
      font-size 22px
      color $color-theme
      inline-block-top()
</style>

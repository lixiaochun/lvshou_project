<template slot-scope="props">
  <div class="list-table-wrapper">
    <div class="list-table-header" :class="{addBorder:border}">
      <div class="list-table-header-query" v-show="!hideQuery">
        <slot name="query"></slot>
      </div>
    </div>
    <div class="list-table-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button } from 'element-ui'

const COMPONENT_NAME = 'list-table'

export default {
  name: COMPONENT_NAME,
  props: {
    title: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean
    },
    hideQuery: {
      type: Boolean,
      default: false
    },
    order: {
      type: String,
      default: ''
    }
  },
  created() {},
  components: {
    [Button.name]: Button
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
@import "~common/css/elementCustom"

.list-table-wrapper
  width 100%
  padding-bottom 20px
  font-size 14px
  .list-table-header
    padding 0 10px
    .list-table-header-title
      margin 0
      padding: 6px 0 6px 0;
      height: 40px;
      line-height: 40px;
      color $color-text
      font-size $font-size-md
      &::before
        content ''
        display inline-block
        margin-right 12px
        width 2px
        height 14px
        inline-block-top()
        margin-top 14px
        background-color $color-theme
  .list-table-header-query
    padding 12px 0
    line-height 30px
    color $color-text
    font-size $font-size-sm
    .title
      margin-bottom 10px
      padding-left 10px
      border-left 2px solid #409eff
      font-size 16px
      color #333
      height 20px
      line-height 20px
    .indicators
      height 40px
      line-height 40px
    .queryLabel
       width 80px
       display inline-block
       text-align right
  .addBorder
    border 1px solid #dedede
    padding 0
    // margin 10px
    .list-table-header-query
      padding-top 0px
      border-bottom none
</style>

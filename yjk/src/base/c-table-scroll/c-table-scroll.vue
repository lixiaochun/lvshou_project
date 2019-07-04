<template>
  <div class="custom-page">
    <div class="custom-page-left">
      <c-scroll :data="data">
      <div class="custom-page-left-content">
        <slot></slot>
      </div>
      </c-scroll>
    </div>
    <slot name="view">
      <router-view></router-view>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import cScroll from 'base/c-scroll/c-scroll'

const COMPONENTS_NAME = 'c-table-scroll'

export default {
  name: COMPONENTS_NAME,
  props: {
    data: {
      type: Array
    }
  },
  components: {
    cScroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

page-init(custom)

</style>

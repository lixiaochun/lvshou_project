<template>
  <div class="not-found-page">
    <h3>404页面</h3>
  </div>
</template>

<script type="text/ecmascript-6">
const COMPONENT_NAME = 'not-found-page'

export default {
  name: COMPONENT_NAME
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.not-found-page
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color #dcdcdc
  h3
    margin 0 auto
    margin-top 100px
    width 80%
    height 300px
    line-height 300px
    font-size 120px
    color #fff
    text-align center
</style>

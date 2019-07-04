<template>
  <div class="custom-page">
    <p class="title"><span>栏目管理</span></p>
    <el-tabs type="border-card" style="margin: 10px; height: calc(100% - 70px); overflow-y: auto; margin-bottom: 0px" v-model="type" @tab-click="handleClick">
      <el-tab-pane label="男性魅力" name="男性魅力">
        <ColumnItem :type="type" :key="type"></ColumnItem>
      </el-tab-pane>
      <el-tab-pane label="精选内容" name="精选内容">
        <ColumnItem :type="type" :key="type"></ColumnItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, DatePicker, Select, Option, Tabs, TabPane } from 'element-ui'
import ColumnItem from './column-item'

export default {
  data() {
    return {
      type: '男性魅力'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.type = tab.label
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    ColumnItem
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .custom-page
    height 100%
    overflow-y auto
    .title
      height 60px
      line-height 60px
      background #f2f2f2
      span
        position relative
        margin-left 8px
        padding-left 10px
        color #666
        font-size 16px
        &:before
          position absolute
          top 2px
          left -2px
          content ""
          width 2px
          display inline-block
          height 14px
          background #00bafa
</style>

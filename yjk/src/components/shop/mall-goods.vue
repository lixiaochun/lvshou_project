<template>
  <div class="custom-page">
    <p class="title"><span>商品管理</span></p>
    <el-tabs type="border-card" style="margin: 10px; height: calc(100% - 70px); overflow-y: auto; margin-bottom: 0px" v-model="title">
      <el-tab-pane label="商品列表" name="商品列表">
        <goods-list v-if="components.list"></goods-list>
      </el-tab-pane>
      <el-tab-pane label="商品回收站" name="商品回收站">
        <goods-recycling v-if="components.recycling"></goods-recycling>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, DatePicker, Select, Option, Tabs, TabPane } from 'element-ui'
import GoodsList from './mall-goods-list' // 已发送
import GoodsRecycling from './mall-goods-recycling' // 草稿箱
export default {
  data() {
    return {
      title: '商品列表',
      components: {
        list: true,
        recycling: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { type } = this.$route.query
      if (type) {
        if (type === 'sent') {
          this.title = '商品列表'
          this.components.list = true
          this.components.recycling = false
        } else {
          this.title = '商品回收站'
          this.components.recycling = true
          this.components.list = false
        }
      }
    }
  },
  watch: {
    title() {
      const title = this.title
      switch (title) {
        case '商品列表':
          this.components.list = true
          this.components.recycling = false
          break
        case '商品回收站':
          this.components.recycling = true
          this.components.list = false
      }
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
    GoodsList,
    GoodsRecycling
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

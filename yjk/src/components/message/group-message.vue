<template>
  <div class="message-page">
    <p class="logistics-title"><span>群发消息</span></p>
    <el-tabs type="border-card" style="margin-left: 10px; margin-top: 10px; height: calc(100% - 60px)" v-model="title">
      <el-tab-pane label="已发送" name="已发送">
        <gronp-sent  v-if="components.sent"></gronp-sent>
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="草稿箱">
        <gronp-draft  v-if="components.draft"></gronp-draft>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabs, TabPane } from 'element-ui'
import gronpSent from './gronp-sent' // 已发送
import gronpDraft from './gronp-draft' // 草稿箱

export default {
  data() {
    return {
      components: {
        sent: true,
        draft: false
      },
      title: '已发送'
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
          this.title = '已发送'
          this.components.sent = true
          this.components.draft = false
        } else {
          this.title = '草稿箱'
          this.components.draft = true
          this.components.sent = false
        }
      }
    }
  },
  watch: {
    title() {
      const title = this.title
      switch (title) {
        case '已发送':
          this.components.sent = true
          this.components.draft = false
          break
        case '草稿箱':
          this.components.draft = true
          this.components.sent = false
      }
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    gronpDraft,
    gronpSent
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .message-page
    height 100%;
    overflow-y auto
  .logistics-title
    height 40px
    line-height 40px
    background-color #f2f2f2
    color #a4a4a4
    span
      margin-left 10px
      padding-left 10px
      font-size 14px
      border-left 2px solid #00bafa
  .logistics-content
    background #e4e4e4
    padding 10px
    overflow hidden
    li
      float left
      margin-bottom 20px
      width 33.3%
      .logistics-item
        width 90%
        font-size 12px
        overflow hidden
        padding 10px
        padding-top 0px
        background-color #fff
      .detail
        margin-bottom 10px
        font-size 12px
        color #999
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .title
        height 40px
        font-size 14px
        line-height 40px
      .way-item
        float left
        width 50%
        height 30px
        line-height 30px
        cursor pointer
        text-align center
</style>

<template>
  <div class="message-page">
    <p class="logistics-title"><span>系统消息</span></p>
    <el-tabs type="border-card" style="margin-left: 10px; margin-top: 10px" v-model="title">
      <el-tab-pane label="客户端" name="客户端">
        <system-client v-if="components.client"></system-client>
      </el-tab-pane>
      <el-tab-pane label="顾问端" name="顾问端">
        <system-consultant v-if="components.consultant"></system-consultant>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabs, TabPane } from 'element-ui'
import systemClient from './system-client'
import systemConsultant from './system-consultant'

export default {
  data() {
    return {
      components: {
        client: true,
        consultant: false
      },
      title: '客户端'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { type } = this.$route.query
      if (type) {
        if (type === 'client') {
          this.title = '客户端'
          this.components.consultant = false
          this.components.client = true
        } else {
          this.title = '顾问端'
          this.components.consultant = true
          this.components.client = false
        }
      }
    }
  },
  watch: {
    title() {
      const title = this.title
      switch (title) {
        case '客户端':
          this.components.consultant = false
          this.components.client = true
          break
        case '顾问端':
          this.components.consultant = true
          this.components.client = false
      }
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    systemClient,
    systemConsultant
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
     height 60px
     line-height 60px
     background-color #f2f2f2
     span
       margin-left 10px
       padding-left 6px
       border-left 2px solid #00bafa
       color #333
</style>

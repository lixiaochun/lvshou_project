<template>
  <div>
    <div v-for="item in listData" :key="item.parentName" v-loading="loading" >
      <p class="logistics-title"><span>{{ item.name}}</span></p>
      <ul class="logistics-content">
      <li v-for="(list, index) in item.list" :key="index">
        <div class="logistics-item">
          <p class="title" @click="editMessage(list.id, list.code)">{{list.name}}</p>
          <div class="detail" @click="editMessage(list.id, list.code)">{{list.content}}</div>
          <div class="way">
            <template>
              <div class="checkbox-item">
                <el-checkbox v-model="list.sms" @change="changeList(list.code,'sms',list.sms)">短信消息</el-checkbox>
              </div>
              <div class="checkbox-item">
                <el-checkbox v-model="list.push" @change="changeList(list.code,'push',list.push)">push</el-checkbox>
              </div>
              <div class="checkbox-item">
                <el-checkbox v-model="list.sysMessage" @change="changeList(list.code,'sysMessage',list.sysMessage)">站内消息</el-checkbox>
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { TabPane, Checkbox, Tabs, Message, CheckboxGroup } from 'element-ui'
import { ERR_SUCCESS } from 'api/config'
import { sysmsgList, updateChannel } from 'api/message'

export default {
  data() {
    return {
      loading: true,
      listData: []
    }
  },
  created() {
    this._getlist()
  },
  methods: {
    editMessage(id, code) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/message/edit', query: { userType: 1, modleType: 1, code, id }})
    },
    _getlist() {
      this.loading = true
      sysmsgList({ userType: 1 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const listData = res.data
          listData.forEach(e => {
            e.list.forEach(list => {
              if (list.push === 0) {
                list.push = false
              }
              list.push = this.selfBoolean(list.push)
              list.sms = this.selfBoolean(list.sms)
              list.sysMessage = this.selfBoolean(list.sysMessage)
            })
          })
          this.listData = listData
          this.loading = false
        }
      })
    },
    changeList(code, name, state) { // id 键值 状态
      if (state === false) {
        state = 0
      } else {
        state = 1
      }
      const obj = {
        code,
        [name]: state
      }
      updateChannel(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
        }
      })
    },
    selfBoolean(flag) {
      return Boolean(flag)
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
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
    span
      margin-left 10px
      padding-left 6px
      border-left 2px solid #00bafa
      font-size 14px
      color #666
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
      .checkbox-item
        float left
        width 50%
        text-align center
        line-height 30px
        height 30px
      .detail
        margin-bottom 10px
        font-size 12px
        color #999
        cursor pointer
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .title
        height 40px
        font-size 14px
        line-height 40px
        cursor pointer
        &:hover
          color #2196F3
      .way-item
        float left
        width 50%
        height 30px
        line-height 30px
        cursor pointer
        text-align center
</style>

<template>
  <div class="message-page">
    <p class="logistics-title"><span>系统消息</span></p>
    <div class="edit-wapper">
      <div class="edit-text">
        <div class="edit-item">
          <span class="validation">消息类型：</span>
          <template>
            <el-select v-model="objQuery.typeId" size="mini" style="width: 300px" placeholder="选择消息类型">
              <el-option
                v-for="item in messageType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="edit-item">
          <span class="validation">模板名称：</span>
          <el-input size="mini" v-model="objQuery.name" placeholder="【待付款通知】" style="width: 300px"></el-input>
        </div>
        <div class="edit-item">
          <span class="validation">发送条件：</span>
          {{textStart}}
          <el-input size="mini" v-model="objQuery.delayTime" style="width: 100px; padding: 0 5px"></el-input>天{{textEnd}}
        </div>
        <div class="edit-item">
          <span class="validation">发送时间段：</span>
          每日
          <el-time-select
            placeholder="起始时间"
            v-model="objQuery.sendStartTime"
            :picker-options="{
              start: '00:00',
              step: '00:60',
              end: '23:00'
            }"
            size="mini"
            style="width: 120px; margin-right: 7px"
          >
          </el-time-select>
          至
          <el-time-select
            placeholder="结束时间"
            v-model="objQuery.sendEndTime"
            :picker-options="{
              start: '00:00',
              step: '00:60',
              end: '23:00'
            }"
            size="mini"
            style="width: 120px; margin-left: 7px">
          </el-time-select>
        </div>
        <div>
          <div class="edit-item">
            <span  class="validation" style="height: 60px; float: left; padding-top: 10px">编辑内容：</span>
            <div class="add-wapper">
              <div class="edit-content">
                <el-input type="textarea" v-model="content"  placeholder="请输入消息内容" style="width: 400px; height: 120px"></el-input>
              </div>
              <div class="prompt">
                <div>已输入<label>{{content ? content.length : 0}}</label>字</div>
                <div style="float: right; width: 200px">
                  <template>
                    <el-select v-model="value" size="mini" style="float: right" placeholder="请选择" @change="handleChange(value)">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </template>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="submit" style="width: 480px; float: left; margin-bottom: 20px; text-align: right">
          <el-button size="mini" style="width: 80px" @click="cancel">返回列表</el-button>
          <el-button size="mini" style="width: 80px" type="primary" @click="submit">确定</el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { TabPane, Checkbox, Tabs, Select, TimeSelect, Option, Message, Cascader, CheckboxGroup, Input, Button, Radio } from 'element-ui'
import { ERR_SUCCESS } from 'api/config'
import { baseTypeList, sysmsgDetail, sysmsgUpdate, variableList } from 'api/message'
export default {
  data() {
    return {
      hasImg: true,
      textStart: '',
      textEnd: '',
      uploads: '',
      value: '',
      delayType: 2,
      options: [], // 变量列表
      objQuery: {
        id: '',
        sysMessage: true,
        typeId: '',
        name: '',
        delayTime: 1,
        delayType: 3,
        sendStartTime: '',
        sendEndTime: '',
        contentList: ''
      },
      content: '',
      message: '',
      messageType: ''
    }
  },
  created() {
    this.init()
    this._forTime(24)
  },
  methods: {
    init() {
      const { userType, modleType, code, id } = this.$route.query
      this.objQuery.id = id
      this._getlist(userType, modleType) // 获取消息类型
      this._variableList(code) // 获取变量
      this._sysmsgDetail(id) // 获取详情
    },
    _getlist(userType, modleType) { // 获取消息类型
      baseTypeList({ userType, modleType }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.messageType = res.data
        }
      })
    },
    _variableList(code) { // 获取变量
      variableList({ code }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.options = res.data
        }
      })
    },
    _sysmsgDetail(id) { // 获取详情
      sysmsgDetail({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const sysMessages = res.data.sysMessage
          this.objQuery = sysMessages
          this.objQuery.sendStartTime = sysMessages.sendStartTime + ' 00'
          this.objQuery.sendEndTime = sysMessages.sendEndTime + ' 00'
          const text = sysMessages.condDesc.split('{delay_time}{delay_type}')
          this.textStart = text[0]
          this.textEnd = text[1]
          const contentList = res.data.contentList
          this.content = contentList[0].content
          this.objQuery.contentList = contentList
        }
      })
    },
    _sysmsgUpdate() {
      this.objQuery.contentList[2].content = this.content
      const { id, typeId, name, delayTime, delayType, contentList, sysMessage } = this.objQuery
      const sendStartTime = this._subString(this.objQuery.sendStartTime)
      const sendEndTime = this._subString(this.objQuery.sendEndTime)
      sysmsgUpdate({ id, typeId, name, delayTime, delayType, sendStartTime, sendEndTime, sysMessage, contentList: JSON.stringify(contentList) }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
          // eslint-disable-next-line standard/object-curly-even-spacing
          this.$router.push({ path: '/message/systemMessage', query: { type: 'consultant' }})
        }
      })
    },
    cancel() {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/message/systemMessage', query: { type: 'consultant' }})
    },
    handleChange(e) {
      this.objQuery.content += e
    },
    _detail() {

    },
    submit() {
      this._sysmsgUpdate() // 提交更新
    },
    _subString(str) {
      return str.substring(0, 2)
    },
    _subState(str) {
      switch (str) {
        case true:
          return 1
        default:
          return 0
      }
    },
    _forTime(number) { // 获取时分秒
      this.messageTimeList = []
      for (var i = 0; i < number; i++) {
        this.messageTimeList.push({ id: i + 1, name: i + 1 })
      }
    },
    editMessage() {
      this.$router.push({ path: '/message/edit' })
      // alert('编辑')
    },
    selectName(index) {
      this.selectItem = index
    }
  },
  watch: {
    delayType(val) {
      if (val === 1) {
        this.objQuery.delayType = 1
        this._forTime(60)
      } else {
        this.objQuery.delayType = 2
        this._forTime(24)
      }
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [TimeSelect.name]: TimeSelect,
    [Input.name]: Input,
    [Cascader.name]: Cascader,
    [Select.name]: Select,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [Option.name]: Option
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .message-page
    height 100%;
    background-color #f6f7f9
    overflow-y auto
  .logistics-title
    height 40px
    line-height 40px
    background-color #f2f2f2
    span
      margin-left 10px
      padding-left 6px
      border-left 2px solid #00bafa
      color #333
  .edit-wapper
      background-color #fff
      margin 20px
      padding 20px
      overflow hidden
      .edit-show
        width 300px
        float left
      .edit-text
        float left
        width 600px
        padding-top 10px
      .edit-item
        margin-bottom 10px
        font-size 12px
        padding-top 10px
        overflow hidden
        span
          display inline-block
          width 80px
          color #333
        .validation
          position relative
          &:before
            content:'*'
            color red
            margin-right 3px
      .add-wapper
        display inline-block
        .add-img
            position relative
            margin-bottom 8px
            height 100px
            width 100px
            display inline-block
            line-height 100px
            text-align center
            cursor pointer
            color #199ED8
            border 1px solid #dcdfe6
            img
              max-width 100%
              height 100%
            .upload-item
              height 100px
              .upload-item-close
                  position absolute
                  top -5px
                  right -5px
                  width 14px
                  height 14px
                  text-align center
                  line-height 14px
                  background-color  #fff
                  cursor pointer
                  border-radius 50%
            .list-upload
              position absolute
              left 0
              top 0
              height 100px
              width 100px
              opacity 0
              cursor pointer
        .prompt
            font-size 12px
            line-height 20px
            color #ff9865
            label
              padding 0 2px
              color red
            div
              display inline-block
        .edit-content
          margin-bottom 14px
          font-size 12px
  .notification-content
    height 520px
    width 300px
    background url("../../static/notification.png")
    background-size 100%
    position relative
  .push
    background url("../../static/push.png")
    background-size 100%
    .push-item
      padding 10px
      position absolute
      top 225px
      left 14px
      width 252px
      font-size 12px
      border-radius 6px
      background:rgba(167,167,167,0.9)
      .title
        margin-top 6px
        font-weight bold
        line-height 20px
      .time
        height 20px
        em
          float right
          margin-right 20px
          font-style normal
          line-height 20px
      div
        margin-top 4px
        height 12px
        overflow hidden
      .logo-icon
        height 20px
        line-height 20px
        img
          vertical-align middle
          margin-right 2px
  .stand
    background url("../../static/stand.png")
    background-size 100%
    .stand-item
      background #fff
      padding 20px
      width 253px
      left 3px
      position absolute
      top 95px
      font-size 12px
      p
        height 20px
        line-height 20px
        font-weight bold
      div
        line-height 18px
  .checkbox-item
    display inline-block
    margin-right 10px
  .notification
    padding 10px
    width 200px
    font-size 12px
    border-radius 5px
    background  #f2f2f2
    position relative
    top 80px
    left 20px
    p
      font-size 14px
      font-weight bold
      color #333
      margin-bottom 8px
    div
      line-height 20px
    &::after
      content ''
      display block
      position absolute
      bottom  10px
      left -12px
      width 0
      height 0
      border-top 6px solid transparent
      border-right 12px solid #f2f2f2
      border-bottom 6px solid transparent
  .message-way
    display inline-block
    li
      float left
      width 80px
      height 30px
      text-align center
      line-height 30px
      border 1px solid #c2c2c2
      cursor: pointer
      &:nth-child(2)
        border-left: 0
        border-right 0
    .active
      background #00bafa
      color #fff
  .submit
    width 100%
    text-align center
    float left
    margin 20px 0
</style>

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
          <template>
            <el-select v-model="objQuery.delayTime" size="mini" style="width: 80px" placeholder="1">
              <el-option
                v-for="item in messageTimeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>

            <el-select v-model="objQuery.delayType" size="mini" style="width: 80px" @change="changeType">
              <el-option
                v-for="item in messageTimeUnitList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          {{textEnd}}
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
        <div class="edit-item">
          <span class="validation">发送方式：</span>
          <template>
            <div class="checkbox-item">
              <el-checkbox v-model="objQuery.sms">短信消息</el-checkbox>
            </div>
            <div class="checkbox-item">
              <el-checkbox v-model="objQuery.push">push</el-checkbox>
            </div>
            <div class="checkbox-item">
              <el-checkbox v-model="objQuery.sysMessage">站内消息</el-checkbox>
            </div>
          </template>
        </div>
        <div class="edit-item">
          <span class="validation" style="float: left; line-height: 30px">编辑内容：</span>
          <ul class="message-way">
            <li :class="{active:index==selectItem }" v-for="(item, index) in selectList" :key="item" @click="selectName(index)">{{ item }}</li>
          </ul>
        </div>
        <div v-if="selectItem==0">
          <!--短信消息-->
          <div class="edit-item">
            <span class="validation">签名：</span>
            <el-input size="mini" v-model="sms.title" placeholder="【待付款通知】" style="width: 300px"></el-input>
          </div>
          <div class="edit-item">
            <span  class="validation" style="height: 60px; float: left; padding-top: 10px">编辑内容：</span>
            <div class="add-wapper">
              <div class="edit-content">
                <el-input type="textarea" v-model="sms.content"  placeholder="请输入消息类型" style="width: 400px; height: 120px"></el-input>
              </div>
              <div class="prompt">
                <div>已输入<label>{{sms.content ? sms.content.length : 0}}</label>字</div>
                <div style="float: right; width: 200px">
                  <template>
                    <el-select v-model="sms.codeArr" size="mini" style="float: right" placeholder="请选择" @change="handleChange('sms')">
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

        <div v-if="selectItem==1">
          <div class="edit-item">
            <span class="validation">签名：</span>
            <el-input size="mini" v-model="push.title" placeholder="【待付款通知】" style="width: 300px"></el-input>
          </div>
          <div class="edit-item">
            <span  class="validation" style="height: 60px; float: left; padding-top: 10px">编辑内容：</span>
            <div class="add-wapper">
              <div class="edit-content">
                <el-input type="textarea" v-model="push.content"  placeholder="请输入消息类型" style="width: 400px; height: 120px"></el-input>
              </div>
              <div class="prompt">
                <div>已输入<label>{{push.content ? push.content.length : 0}}</label>字</div>
                <div style="float: right; width: 200px">
                  <template>
                    <el-select v-model="push.codeArr" size="mini" style="float: right" placeholder="请选择" @change="handleChange('push')">
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

        <div v-if="selectItem==2">
          <div class="edit-item">
            <span class="validation">签名：</span>
            <el-input size="mini" v-model="sysMessage.title" placeholder="【待付款通知】" style="width: 300px"></el-input>
          </div>
          <div class="edit-item">
            <span class="validation" style="height: 30px; float: left; line-height: 30px">插入图片：</span>
            <div class="add-wapper">
              <div class="add-img"  v-if="hasImg">
                + 添加图片
                <input
                  type="file"
                  class="list-upload" @change="handleUpload">
              </div>
              <div class="add-img" v-else>
                <div class="upload-item">
                  <img :src="sysMessage.msgUrl">
                  <span class="upload-item-close icon-close" @click="handleDelete(uploads)"></span>
                </div>
              </div>
              <p class="prompt">建议使用宽238*高238像素的图片，图片小于500kb，支持gif、jpg、</p>
              <p class="prompt">jpge、png、bmg图片格式</p>
            </div>
          </div>
          <div class="edit-item">
            <span  class="validation" style="height: 60px; float: left; padding-top: 10px">编辑内容：</span>
            <div class="add-wapper">
              <div class="edit-content">
                <el-input type="textarea" v-model="sysMessage.content"  placeholder="请输入消息类型" style="width: 400px; height: 120px"></el-input>
              </div>
              <div class="prompt">
                <div>已输入<label>{{sysMessage.content ? sysMessage.content.length : 0}}</label>字</div>
                <div style="float: right; width: 200px">
                  <template>
                    <el-select v-model="sysMessage.codeArr" size="mini" style="float: right" placeholder="插入变量" @change="handleChange('sysMessage')">
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

      </div>
      <div class="edit-show">
        <p style="text-align: center">预览</p>
        <div class="notification-content" v-if="selectItem==0">
            <div class="notification">
              <p>{{ sms.title }}</p>
              <div>{{ sms.content }}</div>
            </div>
        </div>
        <div class="notification-content push" v-if="selectItem==1">
          <div class="push-item">
            <p class="time">
              <span class="logo-icon"><img src="../../static/logo-icon.png">壹邦</span>
              <em class="">20分钟前</em>
            </p>
            <p class="title">{{ push.title }}</p>
            <div>{{ push.content }}</div>
          </div>
        </div>
        <div class="notification-content stand" v-if="selectItem==2">
          <div class="stand-item">
            <p class="title">{{ sysMessage.title }}</p>
            <div>{{ sysMessage.content }}</div>
          </div>
        </div>
      </div>
      <div class="submit" style="width: 100%; float: left; margin-bottom: 20px; text-align: center">
        <el-button size="mini" style="width: 80px" @click="cancel">返回列表</el-button>
        <el-button size="mini" style="width: 80px" type="primary" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { TabPane, Checkbox, Tabs, Select, TimeSelect, Option, Message, Cascader, CheckboxGroup, Input, Button, Radio } from 'element-ui'
import { ERR_SUCCESS } from 'api/config'
import { baseTypeList, sysmsgDetail, sysmsgUpdate, variableList } from 'api/message'
import { levelPploadPic } from 'api/upload'
export default {
  data() {
    return {
      textStart: '',
      textEnd: '',
      hasImg: true,
      uploads: '',
      selectItem: 0,
      selectList: ['短信消息', 'push', '站内消息'],
      options: [], // 变量列表
      objQuery: {
        id: '',
        typeId: '',
        name: '',
        delayTime: 1,
        delayType: 1,
        sendStartTime: '',
        sendEndTime: '',
        file: '',
        push: false,
        sms: false,
        sysMessage: false,
        contentList: []
      },
      sms: {
        id: 1,
        content: '',
        title: '',
        code: '',
        codeArr: [],
        sendChannel: 1
      },
      push: {
        id: 2,
        content: '',
        title: '',
        code: '',
        codeArr: [],
        sendChannel: 2
      },
      sysMessage: {
        id: 3,
        content: '',
        title: '',
        code: '',
        codeArr: [],
        sendChannel: 3,
        msgUrl: ''
      },
      selectedOptions2: [],
      messageType: [], // 消息类型
      messageTime: '', // 时/分数字
      messageTimeList: [],
      messageTimeUnit: '', // 时/分
      messageTimeUnitList: [{
        id: 2,
        name: '小时'
      }, {
        id: 1,
        name: '分钟'
      }],
      message: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { userType, modleType, id, code } = this.$route.query
      this.objQuery.id = id
      this._getlist(userType, modleType)
      this._variableList(code)
      this._sysmsgDetail(id, userType)
    },
    handleUpload(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
      if (!reg.test(name)) {
        target.value = ''
        Message.error('请上传图片类型的格式！')
        return
      }
      if (size > 500000) {
        target.value = ''
        Message.error('请上传图片大小少于500KB！')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target.result
        this.getImgStyle(url, (width, height) => {
          const obj = {
            name,
            url,
            file,
            width: width + 'px',
            height: height + 'px',
            progress: 0
          }
          this.uploads = obj
          levelPploadPic(file, function(e) {
            if (e === 1) {
              obj.isUpload = true
            }
          }).then(res => {
            this.hasImg = false
            if (res.data.picUrl) {
              this.sysMessage.msgUrl = res.data.picUrl
            }
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    getImgStyle(url, callback, px = 120) {
      const img = document.createElement('img')
      img.onload = function(e) {
        const { width, height } = e.target
        let _width, _height
        if (width > height) {
          _height = px
          _width = px * width / height
        } else {
          _width = px
          _height = px * height / width
        }
        callback && callback(_width, _height)
      }
      img.src = url
    },
    handleDelete(d) {
      this.hasImg = true
      this.uploads.url = ''
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
          sysMessages.sysMessage = this.selfBoolean(sysMessages.sysMessage)
          sysMessages.push = this.selfBoolean(sysMessages.push)
          sysMessages.sms = this.selfBoolean(sysMessages.sms)
          this.objQuery.options = []
          const contentList = res.data.contentList
          this.objQuery.contentList = contentList
          this.sms = contentList[0]
          this.push = contentList[1]
          this.sysMessage = contentList[2]
          if (sysMessages.delayType === 1) {
            this._forTime(60)
          } else if (sysMessages.delayType === 2) {
            this._forTime(24)
          }
        }
      })
    },
    selfBoolean(flag) {
      return Boolean(flag)
    },
    cancel() {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/message/systemMessage', query: { type: 'client' }})
    },
    _sysmsgUpdate() {
      if (this.isvalidation()) return
      const { id, typeId, name, delayTime, delayType, file } = this.objQuery
      const sendStartTime = this._subString(this.objQuery.sendStartTime)
      const sendEndTime = this._subString(this.objQuery.sendEndTime)
      const sms = this._subState(this.objQuery.sms)
      const push = this._subState(this.objQuery.push)
      const sysMessage = this._subState(this.objQuery.sysMessage)
      this.objQuery.contentList = []
      if (push && this.push) {
        this.objQuery.contentList.push(this.push)
      }
      if (sms && this.sms) {
        this.objQuery.contentList.push(this.sms)
      }
      if (sysMessage && this.sysMessage) {
        this.objQuery.contentList.push(this.sysMessage)
      }
      console.log(this.sysMessage)
      const contentList = this.objQuery.contentList
      sysmsgUpdate({ id, typeId, name, delayTime, delayType, sendStartTime, sendEndTime, file, push, sms, sysMessage, contentList: JSON.stringify(contentList) }).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message.success('修改成功')
          this.$router.go(-1)
        }
      })
    },
    isvalidation() {
      const { typeId, name, delayTime, sendStartTime, sendEndTime, push, sms, sysMessage } = this.objQuery
      if (!typeId) {
        Message.error('请选择消息类型')
        return true
      }
      if (!push && !sms && !sysMessage) {
        Message.error('请至少选择一种发送方式')
        return true
      }
      if (!name) {
        Message.error('请选择模板名称')
        return true
      }
      if (delayTime === 0) {
        return false
      } else {
        if (!delayTime) {
          Message.error('请选择发送条件')
          return true
        }
      }
      if (!sendStartTime || !sendStartTime) {
        Message.error('请选择发送时间段')
        return true
      }
      if (!sendEndTime) {
        Message.error('请选择发送时间')
        return true
      }
      return false
    },
    _detail() {

    },
    submit() {
      this._sysmsgUpdate() // 提交更新
    },
    handleChange(e) {
      switch (e) {
        case 'sms':
          const num = this.sms.codeArr
          this.sms.content += num
          break
        case 'push':
          const pushnum = this.push.codeArr
          this.push.content += pushnum
          break
        case 'sysMessage':
          const sysMessagenum = this.sysMessage.codeArr
          this.sysMessage.content += sysMessagenum
          break
        default:
      }
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
      for (var i = 0; i <= number; i++) {
        this.messageTimeList.push({ id: i, name: i })
      }
    },
    editMessage() {
      this.$router.push({ path: '/message/edit' })
      // alert('编辑')
    },
    selectName(index) {
      this.selectItem = index
    },
    changeType(value) {
      if (value === 1) {
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

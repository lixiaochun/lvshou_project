<template>
  <div class="message-page">
    <p class="logistics-title"><span>群发消息</span></p>
    <div class="edit-wapper">
      <div class="edit-show">
        <div class="notification-content" :class="centendBg" v-show="selectItem !== 3">
            <div class="notification" v-if="selectItem === 0">
              <div v-if="content.length > 0">{{ content }}</div>
            </div>
            <div class="push-content"  v-if="selectItem === 1">
              <div class="push-item">
                <p class="time">
                  <span class="logo-icon"><img src="../../static/logo-icon.png">壹邦-运营端</span>
                  <em class="">20分钟前</em>
                </p>
                <p class="title">{{ title }}</p>
                <div>{{ content }}</div>
              </div>
            </div>
            <div class="stand-content"  v-if="selectItem === 2">
              <div class="stand-item">
                <p class="title">{{ title }}</p>
                <div>{{ content }}</div>
              </div>
            </div>
        </div>
      </div>
      <div class="edit-text">
          <div class="edit-item">
            <div class="mass">
                <!-- <div style="font-size:12px;margin-left:10px">提示：先下载模板然后导入会员</div> -->
              <span class="mark" style="line-height:30px;">选择用户：</span>
               <!-- <div> 提示：更改时重新导入会员</div> -->
              <div class="mass-wapper">
                <div style="padding-bottom:75px;">
                  <input type="text" :placeholder="name" disabled style="padding:8px">
                    <!-- <input type="text" placeholder="xxxxx.xlsx" style="padding:10px" disabled > -->
                    <!-- <a :href="excelUrl" v-else>template.xlsx</a> -->
                    <el-button type="primary" size="mini"><a href="http://resource.yijiankang.info/doc/template/template01.xlsx" style="color:white">下载模版</a></el-button>
                  <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"  @change="handleUpload" class="input"/>
                    <el-button type="primary" size="mini" class="importMember">导入会员</el-button>
                    <!-- <div style="font-size:12px;color:#c0c4cc;">已选择{{num}}人</div> -->
                </div>
                <div class="edit-item">
                  <ul class="message-way">
                    <li :class="{active:index==selectItem}"
                    v-for="(item, index) in selectList"
                    disabled
                    :key="item"
                    @click="selectName(index)">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 消息类型有更改，没有用户类型和模块分类 -->
        <!-- <div class="edit-item"  v-if="selectItem === 2">
          <span class="mark" style="height: 28px; line-height: 28px">消息类型：</span>
          <div class="add-wapper">
            <div class="edit-content">
                <el-select v-model="messType" size="mini" style="width: 400px" placeholder="消息类型">
                <el-option
                  v-for="item in messages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div> -->
        <div class="edit-item" v-show="selectItem === 1 || selectItem === 2">
          <span class="mark" style="height: 28px; line-height: 28px">设置标题：</span>
          <div class="add-wapper">
            <div class="edit-content">
              <el-input v-model="title"  placeholder="请输入标题" style="width: 400px;" size="mini"></el-input>
            </div>
          </div>
        </div>
          <div class="edit-item">
            <span class="mark" style="height: 60px; padding-top: 10px">编辑内容：</span>
            <div class="add-wapper">
              <div class="edit-content">
                  <el-input type="textarea" v-model="content"  placeholder="请输入消息内容" style="width: 400px; height: 120px">
                  </el-input>
              </div>
              <div>
              <div class="prompt">
                <div>已输入<label>{{content ? content.length : 0}}</label>字</div>
            </div>
              </div>
            </div>
            </div>
          <div class="edit-item">
            <span class="mark" style="height: 34px; line-height: 34px">发送时间：</span>
            <div class="add-wapper">
            <el-radio v-model="sendType" label="1" style="float: left; margin-top: 8px">立刻发送</el-radio>
            <div class="timing">
              <el-radio v-model="sendType" label="2">定时发送</el-radio>
              <el-date-picker type="datetime" size="mini" v-model="sendTime" placeholder="发送时间" style="width: 183px;">
              </el-date-picker>
            </div>
          </div>
          </div>
           <div class="edit-item">
            <span class="mark" style="height: 34px; line-height: 34px">URL链接：</span>
            <div class="add-wapper">
              <el-input size="mini" v-model="url" style="width:200%"></el-input>
            </div>
          </div>
          <div class="edit-item" style="text-align: center">
            <el-button size="mini" style="width: 100px" @click="cancel">返回列表</el-button>
            <el-button size="mini" plain style="width: 100px" @click="saveData(0,idState)">保存到草稿箱</el-button>
            <el-button size="mini"  type="primary" plain style="width: 100px" @click="saveData(1, idState)">确定</el-button>
          </div>
      </div>
    </div>
    <wrong-tip :account=account :list=list :dialogVisible=dialogVisible @close='close'></wrong-tip>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex'
import { Checkbox, CheckboxButton, DatePicker, Message, Select, Option, CheckboxGroup, Input, Button, Radio, MessageBox } from 'element-ui'
import { format, isNull } from 'common/js/util'
import { groupmsgDetail, sendMsgByExcel } from 'api/message'
import wrongTip from 'base/wrong-tip/wrong-tip'
import { ERR_SUCCESS } from 'api/config'

export default {
  data() {
    return {
      centendBg: '',
      selectList: ['短信消息', 'push', '站内消息'],
      selectItem: 0,
      sendStatus: '',
      sendChannel: '1', // 发送渠道
      sendType: '1', // 发送方式
      sendTime: '', // 发送时间
      title: '', // 发送标题
      content: '', // 消息内容
      messType: '', // 消息类型，
      queryVux: '',
      file: '',
      name: 'xxxx.xslx',
      url: '',
      idState: '',
      userType: '',
      dialogVisible: false,
      list: [],
      account: '',
      excelUrl: ''
    }
  },
  created() {
    const { id, userType } = this.$route.query
    if (id) {
      this.idState = id
      this._groupmsgDetail(id)
    }
    this.userType = userType
  },
  computed: {
    ...mapGetters(['messageUser'])
  },
  methods: {
    selectName(index) {
      this.selectItem = index
      this.sendChannel = index + 1 + ''
      switch (index) {
        case 0:
          this.centendBg = 'notification-content'
          break
        case 1:
          this.centendBg = 'push'
          break
        default:
          this.centendBg = 'stand'
      }
    },
    close() {
      this.dialogVisible = false
    },
    // input 操作,得到file
    handleUpload(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      this.file = file
      console.log(file)
      this.name = file.name
    },
    cancel() {
      if (this.userType === 'draft') {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/message/groupMessage', query: { type: 'draft' }})
      } else {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/message/groupMessage', query: { type: 'sent' }})
      }
    },
    _groupmsgDetail(id) { // 查看详情
      groupmsgDetail({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data.groupMessage
          this.title = data.title
          this.content = data.content
          this.sendType = data.sendType + ''
          this.selectItem = data.sendChannel - 1
          this.sendTime = data.sendTime
          this.total = data.sendCount
          this.url = data.linkUrl
          this.file = data
          this.excelUrl = data.excelUrl
          if (!data.sendTime) {
            this.sendTime = ''
          }
          this.selectName(this.selectItem)
        }
      })
    },
    saveData(number, ids) {
      if (ids) {
        this._updata(number, ids)
      } else {
        this._save(number)
      }
    },
    _save(number) {
      // if (this.isvalidation()) return
      this.sendStatus = number
      const { content, title, sendChannel, sendType, sendTime, url, file, sendStatus, selectItem } = this
      let _sendTime = ''
      if (sendTime) {
        _sendTime = format(sendTime, '$1-$2-$3 $4:$5:$6')
      } else {
        _sendTime = ''
      }
      if (isNull(content)) {
        return Message.error('请输入内容')
      }
      if (selectItem === '1' || selectItem === 1) {
        if (isNull(title)) {
          return Message.error('请输入标题')
        }
      }
      sendMsgByExcel(file, sendChannel, title, content, sendType, _sendTime, sendStatus, url, '').then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          if (data.code === 'success') {
            MessageBox.confirm(`恭喜，会员导入验证成功，共${data.count}笔`, '会员导入验证成功', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(actions => {
              Message.success('操作成功')
              if (number === 0) {
                // eslint-disable-next-line standard/object-curly-even-spacing
                this.$router.push({ path: '/message/groupMessage', query: { type: 'draft' }}) // 草稿
              } else {
                // eslint-disable-next-line standard/object-curly-even-spacing
                this.$router.push({ path: '/message/groupMessage', query: { type: 'sent' }})
              }
            })
          } else if (data.code === 'error') {
            this.list = data.errorList
            this.dialogVisible = true
            this.account = data.count
          }
        } else {
          return Message.error(res.msg)
        }
      })
    },
    _updata(number) {
      this.sendStatus = number
      const { content, title, sendChannel, sendType, sendTime, url, file, sendStatus, selectItem, idState } = this
      let _sendTime = ''
      if (sendTime) {
        _sendTime = format(sendTime, '$1-$2-$3 $4:$5:$6')
      } else {
        _sendTime = ''
      }
      if (isNull(content)) {
        return Message.error('请输入内容')
      }
      if (selectItem === '1' || selectItem === 1) {
        if (isNull(title)) {
          return Message.error('请输入标题')
        }
      }
      sendMsgByExcel(file, sendChannel, title, content, sendType, _sendTime, sendStatus, url, idState).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          if (data.code === 'success') {
            MessageBox.confirm(`成功${data.count}笔`, '会员导入验证成功', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(actions => {
              Message.success('更新成功')
              if (number === 0) {
                // eslint-disable-next-line standard/object-curly-even-spacing
                this.$router.push({ path: '/message/groupMessage', query: { type: 'draft' }}) // 草稿
              } else {
                // eslint-disable-next-line standard/object-curly-even-spacing
                this.$router.push({ path: '/message/groupMessage', query: { type: 'sent' }})
              }
            })
          } else if (data.code === 'error') {
            this.list = data.errorList
            this.dialogVisible = true
            this.account = data.count
          }
        } else {
          return Message.error(res.msg)
        }
      })
    },
    // _updata (number) {
    //   // if (this.isvalidation()) return
    //   this.sendStatus = number
    //   const {sendStatus, sendChannel, sendType, idState, sendTime, title, content, messType, offlineTime} = this
    //   const { levelSequence, userType, isBrm, startTime, endTime, startLoginDate, endLoginDate } = this.queryObj
    //   const params = { levelSequence, userType, isBrm, startTime, endTime, startLoginDate, endLoginDate }
    //   let _sendTime = ''
    //   if (sendTime) {
    //     _sendTime = format(sendTime, '$1-$2-$3 $4:$5:$6')
    //   } else {
    //     _sendTime = ''
    //   }
    //   groupmsgUpdata({
    //     id: idState,
    //     sendStatus,
    //     sendChannel,
    //     sendType,
    //     sendTime: _sendTime,
    //     title,
    //     offlineTime: format(offlineTime, '$1-$2-$3 $4:$5:$6'),
    //     content,
    //     messType,
    //     params: JSON.stringify(params)
    //   }).then(res => {
    //     if (res.code === ERR_SUCCESS) {
    //       Message.success(res.data)
    //       if (number === 0) {
    //         this.$router.push({path: '/message/groupMessage', query: {type: 'draft'}}) // 草稿
    //       } else {
    //         this.$router.push({path: '/message/groupMessage', query: {type: 'sent'}})
    //       }
    //     } else if (res.code === ERR_REPEAT) {
    //       let ms = res.data
    //       if (sendStatus) {
    //         MessageBox.confirm(ms, '系统提示', {
    //           confirmButtonText: '确定',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(action => {
    //           groupmsgUpdata({
    //             sign: 1,
    //             id: idState,
    //             sendStatus,
    //             sendChannel,
    //             sendType,
    //             sendTime: _sendTime,
    //             title,
    //             offlineTime: format(offlineTime, '$1-$2-$3 $4:$5:$6'),
    //             content,
    //             messType,
    //             params: JSON.stringify(params)
    //           }).then(res => {
    //             if (res.code === ERR_SUCCESS) {
    //               Message({
    //                 message: '更新成功！',
    //                 type: 'success'
    //               })
    //               if (number === 0) {
    //                 this.$router.push({path: '/message/groupMessage', query: {type: 'draft'}}) // 草稿
    //               } else {
    //                 this.$router.push({path: '/message/groupMessage', query: {type: 'sent'}})
    //               }
    //             } else {
    //               Message.error(res.msg)
    //             }
    //           })
    //         }).catch(erro => {})
    //       } else {
    //       }
    //     } else {
    //       Message.error(res.msg)
    //     }
    //   })
    // },
    ...mapActions(['setMessageUser'])
  },
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [CheckboxButton.name]: CheckboxButton,
    [Checkbox.name]: Checkbox,
    [Input.name]: Input,
    [DatePicker.name]: DatePicker,
    [Button.name]: Button,
    [Select.name]: Select,
    [Radio.name]: Radio,
    [Option.name]: Option,
    [MessageBox.name]: MessageBox,
    wrongTip
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
  .edit-item
    margin-bottom 4px
    font-size 12px
    padding-top 4px
    overflow hidden
  .edit-wapper
      background-color #fff
      margin 20px
      padding 20px
      overflow hidden
      .edit-show
        width 400px
        float left
      .edit-text
        margin-left 500px
        padding-top 10px
        .mark
          float left
          display inline-block
          width 60px
          height 30px
          color #333
      .add-wapper
        display inline-block
        .add-img
            height 100px
            width 100px
            display inline-block
            line-height 100px
            text-align center
            cursor pointer
            color #199ED8
            border 1px solid #dcdfe6
        .prompt
            font-size 12px
            line-height 30px
            margin-top 10px
            label
              padding 0 2px
              color red
            div
              display inline-block
        .edit-content
          font-size 12px
  .notification-content
    height 520px
    width 300px
    background url("../../static/notification.png")
    background-size 100%
    position relative
  .push
    background-image url("../../static/push.png")
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
    background-image url("../../static/stand.png")
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
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      div
        line-height 18px
  .notification
    padding 10px
    width 240px
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
      word-wrap break-word
    &::after
      content ''
      display block
      position absolute
      bottom  4px
      left -12px
      width 0
      height 0
      border-top 6px solid transparent
      border-right 12px solid #f2f2f2
      border-bottom 6px solid transparent
  .consultant-wapper
    float left
    width 400px
    .active
      background #00bafa
      border-color #00bafa
      color #fff
    span
      display inline-block
      cursor pointer
      width  160px
      height 30px
      line-height 30px
      text-align center
  .mass-wapper
    float left
    width 400px
    overflow hidden
  .mass-message
    height 30px
    line-height 30px
  .mass-list
    padding 10px
    overflow hidden
    border 1px solid #dcdfe6
    .mass-add
      margin 0 10px
      height 20px
      border-bottom 1px solid #dcdfe6
      span
        float right
        cursor pointer
        color #00bafa
    ul
      margin 0 10px
      padding-top 6px
      height 100px
      overflow-y auto
    li
      float left
      width 100%
      line-height 26px
      span
        float left
        width 60px
        &:nth-child(2)
          width 176px
        &:nth-child(4)
          color #00bafa
  .timing
    float left
    margin-left 50px
  .cancel
    float right
    cursor pointer
    color #00bafa
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
      background-color #00bafa
      color #fff
  .message-data
    li
      float left
      margin-right 20px
  .message-item
    margin-bottom 10px
    overflow hidden
    .message-item-select
      float left
      margin-right 10px
  .input
    position absolute
    width 73px
    height 24px
    z-index 999
    opacity 0
</style>

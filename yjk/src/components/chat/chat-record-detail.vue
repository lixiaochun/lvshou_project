<template>
<c-dialog :title="name" @close="goBack">
  <div class="manage-item">
          <div class="message-page">
        <el-tabs type="border-card" class="tab-header" v-model="title">
               <el-tab-pane label="全部" name="全部">
                 <div class="allRecord">
                    <div class="search">
                      <el-input v-model="keywords" placeholder="请输入关键字查询" size="mini" style="width:50%"></el-input>
                <el-button type="primary" size="small" @click="search">搜索</el-button>
    </div>
          <div class="wrapper">
          <div class="content" v-for="(item,index) in options" :key="index">
            <div v-if="item.source === 2" class="avatorWrapper"><img class="avator" :src="item.consultPortraitUrl"></div>
            <div v-else class="avatorWrapper"><img class="avator" :src="item.appUserPortraitUrl"></div>
            <div :class = "[item.source == 1 ? 'appUser' : 'consult', 'header']">
              <span class="role">{{item.source === 1 ? '(客户)' : '(顾问)'}}</span>
              <span class="name">{{item.source === 1 ? item.appUserName : item.consultName}}</span>
              <span class="time">{{item.time}}</span>
              <p class="message"> <span v-if="item.type === 'RC:TxtMsg'" v-html="item.content">{{item.content}}</span>
                <span v-if="item.type === 'RC:ImgMsg'"><img :src="item.content" style="height:100px;width:100px" ></span>
                <!-- <span v-if="item.type === 'RC:VCAccept'">{{item.duration}}</span> -->
              </p>
          </div>
          </div>
          <div class="member-pagination-content">
            <el-pagination
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              :current-page="pageNum"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="total">
            </el-pagination>
          </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图片" name="图片">
        <pic-record></pic-record>
      </el-tab-pane>
       <el-tab-pane label="语音" name="语音">
        <voice-record></voice-record>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
  </c-dialog>
</template>

<script type="text/ecmascript-6">
import {Tabs, TabPane, Input, Button, Pagination} from 'element-ui'
import PicRecord from './chat-record-pic'
import VoiceRecord from './chat-record-voice'
import cDialog from 'base/c-dialog/c-dialog'
import { getDetail, getSensitiveWordList } from 'api/imRptConsult'
import { ERR_SUCCESS } from 'api/config'

export default {
  data () {
    return {
      keywords: '',
      consultantId: '', //  顾问id
      userId: '', // 用户id
      content: '', // 内容
      type: '', // 图片（Msg,Img）
      options: [],
      images: [],
      title: '全部',
      sensitiveWords: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      name: '聊天记录'
    }
  },
  created () {
    this.$nextTick(() => {
      this._getMsgDetail()
    })
  },
  methods: {
    goBack () {
      const {startTime, endTime, username} = this.$route.query
      this.$router.replace({path: '/chat/record', query: {username, startTime, endTime, e: 1}})
    },
    getWord () {
      getSensitiveWordList({pageSize: 1000}).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.sensitiveWords = res.data.dataList
          const words = this.sensitiveWords.map(item => item.word)
          // console.log(this.options.length)
          for (let i = 0; i < this.options.length; i++) {
            for (let j = 0; j < words.length; j++) {
              let index = this.options[i].content.indexOf(words[j])
              // let index = words[j].indexOf(this.options[i].content)
              if (index > -1) {
                let startIndex = index
                let endIndex = index + words[j].length
                let temp1 = this.options[i].content.substring(0, startIndex)
                let temp2 = this.options[i].content.substring(endIndex)
                this.options[i].content = temp1 + `<span style="background:#f56c6c;">${words[j]}</span>` + temp2
              }
            }
          }
        }
      })
    },
    _getMsgDetail () {
      const {content, type, pageSize, pageNum} = this
      const {consultantId, userid, startTime, endTime} = this.$route.query
      const StartTime = startTime + ' 00:00:00'
      const EndTime = endTime + ' 23:59:59'
      getDetail({consultantId, userId: userid, content, type, startTime: StartTime, endTime: EndTime, pageSize, pageNum}).then((res) => {
        if (res.code === ERR_SUCCESS) {
          this.options = res.data.dataList
          this.total = res.data.total
          this.getWord()
          const ImgOption = this.options.filter((item) => { return item.type === 'RC:ImgMsg' })
          this.images = ImgOption.map((item) => {
            return {content: item.content, time: item.time}
          })
        }
      }).catch()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this._getMsgDetail()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this._getMsgDetail()
    },
    search () {
      this.content = this.keywords
      this.pageNum = 1
      this._getMsgDetail()
    }
  },
  watch: {
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Input.name]: Input,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    [cDialog.name]: cDialog,
    PicRecord,
    VoiceRecord
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
    .manage-item
      width 900px
      overflow-y auto
    .message-page
      width 900px
      height 400px
      margin 0 auto
      padding-bottom 40px
    .search
     height 60px
     padding 10px 3px
     background #ebeef5
     box-sizing border-box
     .el-input
        width 50%
        height 34px
        line-height 34px
        margin 10px 3px
        & >>>.el-input__inner
          height 33px
    .wrapper
      padding 20px
      .content
        display flex
        padding 10px 10px 0 10px
        .avatorWrapper
          display inline-block
          .avator
            width 30px
            height 30px
            border-radius 100%
        .header
          display inline-block
          vertical-align top
          font-size 14px
          text-indent 14px
        .appUser
          color green
        .consult
          color blue
        .message
          text-indent 36px
          padding 14px
          color #6e6a6a
</style>

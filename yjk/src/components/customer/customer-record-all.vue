<template>
<div>
  <div class="allRecord">
                    <div class="search">
                      <el-input v-model="keywords" placeholder="请输入关键字查询" size="mini" style="width:60%;"></el-input>
                <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
          <div class="wrapper"
           v-loading="loading">
            <div v-if="total === 0" class="noData">暂无数据，请输入条件查询</div>
          <div  v-for="(item,index) in options" :key="index">
            <div class='content'>
            <div v-if="item.msgSource === 1" class="avatorWrapper"><img class="avator" :src="item.csPortraitUrl"></div>
            <div v-else class="avatorWrapper"><img class="avator" :src="item.appUserPortraitUrl"></div>
            <div :class = "[item.msgSource == 2 ? 'appUser' : 'consult', 'header']">
              <span class="role">{{item.msgSource === 2 ? '(客户)' : '(客服)'}}</span>
              <span class="name">{{item.msgSource === 2 ? item.appUserName : item.csName}}</span>
              <span class="time">{{_format(item.msgTimestamp)}}</span>
              <span v-if="item.msgStatus === 0" style="color:red">(该消息已被撤回)</span>
              <p class="message">
                <span v-if="item.msgType === 'TEXT'" v-html="emojiToHTML(item.body) || item.body"></span>
                <span v-if="item.msgType === 'PICTURE'"><img :src="item.url" style="height:100px;width:100px" @click.prevent="showBig(item.url)">
                </span>
                <span v-if="item.msgType === 'AUDIO'"><audio :src="item.url" controls="controls"></audio></span>
                <span v-if="item.msgType === 'VIDEO'"> <video :src="item.url" width="300" height="150" ></video>
                <span class="icon-playVideo" @click="openVideo(item.url)" style="color:#73859f"></span></span>
              </p>
          </div>
          </div>
          </div>
          </div>
        </div>
        <!-- <div class="member-pagination-content">
            <el-pagination
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              :current-page="pageNum"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="(n)=> this.changePage('pageNum', n)"
              @size-change="(n)=> this.changePage('pageSize', n)"
              @next-click="(n)=> this.changePage('pageNum', n)"
              @prev-click="(n)=> this.changePage('pageNum', n)"
              :total="total">
            </el-pagination>
          </div> -->
        </div>
</template>

<script type="text/ecmascript-6">
import { Input, Button, Pagination, DatePicker, Dialog } from 'element-ui'
import { getCsmsgDetails } from 'api/customerChat'
import { ERR_SUCCESS } from 'api/config'
import { format } from 'common/js/util'
import { emojiList } from 'common/js/emoji'
export default {
  props: ['listObj'],
  data() {
    return {
      keywords: '',
      content: '', // 内容
      type: '', // 图片（Msg,Img）
      options: [],
      images: [],
      pageSize: 10000,
      pageNum: 1,
      total: 0,
      name: '聊天记录',
      textOptions: [],
      innerVisible: false,
      imgUrl: '',
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 3600 * 1000
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this._getCsmsgDetails()
    })
  },
  methods: {
    _getCsmsgDetails() {
      const { appUserId, csId, StartTime, EndTime } = this.listObj
      const { content, pageSize, pageNum, type } = this
      this.loading = true
      getCsmsgDetails({ appUserId, csId, startTime: StartTime, endTime: EndTime, content, pageSize, pageNum, type }).then((res) => {
        if (res.code === ERR_SUCCESS) {
          this.loading = false
          this.options = res.data.dataList
          this.total = res.data.total
          const ImgOption = this.options.filter((item) => { return item.msgType === 'PICTURE' })
          this.textOptions = this.options.filter((item) => { return item.msgType === 'TEXT' })
          this.images = ImgOption.map((item) => {
            return { content: item.url, time: item.time }
          })
        }
      }).catch()
    },
    // changePage (key, num) {
    //   switch (key) {
    //     case 'pageSize':
    //       this.pageSize = num
    //       this._getCsmsgDetails()
    //       break
    //     case 'pageNum':
    //       this.pageNum = num
    //       this._getCsmsgDetails()
    //       break
    //     default:
    //       break
    //   }
    // },
    search() {
      this.content = this.keywords
      this.pageNum = 1
      this._getCsmsgDetails()
    },
    _format(e) {
      return format(e, '$1-$2-$3 $4:$5:$6')
    },
    showBig(url) {
      window.open(url)
    },
    emojiToHTML(e) {
      const str = e
      const emojiMap = emojiList
      const strNode = str.replace(/\[.*?\]/g, function(key) {
        if (emojiMap[key]) {
          return '<img src="' + emojiMap[key].file + '" +` style="display:inline-block; width:32px;height:32px"`+/>'
        } else {
          return key
        }
      })
      return strNode
    },
    openVideo(url) {
      window.open(url)
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    [DatePicker.name]: DatePicker,
    [Dialog.name]: Dialog
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
   .manage-item
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
     padding-left 80px
    .member-pagination-content
      position fixed
      bottom 0
      right 5px
     .el-input
        width 50%
        height 34px
        line-height 34px
        margin 10px 3px
        & >>>.el-input__inner
          height 33px
    .wrapper
      padding 20px
      .noData
       text-align center
       font-size 30px
       padding-top 100px
       color #ccc
      .content
        display flex
        position relative
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
          .icon-playVideo
            font-size 37px
            position absolute
            top 90px
      .contentR
        margin-left 65%
        display flex
        position relative
        padding 10px 10px 0 10px
        .avatorWrapper
          display inline-block
          .avator
            width 30px
            height 30px
            border-radius 100%
            position absolute
            right 0
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
          .icon-playVideo
            font-size 37px
            position absolute
            top 90px
            left 184px
</style>

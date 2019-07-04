<template>
    <div style="overflow-y:auto">
        <div class="search">
                  <!-- <span class="label">时间段:</span>
                      <el-date-picker
                      v-model="timeData"
                      style="width: 220px;height:28px;"
                      type="daterange"
                      range-separator="至"
                      size="mini"
                      :start-placeholder="startTime"
                      :end-placeholder="endTime"
                      :picker-options="pickerOptions">
                    </el-date-picker> -->
                      <el-input v-model="keywords" placeholder="请输入关键字查询" size="mini" style="width:60%;"></el-input>
                <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
        <div class="wrapper" v-loading="loading">
        <div v-if="total === 0" class="noData">暂无数据，请输入条件查询</div>
          <div class="content" v-for="(item, index) in options" :key="index">
          <div v-if="item.msgSource === 1" class="avatorWrapper"><img class="avator" :src="item.consultPortraitUrl"></div>
            <div v-else class="avatorWrapper"><img class="avator" :src="item.appUserPortraitUrl"></div>
            <div :class = "[item.msgSource == 2 ? 'appUser' : 'consult', 'header']">
              <span class="role">{{item.msgSource === 2 ? '(客户)' : '(顾问)'}}</span>
              <span class="name">{{item.msgSource === 2 ? item.appUserName : item.consultName}}</span>
              <span class="time">{{_format(item.msgTimestamp)}}</span>
              <span v-if="item.msgStatus === 0" style="color:red">(该消息已被撤回)</span>
             <p class="message">
                <span><video :src="item.url" width="320" height="200" ref="video" ></video> </span>
                 <span class="icon-playVideo" @click.prevent="showFullScreen(item.url, index)"></span>
             </p>
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
import { Pagination, DatePicker, Input, Button } from 'element-ui'
import { getDetail } from 'api/imRptConsult'
import { format } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
export default {
  props: ['listObj'],
  data() {
    return {
      consultantId: '', //  顾问id
      userId: '', // 用户id
      msgType: '', // 图片（Msg,Img）
      content: '',
      options: [],
      pageSize: 10000,
      pageNum: 1,
      total: 0,
      keywords: '',
      duration: '',
      loading: false
      // pickerOptions: {
      //   disabledDate (time) {
      //     return time.getTime() > Date.now() - 24 * 3600 * 1000
      //   }
      // }
    }
  },
  created() {
    this._getMsgDetail()
  },
  methods: {
    _getMsgDetail() {
      const { consultantId, userid, startTime, endTime } = this.listObj
      const StartTime = startTime + ' 00:00:00'
      const EndTime = endTime + ' 23:59:59'
      const { content, pageNum, pageSize } = this
      this.loading = true
      getDetail({ consultantId, userId: userid, content, type: 'VIDEO', pageSize, pageNum, startTime: StartTime, endTime: EndTime }).then((res) => {
        if (res.code === ERR_SUCCESS) {
          this.loading = false
          this.options = res.data.dataList
          this.total = res.data.total
        }
      }).catch()
    },
    // changePage (key, num) {
    //   switch (key) {
    //     case 'pageSize':
    //       this.pageSize = num
    //       this._getMsgDetail()
    //       break
    //     case 'pageNum':
    //       this.pageNum = num
    //       this._getMsgDetail()
    //       break
    //     default:
    //       break
    //   }
    // },
    search() {
      this.content = this.keywords
      this.pageNum = 1
      this._getMsgDetail()
    },
    _format(e) {
      return format(e, '$1-$2-$3 $4:$5:$6')
    },
    showFullScreen(url, index) {
    //   console.log(this.$refs.video[index].duration)
      window.open(url)
    }
  },
  components: {
    [Pagination.name]: Pagination,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
.wrapper
  padding 20px
  .noData
    text-align center
    font-size 30px
    padding-top 100px
    color #ccc
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
.wrapper
  padding 20px
  .content
    position relative
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
      .icon-playVideo
        font-size 37px
        position absolute
        top 120px
        left 200px
</style>

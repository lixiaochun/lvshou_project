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
                      :start-placeholder="StartTime"
                      :end-placeholder="EndTime"
                      :picker-options="pickerOptions">
                    </el-date-picker> -->
                      <el-input v-model="keywords" placeholder="请输入关键字查询" size="mini" style="width:60%;"></el-input>
                <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
        <div class="wrapper" v-loading="loading">
           <div v-if="options.length === 0" class="noData">暂无数据，请输入条件查询</div>
          <div>
           <div>
              <gallery :images="images" :index="picIndex" @close="picIndex = null"></gallery>
            <div v-for="(image, imageIndex) in options" :key="imageIndex" style="overflow:hidden;display:inline-block;">
               <div>{{_format(image.msgTimestamp)}}</div>
              <div
              class="image"
              @click="picIndex = imageIndex"
              :style="{ backgroundImage: 'url(' + image.url + ')', width: '200px', height: '125px' }"
            >
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
    </div>
</template>

<script type="text/ecmascript-6">
import { DatePicker, Input, Button, Pagination } from 'element-ui'
import { getDetail } from 'api/imRptConsult'
import { format } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
import Gallery from 'vue-gallery'
export default {
  props: ['listObj'],
  data() {
    return {
      consultantId: '', //  顾问id
      userId: '', // 用户id
      msgType: '', // 图片（Msg,Img）
      content: '',
      options: [],
      keywords: '',
      imagesOptions: [],
      images: [],
      picIndex: null,
      loading: false,
      pageSize: 10000,
      pageNum: 1,
      total: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 3600 * 1000
        }
      }
    }
  },
  created() {
    this._getMsgDetail()
  },
  methods: {
    _getMsgDetail() {
      const { consultantId, userid, startTime, endTime } = this.listObj
      const { pageSize, pageNum } = this
      const startDate = startTime + ' 00:00:00'
      const endDate = endTime + ' 23:59:59'
      this.loading = true
      getDetail({ consultantId, userId: userid, type: 'PICTURE', pageSize, pageNum, startTime: startDate, endTime: endDate }).then((res) => {
        if (res.code === ERR_SUCCESS) {
          this.loading = false
          this.options = res.data.dataList
          this.images = this.options.map(item => item.url)
          this.total = res.data.total
        }
      }).catch()
    },
    search() {
      this._getMsgDetail()
    },
    _format(e) {
      return format(e, '$1-$2-$3')
    }
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
    // }
  },
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button,
    Gallery,
    [Pagination.name]: Pagination
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"
.wrapper
  padding 20px
  .wrapperItem
    overflow hidden
    padding 10px
  .noData
    text-align center
    font-size 30px
    padding-top 100px
    color #ccc
  .image
    float left
    background-size cover
    background-repeat no-repeat
    background-position center center
    border 1px solid #ebebeb
    margin 5px
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
</style>

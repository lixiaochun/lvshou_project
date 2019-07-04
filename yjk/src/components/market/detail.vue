<template>
  <div class="video-list">
     <div class="video-header">
       <list-table title="修改记录" style="box-shadow:none">
         <div class="video-table">
              <el-table style="width: 100%;"
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    size="mini"
                    v-loading="loading"
                    header-row-class-name="element-headerRowClassName">
            <el-table-column label="总金额" width="150" prop="amount" align="center"></el-table-column>
            <el-table-column label="面值与概率" width="270" align="center">
            <template slot-scope="scope">
             <div v-for="(item, index) in JSON.parse(tableData[scope.$index].remark)" :key="index">
                ¥{{item.denomination}}  ({{item.percentage}}%）
             </div>
             </template>
            </el-table-column>
            <el-table-column label="更新时间"  width="200" align="center">
               <template slot-scope="scope">
                 {{tableData[scope.$index].createTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作人"  prop="name" align="center">
            </el-table-column>
        </el-table>
         <div class="video-pagination">
             <div  class="video-pagination-content">
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
       </list-table>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Input, Button, DatePicker, Table, TableColumn, Switch, RadioGroup,
  Pagination, Select, Option, Cascader, Dialog, Message, Radio, FormItem, Form
} from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { getUpdateRedPacketActivityLog } from 'api/market'

export default {
  props: ['activityid'],
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    }
  },
  created() {
    this._getList()
  },
  computed: {
  },
  methods: {
    _queryData() {
      this.pageNum = 1
      this._getList()
    },
    // 获取列表
    _getList(e) {
      const { activityid, pageNum, pageSize } = this
      this.loading = true
      getUpdateRedPacketActivityLog({ activityid, pageNum, pageSize }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const result = res.data
          this.tableData = result.dataList
          this.pageSize = result.pageSize
          this.pageNum = result.pageNum
          this.total = result.total
          this.loading = false
        }
      })
    },
    // 每页显示
    handleSizeChange(val) {
      this.pageSize = val
      this._getList()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this._getList()
    }
  },
  watch: {
    activityid() {
      this._getList()
    }
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [Button.name]: Button,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Cascader.name]: Cascader,
    [Dialog.name]: Dialog,
    [Message.name]: Message,
    [Radio.name]: Radio,
    [FormItem.name]: FormItem,
    [RadioGroup.name]: RadioGroup,
    [Form.name]: Form,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"

  .video-list
     height 100%
     overflow-y auto
     .title
       height 60px
       line-height 60px
       background #f2f2f2
       span
         position relative
         margin-left 8px
         padding-left 10px
         color #666
         font-size 16px
         &:before
           position absolute
           top 2px
           left -2px
           content ""
           width 2px
           display inline-block
           height 14px
           background #00bafa
     .video-header
       position relative
       .video-header-query
         width 96%
         margin 0 auto;
         font-size 0
         .video-header-item
           padding-right 1%
           height 40px
           line-height 40px
           inline-block-top()
           & > .label
            float left
            width 40px
            font-size $font-size-sm
            inline-block-top()
           & > .video-input-item
            display block
            margin-left 40px
            font-size $font-size-sm
        .icon-playVideo:before
          content "\E929"
          color #e9eff1
          position absolute
          left 41%
          top 30%
          font-size 30px
          cursor pointer
        .time
          position absolute
          right 10%
          bottom 15%
          color #e9eff1
        .video-button
          position absolute
          display inline-block
          padding-top 5px
          width 21%
          height 28px
          text-align center
          button
            margin-right 25px
            width 120px
       .video-table
         padding 0 10px
       .video-pagination
          padding 21px 0
          height 32px
          line-height 32px
          border 1px solid #ebeef5
          border-top none
          overflow hidden
         .video-pagination-select
           inline-block-top()
         .video-pagination-checkbox
           width 34px
           height 32px
           line-height 32px
           text-align center
           inline-block-top()
         .video-pagination-content
           float right
           margin-right 20px
           inline-block-top()
  .list-upload
    position absolute
    top 30%
    left 0
    margin-top -14px
    width 80px
    height 28px
    opacity 0
    cursor pointer
  .msg
    position absolute
</style>

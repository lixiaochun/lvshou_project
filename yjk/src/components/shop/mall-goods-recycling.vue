<template>
  <div class="custom-page">
    <div class="custom-page-left">
      <div class="custom-page-left-content">
        <list-table :border="true">
          <slot slot="query">
            <div>
              <ul class="screening">
                <li>
                  <span>商品分类：</span>
                  <div class="screening-content">
                    <el-cascader
                      clearable
                      class="content-input"
                      size="mini"
                      v-model="categoryid"
                      :options="listSort"
                      style="width: 100%"
                      change-on-select
                    ></el-cascader>
                  </div>
                </li>
                <li>
                  <span>商品编号：</span>
                  <div class="screening-content">
                    <el-input placeholder="商品编号" v-model="brmid" clearable size="mini" style="width: 100%">
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                </li>
                <li>
                  <span>商品名称：</span>
                  <div class="screening-content">
                    <el-input placeholder="商品名称" v-model="name" clearable size="mini" style="width: 100%">
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                </li>
                <li>
                  <el-button size="mini" @click="_queryData" type="primary" style=" width: 56px; float: left">查询</el-button>
                  <el-button size="mini"  plain @click="_resetData"  style=" width: 56px; float: left">重置</el-button>
                </li>
              </ul>
            </div>
          </slot>
          <div class="custom-table">
            <el-table style="width: 100%;"
                      :data="tableData"
                      ref="multipleTable"
                      class="order-table order-table-selection"
                      size="mini"
                      @select = "selectOn"
                      @select-all = "selectAll"
                      header-row-class-name="element-headerRowClassName order-table-label">
              <el-table-column
                class="mall-goods"
                type="selection"
                width="24">
              </el-table-column>
              <el-table-column label="编号/商品" width="300" align="left">
                <template slot-scope="scope">
                  <p class="number">编号： {{tableData[scope.$index].brmid}}</p>
                  <div>
                    <div class="img">
                      <img :src="tableData[scope.$index].picUrl">
                    </div>
                    <div class="text">
                      <p style="color:red; margin-top: 10px"> [{{tableData[scope.$index].categoryName}}]</p>
                      <p> {{tableData[scope.$index].shopGoodsname}} </p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="魅力分兑换" width="180" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                    <p> <span class="icon-exchangePoints points">{{tableData[scope.$index].exchangePoints}}</span></p>
                    <p> <span class="icon-exchangeMoney points">{{_formatCurrency(tableData[scope.$index].exchangeMoney)}}</span></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="原价" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">{{tableData[scope.$index].price}}</div>
                </template>
              </el-table-column>
              <el-table-column label="库存" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">{{tableData[scope.$index].stock}}</div>
                </template>
              </el-table-column>
              <el-table-column label="商品类型" width="" align="center">
                <template>
                  <div class="mt-40">
                    <!--{{tableData[scope.$index].categoryName}}-->
                    实体商品
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
                <template slot-scope="scope">
                  <div class="mt-40">
                    <el-button
                      @click.native.prevent="editAction('edit', tableData[scope.$index].id, 1)"
                      class="custom-columnButton"
                      type="text"
                      size="small">
                      <span>恢复</span>
                    </el-button>

                    <el-button
                      @click.native.prevent="editAction('del', tableData[scope.$index].id, 0)"
                      class="custom-columnButton"
                      type="text"
                      size="small">
                      <span>删除</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="member-pagination">
              <div class="member-pagination-select">
                <div class="member-pagination-checkbox">
                  <el-checkbox v-model="allCheck"></el-checkbox>
                </div>
                <el-button size="mini" @click="updateAllState(0)">批量删除</el-button>
                <el-button size="mini" @click="updateAllState(1)">批量恢复</el-button>
              </div>
              <div class="custom-pagination">
                <div class="achievement-pagination-content">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page= pageNum
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size= pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=total>
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </list-table>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, Select, Option, Button, Message, Checkbox, MessageBox, Cascader, Table, TableColumn, Pagination, Input } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { ERR_SUCCESS } from 'api/config'
import { labelSortArr, formatCurrency } from 'common/js/util'
import { getGoodsList, getGoodsCategoryList, updateGoodsStata, updateBatch } from 'api/mall'
export default {
  data() {
    return {
      updateDataSelect: [],
      type: 2,
      allCheck: false,
      categoryid: [],
      brmid: '',
      name: '',
      total: 10,
      pageNum: 1,
      pageSize: 10,
      listSort: [],
      tableData: []
    }
  },
  created() {
    this._getArticleList()
    getGoodsCategoryList().then(res => {
      if (res.code === ERR_SUCCESS) {
        const data = res.data
        this.listSort = labelSortArr(data.dataList)
        this.listParent = data.dataList
      }
    })
  },
  methods: {
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    handleSizeChange(val) { // 分页 设置多少条
      this.pageSize = val
      this._getArticleList()
    },
    handleCurrentChange(val) { // 分页 设置多少条
      this.pageNum = val
      this._getArticleList()
    },
    _getArticleList(types) {
      let targetObj
      let egoryid
      if (types === 'reset') {
        this.pageNum = 1
        targetObj = this
      } else {
        targetObj = this.targetObj ? this.targetObj : this
      }
      this.loading = true
      const { type, categoryid, brmid, name } = targetObj
      const { pageNum, pageSize } = this
      if (this.categoryid && this.categoryid.length > 0) {
        egoryid = this.categoryid[categoryid.length - 1]
      } else {
        egoryid = ''
      }
      const postObj = { type, categoryid: egoryid, brmid, name, pageNum, pageSize }
      getGoodsList(postObj).then(res => {
        if (res.code === ERR_SUCCESS) {
          const dataList = res.data.dataList
          this.tableData = dataList
          this.total = res.data.total
        }
      })
    },
    upDateState(id, status) {
      MessageBox.confirm('是否修改商品状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        updateGoodsStata({ id, status }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('修改成功')
            this._getArticleList('reset')
          }
        })
      })
    },
    editAction(state, id, status) {
      switch (state) {
        case 'del':
          this.upDateState(id, status)
          break
        case 'edit':
          this.upDateState(id, status)
          break
      }
    },
    _queryData() {
      this.allCheck = false
      this._getArticleList('reset')
    },
    _resetData() {
      this.allCheck = false
      this.categoryid = []
      this.brmid = ''
      this.name = ''
      this._getArticleList('reset')
    },
    selectOn(e) {
      if (e.length === this.tableData.length) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
      this.updateDataSelect = e
    },
    selectAll(e) {
      this.allCheck = true
      this.updateDataSelect = e
    },
    _addGoods() {
      this.$router.push({ path: '/shop/edit' })
    },
    _addWarning() {
      this.$router.push({ path: '/shop/goods/warning' })
    },
    updateAllState(val) {
      MessageBox.confirm('是否修改状态?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(action => {
        const d = this.updateDataSelect
        const ids = []
        for (const _d of d) {
          ids.push(_d.id)
        }
        updateBatch({ ids, status: val }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message.success('修改成功')
            this._getArticleList('reset')
          }
        })
      }).catch(erro => {})
    }
  },
  watch: {
    allCheck() {
      if (this.allCheck) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
        this.updateDataSelect = this.tableData
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    $route() {
      const { path } = this.$route
      // console.log(path)
      if (path === '/shop/goods') {
        this.allCheck = false
        this.categoryid = []
        this.brmid = ''
        this.name = ''
        this._getArticleList('reset')
      }
    }
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Checkbox.name]: Checkbox,
    [Cascader.name]: Cascader,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  @import "~common/css/elementCustom"
  .custom-page
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
  .custom-page-left
    height 100%
    overflow-y auto
  .list-table-content
    padding 0 15px
  .stateGray
    color #c2c2c2
  .custom-table
    margin-top 20px
    padding 0 10px
    .table-but
      border 1px solid #c2c2c2
      height 40px
      line-height 40px
      padding 10px 10px
      border-bottom none
  .screening
    padding 20px
    box-sizing border-box
    overflow hidden
    li
      float left
      width 25%
      height 40px
      span
        width 80px
        float left
      .screening-content
        margin-left 80px
        margin-right 10px
  .custom-pagination
    height 40px
    line-height 40px
    margin-left 310px
    .achievement-pagination-content
      float right
      height 40px
      padding-right 15px
  .img
    img
      max-width 100%
      max-height 100%
  .member-pagination
    padding 21px 0
    height 32px
    line-height 32px
    border 1px solid #ebeef5
    border-top none
    overflow hidden
    .member-pagination-select
      inline-block-top()
      float left
    .member-pagination-checkbox
      width 34px
      height 32px
      line-height 32px
      text-align center
      inline-block-top()
    .member-pagination-content
      float right
      margin-right 20px
      inline-block-top()
  .img
    float left
    width 80px
    height 90px
    img
      height 80px
      width 80px
      margin-top 5px
  .text
    float left
    margin-left 10px
    height 90px
    width 148px
  .points
    padding-left 10px
    text-align left
    position relative
    width 80px
    display inline-block
    .icon-exchangePoints
    &:before
      position absolute
      left -8px
      top 1px
      font-size 12px
</style>

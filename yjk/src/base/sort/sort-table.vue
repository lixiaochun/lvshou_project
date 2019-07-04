<template>
  <el-table :data="data" style="width: 100%" border class="sort-table" :default-expand-all="true" :showHeader="showHeader">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <c-sort-table
          :sortIndex="sortIndex + 1"
          :sortValue="sortValue ? sortValue + '.' + scope.row.sort : scope.row.sort"
          :slotText="slotText"
          :show-header="false"
          v-if="scope.row.children && scope.row.children.length > 0"
          :data="scope.row.children"
          @rowAction="rowAction">
        </c-sort-table>
      </template>
    </el-table-column>
    <!-- <el-table-column label="排序" width="140" prop="sort" align="center">
      <template slot-scope="scope">
        <span v-if="sortValue">{{sortValue + '.' +data[scope.$index].sort}}</span>
        <span v-else>{{data[scope.$index].sort}}</span>
      </template>
    </el-table-column> -->
    <el-table-column :label="slotText" prop="typeName" align="left">
      <template slot-scope="scope">
         <span class="sort-padding" :style="`width: ${sortIndex * 15}px`"></span>
         <span class="sort-text">{{data[scope.$index].typeName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="155" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="rowAction(data, scope.$index, 'edit', sortValue)"
            type="text"
            size="small">修改</el-button>
          <el-button
            @click.native.prevent="rowAction(data, scope.$index, 'delete', sortValue)"
            type="text"
            size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
import { Button, Table, tableColumn } from 'element-ui'

const COMPONENT_NAME = 'c-sort-table'

export default {
  name: COMPONENT_NAME,
  props: {
    sortIndex: {
      type: Number,
      default: 0
    },
    sortValue: {
      type: [String, Number],
      default: ''
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    slotText: {
      type: String,
      default: '分类'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  created() {
  },
  methods: {
    rowAction(data, $index, type, sortValue) {
      this.$emit('rowAction', data, $index, type, sortValue)
    }
  },
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [tableColumn.name]: tableColumn
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.sort-table
  & >>> .el-table__expanded-cell
    padding 0
    border none
    .el-table--border, .el-table--group
      border none
  .sort-text
    height 23px
    line-height 23px
    inline-block-top()
  .sort-padding
    height 23px
    inline-block-top()
    overflow hidden
    &::before,&::after
      content ''
      background-color #dcdcdc
    &::before
      float left
      margin-top 3px
      width 1px
      height 15px
      inline-block-top(middle)
    &::after
      display block
      margin-top 10px
      margin-left 1px
      width 100%
      height 1px
</style>

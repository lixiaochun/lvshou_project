<template>
  <div style="height: 100%;">
    <div class="sort-header">
      <el-button type="primary" size="mini" @click="titleClick">{{buttonText}}</el-button>
    </div>
    <div class="sort-content">
      <c-sort-table :data="data" :message="message" :slotText="slotText" @rowAction="rowAction"></c-sort-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button } from 'element-ui'
import sortTable from 'base/sort/sort-table'

const COMPONENT_NAME = 'c-sort'

export default {
  name: COMPONENT_NAME,
  props: {
    slotText: {
      type: String,
      default: '分类'
    },
    buttonText: {
      type: String,
      default: '按钮'
    },
    columnButtonData: {
      type: Array,
      default: () => ['修改', '删除']
    },
    data: {
      type: Array,
      default: () => []
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    rowAction(data, $index, type, sortValue) {
      this.$emit('rowAction', data, $index, type, sortValue)
    },
    titleClick() {
      this.$emit('titleClick')
    }
  },
  components: {
    [Button.name]: Button,
    [sortTable.name]: sortTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.sort-header
  padding 10px 15px
.sort-content
  height calc(100% - 80px)
  overflow-y auto
  padding 0 15px 10px 15px

</style>

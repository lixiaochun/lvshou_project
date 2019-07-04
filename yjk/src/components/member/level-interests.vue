<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>等级权益</span></p>
    <list-table title="标签管理" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="tag-manage">
        <div class="table-header">
          <span class="table-header-title">数据列表</span>
          <span class="table-header-button" @click="changeState">{{state}}</span>
        </div>
        <el-table
            style="width: 100%;"
            :data="tableData"
            :span-method="objectSpanMethod"
            class="levelInterests"
            border
            stripe
            size="mini"
            header-row-class-name="element-headerRowClassName">
            <el-table-column label="类别"  width="" prop="category" align="center"></el-table-column>
            <el-table-column label="权益"  width="" prop="name" align="center"></el-table-column>
            <el-table-column label="魅力新星（VIP1）" width="" prop="VIP1" align="center">
              <template slot-scope="scope">
                <div v-if="isEdit">
                  <div v-if="scope.$index === 0" class="showDiv">
                    <input v-model="tableData[scope.$index].VIP1" class="showInput" style="width: 86px" @change="changeData(scope.$index, 'VIP1', tableData)"/>
                  </div>
                  <template v-else>
                    <div v-if="scope.$index === 1" class="showDiv">
                      <input v-model="tableData[scope.$index].VIP1" class="showInput" @change="changeData(scope.$index, 'VIP1', tableData)" />
                      <span class="showbut">折</span>
                    </div>
                    <template v-else>
                      <div v-if="scope.$index === 3" class="showDiv">
                        <input v-model="tableData[scope.$index].VIP1" class="showInput"  @change="changeData(scope.$index, 'VIP1', tableData)" />
                        <span class="showbut">倍</span>
                      </div>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP1"  @change="changeData(scope.$index, 'VIP1', tableData)"></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
                <div v-else>
                  <div style="height: 29px" v-if="scope.$index === 0">{{tableData[scope.$index].VIP1}}</div>
                  <template v-else>
                    <span v-if="scope.$index === 1 ">{{tableData[scope.$index].VIP1}}折</span>
                    <template v-else>
                      <span v-if="scope.$index === 3 ">
                        {{_conversion(tableData[scope.$index].VIP1)}}倍
                      </span>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP1" disabled></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="魅力偶像（VIP2）" width="" prop="VIP2" align="center">
              <template slot-scope="scope">
                <div v-if="isEdit">
                  <div v-if="scope.$index === 0" class="showDiv">
                    <input v-model="tableData[scope.$index].VIP2" class="showInput" style="width: 86px" @change="changeData(scope.$index, 'VIP2', tableData)"/>
                  </div>
                  <template v-else>
                    <div v-if="scope.$index === 1" class="showDiv">
                      <input v-model="tableData[scope.$index].VIP2" class="showInput" @change="changeData(scope.$index, 'VIP2', tableData)" />
                      <span class="showbut">折</span>
                    </div>
                    <template v-else>
                      <div v-if="scope.$index === 3" class="showDiv">
                        <input v-model="tableData[scope.$index].VIP2" class="showInput"  @change="changeData(scope.$index, 'VIP2', tableData)" />
                        <span class="showbut">倍</span>
                      </div>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP2"  @change="changeData(scope.$index, 'VIP2', tableData)"></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
                <div v-else>
                  <span v-if="scope.$index === 0 ">{{tableData[scope.$index].VIP2}}</span>
                  <template v-else>
                    <span v-if="scope.$index === 1 ">{{tableData[scope.$index].VIP2}}折</span>
                    <template v-else>
                      <span v-if="scope.$index === 3 "> {{_conversion(tableData[scope.$index].VIP2)}}倍</span>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP2" disabled></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="魅力名人（VIP3）" width="" prop="VIP3" align="center">
              <template slot-scope="scope">
                <div v-if="isEdit">
                  <div v-if="scope.$index === 0" class="showDiv">
                    <input v-model="tableData[scope.$index].VIP3" class="showInput" style="width: 86px" @change="changeData(scope.$index, 'VIP3', tableData)"/>
                  </div>
                  <template v-else>
                    <div v-if="scope.$index === 1" class="showDiv">
                      <input v-model="tableData[scope.$index].VIP3" class="showInput" @change="changeData(scope.$index, 'VIP3', tableData)" />
                      <span class="showbut">折</span>
                    </div>
                    <template v-else>
                      <div v-if="scope.$index === 3" class="showDiv">
                        <input v-model="tableData[scope.$index].VIP3" class="showInput"  @change="changeData(scope.$index, 'VIP3', tableData)" />
                        <span class="showbut">倍</span>
                      </div>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP3"  @change="changeData(scope.$index, 'VIP3', tableData)"></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
                <div v-else>
                  <span v-if="scope.$index === 0 ">{{tableData[scope.$index].VIP3}}</span>
                  <template v-else>
                    <span v-if="scope.$index === 1 ">{{tableData[scope.$index].VIP3}}折</span>
                    <template v-else>
                      <span v-if="scope.$index === 3 "> {{_conversion(tableData[scope.$index].VIP3)}}倍</span>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP3" disabled></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="魅力男神（VIP4）" width="" prop="VIP4" align="center">
              <template slot-scope="scope">
                <div v-if="isEdit">
                  <div v-if="scope.$index === 0" class="showDiv">
                    <input v-model="tableData[scope.$index].VIP4" class="showInput" style="width: 86px" @change="changeData(scope.$index, 'VIP4', tableData)"/>
                  </div>
                  <template v-else>
                    <div v-if="scope.$index === 1" class="showDiv">
                      <input v-model="tableData[scope.$index].VIP4" class="showInput" @change="changeData(scope.$index, 'VIP4', tableData)" />
                      <span class="showbut">折</span>
                    </div>
                    <template v-else>
                      <div v-if="scope.$index === 3" class="showDiv">
                        <input v-model="tableData[scope.$index].VIP4" class="showInput"  @change="changeData(scope.$index, 'VIP4', tableData)" />
                        <span class="showbut">倍</span>
                      </div>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP4"  @change="changeData(scope.$index, 'VIP4', tableData)"></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
                <div v-else>
                  <span v-if="scope.$index === 0 ">{{tableData[scope.$index].VIP4}}</span>
                  <template v-else>
                    <span v-if="scope.$index === 1 ">{{tableData[scope.$index].VIP4}}折</span>
                    <template v-else>
                      <span v-if="scope.$index === 3 "> {{_conversion(tableData[scope.$index].VIP4)}}倍</span>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP4" disabled></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="魅力王者（VIP5）" width="" prop="VIP5" align="center">
              <template slot-scope="scope">
                <div v-if="isEdit">
                  <div v-if="scope.$index === 0" class="showDiv">
                    <input v-model="tableData[scope.$index].VIP5" class="showInput" style="width: 86px" @change="changeData(scope.$index, 'VIP5', tableData)"/>
                  </div>
                  <template v-else>
                    <div v-if="scope.$index === 1" class="showDiv">
                      <input v-model="tableData[scope.$index].VIP5" class="showInput" @change="changeData(scope.$index, 'VIP5', tableData)" />
                      <span class="showbut">折</span>
                    </div>
                    <template v-else>
                      <div v-if="scope.$index === 3" class="showDiv">
                        <input v-model="tableData[scope.$index].VIP5" class="showInput"  @change="changeData(scope.$index, 'VIP5', tableData)" />
                        <span class="showbut">倍</span>
                      </div>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP5"  @change="changeData(scope.$index, 'VIP5', tableData)"></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
                <div v-else>
                  <span v-if="scope.$index === 0 ">{{tableData[scope.$index].VIP5}}</span>
                  <template v-else>
                    <span v-if="scope.$index === 1 ">{{tableData[scope.$index].VIP5}}折</span>
                    <template v-else>
                      <span v-if="scope.$index === 3 ">{{_conversion(tableData[scope.$index].VIP5)}}倍</span>
                      <span v-else>
                        <el-checkbox v-model="tableData[scope.$index].VIP5" disabled></el-checkbox>
                      </span>
                    </template>
                  </template>
                </div>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </list-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, Checkbox, Pagination, TableColumn, Message, Switch } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getiRghtsList, getiRghtsUpdate } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tableData: [],
      state: '编辑',
      isEdit: false
    }
  },
  created() {
    this._getiRghtsList()
  },
  methods: {
    _getiRghtsList() {
      getiRghtsList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data
          this._stateFormat(res.data)
        } else {
          Message.error(res.msg)
        }
      })
    },
    changeData(index, vipLevel, table) {
      this._updataList(table[index].name, vipLevel, table[index][vipLevel])
    },
    _updataList(name, vipLevel, vipLevelData) {
      const vips = vipLevel
      let isVipLevelData = ''
      if (vipLevelData === true) {
        isVipLevelData = '1'
      } else if (vipLevelData === false) {
        isVipLevelData = '0'
      } else {
        isVipLevelData = vipLevelData
      }
      const obj = {
        name,
        [vips]: isVipLevelData
      }
      getiRghtsUpdate(obj).then(res => {
        if (res.code === ERR_SUCCESS) {
        } else {
          Message.error(res.msg)
        }
      })
    },
    _conversion(number) {
      if (number === '0') {
        return '-'
      } else {
        return number
      }
    },
    _stateFormat(data) {
      for (let i = 1; i < data.length; i++) {
        if (i !== 3) {
          for (var key in data[i]) {
            if (data[i][key] === '0') { data[i][key] = false }
            if (data[i][key] === '1') { data[i][key] = true }
          }
        }
      }
    },
    handleEdit(index, table) {
    },
    changeState() {
      this.isEdit === true ? this.isEdit = false : this.isEdit = true
      this.isEdit === true ? this.state = '保存' : this.state = '编辑'
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 通过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象，
      // 里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。
      //  该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象。
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex < 3) {
          return {
            rowspan: 1,
            colspan: 0
          }
        } else if (rowIndex === 3) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else if (rowIndex < 8) {
          return {
            rowspan: 1,
            colspan: 0
          }
        } else if (rowIndex === 8) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex < 12) {
          return {
            rowspan: 1,
            colspan: 0
          }
        }
      }
    }
  },
  components: {
    [Switch.name]: Switch,
    [Checkbox.name]: Checkbox,
    [Input.name]: Input,
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    listTable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

.tag-manage-wrapper
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
.showDiv
  font-size 0
.showInput
  padding-left 6px
  border none
  width 60px
  height 24px
  font-size 12px
  line-height 24px
  outline none
  border 1px solid #f2f2f2
.showbut
  font-size 12px
  width 26px
  height 26px
  line-height 26px
  display inline-block
  background #f2f2f2
  color 666
.tag-manage
  margin 0 10px
.table-header
  width 100%
  height 45px
  line-height 45px
  border 1px solid #ebeef5
  border-bottom none
  .table-header-title
    margin 0 10px
    font-size $font-size-md
    color $color-text
    inline-block-top()
  .table-header-button
    margin 0 10px
    margin-top 8px
    font-size 12px
    float right
    width 60px
    height 30px
    cursor pointer
    line-height 30px
    border 1px solid #f2f2f2
    text-align center
.member-pagination
  padding 21px 0
  height 32px
  line-height 32px
  border 1px solid #ebeef5
  border-top none
  overflow hidden
  .member-pagination-select
    inline-block-top()
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
</style>

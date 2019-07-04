<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>轮播设置</span></p>
    <list-table title="轮播设置" style="box-shadow: none; margin-top: 20px" :hideQuery="true">
      <div class="tag-manage">
        <div class="table-header">
          <span class="table-header-title el-icon-menu">数据列表</span>
          <el-button  @click="addPic" size="mini" type="primary" :disabled="tableData.length > 5 ? true : false">新增图片({{tableData.length ? tableData.length : 0}}/6)</el-button>
        </div>
        <el-table
            style="width: 100%;"
            :data="tableData"
            border
            v-loading="loading"
            stripe
            size="mini"
            header-row-class-name="element-headerRowClassName">
            <el-table-column label="标题"  width="" prop="title" align="center"></el-table-column>
            <el-table-column label="图片"  width="" align="center">
                <template slot-scope="scope">
                    <img :src="tableData[scope.$index].picUrl"  width="160" height="90">
                </template>
            </el-table-column>
            <el-table-column label="URL" width="" prop="visitUrl" align="center">
            </el-table-column>
            <el-table-column label="播放排序" width="100" prop="sort" align="center">
            </el-table-column>
            <el-table-column label="上传日期" width="" prop="createTime" align="center">
            </el-table-column>
             <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'edit')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>编辑</span>
                </el-button>
                <el-button
                  @click.native.prevent="rowAction( scope.$index, tableData, 'delete')"
                  class="custom-columnButton"
                  type="text"
                  size="small">
                  <span>删除</span>
                </el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </list-table>
     <div>
    </div>
   <div>
    <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, Table, TableColumn, Message, MessageBox } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { getSlideshowList, delSlideshow } from 'api/chuffing'
import { ERR_SUCCESS } from 'api/config'
export default {
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  created() {
    this._getSlideshowList()
  },
  methods: {
    _getSlideshowList() {
      this.loading = true
      getSlideshowList().then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res.data)
          this.tableData = res.data
          this.loading = false
        }
      })
    },
    addPic() {
      this.$router.push('/content/chufflingAdd')
    },
    rowAction(index, list, type) {
      if (type === 'edit') {
        const { title, picUrl, visitUrl, sort, id } = list[index]
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.replace({ path: '/content/chufflingAdd', query: { tititle: '编辑图片', title, picUrl, visitUrl, sort, id }})
      } else {
        MessageBox.confirm('是否删除该图片?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          delSlideshow({ id: list[index].id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              this._getSlideshowList()
              Message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              Message.error(res.msg)
            }
          })
        }).catch(erro => {})
      }
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/content/chuffling') {
        this._getSlideshowList()
      }
    }
  },
  components: {
    [Input.name]: Input,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    listTable,
    [MessageBox.name]: MessageBox
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
.tag-manage
  margin 0 10px
.table-header
  width 100%
  height 45px
  line-height 45px
  border 1px solid #ebeef5
  border-bottom none
  text-align right
  position relative
  .table-header-title
    margin 0 10px
    position absolute
    left 0px
    top 18px
    font-size $font-size-sm
    color $color-text
    inline-block-top()
  button
     margin-left 10px
</style>

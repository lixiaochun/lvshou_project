<template>
  <div class="content-manage-page">
    <div class="content-manage-content">
      <c-sort buttonText="添加视频分类"
              :data="listSort"
              message="shop"
              @titleClick="titleClick"
              @rowAction="rowAction"></c-sort>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { MessageBox, Message } from 'element-ui'
import Sort from 'base/sort/sort'
import Dialog from 'base/c-dialog/c-dialog'
import { labelSortArr, returnParentId } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
// import { vdcategroyList, delBaseType } from 'api/message'
import { getCategoryList, deleteCategory } from 'api/category'

export default {
  data() {
    return {
      data: [],
      listSort: [],
      roadUrl: []
    }
  },

  created() {
    this.$nextTick(() => {
      this._getCategoryList()
    })
  },
  methods: {
    _getCategoryList() {
      getCategoryList({ type: 2 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.roadUrl = res.data // 获取关系路径
          if (res.data && res.data.length > 0) {
            this.listSort = labelSortArr(res.data)
          }
        }
      })
    },
    titleClick() {
      this.$router.push({ path: '/content/videoManage/item' })
    },
    rowAction(data, $index, type, sortValue) {
      if (type === 'edit') {
        const { roadUrl } = this
        const pName = data[$index].typeName
        const id = data[$index].id
        const icon = data[$index].icon
        const ids = returnParentId(id, roadUrl).join(',')
        console.log(ids)
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/content/videoManage/item', query: { titile: '修改分类', id, pName, ids, icon }})
      } else {
        MessageBox.confirm('是否删除该分类?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          const id = data[$index].id
          deleteCategory({ id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              this._getCategoryList()
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
      if (path === '/content/videoManage') {
        this._getCategoryList()
      }
    }
  },
  components: {
    [Sort.name]: Sort,
    [Dialog.name]: Dialog
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .content-manage-page
    position relative
    width 100%
    height 100%
    background-color #DBDBDB
    overflow hidden
    .content-manage-content
      margin 11px
      background-color $color-background
      border-radius 5px
</style>

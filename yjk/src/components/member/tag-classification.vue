<template>
  <div class="content-manage-page">
    <c-scroll :data="listSort" class="message-list-scroll" id="msgListScroll">
    <div class="content-manage-content">
      <c-sort buttonText="添加标签分类"
              :data="listSort"
              message="shop"
              @titleClick="titleClick"
              @rowAction="rowAction"></c-sort>
    </div>
    <router-view></router-view>
    </c-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { MessageBox, Message } from 'element-ui'
import Sort from 'base/sort/sort'
import cScroll from 'base/c-scroll/c-scroll'
import Dialog from 'base/c-dialog/c-dialog'
import { labelSortArr, returnParentId } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
import { getGoodsCategoryList, delBaseType } from 'api/mall'

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
      this._getBaseTypeList()
    })
  },
  methods: {
    _getBaseTypeList() {
      getGoodsCategoryList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.roadUrl = res.data.dataList // 获取路径
          this.listSort = labelSortArr(res.data.dataList)
        }
      })
    },
    titleClick() {
      this.$router.push({ path: '/member/tagClassification/add' })
    },
    rowAction(data, $index, type, sortValue) {
      if (type === 'edit') {
        const { roadUrl } = this
        const pName = data[$index].typeName
        const id = data[$index].id
        const ids = returnParentId(id, roadUrl).join(',')
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ path: '/member/tagClassification/add', query: { titile: '修改分类', id, pName, ids }})
      } else {
        MessageBox.confirm('是否删除该分类?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action => {
          delBaseType({ id: data[$index].id }).then(res => {
            if (res.code === ERR_SUCCESS) {
              this._getBaseTypeList()
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
      if (path === '/member/tagClassification') {
        this._getBaseTypeList()
      }
    }
  },
  components: {
    [Sort.name]: Sort,
    [Dialog.name]: Dialog,
    cScroll
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
    overflow-y auto
    .content-manage-content
      margin 11px
      background-color $color-background
      border-radius 5px
</style>

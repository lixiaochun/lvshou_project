<template>
  <c-dialog :title="titile" @close="goBack">
    <div class="content-manage-item">
      <div class="content-input-item">
        <span class="label">父分类：</span>
        <div class="content-input">
          <el-cascader
            class="content-input"
            size="mini"
            v-model="list.ids"
            :options="listSort"
            change-on-select
          ></el-cascader>
        </div>
      </div>
      <div class="content-input-item">
        <span class="label">分类名称：</span>
        <div class="content-input">
          <el-input size="mini" placeholder="请输入分类名称" v-model="list.typeName"></el-input>
        </div>
      </div>
      <div class="content-input-item">
        <span class="label">排序：</span>
        <div class="content-input">
          <el-input size="mini" placeholder="请输入排序" v-model="list.sort"  @input="changeSort"></el-input>
        </div>
      </div>
      <div class="content-button">
        <el-button  size="mini" @click="goBack">取消</el-button>
        <el-button  size="mini" type="primary" @click="save" :loading="loading" style="margin-right: 20px">确定</el-button>
      </div>
    </div>
  </c-dialog>
</template>

<script type="text/ecmascript-6">
import { Input, Button, Cascader, Message } from 'element-ui'
import cDialog from 'base/c-dialog/c-dialog'
import { ERR_SUCCESS } from 'api/config'
import { labelSortArr, isNull } from 'common/js/util'
import { vdcategroyList, upBaseType, saveBaseType } from 'api/message'

export default {
  data() {
    return {
      titile: '新增分类',
      loading: false,
      listSort: [],
      list: {},
      sort: '',
      uploads: {},
      childId: ''
    }
  },

  created() {
    const { titile, pName, id, ids, sort, icon } = this.$route.query
    if (titile) {
      this.titile = titile
      this.eidt = true
      this.childId = id
      const newsids = ids.split(',').map(Number)
      newsids.unshift(0)
      this.list.ids = newsids.slice(0, newsids.length - 1)
      this.list.typeName = pName
      this.list.sort = sort
      this.uploads.url = icon
    }
    vdcategroyList().then(res => {
      if (res.code === ERR_SUCCESS) {
        const dataArr = res.data
        if (dataArr && dataArr.length > 0) {
          dataArr.unshift({ name: '顶级分类', id: 0, sort: 0 })
          this.listSort = labelSortArr(dataArr)
        } else {
          const firstData = [{ name: '顶级分类', id: 0, sort: 0 }]
          this.listSort = labelSortArr(firstData)
        }
      }
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    save() {
      if (this.loading) return
      // eslint-disable-next-line prefer-const
      let { typeName, ids, id, sort } = this.list
      const { uploads } = this
      if (ids) {
        if (ids.length > 0) {
          id = ids[ids.length - 1]
        }
      } else {
        return Message.error('请选择父分类！')
      }
      if (isNull(typeName)) {
        return Message.error('请输入分类名称！')
      }
      this.loading = true
      if (this.eidt) {
        this._upBaseType({ name: typeName, parentId: id, id: this.childId, icon: uploads.url, sort })
      } else {
        this._saveBaseType({ name: typeName, parentId: id, icon: uploads.url, sort })
      }
    },
    _upBaseType(e) {
      upBaseType(e).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/content/videoManage' })
        } else {
          Message.error(res.msg)
        }
        this.loading = false
      })
    },
    _saveBaseType(e) {
      saveBaseType(e).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push('/content/videoManage')
        } else {
          Message.error(res.msg)
        }
        this.loading = false
      })
    },
    changeSort(e) {
      setTimeout(() => {
        if (this.list.sort > 0) {
          this.list.sort = e.replace(/[^0-9]/g, '')
        } else {
          this.list.sort = e.replace(/[^1-9]/g, '')
        }
      }, 20)
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/content/videoManageItem') {
        this._getSortList()
      }
    }
  },
  components: {
    [Cascader.name]: Cascader,
    [Input.name]: Input,
    [Button.name]: Button,
    [cDialog.name]: cDialog
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .content-manage-item
    width 540px
    height 300px
    .upload-content
      position relative
      .list-upload
        position absolute
        display inline-block
        width 60px
        height 30px
        overflow hidden
        opacity 0
        left 0
        cursor pointer
        top 2px
        z-index 999
    .list-img
      width 50px
      height 30px
      display inline-block
    .upload-item-close
      position absolute
      left 43px
      top -6px
      font-size 12px
      height 20px
      width 20px
      display inline-block
    .content-input-item
      padding 8px 20px
      color $color-text
      font-size $font-size-md
      .label,.content-input
        height 35px
        line-height 35px
        inline-block-top()
      .label
        width 75px
      .content-input
        width 400px
    .content-button
      margin-top 40px
      line-height 50px
      border-top 1px solid #dcdcdc
      text-align right
</style>

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
      <!--<div class="content-input-item">-->
        <!--<span class="label">排序：</span>-->
        <!--<div class="content-input">-->
          <!--<el-input size="mini" placeholder="请输入排序" v-model="list.sort"></el-input>-->
        <!--</div>-->
      <!--</div>-->
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
import { goodsSortArr, isNull } from 'common/js/util'
import { getGoodsCategoryList, upBaseType, saveBaseType } from 'api/mall'

export default {
  data() {
    return {
      titile: '新增分类',
      loading: false,
      listSort: [],
      list: {},
      childId: ''
    }
  },
  created() {
    const { titile, pName, id, ids } = this.$route.query
    if (titile) {
      this.titile = titile
      this.eidt = true
      this.childId = id
      const newsids = ids.split(',').map(Number)
      newsids.unshift(0)
      this.list.ids = newsids.slice(0, newsids.length - 1)
      this.list.typeName = pName
    }
    getGoodsCategoryList().then(res => {
      if (res.code === ERR_SUCCESS) {
        const dataArr = res.data.dataList
        if (dataArr && dataArr.length > 0) {
          dataArr.unshift({ name: '顶级分类', id: 0, sort: 0 })
          this.listSort = goodsSortArr(dataArr)
        } else {
          const firstData = [{ name: '顶级分类', id: 0, sort: 0 }]
          this.listSort = goodsSortArr(firstData)
          console.log(this.listSort)
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
      let { typeName, ids, id } = this.list
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
        this._upBaseType({ name: typeName, parentId: id, id: this.childId })
      } else {
        if (id === '') {
          id = 0
        }
        this._saveBaseType({ name: typeName, parentId: id })
      }
    },
    _upBaseType(e) {
      upBaseType(e).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push('/shop/classification')
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
          this.$router.push('/shop/classification')
        } else {
          Message.error(res.msg)
        }
        this.loading = false
      })
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
      margin-top 85px
      line-height 50px
      border-top 1px solid #dcdcdc
      text-align right
</style>

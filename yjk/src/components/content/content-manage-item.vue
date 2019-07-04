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
      <!-- <div class="content-input-item">
        <span class="label">排序：</span>
        <div class="content-input">
          <el-input size="mini" placeholder="请输入排序" v-model="list.sort"  @input="changeSort"></el-input>
        </div>
      </div> -->
      <div class="content-input-item">
        <span class="label">上传图标：</span>
        <div class="content-input">
          <div class="upload-content" v-if="!uploads.url">
            <el-button size="mini">上传</el-button>
            <input
              type="file"
              class="list-upload" @change="handleUpload">
          </div>
          <div v-else style="position: relative">
            <img :src="uploads.url" class="list-img">
            <span class="upload-item-close icon-close" @click="handleDelete(uploads)"></span>
          </div>
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
import { uploadPic } from 'api/upload'
// import { vdcategroyList, upBaseType, saveBaseType } from 'api/message'
import { getCategoryList, updateCategory, saveCategory } from 'api/category'

export default {
  data() {
    return {
      titile: '新增分类',
      loading: false,
      listSort: [],
      list: {},
      uploads: {},
      childId: ''
    }
  },

  created() {
    const { titile, pName, id, ids, icon } = this.$route.query
    if (titile) {
      this.titile = titile
      this.eidt = true
      this.childId = id
      const newsids = ids.split(',').map(Number)
      newsids.unshift(0)
      this.list.ids = newsids.slice(0, newsids.length - 1)
      this.list.typeName = pName
      this.uploads.url = icon
    }
    getCategoryList({ type: 1 }).then(res => {
      if (res.code === ERR_SUCCESS) {
        const dataArr = res.data
        if (dataArr && dataArr.length > 0) {
          dataArr.unshift({ name: '顶级分类', id: 0 })
          this.listSort = labelSortArr(dataArr)
        } else {
          const firstData = [{ name: '顶级分类', id: 0 }]
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
      let { typeName, ids, id } = this.list
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
        this._updateCategory({ name: typeName, parentid: id, id: this.childId, icon: uploads.url, type: 1 })
      } else {
        this._saveCategory({ name: typeName, parentid: id, icon: uploads.url, type: 1 })
      }
    },
    _updateCategory(e) {
      updateCategory(e).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/content/contentManage' })
        } else {
          Message.error(res.msg)
        }
        this.loading = false
      })
    },
    _saveCategory(e) {
      saveCategory(e).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push('/content/contentManage')
        } else {
          Message.error(res.msg)
        }
        this.loading = false
      })
    },
    handleUpload(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
      if (!reg.test(name)) {
        target.value = ''
        Message.error('请上传图片类型的格式！')
        return
      }
      if (size > 500000) {
        target.value = ''
        Message.error('请上传图片大小少于500KB！')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target.result
        this.getImgStyle(url, (width, height) => {
          const obj = {
            name,
            url,
            file,
            width: width + 'px',
            height: height + 'px',
            progress: 0
          }
          this.uploads = obj
          uploadPic(file, function(e) {
            if (e === 1) {
              obj.isUpload = true
            }
            obj.progress = e * 100
          }).then(res => {
            obj.url = res.data.picUrl
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    getImgStyle(url, callback, px = 120) {
      const img = document.createElement('img')
      img.onload = function(e) {
        const { width, height } = e.target
        let _width, _height
        if (width > height) {
          _height = px
          _width = px * width / height
        } else {
          _width = px
          _height = px * height / width
        }
        callback && callback(_width, _height)
      }
      img.src = url
    },
    handleDelete() {
      this.uploads = ''
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

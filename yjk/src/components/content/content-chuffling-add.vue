<template>
  <div class="chuffling-add">
        <p class="logistics-title"><span>{{tititle}}</span></p>
      <div class="chuffling-content">
      <el-form  label-width="100px" size="mini">
     <el-form-item label="上传图片:" required style="margin-top:30px" prop="picUrl">
        <div class="list-item" style="margin-top: 20px">
        <div class="list-input-item">
          <div class="upload-wrapper">
            <div class="upload-item" v-if="picUrl">
              <img :src="picUrl" style="height: 175px; width: 375px">
              <span class="upload-item-close icon-close" @click="handleDelete()"></span>
              <span class="upload-item-line"></span>
            </div>
            <div class="list-input-upload" v-if="!picUrl">
              <el-button size="mini">上传图片</el-button>
              <input
                type="file"
                class="list-upload" @change="handleUpload">
            </div>
          </div>
          <div class="img-details">
            <p>说明：</p>
            <p>1.建议使用750*350像素的图片</p>
            <p>2.图片小于500kb</p>
            <p>3.支持gif、jpg、jpge、png、bmg图片格式</p>
          </div>
        </div>
      </div>
  </el-form-item>
  <el-form-item label="URL:" required>
     <el-input placeholder="请输入轮播图片链接地址" v-model="visitUrl"
      style="width:80%"></el-input>
  </el-form-item>
  <el-form-item label="轮播标题:">
     <el-input placeholder="标题长度不可超过32个字" v-model="title"
      style="width:80%" :maxlength="32"></el-input>
  </el-form-item>
    <el-form-item label="轮播顺序" style="width:80%">
   <el-input v-model="sort" @input="changeAmount"></el-input>
    </el-form-item>
     <el-form-item>
    <el-button type="primary" @click="handleSave"
    class="save">提交</el-button>
    <el-button size="mini" @click="returnList">返回列表</el-button>
  </el-form-item>
    </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

import { Button, Input, Message, Form, FormItem, Upload, Dialog } from 'element-ui'
import { saveSlideshow, upSlideshow } from 'api/chuffing'
import { isNull } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
import { uploadPic } from 'api/upload'

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      tititle: '新增图片',
      address: '/yjk-operation/file/uploadFile',
      title: '',
      picUrl: '',
      visitUrl: '',
      sort: 5,
      id: '',
      imagelist: []
    }
  },
  created() {
    const { tititle, title, picUrl, visitUrl, sort, id } = this.$route.query
    if (id) {
      this.tititle = tititle
      this.title = title
      this.visitUrl = visitUrl
      this.picUrl = picUrl
      this.sort = sort
      this.id = id
    }
  },
  computed: {
    uploadDisabled() {
      return this.imagelist.length > 0
    }
  },
  methods: {
    handleDelete() {
      this.picUrl = ''
    },
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    //   this.imagelist = []
    // },
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // onBeforeUpload (file) {
    //   const { name, size } = file
    //   const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
    //   const isIMAGE = reg.test(name)
    //   const isLt1M = size < 500000
    //   if (!isIMAGE) {
    //     Message.error('上传文件只能是图片格式!')
    //     return false
    //   }
    //   if (!isLt1M) {
    //     Message.error('上传文件大小不能超过 500kb!')
    //     return false
    //   }
    // },
    // onUploadChange (file) {
    //   const reader = new FileReader()
    //   reader.readAsDataURL(file.raw)
    //   reader.onload = (e) => {
    //     uploadPic(file.raw, function (e) {
    //     }).then(res => {
    //       if (res.code === ERR_SUCCESS) {
    //         this.picUrl = res.data.picUrl
    //         this.imagelist.push(this.picUrl)
    //       }
    //     })
    //   }
    // },
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
        Message.error('请上传图片大小少于500kb！')
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
          uploadPic(file, function(e) {
            obj.progress = e * 100
          }).then(res => {
            obj.url = res.data.picUrl
            this.picUrl = res.data.picUrl
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
          _height = px + 'px'
          _width = px * width / height
        } else {
          _width = px + 'px'
          _height = px * height / width
        }
        callback && callback(_width, _height)
      }
      img.src = url
    },
    _upSlideshow(e) {
      upSlideshow(e).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push('/content/chuffling')
        } else {
          Message.error(res.msg)
        }
      })
    },
    _saveSlideshow(e) {
      saveSlideshow(e).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push('/content/chuffling')
        } else {
          Message.error(res.msg)
        }
      })
    },
    changeAmount(e) {
      setTimeout(() => {
        if (this.sort > 0) {
          this.sort = e.replace(/[^0-6]/g, '')
        } else {
          this.sort = e.replace(/[^1-6]/g, '')
        }
      }, 20)
    },
    handleSave() {
      const { title, picUrl, visitUrl, id } = this
      if (isNull(visitUrl)) {
        return Message.error('请填写URL！')
      }
      if (isNull(this.sort)) {
        this.sort = 6
      }
      if (this.sort > 6) {
        this.sort = 6
      }
      const { sort } = this
      if (id) {
        this._upSlideshow({ title, sort, picUrl, visitUrl, id })
      } else {
        this._saveSlideshow({ title, sort, picUrl, visitUrl })
      }
    },
    returnList() {
      this.$router.push('/content/chuffling')
    }
  },
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Upload.name]: Upload,
    [Dialog.name]: Dialog,
    Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/css/variable';
@import '~common/css/mixin';
@import '~common/css/elementCustom';

.chuffling-add
  height 100%
  overflow-y auto
  .logistics-title
    height 56px
    line-height 56px
    background-color #f2f2f2
    color #a4a4a4
    span
      margin-left 10px
      padding-left 15px
      font-size 14px
      border-left 2px solid #00bafa;
  .chuffling-content
    form
      margin 100px 200px
    .upload-wrapper
        width 100%
      .upload-item
        position relative
        margin-right 20px
        margin-top 10px
        inline-block-top()
        .upload-item-close
          position absolute
          top -10px
          right -10px
          width 28px
          height 28px
          line-height 28px
          font-size 25px
          color #dcdcdc
          background-color #fff
          border-radius 50%
          text-align center
          overflow hidden
          cursor pointer
          &:hover
            color #898989
        .upload-item-line
          display block
          position absolute
          bottom 0
          height 3px
          background-color #13ce66
    .list-input-tip
      margin-left 140px
      line-height 20px
      color red
      font-size $font-size-sm
    .list-input-upload
      position relative
      width 80px
      height 50px
      inline-block-top()
      .list-upload
        position absolute
        top 50%
        left 0
        margin-top -14px
        width 80px
        height 28px
        opacity 0
        cursor pointer
    .list-button
      width 100%
      text-align center
      button
        margin-right 20px
        width 120px
    .img-content
      margin-top 20px
     .disabled .el-upload--picture-card
       display none
    p
      color #ff9933;
      line-height 24px
      font-size 14px
     .save
       margin-left 300px
       margin-top 50px
       width 100px
</style>

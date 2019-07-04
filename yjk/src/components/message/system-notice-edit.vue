<template>
  <div class="content-add-list">
    <div class="list-header">新建/编辑系统通知</div>
    <div class="list-item-wrapper">
      <div class="list-item">
        <span class="label"><em>*</em>标题：</span>
        <div class="list-input-item">
          <el-input
            size="mini"
            placeholder="请输入标题"
            :maxlength="36"
            v-model="article.title"></el-input>
        </div>
        <p class="list-input-tip">标题长度不能超过36个汉字</p>
      </div>
      <div class="list-item">
        <span class="label">正文内容：</span>
        <div class="list-input-item list-editor">
          <wang-editor ref="editor"></wang-editor>
        </div>
      </div>
      <div class="list-item">
        <span class="label">附件：</span>
        <div class="list-input-item">
          <div class="upload-wrapper">
            <div class="upload-item"
                 v-for="(upload, index) in uploads"
                 :key="index" >
              <!--<img :src="upload.url" :style="{width: upload.width, height: upload.height}">-->
              <a :href="upload.url" :download="upload.fileName"> {{upload.fileName}}</a>
              <el-button type="text" @click="handleDelete(uploads, index)">删除</el-button>
              <!--<span class="upload-item-close icon-close" @click="handleDelete(uploads, index)"></span>-->
              <!--<span class="upload-item-line"-->
                    <!--v-if="upload.progress !== 100"-->
                    <!--:style="{width: `${upload.progress}%`}"></span>-->
            </div>
            <div class="list-input-upload">
              <el-button size="mini">上传附件</el-button>
              <input
                type="file"
                class="list-upload" @change="handleUpload">
            </div>
          </div>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>发布时间：</span>
        <div  class="list-input-item" style=" width: 220px;">
          <el-date-picker
            v-model="timeData"
            style="width: 220px"
            size="mini"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="list-item" style="margin-top: 30px;">
        <div class="list-button">
          <el-button size="mini" @click="cancel()">返回列表</el-button>
          <el-button size="mini" @click="handleSave">提交</el-button>
        </div>
      </div>
    </div>
    <!-- <router-view :prev ="preview"></router-view> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { Input, Button, Message, RadioButton, Cascader, Radio, RadioGroup, DatePicker, Dialog, Select, Option } from 'element-ui'
// import { importExcel } from 'api/ebean'
import wangEditor from 'base/wang-editor/wang-editor'
import { ERR_SUCCESS } from 'api/config'
import { isNull, format } from 'common/js/util'
import { saveBroadcastInfo, updateBroadcastInfo, getBroadcastInfoById } from 'api/content'
import { uploadContentMessage } from 'api/upload'
import { uploadAttachmentFile } from 'api/message'
const ARTICLE = {
  title: '',
  originUrl: '',
  origin: '壹健康',
  urls: ''
}

export default {
  name: 'content-edit',
  data() {
    return {
      timeData: '',
      isEdit: '',
      ids: [],
      id: '',
      name: '',
      article: Object.assign({}, ARTICLE),
      uploads: [],
      list: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleSave() {
      // console.log(this.uploads)
      const { article, timeData } = this
      if (isNull(article.title)) {
        return Message.error('请输入标题！')
      }
      const html = this.$refs.editor.getEditor().txt.html()
      if (html.indexOf('<br>') === 3) {
        return Message.error('请上传正文！')
      }
      if (isNull(timeData)) {
        return Message.error('请输入发布时间！')
      }
      const time = format(this.timeData, '$1-$2-$3 $4:$5:$6')
      article.html = uploadContentMessage(article.title, html, time)
      if (this.isEdit) {
        const { title, html } = article
        const { id, uploads, timeData } = this
        console.log(uploads)
        this._upArticle({ title, onlineTime: format(timeData, '$1-$2-$3 $4:$5:$6'), urls: uploads, content: html, id })
      } else {
        const { title, html } = article
        const { uploads, timeData } = this
        this._saveArticle({ title, onlineTime: format(timeData, '$1-$2-$3 $4:$5:$6'), urls: uploads, content: html })
      }
    },
    _upArticle(article) {
      updateBroadcastInfo(article).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.isEdit = false
          Message({
            type: 'success',
            message: '修改系统通知成功!'
          })
          this.$router.replace({ path: '/message/systemNotice' })
        } else {
          Message.error(res.msg)
        }
      })
    },
    handleDelete(d, index) {
      d.splice(index, 1)
    },
    _saveArticle(article) {
      saveBroadcastInfo(article).then(res => {
        if (res.code === ERR_SUCCESS) {
          Message({
            type: 'success',
            message: '添加系统通知成功!'
          })
          this.$router.replace({ path: '/message/systemNotice' })
        } else {
          Message.error(res.msg)
        }
      })
    },
    _format(e) {
      return format(e)
    },
    cancel() {
      this.$router.go(-1)
    },
    handleUpload(event) { // 上传附件
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(exe|bat)$/g
      if (reg.test(name)) {
        target.value = ''
        Message.error('这种类型不能上传！')
        return
      }
      if (size > 20480000) {
        target.value = ''
        Message.error('上传附件不能大于20M！')
        return
      }
      uploadAttachmentFile(file).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.uploads.push({ url: res.data.url, fileName: file.name })
          // console.log(res.data)
        }
      })
    },
    init() {
      const { id } = this.$route.query
      this.id = id
      if (id) {
        this.isEdit = true
        getBroadcastInfoById({ id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            const data = res.data
            this.article = Object.assign({}, data)
            this.uploads = []
            this.timeData = data.onlineTime
            data.consultBroadcastAttachment.forEach(e => {
              // console.log(e)
              const url = e.url
              const fileName = e.fileName
              this.uploads.push({
                fileName,
                url
              })
            })
            setTimeout(() => {
              // console.log(this.article.consultBroadcastContent.content)
              const html = this.article.consultBroadcastContent.content.replace(/<div class="article-title">[\S-\s]*<\/div>/, '')
              this.$refs.editor.getEditor().txt.html(html)
            }, 100)
          } else {
            Message.error(res.msg)
          }
        })
      } else {
        this.isEdit = false
      }
    }
  },
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button,
    [Cascader.name]: Cascader,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    wangEditor,
    Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  & >>> .element-date
    z-index 1000000

  .content-add-list
    position relative
    height 100%
    overflow auto
    .list-header
      width 100%
      height 60px
      line-height 60px
      border-bottom 1px solid #c2c2c2
      color $color-text
      font-size $font-size-lg
      &::before
        content ''
        margin 22px 10px 0 10px
        width 2px
        height 14px
        background-color #409EFF
        inline-block-top()
    .list-item-wrapper
      padding 0 20px
    .list-item
      width 100%
      line-height 50px
      color $color-text
      font-size $font-size-md
      overflow hidden
      .label
        float left
        margin-right 20px
        width 120px
        line-height 50px
        text-align right
        inline-block-top()
        em
          margin 0 5px
          color red
      .list-input-item
        margin 0 140px
        line-height 50px
      .list-editor
        margin 0 40px 0px 140px
        padding-top 15px
        line-height 1
      .upload-wrapper
        width 100%
      .upload-item
        position relative
        margin-right 20px
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
      color #999
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
        width 120px
    .img-content
      color #fa7e00
      p
        line-height 20px
</style>

<template>
  <div class="content-add-list">
    <div class="list-header">文章列表</div>
    <div class="list-item-wrapper">
      <div class="list-item">
        <span class="label"><em>*</em>选择分类：</span>
        <div class="list-input-item">
          <el-cascader
              style="width: 360px;"
              size="mini"
              v-model="ids"
              :options="listSort"
              change-on-select
          ></el-cascader>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>所属栏目：</span>
        <div class="list-input-item">
           <el-select v-model="columnId"
           placeholder="请选择"
           size='mini'
           @change="clearTopic"
           style="width:360px"
           clearable>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
       <div class="list-item" v-if="columnId !== 6">
        <span class="label"><em>*</em>所属专题：</span>
        <div class="list-input-item">
           <el-select v-model="topicid"
           placeholder="请选择"
           style="width:360px"
           filterable
           @focus="getTopic"
           ref="topic"
           size='mini'>
            <el-option
              v-for="item in topicOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
            </el-select>
        </div>
      </div>
       <div class="list-item">
        <span class="label"><em>*</em>发布到首页：</span>
        <div class="list-input-item">
           <el-select v-model="article.isIndexpage"
           placeholder="请选择"
           style="width:360px"
           filterable
           ref="topic"
           size='mini'>
            <el-option
              v-for="item in isIndexpageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
        </div>
      </div>
        <div class="list-item" v-if="article.isIndexpage">
        <span class="label"><em>*</em>首页封面：</span>
        <div class="list-input-item">
          <div class="upload-wrapper">
            <div class="upload-item" v-if="article.idxpicUrl">
              <img :src="article.idxpicUrl" style="height: 175px; width: 175px;">
              <span class="upload-item-close icon-close" @click="deletePic()"></span>
              <span class="upload-item-line"></span>
            </div>
            <div class="list-input-upload" v-else>
              <el-button size="mini">上传图片</el-button>
              <input
                type="file"
                class="list-upload" @change="handlePic">
            </div>
          </div>
          <div class="img-details" style="color:#f93">
            <p>说明：</p>
            <p>1.建议使用115*115像素的图片</p>
            <p>2.图片小于500kb</p>
            <p>3.支持gif、jpg、jpge、png、bmg图片格式</p>
          </div>
        </div>
      </div>
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
        <span class="label">摘要：</span>
        <div class="list-input-item">
          <el-input
          style="margin-top: 15px;"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          :maxlength="28"
          placeholder="摘要内容最多输入28个字符"
          v-model="article.summary">
        </el-input>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>来源：</span>
        <div class="list-input-item">
          <el-input
              size="mini"
              placeholder="请输入来源名称"
              v-model="article.origin"></el-input>
        </div>
      </div>
      <div class="list-item">
        <span class="label">来源链接：</span>
        <div class="list-input-item">
          <el-input
              size="mini"
              placeholder="请输入来源链接"
              v-model="article.originUrl"></el-input>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>封面：</span>
        <div class="list-input-item">
          <div class="upload-wrapper">
            <div class="upload-item"
               v-for="(upload, index) in uploads"
               :key="index" >
              <img :src="upload.url" :style="{width: upload.width, height: upload.height}">
              <span class="upload-item-close icon-close" @click="handleDelete(uploads, index)"></span>
              <span class="upload-item-line"
                    v-if="upload.progress !== 100"
                    :style="{width: `${upload.progress}%`}"></span>
            </div>
            <div class="list-input-upload" v-if="uploads.length === 0 || uploads.length < uploadsMax">
              <el-button size="mini">上传图片</el-button>
              <input
                type="file"
                class="list-upload" @change="handleUpload">
            </div>
          </div>
          <div class="img-content" v-if=" articleMessage === '横图'">
            <p>1.建议使用宽680*高300像素的图片</p>
            <p>2.图片小于500kb</p>
            <p>3.支持gif、jpg、jpeg、png、bmg图片格式</p>
          </div>
          <div class="img-content"  v-if=" articleMessage === '小图'">
            <p> 1.建议使用宽200*高200像素的图片</p>
            <p> 2.图片小于500kb</p>
            <p>3.支持gif、jpg、jpeg、png、bmg图片格式</p>
          </div>
          <div class="img-content"  v-if=" articleMessage === '三图'">
            <p>1.建议使用宽200*高200像素的图片</p>
            <p>2.图片小于500kb</p>
            <p>3.支持gif、jpg、jpeg、png、bmg图片格式</p>
          </div>
        </div>
      </div>
      <div class="list-item">
        <span class="label">正文内容：</span>
        <div class="list-input-item list-editor">
          <UEditor ref="editor" @showCityName="updateStep"></UEditor>
          <div class="mobile-prev">
            <iframe height=500 width=390 src="../../../static/iframe.html" scroling="no" frameborder="0" :srcdoc=iframePreview></iframe>
          </div>
        </div>
      </div>
      <div class="list-item">
        <span class="label">是否显示：</span>
        <div class="list-input-item">
          <el-radio v-model="article.isShow" :label="true">显示</el-radio>
          <el-radio v-model="article.isShow" :label="false">不显示</el-radio>
        </div>
      </div>
      <div class="list-item">
        <span class="label">是否置顶：</span>
        <div class="list-input-item">
          <el-radio v-model="article.isTop" :label="true">置顶</el-radio>
          <el-radio v-model="article.isTop" :label="false">不置顶</el-radio>
        </div>
      </div>
      <!-- <div class="list-item" v-if="article.isTop === 1">
        <span class="label">置顶时间：</span>
        <div class="list-input-item">
          <el-radio-group size="mini" v-model="topDateType">
            <el-radio-button label="不限时"></el-radio-button>
            <el-radio-button label="一周"></el-radio-button>
            <el-radio-button label="两周"></el-radio-button>
            <el-radio-button label="一个月"></el-radio-button>
            <el-radio-button label="自定义"></el-radio-button>
          </el-radio-group>
          <template v-if="topDateType === '自定义'">
            <el-date-picker
              style="width: 145px"
              v-model="article.topStartTime"
              type="date"
              size="mini"
              placeholder="选择置顶开始时间">
            </el-date-picker>
            至
            <el-date-picker
              style="width: 145px"
              v-model="article.topEndTime"
              type="date"
              size="mini"
              placeholder="选择置顶结束时间">
            </el-date-picker>
          </template>
        </div>
      </div> -->
      <div class="list-item" style="margin-top: 30px;">
        <div class="list-button">
          <el-button size="mini" @click="cancel()">返回列表</el-button>
          <!-- <el-button size="mini" @click="previewHtml('preview')">预览</el-button> -->
          <el-button size="mini" @click="handleSave" :loading="loading">提交</el-button>
        </div>
      </div>
    </div>
    <!-- <router-view :prev ="preview"></router-view> -->
    <!-- <div class="preview" v-if="dialogVisible">
      <el-dialog title="文章预览"  :visible.sync="dialogVisible" width="25%">
        <content-preiew class="preview" :list="list"></content-preiew>
      </el-dialog>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { Input, Button, Message, RadioButton, Cascader, Radio, RadioGroup, DatePicker, Dialog, Select, Option } from 'element-ui'
// import wangEditor from 'base/wang-editor/wang-editor'
import UEditor from 'base/u-editor/ueditor'
import { ERR_SUCCESS } from 'api/config'
import { labelSortArr, isNull, returnParentId } from 'common/js/util'
import ContentPreiew from './content-preiew'
// import { getBaseTypeList } from 'api/baseType'
// import { saveArticle, articleInfo, upArticle } from 'api/message'
import { getCategoryList } from 'api/category'
import { getColumnList, saveDiscContent, updateDiscContent, getDiscContentById } from 'api/content'
import { uploadPic, uploadContent } from 'api/upload'

const ARTICLE = {
  title: '',
  originUrl: '',
  origin: '壹健康',
  contentType: 1,
  columnid: '',
  isTop: true,
  isShow: true,
  picLayout: '',
  isIndexpage: '',
  categoryid: '',
  idxpicUrl: '', // 首页图像
  urls: '',
  summary: ''
}
const _isIndexpageOptions = [{
  value: true,
  label: '发布'
}, {
  value: false,
  label: '不发布'
}]

export default {
  name: 'content-edit',
  data() {
    return {
      loading: false,
      userList: '',
      articleMessage: '',
      preview: '',
      ids: [],
      listSort: [],
      columnId: '',
      options: '',
      isIndexpageOptions: _isIndexpageOptions,
      topicOptions: [], // 专题列表
      topicid: '', // 专题id
      article: Object.assign({}, ARTICLE),
      uploads: [],
      uploadsMax: '',
      list: {},
      dialogVisible: false,
      iframePreview: '' // 预览iframe中body的内容，通过iframe标签的:docsrc属性将内容插入到预览的iframe中，iframe的静态页为iframe.html,路径为../../../static/iframe.html
    }
  },
  created() {
    // if (localStorage.getItem('reduction')) {
    //   let data = JSON.parse(localStorage.getItem('reduction'))
    //   console.log(data)
    //   this.article = Object.assign({}, data.article)
    //   this.ids = data.ids
    //   this.uploads = data.uploads
    //   setTimeout(() => {
    //     const content = this.article.content.replace(/<section class="article-title">[\S-\s]*<\/section>/, '')
    //     this.$refs.editor.getEditor().txt.html(content)
    //   }, 100)
    // }
    this.init()
    this._getColumnList()
  },
  methods: {
    previewHtml() {
      // this.saveHtml()
      this.dialogVisible = true
      // wang-editor的写法
      // this.preview = this.$refs.editor.getEditor().txt.html()

      // Ueditor的写法
      this.preview = this.$refs.editor.getEditor().getContent()
      // console.log(this.$refs.editor.getEditor().getAllHtml())
      // localStorage.setItem('prehtml', this.preview)
      this.list = { articleTitle: this.article.title, origin: this.article.origin, html: this.preview }
      // this.$router.push({path: '/content/contentEdit/preiew', query: {articleTitle: this.article.title, origin: this.article.origin, html: this.preview}})
    },
    // 获取ueditor中的内容，然后渲染到右侧预览框
    pre() {
      this.iframePreview = this.$refs.editor.getEditor().getContent()
      // console.log(typeof this.iframePreview)
      // 因css样式不生效，在html代码后面插入js，设置img的最大宽度，
      // eslint-disable-next-line
      this.iframePreview += `<script>(function(){var aImg = document.body.getElementsByTagName("img");for(var i = 0; i < aImg.length; i++){aImg[i].style.maxWidth = 360 + "px";}})()<\/script>`
      // console.log(this.iframePreview)
    },
    updateStep() {
      this.saveHtml()
    },
    saveHtml() {
      const { article, ids, uploads, uploadsMax } = this
      // article.html = this.$refs.editor.getEditor().txt.html()
      article.html = this.$refs.editor.getEditor().getContent()
      // console.log(article.html)
      const savaData = { article, ids, uploads, uploadsMax }
      localStorage.setItem('reduction', JSON.stringify(savaData))
    },
    handleSave() {
      if (this.loading) return
      const { article, ids, uploads, uploadsMax, topicid, columnId } = this
      if (isNull(columnId)) {
        return Message.error('请栏目专题！')
      }
      if (columnId === 1 && isNull(topicid)) {
        return Message.error('请选择专题！')
      }
      if (isNull(ids)) {
        return Message.error('请选择分类！')
      }
      if (article.isIndexpage && !article.idxpicUrl) {
        return Message.error('请上传首页封面！')
      }
      if (isNull(article.title)) {
        return Message.error('请输入标题！')
      }
      if (isNull(article.origin)) {
        return Message.error('请输入来源名称！')
      }
      if (isNull(uploads)) {
        return Message.error('请上传封面图片！')
      }
      if (uploads.length < uploadsMax) {
        return Message.error(`请上传${uploadsMax}张的封面图片！`)
      }
      for (const upload of uploads) {
        if (isNull(upload.isUpload)) {
          Message.error('图片在上传中！')
          return
        }
      }
      this.loading = true
      article.categoryid = ids[ids.length - 1]
      if (topicid) {
        article.columnid = topicid
      } else {
        article.columnid = 6
      }
      // let html = this.$refs.editor.getEditor().txt.html()
      const html = this.$refs.editor.getEditor().getContent()
      // console.log(html)
      // if (html.indexOf('<br>') === 3) {
      //   return Message.error('请上传正文！')
      // }
      const time = new Date()
      const currentTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
      article.html = uploadContent(article.title, article.origin, html, currentTime)
      // console.log(111)
      // console.log(article.html)
      if (isNull(article.summary)) {
        const _body = html.replace(/<!DOCTYPE html>[\S-\s]*<\/style>/, '')
        const _content = _body.replace(/(^\s*)|(\s*$)/g, '') // 截取文字
        var regex = /<\/?((?!img).)*?\/?>/g // 去除所有元素标签
        var result = _content.replace(regex, '')
        var resultContent = result.replace(/<img[^>]*?(src="[^"]*?")[^>]*?>/g, '') // 去除所有的空格
        article.summary = resultContent.substr(0, 50)
      }
      article.urls = ''
      uploads.forEach(upload => {
        article.urls += ',' + upload.url
      })
      article.urls = article.urls.substring(1)
      if (this.isEdit) {
        localStorage.removeItem('reduction')
        this._upArticle(Object.assign({}, article))
      } else {
        localStorage.removeItem('reduction')
        this._saveArticle(Object.assign({}, article))
      }
    },
    _upArticle(article) {
      updateDiscContent(article).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.reset()
          this.isEdit = false
          Message({
            type: 'success',
            message: '修改文章成功!'
          })
          this.$router.replace({ path: '/content/contentList' })
          this.loading = false
        } else {
          Message.error(res.msg)
          this.loading = false
        }
      })
    },
    handlePic(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpeg|tif|jpg|png|rle)$/g
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
          uploadPic(file, function(e) {
            if (e === 1) {
              obj.isUpload = true
            }
            obj.progress = e * 100
          }).then(res => {
            this.article.idxpicUrl = res.data.picUrl
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    deletePic() {
      this.article.idxpicUrl = ''
    },
    getTopic() {
      if (this.columnId) {
        getColumnList({ id: this.columnId }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this.topicOptions = res.data
          }
        })
      } else {
        this.topicOptions = []
      }
    },
    clearTopic() {
      this.topicid = ''
    },
    _saveArticle(article) {
      saveDiscContent(article).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.reset()
          Message({
            type: 'success',
            message: '添加文章成功!'
          })
          this.loading = false
          this.$router.replace({ path: '/content/contentList' })
        } else {
          Message.error(res.msg)
          this.loading = false
        }
      })
    },
    handleDelete(d, index) {
      d.splice(index, 1)
    },
    cancel() {
      localStorage.removeItem('reduction')
      this.$router.go(-1)
    },
    handleUpload(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpeg|tif|jpg|png|rle)$/g
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
          this.uploads.push(obj)
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
    init() {
      const { id, name, e } = this.$route.query
      this.articleMessage = name
      this.article.picLayout = id
      switch (name) {
        case '小图':
          this.uploadsMax = 1
          break
        case '横图':
          this.uploadsMax = 1
          break
        case '三图':
          this.uploadsMax = 3
          break
        default:
          break
      }
      if (e === 1 || e === '1') { // 这是编辑
        this.isEdit = true
        if (this.columnId) {
          getColumnList({ id: this.columnId }).then(res => {
            if (res.code === ERR_SUCCESS) {
              this.topicOptions = res.data
            }
          })
        }
        getDiscContentById({ id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            const data = res.data
            this.topicid = data.dissertationid
            this.article = Object.assign({}, data)
            this.columnId = this.article.columnid
            this.article.picLayout = data.picLayout
            this.uploads = []
            if (this.columnId) {
              getColumnList({ id: this.columnId }).then(res => {
                if (res.code === ERR_SUCCESS) {
                  this.topicOptions = res.data
                }
              })
            }
            getCategoryList({ type: 1 }).then(res => {
              if (res.code === ERR_SUCCESS) {
                const categoryList = res.data
                // console.log(categoryList)
                this.ids = returnParentId(data.categoryid, categoryList)
              }
            })
            // this.ids = returnParentId(data.categoryid, this.userList)
            data.picUrlList.forEach(e => {
              const url = e
              this.getImgStyle(url, (width, height) => {
                this.uploads.push({
                  name,
                  url,
                  width: width + 'px',
                  height: height + 'px',
                  isUpload: true,
                  progress: 100
                })
              })
            })
            setTimeout(() => {
              // console.log(typeof this.article.html)
              // console.log(this.article.html)
              // const html = this.article.html.replace(/<div class="article-title">[\S-\s]*<\/div>/, '')
              // console.log(this.article.html)
              const html = this.article.html.slice(this.article.html.indexOf('<div class="article-title">'), this.article.html.indexOf('</body>')).replace(/\s\s/g, '').replace(/<div class="article-title">[\S-\s]*<\/div>/, '')
              // // console.log(html)
              // // this.$refs.editor.getEditor().txt.html(html)
              try {
                if (this.$refs.editor.getEditor() !== undefined) {
                  this.$refs.editor.getEditor().ready(() => {
                    this.$refs.editor.getEditor().setContent(html)
                    this.pre() // 首次执行
                    // console.log(1111111)
                  })
                  this.$refs.editor.getEditor().addListener('contentchange', () => {
                    this.pre()
                    // console.log(2222222)
                  })
                }
              } catch (e) {
                console.log(e)
              }
            }, 500)
          } else {
            Message.error(res.msg)
          }
          this._getBaseTypeList()
        })
      } else { // 这是新增
        this.isEdit = false
        this._getBaseTypeList()
        setTimeout(() => {
          this.$refs.editor.getEditor().addListener('contentchange', () => {
            this.pre()
            // console.log(2222222)
          })
        }, 500)
      }
    },
    _getColumnList() {
      getColumnList().then(res => {
        console.log(res)
        if (res.code === ERR_SUCCESS) {
          this.options = res.data
        }
      })
    },
    _getBaseTypeList() {
      getCategoryList({ type: 1 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const data = res.data
          this.userList = res.data
          this.listSort = labelSortArr(data)
        }
      })
    },
    reset() {
      this.article = Object.assign({}, ARTICLE)
      this.ids = []
      this.uploads = []
      // this.$refs.editor.getEditor().txt.clear()
      this.$refs.editor.getEditor().reset()
    }
  },
  watch: {
    // $route () {
    //   const { path } = this.$route
    //   if (path === '/content/contentEdit') {
    //     this.reset()
    //     this.init()
    //   }
    // },
    title() {
      console.log('...')
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
    // wangEditor,
    UEditor,
    Message,
    ContentPreiew
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
    height 45px
    line-height 45px
    color $color-text
    font-size $font-size-lg
    &::before
      content ''
      margin 15px 10px 0 10px
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
      display flex
      margin 0 40px 0px 140px
      padding-top 15px
      line-height 1
      z-index: -999
      .mobile-prev
        position relative
        width 400px
        height 600px
        margin-left 40px
        padding 60px 8px 0px 5px
        box-sizing border-box
        background-image url("../../static/iphone.png")
        background-size 100% 100%
        overflow hidden
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
  .preview
    disply fixed
    right 0
</style>

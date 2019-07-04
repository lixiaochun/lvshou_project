<template>
  <div class="tag-manage-wrapper">
    <p class="title"><span>等级设置</span></p>
    <div class="content-manage-item">
      <ul class="warning-wapper">
        <li>
          <span class="choose">等级名称：</span>
          <div>
            <p><el-input size="mini" v-model="appUserLevelConfig.levelName" style="width: 350px"></el-input></p>
          </div>
        </li>
        <li>
          <span  class="choose">等级标识：</span>
          <div>
            <p><el-input size="mini" v-model="appUserLevelConfig.levelShortname" style="width: 350px"></el-input></p>
          </div>
        </li>
        <li>
          <span class="choose">升级条件：</span>
          <div>
            <p>
              <span>累计魅力值</span><el-input size="mini"  v-model="appUserLevelConfig.levelScoreBegin" style="width: 130px; margin: 0 5px"></el-input>
              <span>至</span><el-input size="mini" v-model="appUserLevelConfig.levelScoreEnd" style="width: 130px; margin-left: 5px"></el-input>
            </p>
          </div>
        </li>
        <li>
          <span class="">有效期限：</span>
          <div>
            <p>
              <el-date-picker
              v-model="value6"
              unlink-panels
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            </p>
          </div>
        </li>
        <li>
          <span class="">上传等级图标：</span>
          <div class="upload-wrapper">

            <div class="upload-item"  v-if="uploads.url.length">
              <img :src="uploads.url">
              <span class="upload-item-close icon-close" @click="handleDelete(uploads)"></span>
              <span class="upload-item-line"
                    v-if="uploads.progress !== 100"
                    :style="{width: `${uploads.progress}%`}"></span>
            </div>
            <div class="list-input-upload">
              <el-button size="mini"> {{ uploads.length }}上传图片</el-button>
              <input
                type="file"
                class="list-upload" @change="handleUpload">
            </div>
          </div>
        </li>
        <li>
          <el-button size="mini" style="width: 80px" @click="cancel()" >返回列表</el-button>
          <el-button type="primary" size="mini"  style="width: 80px" @click="saveWarning(id)" :loading="loading">提交</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Input, DatePicker, Message } from 'element-ui'
import listTable from 'base/list-table/list-table'
import { saveConfig, updateConfig, getConfig } from 'api/user'
import { ERR_SUCCESS } from 'api/config'
import { isNull } from 'common/js/util'
import { levelPploadPic } from 'api/upload'
export default {
  data() {
    return {
      id: '',
      loading: false,
      value6: '',
      uploads: '',
      appUserLevelConfig: {
        levelName: '',
        levelShortname: '',
        levelScoreBegin: '',
        levelScoreEnd: '',
        levelIcon: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { id } = this.$route.query
      this.id = id
      if (id > 0) {
        this._getConfig()
      }
    },
    _saveConfig(appUserLevelConfig) {
      saveConfig(appUserLevelConfig).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.list
          Message.success('保存成功')
        } else {
          Message.error(res.msg)
        }
      })
    },
    _updateConfig(appUserLevelConfig) {
      updateConfig(appUserLevelConfig).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.tableData = res.data.list
          Message.success('保存成功')
        } else {
          Message.error(res.msg)
        }
      })
    },
    _getConfig() { // 回显
      const { id } = this
      if (this.id > 0) {
        getConfig({ id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this.appUserLevelConfig = res.data.appUserLevelConfig
            this.uploads = {}
            this.uploads.url = res.data.appUserLevelConfig.levelIcon
          } else {
            Message.error(res.msg)
          }
        })
      }
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
          levelPploadPic(file, function(e) {
            if (e === 1) {
              obj.isUpload = true
            }
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
    handleDelete(d) {
      this.uploads = {}
      this.uploads.url = ''
    },
    saveWarning(id) {
      if (this.loading) return
      const { levelName, levelShortname, levelScoreBegin, levelScoreEnd } = this.appUserLevelConfig
      if (isNull(levelName)) {
        return Message.error('请输入等级名称！')
      }
      if (isNull(levelShortname)) {
        return Message.error('请输入等级标识！')
      }
      if (isNull(levelScoreBegin)) {
        return Message.error('请输入魅力值！')
      }
      if (isNull(levelScoreEnd)) {
        return Message.error('请输入魅力值！')
      }
      this.appUserLevelConfig.levelIcon = this.uploads.url
      if (id) {
        this._updateConfig(Object.assign({}, this.appUserLevelConfig))
      } else {
        this._saveConfig(Object.assign({}, this.appUserLevelConfig))
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  },
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
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
.tag-manage
  margin 0 10px
.content-manage-item
  margin 0 auto
  padding-top 40px
  width 600px
.warning-wapper
  width 600px
  margin 0 auto
  padding-top 20px
  overflow hidden
  padding-bottom 40px
  li
    float left
    font-size 12px
    margin-bottom 20px
    width 100%
    &:last-child
      text-align center
    .unit
      display inline-block
      padding 0 10px
      margin-left -3px
      background #dcdfe6
      color #333
      height 28px
      line-height 28px
      border-top-right-radius 3px
      border-bottom-right-radius 3px
    .choose
      &:before
        content '*'
        color red
        padding-right 4px
    &>span
      float left
      margin-right 6px
      width 100px
      height 30px
      line-height 30px
      font-size 12px
      text-align right
  .upload-wrapper
    width 100%
    margin-left 100px
  .upload-item
    position relative
    width 60px
    height 60px;
    inline-block-top()
    img
      max-width 100%
    .upload-item-close
      position absolute
      top -6px
      right 3px
      width 12px
      height 12px
      line-height 12px
      font-size 12px
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
</style>

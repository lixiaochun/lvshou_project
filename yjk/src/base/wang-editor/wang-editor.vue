<template>
  <div id="editor"></div>
</template>

<script type="text/ecmascript-6">
import { uploadPic } from 'api/upload'
import { ERR_SUCCESS } from 'api/config'
import { Message } from 'element-ui'
import E from 'wangeditor'

const COMPONENT_NAME = 'WangEditor'

export default {
  name: COMPONENT_NAME,
  mounted() {
    this.$nextTick(() => {
      const that = this
      const editor = new E('#editor')
      // editor.config.pasteFilter = false
      editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'undo', // 撤销
        'redo' // 重复
      ]
      editor.customConfig.onchange = function(html) {
        // html 即变化之后的内容
        that.subimit(html)
      }
      editor.customConfig.customUploadImg = function(files, insert) {
        uploadPic(files[0]).then(res => {
          if (res.code === ERR_SUCCESS) {
            insert(res.data.picUrl)
          } else {
            Message.error(res.msg)
          }
        })
      }
      editor.customConfig.pasteFilterStyle = false
      editor.create()
      this.editor = editor
    })
  },
  methods: {
    getEditor() {
      return this.editor
    },
    subimit(html) {
      this.$emit('showCityName', html)
    }
  },
  components: {
    Message
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

#editor
  position relative
  z-index 100
  img
    display block
</style>

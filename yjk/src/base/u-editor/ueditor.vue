<template>
  <div>
    <script id="editor" type="text/plain" style="width: 750px; height: 500px"></script>
  </div>
</template>

<script>
import '../../../static/UEditor/ueditor.config.js'
import '../../../static/UEditor/ueditor.all.js'
import '../../../static/UEditor/lang/zh-cn/zh-cn.js'
import '../../../static/UEditor/jquery-2.2.3.min.js'
import '../../../static/UEditor/ueditor.parse.js'

// 引入秀米所需的文件
import '../../../static/UEditor/xiumi-ue-v5.css'
import '../../../static/UEditor/xiumi-ue-dialog-v5.js'

// import { uploadPic } from 'api/upload'
// import { ERR_SUCCESS } from 'api/config'
// import { Message } from 'element-ui'

const COMPONENT_NAME = 'UEditor'
console.log(window.UE)
export default {
  name: COMPONENT_NAME,
  mounted() {
    const _this = this
    window.UE.delEditor('editor')
    this.$nextTick(() => {
      this.editor = window.UE.getEditor('editor', {
        autoHeightEnabled: false,
        autoFloatEnabled: false, // 修改
        scaleEnabled: false, // 是否可以自动长高
        elementPathEnabled: false, // 是否显示元素路径
        wordCount: false, // 字数统计
        catchRemoteImageEnable: true, // 远程抓取图片到本地
        imageScaleEnabled: true, // 启用图片拉伸缩放
        // toolbars: [
        //   [
        //     // 'inserttitle', // 插入标题
        //     'bold', // 加粗
        //     'fontsize', // 字号
        //     'fontfamily', // 字体
        //     'italic', // 斜体
        //     'link', // 超链接
        //     'underline', // 下划线
        //     'strikethrough', // 删除线
        //     'forecolor', // 字体颜色
        //     'backcolor', // 背景色
        //     'insertorderedlist', // 有序列表
        //     'insertunorderedlist', // 无序列表
        //     'justifyleft', // 居左对齐
        //     'justifyright', // 居右对齐
        //     'justifycenter', // 居中对齐
        //     'justifyjustify', // 两端对齐
        //     'blockquote', // 引用
        //     'emotion', // 表情
        //     'insertimage', // 多图上传
        //     'inserttable', // 插入表格
        //     'undo', // 撤销
        //     'redo' // 重复
        //   ]
        // ]
        toolbars: [
          [
            'anchor', // 锚点
            'undo', // 撤销
            'redo', // 重做
            'bold', // 加粗
            'indent', // 首行缩进
            'snapscreen', // 截图
            'italic', // 斜体
            'underline', // 下划线
            'strikethrough', // 删除线
            'subscript', // 下标
            'fontborder', // 字符边框
            'superscript', // 上标
            'formatmatch', // 格式刷
            'source', // 源代码
            'blockquote', // 引用
            'pasteplain', // 纯文本粘贴模式
            'selectall', // 全选
            'print', // 打印
            'preview', // 预览
            'horizontal', // 分隔线
            'removeformat', // 清除格式
            'time', // 时间
            'date', // 日期
            'unlink', // 取消链接
            'insertrow', // 前插入行
            'insertcol', // 前插入列
            'mergeright', // 右合并单元格
            'mergedown', // 下合并单元格
            'deleterow', // 删除行
            'deletecol', // 删除列
            'splittorows', // 拆分成行
            'splittocols', // 拆分成列
            'splittocells', // 完全拆分单元格
            'deletecaption', // 删除表格标题
            'inserttitle', // 插入标题
            'mergecells', // 合并多个单元格
            'deletetable', // 删除表格
            'cleardoc', // 清空文档
            'insertparagraphbeforetable', // "表格前插入行"
            'insertcode', // 代码语言
            'fontfamily', // 字体
            'fontsize', // 字号
            'paragraph', // 段落格式
            // 'simpleupload', // 单图上传,ueditor.all.js报错，引用jquery不成功
            'insertimage', // 多图上传
            'edittable', // 表格属性
            'edittd', // 单元格属性
            'link', // 超链接
            'emotion', // 表情
            'spechars', // 特殊字符
            'searchreplace', // 查询替换
            // 'map', // Baidu地图
            // 'gmap', // Google地图
            'insertvideo', // 视频
            'help', // 帮助
            'justifyleft', // 居左对齐
            'justifyright', // 居右对齐
            'justifycenter', // 居中对齐
            'justifyjustify', // 两端对齐
            'forecolor', // 字体颜色
            'backcolor', // 背景色
            'insertorderedlist', // 有序列表
            'insertunorderedlist', // 无序列表
            'fullscreen', // 全屏
            'directionalityltr', // 从左向右输入
            'directionalityrtl', // 从右向左输入
            'rowspacingtop', // 段前距
            'rowspacingbottom', // 段后距
            'pagebreak', // 分页
            'insertframe', // 插入Iframe
            'imagenone', // 默认
            'imageleft', // 左浮动
            'imageright', // 右浮动
            'attachment', // 附件
            'imagecenter', // 居中
            'wordimage', // 图片转存
            'lineheight', // 行间距
            'edittip ', // 编辑提示
            'customstyle', // 自定义标题
            'autotypeset', // 自动排版
            'webapp', // 百度应用
            'touppercase', // 字母大写
            'tolowercase', // 字母小写
            'background', // 背景
            'template', // 模板
            'scrawl', // 涂鸦
            'music', // 音乐
            'inserttable', // 插入表格
            'drafts', // 从草稿箱加载
            'charts' // 图表
          ]
        ]
      })
      // console.log(this.editor.execCommand)
      this.editor.addListener('contentChange', function() {
        const html = this.getContent()
        _this.subimit(html)
      })
      // this.editor.addListener('afterinsertimage', function (files, insert) {
      //   uploadPic(files[0]).then(res => {
      //     if (res.code === ERR_SUCCESS) {
      //       insert(res.data.picUrl)
      //     } else {
      //       Message.error(res.msg)
      //     }
      //   })
      // })
    })
  },
  destoryed() {
    this.editor.destory()
  },
  methods: {
    getEditor() {
      return this.editor
    },
    subimit(html) {
      this.$emit('showCityName', html)
    }
  }
  // components: {
  //   Message
  // }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/css/variable"
@import "~common/css/mixin"

#editor
  position relative
  height 100%
  z-index -999
  img
    display block
    max-width 750px
</style>

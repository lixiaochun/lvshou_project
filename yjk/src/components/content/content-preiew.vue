<template>
    <div class="content-manage-item">
      <div class="preHtml">
        <div class="pre-wapper">
          <div v-html="previews" v-if="isIds" style="margin-top: 10px"></div>
           <div v-html="prev" v-else style="margin-top: 10px"></div>
        <!-- <div class="articleTitle">#{{articleTitle}}#</div>
        <div>
          <span class="time">{{_format(releasetime)}}</span>
          <span class="source">来源：{{origin}}</span>
        </div>
          <div v-html="previews" v-if="isIds" style="margin-top: 10px"></div>
          <div v-html="prev" v-else style="margin-top: 10px"></div> -->
        </div>
      </div>
      <!--{{preview}}-->
    </div>
</template>

<script type="text/ecmascript-6">
import { format } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
import { getDiscContentById } from 'api/content'
export default {
  props: ['list'],
  data() {
    return {
      prev: '',
      isIds: false,
      title: '文章预览',
      releasetime: '2010-10-10',
      articleTitle: '',
      origin: ''
    }
  },
  created() {
    // console.log(this.list)
    const { articleTitle, origin, ids, html } = this.list
    this.init()
    if (ids) {
      this.getArticle(ids)
    } else {
      this.articleTitle = articleTitle
      this.origin = origin
      this.prev = html
    }
  },
  methods: {
    _format(e) {
      return format(e)
    },
    init() {
      this.releasetime = new Date()
    },
    getArticle(id) {
      getDiscContentById({ id }).then(res => {
        if (res.code === ERR_SUCCESS) {
          console.log(res.data)
          this.isIds = true
          const data = res.data
          console.log(data.html)
          // this.articleTitle = data.title
          // this.origin = data.origin
          // const content = data.html.replace(/<section class="article-title">[\S-\s]*<\/section>/, '')
          // this.previews = content
          this.previews = data.html
          console.log(data.html)
        }
      })
    }
  },
  components: {
    // [cDialog.name]: cDialog
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
  .content-manage-item
    height 560px
    .article-title
      display block
    .preHtml
      margin 0 auto
      margin-top 10px
      padding 20px 20px
      padding-top 54px
      background url("../../static/iphone.png")
      background-repeat no-repeat
      background-size 100%
      width 238px
      height 500px
      img
        display block
      .pre-wapper
        height 468px
        overflow-y auto
        font-size 14px
        p
          line-height 22px
          img
            display block
  .articleTitle
    margin-top 6px
    line-height 20px
    font-size 16px
  .source
    float right
    overflow hidden
    width 160px
    height 20px
    white-space nowrap
    text-overflow ellipsis
    text-align right
    line-height 20px
    font-size 12px
  .time
    line-height 20px
    font-size 12px
  .warning-wapper
    width 400px
    margin 0 auto
    padding-top 20px
    overflow hidden
    padding-bottom 40px
    li
      float left
      font-size 12px
      margin-bottom 10px
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
        width 90px
        height 30px
        line-height 30px
        font-size 12px
        text-align right
</style>

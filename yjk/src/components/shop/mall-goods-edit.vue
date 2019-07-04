<template>
  <div class="content-add-list">
    <div class="list-header shop-year">商品管理</div>
    <div class="list-item-wrapper">
      <div class="list-item">
        <span class="label"><em>*</em>商品类型：</span>
        <div class="list-input-item">
          <el-radio v-model="radio" label="1" size="mini">实体商品</el-radio>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>关联商品：</span>
        <div class="list-input-item" v-if="shopGoodsState">
          <el-select v-model="article.id" filterable placeholder="请选择" style="width: 360px" size="mini">
            <el-option
              v-for="item in getGoods"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="list-input-item" v-else>
          {{shopGoodName}}
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>商品分类：</span>
        <div class="list-input-item">
          <el-cascader
            :options="listSort"
            filterable
            style="width: 360px"
            size="mini"
            v-model="ids"
            change-on-select
          >
          </el-cascader>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>商品名称：</span>
        <div class="list-input-item">
          <el-input
            style="width: 360px;"
            size="mini"
            placeholder="请输入商品名称"
            :maxlength="30"
            v-model="article.shopGoodsname"></el-input>
        </div>
        <p class="list-input-tip" style="color: #666; height: 20px; line-height: 20px; color: #ff9560">标题长度不能小于16个汉字</p>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>商品原价：</span>
        <div class="list-input-item">
          <el-input
            style="width: 360px;"
            size="mini"
            placeholder="请输入商品原价"
            :maxlength="24"
            @input="changeAmount"
            v-model="article.price"></el-input>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>魅力分兑换：</span>
        <div class="list-input-item">
          <div>
            <el-input placeholder="" size="mini" style="width: 100px" v-model="article.exchangePoints"  @input="changeExchangePoints"></el-input> <span>魅力分</span> +
            <el-input placeholder="" size="mini" style="width: 100px"  v-model="article.exchangeMoney"  @input="changeExchangeMoney"> </el-input> <span>（元）</span>
            <p style="color: #666; height: 20px; line-height: 20px; color: #ff9560">固定魅力分与金钱兑换</p>
          </div>
        </div>
      </div>
      <div class="list-item" style="margin-top: 20px">
        <span class="label"><em>*</em>商品图片：</span>
        <div class="list-input-item">
          <div class="upload-wrapper">
            <div class="upload-item" v-if="picImgUrl">
              <img :src="picImgUrl" style="height: 200px; width: 200px">
              <span class="upload-item-close icon-close" @click="handleDelete()"></span>
              <span class="upload-item-line"></span>
            </div>
            <div class="list-input-upload" v-if="!picImgUrl">
              <el-button size="mini">上传图片</el-button>
              <input
                type="file"
                class="list-upload" @change="handleUpload">
            </div>
          </div>
          <div class="img-details">
            <p>说明：</p>
            <p>1.图片比例1：1，建议使用宽800*高800像素的图片</p>
            <p>2.图片小于1M</p>
            <p>3.支持gif、jpg、jpge、png、bmg图片格式</p>
          </div>
        </div>
      </div>
      <div class="list-item">
        <span class="label"><em>*</em>正文内容：</span>
        <div class="list-input-item list-editor">
          <wang-editor ref="editor"></wang-editor>
        </div>
      </div>
      <div class="list-item" style="margin-top: 30px;">
        <div class="list-button">
          <el-button size="mini" @click="returnList">返回列表</el-button>
          <el-button size="mini" @click="handleSave" :loading="loading">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RadioGroup, Select, Option, Button, Message, Cascader, Radio, Input } from 'element-ui'
import wangEditor from 'base/wang-editor/wang-editor'
import { ERR_SUCCESS } from 'api/config'
import { goodsSortArr, isNull, returnParentid } from 'common/js/util'
import { getGoods, getGoodsCategoryList, saveGoods, getGoodsById, updateGoodsById } from 'api/mall'
import { uploadPic, uploadContent } from 'api/upload'

const ARTICLE = {
  id: '',
  categoryid: '',
  price: '',
  exchangeMoney: '',
  shopGoodsname: '',
  exchangePoints: '',
  picUrl: '',
  description: ''
}

export default {
  name: 'content-edit',
  data() {
    return {
      radio: '1',
      shopGoodName: '',
      shopGoodsState: true,
      getGoods: [],
      loading: false,
      ids: [],
      roadUrl: [],
      listSort: [],
      article: Object.assign({}, ARTICLE),
      picImgUrl: '',
      uploadsMax: 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleSave() {
      if (this.loading) return
      const { article, ids, picImgUrl } = this
      if (isNull(article.id)) {
        return Message.error('请选择关联商品！')
      }
      if (isNull(ids)) {
        return Message.error('请选择分类！')
      }
      if (isNull(article.shopGoodsname)) {
        return Message.error('请输入商品名称！')
      }
      if (article.shopGoodsname.length < 16) {
        return Message.error('商品名称不能少于16字！')
      }
      if (isNull(article.price)) {
        return Message.error('请输入商品原价！')
      }
      if (isNull(article.exchangePoints)) {
        return Message.error('请输入兑换商品魅力分！')
      }
      if (isNull(article.exchangeMoney)) {
        return Message.error('请输入兑换商品金钱！')
      }
      if (picImgUrl === '') {
        return Message.error('请上传封面图片！')
      }
      this.loading = true
      article.categoryid = ids[ids.length - 1]
      const content = this.$refs.editor.getEditor().txt.html()
      article.description = uploadContent('', '', content, '')
      if (isNull(article.summary)) {
        let _content = ''
        content.replace(/<p>([\u4e00-\u9fa5]+)<\/p>/gi, function(w, r) {
          _content += r
        })
        article.summary = _content.substr(0, 100)
      }
      article.picUrl = picImgUrl
      if (this.isEdit) {
        this._upArticle(Object.assign({}, article))
      } else {
        this._saveArticle(Object.assign({}, article))
      }
    },
    returnList() {
      this.$router.replace({ path: '/shop/goods' })
    },
    _upArticle(article) {
      updateGoodsById(article).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.reset()
          this.isEdit = false
          Message({
            type: 'success',
            message: '修改商品成功!'
          })
          this.$router.replace({ path: '/shop/goods' })
          this.loading = false
        } else {
          Message.error(res.msg)
          this.loading = false
        }
      })
    },
    _saveArticle(article) {
      saveGoods(article).then(res => {
        if (res.code === ERR_SUCCESS) {
          this.reset()
          Message({
            type: 'success',
            message: '添加商品成功!'
          })
          this.loading = false
          this.$router.replace({ path: '/shop/goods' })
        } else {
          Message.error(res.msg)
          this.loading = false
        }
      })
    },
    handleDelete(d, index) {
      this.picImgUrl = ''
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
      if (size > 1000000) {
        target.value = ''
        Message.error('请上传图片大小少于1M！')
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
          console.log(file)
          uploadPic(file, function(e) {
            obj.progress = e * 100
          }).then(res => {
            obj.url = res.data.picUrl
            this.picImgUrl = res.data.picUrl
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
    init() {
      getGoods({ status: 0 }).then(res => {
        this.getGoods = res.data
      })
      const { id } = this.$route.query
      this.uploadsMax = 1
      if (id) { // 回显
        this._getBaseTypeList()
        this.shopGoodsState = false
        this.isEdit = true // 编辑状态
        getGoodsById({ id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            const data = res.data
            const that = this
            this.article = Object.assign({}, data.dataList[0])
            const categoryid = res.data.dataList[0].categoryid
            this.shopGoodName = res.data.dataList[0].name
            console.log(data.dataList)
            getGoodsCategoryList().then(res => {
              const newIds = returnParentid(categoryid, res.data.dataList)
              newIds.unshift(0)
              that.ids = newIds
            })
            this.picImgUrl = res.data.dataList[0].picUrl
            setTimeout(() => {
              this.$refs.editor.getEditor().txt.html(this.article.description)
            }, 100)
          } else {
            Message.error(res.msg)
          }
        })
      } else {
        this._getBaseTypeList()
      }
    },
    _getBaseTypeList() {
      getGoodsCategoryList().then(res => { // 获取树级商品
        if (res.code === ERR_SUCCESS) {
          const dataArr = res.data.dataList
          if (dataArr.length > 0) {
            this.listSort = goodsSortArr(dataArr)
          }
        }
      })
    },
    reset() { // 刷新
      this.article = Object.assign({}, ARTICLE)
      this.ids = []
      this.uploads = []
      this.$refs.editor.getEditor().txt.clear()
    },
    changeAmount(e) {
      setTimeout(() => {
        if (this.article.price > 0) {
          this.article.price = e.replace(/[^0-9]/g, '')
        } else {
          this.article.price = e.replace(/[^1-9]/g, '')
        }
      }, 20)
    },
    changeExchangePoints(e) {
      setTimeout(() => {
        if (this.article.exchangePoints > 0) {
          this.article.exchangePoints = e.replace(/[^0-9]/g, '')
        } else {
          this.article.exchangePoints = e.replace(/[^1-9]/g, '')
        }
      }, 20)
    },
    changeExchangeMoney(e) {
      setTimeout(() => {
        this.article.exchangeMoney = e.replace(/[^0-9]/g, '')
      }, 20)
    }
  },
  watch: {
    $route() {
      const { path } = this.$route
      if (path === '/content/contentEdit') {
        this.reset()
        this.init()
      }
    }
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [Button.name]: Button,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Cascader.name]: Cascader,
    [Radio.name]: Radio,
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
  .img-details
    color #ff9560
    p
      height 20px
      line-height 20px
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
        margin 0 40px 0px 140px
        padding-top 15px
        line-height 1
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
</style>

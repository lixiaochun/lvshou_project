<template>
  <div class="content-add-list" style="margin-bottom: 50px">
    <el-form  label-width="100px">
  <el-form-item label="标品分类:" required>
    <el-radio-group v-model="standardType" size="mini" @change="changeType(standardType)">
            <el-radio-button :label="1">单品</el-radio-button>
            <el-radio-button :label="2">套餐</el-radio-button>
          </el-radio-group>
  </el-form-item>
  <el-form-item label="年龄标签:">
    <el-select v-model="agePeriod" placeholder="请选择分类" size="mini" style="width:50%">
    <el-option
          v-for="item in ageLable"
          :key="item.value"
          :label="item.label"
          :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="所属标签:" required>
    <el-select v-model="labelId" placeholder="请选择分类" size="mini" style="width:50%">
    <el-option
          v-for="item in labelList"
          :key="item.id"
          :label="item.labelName"
          :value="item.id">
    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="标品名称:" required>
    <el-input size="mini" :maxlength="40" style="width:50%" placeholder="请输入标品名称，40个字以内" v-model="name"></el-input>
  </el-form-item>
  <el-form-item label="关联商品:" required>
     <el-select v-model="goods" placeholder="请选择商品" size="mini" style="width:50%" filterable
      @change="getGoodsInfo(goods)"
      :clearable='false'
     >
    <el-option
          v-for="item in goodsList"
          :key="item.id"
          :label="item.name"
          :value="item.name"
         >
    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="关联商品列表:">
    <template>
    <el-table
    :data="tableData"
    border
    stripe
    style="width: 90%"
    size="mini">
    <el-table-column label="序号" width="60" align="center">
       <template slot-scope="scope">
          {{scope.$index + 1}}
      </template>
    </el-table-column>
     <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
                   <p style="text-align: left">
                    {{tableData[scope.$index].name}}
                  </p>
                </template>
     </el-table-column>
      <el-table-column  label="价格" width="80" align='center'>
        <template slot-scope="scope">
          {{`￥${_formatCurrency(tableData[scope.$index].price)}`}}
        </template>
      </el-table-column>
       <el-table-column prop="categoryName" label="类型" width="80" align='center'></el-table-column>
        <el-table-column  label="主图" width="140" align='center'>
          <template slot-scope="scope">
            <div class="upload-item" v-if="tableData[scope.$index].goodsUrl">
              <img :src="tableData[scope.$index].goodsUrl" style="height: 80px; width: 120px">
              <!-- <span class="upload-item-close icon-close" @click="deletePic(scope.$index, tableData)"></span>
               <span class="upload-item-line"></span> -->
            </div>
        </template>
        </el-table-column>
        <el-table-column  label="操作" width="120" align='center'>
          <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteAction(scope.$index, tableData)"
                    class="custom-columnButton"
                    type="text"
                    size="small">
                    <span>删除</span>
                  </el-button>
                   <el-button
                    class="custom-columnButton"
                    type="text"
                    size="small"
                    v-if="!tableData[scope.$index].goodsUrl"
                   >
                    <input
                    type="file"
                    class="list-upload" @change="handleMainPic" style="left:55px;opacity: 0">
                    <span>上传图片</span>
                  </el-button>
                </template>
        </el-table-column>
  </el-table>
  <div class="desc">
    <p>说明：</p>
     <span>1.建议使用宽750*高750像素的图片</span>
     <span>2.图片小于2M</span>
     <span>3.支持gif、jpg、jpge、png、bmg图片格式</span>
  </div>
    </template>
  </el-form-item>
  <el-form-item label="商品价格:">
    <el-input  disabled style="width:150px" :placeholder="amountSum">
      <template slot="append">元</template>
    </el-input>
    <span style="color:#909399;"><i class="el-icon-info"></i> 商品价格：自动累计各产品价格总和</span>
  </el-form-item>
  <el-form-item label="商品总价:" required>
    <el-input  type="number" style="width:150px" v-model="amountSale"  @input="changeAmount">
      <template slot="append">元</template>
    </el-input>
     <span style="color:#909399;"><i class="el-icon-info"></i>商品总价：APP 前端显示的标品价格 </span>
  </el-form-item>
   <el-form-item label="banner图片:" required>
   <div class="list-input-item">
           <div class="upload-wrapper">
            <div class="upload-item"
               v-for="(upload, index) in uploads"
               :key="index">
              <img :src="upload.url" :style="{width: upload.width, height: upload.height}">
              <span class="upload-item-close icon-close" @click="handleDelete(uploads, index)"></span>
              <span class="upload-item-line"
                    v-if="upload.progress !== 100"
                    :style="{width: `${upload.progress}%`}"></span>
            </div>
            <div class="list-input-upload" v-if="uploads.length < uploadsMax">
              <el-button size="mini" type="primary">上传图片</el-button>
              <input
                type="file"
                class="list-upload" @change="handleUpload">
            </div>
          </div>
   <div class="desc">
    <p>说明：</p>
     <span>1.建议使用宽750*高750像素的图片</span>
     <span>2.图片小于2M</span>
     <span>3.支持gif、jpg、jpge、png、bmg图片格式</span>
  </div>
   </div>
  </el-form-item>
  <el-form-item label="标品详情:">
   <div class="list-input-item list-editor">
          <wang-editor ref="editor" style="width:80%"></wang-editor>
        </div>
        <div class="list-item">
        <div class="list-button"  style="margin-bottom: 50px;">
          <el-button size="mini" @click="cancel">取消</el-button>
          <el-button size="mini" @click="handleSave">提交</el-button>
        </div>
      </div>
  </el-form-item>
</el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { Input, Button, Message, RadioButton, Cascader, Radio, RadioGroup, Form, FormItem, DatePicker, Table, TableColumn, Select, Option, Upload, MessageBox } from 'element-ui'
import wangEditor from 'base/wang-editor/wang-editor'
import { ERR_SUCCESS } from 'api/config'
import { isNull, formatCurrency } from 'common/js/util'
import { saveStandardProduct, getLabel, getStandardProductById, updateById } from 'api/sample'
import { uploadPic, uploadContent } from 'api/upload'
import { getGoods } from 'api/mall'

const _ageLable = [{
  value: 1,
  label: '青年人(15-35岁)'
}, {
  value: 2,
  label: '壮年人(36-45岁)'
}, {
  value: 3,
  label: '中年人(46-60岁)'
}, {
  value: 4,
  label: '老年人(60岁+)'
}, {
  value: 0,
  label: '未知年龄'
}]

export default {
  data() {
    return {
      name: '',
      amountSale: '',
      standardType: 1,
      labelList: [],
      labelId: null,
      goodsList: [],
      tableData: [],
      goods: '',
      disabled: false,
      loading: false,
      uploads: [],
      uploadsMax: 5,
      ageLable: _ageLable,
      agePeriod: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      goodIdsAndUrls: [],
      amountSum: 0,
      uploadsMin: 2
    }
  },
  created() {
    this.init()
    this._getGoodsList()
  },
  computed: {
  },
  methods: {
    _getLabel() {
      getLabel().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.labelList = res.data
        } else {
          Message.error(res.msg)
        }
      })
    },
    _getGoodsList() {
      getGoods().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.goodsList = res.data
        }
      })
    },
    getGoodsInfo(name) {
      getGoods({ name }).then(res => {
        if (res.code === ERR_SUCCESS) {
          // console.log(res.data)
          if (this.standardType === 1) {
            this.tableData = res.data
          } else {
            if (this.tableData.length === 0) {
              this.tableData.push(res.data[0])
            } else {
              if (!this.tableData[this.tableData.length - 1].goodsUrl) {
                return Message.error('请添加图片后再选择')
              } else if (this.tableData.length > 4) {
                return Message.error('商品数量不能超过5')
              } else {
                this.tableData.push(res.data[0])
              }
            }
          }
          let newPrice = 0
          this.tableData.forEach(res => {
            newPrice += res['price']
          })
          this.amountSale = newPrice
          this.amountSum = newPrice
        } else {
          Message.error(res.msg)
        }
      })
    },
    _formatCurrency(e) {
      return formatCurrency(e)
    },
    handleDelete(d, index) {
      d.splice(index, 1)
    },
    changeType(e) {
      const length = this.tableData.length
      if (e === 1 && length > 1) {
        Message.error('商品列表数量大于1，请删除后切换')
        this.standardType = 2
      }
    },
    deleteAction(index, table) {
      MessageBox.confirm('是否确认删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        table.splice(index, 1)
      }).catch(() => {})
    },
    handleMainPic(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle|PNG|JPG|GIF|JPEG)$/g
      if (!reg.test(name)) {
        target.value = ''
        Message.error('请上传图片类型的格式！')
        return
      }
      if (size > 2048000) {
        target.value = ''
        Message.error('请上传图片大小少于2M！')
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
            this.$set(this.tableData[this.tableData.length - 1], 'goodsUrl', res.data.picUrl)
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    handleSave() {
      // if (this.loading) return
      const { uploads, uploadsMax, standardType, labelId, agePeriod, name,
        amountSale, amountSum, tableData, uploadsMin } = this
      const combineNameArr = tableData.map(item => {
        return item.name
      })
      const combineName = combineNameArr.join('+')
      // 判断主图不能为空
      const goodIdsAndUrlsArr = tableData.map(item => {
        const { id, goodsUrl } = item
        return { goodId: id, url: goodsUrl }
      })
      const goodIdsAndUrls = JSON.stringify(goodIdsAndUrlsArr)
      const bannerUrlArr = uploads.map(item => {
        return item.url
      })
      const bannerUrl = bannerUrlArr.join(',')
      if (isNull(labelId)) {
        return Message.error('请选择所属标签！')
      }
      if (isNull(name)) {
        return Message.error('请输入标品名称！')
      }
      if (isNull(amountSale)) {
        return Message.error('请输入商品总价！')
      }
      if (this.tableData.length === 0) {
        return Message.error('请上传关联商品！')
      }
      if (standardType === 2 && tableData.length < 2) {
        return Message.error('套餐商品数应该大于等于2！')
      }
      // 套餐内不能有重复的产品
      if (standardType === 2) {
        const ids = tableData.map(item => item.id)
        const idArr = ids.sort()
        for (let i = 0; i < idArr.length - 1; i++) {
          if (idArr[i] === idArr[i + 1]) {
            return Message.error('套餐商品内不应有重复单品！')
          }
        }
      }
      if (!tableData[tableData.length - 1].goodsUrl) {
        return Message.error('请上传主图图片')
      }
      if (uploads.length > uploadsMax) {
        return Message.error(`请上传少于${uploadsMax}张的封面图片！`)
      }
      if (uploads.length < uploadsMin) {
        return Message.error(`请上传多于${uploadsMin}张的封面图片！`)
      }
      for (const upload of uploads) {
        if (isNull(upload.isUpload)) {
          Message.error('图片在上传中！')
          return
        }
      }
      this.loading = true
      const content = this.$refs.editor.getEditor().txt.html()
      const standardDetail = uploadContent('', '', content, '')
      const postObj = { standardType, labelId, agePeriod, name, amountSale, amountSum, bannerUrl, combineName, standardDetail, goodIdsAndUrls }
      if (this.isEdit) {
        const { id } = this.$route.query
        const obj = { standardType, labelId, agePeriod, name, amountSale, amountSum, bannerUrl, combineName, standardDetail, goodIdsAndUrls, id }
        updateById(obj).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message({
              type: 'success',
              message: '修改成功!'
            })
            this.$router.replace({ path: '/member/sampleReleased' })
          } else {
            Message.error(res.msg)
          }
        })
      } else {
        saveStandardProduct(postObj).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message({
              type: 'success',
              message: '提交成功!'
            })
            this.$router.replace({ path: '/member/sampleReleased' })
          } else {
            Message.error(res.msg)
          }
        })
      }
    },
    deletePic(index, table) {
      table[index].goodsUrl = ''
    },
    changeAmount(e) {
      setTimeout(() => {
        if (this.amountSale.length === 1) {
          this.amountSale = e.replace(/[^1-9]/g, '')
        } else {
          this.amountSale = e.replace(/[^0-9]/g, '')
        }
      }, 20)
    },
    handleUpload(event) {
      const target = event.target
      const files = target.files
      const file = files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle|PNG|JPG|GIF|JPEG)$/g
      if (!reg.test(name)) {
        target.value = ''
        Message.error('请上传图片类型的格式！')
        return
      }
      if (size > 2048000) {
        target.value = ''
        Message.error('请上传图片大小少于2M！')
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
      this._getLabel()
      const { e, id } = this.$route.query
      if (e === 1 || e === '1') {
        this.isEdit = true
        getStandardProductById({ id }).then(res => {
          if (res.code === ERR_SUCCESS) {
            console.log(res.data)
            const data = res.data
            const standardProductDetail = data.standardProductDetail
            const standardProduct = data.standardProduct
            this.tableData = standardProductDetail
            this.name = standardProduct.name
            this.labelId = standardProduct.labelId
            this.agePeriod = standardProduct.agePeriod
            this.amountSale = standardProduct.amountSale
            this.amountSum = standardProduct.amountSum
            this.standardDetail = standardProduct.standardDetail
            this.standardType = standardProduct.standardType
            const images = standardProduct.bannerUrl.split(',')
            this.uploads = []
            images.forEach(e => {
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
            if (this.standardDetail) {
              setTimeout(() => {
                const content = this.standardDetail.replace(/<div class="article-title">[\S-\s]*<\/div>/, '')
                this.$refs.editor.getEditor().txt.html(content)
              }, 100)
            }
          }
        })
      } else {
        this.isEdit = false
      }
    },
    cancel() {
      this.$router.replace({ path: '/member/sampleReleased' })
    },
    reset() {
      // this.article = Object.assign({}, ARTICLE)
      // this.ids = []
      // this.uploads = []
      // this.$refs.editor.getEditor().txt.clear()
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
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [Upload.name]: Upload,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    wangEditor,
    Message,
    [MessageBox.name]: MessageBox
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/css/variable"
@import "~common/css/mixin"
.content-add-list
  padding-top 48px
  padding-left 18%
  padding-bottom 50px
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
  .desc
    color #409EFF
    font-size 14px
    line-height 18px
    p
      line-height 18px
    span
     display block
</style>

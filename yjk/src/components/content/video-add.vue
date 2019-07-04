<template>
  <div class="video-add">
        <p class="logistics-title"><span>添加视频</span></p>
      <div class="video-content">
      <el-form label-width="100px" class="ruleForm">
      <el-form-item label="视频上传:" required class="videoUpload" v-model="url">
        <div v-if="url"  v-loading="loading">
           <el-button @click.prevent="changeLeft" size="small" class="el-icon-refresh" type="info">旋转</el-button>
           <div>
           <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @statechanged="playerStateChanged($event)"
               >
        </video-player>
        </div>
             <el-button size="small" type="primary" @click="delVideo">删除视频</el-button>
        </div>
        <div v-else>
          <div class="icon-u7781 icon-video"></div>
          <div>
        <input type="file" class="video-upload"
        @change="handleUploadVideo">
       <el-button
       size="small"
       type="primary"
       style="margin-left:200px">上传视频</el-button>
        </div>
        </div>
       <div v-if="percentage !== 100 && percentage !== 0" class="bar" ref="bar">
         <el-progress :percentage="percentage" ref='progressbar'></el-progress>
         <div class="el-icon-close" @click.prevent="cancleUpload"></div>
       </div>
        <div class="img-content">
        <p>说明：</p>
         <p>1.支持MP4、AVI、WMV、RMVB、3GP视频格式</p>
         <p>2.视频文件小于100M</p>
         </div>
  </el-form-item>
  <el-form-item label="封面:"   required style="margin-top:30px">
       <div class="upload-item" v-if="coverUrl">
              <img :src="coverUrl" style="width: 320px; height: 180px">
              <span class="upload-item-close icon-close" @click="handleDelete" ></span>
              <div v-if="upload.progress !== 0 && upload.progress!== 100" >
             <el-progress :percentage="upload.progress" ref='progressbar'></el-progress>
       </div>
       </div>
       <el-button size="small" type="primary" v-else>上传图片</el-button>
       <input type="file" class="list-upload" @change="handleUploadPic" >
       <div class="img-content">
         <p>说明：</p>
         <p>1.图片比例16：9，建议使用621*348像素的图片</p>
         <p>2.图片小于500kb</p>
         <p>3.支持jpg、png、bmg图片格式</p>
         </div>
  </el-form-item>
  <el-form-item label="视频标题:" required>
     <el-input placeholder="标题长度必须5-40个字" v-model="title"
      style="width:30%" :maxlength="40" :minlength="5" size="mini"></el-input>
  </el-form-item>
  <el-form-item required label="视频分类:">
      <el-cascader
              size="mini"
              :options="listSort"
              v-model="categoryids"
              filterable
              style="width:30%"
              change-on-select>
       </el-cascader>
  </el-form-item>
   <el-form-item required label="所属栏目:">
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
  </el-form-item>
   <el-form-item required label="所属专题:" v-if="columnId !== 6">
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
  </el-form-item>
  <el-form-item required label="发布到首页:">
     <el-select v-model="isIndexpage"
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
  </el-form-item>
  <el-form-item label="首页封面:"   required style="margin-top:30px" v-if="isIndexpage">
       <div class="upload-item" v-if="idxpicUrl">
              <img :src="idxpicUrl" style="width: 320px; height: 180px">
              <span class="upload-item-close icon-close" @click="picDelete" ></span>
              <div v-if="upload.progress !== 0 && upload.progress!== 100" >
             <el-progress :percentage="upload.progress" ref='progressbar'></el-progress>
       </div>
       </div>
       <el-button size="small" type="primary" v-else>上传图片</el-button>
       <input type="file" class="list-upload" @change="handlePic" >
       <div class="img-content">
         <p>说明：</p>
         <p>1.建议使用115*115像素的图片</p>
         <p>2.图片小于500kb</p>
         <p>3.支持gif、jpg、jpge、png、bmg图片格式</p>
         </div>
  </el-form-item>
  <el-form-item label="视频简介:"   required style="margin-top:30px" v-if="isIndexpage">
      <el-input type="textarea" placeholder="视频简介最多输入28个字符" maxlength="28" v-model="information" style="width:35%"></el-input>
  </el-form-item>
  <el-form-item label="视频时长">
    <el-input :placeholder='duration' v-model="duration" disabled size="mini" style="width:250px"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleSave()"
    class="save">保存</el-button>
  </el-form-item>
</el-form>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">

import { Select, Option, Button, Input, Message, Form, FormItem, Upload, Progress, Cascader } from 'element-ui'
import { videoUpload } from 'api/video'
import { videoPlayer } from 'vue-video-player'
import { labelSortArr, returnParentId, isNull } from 'common/js/util'
import { ERR_SUCCESS } from 'api/config'
// import { vdcategroyList } from 'api/message'
import { getCategoryList } from 'api/category'
import { getColumnList, saveDiscContent, updateDiscContent, getDiscContentById } from 'api/content'
import { uploadPic } from 'api/upload'

const _isIndexpageOptions = [{
  value: true,
  label: '发布'
}, {
  value: false,
  label: '不发布'
}]
export default {
  name: 'video-add',
  data() {
    return {
      listSort: [],
      roadUrl: [],
      duration: '',
      columnId: '',
      isIndexpage: '',
      idxpicUrl: '',
      isIndexpageOptions: _isIndexpageOptions,
      options: '',
      information: '',
      topicOptions: [], // 专题列表
      topicid: '', // 专题id
      categoryids: [],
      categoryid: '',
      url: '',
      percentage: 0,
      size: '',
      deg: 0,
      loading: false,
      upload: {},
      load: 1,
      i: 0,
      title: '',
      coverUrl: '',
      playerOptions: {
        width: '500px',
        height: '250px',
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        controlBar: {
          fullscreenToggle: false
        },
        sources: [{
          type: 'video/mp4'
        }]
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this._getSortList()
      this._getColumnList()
    })
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    handleUploadVideo(event) {
      const self = this
      const target = event.target
      const file = event.target.files[0]
      const reg = /.(mp4|AVI|WMV|RMVB|3GP)$/g
      const { name, size } = file
      if (name && !reg.test(name)) {
        target.value = ''
        Message.error('请上传视频类型的格式')
        return
      }
      if (size > 104857600) {
        target.value = ''
        Message.error('请上传视频的大小小于50M!')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const vObj = {
          isUpload: false
        }
        videoUpload(file, function(e) {
          if (e) {
            if (e === 1) {
              vObj.isUpload = true
            }
            if (e <= 0.1) {
              self.percentage = parseInt(e * 100)
            } else {
              self.percentage = parseInt(e * 100 - 10)
            }
          } else {
            self.percentage = 0
          }
        }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this.percentage = 100
            this.size = res.data.size
            if (this.load === 2) {
              this.url = ''
              this.load = 1
              this.playerOptions.sources[0].src = ''
            } else {
              this.url = res.data.videoUrl
            }
            this.playerOptions.sources[0].src = this.url
          } else {
            Message.error(res.msg)
          }
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    cancleUpload() {
      this.load = 2
      this.$refs.bar.style = 'display:none'
      this.delVideo()
    },
    handleUploadPic(event) {
      const target = event.target
      const file = target.files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
      // const reg = /.(bmp|jpg|png)$/g
      if (event.target.files.length > 1) {
        target.value = ''
        Message.error('图片上传不能超过一张')
        return
      }
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
      reader.onload = e => {
        const url = e.target.result
        this.getImgStyle(url, (width, height) => {
          const obj = {
            name,
            file,
            isUpload: false,
            width: width + 'px',
            height: height + 'px',
            progress: 0
          }
          Object.assign(this.upload, obj)
          uploadPic(file, function(e) {
            if (e === 1) {
              obj.isUpload = true
            }
            obj.progress = e * 100
          }).then(res => {
            this.coverUrl = res.data.picUrl
          })
        })
        target.value = ''
      }
      reader.readAsDataURL(file)
    },
    handlePic(event) {
      const target = event.target
      const file = target.files[0]
      const { name, size } = file
      const reg = /.(pcx|emf|gif|bmp|tga|jpg|tif|jpeg|png|rle)$/g
      // const reg = /.(bmp|jpg|png)$/g
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
      reader.onload = e => {
        const url = e.target.result
        this.getImgStyle(url, (width, height) => {
          const obj = {
            name,
            file,
            isUpload: false,
            width: width + 'px',
            height: height + 'px',
            progress: 0
          }
          Object.assign(this.upload, obj)
          uploadPic(file, function(e) {
            if (e === 1) {
              obj.isUpload = true
            }
            obj.progress = e * 100
          }).then(res => {
            this.idxpicUrl = res.data.picUrl
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
      this.coverUrl = ''
    },
    picDelete() {
      this.idxpicUrl = ''
    },
    _getSortList() {
      getCategoryList({ type: 2 }).then(res => {
        if (res.code === ERR_SUCCESS) {
          const dataArr = res.data
          console.log(dataArr)
          this.listSort = labelSortArr(dataArr)
        } else {
          Message.error(res.msg)
        }
      })
    },
    handleSave() {
      if (this.loading) return
      const { title, categoryids, url, coverUrl, size, duration, columnId, topicid, isIndexpage, idxpicUrl, information } = this
      let columnid = ''
      if (topicid) {
        columnid = topicid
      } else {
        columnid = 6
      }
      const categoryid = categoryids[categoryids.length - 1]
      if (isNull(url)) {
        return Message.error('请上传视频！')
      }
      if (isNull(coverUrl)) {
        return Message.error('请上传图片！')
      }
      if (isNull(title)) {
        return Message.error('请输入标题！')
      } else if (title.length > 40 || title.length < 5) {
        return Message.error('标题的长度为5-40个字！')
      }
      if (isNull(categoryid)) {
        return Message.error('请选择分类！')
      }
      if (isNull(columnId)) {
        return Message.error('请栏目专题！')
      }
      if (columnId === 1 && isNull(topicid)) {
        return Message.error('请选择专题！')
      }
      if (isIndexpage && !idxpicUrl) {
        return Message.error('请上传首页封面！')
      }
      if (isIndexpage && !information) {
        return Message.error('请填写视频简介！')
      }
      if (!this.isEdit) {
        saveDiscContent({ title, categoryid, contentUrl: url, urls: coverUrl, size, duration, columnid, contentType: 2, isIndexpage, information, idxpicUrl }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message({
              message: '保存成功！',
              type: 'success'
            })
            this.$router.replace({ path: '/content/released' })
            this.loading = false
          } else {
            Message.error(res.msg)
          }
        }).catch(erro => {})
      } else {
        const { id } = this.$route.query
        updateDiscContent({ title, categoryid, contentUrl: url, size, urls: coverUrl, id, duration, columnid, contentType: 2, isIndexpage, information, idxpicUrl }).then(res => {
          if (res.code === ERR_SUCCESS) {
            Message({
              message: '修改成功!',
              type: 'success'
            })
            this.$router.push('/content/released')
          } else {
            Message.error(res.msg)
          }
        }).catch(erro => {})
      }
    },
    getTopic() {
      if (this.columnId) {
        getColumnList({ id: this.columnId }).then(res => {
          if (res.code === ERR_SUCCESS) {
            this.topicOptions = res.data
            console.log(res.data)
          }
        })
      } else {
        this.topicOptions = []
      }
    },
    clearTopic() {
      this.topicid = ''
    },
    _getColumnList() {
      getColumnList().then(res => {
        if (res.code === ERR_SUCCESS) {
          this.options = res.data
        }
      })
    },
    onPlayerLoadeddata(player) {
      if (!player) {
        this.loading = true
      }
      const dur = player.controlBar.durationDisplay.formattedTime_
      if (dur.length <= 4) {
        this.duration = '0' + dur
      } else {
        this.duration = dur
      }
      this.loading = false
    },
    delVideo() {
      this.url = ''
    },
    handleChange() {
    },
    changeDirection(rotate) {
      const ele = document.getElementsByClassName('vjs-tech')[0]
      ele.style.transform = 'rotate(' + rotate + 'deg' + ')'
    },
    changeLeft() {
      this.i++
      this.deg = 90 * (this.i)
      this.changeDirection(this.deg)
    },
    init() {
      const { id, e } = this.$route.query
      if (e === 1) {
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
            this.title = data.title
            this.url = data.contentUrl
            this.size = data.size
            this.columnId = data.columnid
            this.coverUrl = data.picUrlList[0]
            this.duration = data.duration
            this.playerOptions.sources[0].src = this.url
            this.upload.progress = 100
            this.categoryid = data.categoryid
            this.isIndexpage = data.isIndexpage
            this.idxpicUrl = data.idxpicUrl
            this.information = data.information
            if (this.columnId) {
              getColumnList({ id: this.columnId }).then(res => {
                if (res.code === ERR_SUCCESS) {
                  this.topicOptions = res.data
                }
              })
            }
            this.topicid = data.dissertationid
            getCategoryList().then(res => {
              if (res.code === ERR_SUCCESS) {
                this.roadUrl = res.data
                const { roadUrl, categoryid } = this
                const newIds = returnParentId(categoryid, roadUrl)
                newIds.unshift(0)
                this.categoryids = newIds
              }
            })
          }
        })
      }
    }
  },
  components: {
    [Progress.name]: Progress,
    [Button.name]: Button,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Upload.name]: Upload,
    [Cascader.name]: Cascader,
    Message,
    videoPlayer
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/css/variable';
@import '~common/css/mixin';
@import '~common/css/elementCustom';

.video-add
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
  .video-content
    form
      margin 100px 200px
      .icon-u7781
        font-size 80px
      .icon-u7781, .btn
        margin-left 200px
        margin-top -40px
      .btn
        margin-bottom 100px
      .list-upload
        display inline
        height 32px
        width 70px
        margin-left -80px
        opacity 0
      .video-upload
        display inline-inline-block
        position absolute
        width 70px
        margin-top 10px
        margin-left 200px
        opacity 0
      .video-js
        overflow hidden
      .video-js .vjs-big-play-button
       position absolute
       left 45%
       top 45%
       & > .el-cascader .el-input, .el-cascader .el-input__inner
        width 564px
    .img-content
      margin-top 20px
    .el-icon-close
      position absolute
      top 80px
      right 0
    p
      color #ff9933;
      line-height 18px
      font-size 14px
     .save
       margin-left 300px
       margin-top 50px
       width 100px
</style>

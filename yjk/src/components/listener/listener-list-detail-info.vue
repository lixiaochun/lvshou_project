<!-- page name : 解忧师列表详情 -->
<!-- created by : lvhaizhou -->
<!-- created time : 2019-04-23 -->
<template>
  <div class="member-info-wrapper">
    <div class="tag-wrapper" v-show="!fullLoading">
      <tag-table title="入驻资料">
        <el-row>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">姓名：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{(returnData.entryMap && returnData.entryMap.name) ? returnData.entryMap.name : '-'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">性别：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content" v-if="returnData.entryMap && (returnData.entryMap.gender || returnData.entryMap.gender===0)">
              <span v-if="returnData.entryMap.gender===1">男</span>
              <span v-else-if="returnData.entryMap.gender===2">女</span>
              <span v-else>未知</span>
            </div>
            <div class="grid-content bg-white col4 table-content" v-else>-</div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title">出生日期：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">
              {{(returnData.entryMap && returnData.entryMap.birthDate) ? formatBirthDay(returnData.entryMap.birthDate) : '-'}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">联系电话：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{(returnData.entryMap && returnData.entryMap.mobile) ? returnData.entryMap.mobile : '-'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">微信：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content">
              {{(returnData.entryMap && returnData.entryMap.wechat) ? returnData.entryMap.wechat : '-'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title">职业：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">
              {{(returnData.entryMap && returnData.entryMap.career) ? returnData.entryMap.career : '-'}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">教育：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col2 table-content">
              {{(returnData.entryMap && returnData.entryMap.educationLevel) ? returnData.entryMap.educationLevel : '-'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col3 table-col-title">家庭情况：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col4 table-content">
              {{(returnData.entryMap && returnData.entryMap.marriageInfo) ? returnData.entryMap.marriageInfo : '-'}}
            </div>
          </el-col>
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col5 table-col-title"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-white col6 table-content">

            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">个人简介：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-white col2 table-content">
              {{(returnData.entryMap && returnData.entryMap.information) ? returnData.entryMap.information : '-'}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">其他证明：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-white col2 table-content">
              {{(returnData.entryMap && returnData.entryMap.slideshow) ? returnData.entryMap.slideshow : '-'}}
            </div>
          </el-col>
        </el-row>
        <el-row class="row-content id-card">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">身份证：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-white col2 table-content">
              <!-- 因为高度被图片撑开----此处在图片不存在的时候，给身份证信息加上margin-top: 20px -->
              <div class="idcard-info" v-if="(returnData.entryMap && returnData.entryMap.idFrontUrl) || (returnData.entryMap && returnData.entryMap.idBackUrl)">
                  <span>真实姓名：{{(returnData.entryMap && returnData.entryMap.name) ? returnData.entryMap.name : '-'}}</span>
                  <span>身份证号码：{{(returnData.entryMap && returnData.entryMap.idcardNo) ? returnData.entryMap.idcardNo : '-'}}</span>
              </div>
              <div class="idcard-info" style="margin-top: 20px;" v-else>
                  <span>真实姓名：{{(returnData.entryMap && returnData.entryMap.name) ? returnData.entryMap.name : '-'}}</span>
                  <span>身份证号码：{{(returnData.entryMap && returnData.entryMap.idcardNo) ? returnData.entryMap.idcardNo : '-'}}</span>
              </div>
              <div class="idcard-img">
                    <viewer :images="images" class="imgBox" style="display: inline-block;"
                    v-if="returnData.entryMap && (returnData.entryMap.idFrontUrl || returnData.entryMap.idBackUrl)">
                        <img width="60px;height:120px"
                            :src="returnData.entryMap.idFrontUrl" alt="身份证正面">
                        <img width="60px;height:120px"
                            :src="returnData.entryMap.idBackUrl" alt="身份证反面">
                    </viewer>
                    <span v-else>-</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row class="row-content id-card">
          <el-col :span="2" class="table-col-title">
            <div class="grid-content bg-white col1 table-col-title">银行卡：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-white col2 table-content">
              <div class="bank-info">
                  <span>开户行：-</span>
                  <span>银行卡号：-</span>
              </div>
            </div>
          </el-col>
        </el-row> -->
      </tag-table>
    </div>

    <div class="tag-wrapper" v-show="!fullLoading">
      <tag-table title="账户信息">
        <el-row class="table-row-title">
          <el-col :span="8" class="table-col-title">
            <div class="grid-content bg-white col1">用户ID</div>
          </el-col>
          <el-col :span="8" class="table-col-title">
            <div class="grid-content bg-white col2">手机号码</div>
          </el-col>
          <el-col :span="8" class="table-col-title">
            <div class="grid-content bg-white col3">入驻时间</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content">
          <el-col :span="8">
            <div class="grid-content bg-white col1">
              {{(returnData.entryMap && returnData.entryMap.userid) ? returnData.entryMap.userid : '-'}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-white col2">
              {{(returnData.entryMap && returnData.entryMap.mobile) ? returnData.entryMap.mobile : '-'}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-white col3">
              {{(returnData.entryMap && returnData.entryMap.updateTime) ? returnData.entryMap.updateTime : '-'}}
            </div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <div class="tag-wrapper" v-show="!fullLoading">
      <tag-table title="从业数据">
        <el-row class="table-row-title">
          <el-col :span="8" class="table-col-title">
            <div class="grid-content bg-white col1">已服务人数</div>
          </el-col>
          <el-col :span="8" class="table-col-title">
            <div class="grid-content bg-white col2">粉丝</div>
          </el-col>
          <el-col :span="8" class="table-col-title">
            <div class="grid-content bg-white col3">好评率</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content">
          <el-col :span="8">
            <div class="grid-content bg-white col1">
              {{(returnData.info && returnData.info.serviceNum) ? returnData.info.serviceNum : '-'}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-white col2">
              {{(returnData.info && returnData.info.funs) ? returnData.info.funs : '-'}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-white col3">
              {{(returnData.info && returnData.info.favorRate) ? (returnData.info.favorRate + '%') : '-'}}
            </div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <div class="tag-wrapper" v-show="!fullLoading">
      <tag-table title="服务收费标准">
        <el-row class="table-row-title">
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col1">服务收费标准名称</div>
          </el-col>
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col2">文字服务</div>
          </el-col>
          <el-col :span="5" class="table-col-title">
            <div class="grid-content bg-white col3">语音服务</div>
          </el-col>
          <el-col :span="9" class="table-col-title">
            <div class="grid-content bg-white col4">套餐服务</div>
          </el-col>
        </el-row>
        <el-row class="table-row-content service-fee-standard">
          <el-col :span="5">
            <div class="grid-content bg-white col1">{{serviceFeeStandard.name}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-white col2">{{serviceFeeStandard.textService}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-white col3">{{serviceFeeStandard.voiceService}}</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-white col4" style="overflow-y: scroll;">{{serviceFeeStandard.packageService}}</div>
          </el-col>
        </el-row>
      </tag-table>
    </div>

    <div class="tag-wrapper personal-data" v-show="!fullLoading">
      <tag-table title="个人主页资料">
          <div class="wrap">
              <div class="title">头像：</div>
              <div class="content">
                    <viewer :images="images" class="imgBox" v-if="returnData.info && returnData.info.portraitUrl">
                        <img :class="{'active':isChoose}" width="80px;height:80px" :src="returnData.info.portraitUrl" alt="头像">
                    </viewer>
                    <span v-else>-</span>
              </div>
          </div>
          <div class="wrap">
              <div class="title">主页背景：</div>
              <div class="content">
                    <viewer :images="images" class="imgBox" v-if="returnData.info && returnData.info.bgiUrls">
                        <!-- <img :class="{'active':isChoose}" width="200px;height:200px" :src="returnData.info.bgiUrl" alt="主页背景"> -->
                        <img :class="{'active':isChoose}" width="200px;height:200px"
                          v-for="(item,index) in returnData.info.bgiUrls"
                          :key="index"
                          :src="item"
                          alt="主页背景">
                    </viewer>
                    <span v-else>-</span>
              </div>
          </div>
          <div class="wrap">
              <div class="title">昵称：</div>
              <div class="content">
                    {{(returnData.info && returnData.info.nickname) ? returnData.info.nickname : '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title">性别：</div>
              <div class="content">
                    {{(returnData.info && returnData.info.sex) ? formatSex(returnData.info.sex) : '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title">年龄：</div>
              <div class="content">
                    {{(returnData.info && returnData.info.age) ? returnData.info.age : '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title">城市：</div>
              <div class="content">
                    {{(returnData.info && returnData.info.city) ? returnData.info.city : '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title voice">语音介绍：</div>
              <div class="content">
                    <div class="voice-introduced"
                    @click="audioStartAndEndHandler"
                    v-if="returnData.info && returnData.info.voiceIntro">
                        <i class="fa fa-microphone"></i>
                        <span v-if="!audioRunning">{{duration}}s</span>
                        <div v-else class="box">
                            <div class="wifi-symbol">
                                <div class="wifi-circle first"></div>
                                <div class="wifi-circle second"></div>
                                <div class="wifi-circle third"></div>
                            </div>
                        </div>
                    </div>
                    <span v-else>-</span>
                    <audio ref="audio"
                    v-if="returnData.info && returnData.info.voiceIntro"
                    @canplay="getAudioDuration"
                    @timeupdate="audioUpdateTime" preload controls hidden>
                      <!-- <source src="../../static/audio/song.ogg"> -->
                      <source :src="returnData.info.voiceIntro">
                    </audio>
              </div>
          </div>
          <div class="wrap">
              <div class="title">签名：</div>
              <div class="content">
                    {{(returnData.info && returnData.info.signature) ? returnData.info.signature : '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title">标签展示：</div>
              <div class="content">
                    <el-tag style="text-indent: 0; margin-right: 5px;" v-for="(item,index) in tagList" :key="index">{{item}}</el-tag>
              </div>
          </div>
          <div class="wrap">
              <div class="title">个人简介：</div>
              <div class="content">
                <p style="text-indent: 0; width: 600px; margin-left: 30px;">
                  {{(returnData.info && returnData.info.information) ? returnData.info.information : '-'}}
                </p>
              </div>
          </div>
      </tag-table>
    </div>

    <div
        style="height: 600px;"
        v-show="fullLoading"
        v-loading="fullLoading"
        element-loading-text="拼命加载中">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import {
  Button, Table, TableColumn, Switch, Row, Col, Popover, Tag, Loading, Message
} from 'element-ui'
import tagTable from 'base/tag-table/tag-table'
import 'font-awesome/css/font-awesome.min.css'
import { ERR_SUCCESS } from 'api/config'
import { getMediaChatterById } from 'api/listener'
import Audio from '@/common/components/audio/audio.vue'
// import { genderFormat, formatCurrency, isNull } from 'common/js/util'

export default {
  props: ['listenerId', 'queryObj'],
  data() {
    return {
      images: [],
      tagList: [],
      isChoose: false,
      fullLoading: false,
      custom: {},
      statistics: [],
      addressList: [],
      tableData: [
        {
          name: '张大年',
          region: '广东省 广州市 天河区',
          address: '中山大道999号 A大楼 401',
          phone: '13588660009',
          switch: true
        }, {
          name: '张三仙',
          region: '广东省 广州市 天河区',
          address: '中山大道999号 A大楼 401',
          phone: '13588660009',
          switch: false
        }, {
          name: '张三丰',
          region: '广东省 广州市 天河区',
          address: '中山大道999号 A大楼 401',
          phone: '13588660009',
          switch: false
        }
      ],
      switchVal: true,
      serviceFeeStandard: { // 服务收费标准
        name: '',
        textService: `单价：1.00元/分钟\n最低服务时长：15分钟\n起步价：15.00元\n有效期：15天`,
        voiceService: `单价：1.00元/分钟\n最低服务时长：15分钟\n起步价：15.00元\n有效期：15天`,
        packageService: `220分钟通话套餐 / 220分钟 / 220.00元 / 有效期：15天\n380分钟通话套餐 / 380分钟 / 360.00元 / 有效期：1个月\n780分钟通话套餐 / 780分钟 / 700.00元 / 有效期：2个月\n爱情解析 / 90分钟 / 200.00元 / 有效期：有效期：6个月\n婚姻挽回 / 600分钟 / 1200.00元 / 有效期：有效期：8个月`
      },
      audioRunning: false, // 音频是否正在播放
      duration: 0, // 音频长度（秒）
      audioCurrentTime: 0, // 当前播放时间
      returnData: {} // 后台返回数据
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  methods: {
    init(){
      const that = this
      that.fullLoading = true
      getMediaChatterById(that.listenerId).then(res => {
          if (res.code === ERR_SUCCESS) {
            that.returnData = res.data
            // 服务收费标准
            const service = that.returnData.serviceMap
            that.serviceFeeStandard.name = service.serviceName || ''
            if (service.wordService){
              that.serviceFeeStandard.textService = `单价：` + service.wordService.price + `元/分钟\n最低服务时长：` + service.wordService.duration +
                                                    `分钟\n起步价：` + service.wordService.startPrice + `元\n有效期：` + service.wordService.validDate
            } else {
              that.serviceFeeStandard.textService = ''
            }
            if (service.wordService){
              that.serviceFeeStandard.voiceService = `单价：` + service.voiceService.price + `元/分钟\n最低服务时长：` + service.voiceService.duration +
                                                    `分钟\n起步价：` + service.voiceService.startPrice + `元\n有效期：` + service.voiceService.validDate
            } else {
              that.serviceFeeStandard.voiceService = ''
            }
            if (service.mealService){
              that.serviceFeeStandard.packageService = ``
              for (let i = 0; i < service.mealService.length; i++){
                that.serviceFeeStandard.packageService += service.mealService[i].name + `分钟通话套餐 / ` + service.mealService[i].duration +
                                                          `分钟 / ` + service.mealService[i].startPrice + `元 / 有效期：` +
                                                          service.mealService[i].validDate + `\n`
              }
            } else {
              that.serviceFeeStandard.packageService = ''
            }
            // 处理标签list
            if (that.returnData.info.tags){
              that.tagList = that.returnData.info.tags.split(',')
            }
          } else {
            Message.error(res.msg)
          }
          that.fullLoading = false
        }).catch((err) => {
          Message.error(err.msg)
          that.fullLoading = false
        })
    },
    // 控制音频播放和暂停
    audioStartAndEndHandler(){
      if (!this.$refs.audio) return
      const audioSrc = this.$refs.audio.currentSrc // 获取此音频的src
      const arr = audioSrc.split('.')
      const fileType = arr[arr.length - 1]
      if (this.$refs.audio.canPlayType('audio/' + fileType) === '') {
        console.log('当前浏览器不支持.' + fileType + '类型的文件播放')
        return
      }
      if (this.$refs.audio.paused){
        this.$refs.audio.play()
        this.audioRunning = true
      } else {
        this.$refs.audio.pause()
        this.$refs.audio.load()
        this.audioRunning = false
      }
    },
    // 获取播放总时长
    getAudioDuration(){
      this.duration = parseInt(this.$refs.audio.duration)
    },
    // 获取当前播放时间
    audioUpdateTime(e){
      this.audioCurrentTime = parseInt(e.target.currentTime)
      if (this.audioCurrentTime >= this.duration){
        this.audioRunning = false
      }
    },
    formatSex(num){ // 处理性别
      switch (num){
        case 1:{
          return '男'
        }
        case 2:{
          return '女'
        }
        default:{
          return '未知'
        }
      }
    },
    formatBirthDay(date){ // 出生日期只拿日期,默认date类型为 xxxx-xx-xx xx:xx:xx，此处不做过多参数判断
      return date.split(' ')[0]
    }
  },
  watch: {
    // duration(val){
    //   if (val > 0){
    //     this.fullLoading = false
    //   }
    // }
  },
  mounted(){
    console.log(this.duration)
  },
  created(){
    this.init()
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Switch.name]: Switch,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popover.name]: Popover,
    [Tag.name]: Tag,
    [Loading.name]: Loading,
    [Message.name]: Message,
    tagTable,
    'lv-audio': Audio
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/css/variable';
@import '~common/css/mixin';

.member-info-wrapper {
  position: relative;
  width: 100%;
  font-size: 0;
  inline-block-top();

  .title {
    height: 60px;
    line-height: 60px;
    background: #f2f2f2;

    span {
      position: relative;
      margin-left: 8px;
      padding-left: 10px;
      color: #666;
      font-size: 16px;

      &:before {
        position: absolute;
        top: 2px;
        left: -2px;
        content: '';
        width: 2px;
        display: inline-block;
        height: 14px;
        background: #00bafa;
      }
    }
  }

  .member-custom {
    margin: 0 20px;
  }

  .custom-info {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }

  .custom-form {
    margin-left: 200px;
    border-left: 1px solid #dcdcdc;
    border-top: 1px solid #dcdcdc;
  }

  .custom-form-item {
    width: 33.2%;
    border-right: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    color: $color-text;
    box-sizing: border-box;
    inline-block-top();

    .label, .text {
      height: 40px;
      line-height: 40px;
      font-size: $font-size-sm;
    }

    .label {
      float: left;
      padding-right: 10px;
      width: 80px;
      text-align: right;
      border-right: 1px solid #dcdcdc;
      inline-block-top();
    }

    .text {
      display: block;
      margin-left: 100px;
      no-wrap();
    }
  }

  .custom-info-sculpture {
    position: relative;
    margin: 0 auto;
    width: 80px;
    height: 80px;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .custom-info-vip {
    position: absolute;
    top: 3%;
    right: 40px;
    color: #FF6347;
    font-size: $font-size-sm;
    font-weight: 500;
    text-align: center;
    z-index: 10;

    img {
      width: 95px;
      height: 95px;
    }
  }

  .custom-info-text {
    display: block;
    line-height: 16px;
    color: $color-text;
    font-size: $font-size-sm;
    text-align: center;
  }
}

.tag-wrapper {
    margin: 0 15px 35px;
    .wrap{
        overflow: hidden;
        margin-bottom: 20px;
        font-size: 14px;
        >div{
            display: inline-block;
            float: left;
        }
        .title{
            width: 80px;
            height: 20px;
            line-height: 20px;
            font-weight: bold;
            background-color: #fff;
            text-align: right;
        }
        .content{
            min-height: 20px;
            line-height: 20px;
            width: calc(100% - 80px);
            text-indent: 30px;
            img{
                cursor: zoom-in;
                cursor: -webkit-zoom-in;
                cursor: -moz-zoom-in;
                float: left;
                width: 200px;
                height: 200px;
                margin-right: 5px;
                margin-bottom: 5px;
            }
            .voice-introduced{
                width: 105px;
                height: 30px
                margin-left: 25px;
                border: 1px solid #d7d7d7;
                border-radius: 10px;
                cursor: pointer;
                transition: all .5s;
                -webkit-transition: all .5s;
                -o-transition: all .5s;
                -moz-transition: all .5s;
                i{
                    font-size: 20px;
                    line-height: 32px;
                    margin-left: -20px;
                    float: left;
                }
                span{
                    height: 30px;
                    line-height: 30px;
                    display: inline-block;
                    float: left;
                    text-indent: 10px;
                }
            }
            .voice-introduced:hover{
                background: #ebe5e5;
            }
        }
        .voice{
            height: 32px;
            line-height: 32px;
        }
    }
}

.personal-data{
    margin-bottom: 150px;
}

.statistics-text {
  display: block;
  margin: 10px 0;
  font-size: $font-size-mg;
  font-weight: 500;

  &.blue {
    color: #3388FF;
  }

  &.orange {
    color: #FF6633;
  }

  &.greed {
    color: #1ABC9C;
  }
}

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
  &.row-title{
    .el-col{
      .grid-content{
        min-height: 105px;
        line-height: 105px;
      }
    }
  }
  &.row-content{
    .el-col{
      .grid-content{
        border-top: none;
      }
    }
  }
  &.table-row-title{
    .el-col{
      .grid-content{
        text-align: center;
      }
    }
  }
  &.table-row-content{
    .el-col{
      .grid-content{
        text-align: center;
        min-height: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 16px;
        border-top: none;
      }
      .blue{
        color: #38f;
        font-weight: bold;
        font-size: 20px;
      }
      .orange{
        color: #f63;
        font-weight: bold;
        font-size: 20px;
      }
      .green{
        color: #1abc9c;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
  &.five-share{
    .el-col{
      width: 20%;
    }
  }
  .table-col-title{
    .grid-content{
      background-color: #f2f2f2;
    }
  }
  .el-col {
    .grid-content {
      min-height: 40px;
      border: 1px solid #dcdcdc;
      border-radius: 0;
      font-size: 14px;
      line-height: 40px;
    }

    .col2, .col3, .col4, .col5, .col6 {
      border-left: none;
    }
    .custom-right,.table-col-title{
      text-align: right;
    }
    .custom-center{
      text-align: center;
    }
    .custom-left,.table-content{
      text-align: left;
    }
    .table-content{
        text-indent: 15px;
    }
  }
}

.el-row&.id-card .el-col{
    .table-col-title{
        height: 80px;
        line-height: 80px;
    }
    .table-content{
        height: 80px;
        >div{
            width: calc(50% - 10px);
            display: inline-block;
        }
        .idcard-info, .bank-info{
            text-indent: 0px;
            span{
                display: block;
                height: 30px;
                line-height: 30px;
            }
        }
        .idcard-info{
            span{
                transform: translateY(-10px);
            }
        }
        .bank-info{
            padding-top: 10px;
        }
        .idcard-img{
            img{
                width: 120px;
                height: 60px;
                margin-right: 30px;
                margin-top: 10px;
                cursor: zoom-in;
                cursor: -webkit-zoom-in;
                cursor: -moz-zoom-in;
            }
        }
    }
}

.el-row{
    &.service-fee-standard{
        .el-col{
            .grid-content{
                height: 160px;
                font-size: 14px;
                line-height: 30px;
                white-space: pre-line;
                text-align: left;
                text-indent: 0;
                padding: 50px 0;
            }
            .col1{
                text-align: center;
                line-height: 160px;
            }
            .col2, .col3{
                line-height: 40px;
            }
        }
    }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.bg-white {
  background: #fff;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<style lang="stylus" rel="stylesheet/stylus">
.el-table{
  .has-gutter{
    th.is-leaf{
      background-color: #f2f2f2;
      color: #333;
    }
  }
}
</style>
<style type="text/css">
/* 音频扩展符图标 */
.box {
    display: block !important;
    float: none !important;
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    position: relative;
    margin: 0;
    margin-left: 86px;
    margin-top: -9px;
}
.wifi-symbol {
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    transform: rotate(135deg);

}
.wifi-circle {
    border: 2px solid #999999;
    border-radius: 50%;
    position: absolute;
}

.first {
    width: 0px;
    height: 0px;
    background: #cccccc;
    top: 45px;
    left: 45px;
}

.second {
    width: 15px;
    height: 15px;
    top: 38px;
    left: 38px;
    animation: fadeInOut 1s infinite 0.2s;
}

.third {
    width: 25px;
    height: 25px;
    top: 32px;
    left: 32px;
    animation: fadeInOut 1s infinite 0.4s;
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>

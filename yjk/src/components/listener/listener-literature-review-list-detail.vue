<!-- page name : 解忧师资料审核详情 -->
<!-- created by : lvhaizhou -->
<!-- created time : 2019-04-25 -->
<template>
    <el-dialog
        class="detail-info-dialog"
        title="审核资料详情"
        width="900px"
        :visible.sync="visible"
        :before-close="modalClose"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="拼命加载中"
        >
        <div v-show="!loading" class="dialog-content" style="border-bottom: 1px solid #d7d7d7;">
            <div class="wrap">
                <div class="title">用户ID：</div>
                <div class="content">{{userid || '-'}}</div>
            </div>
            <div class="wrap">
                <div class="title">用户账号：</div>
                <div class="content">{{returnData.account || '-'}}</div>
            </div>
            <div class="wrap">
                <div class="title">姓名：</div>
                <div class="content">{{name || '-'}}</div>
            </div>
            <div class="wrap">
                <div class="title">手机号码：</div>
                <div class="content">{{mobile || '-'}}</div>
            </div>
        </div>
        <div v-show="!loading" class="dialog-content" style="margin-top: 20px;">
            <div class="wrap">
                <div class="title" style="font-size: 18px; border-weight: bold;">审核资料</div>
            </div>
            <div class="wrap">
                <div class="title">头像：</div>
                <div class="content">
                    <viewer v-if="returnData.portraitUrl" :images="images" class="imgBox" style="display: inline-block;">
                        <img width="80px;height:80px" :src="returnData.portraitUrl" alt="头像">
                    </viewer>
                    <span v-else>-</span>
                </div>
            </div>
            <div class="wrap">
                <div class="title">主页背景：</div>
                <div class="content" style="width: calc(100% - 100px);">
                    <viewer v-if="returnData.bgiUrl" :images="images" class="imgBox" style="display: inline-block;">
                        <img width="200px;height:200px"  v-for="(item,index) in bgiUrlList" :key="index" :src="item" alt="主页背景">
                    </viewer>
                    <span v-else>-</span>
                </div>
            </div>
            <div class="wrap">
              <div class="title">昵称：</div>
              <div class="content">
                    {{returnData.nickname || '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title">性别：</div>
              <div class="content">
                    <span v-if="returnData.sex === 1">女</span>
                    <span v-else-if="returnData.sex === 2">男</span>
                    <span v-else>未知</span>
              </div>
          </div>
          <div class="wrap">
              <div class="title">年龄：</div>
              <div class="content">
                    {{returnData.age || '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title">城市：</div>
              <div class="content">
                    {{returnData.city || '-'}}
              </div>
          </div>
          <div class="wrap" style="height: 45px;">
              <div class="title voice">语音介绍：</div>
              <div class="content">
                    <div v-if="returnData.voiceIntro" class="voice-introduced" @click="audioStartAndEndHandler" style="margin-left: 0;">
                        <i class="fa fa-microphone" style="margin-left: -5px;"></i>
                        <span v-if="!audioRunning">{{duration}}s</span>
                        <div v-else class="box">
                            <div class="wifi-symbol">
                                <div class="wifi-circle first"></div>
                                <div class="wifi-circle second"></div>
                                <div class="wifi-circle third"></div>
                            </div>
                        </div>
                    </div>
                    <audio v-if="returnData.voiceIntro" ref="audio" @canplay="getAudioDuration" @timeupdate="audioUpdateTime" preload controls hidden>
                      <source :src="returnData.voiceIntro">
                    </audio>
                    <span v-else>-</span>
              </div>
          </div>
          <div class="wrap">
              <div class="title">签名：</div>
              <div class="content">
                    {{returnData.signature || '-'}}
              </div>
          </div>
          <div class="wrap">
              <div class="title" style="height: 32px;line-height: 32px;">标签展示：</div>
              <div class="content" style="height: 32px;line-height: 32px;">
                    <el-tag style="text-indent: 0; margin-right: 5px;"
                        v-for="(item, index ) in tagsList"
                        :key="index"
                    >{{item}}</el-tag>
                    <!-- <el-tag style="text-indent: 0;">女性心理</el-tag>
                    <el-tag style="text-indent: 0;">难言之隐</el-tag> -->
              </div>
          </div>
          <div class="wrap">
              <div class="title">个人简介：</div>
              <div class="content">
                <p style="text-indent: 0; width: 500px; margin-left: 10px;line-height: 20px;">
                  {{returnData.information || '-'}}
                </p>
              </div>
          </div>
        </div>
        <div v-show="loading" class="dialog-content" style="height: 498px;"
            v-loading="loading"
            element-loading-text="拼命加载中"
        ></div>
        <span v-show="!loading" slot="footer" class="dialog-footer">
            <el-button v-if="approveResult===0" type="primary" @click="nopassDialog = true">不通过</el-button>
            <el-button v-if="approveResult===0" type="primary" @click="passDialog = true">通&nbsp;&nbsp;过</el-button>
            <div v-else class="approve-result">
                <span v-if="approveResult===1" style="color: #67C23A;">审核通过</span>
                <span v-else style="color: #F56C6C;">未通过</span>
            </div>
            <!-- <el-button type="primary" @click="nopassDialog = true">不通过</el-button>
            <el-button type="primary" @click="passDialog = true">通&nbsp;&nbsp;过</el-button> -->
        </span>
        <el-dialog
            class="pass-dialog"
            title="审核通过"
            append-to-body
            :visible.sync="passDialog"
            width="400px"
            :before-close="passDialogClose">
            <span>点击确认后个人资料审核通过并更新到APP个人主页资料</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="passDialog = false">取 消</el-button>
                <el-button type="primary" @click="passDialogSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            class="nopass-dialog"
            title="不通过理由"
            append-to-body
            :visible.sync="nopassDialog"
            width="720px"
            :before-close="nopassDialogClose">
            <el-input
                type="textarea"
                :rows="10"
                :placeholder="noPassPlaceholder"
                v-model="noPassReason">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="nopassDialog = false">取 消</el-button>
                <el-button type="primary" @click="nopassDialogSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </el-dialog>
</template>

<script>
import {
  Button, Input, Dialog, Popover, Message, Tag
} from 'element-ui'
import { getMediaChatterAuditById, updateMediaChatterAudit } from 'api/listener'
import { ERR_SUCCESS } from 'api/config'
import 'font-awesome/css/font-awesome.min.css'
export default {
    data (){
        return {
            images: [],
            loading: false,
            fullscreenLoading: false,
            tagsList: [], // 标签list
            bgiUrlList: [], // 背景list
            passDialog: false, // 审核通过，确认模态框
            nopassDialog: false, // 审核不通过，理由模态框
            isApproved: false, // 是否已审核
            approveResult: '', // 审核结果
            noPassPlaceholder: '', // 审核不通过理由的placeholder
            noPassReason: '', // 审核不通过理由
            audioRunning: false, // 音频是否正在播放
            duration: 0, // 音频长度（秒）
            audioCurrentTime: 0, // 当前播放时间
            returnData: {} // 接口返回数据
        }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      id: {
          type: Number
      },
      userid: {
          type: Number
      },
      name: {
      },
      mobile: {
      }
    },
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [Input.name]: Input,
        [Popover.name]: Popover,
        [Tag.name]: Tag
    },
    methods: {
        init(){
            const that = this
            that.loading = true
            getMediaChatterAuditById({ id: this.id }).then(resp => {
                if (resp.code === ERR_SUCCESS) {
                    that.returnData = resp.data
                    if (that.returnData.tags){
                        that.tagsList = that.returnData.tags.split(',')
                    }
                    if (that.returnData.bgiUrl){
                        that.bgiUrlList = that.returnData.bgiUrl.split(',')
                    }
                    that.approveResult = that.returnData.state
                } else {
                    Message.error(resp.msg)
                }
                that.loading = false
            }).catch(error => {
                Message.error(error.msg)
                that.loading = false
            })
        },
        modalClose(){
            this.$emit('update:visible', false)
        },
        passDialogClose(){
            this.passDialog = false
        },
        nopassDialogClose(){
            this.nopassDialog = false
        },
        passDialogSubmit(){ // 审核通过确定按钮操作
            const obj = {
                state: 1
            }
            this._updateMediaChatterAudit(obj)
        },
        nopassDialogSubmit(){ // 审核不通过理由
            if (this.noPassReason === ''){
                Message({
                    showClose: true,
                    message: '理由不能为空',
                    type: 'warning'
                })
                return
            }
            const obj = {
                state: -1,
                content: this.noPassReason
            }
            this._updateMediaChatterAudit(obj)
        },
        _updateMediaChatterAudit(obj){ // 审核解忧师资料
            const that = this
            const listenerInfo = Object.assign({}, obj)
            listenerInfo.id = that.id
            listenerInfo.userid = that.userid
            that.fullscreenLoading = true
            updateMediaChatterAudit(listenerInfo).then(resp => {
                if (resp.code === ERR_SUCCESS) {
                    Message.success('审核完成')
                    that.nopassDialog = false
                    that.$emit('update:visible', false)
                    that.$emit('reloadPageData')
                } else {
                    Message.error(resp.msg)
                }
                that.fullscreenLoading = false
            }).catch(err => {
                Message.error(err.msg)
                that.fullscreenLoading = false
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
            var duration = parseInt(this.$refs.audio.duration)
            if (duration > 30){
                this.duration = 30
            } else {
                this.duration = duration
            }
        },
        // 获取当前播放时间
        audioUpdateTime(e){
            this.audioCurrentTime = parseInt(e.target.currentTime)
            if (this.audioCurrentTime >= this.duration){
                this.audioRunning = false
            }
            if (this.audioCurrentTime >= 30){
                this.$refs.audio.pause()
                this.$refs.audio.load()
                this.audioRunning = false
            }
        }
    },
    created (){
        this.noPassPlaceholder = '请填写审核资料不通过的理由，将以通知消息的形式告知顾问，参考案例如下：\n1.上传头像不符合规范\n2.个人主页背景图片模糊\n3.解忧师昵称填写太长\n4.签名不够吸引人\n......'
        this.init()
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 模态框的footer居中，header加上border-bottom
.detail-info-dialog, .pass-dialog, .nopass-dialog{
  .el-dialog{
    >div:nth-of-type(1){
        border-bottom: 1px dotted #d7d7d7;
        margin: 0 20px;
        padding-left: 10px;
    }
    >div:nth-of-type(3){
        text-align: center;
    }
  }
}
.dialog-content{
    >.wrap{
        margin-bottom: 20px;
        font-size: 12px;
        >.title{
            display: inline-block;
            min-width: 85px;
            text-align: right;
            vertical-align: top;
            color: #333;
            font-weight: bold;
        }
        >.content{
            display: inline-block;
            color: #000;
            text-indent: 1em;
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
        img{
            width: 120px;
            height: 80px;
            margin-right: 30px;
            cursor: zoom-in;
            cursor: -webkit-zoom-in;
            cursor: -moz-zoom-in;
        }
    }
}
.pass-dialog>.el-dialog{
    >div:nth-of-type(2){
        font-size: 14px;
        line-height: 28px;
        width: 66%;
        margin: 0 auto;
        text-align: center;
    }
}
// 审批结果
.approve-result{
    height: 40px;
    font-size: 30px;
    line-height: 40px;
    letter-spacing: 10px;
    color: #67C23A;
}
.detail-info-dialog .el-dialog{
    margin-top: 5vh !important;
}
.dialog-content >.wrap .imgBox>img{
    float: left;
    margin-bottom: 10px;
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

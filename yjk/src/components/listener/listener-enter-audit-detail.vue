<!-- page name : 解忧师入驻资料审核详情 -->
<!-- created by : lvhaizhou -->
<!-- created time : 2019-04-22 -->
<template>
    <el-dialog
        class="detail-info-dialog"
        title="详情"
        width="900px"
        :visible.sync="visible"
        :before-close="modalClose"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="拼命加载中"
        >
        <div class="dialog-content" v-show="!loading">
            <div class="wrap">
                <div class="title">用户ID：</div>
                <div class="content">{{returnData.userid || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">身份证照片：</div>
                <div class="content">
                    <viewer :images="images" class="imgBox" style="display: inline-block;" v-if="returnData.idFrontUrl || returnData.idBackUrl">
                        <img width="80px;height:130px" :src="returnData.idFrontUrl" alt="身份证正面">
                        <img width="80px;height:130px" :src="returnData.idBackUrl" alt="身份证反面">
                    </viewer>
                    <span v-else>-</span>
                </div>
            </div>
            <div class="wrap">
                <div class="title">真实姓名：</div>
                <div class="content">{{returnData.name || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">身份证号：</div>
                <div class="content">{{returnData.idcardNo || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">性别：</div>
                <div class="content">{{formatSex(returnData.gender) || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">出生日期：</div>
                <div class="content">{{formatBirthDate(returnData.birthDate) || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">手机号：</div>
                <div class="content">{{returnData.mobile || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">微信：</div>
                <div class="content">{{returnData.wechat || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">籍贯：</div>
                <div class="content">{{returnData.nativePlace || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">职业：</div>
                <div class="content">{{returnData.career || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">家庭状况：</div>
                <div class="content">{{returnData.marriageInfo || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">教育水平：</div>
                <div class="content">{{returnData.educationLevel || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">个人简介：</div>
                <div class="content" style="max-width: 600px;letter-spacing: 1px;line-height: 14px;margin-left: 15px;">{{returnData.information || "-"}}</div>
            </div>
            <div class="wrap">
                <div class="title">其他证明：</div>
                <div class="content">
                    <viewer :images="images" class="imgBox" style="display: inline-block;" v-if="otherSupport.length > 0">
                        <img width="120px;height:120px"
                            alt="其他证明"
                            :key="index"
                            v-for="(item, index) in otherSupport"
                            :src="item">
                    </viewer>
                    <span v-else>-</span>
                </div>
            </div>
        </div>
        <div class="dialog-content" style="height: 498px;"
            v-show="loading"
            v-loading="loading"
            element-loading-text="拼命加载中"
        ></div>
        <span slot="footer" class="dialog-footer" v-show="!loading">
            <el-button v-if="returnData.state === 0" type="primary" @click="nopassDialog = true">不通过</el-button>
            <el-button v-if="returnData.state === 0" type="primary" @click="passDialog = true">通&nbsp;&nbsp;过</el-button>
            <div v-if="returnData.state !== 0" class="approve-result">
                <span v-if="returnData.state === 1" style="color: #67C23A;">审核通过</span>
                <span v-else style="color: #F56C6C;">未通过</span>
            </div>
            <!-- 测试审核使用 -->
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
            <span>点击确认后该用户【入驻资料】审核通过并发送【审核通过】通知给用户</span>
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
  Button, Input, Dialog, Popover, Message
} from 'element-ui'
import { getMcApplyInfoById, updateMcApplyInfo } from 'api/listener'
import { ERR_SUCCESS } from 'api/config'
export default {
    data (){
        return {
            loading: false,
            fullscreenLoading: false,
            images: [],
            passDialog: false, // 审核通过，确认模态框
            nopassDialog: false, // 审核不通过，理由模态框
            isApproved: false, // 是否已审核
            approveResult: '通过', // 审核结果
            noPassPlaceholder: '', // 审核不通过理由的placeholder
            noPassReason: '', // 审核不通过理由
            otherSupport: [], // 其他证明数组
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
      }
    },
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [Input.name]: Input,
        [Popover.name]: Popover
    },
    methods: {
        init(){
            const that = this
            that.loading = true
            getMcApplyInfoById(that.id).then(res => {
                if (res.code === ERR_SUCCESS) {
                    that.returnData = res.data
                    if (res.data.slideshow){
                        that.otherSupport = res.data.slideshow.split(',') || []
                    }
                } else {
                    Message.error(res.msg)
                }
                that.loading = false
            }).catch(err => {
                Message.error(err.msg)
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
            this._updateMcApplyInfo(obj)
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
            this._updateMcApplyInfo(obj)
        },
        _updateMcApplyInfo(obj){ // 审核入驻资料, id/state/content/userid
            const that = this
            obj.id = that.id
            obj.userid = that.userid
            that.fullscreenLoading = true
            updateMcApplyInfo(obj).then(res => {
                if (res.code === ERR_SUCCESS) {
                    Message.success('审核完成')
                    that.nopassDialog = false
                    that.$emit('update:visible', false)
                    that.$emit('reloadPageData')
                } else {
                    Message.error(res.msg)
                }
                that.fullscreenLoading = false
            }).catch(err => {
                Message.error(err.msg)
                that.fullscreenLoading = false
            })
        },
        formatSex(num){ // 处理性别0=未知,1=男,2=女;
            switch (num){
                case 1: return '男'
                case 2: return '女'
                default: return '未知'
            }
        },
        formatBirthDate(str){ // 处理出生日期
            if (str && str !== ''){
                return str.split(' ')[0]
            }
            return str
        }
    },
    created (){
        this.noPassPlaceholder = '请填写审核资料不通过的理由，将以通知消息的形式告知顾问，参考案例如下：\n1.姓名不真实\n2.性别填写错误\n3.微信号查询不到\n4.联系电话有误\n......'
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
</style>

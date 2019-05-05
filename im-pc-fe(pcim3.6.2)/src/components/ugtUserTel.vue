<template>
  <div class="ugtUserTelContainer" v-if="!dialogFormVisible">
    <!-- <div class="bg" @click="hideUgtUserTelContainer"></div>
    <div class="TipBox">
      <p class="tip">该用户尚未注册，无法发送消息，是否拨打电话</p>
      <div class="btnBox clearfix">
        <a href="javascript:;" @click="hideUgtUserTelContainer">否</a>
        <a href="javascript:;" class="yes" @click="showNumBox">是</a>
      </div>
      <div class="telNumber" v-if="showNum">
        <p class="msg">请选择你需要拨打的电话号码</p>
        <ul class="clearfix">
          <li v-for="item in listUgtUserTel" :key="item"><a href="javascript:;" @click="hxsTelephone(item)">{{centerEllipsisPhoneFn(item)}}</a></li>
        </ul>
      </div>
    </div> -->
    <transition name="fade">
      <div class="loading-pcAgent flex flex-align-center flex-pack-center">
        <div class="load-pcAgent-body" v-if="showWarning">
          <div class="load-pcAgent__header">
            <div class="el-message-box__title">
              <!----><span>提示</span>
            </div>
            <div class="el-message-box__content">
              <div class="el-message-box__status el-icon-warning"></div>
              <div class="el-message-box__message">
                <p>该用户尚未注册，无法发送消息，是否拨打电话</p>
              </div>
            </div>
            <div class="el-message-box__btns">
              <button type="button" class="el-button el-button--default el-button--small" @click="hideUgtUserTelContainer">
                <span>
                  取消
                </span>
              </button>
              <button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="showNumBox">
                <span>
                  确定
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="select-tel-body" v-if="showNum">
          <div class="select-tel-box-title">请选择你需要拨打的电话号码</div>
          <el-select v-model="form.region" placeholder="请选择类型" @change="optionChange">
            <el-option label="自动检测" value="0"></el-option>
            <el-option label="拨号加0" value="1"></el-option>
            <el-option label="拨号不加0" value="2"></el-option>
          </el-select>
          <ul class="clearfix">
            <li v-for="(item,index) in listUgtUserTel" :key="index"><a href="javascript:;" @click="hxsTelephone(item)">{{centerEllipsisPhoneFn(item)}}</a></li>
          </ul>
          <div slot="footer" class="dialog-footer">
            <el-button @click="hideUgtUserTelContainer">取 消</el-button>
            <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>
<script>
import commonJs from '@/util/common.js'
export default {
  name: 'ugtUserTelContainer',
  props: {
    ugtUserTelNumber: {
      type: String,
      default: function() {}
    }
  },
  data() {
    return {
      showNum: false,
      listUgtUserTel: null,
      listUgtUserTelLoad: false,
      showWarning: true,
      dialogFormVisible: false,
      hxsUserTelephoneLoad:false,
      form: {
        region: '自动检测',
        value:"0"
      },
      formLabelWidth: '120px',
      userDialingType: null
    }
  },
  mounted() {
    this.hxsTelephoneBox(this.ugtUserTelNumber)
  },
  methods: {
    hideUgtUserTelContainer() {
      this.$parent.ugtUserTelShow = false
    },
    showNumBox() {
      this.showWarning = false
      this.showNum = true
    },
    centerEllipsisPhoneFn(num) {
      return commonJs.centerEllipsisPhone(num)
    },
    optionChange(e){
      console.log(e)
    },
    //获取客户电话
    hxsTelephoneBox(num) {
      if (this.listUgtUserTelLoad) {
        this.$message('请求频繁')
        return
      }

      var _this = this
      var encodePhone = this.encodePhone

      $.getJSON(
        'https://api.hxsapp.com/im/Chat/getCustomerAllPhones',
        {
          //获取用户参数
          encode_phone: num
        },
        function(data) {
          _this.listUgtUserTel = data.data
          _this.listUgtUserTelLoad = false
        }
      )
    },
    //拨打客户电话
    hxsTelephone(tel) {
      if(this.hxsUserTelephoneLoad) return;
      this.hxsUserTelephoneLoad = true;
      var brmId = sessionStorage.getItem('brm_userId')
      if (brmId.indexOf('brm-') != -1) {
        brmId = brmId.substring(4)
      }

      var mobile = tel
      var _this = this
      $.getJSON(
        'https://api.hxsapp.com/account/UserAccount/makeCallByPhone',
        {
          //请求brm的拨打接口
          account: brmId,
          number: mobile,
          numPrefix: _this.userDialingType
        },
        function(data) {
          _this.$alert(data.msg, {
            confirmButtonText: '确定',
            callback: action => {}
          })
          _this.hxsUserTelephoneLoad = false;
        }
      )
    },
    optionChange(value){
      var type = null;
      if(value == '1'){
        type = 2
      }else if(value == '2'){
        type = 1
      }
      this.dialingType = type;
    }
  }
}
</script>
<style scoped lang="less">
.ugtUserTelContainer {
  .loading-pcAgent {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .load-pcAgent-body {
      width: 420px;
      padding-bottom: 10px;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      font-size: 18px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      text-align: left;
      .load-pcAgent__header {
        position: relative;
        padding: 15px;
        padding-bottom: 10px;
        .el-message-box__title {
          padding-left: 0;
          margin-bottom: 0;
          font-size: 16px;
          line-height: 1;
          color: #303133;
        }
      }
      .el-message-box__content {
        position: relative;
        padding: 15px;
        color: #606266;
        font-size: 14px;
      }
      .el-message-box__btns {
        padding: 5px 15px 0;
        text-align: right;
      }
    }
    .select-tel-body {
      width: 400px;
      background: #fff;
      border-radius: 5px;
      padding:10px 15px;
      .select-tel-box-title {
        font-size: 18px;
        font-weight: 500;
        line-height: 44px;
      }
      .dialog-footer {
        margin-top:10px;
        text-align: right;
        .el-button{
          padding: 8px 14px
        }
      }
      .clearfix{
        padding: 10px 0;
      	li{
          height: 30px;
          line-height: 30px;
          font-size: 22px;
          float: left;
          margin-bottom: 10px;
          a{
            height: 30px;
            line-height: 30px;
            color:#333;
            float: left;
            margin-right: 10px;
          }
          a:hover{
            color:#FF668C;
          }
        }
      }
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .TipBox {
    width: 300px;
    position: absolute;
    left: 50%;
    top: 30%;
    margin-left: -150px;
    z-index: 11;
    background: #fff;
    border-radius: 5px;
    padding-bottom: 5px;
    z-index: 9999;
    .tip {
      color: #333;
      padding: 10px 0 5px 0;
      line-height: 22px;
      font-size: 16px;
      text-align: center;
    }
    .btnBox {
      margin-top: 8px;
      padding: 0 40px;
      a {
        border: solid 1px #ccc;
        width: 98px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
        float: left;
        color: #333;
        border-radius: 2px;
      }
      .yes {
        border: solid 1px #ff668c;
        background: #ff668c;
        color: #fff;
        margin-left: 20px;
      }
    }
    .telNumber {
      margin-top: 10px;
      border-top: solid 1px #ccc;
      .msg {
        color: #333;
        padding: 8px 0 5px 0;
        line-height: 22px;
        font-size: 16px;
        text-align: center;
      }
      ul {
        li {
          width: 50%;
          height: 30px;
          font-size: 16px;
          text-align: center;
          float: left;
          a {
            color: #333;
          }
          a:hover {
            color: #ff668c;
          }
        }
      }
    }
  }
}
</style>
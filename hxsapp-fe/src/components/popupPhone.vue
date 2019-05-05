<template>

  <span class="popupDownLoad">
    
    <el-button type="text" @click="dialogTableVisible = true">
      <span>点我输入下单收货的手机号</span></el-button>
    <el-dialog width="75%" :visible.sync="dialogTableVisible">
      <div class="share-down">
        <div class="bg"></div>
        <div class="share-cont">
          <h3 class="title">输入之前提供给顾问
            <h3 class="title">下单的手机号</h3>
          </h3>
          <div class="phoneNumber input-box">
            <input placeholder="请输入手机号码" type="text" v-model="number" v-on:keyup="check_count($event)">
          </div>
          <div class="verCode input-box" >
            <input placeholder="请输入验证码" type="text" v-model="code"  v-bind="{codeInputType}">
            <button v-html="codeMsg" @click="findMsg" :disabled="isDisabled" id="fingmsg"  >{{codeMsg}}</button>
          </div>
          <!-- <div class="cancel" @click="cancelBtn()"></div> -->
          <button class="confirm2" @click="confirmBtn2()">完成</button>
        </div>
      </div>
      
    </el-dialog>

  </span>
</template>

<script>
  //base64的使用
let Base64 = require('js-base64').Base64;
import md5 from 'js-md5';
import axios from "axios";
import commonJs from '@/util/common.js'

export default {
  name: 'popupPhone',
  data() {
    return {
      dialogTableVisible:false,
      number:"",
      code:null,
      codeMsg:"获取验证码",
      codeInputType:true,
      isDisabled:false
    }
  },
  mounted(){
    // var  sign=Base64.encode( md5( ""+"acol$!z%wh" ) );
    // console.log("ssss",sign);
  },
  // 接受父组件的值
  props: {
    popupPhoneType: false
  },
  methods: {
    //获取 url 后的参数值
    getUrl:function(para){
        var paraArr = location.search.substring(1).split('&');
        for(var i = 0;i < paraArr.length;i++){
            if(para == paraArr[i].split('=')[0]){
                return paraArr[i].split('=')[1];
            }
        }
        return '';
    },
    //电话检查
    checkPhone() {
      if (!/^1[34578]\d{9}$/.test(this.phone_num)) {
        alert("格式错误");
        this.phone_num = "";
      } else {
        alert("格式正确");
      }
    },
    check_count:function(event) {
      var value = event.target.value;
      if (!/^\+?[1-9][0-9]*$/.test(value)) {
        //alert('只能正整数');
      //  event.target.value = '';
      }
    },
    //发送电话号码，接受验证码
    findMsg(){
      var that=this
      if(that.number.length != 11){
        that.$message({
                showClose: true,
                message: '请输入正确的手机号码',
                type: 'success'
        });
        return;
      }
      var timestamp =parseInt(  Date.parse(new Date()) )/1000 ;
      //var  sign=that.getUrl("sign");
      var  sign=Base64.encode( md5( timestamp+"acol$!z%wh" ) );

      
      let params={
        mobile:that.number,
        app_name:"hxs",
        smsType:"bindMobile",
        utime:timestamp,
        sign : sign ,
      }

      console.log("msg",params);
      axios.get("https://api.hxsapp.com/account/userAccount/sendSMS", {
            params:  params
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: '已发送',
                type: 'success'
              });
              $("#fingmsg").attr("disabled",true);
              let setTime=60;
              var interval=setInterval(function(){
                  that.codeMsg=setTime+"s";
                  if(setTime==0){
                     clearInterval(interval);
                      $("#fingmsg").attr("disabled",false);
                     that.codeMsg="获取验证码";
                  }
                  setTime--;
              },1000);
            }else{

              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
            }

          });
    },
    cancelBtn() {

      //this.$emit('popupPhoneType', false);
      // this.$parent.hidePopupDownLoadCall && this.$parent.hidePopupDownLoadCall()
    },
    confirmBtn2() {
      var that=this;
      debugger;
      var sess_token=that.getUrl("sess_token");
      
      let params={
        mobile:that.number,
        verifyCode:that.code,
        smsType:"bindMobile",
        sess_token:sess_token

      }
      if(that.code==null){
        this.$message({
                showClose: true,
                message: "验证码为空",
                type: 'success'
              });
      }
      axios.get("https://api.hxsapp.com/account/UserAccount/relateMobile", {
            params: params
          }).then(res => { 
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
              that.dialogTableVisible=false;
             
            }else{
           
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
            }

          }).catch(function (error) {
               this.$message({
                showClose: true,
                message: "验证成功",
                type: 'success'
              });
              that.dialogTableVisible=false;
          });

    }
  }
}
</script>
<style>
    .el-dialog{
      border-radius: 9px !important;
  }
  .popupDownLoad .el-dialog__headerbtn{
    position: absolute;
    top: -12px;
    right: -12px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
    background: rgba(238,238,238,1);
    width: 35px;
    height: 35px;
    line-height: 35px;
    font-size: 22px;
    border-radius: 50%;
    padding-top: 1px;
    padding-left: 1.5px;
    font-weight: 600;
  }
.v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #33333347;
}
  .el-dialog__headerbtn .el-dialog__close {
    color: #adadad;
  margin-left: -3px;
}
  </style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.popupDownLoad {
  * {
    font-size: 12px;
  }
  #fingmsg:hover{
    -moz-transition: all .4s linear 0s;
    -o-transition: all .4s linear 0s;
    -ms-transition: all .4s linear 0s;
    transition: all .4s linear 0s;
    background-color: #169bd5;
    color: white;
    border-width: 0px;
    border-style: solid;
    border-color: #818DCF;
  }
  #fingmsg:active{
    -moz-transition: all .4s linear 0s;
    -o-transition: all .4s linear 0s;
    -ms-transition: all .4s linear 0s;
    transition: all .4s linear 0s;
    background-color: #169bd5;
    color: white;
  }
    span{
     color:#FF6E8D;
     cursor: pointer;
     font-size: 16px;
  }

  .share-down .share-cont span {
    margin-top: 20px;
    display: block;
    width: 100%;
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .share-down input {
    background-color: #ffffff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-width: 0px;
    box-sizing: border-box;
    width: 100%;
    height: 39px;
    padding: 0px 15px;
  }
  .verCode {
    position: relative;
  }
  .verCode input {
    margin-right: 82px;
  }

  .verCode button {
    background-color: #ffffff;
    position: absolute;
    border-width: 1px;
    border-style: solid;
    border-color: #818DCF;
    color: #797979;
    border-radius: 8px;
    width: 82px;
    right: 0px;
    top: -0.2px;
    color: #818DCF;
    height: 30px;
    border-radius: 15px;
  }
  .share-down {
    width: 100%;
    height: 100%;
  }

  .share-down .share-cont .img {
    width: 100%;
    display: block;
    height: auto;
    margin-top: 25px;
  }

  .share-down .share-cont span.tip {
    margin-top: 5px;
    font-size: 14px;
    color: #999;
  }

  .share-down .share-cont .confirm2 {
    width: 80%;
    text-align: center;
    height: 35px;
    line-height: 35px;
    background: inherit;
    border: none;
    border-radius: 8px;
    color: #fff;
    margin: 0px auto;
    margin-top: 15px;
    margin-left: 10%;
    cursor: pointer;
    background: -webkit-gradient(linear, right top, left top, from(#ff6e8d), to(#ff68b0));
    background: linear-gradient(270deg, #ff6e8d 0%, #ff68b0 100%);
    border-radius: 100px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
  }
  .share-down .share-cont .cancel {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    background: url(../assets/img/close@2x.png) left top no-repeat;
    background-size: 100% 100%;
  }
  .share-cont .title {
    margin-bottom: 15px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  }
  .input-box {
    border-bottom: 1px solid rgba(153, 153, 153, 0.23);
    /* overflow: hidden; */
    margin-bottom: 15px;
  }

  input::-webkit-input-placeholder{
        color: #999999;
}
input::-moz-placeholder{ 
        color: #999999;        
}
input:-ms-input-placeholder{ 
        color: #999999;        
}
}
</style>

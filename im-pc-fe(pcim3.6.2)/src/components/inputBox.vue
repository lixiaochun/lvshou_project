<template>
  <div class="bottomBar">
    <div class="icon">
      <span @click.stop="showEmotionBoxFn" class="emotionBtn">
        <div class="emotionsBox" v-if="showEmotionBox">
          <div class="triangle_border_down">
            <i></i>
          </div>
          <div class="emotions">
            <ul v-if="emotionsTypeDeFault">
              <li v-for="(item,index) in emotions" @click="selectEmotions(index)" v-if="index <= 113" :key="index">
                <img :src="item[1]" alt="">
              </li>
            </ul>
            <ul v-if="emotionsTypeFmg">
              <li v-for="(item,index) in emotions" class="customize" @click="selectEmotions(index)" v-if="(index > 113 && index < 300)" :key="index">
                <img :src="item[1]" alt="">
              </li>
            </ul>
            <ul v-if="emotionsTypeRab">
              <li v-for="(item,index) in emotions" class="customize" @click="selectEmotions(index)" v-if="index >= 300 " :key="index">
                <img :src="item[1]" alt="">
              </li>
            </ul>
          </div>
          <div class="switchEmotionList">
            <div :class="{active: emotionsTypeDeFault}" @click="showEmotionsType(0)">
              <em class="default"></em>
            </div>
            <div :class="{active: emotionsTypeFmg}" @click="showEmotionsType(1)">
              <em></em>
            </div>
            <div :class="{active: emotionsTypeRab}" @click="showEmotionsType(2)">
              <em class="rab"></em>
            </div>
          </div>
        </div>
      </span>
      <a href="javascript:;" @click="showSendPictureBox" class="sendPictureBtn">
        <!-- <input type="file" id="upd_pic" value="选择文件" @change="fileOnChange"> -->
      </a>
      <span class="historyIcon" @click="rightShowTabelType"></span>
      <!-- <div class="right telIcon" @click.stop="hxsTelephoneBox" @mouseout="hideListPhone" @mouseover="showListPhone"> -->
      <div class="right telIcon" @click.stop="hxsTelephoneBox">
        <div class="list-phone" v-if="hxsTelephoneBoxShow" @click.stop="">
          <div class="arrow-down"></div>
          <div class="top clearfix"> 
            <p>请选择你需要拨打的电话号码</p>
            <div> 
              <el-select class="no-drag" v-model="value" placeholder="请选择" size="mini" style="width:108px;margin-top:-3px; border-radius:6px;height:18px;line-height:18px; float:right;" @change="optionChange" @mouseover="showListPhone" id="elSelectUi">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <ul class="clearfix">
            <li v-for="(tel,index) in listTelephone">
              <a href="javascript:;" @click.stop="hxsTelephone(tel)">{{centerEllipsisPhoneFn(tel)}}</a>
              <em v-if="hideSoild(index)"></em>
            </li>
          </ul>
        </div>
      </div>
      <!-- 网络电话 -->
      <!-- <span class="right phoneIcon" @click="hxsonlineTelephone" style="margin-right:15px;">
        <img src="../assets/img/icon_netphone.png" alt="">
      </span> -->
      <div class="audioTip" v-if="isTip">
        <p>为了监管需要，网络通话会被录音，是否确定拨出？</p>
        <div class="btn-box">
          <div class="tipBtn btn1" @click="changeTip(false)">取消</div>
          <div class="tipBtn btn2" @click="changeTip(true)">确认</div>
        </div>
      </div>
    </div>
    <div id="uploadPreviewBox">
      <div id="preview" contenteditable="true" class="upload-preview" v-show="previewBox" @input="notChangeTip"></div>
      <textarea v-model.trim="message" v-show="!previewBox"></textarea>
    </div>
    <div class="submit">
      <span @click="submitMessage">发送</span>
    </div>
    <div class="previewPicDivBox" v-if="false">
      <div id="previewPicDiv"></div>
      <!-- <div class="btn">发送图片</div> -->
      <button class="btn" @click="submitImage">上传图片</button>
    </div>
  </div>
</template>
<script>
import commonJs from '@/util/common.js'
export default {
  name: 'inputBox',
  props: {
    recentContactsArr: {
      type: Array,
      default: function() {}
    }
  },
  data() {
    return {
      message: null,
      emotions: null,
      showEmotionBox: false,
      emotionsTypeDeFault: true,
      resendMsging: false,
      emotionsTypeRab: false,
      emotionsTypeFmg: false,
      previewBox: false,
      oldPreviewHTML: null,
      hxsTelephoneBoxShow: false,
      sendInputImg: null,
      listTelephone: null, //当前用户的手机号码数据
      isListTelephoneLoad: false,
      isTip: false,
      listPhoneTimer:null,
      value:'自动检测',
      dialingType:'',//拨打电话类别
      hxsTelephoneLoad: false,
      options: [
        {
          value: '0',
          label: '自动检测'
        },
        {
          value: '1',
          label: '拨号加0'
        },
        {
          value: '2',
          label: '拨号不加0'
        }
      ],
    }
  },
  mounted() {
    this.emotions = webim.Emotions
    this.hideEmotionBoxFn()
    this.quickSubmitMessage()
    this.pasteImg();
    this.elSelectUi();
  },
  methods: {
    rightShowTabelType() {
      //打开聊天窗口
      this.$parent.isHistory = true
    },
    showEmotionsType(type) {
      //打开表情窗口
      if (type == 0) {
        this.emotionsTypeDeFault = true
        this.emotionsTypeFmg = false
        this.emotionsTypeRab = false
      } else if (type == 1) {
        this.emotionsTypeDeFault = false
        this.emotionsTypeFmg = true
        this.emotionsTypeRab = false
      } else if (type == 2) {
        this.emotionsTypeDeFault = false
        this.emotionsTypeFmg = false
        this.emotionsTypeRab = true
      }
    },
    selectEmotions(index, custom) {
      //选择表情
      if (this.sendInputImg) {
        this.$alert('表情与图片不可同时发送', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.resendMsging = false
          }
        })
        return
      }
      this.message = (this.message || '') + this.emotions[index][0]
      $('textarea').focus()
    },
    quickSubmitMessage() {
      //enter发送消息
      var _this = this
      var isLogion = _this.$store.getters.isLoginGetter // 用来判断是否在登录页
      if (!isLogion) return false
      $('.bottomBar').keydown(function(e) {
        var keycode = localStorage.getItem('keyCode') || ''
        if (keycode.length > 4) {
          if (e.ctrlKey && e.keyCode == 13) {
            _this.submitMessage({})
            return false
          }
        } else {
          if (e.keyCode == 13 && !e.ctrlKey) {
            _this.submitMessage({})
            return false
          }
        }
      })
    },
    showEmotionBoxFn() {
      //打开表情框
      this.showEmotionBox = true
    },
    hideEmotionBoxFn() {
      //隐藏表情框
      document.onclick = () => {
        this.showEmotionBox = false
        this.hxsTelephoneBoxShow = false
      }
    },
    showSendPictureBox() {
      //显示发送图片框
      this.$parent.sendPictureBoxShow = true
    },
    submitImage() {
      var _this = this
      var uploadFiles = document.getElementById('upd_pic')
      var file = uploadFiles.files[0]
      var businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG //业务类型，1-发群图片，2-向好友发图片
      // if (selType == SessionType.C2C) {//向好友发图片
      //     businessType = webim.Upload_Pic_Bussiness_Type.C2C_MSG;
      // } else if (selType == SessionType.GROUP) {//发群图片
      //     businessType = webim.Upload_Pic_Bussiness_Type.GROUP_MSG;
      // }
      //封装上传图片请求
      var opt = {
        file: file, //图片对象
        // 'onProgressCallBack': onProgressCallBack, //上传图片进度条回调函数
        //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
        From_Account: loginInfo.identifier, //发送者帐号
        To_Account: _this.$store.getters.sessionIdGetter, //接收者
        businessType: businessType //业务类型
      }
      //上传图片
      webim.uploadPic(
        opt,
        function(resp) {
          //上传成功发送图片
          console.log(resp)
          _this.sendPic(resp, file.name)
        },
        function(err) {
          alert(err.ErrorInfo)
        }
      )
    },
    notChangeTip(ev) {
      var _this = this
      $('#preview').keyup(function(event) {
        if (event.keyCode == '8') {
          if ($('#preview').html().indexOf('class="upload-image"')== -1) {
            _this.previewBox = false
            _this.sendInputImg = null
            // _this.$store.commit('changeSendImg', null)
            _this.oldPreviewHTML = null
            setTimeout(() => {
              $('#uploadPreviewBox textarea').focus()
            }, 200)
          }
        } else {
          if (_this.oldPreviewHTML && event.keyCode != '13') {
            _this.$alert('文字与图片不可同时发送', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.resendMsging = false
              }
            })
          }
        }
      })
    },
    //发送图片消息
    sendPic(images, imgName) {
      var _this = this
      var selToID = this.$store.getters.sessionIdGetter
      var selSess = this.$store.getters.selSessGetter
      var selType = this.$store.getters.selTypeGetter
      var friendHeadUrl =
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2382110381,2382599939&fm=27&gp=0.jpg'
      if (!selToID) {
        _this.$alert('您还没有好友，暂不能聊天', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return
      }

      if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000))
      }
      var msg = new webim.Msg(selSess, true, -1, -1, -1, loginInfo.identifier, 0, loginInfo.identifierNick)
      var images_obj = new webim.Msg.Elem.Images(images.File_UUID)
      for (var i in images.URL_INFO) {
        var img = images.URL_INFO[i]
        var newImg
        var type
        switch (img.PIC_TYPE) {
          case 1: //原图
            type = 1 //原图
            break
          case 2: //小图（缩略图）
            type = 3 //小图
            break
          case 4: //大图
            type = 2 //大图
            break
        }
        newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl)
        images_obj.addImage(newImg)
      }
      msg.addImage(images_obj)
      //if(imgName){
      //    var data=imgName;//通过自定义消息中的data字段保存图片名称
      //    var custom_obj = new webim.Msg.Elem.Custom(data, '', '');
      //    msg.addCustom(custom_obj);
      //}
      //调用发送图片消息接口
      webim.sendMsg(
        msg,
        function(resp) {
          if (selType == webim.SESSION_TYPE.C2C) {
            //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            _this.$emit('addMsg', msg)
          }
        },
        function(err) {
          alert(err.ErrorInfo)
        }
      )
    },
    fileOnChange() {
      //选择图片触发事件
      if (!window.File || !window.FileList || !window.FileReader) {
        alert('您的浏览器不支持File Api')
        return
      }
      var uploadFile = document.getElementById('upd_pic')
      var file = uploadFile.files[0]
      var fileSize = file.size
      // var fileSize = file.size;

      //先检查图片类型和大小
      // if (!checkPic(uploadFile, fileSize)) {
      //     return;
      // }

      //预览图片
      var reader = new FileReader()
      var preDiv = document.getElementById('previewPicDiv')
      reader.onload = (function(file) {
        return function(e) {
          preDiv.innerHTML = ''
          var span = document.createElement('span')
          span.innerHTML = '<img class="img-responsive" src="' + this.result + '" alt="' + file.name + '" />'
          //span.innerHTML = '<img class="img-thumbnail" src="' + this.result + '" alt="' + file.name + '" />';
          preDiv.insertBefore(span, null)
        }
      })(file)
      //预览图片
      reader.readAsDataURL(file)
    },
    pasteImg() {
      var _this = this
      document.addEventListener('paste', function(event) {
        var items = (event.clipboardData || window.clipboardData).items
        var file = null
        if (items && items.length) {
          // 搜索剪切板items
          for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              file = items[i].getAsFile()
              break
            }
          }
        } else {
          alert('当前浏览器不支持')
          return
        }
        if (!file) {
          // log.innerHTML = '<span style="color:red;">粘贴内容非图片</span>';
          return
        }
        
        //多重判断 防止其他问题
        if(!$('#preview').html()) _this.sendInputImg = null;

        if (_this.sendInputImg) {
          _this.$alert('一次仅限发送一张图片！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.resendMsging = false
            }
          })
          return;
        }

        if (_this.message) {
          _this.$alert('文字与图片不可同时发送', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.resendMsging = false
            }
          })
          return
        }
        // 此时file就是我们的剪切板中的图片对象
        // 如果需要预览，可以执行下面代码

        _this.previewBox = true
        var reader = new FileReader()
        var preview = document.getElementById('preview')
        reader.onload = function(event) {
          var html = '<img src="' + event.target.result + '" class="upload-image" width="200">'
          _this.oldPreviewHTML = html
          preview.innerHTML = html
        }
        reader.readAsDataURL(file)
        _this.sendInputImg = file
        // _this.$store.commit('changeSendImg', file)
        // _this.submitMessage(file, 'pasteImg')

        // 如果不需要预览，上面这段可以忽略

        // 这里是上传
        // var xhr = new XMLHttpRequest();
        // // 上传进度
        // if (xhr.upload) {
        //     xhr.upload.addEventListener('progress', function (event) {
        //         log.innerHTML = '正在上传，进度：' + Math.round(100 * event.loaded / event.total) / 100 + '%';
        //     }, false);
        // }
        // // 上传结束
        // xhr.onload = function () {
        //     var responseText = xhr.responseText;
        //     log.innerHTML = '上传成功，地址是：' + responseText;
        // };
        // xhr.onerror = function () {
        //     log.innerHTML = '<span style="color:red;">网络异常，上传失败</span>';
        // };
        // xhr.open('POST', './upload.php', true);
        // xhr.setRequestHeader('FILENAME', encodeURIComponent(file.name));
        // xhr.send(file);
      })
    },
    //获取客户电话
    hxsTelephoneBox() {
      this.listTelephone = null;
      if(this.isListTelephoneLoad){
        this.$message('请求频繁');
        return;
      }
      this.isListTelephoneLoad = true;
      var _this = this
      this.hxsTelephoneBoxShow = true
      var userId = this.$store.getters.sessionIdGetter
      if (!userId) {
        alert('还没有选择用户')
        return
      }
      var encodePhone = this.$store.getters.encodePhoneGetter

      $.getJSON(
        'https://api.hxsapp.com/im/Chat/getCustomerAllPhones',
        {
          //获取用户参数
          encode_phone: encodePhone
        },
        function(data) {
          _this.listTelephone = data.data || [];
          _this.isListTelephoneLoad = false;

          //多个号码展示框left定位
          if(_this.listTelephone.length > 2){
            $('.list-phone').css({
              top: -(130 *(_this.listTelephone.length/2))
            });
          }
        }
      )
    },
    //拨打客户电话
    hxsTelephone(tel) {
      if(this.hxsTelephoneLoad) return;
      this.hxsTelephoneLoad = true;
      var userId = this.$store.getters.sessionIdGetter
      if (!userId) {
        alert('还没有选择用户')
        return
      }
      var brmId = sessionStorage.getItem('brm_userId')
      if (brmId.indexOf('brm-') != -1) {
        brmId = brmId.substring(4)
      }
      var mobile = tel
      var _this = this
      // var mobile = data.data[userId].mobiletel
      $.getJSON(
        'https://api.hxsapp.com/account/UserAccount/makeCallByPhone',
        {
          //请求brm的拨打接口
          account: brmId,
          number: mobile,
          numPrefix: _this.dialingType
        },
        function(data) {
          _this.$alert(data.msg, {
            confirmButtonText: '确定',
            callback: action => {}
          })
          _this.hxsTelephoneBoxShow = false
          _this.hxsTelephoneLoad = false;
        }
      )
    },
    changeTip(isDial) {
      this.isTip = false
      if (isDial) {
        let data = {
          type: 'Dial'
        }
        this.$emit('dialAudio', data)
      }
    },
    // 拨打语音电话
    hxsonlineTelephone() {
      if (this.$store.getters.showAudioGetter) {
        this.$message.error('正在通话中')
        return
      }
      this.isTip = !this.isTip
    },
    submitMessage(resendMsg) {
      //发送消息
      var activeUserId = this.$store.getters.sessionIdGetter
      var _this = this

      if (!_this.sendInputImg) {
        //提交输入框的消息
        this.showEmotionBox = false
        if (this.resendMsging) return
        this.resendMsging = true
        var msgtosend = this.message || ''

        //防止发送方使用空格符或者回车键作为号码分割符号s
        // var reg = /(\s)|(\r)/g
        // var filtermsg = msgtosend.replace(reg, '')

        // //去除空格符或者回车键验证是否是点好号码
        // if (commonJs.isPoneAvailable(filtermsg)) {
        //   var regN = /^1[34578]\d{9}/g
        //   msgtosend = filtermsg.replace(regN, '*** **** ****')
        // }

        this.message = null
        if (!resendMsg.hasOwnProperty('elems') && !msgtosend) {
          _this.$alert('没有消息内容', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.resendMsging = false
            }
          })
          return
        }
      }
      var encodePhone = this.$store.getters.encodePhoneGetter
      var brm_userId = sessionStorage.getItem('brm_userId')
      $.getJSON(
        'https://api.hxsapp.com/im/Chat/checkCanChat',
        {
          //请求brm的拨打接口
          brm_adviser_id: brm_userId,
          encode_phone: encodePhone
        },
        function(data) {
          this.resendMsging = true
          if (data.data) {
            if (data.data.canChat == '0') {
              _this.$alert('你已经与该客户解除授权关系，不能发送消息。', {
                confirmButtonText: '确定'
              })
              _this.resendMsging = false
              return
            }
          }

          if (_this.sendInputImg) {
            var imgFile = _this.sendInputImg
            _this.sendInputImg = null;
            if (imgFile) _this.$emit('sendImg', imgFile)
            _this.previewBox = false
            // _this.$store.commit('changeSendImg', null)
            _this.oldPreviewHTML = null
            return
          }

          var selSess = new webim.Session(
            webim.SESSION_TYPE.C2C,
            activeUserId,
            activeUserId,
            'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2382110381,2382599939&fm=27&gp=0.jpg',
            Math.round(new Date().getTime() / 1000)
          )

          var isSend = true //是否为自己发送
          var seq = -1 //消息序列，-1表示 SDK 自动生成，用于去重
          var random = Math.round(Math.random() * 4294967296) //消息随机数，用于去重
          var msgTime = Math.round(new Date().getTime() / 1000) //消息时间戳
          var subType //消息子类型

          var msg = new webim.Msg(
            selSess,
            isSend,
            seq,
            random,
            msgTime,
            loginInfo.identifier,
            webim.GROUP_MSG_SUB_TYPE.COMMON,
            loginInfo.identifierNick
          )
          var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex
          if (!resendMsg.hasOwnProperty('elems')) {
            //解析文本和表情
            var expr = /\[[^[\]]{1,8}\]/gm
            var emotions = msgtosend.match(expr)

            //消息为纯文本格式
            if (!emotions || emotions.length < 1) {
              text_obj = new webim.Msg.Elem.Text(msgtosend)
              msg.addText(text_obj)
            } else {
              //消息是表情格式 → [笑脸]
              for (var i = 0; i < emotions.length; i++) {
                tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]))
                if (tmsg) {
                  text_obj = new webim.Msg.Elem.Text(tmsg)
                  msg.addText(text_obj)
                }
                emotionIndex = webim.EmotionDataIndexs[emotions[i]]
                emotion = webim.Emotions[emotionIndex]
                if (emotion) {
                  face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i])
                  msg.addFace(face_obj)
                } else {
                  text_obj = new webim.Msg.Elem.Text(emotions[i])
                  msg.addText(text_obj)
                }
                restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length
                msgtosend = msgtosend.substring(restMsgIndex)
              }
              if (msgtosend) {
                text_obj = new webim.Msg.Elem.Text(msgtosend)
                msg.addText(text_obj)
              }
            }
          } else {
            msg = resendMsg
            msg.resendMsg = false0
          }

          //发消息的用户位置调整为置顶的下index
          _this.$emit('sendMsgAdvanceFn', activeUserId)

          //防止提示多次复制图片
          _this.sendInputImg = null;
          webim.sendMsg(
            msg,
            function(resp) {
              _this.$emit('addMsg', msg)
              _this.$emit('chatViewScrollFn', '')
              _this.resendMsging = false
            },
            function(resp) {
              msg.resendMsg = true
              _this.$emit('addMsg', msg)
              _this.$emit('chatViewScrollFn', '')
              _this.resendMsging = false
            }
          )
        }
      )
    },
    hideSoild(index){//是否展示号码分割符号
        if(index == 0) return false;
        if(index%2 == 0){
          return false;
        }
        return true;
    },
    clearInputMsg(){//切换选择人清空消息输入和电话提示框关闭
      this.message = null;

      if(this.sendInputImg){
        this.sendInputImg = null;
        $('#preview').html('');
        this.previewBox = false;
      }
      //电话提示框关闭
      this.value = '自动检测';
      this.dialingType = null;
      this.hxsTelephoneBoxShow = false;
    },
    centerEllipsisPhoneFn(num){//电话框里面电话号码中间4位替换****
      return commonJs.centerEllipsisPhone(num);
    },
    hideListPhone(){//电话号码框隐藏定时器
     this.listPhoneTimer = setInterval(()=>{
        this.hxsTelephoneBoxShow = false;
        this.listTelephone = null;
      },300); 
    },
    showListPhone(){//电话号码框清除隐藏定时器
      clearInterval(this.listPhoneTimer); 
    },
    elSelectUi(){//电话号码框清除隐藏定时器
      var _this = this;
      $(document).on('mouseover','.el-select-dropdown',function(){
        _this.showListPhone();
      })
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
  },
  beforeDestroy() {
    this.quickSubmitMessage = null;
  }
}
</script>
<style lang="less" scoped>
.bottomBar {
  width: 100%;
  height: 30%;
  background: #fff;
  .icon {
    height: 30px;
    padding: 5px 20px;
    span {
      width: 21px;
      height: 21px;
      margin-right: 23px;
      float: left;
      position: relative;
      cursor: pointer;
      margin-top: 4px;
      &.right {
        float: right;
        margin-right: 0;
      }
      &.emotionBtn {
        background: url(../assets/img/icon_emoji.png) left top no-repeat;
        background-size: 100%;
      }
      &.historyIcon {
        background: url(../assets/img/icon_histroy.png) left top no-repeat;
        background-size: 100%;
      }
    }
    .telIcon {
      width: 30px;
      height: 30px;
      margin-right: 23px;
      float: left;
      background: #ccc;
      position: relative;
      cursor: pointer;
      background: url(../assets/img/icon_call.png) left top no-repeat;
      background-size: 100%;
      float: right;
      margin-right: 0;
      position: relative;
      .list-phone{
        min-width: 300px;
        padding:20px;
        background: #fff;
        position: absolute;
        left: -312px;
        top: -130px;
        border-radius: 4px;
        // overflow: hidden;
        z-index: 99;
        .arrow-down {
          width:0; 
          height:0; 
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-top:10px solid #fff;
          position: absolute;
          right: 3px;
          bottom:-10px;
          z-index: 9999;
        }
        .top{
          p{
            height: 20px;
            line-height: 20px;
            color:#333;
            font-size: 14px;
            margin-bottom: 10px;
            float: left;
          }
        }
        ul{
          margin-top: 5px;
          min-height: 40px;
          li{
            height: 30px;
            line-height: 30px;
            font-size: 22px;
            float: left;
            margin-bottom: 10px;
            margin-right: 10px;
            a{
              height: 30px;
              line-height: 30px;
              color:#333;
              float: left;
              margin-right: 15px;
            }
            a:hover{
              color:#FF668C;
            }
            em{
              width:1px;
              height:30px;
              background:rgba(129,141,207,0.2);
              border-radius:1px;
              float: left;
            }
          }
        }
      }
    }
    .phoneIcon {
      width: 30px;
      height: 30px;
      margin-top:1px;
      img {
        width: 100%;
      }
    }
    .audioTip {
      width: 390px;
      height: 102px;
      position: absolute;
      right: 14px;
      top: -140px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      padding: 10px;
      p {
        font-size: 16px;
        color: #333;
        font-weight: 400;
        line-height: 22px;
        margin-top: 10px;
      }
      .btn-box {
        width: 100%;
        text-align: right;
        position: relative;
        z-index: 3;
        top: 35px;
        .tipBtn {
          display: inline-block;
          width: 60px;
          margin-right: 5px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
        }
        .btn1 {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        .btn2 {
          background: rgba(101, 114, 147, 1);
          border-radius: 4px;
          color: #fff;
        }
      }
      &::after {
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 15px solid #fff;
        content: '';
        position: relative;
        width: 0;
        top: 65px;
        right: -315px;
      }
    }
    .sendPictureBtn {
      width: 21px;
      height: 21px;
      margin-right: 23px;
      background: #ccc;
      float: left;
      overflow: hidden;
      cursor: pointer;
      margin-top: 4px;
      background: url(../assets/img/icon_picture.png) left top no-repeat;
      background-size: 100%;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
  textarea {
    position: relative;
    width: 96%;
    padding: 0 5px;
    height:110px;
    line-height: 24px;
    background: rgba(255, 255, 255, 1);
    opacity: 0.7;
    border: none;
    outline: none;
    background: #fff;
    color: #000;
  }
  .submit {
    position: absolute;
    right: 0;
    height: 35px;
    padding: 10px 0;
    bottom: 10px;
    span {
      width: 70px;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      background: rgba(101, 114, 147, 1);
      border-radius: 6px;
      color: #fff;
      margin-right: 20px;
      float: right;
      text-align: center;
      cursor: pointer;
    }
  }
  .previewPicDivBox {
    position: absolute;
    left: 0;
    top: 0;
    span {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .btn {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #ccc;
    }
  }
  .emotionsBox {
    position: absolute;
    width: 285px;
    height: 200px;
    background: #fff;
    left: -10px;
    top: -226px;
    z-index: 2px; /*向下*/
    .triangle_border_down {
      width: 0;
      height: 0;
      border-width: 13px 13px 0;
      border-style: solid;
      border-color: #fff transparent transparent;
      position: absolute;
      bottom: -14px;
      left: 9px;
    }
    .emotions {
      width: 100%;
      height: 155px;
      overflow-y: scroll;
    }

    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        float: left;
        height: 28px;
        width: 28px;
        margin: 0px 0px 0px 0px;
        padding: 4px 2px;
        text-align: center;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        :hover {
          background: #eaeaf2;
        }
      }
      .customize {
        width: 65px;
        height: 65px;
        img {
          width: 60px;
          height: 60px;
          cursor: pointer;
          margin: auto;
        }
        :hover {
          background: #eaeaf2;
        }
      }
    }
    .switchEmotionList {
      height: 45px;
      background: #fff;
      border-top: rgba(229, 229, 229, 1) solid 1px;
      div {
        width: 45px;
        height: 45px;
        float: left;
        &.active {
          background: rgba(234, 234, 242, 1);
        }
        em {
          width: 26px;
          height: 26px;
          margin-top: 8px;
          margin-left: 8px;
          background: url(http://webim.hxsapp.com/pcIm/static/icon/brid.png) left top no-repeat;
          background-size: 100%;
          display: block;
          &.default {
            background: url(http://webim.hxsapp.com/pcIm/static/icon/B_icon_smail.png) left top no-repeat;
            background-size: 100%;
          }
          &.rab {
            background: url(http://webim.hxsapp.com/pcIm/static/icon/rab.png) left top no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
  .upload-preview {
    border: none;
    outline: none;
  }
  .uploadPreviewBox{
    height: 100%;
  }
}
</style>
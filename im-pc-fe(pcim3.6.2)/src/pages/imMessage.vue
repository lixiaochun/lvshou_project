<template>
  <div class="bigmain flex" @click="hideModel" id="bigmain" style="border-radius:0 5px 5px 0">
    <!-- <leftMenu class="left-tabbar" :activeIndex="0"></leftMenu> -->
    <div style="width:250px;">
      <leftBar v-on:childByValue="childByValue" ref="goHide" @endLoading="hideLoading" class="friend-List" :isAlert="isAlert" :select="selectIndex" v-if="unreadJson && customerTopJson && recentContactsArrLoadEnd" :recentContactsArr="recentContactsArr" :unreadJson="unreadJson" @setAutoReadFn="setAutoRead" @chatViewScrollFn="chatViewScrollBotton" :historyMsgList="historyMsgList" :customerTopJson="customerTopJson" @changchatViewTopName="changchatViewTopNameFn" @activeEncodePhone="encodePhoneFn" @changeUserIdFn="userIdFn" @addCustomerTop="addCustomerTopFn" @deleteCustomerTop="deleteCustomerTopFn" @isInitUnreadMsgCountFn="isInitUnreadMsgCount" :isLoading="isLoading" @delChatFn="delChat" @clearInputMsgFn="clearInputPageMsgFn"></leftBar>
    </div>
    <div class="friend-center" v-show="!isClose">
      <audio v-if="isShogun" loop="loop" autoplay="autoplay" src="http://misc.hxsapp.com/impc/avchat_ring.mp3"></audio>
      <audio autoplay="autoplay" id="audio_music" src=""></audio>
      <!-- 中间头部菜单 -->
      <div class="center-header flex flex-align-center flex-pack-justify drag">
        <div class="message-header-title">
          <span class="title-name">{{activeUserHxsName}}</span>
          <div class="flex flex-align-center" v-if="selectInfo">
            <span class="title-name">{{selectInfo.To_Account}}</span><span class="title-fenzu">(主动找我的)</span>
          </div>
        </div>
        <div class="center-header flex flex-align-center flex-pack-end drag">
          <div class="header-img flex flex-align-center no-drag" @click="minSmall">
            <img src="../assets/img/header/icon_minimize.png">
          </div>
          <div class="header-img flex flex-align-center no-drag" @click="maxBig">
            <img src="../assets/img/header/icon_fullscreen.png">
          </div>
          <div class="header-img flex flex-align-center no-drag" @click="close" >
            <img src="../assets/img/header/icon_close.png" id="close-img">
          </div>
        </div>
      </div>
      <!-- 消息展示和用户资料面板-->
      <div class="center-foot flex flex-pack-justify" id="foot">
        <!-- 消息发送和展示面板 -->
        <div class="foot-left">
          <chatView :historyMsgList="historyMsgList" v-if="historyMsgList.length>0" @scroll="getHistoryMsgCallback" @resendMessage="inputBoxresendMsg" ref="chatViewFn" :loginInfoHeadurl="loginInfoHeadurl" @activeEncodePhone="encodePhoneFn" @ugtUserTelShowFn="ugtUserTelRun"></chatView>
          <inputBox class="bottom-box" @dialAudio="dialEvent" @addMsg="getInputMsg" @chatViewScrollFn="chatViewScrollBotton" @sendMsgAdvanceFn="sendMsgAdvance" ref="inputBoxFn" v-if="encodePhone != 'xitongtongzhi'  && user_id" @sendImg="submitImage2"></inputBox>
          <audioPage class="showAudio" :audioUserInfo="audioUserInfo" :showLoadingTime="showLoadingTime" :isDial="isDial" v-if="showAudio" @touchChild="childEvent"></audioPage>
        </div>
        <historyRecord :userId="user_id" v-if="isHistory"></historyRecord>
        <userInfo :userId="encodePhone" class="userinfo-box user-box" @modifyNote="updateNote" v-if="(!isHistory && user_id) || isXiTongTongZhi "></userInfo>
        <div v-if="hideMasker" class="loadingMask flex flex-align-center flex-pack-center">
          <img src="../assets/img/backgroun_logo.png" alt="">
        </div>
      </div>
      <div class="layer" v-if="sendPictureBoxShow">
        <div class="sendPictureBox">
          <div class="title clearfix">
            <span>发送图片</span>
            <em v-if="sendPictureBoxShow" @click="sendPictureBoxHide"></em>
          </div>
          <div class="content">
            <ul>
              <li class="clearfix">
                <span>选择</span>
                <input type="file" id="upd_pic" value="选择文件" @change="fileOnChange">
              </li>
              <li class="clearfix">
                <span>预览</span>
                <div id="previewPicDiv"></div>
              </li>
              <li class="clearfix">
                <span>进度</span>
                <div class="upd_progress">
                  <em :style="{width:updProgressWidth}"></em>
                </div>
              </li>
            </ul>
          </div>
          <div class="bottom clearfix">
            <a href="javascript:;" class="send" @click="submitImage">发送</a>
            <a href="javascript:;" class="colse" @click="sendPictureBoxHide">关闭</a>
          </div>
        </div>
      </div>
    </div>
    <div id="bigPicDiv"></div>
    <transition name="fade">
      <div class="loading-pcAgent flex flex-align-center flex-pack-center" v-if="pcAgentLoading">
        <div class="load-pcAgent-body">
          <div class="load-pcAgent__header">
            <div class="el-message-box__title">
              <!----><span>提示</span>
            </div>
            <div class="el-message-box__content">
              <div class="el-message-box__status el-icon-loading" style="margin-top:-12px"></div>
              <div class="el-message-box__message">
                <p>检测语音插件中...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <ugtUserTel v-if="ugtUserTelShow" :ugtUserTelNumber="ugtUserTelNumber"></ugtUserTel>
  </div>
</template>
<script>
import commonJs from '@/util/common.js'
import leftMenu from '@/components/leftMenu'
import leftBar from '@/components/leftBar'
import userInfo from '@/components/userInfo'
import chatView from '@/components/chatView'
import inputBox from '@/components/inputBox'
import audioPage from '@/components/audioPage'
import ugtUserTel from '@/components/ugtUserTel'
import historyRecord from '@/components/historyRecord'
import axios from 'axios'
// 引入打包工具
// 引入打包工具
var ipc
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}
export default {
  name: 'imMessage',
  data() {
    return {
      isBig: 0, //1最大化 0最小化
      isClose: false, //又上角关闭
      recentContactsArr: [], // 消息列表
      unreadJson: null,
      selectIndex: null, // 默认选中的消息下标
      isAlert: false, // 是否显示右键弹窗
      selectInfo: null, // 当前选中的消息数据
      historyMsgList: [], //历史聊天记录
      getPrePageC2CHistroyMsgInfoMap: {}, //用于历史记录拉取上一页内容
      isLoadHistoryMsg: false, //是否在加载历史记录
      sendPictureBoxShow: false, //发送图片框是否显示
      updProgressWidth: null,
      userInfo: null, //用户资料
      loginInfoHeadurl: null,
      activeUserHxsName: null,
      phone_id: '', //用户加密手机
      user_id: '', //用户user_id,
      isHistory: false, //是否显示消息记录
      encodePhone: null, //用户加密手机用于传递其他组件
      customerTopJson: null, //置顶用户信息
      rightShowTabelType: true,
      isOnKickedEventCall: false, //使用与踢下线操作，保证提下线只触发一次
      recentContactsArrLoadEnd: false, //判断左边用户列表是否加载完毕
      hideMasker: true, // 右侧消息面板遮罩层 左侧列表没加载完成之前显示遮罩层
      isLoading: true, //历史会话列表用户数据是否加载完毕
      resultSessionItem: null, //历史会话列表用户数据
      customerTopJsonNum: null, //关注人数总个数
      isXiTongTongZhi: false, //判断当前的聊天是否是系统
      msgCount: 0, //网页使用的消息总条数据
      filterMsgArr: null, //需要过滤的新消息
      netcall: null, // 网易云信语音实例初始化
      Netcall: null,
      showAudio: false, // 是否显示语音
      isShogun: false, // 来电或者拨打 铃声提示状态
      isUninhabited: false, // 无人接听语音提示
      isBusy: false,
      isReject: false,
      beCalledInfo: null,
      beCalling: false,
      isDial: false, // 是否是主动呼叫
      audioUserInfo: {},
      pcAgentLoading: false, // 语音插件检测状态
      showLoadingTime: true,
      ugtUserTelShow: false, //未注册用户提示框
      ugtUserTelNumber: false,
      audioUserId: null // 当前通话的用户id
    }
  },
  watch: {
    '$store.getters.userInfoGetter'(json) {
      console.log(json)
      //监听用户关系列表是否有选择用户在会话列表进行会话 json为关系列表选中人信息
      if (!json) return
      var isCustomerTopKey = false //判断置顶是否有这个用户
      var isRecentContactsArrKey = false //判断会话列表是否有这个用户

      //判断置顶是否有这个用户
      for (var j = 0; j < this.customerTopJson.length; j++) {
        if (json.To_Account == this.customerTopJson[j].chat_account) {
          isCustomerTopKey = true
        }
      }

      for (var j = 0; j < this.recentContactsArr.length; j++) {
        if (json.To_Account == this.recentContactsArr[j].To_Account) {
          isRecentContactsArrKey = true
        }
      }

      //如果会话列表有这个用户 把他提取到置顶个数位置下下
      for (var i = 0; i < this.recentContactsArr.length; i++) {
        if (json.To_Account == this.recentContactsArr[i].To_Account && !isCustomerTopKey) {
          var arr = this.recentContactsArr.splice(i, 1)
          this.recentContactsArr.splice(this.customerTopJson.length, 0, arr[0])
        }
      }

      //如果置顶有这个用户 保持在置顶的位置
      if (!isRecentContactsArrKey) {
        for (var j = 0; j < this.customerTopJson.length; j++) {
          if (json.To_Account == this.customerTopJson[j].chat_account) {
            this.recentContactsArr.splice(j, 0, json)
            isCustomerTopKey = true
          }
        }
        //如果置顶没有这个用户  插入置顶位置后面
        if (!isCustomerTopKey) {
          this.recentContactsArr.splice(this.customerTopJson.length, 0, json)
        }
      }

      //默认选中这个用户为当前会话
      this.$nextTick(() => {
        this.$refs.goHide.getHxsUserInfo(json.To_Account)
      })

      //请求相关用户信息
      this.$store.commit('changeUserInfo', null)
    },
    // // 监听语音显示状态
    // '$store.getters.showAudioGetter'(data) {
    //   this.showAudio = data
    // },
    showAudio(data) {
      this.$store.commit('changeShowAudio', data)
    }
  },
  mounted() {
    this.filterMsg()
    // 从用户列表传递的id
    if (commonJs.getUrlstring('userid')) {
      this.selectIndex = commonJs.getUrlstring('userid')
    }
    this.getSetting()
    // 获取本地设置的最大化最小化状态
    var localIsbig = localStorage.getItem('isBig') || '0'
    var brm_userId = sessionStorage.getItem('brm_userId')
    this.isBig = localIsbig
    var _this = this
    axios
      .get('https://api.hxsapp.com/account/UserAccount/registerServerTim', {
        params: {
          id: 'brm-' + brm_userId
        }
      })
      .then(res => {
        //当前用户身份
        //帐号模式，0-表示独立模式，1-表示托管模式
        window.loginInfo = {
          sdkAppID: res.data.sdkAppId, //用户所属应用id,必填
          identifier: 'brm-' + brm_userId, //当前用户ID,必须是否字符串类型，必填
          accountType: 25733, //用户所属应用帐号类型，必填
          userSig: res.data.sig, //当前用户身份凭证，必须是字符串类型，必填
          identifierNick: null, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
          headurl: '' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
        }
        //IE9(含)以下浏览器用到的jsonp回调函数
        function jsonpCallback(rspData) {
          webim.setJsonpLastRspData(rspData)
        }

        //监听连接状态回调变化事件
        window.onConnNotify = function(resp) {
          var info
          switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
              webim.Log.warn('建立连接成功: ' + resp.ErrorInfo)
              break
            case webim.CONNECTION_STATUS.OFF:
              info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo
              // alert(info);
              webim.Log.warn(info)
              break
            case webim.CONNECTION_STATUS.RECONNECT:
              info = '连接状态恢复正常: ' + resp.ErrorInfo
              // alert(info);
              webim.Log.warn(info)
              break
            default:
              webim.Log.error('未知连接状态: =' + resp.ErrorInfo)
              break
          }
        }

        window.curPlayAudio = null //当前正在播放的audio对象
        //监听事件
        window.listeners = {
          onConnNotify: onConnNotify, //监听连接状态回调变化事件,必填
          //     ,
          // "jsonpCallback": jsonpCallback //IE9(含)以下浏览器用到的jsonp回调函数，
          onMsgNotify: onMsgNotify, //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
          // ,
          // "onBigGroupMsgNotify": onBigGroupMsgNotify //监听新消息(直播聊天室)事件，直播场景下必填
          //     ,
          // "onGroupSystemNotifys": onGroupSystemNotifys //监听（多终端同步）群系统消息事件，如果不需要监听，可不填
          //     ,
          // "onGroupInfoChangeNotify": onGroupInfoChangeNotify //监听群资料变化事件，选填
          //     ,
          // "onFriendSystemNotifys": onFriendSystemNotifys //监听好友系统通知事件，选填
          //     ,
          // "onProfileSystemNotifys": onProfileSystemNotifys //监听资料系统（自己或好友）通知事件，选填
          onKickedEventCall: onKickedEventCall //被其他登录实例踢下线
          //     ,
          // "onC2cEventNotifys": onC2cEventNotifys //监听C2C系统消息通道
          //     ,
          // "onAppliedDownloadUrl": onAppliedDownloadUrl //申请文件/音频下载地址的回调
        }

        window.isAccessFormalEnv = true //是否访问正式环境
        window.options = {
          isAccessFormalEnv: isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
          isLogOn: false //是否开启控制台打印日志,默认开启，选填
        }
        //登录腾讯sdk
        independentModeLogin(function() {
          setSelType()
          getSessionArr()
          quitClick()
          _this.loginInfoHeadurl =
            loginInfo.headurl || 'https://hxsapp-oss.hxsapp.com/public/image/default_servicer_img.png'
          _this.$store.commit('changeloginInfoHeadurl', _this.loginInfoHeadurl)
        })

        //被新实例踢下线的回调处理
        function onKickedEventCall() {
          if (!_this.isOnKickedEventCall) {
            if (!window.require) {
              clearInterval(window.newsTimer)
              document.title = 'webim'
            }
            var isLogion = _this.$store.getters.isLoginGetter
            if (!isLogion) return false
            sessionStorage.removeItem('brm_userId')
            _this.$alert('账号被其他人登录了。如确认为你的IM账号，请重新登录！', '下线通知', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$store.commit('changeIsLogin', false)
                _this.$store.commit('changeTabidx', 3)
              }
            })
            _this.isOnKickedEventCall = true
          }
        }

        function setSelType() {
          var selType = webim.SESSION_TYPE.C2C
          _this.$store.commit('changeSelType', selType)
        }

        //初始化最近会话的消息未读数
        function initUnreadMsgCount() {
          var sess
          var sessMap = webim.MsgStore.sessMap()
          _this.unreadJson = sessMap
          if (_this.resultSessionItem) {
            for (var key in sessMap) {
              for (var i = _this.customerTopJsonNum; i < _this.resultSessionItem.length; i++) {
                if (sessMap[key]._impl.id == _this.resultSessionItem[i].To_Account) {
                  var arr = _this.resultSessionItem.splice(i, 1)
                  _this.resultSessionItem.splice(_this.customerTopJsonNum, 0, arr[0])
                }
              }
            }
            _this.recentContactsArr = _this.resultSessionItem || []
          }

          _this.recentContactsArrLoadEnd = true
        }

        //获取会话用户列表
        function getSessionArr() {
          var options = {
            Count: 200 //最近的会话数
          }
          webim.getRecentContactList(
            options,
            function(result) {
              //获取用户列表
              axios
                .get('https://api.hxsapp.com/im/Chat/getCustomerTop', {
                  params: {
                    brm_adviser_id: brm_userId
                  }
                })
                .then(CustomerTopRes => {
                  //获取指定用户
                  var interimCustomerTopJson = CustomerTopRes.data.data || []
                  _this.customerTopJson = []

                  if (result.SessionItem) {
                    for (var i = 0; i < result.SessionItem.length; i++) {
                      for (var j = 0; j < interimCustomerTopJson.length; j++) {
                        if (result.SessionItem[i].To_Account == interimCustomerTopJson[j].chat_account) {
                          // var arr = result.SessionItem.splice(i, 1);
                          _this.customerTopJson.push(interimCustomerTopJson[j])
                        }
                      }
                    }
                  } else {
                    _this.customerTopJson = []
                  }

                  if (CustomerTopRes.data.msg != '无数据' && result.SessionItem) {
                    for (var i = 0; i < result.SessionItem.length; i++) {
                      for (var j = 0; j < _this.customerTopJson.length; j++) {
                        if (result.SessionItem[i].To_Account == _this.customerTopJson[j].chat_account) {
                          var arr = result.SessionItem.splice(i, 1)
                          result.SessionItem.unshift(arr[0])
                        }
                      }
                    }
                  }
                  if (result.SessionItem) {
                    //如果有用户信息
                    for (var i = 0; i < result.SessionItem.length; i++) {
                      if (result.SessionItem[i].To_Account == 0) {
                        result.SessionItem.splice(i, 1)
                      }
                    }
                  }

                  if (!result.SessionItem) {
                    _this.isLoading = false
                    _this.hideLoading()
                  }

                  _this.resultSessionItem = result.SessionItem
                  _this.customerTopJsonNum = _this.customerTopJson.length

                  //获取所有用户未读消息
                  webim.syncMsgs(initUnreadMsgCount)
                })
            },
            function(err) {
              alert(err.ErrorInfo)
            }
          )
        }

        //监听新消息
        function onMsgNotify(newMsgList) {
          if (
            newMsgList[0].elems[0].content.text == _this.filterMsgArr[0] ||
            newMsgList[0].elems[0].content.text == _this.filterMsgArr[1]
          ) {
            var data = {
              To_Account: newMsgList[0].sess._impl.id,
              chatType: '1'
            }
            webim.deleteChat(data, function(resp) {})
            return
          }
          var sess, newMsg
          //获取所有聊天会话
          var sessMap = webim.MsgStore.sessMap()
          //用于判断会话列表是否有新消息来源的用户
          var haveUserId = false
          var isCustomerTopJsonKey = false
          var str = null
          str = newMsgList[0].sess._impl.id
          // for (var q = 0; q < newMsgList.length; q++) {
          //   str += newMsgList[q].sess._impl.id;
          // }

          for (var i = 0; i < _this.recentContactsArr.length; i++) {
            if (_this.recentContactsArr[i].To_Account == str) {
              haveUserId = true
            }
          }

          if (_this.recentContactsArr && haveUserId) {
            for (var i = 0; i < _this.recentContactsArr.length; i++) {
              if (_this.recentContactsArr[i].To_Account == str) {
                //会话列表显示的信息和时间
                if (newMsgList[0].elems[0].type == 'TIMTextElem') {
                  //文本信息
                  _this.recentContactsArr[i].MsgShow = newMsgList[0].elems[0].content.text
                } else if (newMsgList[0].elems[0].type == 'TIMImageElem') {
                  _this.recentContactsArr[i].MsgShow = '[图片]'
                } else if (newMsgList[0].elems[0].type == 'TIMSoundElem') {
                  _this.recentContactsArr[i].MsgShow = '[语音]'
                } else if (newMsgList[0].elems[0].type == 'TIMFaceElem') {
                  _this.recentContactsArr[i].MsgShow = '[表情]'
                }
                _this.recentContactsArr[i].MsgTimeStamp = newMsgList[0].time

                //新消息把用户推到会话列表第一位

                for (var j = 0; j < _this.customerTopJson.length; j++) {
                  if (_this.customerTopJson[j].chat_account == newMsgList[0].sess._impl.id) {
                    isCustomerTopJsonKey = true
                  }
                }

                if (!isCustomerTopJsonKey) {
                  var arr = _this.recentContactsArr.splice(i, 1)
                  _this.recentContactsArr.splice(_this.customerTopJson.length, 0, arr[0])
                }
              }
            }
          } else {
            var MsgShowType = null
            //会话列表显示的信息和时间
            if (newMsgList[0].elems[0].type == 'TIMTextElem') {
              //文本信息
              //防止发送方使用空格符或者回车键作为号码分割符号
              var reg = /(\s)|(\r)/g
              var newMsg = null
              var filtermsg = newMsgList[0].elems[0].content.text.replace(reg, '')

              //去除空格符或者回车键验证是否是点好号码
              if (commonJs.isPoneAvailable(filtermsg)) {
                var regN = /1[345789]\d{9}/g
                newMsg = filtermsg.replace(regN, '*** **** ****')
              }
              MsgShowType = newMsg || newMsgList[0].elems[0].content.text
            } else if (newMsgList[0].elems[0].type == 'TIMImageElem') {
              MsgShowType = '[图片]'
            } else if (newMsgList[0].elems[0].type == 'TIMFaceElem') {
              MsgShowType = '[表情]'
            } else if (newMsgList[0].elems[0].type == 'TIMSoundElem') {
              MsgShowType = '[语音]'
            }
            _this.recentContactsArr.splice(_this.customerTopJson.length, 0, {
              To_Account: newMsgList[0].sess._impl.id,
              MsgShow: MsgShowType,
              MsgTimeStamp: newMsgList[0].time,
              C2cImage: ''
            })
          }

          //当前新消息属于当前的消息记录框，推进historyMsgList展示
          if (_this.$store.getters.sessionIdGetter == newMsgList[0].sess._impl.id) {
            _this.historyMsgList.push(newMsgList[0])
            if (newMsgList[0].elems[0].type == 'TIMImageElem') {
              setTimeout(_this.chatViewScrollBotton, 300)
            } else {
              _this.chatViewScrollBotton()
            }
            // window.require&&ipc.send("scintillation");
          }

          if (window.require) {
            ipc.send('news')
          } else {
            window.newsTimer && clearInterval(window.newsTimer)
            window.newsTimer = setInterval(function() {
              var title = document.title
              if (/新/.test(title) == false) {
                document.title = '【你有新消息】'
              } else {
                document.title = 'webim'
              }
            }, 500)
          }

          $('#auto').attr('src', 'http://misc.hxsapp.com/impc/imNewTip.mp3')
        }
        // 网易云信sdk  
        function WYXsdk() {
          axios
            .get('https://api.hxsapp.com/im/YunXinIM/token', {
              params: {
                openim_account: 'brm-' + brm_userId
              }
            })
            .then(res => {
              console.log('获取到了网易云信的信息', res)
              // 网易云信语音SDK
              _this.nim = NIM.getInstance({
                debug: false,
                appKey: '08764a59b2647eeca7f0e508c5bb8d7a',
                account: res.data.data.openim_account,
                token: res.data.data.token,
                onconnect: onConnect,
                onmyinfo: onMyInfo
              })
              // 连接成功后的回调
              function onConnect(e) {
                console.log('连接成功')
                NIM.use(Netcall)
                _this.Netcall = Netcall
                _this.netcall = Netcall.getInstance({
                  nim: _this.nim,
                  debug: false
                })
                _this.signalInited = false
                // 当信令通道断开时, 会触发 signalClosed 事件
                _this.netcall.on('signalClosed', function() {
                  console.log('信道断开连接')
                  _this.signalInited = false
                  _this.netcall.hangup()
                })
                // 呼叫类型
                let type = null
                // 是否正忙
                let busy = false
                // 开启监听
                _this.netcall.on('beCalling', function(obj) {
                  console.log('接到消息', JSON.stringify(obj))
                  const channelId = obj.channelId
                  // 被叫回应主叫自己已经收到了通话请求
                  _this.netcall.control({
                    channelId: channelId,
                    command: Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
                  })
                  // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
                  if (!_this.netcall.calling && !_this.beCalling) {
                    if (window.require) {
                      ipc.send('news')
                    }
                    let userInfo = obj.pushConfig.custom.split(',')
                    _this.audioUserId = obj.account
                    _this.audioUserInfo = {
                      nickName: userInfo[1],
                      avatar: userInfo[0]
                    }
                    _this.showAudio = true
                    _this.showLoadingTime = true
                    type = obj.type
                    _this.beCalling = true
                    _this.beCalledInfo = obj
                    _this.isShogun = true
                    _this.isDial = false
                  } else {
                    if (_this.netcall.calling) {
                      busy = _this.netcall.notCurrentChannelId(obj)
                    } else if (_this.beCalling) {
                      busy = _this.beCalledInfo.channelId !== channelId
                    }
                    if (busy) {
                      _this.netcall.control({
                        channelId: channelId,
                        command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
                      })
                      // 拒绝通话
                      _this.netcall.response({
                        accepted: false,
                        beCalledInfo: obj
                      })
                      _this.isShogun = false
                      $('#audio_music').attr('src', 'http://misc.hxsapp.com/impc/avchat_peer_busy.mp3')
                    }
                  }
                })
                //
                // 被叫拒绝的通知
                _this.netcall.on('callRejected', function(obj) {
                  // 挂断
                  _this.isShogun = false
                  $('#audio_music').attr('src', 'http://misc.hxsapp.com/impc/avchat_peer_reject.mp3')
                  _this.hangup()
                  // 做清理工作
                  _this.resetWhenHangup()
                })
                // 被叫接受的通知
                _this.netcall.on('callAccepted', function(obj) {
                  console.log('对方接听成功')
                  type = obj.type
                  _this.isShogun = false
                  _this.netcall
                    .startDevice({
                      type: Netcall.DEVICE_TYPE_AUDIO_IN
                    })
                    .then(function() {
                      // 通知对方自己开启了麦克风
                      _this.netcall.control({
                        command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
                      })
                    })
                    .catch(function(err) {
                      console.log('启动麦克风失败')
                      console.log(err)
                    })
                  // 设置本地音量采集大小, 该API可以在通话过程中动态调用调整自己的音量采集大小
                  _this.netcall.setCaptureVolume(255)
                  // 设置本地音量播放大小, 该API可以在通话过程中动态调用调整自己的音量播放大小(即自己听对端的音量)
                  _this.netcall.setPlayVolume(255)
                  // 开启本地音频播放
                  _this.netcall
                    .startDevice({
                      type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
                    })
                    .then(() => {
                      _this.showLoadingTime = false
                      _this.isDial = true
                    })
                    .catch(function(err) {
                      console.log('播放对方的声音失败')
                    })
                })
                // 挂断通知
                _this.netcall.on('hangup', obj => {
                  console.log('挂断了')
                  if (!_this.beCalledInfo || _this.beCalledInfo.channelId === obj.channelId) {
                    // 清理工作
                    _this.hangup()
                    _this.resetWhenHangup()
                  }
                })
              }
              // 获取当前登录用户资料
              function onMyInfo(info) {
                console.log('用户资料' + JSON.stringify(info))
                _this.userInfo = info
              }
            })
        }
      })
  },
  components: {
    leftBar,
    leftMenu,
    userInfo,
    chatView,
    inputBox,
    historyRecord,
    audioPage,
    ugtUserTel
  },
  methods: {
    //设置最大化 /还原
    ugtUserTelRun(num) {
      this.ugtUserTelShow = true
      this.ugtUserTelNumber = num
    },
    maxBig() {
      if (commonJs.isIpc()) {
        if (this.isBig == 0) {
          ipc.send('window-max')
          this.isBig = 1
          localStorage.setItem('isBig', 1)
        } else {
          ipc.send('window-restore')
          this.isBig = 0
          localStorage.setItem('isBig', 0)
        }
      }
    },
    //设置最小化
    minSmall() {
      if (commonJs.isIpc()) {
        ipc.send('window-min')
      }
    },
    // 关闭聊天框
    close() {
      if (commonJs.isIpc()) {
        ipc.send('window-close')
      }
    },
    hideModel() {
      // this.$refs.goHide.hideAlert();
    },
    isInitUnreadMsgCount() {
      var _this = this
      function count() {
        var sess
        var sessMap = webim.MsgStore.sessMap()
        var num = 1
        console.log(sessMap)
        for (var key in sessMap) {
          for (var i = 0; i < _this.recentContactsArr.length; i++) {
            if (sessMap[key]._impl.id == _this.recentContactsArr[i].To_Account) {
              if (sessMap[key]._impl.unread) {
                num++
              }
            }
          }
        }
        console.log(num)
        if (num > 1) {
          return
        } else {
          document.title = 'webim'
          clearInterval(window.newsTimer)
        }
      }
      setTimeout(() => {
        webim.syncMsgs(count)
      }, 300)
    },
    sendPictureBoxHide() {
      this.sendPictureBoxShow = false
    },
    encodePhoneFn(phone, isXitong) {
      //获取加密电话
      this.encodePhone = phone
      if (isXitong) this.isXiTongTongZhi = true
    },
    userIdFn(id) {
      this.user_id = id
    },
    addCustomerTopFn(json) {
      var isHave = false
      this.customerTopJson.unshift(json)
      for (var i = 1; i < this.customerTopJson.length; i++) {
        if (this.customerTopJson[i].chat_account == json.chat_account) {
          this.customerTopJson.splice(i, 1)
        }
      }
      for (var i = 0; i < this.recentContactsArr.length; i++) {
        if (this.recentContactsArr[i].To_Account == json.chat_account) {
          var arr = this.recentContactsArr.splice(i, 1)
          this.recentContactsArr.splice(0, 0, arr[0])
          isHave = true
        }
      }
      if (!isHave) this.recentContactsArr.unshift(json)
    },
    sendMsgAdvance(id) {
      for (var i = 0; i < this.customerTopJson.length; i++) {
        if (this.customerTopJson[i].chat_account == id) {
          return false
        }
      }
      for (var i = 0; i < this.recentContactsArr.length; i++) {
        if (this.recentContactsArr[i].To_Account == id) {
          var arr = this.recentContactsArr.splice(i, 1)
          this.recentContactsArr.splice(this.customerTopJson.length, 0, arr[0])
        }
      }
    },
    updateNote(data) {
      //备注与用户资料同步更新
      this.$refs.goHide.changeRemark(data)
    },
    deleteCustomerTopFn(id) {
      // this.customerTopJson.unshift(json);
      console.log(this.customerTopJson)
      for (var i = 0; i < this.customerTopJson.length; i++) {
        if (this.customerTopJson[i].chat_account == id) {
          this.customerTopJson.splice(i, 1)
        }
      }
      for (var i = 0; i < this.recentContactsArr.length; i++) {
        if (this.recentContactsArr[i].To_Account == id) {
          var arr = this.recentContactsArr.splice(i, 1)
          this.recentContactsArr.splice(this.customerTopJson.length, 0, arr[0])
          return
        }
      }
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

      //先检查图片类型和大小
      if (!this.checkPic(uploadFile, fileSize)) {
        return
      }

      //预览图片
      var reader = new FileReader()
      var preDiv = document.getElementById('previewPicDiv')
      reader.onload = (function(file) {
        return function(e) {
          preDiv.innerHTML = ''
          var span = document.createElement('span')
          span.innerHTML =
            '<img style="max-width:200px" class="img-responsive" src="' + this.result + '" alt="' + file.name + '" />'
          //span.innerHTML = '<img class="img-thumbnail" src="' + this.result + '" alt="' + file.name + '" />';
          preDiv.insertBefore(span, null)
        }
      })(file)
      //预览图片
      reader.readAsDataURL(file)
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
      if (!file) {
        this.$message('请选择一张图片')
        return
      }
      console.log(file)
      var opt = {
        file: file, //图片对象
        onProgressCallBack: _this.onProgressCallBack, //上传图片进度条回调函数
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
    submitImage2(file) {
      //复制粘贴发送图片使用
      var _this = this
      var businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG //业务类型，1-发群图片，2-向好友发图片
      // if (selType == SessionType.C2C) {//向好友发图片
      //     businessType = webim.Upload_Pic_Bussiness_Type.C2C_MSG;
      // } else if (selType == SessionType.GROUP) {//发群图片
      //     businessType = webim.Upload_Pic_Bussiness_Type.GROUP_MSG;
      // }
      //封装上传图片请求
      var opt = {
        file: file, //图片对象
        // onProgressCallBack: _this.onProgressCallBack, //上传图片进度条回调函数
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
          _this.$message({
            message: '图片正在上传，请耐心等候！',
            type: 'success'
          })
          _this.sendPic(resp, file.name)
        },
        function(err) {
          alert(err.ErrorInfo)
        }
      )
    },
    onProgressCallBack(loadedSize, totalSize) {
      //上传图片的进度
      //上传图片进度条
      this.updProgressWidth = (loadedSize / totalSize) * 140 + 'px'
      if (loadedSize / totalSize == 1) {
        this.sendPictureBoxShow = false
        this.updProgressWidth = null
      }
    },
    //检查文件类型和大小
    checkPic(obj, fileSize) {
      var picExts = 'jpg|jpeg|png|bmp|gif|webp'
      var photoExt = obj.value.substr(obj.value.lastIndexOf('.') + 1).toLowerCase() //获得文件后缀名
      var pos = picExts.indexOf(photoExt)
      if (pos < 0) {
        this.$alert('您选中的文件不是图片，请重新选择', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return false
      }
      fileSize = Math.round((fileSize / 1024) * 100) / 100 //单位为KB
      if (fileSize > 30 * 1024) {
        this.$alert('您选择的图片大小超过限制(最大为30M)，请重新选择', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return false
      }
      return true
    },
    //发送图片消息
    sendPic(images, imgName) {
      var _this = this
      var selToID = this.$store.getters.sessionIdGetter
      var selSess = this.$store.getters.selSessGetter
      var selType = this.$store.getters.selTypeGetter
      var friendHeadUrl = ''
      if (!selToID) {
        _this.$alert('您还没有好友，暂不能聊天', '提示', {
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
            if (
              data.data.canChat == '0'
              // data.data.canChat == '0'&& parseInt(brm_userId) != 110354224762221 && parseInt(brm_userId) != 110354224762220 && parseInt(brm_userId) != 110354224754518 && parseInt(brm_userId) != 110354224754775
            ) {
              _this.$alert('你已经与该客户解除授权关系，不能发送消息。', '提示', {
                confirmButtonText: '确定'
              })
              _this.resendMsging = false
              return
            }
          }
          webim.sendMsg(
            msg,
            function(resp) {
              if (selType == webim.SESSION_TYPE.C2C) {
                //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
                _this.$emit('addMsg', msg)
                _this.historyMsgList.push(msg)
                console.log(_this.historyMsgList)
                _this.chatViewScrollBotton()
              }
            },
            function(err) {
              alert(err.ErrorInfo)
            }
          )
        }
      )
    },
    // 消息列表组件点击传回当前点击的数据
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      this.selectInfo = childValue
    },

    chatViewScrollBotton() {
      if (this.$refs.chatViewFn) setTimeout(this.$refs.chatViewFn.scrollBottom, 100)
    },
    inputBoxresendMsg(resendMsg) {
      console.log(this.$refs.inputBoxFn)
      this.$refs.inputBoxFn.submitMessage(resendMsg)
    },
    //切换用户 选中状态的会话  消息设置为已读 历史记录容器为空  获取历史记录 把上一次用于下次向前拉取历史消息参数为空
    setAutoRead(selSess, type) {
      if (!type) {
        //历史记录容器为空
        this.historyMsgList = []
        //获取当前会话的历史记录
        this.getHistoryMsgCallback()
        //把上一次用于下次向前拉取历史消息参数为空
        this.getPrePageC2CHistroyMsgInfoMap = {}
      }
      //消息设置为已读
      webim.setAutoRead(selSess, true, true)
    },
    getHistoryMsgCallback() {
      //获取历史记录
      if (this.isLoadHistoryMsg) return
      this.isLoadHistoryMsg = true
      var _this = this
      var lastMsgTime
      var msgKey
      var tempInfo = this.getPrePageC2CHistroyMsgInfoMap[_this.$store.getters.sessionIdGetter]

      if (tempInfo) {
        lastMsgTime = tempInfo.LastMsgTime
        msgKey = tempInfo.MsgKey
      }

      var options = {
        Peer_Account: _this.$store.getters.sessionIdGetter, //好友帐号
        MaxCnt: 15, //拉取消息条数
        LastMsgTime: lastMsgTime || 0, //最近的消息时间，即从这个时间点向前拉取历史消息
        MsgKey: msgKey
      }

      webim.getC2CHistoryMsgs(options, function(resp) {
        var complete = resp.Complete
        _this.historyMsgList = resp.MsgList.concat(_this.historyMsgList)
        console.log(_this.historyMsgList)
        _this.getPrePageC2CHistroyMsgInfoMap[_this.$store.getters.sessionIdGetter] = {
          //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
          LastMsgTime: resp.LastMsgTime,
          MsgKey: resp.MsgKey
        }

        _this.isLoadHistoryMsg = false
        if (resp.MsgList[0]) {
          var selSess = resp.MsgList[0].getSession()
          //消息已读上报，并将当前会话的消息设置成自动已读
          webim.setAutoRead(selSess, true, true)
        }
      })
    },
    getInputMsg(msg, key = 'To_Account') {
      //消息框发送的消息
      this.historyMsgList.push(msg)
      //实时在左边栏显示时间信息
      var haveToAccount = commonJs.queryArray(this.recentContactsArr, key, msg.sess._impl.id)

      var topJsonhaveToAccount = commonJs.queryArray(this.customerTopJson, 'chat_account', msg.sess._impl.id)
      console.log(topJsonhaveToAccount)

      if (haveToAccount.isHave) {
        this.recentContactsArr[haveToAccount.index].MsgShow = msg.elems[0].content.text || msg.elems[0].content.data
        this.recentContactsArr[haveToAccount.index].MsgTimeStamp = msg.time
      }

      //发送消息把用户推到会话列表第一位
      for (var i = 0; i < this.recentContactsArr.length; i++) {
        if (this.recentContactsArr[i].To_Account == msg.sess._impl.id) {
          for (var j = 0; j < this.customerTopJson.length; j++) {
            if (this.customerTopJson[j].chat_account != msg.sess._impl.id && !topJsonhaveToAccount.isHave) {
              var arr = this.recentContactsArr.splice(i, 1)
              this.recentContactsArr.splice(this.customerTopJson.length, 0, arr[0])
            }
          }
        }
      }
    },
    //切换选择人情况输入内容
    clearInputPageMsgFn() {
      this.$refs.inputBoxFn.clearInputMsg()
    },
    // 当前选选中用户的昵称
    changchatViewTopNameFn(name, audioName) {
      //消息面板用户的名称
      this.activeUserHxsName = name
      this.$store.commit('changeSelNikename', audioName)
    },
    // 左侧消息列表加载完成之后触发的事件
    hideLoading(value) {
      this.hideMasker = false
    }, //删除会话信息
    delChat(json) {
      var _this = this
      var sessType = this.$store.getters.selTypeGetter
      var selSess = this.$store.getters.selSessGetter

      if (sessType == 'C2C') {
        sessType = 1
        webim.setAutoRead(selSess, true, false)
      } else {
        // sessType = 2;
        // webim.groupMsgReaded({
        //     "GroupId": to_id,
        //     "MsgReadedSeq": selSess._impl.curMaxMsgSeq
        // })
      }
      var data = {
        To_Account: json.to_id,
        chatType: sessType
      }
      webim.deleteChat(data, function(resp) {
        //会话列表删除
        for (let i = 0; i < _this.recentContactsArr.length; i++) {
          if (_this.recentContactsArr[i].To_Account == json.to_id) {
            _this.recentContactsArr.splice(i, 1)
          }
        }

        // 置顶列表删除
        for (let i = 0; i < _this.customerTopJson.length; i++) {
          if (_this.customerTopJson[i].chat_account == json.to_id) {
            _this.customerTopJson.splice(i, 1)
          }
        }

        if (json.to_id == _this.$store.getters.sessionIdGetter) {
          //历史记录容器为空
          _this.historyMsgList = []

          //把上一次用于下次向前拉取历史消息参数为空
          _this.getPrePageC2CHistroyMsgInfoMap = {}

          _this.user_id = null

          _this.$store.commit('changeSessionId', null)
        }

        //后台置顶该用户数据删除
        axios
          .get('https://api.hxsapp.com/im/Chat/、', {
            params: {
              brm_adviser_id: sessionStorage.getItem('brm_userId'),
              encode_phone: json.setTopPhone,
              type: 'delete'
            }
          })
          .then(res => {})

        _this.activeUserHxsName = null
      })
    },
    // 获取用户设置的快捷键
    getSetting() {
      var brm_userId = sessionStorage.getItem('brm_userId') || false
      axios
        .get('https://api.hxsapp.com/im/Chat/getAdviserConfig', {
          params: {
            brm_adviser_id: brm_userId
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            if (res.data.data) {
              if (res.data.data.send_shortcuts == '17,13') {
                this.value = 'Ctrl+Enter'
              } else if (res.data.data.send_shortcuts == '13') {
                this.value = 'Enter'
              }
              localStorage.setItem('keyCode', res.data.data.send_shortcuts)
            } else {
              this.value = 'Ctrl+Enter'
              localStorage.setItem('keyCode', '17,13')
            }
          }
        })
    },
    filterMsg() {
      //需要过滤的新消息内容
      this.filterMsgArr = [
        'Hi~ 欢迎加入好享瘦大家庭，我是瘦身小秘书~ 你遇到任何问题都可以直接联系我，比如找减肥方法，咨询顾问，领取活动福利，瘦身过程跟踪等，我会尽力帮你解决！祝亲爱哒速速变瘦变美，在好享瘦玩的愉快哦~',
        '你好，我是好享瘦的瘦身顾问，有什么可以帮到你么？'
      ]
    },
    // 获取到用户网页云信信息
    getAudioInfo() {
      var brm_userId = this.$store.getters.sessionIdGetter
      axios
        .get('https://api.hxsapp.com/im/YunXinIM/token', {
          params: {
            openim_account: brm_userId
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            if (res.data.data) {
              this.Hammer(res.data.data.openim_account, brm_userId)
            }
          }
        })
        .catch(err => {
          console.log('获取用户语音信息失败')
        })
    },
    // 拨打语音
    Hammer(accid, brm_userId) {
      console.log(accid)
      let that = this
      if (!that.netcall) {
        that.$message.error('语音初始化失败')
        return
      }
      that.pcAgentLoading = true
      that.netcall
        .initSignal()
        .then(function() {
          console.log('初始化信道成功')
          that.pcAgentLoading = false
          that.signalInited = true
          that.audioUserId = brm_userId
        })
        .then(() => {
          that.netcall
            .call({
              type: that.Netcall.NETCALL_TYPE_AUDIO,
              account: accid,
              pushConfig: {
                custom: ''
              },
              sessionConfig: {},
              webrtcEnable: true
            })
            .then(function(obj) {
              console.log('发起成功')
              // 成功发起呼叫
              that.showAudio = true
              that.isShogun = true
              that.isDial = true
              that.audioUserInfo = {
                nickName: that.$store.getters.selNikenameGetter,
                avatar: that.$store.getters.selHeadSrcGetter
              }
            })
            .catch(function(err) {
              // 被叫不在线
              if (err.event.code === 11001) {
                that.$message.error('对方不在线')
                that.isShogun = false
                that.hangup()
                return
              }
            })
          // 设置超时计时器
          that.callTimer = setTimeout(function() {
            if (!that.netcall.callAccepted) {
              that.$message.error('暂无人接听')
              that.sendAudioMsg()
              that.isShogun = false
              $('#audio_music').attr('src', 'http://misc.hxsapp.com/impc/avchat_no_response.mp3')
              that.hangup()
            }
          }, 1000 * 30)
        })
        .catch(function(err) {
          console.log('信道出错', err)
          if (err.errorType == 'agent_empty' || err.errorType == 'agent_update' || err.code == 'noConnection') {
            let title = ''
            err.errorType == 'agent_empty' || err.code == 'noConnection'
              ? (title = '请安装插件PC Agent，方可使用音频功能')
              : (title = '请更新插件PC Agent，方可使用音频功能')
            that
              .$confirm(title, '插件提示', {
                confirmButtonText: '下载',
                cancelButtonText: '取消',
                type: 'warning'
              })
              .then(() => {
                window.location.href =
                  'https://yx-web-nosdn.netease.im/package/1536666437/WebAgent_Setup_V2.8.0.906.zip?download=WebAgent_Setup_V2.8.0.906.zip'
              })
          }
          that.pcAgentLoading = false
          that.signalInited = false
        })
    },
    // 触发拨打语音
    dialEvent(data) {
      this.getAudioInfo()
    },
    // 语音组件触发父级方法
    childEvent(data) {
      var that = this
      that.pcAgentLoading = true
      that.netcall
        .initSignal()
        .then(function() {
          console.log('初始化信道成功')
          that.pcAgentLoading = false
          that.signalInited = true
        })
        .then(() => {
          if (data.type == 'answer') {
            that.netcall
              .response({
                accepted: true,
                beCalledInfo: that.beCalledInfo,
                sessionConfig: that.sessionConfig
              })
              .catch(function(err) {
                that.$message.error('接听失败')
                that.netcall.response({
                  accepted: false,
                  beCalledInfo: that.beCalledInfo
                })
                that.hangup()
              })
          }
          if (data.type == 'refuse') {
            if (!that.isDial) {
              // 拒绝语音
              that.netcall.response({
                accepted: false,
                beCalledInfo: that.beCalledInfo
              })
            }
            that.hangup()
          }
        })
        .catch(function(err) {
          that.signalInited = false
          that.netcall.response({
            accepted: false,
            beCalledInfo: that.beCalledInfo
          })
          that.hangup()
          // 做清理工作
          that.resetWhenHangup()
          if (err.errorType == 'agent_empty' || err.errorType == 'agent_update' || err.code == 'noConnection') {
            let title = ''
            err.errorType == 'agent_empty' || err.code == 'noConnection'
              ? (title = '请安装插件PC Agent，方可使用音频功能(安装完成后请按F5刷新)')
              : (title = '请更新插件PC Agent，方可使用音频功能(安装完成后请按F5刷新)')
            that
              .$confirm(title, '插件提示', {
                confirmButtonText: '下载',
                cancelButtonText: '取消',
                type: 'warning'
              })
              .then(() => {
                window.location.href =
                  'https://yx-web-nosdn.netease.im/package/1536666437/WebAgent_Setup_V2.8.0.906.zip?download=WebAgent_Setup_V2.8.0.906.zip'
              })
          }
          if (err.errorType == 'agent_empty') {
            that.$alert('插件被占用，请先关闭其他通话', '提示', {
              confirmButtonText: '确定'
            })
          }
          that.pcAgentLoading = false
        })
    },
    // 挂断语音
    hangup() {
      clearTimeout(this.callTimer)
      this.netcall.hangup()
      this.showAudio = false
      this.beCalledInfo = null
      this.beCalling = false
      this.isShogun = false
      this.isDial = false
      // 停止设备麦克风
      this.netcall.stopDevice()
      // 停止设备
      this.netcall.stopSignal()
    },
    // 挂断语音之后的清理
    resetWhenHangup() {
      this.beCalledInfo = null
      this.beCalling = false
      this.isShogun = false
      this.isDial = false
      clearTimeout(this.callTimer)
      // 停止设备麦克风
      this.netcall.stopDevice()
    },
    // 语音挂断后的消息触发
    sendAudioMsg() {
      let that = this
      var selSess = new webim.Session(
        webim.SESSION_TYPE.C2C,
        that.audioUserId,
        that.audioUserId,
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
      //消息为纯文本格式

      text_obj = new webim.Msg.Elem.Text('未接通')
      msg.addText(text_obj)
      webim.sendMsg(
        msg,
        function(resp) {
          if (that.audioUserId == that.$store.getters.sessionIdGetter) {
            that.getInputMsg(msg)
          }
          that.chatViewScrollBotton()
        },
        function(resp) {
          msg.resendMsg = true
          if (that.audioUserId == that.$store.getters.sessionIdGetter) {
            that.getInputMsg(msg)
          }
          that.chatViewScrollBotton()
        }
      )
    }
  }
}
</script>
<style>
#bigPicDiv {
  position: relative;
}
#bigPicDiv .btn {
  width: 200px;
  position: absolute;
  left: 50%;
  bottom: 30px;
  margin-left: -100px;
  background-color: rgba(51, 51, 51, 0.7);
    border-radius: 20px;
    width: 180px;
    height: 40px;
    display:flex;
    display:-webkit-flext;
    display:-ms-flexbox;
    vertical-align:middle;
    -webkit-align-items:center;
    align-items:center;
    -ms-flex-align:center;
}
#bigPicDiv .head2 {
position: relative;
height: 40px;
line-height: 40px;
background-color: white;
width: 100%;
z-index: 999;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.12);
}
#bigPicDiv .box{
  position: relative;
  max-width:790px;
  width: 100%;
  max-height: 750px;
    min-height: 650px;
  height:auto;
background:rgba(255,255,255,1);
border-radius:4px;
overflow: hidden;
}
#bigPicDiv  .shade-box{
  width: 100%;
  height: 100%;
  width: 100%;
    height: 100%;
    max-height: 512px;
    position: absolute;
    height: auto;
    min-height: 600px;
}
#bigPicDiv  .img-r{
   position: relative;
   max-height: 512px;
   width: 100%;
   height: auto;

   cursor: pointer;
}
#bigPicDiv .head2 img{
  width: 20px;
    float: right;
    height: 20px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
   
}
#bigPicDiv .btn span,
#bigPicDiv .btn em {
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 20px;
  background: url(../assets/img/small.png) left top no-repeat;
  background-size: 100%;
  cursor: pointer;
}
#bigPicDiv .btn em {
  width: 28px;
    height: 28px;
    float: left;
    margin-top: 3px;
  margin-right: 20px;
  background: url(../assets/img/rotate.png) left top no-repeat;
  background-size: 100%;
  cursor: pointer;
}
#bigPicDiv .btn i {
  width: 32px;
  height: 32px;
  float: left;
  background: url(../assets/img/down.png) left top no-repeat;
  background-size: 100%;
  cursor: pointer;
}

#bigPicDiv .img-thumbnail {
  margin: 0 auto;
}

#bigPicDiv .btn .big {
  background: url(../assets/img/big.png) left top no-repeat;
  background-size: 100%;
  margin-left: 35px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.friend-List {
  width: 250px;
}
.friend-center {
  width: calc(100% - 250px);
}
.loadingMask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: #f5f5f8;
}
.center-header {
  padding: 0 15px;
  line-height: 65px;
  height: 65px;
  z-index: 9;
}
.center-header .iconfont {
  font-size: 1.5em;
  color: #888;
  margin-right: 20px;
}
.center-header .iconfont:last-of-type {
  margin-right: 0px;
}
.user-box {
  width: 30%;
  min-width: 280px;
  height: calc(100% - 1px);
  overflow-x: auto;
}

.message-header-title .title-name {
  font-size: 20px;
  color: #000;
  cursor: inherit;
}
.message-header-title .title-fenzu {
  font-size: 12px;
  color: #666;
  padding-left: 5px;
  cursor: inherit;
}

.foot-left {
  position: relative;
  align-items: none !important;
}
.bottom-box {
  position: absolute;
  left: 0;
  bottom: 0;
}
#bigPicDiv {
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.6); */
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.loading-pcAgent {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
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
  }
}
.layer {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  .sendPictureBox {
    width: 70%;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    position: absolute;
    left: 50%;
    margin-left: -35%;
    top: 50px;
    border-radius: 6px;
    .title {
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
      span {
        height: 25px;
        line-height: 25px;
        float: left;
        margin-left: 15px;
      }
      em {
        width: 20px;
        height: 20px;
        float: right;
        background: url(../assets/img/close-color.png) left top no-repeat;
        background-size: 100%;
        margin-right: 15px;
        cursor: pointer;
      }
    }
    .content {
      ul {
        padding-top: 20px;
        li {
          span {
            width: 98px;
            height: 27px;
            line-height: 27px;
            float: left;
            text-align: right;
            margin-right: 30px;
            margin-bottom: 15px;
          }
          .upd_progress {
            width: 140px;
            // width: 140px;
            height: 14px;
            border: solid 1px #428bca;
            float: left;
            margin-top: 6px;
            em {
              width: 0%;
              height: 100%;
              display: block;
              background: #ccc;
            }
          }
        }
      }
    }
    .bottom {
      padding: 19px 20px 20px;
      margin-top: 15px;
      border-top: 1px solid #e5e5e5;
      a {
        padding: 6px 12px;
        font-size: 14px;
        text-align: center;
        float: right;
        border-radius: 4px;
        &.send {
          color: #ffffff;
          background-color: #428bca;
          border-color: #357ebd;
        }
        &.colse {
          color: #333333;
          background-color: #ffffff;
          border-color: #cccccc;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

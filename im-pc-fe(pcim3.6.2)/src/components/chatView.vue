<template >
  <div id="chatContainer" v-if="newHistoryMsgList"> 
    <ul class="clearfix">
      <li class="ordinary clearfix" :class="item.isSend? 'myChat':'otherChat'" v-for="(item,index) in newHistoryMsgList" :key="index" v-if="item.fromAccount != 'hxs-xitongtongzhi'">
        <div class="time">
          <span>{{momentJs(item.time)}}</span>
        </div>
        <div class="clearfix">
          <div class="user-img-send">
            <img :src="activeHeadUrl" alt="" v-if="!item.isSend">
          </div>
          <div v-if="!item.isSend" class="withdrawBox clearfix">
            <div v-html="convertMsgtoHtml(item)" class="content" :class="{changeColor:(item.elems[0].type == 'TIMFaceElem' && testMsgType(item.elems[0].content.data))}">
            </div>
            <div class="rightKey rightKey_add">
              <span class="downImg" @click="downloadImage(item.elems[0].content.ImageInfoArray[2].url)" v-if="item.elems[0].type == 'TIMImageElem'">下载图片</span>
            </div>
          </div>
          <div class="user-img-unsend">
            <img :src="loginInfoHeadurl" alt="" v-if="item.isSend">
          </div>
          <div :class="{changeColor:(item.elems[0].type == 'TIMFaceElem' && testMsgType(item.elems[0].content.data))}" v-if="item.isSend" class="content withdrawBox" :data-time="item.time">
            <p v-html="convertMsgtoHtml(item)"></p>
            <div class="rightKey">
              <span class="withdraw">撤回</span>
              <span class="downImg" @click="downloadImage(item.elems[0].content.ImageInfoArray[2].url)" v-if="item.elems[0].type == 'TIMImageElem'">下载图片</span>
            </div>
          </div>
          <div class="resend" v-if="item.isSend && item.resendMsg" @click="resendMsgFn(item,index)">!</div>
        </div>
        <div class="withdrawTip" v-if="item.isSend">PC端暂不支持消息撤回，您可使用好享瘦App撤回此条消息，可撤回时限为2分钟。</div>
      </li>
      <li class="system clearfix" v-for="(item,index) in newHistoryMsgList" v-if="item.fromAccount == 'hxs-xitongtongzhi'" :key="index">
        <div v-if="changerString(item.elems[0].content.text,6) != 'afterSaleSystemNotice' && changerString(item.elems[0].content.text,6) != 'paymentSystemNotice'">
          <div class="time">
            <span>{{momentJs(item.time)}}</span>
          </div>
          <div class="user-img">
            <img :src="activeHeadUrl" alt="" class="headImg">
          </div>
          <div class="right">
            <p>{{ changerString(item.elems[0].content.text,0) }}</p>
            <div class="card max_70" @click="getOpenim(changerString(item.elems[0].content.text,5), changerString(item.elems[0].content.text,4))">
              <div class="top clearfix">
                <img :src="changerString(item.elems[0].content.text,3)" alt="">
                <span class="name">{{changerString(item.elems[0].content.text,1)}}</span>
                <span class="age">{{changerString(item.elems[0].content.text,2)}}</span>
              </div>
              <span class="bottom">个人名片</span>
            </div>
          </div>
        </div>
        <div class="notice" v-if="changerString(item.elems[0].content.text,6) == 'afterSaleSystemNotice' || changerString(item.elems[0].content.text,6) == 'paymentSystemNotice'">
          <div class="time">
            <span>{{momentJs(item.time)}}</span>
          </div>
          <div class="user-img">
            <img :src="activeHeadUrl" alt="" class="headImg">
          </div>
          <div class="right">
            <!-- <p>{{ changerString(item.elems[0].content.text,3) }}</p> -->
            <div class="card mt0" @click="getOpenim(changerString(item.elems[0].content.text,5), changerString(item.elems[0].content.text,4))">
              <div class="top clearfix">
                <img :src="changerString(item.elems[0].content.text,1)" alt="">
                <div class="list">
                  <span class="notice_name">{{changerString(item.elems[0].content.text,0)}}</span>
                  <span class="notice_num" @click.stop="">{{changerString(item.elems[0].content.text,2)}}</span>
                </div>
              </div>
              <div class="bottom" :class="{colorRed:changerString(item.elems[0].content.text,6) == 'afterSaleSystemNotice'}"><em v-if="changerString(item.elems[0].content.text,6) == 'afterSaleSystemNotice'"></em>{{changerString(item.elems[0].content.text,3)}}</div>
              <!-- 方萍||https://hxsapp-oss.hxsapp.com/public/image/default_head_img_new.png||订单号：1321345646||您的客户已经联系售后部门，有投诉风险，请知悉！||||||afterSaleSystemNotice -->
              
              <!-- 方萍||https://hxsapp-oss.hxsapp.com/public/image/default_head_img_new.png||订单号：1321345646||您的客户已经联系售后部门，有投诉风险，请知悉！||||||afterSaleSystemNotice -->
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import commonJs from '@/util/common.js'
export default {
  name: 'chatView',
  props: {
    historyMsgList: {
      type: Array,
      default: function() {}
    },
    loginInfoHeadurl: {
      type: String,
      default: function() {}
    }
  },
  watch: {
    historyMsgList(val) {
      //主要监听新消息
      this.newHistoryMsgList = this.historyMsgList
      console.log(this.newHistoryMsgList)
    },
    '$store.getters.selHeadSrcGetter'(val) {
      //聊天框头像
      this.activeHeadUrl = val
    }
  },
  data() {
    return {
      newHistoryMsgList: null,
      activeHeadUrl: null,
      withdraw: false
    }
  },
  mounted() {
    this.newHistoryMsgList = this.historyMsgList;
    this.activeHeadUrl = this.$store.getters.selHeadSrcGetter;
    this.scrollTop();
    this.withdrawStyle();
    this.clickImgTip();
  },
  methods: {
    resendMsgFn(val, index) {
      //消息重发
      this.$emit('resendMessage', val)
      //重发删除历史记录的消息，在重新发送添加回来
      this.newHistoryMsgList = this.newHistoryMsgList.splice(index, 1)
    },
    scrollBottom() {
      //消息框滚动条到底部函数
      this.$nextTick(() => {
        setTimeout(() => {
          var scrollHeight = $('#chatContainer ul').height()
          $('#chatContainer').scrollTop(scrollHeight)
        }, 300)
      })
    },
    scrollTop() {
      //上拉加载历史消息记录
      var _this = this
      this.$nextTick(() => {
        $('#chatContainer').scroll(function() {
          if ($('#chatContainer').scrollTop() <= 0) {
            var old = $('#chatContainer ul').height()
            _this.$emit('scroll')
            setTimeout(() => {
              // alert($('#chatContainer ul').height()-old);
              $('#chatContainer').scrollTop($('#chatContainer ul').height() - old)
            }, 300)
          }
        })
      })

      // $('#chatContainer').scrollTop($('#chatContainer').height());
    },
    convertMsgtoHtml(msg) {//解析文本消息
      var _this = this
      var html = '',
        elems,
        elem,
        type,
        content
      elems = msg.getElems() //获取消息包含的元素数组
      var count = elems.length
      for (var i = 0; i < count; i++) {
        elem = elems[i]
        type = elem.getType() //获取元素类型
        content = elem.getContent() //获取元素对象
        switch (type) {
          case webim.MSG_ELEMENT_TYPE.TEXT:
            //防止发送方使用空格符或者回车键作为号码分割符号
            var reg = /(\s)|(\r)/g;
            var msg = content.text;
            var filtermsg = msg.replace(reg,'');

            //去除空格符或者回车键验证是否是点好号码
            if(commonJs.isPoneAvailable(filtermsg)){
              var regN = /1[345789]\d{9}/g;
              msg = filtermsg.replace(regN,"*** **** ****");
              content.text = msg;
            }

            var eleHtml = _this.convertTextMsgToHtml(content)
            //转义，防XSS
            html += webim.Tool.formatText2Html(eleHtml)
            break
          case webim.MSG_ELEMENT_TYPE.FACE:
            html += this.convertFaceMsgToHtml(content)
            break
          case webim.MSG_ELEMENT_TYPE.IMAGE:
            if (i <= count - 2) {
              var customMsgElem = elems[i + 1] //获取保存图片名称的自定义消息elem
              var imgName = customMsgElem.getContent().getData() //业务可以自定义保存字段，demo中采用data字段保存图片文件名
              html += _this.convertImageMsgToHtml(content, imgName)
              i++ //下标向后移一位
            } else {
              html += _this.convertImageMsgToHtml(content)
            }
            break
          case webim.MSG_ELEMENT_TYPE.SOUND:
            html += _this.convertSoundMsgToHtml(content)
            break
          case webim.MSG_ELEMENT_TYPE.FILE:
            html += _this.convertFileMsgToHtml(content)
            break
          case webim.MSG_ELEMENT_TYPE.LOCATION:
            html += _this.convertLocationMsgToHtml(content)
            break
          case webim.MSG_ELEMENT_TYPE.CUSTOM:
            var eleHtml = _this.convertCustomMsgToHtml(content)
            //转义，防XSS
            html += webim.Tool.formatText2Html(eleHtml)
            break
          case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
            var eleHtml = convertGroupTipMsgToHtml(content)
            //转义，防XSS
            html += webim.Tool.formatText2Html(eleHtml)
            break
          default:
            webim.Log.error('未知消息元素类型: elemType=' + type)
            break
        }
      }
      return html
    },

    //解析文本消息元素
    convertTextMsgToHtml(content) {
      return content.getText()
    },
    //解析表情消息元素
    convertFaceMsgToHtml(content) {
      var faceUrl = null
      var data = content.getData()
      var index = webim.EmotionDataIndexs[data]

      var emotion = webim.Emotions[index]
      if (emotion && emotion[1]) {
        faceUrl = emotion[1]
      }
      if (faceUrl) {
        if (index <= 113) {
          return "<img src='" + faceUrl + "'/ width='25px'>"
        } else {
          return "<img src='" + faceUrl + "'/width='80px'>"
        }
      } else {
        return data
      }
    },
    //解析图片消息元素
    convertImageMsgToHtml(content, imageName) {
      var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL) //小图
      var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE) //大图
      var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN) //原图
      if (!bigImage) {
        bigImage = smallImage
      }
      if (!oriImage) {
        oriImage = smallImage
      }
      return (
        "<img name='" +
        imageName +
        "' src='" +
        smallImage.getUrl() +
        '#' +
        bigImage.getUrl() +
        '#' +
        oriImage.getUrl() +
        "' style='CURSOR: hand' id='" +
        content.getImageId() +
        "' bigImgUrl='" +
        bigImage.getUrl() +
        "' onclick='imageClick(this)'  width='100%' class='changeImages'/>" 
      );
    },
    //解析语音消息元素
    convertSoundMsgToHtml(content) {
      var second = content.getSecond() //获取语音时长
      var downUrl = content.getDownUrl()
      if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl
      }
      return (
        '<audio id="uuid_' +
        content.uuid +
        '" src="' +
        downUrl +
        '" controls="controls" onplay="onChangePlayAudio(this)" preload="none" style="width:150px"></audio>'
      )
    },
    //解析文件消息元素
    convertFileMsgToHtml(content) {
      var fileSize, unitStr
      fileSize = content.getSize()
      unitStr = 'Byte'
      if (fileSize >= 1024) {
        fileSize = Math.round(fileSize / 1024)
        unitStr = 'KB'
      }
      // return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + unitStr + ')</i></a>';

      return (
        '<a href="javascript:;" onclick=\'webim.onDownFile("' +
        content.uuid +
        '")\' title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' +
        content.name +
        '(' +
        fileSize +
        unitStr +
        ')</i></a>'
      )
    },
    //解析位置消息元素
    convertLocationMsgToHtml(content) {
      return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc()
    },
    //解析自定义消息元素
    convertCustomMsgToHtml(content) {
      var data = content.getData() //自定义数据
      var desc = content.getDesc() //描述信息
      var ext = content.getExt() //扩展信息
      return 'data=' + data + ', desc=' + desc + ', ext=' + ext
    },
    momentJs(time) {
      //消息时间展示
      return commonJs.momentJsFn(time)
    },
    testMsgType(msgContent) {
      var expr = /^(\[(fmg|rab)\.([\u4e00-\u9fa5a-z]{1,99})\])$/i
      var re = new RegExp(expr)
      if (re.test(msgContent)) {
        return true
      } else {
        return false
      }
    },
    changerString(str, type) {
      var arr = null
      if (!str) return ''
      arr = str.split('||')
      return arr[type]
    },
    // 获取聊天账号
    getOpenim(userid, phone) {
      axios.post('https://api.hxsapp.com/im/Chat/getUserInfoByEncodePhone?encode_phone=' + phone).then(res => {
        if (!res.data.data) {
          this.$emit('activeEncodePhone', phone, true)
          this.$emit('ugtUserTelShowFn', phone);
        } else {
          axios
            .post(
              'https://api.hxsapp.com/account/userAccount/getOpenIMAccount?user_id=' +
                res.data.data[phone].user_id +
                '&app_name=hxs'
            )
            .then(res => {
              if (res.data.code == '200') {
                var userJson = {
                  To_Account: res.data.data.openim_account,
                  MsgShow: '',
                  MsgTimeStamp: Date.parse(new Date()) / 1000,
                  C2cImage: ''
                }
                this.$store.commit('changeUserInfo', userJson)
                this.$emit('activeEncodePhone', phone)
              } else {
                this.$message.error(res.data.msg)
              }
            })
        }
      })
    },
    clickImgTip(){
        var _this = this; 
        $(document).on('click', '.changeImages', function(){
          setTimeout(()=>{
            _this.$message('拖动到桌面，即可保存图片');
          },400);
        })
    }, 
    downloadImage(imgurl) { 
      var a = $("<a></a>").attr("href", imgurl).attr("download", "img.png").appendTo("body"); 
      a[0].click(); 
      a.remove(); 
    },
    // 右键显示撤回按钮
    withdrawStyle() {
      $(document).on('contextmenu', '.withdrawBox', function(event) {
        $('.rightKey').hide()
        var box = $(this).find('.rightKey')[0]
        box.style.display = 'block';
        box.style.left = event.clientX - $(this).offset().left - 24 + 'px';
        box.style.top = event.clientY - $(this).offset().top - 24 + 'px';

        //超过2分钟不做操作
        var nowTimeStamp = new Date().getTime()
        var timeStamp = $(this).attr('data-time') * 1000
        if (nowTimeStamp - timeStamp < 12000) {
          $('.withdraw').hide();
          var el = $(this).find('.withdraw')[0]
          el.style.display = 'block';

          $(document).on('click', '.withdraw', function(event) {
            var el = $(this)
              .parents('li')
              .find('.withdrawTip')[0]
            el.style.display = 'block'
            $(this).hide()
          })

        }
      })

      $(document).on('click', function() {
        $('.rightKey').hide()
      })
    }
  }
}
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.clearfix {
  padding: 10px 0;
  .user-img-send {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    float: left;
    margin-right: 10px;
    margin-left: 10px;
    overflow: hidden;
    img {
      width: 100%;
      min-height: 45px;
    }
  }
  .user-img-unsend {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    margin-right: 10px;
    margin-left: 10px;
    overflow: hidden;
    float: right;
    img {
      width: 100%;
      min-height: 45px;
    }
  }
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
#chatContainer {
  width: 100%;
  height: 70%;
  background: #f5f5f8;
  overflow: hidden;
  overflow-y: scroll;
  ul {
    width: 100%;
    .system {
      width: 100%;
      float: left;
      margin-bottom: 20px;
      margin-left: 25px;
      .time {
        width: 100%;
        text-align: center;
        font-size: 10px;
        padding: 10px 0;
        color: #fff;
        span {
          padding: 2px 5px;
          height: 18px;
          line-height: 18px;
          background: rgba(129, 141, 207, 0.3);
          border-radius: 2px;
        }
      }
      .headImg {
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 6px;
      }
      .right {
        float: left;
        max-width: 50%;
        overflow: hidden;
        p {
          max-width: 100%;
          font-size: 14px;
          color: #333;
          line-height: 20px;
          padding: 10px 15px;
          background: linear-gradient(315deg, rgba(255, 102, 140, 1) 0%, rgba(255, 166, 185, 1) 100%);
          border-radius: 0px 4px 4px 4px;
          background: #fff;
        }
        .card {
          margin-top: 10px;
          background: #fff;
          padding: 8px;
          padding-right: 15px;
          overflow: hidden;
          cursor: pointer;
          .top {
            border-bottom: solid 1px rgba(129, 141, 207, 0.16);
            img {
              width: 50px;
              height: 50px;
              float: left;
              margin-right: 6px;
            }
            .name {
              height: 50px;
              line-height: 50px;
              font-size: 14px;
              text-align: center;
              color: #333333;
              float: left;
              margin-right: 5px;
            }
            .age {
              height: 50px;
              line-height: 50px;
              font-size: 14px;
              text-align: center;
              color: #333333;
              float: left;
            }
            .notice_name{
              height: 25px;
              line-height: 25px;
              font-size: 12px;
              color: #333333;
              display: block;
              margin-right: 5px;
            }
            .notice_num{
              height: 25px;
              line-height: 25px;
              font-size: 12px;
              text-align: center;
              color: #333333;
              padding-right: 5px;
              display: block;
            }
            .list{
              float:left;
              height: 50px;
            }
          }
          .bottom {
            display: block;
            color: #999999;
            font-size: 14px;
            line-height: 18px;
            margin-top: 3px;
            position: relative;
            em{
              width: 18px;
              height: 18px;
              background: url(../assets/img/B_icon_acceptfailure@2x.png) left top no-repeat;
              background-size: 100%;
              position: absolute;
              left: 0;
              top:1px;
            }
          }
          .colorRed{
            color: #F55449;
            padding-left: 22px;
          } 
        }
        .max_70{
          max-width:70%;
        }
        .mt0{
          margin-top: 0;
        }
      }
    }
    .ordinary {
      width: 100%;
      margin-bottom: 20px;
      float: left;
      position: relative;
      padding-top: 20px;
      .time {
        width: 100%;
        text-align: center;
        font-size: 10px;
        padding: 10px 0;
        color: #fff;
        span {
          padding: 2px 5px;
          height: 18px;
          line-height: 18px;
          background: rgba(129, 141, 207, 0.3);
          border-radius: 2px;
        }
      }
      .content {
        max-width: 50%;
        position: relative;
        // background: linear-gradient(
        //     135deg,
        //     #FFA6B9,
        //     #FF668C
        //   );
        background: #fff;
        color: #333;
        font-size: 14px;
        float: left;
        padding: 8px 10px;
        border-radius: 0 4px 4px 4px;
        margin-top: 15px;
        white-space: normal;
        word-break: break-all;
      }
      &.myChat {
        // max-width:51%;
        float: right;
        img {
          float: right;
        }
        .content {
          margin-right: 5px;
          float: right;
          background: linear-gradient(135deg, rgba(149, 150, 233, 1), rgba(199, 199, 246, 1));
          &.changeColor {
            background: transparent;
          }
          border-radius: 4px 0 4px 4px;
          color: #fff;
        }
      }
    }
  }
  .resend {
    width: 20px;
    height: 20px;
    line-height: 20px;
    float: right;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background-size: 100%;
    cursor: pointer;
    border-radius: 0;
    margin-right: 0;
    background: red;
    border-radius: 50%;
    margin-top: 5px;
    margin-right: 5px;
  }
  .withdrawTip {
    width: 80%;
    padding: 5px;
    color: #999;
    margin: 0 auto;
    font-size: 12px;
    display: none;
    text-align: center;
  }   
  .rightKey{
    width: 60px;
    position: absolute;
    left: 10px;
    top: 24px;
    margin-left: -32px;
    display: none;
  }
  .rightKey_add{
    top: 116px;
    margin-left: 34px;
  }
  .withdraw {
    width: 60px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #657293;
    font-size: 12px;
    background: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    z-index: 10;
    // display: block;
    display: none;
    cursor:pointer;
  }
  .downImg{
    width: 60px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #657293;
    font-size: 12px;
    background: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    z-index: 10;
    display: block;
    cursor:pointer;
  }
}
</style>
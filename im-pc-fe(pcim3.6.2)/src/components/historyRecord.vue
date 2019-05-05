<template>
  <div class="historyRecord" v-if="hideHistory">
    <header class="history-header">
      <div class="history-search flex flex-align-center">
        <span class="search"></span>
        <input type="text" placeholder="搜索" v-model="searchValue">
        <span class="iconfont icon-close history-clsoe" @click="closeHistory"></span>
      </div>
      <div class="tab-box flex ">
        <div class="tab-item " :class="operateIndex=='all'?'historyActive':''" @click="selectOperate('','all')">全部</div>
        <div class="tab-item" :class="index==operateIndex?'historyActive':''" v-for="(item,index) in historyOperate" :key="index" v-if="index<3" @click="selectOperate(item.brm_service_id,index)">{{item.nickname}}</div>
        <div class="tab-item" v-if="historyOperate.length>3" @click="showMore">更多顾问</div>
      </div>
      <div class="more-box tab-box flex  flex-warp" style="display:none">
        <span class="tab-item" v-for="(item,index) in historyOperate" v-if="index>2" :key="index" @click="selectOperate(item.brm_service_id,index)">{{item.nickname}}</span>
      </div>
    </header>
    <!-- 历史记录展示区域 -->
    <div class="history-body" id="history_scroll" v-show="!isSearch">
      <div class="flex history-list" v-for="(item,index) in  historyInfo" :key="index">
        <div class="history-body-avatar">
          <img v-if="item.direction==0" :src="item.user_head_img" alt="">
          <img v-else-if="item.direction==1" :src="item.brm_service_head_img" alt="">
        </div>
        <div class="history-body-right">
          <div class="history-body-usename flex flex-pack-justify">
            <span v-if="item.direction==0">{{item.user_nickname}}</span>
            <span v-else-if="item.direction==1">
              <span v-if="item.brm_service_nickname!=''">{{item.brm_service_nickname}}</span>
              <span v-else>{{item.brm_service_id}}</span>
            </span>
            <span class="history-body-time">{{momentJs(item.chat_time,2)}}</span>
          </div>
          <div class="history-body-text flex flex-align-center flex-warp" v-html="convertMsgtoHtml(item)"></div>
        </div>
      </div>
      <div v-if="noHistoryMore" class="noMore">没有更多数据了</div>
    </div>
    <!-- 历史记录搜索展示区域 -->
    <div class="history-body" id="search_history" v-show="isSearch">
      <div class="flex history-list" v-for="(item,index) in  searchInfo" :key="index">
        <div class="history-body-avatar">
          <img v-if="item.direction==0" :src="item.user_head_img" alt="">
          <img v-else-if="item.direction==1" :src="item.brm_service_head_img" alt="">
        </div>
        <div class="history-body-right">
          <div class="history-body-usename flex flex-pack-justify">
            <span v-if="item.direction==0">{{item.user_nickname}}</span>
            <span v-else-if="item.direction==1">
              <span v-if="item.brm_service_nickname!=''">{{item.brm_service_nickname}}</span>
              <span v-else>{{item.brm_service_id}}</span>
            </span>
            <span class="history-body-time">{{momentJs(item.chat_time,2)}}</span>
          </div>
          <div class="history-body-text flex flex-align-center flex-warp" v-html="convertMsgtoHtml(item)"></div>
        </div>
      </div>
      <div v-if="noSearchMore" class="noMore">没有更多数据了</div>
    </div>
    <!-- <div class="iconfont icon-close  telescopic-btn"></div> -->
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import commonJs from '@/util/common.js'
export default {
  name: 'historyRecord',
  props: {
    userId: {
      type: String,
      default: function() {}
    }
  },
  data() {
    return {
      hideHistory: true,
      isloading: false,
      historyInfo: [],
      historyOperate: [],
      page_depend: 1,
      isSearch: false, // 是否搜索
      searchValue: null, // 搜索关键词
      searchInfo: [], //搜索的的历史数据
      noHistoryMore: false,
      noSearchMore: false,
      brm_service_id: '',
      operateIndex: 'all',
      adviserType:0
    }
  },
  mounted() {
    var that = this
    this.adviserType=sessionStorage.getItem('adviserType')
    this.getOperate()
    $('#history_scroll').scroll(function() {
      if (!that.noHistoryMore) {
        //当时滚动条离底部60px时开始加载下一页的内容
        if ($(this)[0].scrollTop + $(this).height() + 60 >= $(this)[0].scrollHeight) {
          if (!that.isloading) {
            that.isloading = true
            that.getHistory()
          }
        }
      }
    })
    $('#search_history').scroll(function() {
      //当时滚动条离底部60px时开始加载下一页的内容
      if (!that.noSearchMore) {
        if ($(this)[0].scrollTop + $(this).height() + 60 >= $(this)[0].scrollHeight) {
          if (!that.isloading) {
            that.isloading = true
            that.searchHistory('more')
          }
        }
      }
    })
  },
  watch: {
    searchValue(value) {
      this.searchInfo = []
      this.page_depend = 1
      this.noSearchMore = false
      if (value == '') {
        this.searchIndex = null
        this.isSearch = false
      } else {
        this.isSearch = true
        this.searchHistory('once')
      }
    }
  },
  methods: {
    closeHistory() {
      this.$parent.isHistory = false
    },
    // 显示更多顾问
    showMore() {
      $('.more-box').slideToggle()
    },
    // 选择某个顾问
    selectOperate(id, index) {
      if (index == this.operateIndex) return false
      this.operateIndex = index
      this.page_depend = 1
      this.brm_service_id = id
      this.noHistoryMore = false
      this.noSearchMore = false
      this.historyInfo = []
      this.searchInfo = []
      if (this.isSearch) {
        this.searchHistory('once')
      } else {
        this.getHistory()
      }
    },
    // 搜索历史记录
    searchHistory(type) {
      axios
        .get('https://api.hxsapp.com/search/ChatSearch/doSearch', {
          params: {
            user_id: this.userId,
            keyword: this.searchValue,
            page_depend: this.page_depend,
            brm_service_id: this.brm_service_id
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            // 判断是否是第一次搜索
            if (type == 'once') {
              if (res.data.data.list != '') {
                this.searchInfo = res.data.data.list
                this.page_depend++
              } else {
                // 没有更多数据
                this.noSearchMore = true
              }
            } else if (type == 'more') {
              // 判断是否是搜索上拉加载更多数据
              if (res.data.data.list != '') {
                this.searchInfo = this.searchInfo.concat(res.data.data.list)
                this.page_depend++
              } else {
                // 没有更多数据
                this.noSearchMore = true
              }
            }
          } else if (!res.data.data) {
            this.$message.error('搜索失败')
          } else {
            this.$message.error(res.data.msg)
          }
          // 解锁
          this.isloading = false
        })
    },
    // 获取历史记录顾问列表
    getOperate() {
      axios
        .get('https://api.hxsapp.com/search/ChatSearch/getBrmServiceIdByUserId', {
          params: {
            user_id: this.userId,
            page_depend: this.page_depend
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            this.historyOperate = res.data.data.list
            this.getHistory()
          } else if (!res.data.data) {
            this.$message.error('搜索失败')
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 获取历史记录
    getHistory() {
      axios
        .get('https://api.hxsapp.com/search/ChatSearch/doSearch', {
          params: {
            user_id: this.userId,
            keyword: this.searchValue,
            page_depend: this.page_depend,
            brm_service_id: this.brm_service_id
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            if (this.historyInfo == '') {
              if (res.data.data.list != '') {
                this.historyInfo = res.data.data.list
                this.page_depend++
              } else {
                // 没有更多数据
                this.noHistoryMore = true
              }
            } else {
              // 判断是否是搜索上拉加载更多数据
              if (res.data.data.list != '') {
                this.historyInfo = this.historyInfo.concat(res.data.data.list)
                this.page_depend++
              } else {
                // 没有更多数据
                this.noHistoryMore = true
              }
            }
          } else if (!res.data.data) {
            this.$message.error('获取失败')
          } else {
            this.$message.error(res.data.msg)
          }
          // 解锁
          this.isloading = false
        })
    },
    // 聊天记录转换为相应的格式
    convertMsgtoHtml(msg) {
      var _this = this
      var html = '',
        type,
        content = msg.content
      var contentText = JSON.parse(content)
      for (var n = 0; n < contentText.length; n++) {
        type = parseInt(contentText[n].type)
        switch (type) {
          case 0:
            html += _this.convertTextMsgToHtml(contentText[n])
            break
          case 1:
            html += this.convertFaceMsgToHtml(contentText[n])
            break
          case 3:
            html += _this.convertImageMsgToHtml(contentText[n])
            break
          case 2:
            html += _this.convertSoundMsgToHtml(contentText[n])
            break
          case 10:
            html += _this.convertSoundMsgToHtml(contentText[n])
            break
          default:
            webim.Log.error('未知消息元素类型: elemType=' + type)
            break
        }
      }

      return html
    },
    momentJs(time) {
      return commonJs.momentJsFn(time, 2)
    },
    //解析文本消息元素
    convertTextMsgToHtml(content) {
      //防止发送方使用空格符或者回车键作为号码分割符号
      if(this.adviserType=="2"){
        var reg = /(\s)|(\r)/g;
        var msg = content.Text;
        var filtermsg = msg.replace(reg,'');

        //去除空格符或者回车键验证是否是点好号码
        if(commonJs.isPoneAvailable(filtermsg)){
          var regN = /1[345789]\d{9}/g;
          msg = filtermsg.replace(regN,"*** **** ****");
          content.Text = msg;
        }
      }
      content.Text = '<span>' + content.Text + '</span>'
      if (this.searchValue != '') {
        content.Text = content.Text.replace(
          this.searchValue,
          "<span style='color:#FF668C'>" + this.searchValue + '</span>'
        )
      }
      return content.Text
    },
    //解析表情消息元素
    convertFaceMsgToHtml(content) {
      var faceUrl = null
      var data = content.Data
      var index = webim.EmotionDataIndexs[data]
      var emotion = webim.Emotions[index]
      if (emotion && emotion[1]) {
        faceUrl = emotion[1]
      }
      if (faceUrl) {
        if (index < 133) {
          return "<img src='" + faceUrl + "' width='25px'/>"
        } else {
          return "<img src='" + faceUrl + "' width='50px'/>"
        }
      } else {
        return data
      }
    },
    //解析图片消息元素
    convertImageMsgToHtml(content, imageName) {
      return (
        "<div class='history-body-message-img'>"+
         "<img name='" +
        imageName +
        "' src='" +
        content.ImageInfoArray[0].URL +
        "#" +
        content.ImageInfoArray[0].URL +
        "#" +
        content.ImageInfoArray[0].URL +
        "' bigImgUrl='" +
        content.ImageInfoArray[0].URL +
        "' onclick='imageClick(this)' class='messageImg'  width='100%' />" +
        "</div>"
      )
    },
    //解析语音消息元素
    convertSoundMsgToHtml(content) {
      var second = content.Second //获取语音时长
      //   var downUrl = content.getDownUrl();
      if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl
      }
      return '[这是一条语音消息]'
      //   return (
      //     '<audio id="uuid_' +
      //     content.uuid +
      //     '" src="' +
      //     downUrl +
      //     '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>'
      //   );
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
    }
  }
}
</script>
<style lang="less">
.historyRecord {
  position: relative;
  width: 30%;
  min-width: 300px;
}
.history-header {
  width: 100%;
}
.history-search {
  text-align: center;
  padding: 10px 15px;
  position: relative;
}
.history-search-icon {
  position: absolute;
  left: 25px;
  color: #818dcf;
}
.history-clsoe {
  position: absolute;
  right: 20px;
  z-index: 2;
  cursor: pointer;
  color: rgba(129, 141, 207, 0.5);
}
.history-search input {
  width: 100%;
  border: none;
  height: 30px;
  margin: auto;
  line-height: 30px;
  border-radius: 4px;
  padding: 0 15px;
  padding-left: 30px;
  color: #818dcf;
  background: rgba(234, 237, 255, 0.7);
}
.history-search input:focus {
  outline: none;
  border: none;
}
.history-search input::-webkit-input-placeholder {
  color: #818dcf;
  font-size: 12px;
}
.tab-box {
  font-size: 12px;
  border-bottom: 1px #e5e5e5 solid;
}
.tab-item {
  width: 20%;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  text-overflow: ellipsis; //值为clip表示剪切，ellipsis时为显示省略号
  overflow: hidden;
  white-space: nowrap;
  color: #666;
}
.tab-box .tab-item:hover {
  background: rgba(129, 141, 207, 0.16);
}
.historyActive {
  color: rgba(129, 141, 207, 1);
}
.history-body {
  position: absolute;
  width: calc(100% - 8px);
  height: calc(100% - 95px);
  overflow: auto;
  left: 0;
  right: 0;
  margin: auto;
  padding-top: 10px;
}

.history-list {
  padding: 10px;
}
.history-list:last-of-type {
  padding-top: 10px;
}
.history-body-avatar {
  width: 20%;
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  overflow: hidden;
  border-radius: 5px;
}
.history-body-avatar img {
  width: 100%;
}
.history-body-right {
  width: calc(100% - 40px);
}
.history-body-time {
  font-size: 10px;
  color: #999;
}
.history-body-usename {
  font-size: 12px;
  color: #999;
  padding-left: 10px;
}
.history-body-text {
  letter-spacing: 2px;
  padding-bottom: 15px;
  font-size: 12px;
  padding-top: 5px;
  color: #333;
  width: calc(100% - 10px);
  margin-left: 10px;
  border-bottom: 1px rgba(229, 229, 229, 1) solid;
}
.telescopic-btn {
  position: fixed;
  margin-left: -15px;
  background: #fff;
  z-index: 3;
  top: 50%;
  cursor: pointer;
}
.history-body-message-img {
  width: 85%;
  background: rgba(245, 245, 248, 1);
  text-align: center;
  padding: 17px 0;
}
.history-body-message-img img {
  width: 85%;
}
.more-box {
  overflow: auto;
  max-height: 200px;
  background: #fff;
  color: #333;
  padding: 10px 0;
}
.more-box span {
  display: block;
  width: 20%;
  line-height: 30px;
  text-align: center;
}
.noMore {
  text-align: center;
  font-size: 12px;
  color: #888;
}
</style>
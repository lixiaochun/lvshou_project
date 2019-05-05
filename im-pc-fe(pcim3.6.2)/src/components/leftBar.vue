<template>
  <div class="friend-List" id="friend_list">
    <div class="friend-search flex flex-align-center">
      <span class="search"></span>
      <input type="text" placeholder="搜索" v-model="searchValue">
    </div>
    <div class="friend-List-center" @click="hideAlert" v-loading="isLoading" id="search_scroll">
      <div class="list-center-item " v-if="searchValue!=''" v-loading="searchLoading">
        <div class="list-center-li scroll-search">
          <div class="lenght-null" v-if="searchInfo==''">暂无用户</div>
          <div class="li-item-box  flex flex-align-center" v-for="(_item,idx) in searchInfo" :key="idx" @click="searchSelect(idx)">
            <div class="li-img">
              <img :src="_item.head_img" alt="">
            </div>
            <div class="li-user-name">
              <div v-if="_item.brm_username!=''" v-html="_item.brm_username">
                <span v-html="_item.brm_username"></span>
              </div>
              <div class="small-name" v-if="_item.realname!=''">
                真实姓名:
                <span v-html="_item.realname"></span>
              </div>
              <div class="small-name" v-else-if="_item.brm_user_remark!=''" v-html="_item.brm_user_remark">
                昵称:
                <span v-html="_item.brm_user_remark"></span>
              </div>
            </div>
          </div>
          <div class="more-search-loading" v-if="searchMoreLoading">加载中...</div>
        </div>
      </div>
      <div class="list-center-item" v-else>
        <div class="list-center-li">
          <div :class="{'li-item-box flex flex-align-center itemActive line_xi_after': toAccount==item.To_Account,'li-item-box flex flex-align-center line_xi_after': toAccount!=item.To_Account, 'Topping': queryCustomerTopKey(item.To_Account)}" v-for="(item,index) in recentContactsArr" :key="index" @contextmenu.prevent="alertModel($event,hxsUserInfoJson[item.To_Account].encode_phone,item.To_Account)" v-if="hxsUserInfoJson && hxsUserInfoJson[item.To_Account]" @click.stop="selectAccount(item,hxsUserInfoJson[item.To_Account].head_img, hxsUserInfoJson[item.To_Account].display_name, hxsUserInfoJson[item.To_Account].encode_phone,hxsUserInfoJson[item.To_Account].user_id,hxsUserInfoJson[item.To_Account].group_name)">
            <div class="li-img">
              <img :src="hxsUserInfoJson[item.To_Account].head_img" alt="" v-if="hxsUserInfoJson[item.To_Account]">
            </div>
            <span class="unread" v-if="toAccount != item.To_Account && unreadJson['C2C'+item.To_Account] && unreadJson['C2C'+item.To_Account]._impl.unread">{{unreadJson['C2C'+item.To_Account]._impl.unread}}</span>
            <div class="li-user-name">
              <div class="flex flex-pack-justify">
                <span class="message-username" v-if="hxsUserInfoJson[item.To_Account]">{{subStlengthFn(hxsUserInfoJson[item.To_Account].display_name)}}</span>
                <span class="message-time">{{momentJs(item.MsgTimeStamp)}}</span>
              </div>
              <div class="li-user-message">{{filterNum(item.MsgShow)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="model flex" id="model" v-show="showModel">
      <div class="left-model">
        <div class="model-item" v-for="(item,index) in  oneModelList" :key="index" @click.stop="Topping(index)">{{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import commonJs from '@/util/common.js'
import moment from 'moment'
// 引入打包工具
var ipc
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}
export default {
  name: 'leftBar',
  props: {
    recentContactsArr: {
      type: Array,
      default: () => {}
    },
    select: {
      type: [Number, String]
    },
    isAlert: {
      type: Boolean,
      default: () => {}
    },
    unreadJson: Object,
    default: () => {},
    customerTopJson: Array,
    default: () => {},
    isLoading: Boolean,
    default: () => {}
  },
  watch: {
    // 监听当前选择
    // select(value){
    //   this.clickIndex=value;
    // }
    // 模糊搜索
    searchValue(value) {
      this.searchInfo = null
      this.page_depend = 1
      this.noMore=false
      var _this = this
      if (value == '') {
        this.searchIndex = null
        this.searchLoading = false
      } else {
        var brm_userId = sessionStorage.getItem('brm_userId')
        this.searchLoading = true
        axios
          .get('https://api.hxsapp.com/search/ContactSearch/doSearch', {
            params: {
              keyword: value,
              brm_adviser_id: brm_userId,
              page_depend: this.page_depend
            }
          })
          .then(res => {
            if (res.data.code == '200') {
              if (res.data.data) {
                for (var i = 0; i < res.data.data.list.length; i++) {
                  if (res.data.data.list[i].realname != '' && res.data.data.list[i].realname) {
                    res.data.data.list[i].realname = res.data.data.list[i].realname.replace(
                      value,
                      "<span style='color:#FF668C'>" + value + '</span>'
                    )
                  }
                  if (res.data.data.list[i].brm_username != '' && res.data.data.list[i].brm_username) {
                    res.data.data.list[i].brm_username = res.data.data.list[i].brm_username.replace(
                      value,
                      "<span style='color:#FF668C'>" + value + '</span>'
                    )
                  }
                  if (res.data.data.list[i].brm_user_remark != '' && res.data.data.list[i].brm_user_remark) {
                    res.data.data.list[i].brm_user_remark = res.data.data.list[i].brm_user_remark.replace(
                      value,
                      "<span style='color:#FF668C'>" + value + '</span>'
                    )
                  }
                }
                this.searchInfo = res.data.data.list
                this.searchLoading = false
                this.page_depend++
                $('#search_scroll').scroll(function() {
                  if ($(this)[0].scrollTop + $(this).height() + 60 >= $(this)[0].scrollHeight) {
                    if (_this.loadingMore && !_this.noMore) {
                      _this.loadingMore = false
                      _this.searchMoreLoading = true
                      _this.moreSerach()
                    }
                  }
                })
              }
            } else if (!res.data.data) {
              this.$message.error('搜索失败')
            } else {
              this.$message.error(res.data.msg)
            }
          })
      }
    },
    recentContactsArr(val, oldVal) {
      this.getHxsUserInfo()
    },
    unreadJson(val, oldVal) {},
    customerTopJson() {}
  },
  data() {
    return {
      isFrist: true,
      isFristLoad: true,
      FrindeIndex: null, // 右键选中的用户下标
      showModel: false,
      oneModelList: null, // 弹窗数据
      clickIndex: this.select, // 点击选中的消息下标
      toAccount: null, //当前会话的id
      hxsUserInfoJson: null,
      searchInfo: null, //搜索到的数据
      searchValue: '', // 搜索关键词
      setTopPhone: null,
      setTopId: null,
      activeSessionRightId: null,
      loadingMore: true, // 搜索列表加载更多
      page_depend: 1, // 搜索列表分页页码
      searchMoreLoading: false, // 搜索是否加载更多中
      noMore:false,
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.showModel = this.isAlert
    this.clickIndex = this.select
    this.activeSession()
    this.toAccount = this.$store.getters.sessionIdGetter
    this.getHxsUserInfo()
    this.allClickHideAlert()
  },
  methods: {
    //右键点击分组弹出菜单
    alertModel(event, phone, id) {
      // 系统默认分组不允许删除和重命名   设置右键弹出菜单数据
      this.oneModelList = [{ title: '置顶', id: '0' }, { title: '取消置顶', id: '1' }, { title: '删除会话', id: '2' }]
      this.showModel = true // 显示弹出
      this.FrindeIndex = null //重置选中的用户下标
      var oEvent = event
      let Top = oEvent.clientY
      var oDiv = document.getElementById('model')
      var W = $(document).height()
      if (oEvent.clientY > W - 150) {
        Top = oEvent.clientY - 100
      }
      oDiv.style.left = oEvent.clientX + 'px'
      oDiv.style.top = Top + 'px'
      oDiv.style.position = 'fixed' // 为新创建的DIV指定绝对定位
      oDiv.style.zIndex = '5' // 指定高度
      this.setTopPhone = phone
      this.setTopId = id
    },
    // 隐藏右键弹窗
    hideAlert() {
      this.showModel = false
    },
    allClickHideAlert() {
      let _this = this
      $('#bigmain').click(function() {
        _this.showModel = false
      })
    },
    // 置顶
    Topping(index) {
      console.log('这是置顶方法======================')

      var type = null
      if (index == 0) {
        type = 'add'
      } else if (index == 1) {
        type = 'delete'
      } else {
        type = 'remove'
      }

      if (type == 'remove') {
        this.$emit('delChatFn', {
          to_id: this.setTopId,
          setTopPhone: this.setTopPhone
        })
      }

      if (index != 2) {
        axios
          .get('https://api.hxsapp.com/im/Chat/operateCustomerTop', {
            params: {
              brm_adviser_id: sessionStorage.getItem('brm_userId'),
              encode_phone: this.setTopPhone,
              type
            }
          })
          .then(res => {
            if (res.data.msg == '置顶成功') {
              var json = {
                encode_phone: this.setTopPhone, //客户加密手机号码
                brm_user_id: '', //客户brm账号的ID
                user_id: '', //用户ID
                chat_account: this.setTopId //聊天账号
              }
              this.$emit('addCustomerTop', json)
              this.$alert('置顶成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              })
            } else if (res.data.msg == '取消置顶成功') {
              this.$alert('取消置顶成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              })
              this.$emit('deleteCustomerTop', this.setTopId)
            } else {
              this.$alert(res.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              })
            }
          })
      }

      this.showModel = false
    },
    // 搜索选择用户
    searchSelect(idx) {
      // 先判断是否已经注册  然后在判断是否是该顾问的绑定用户
      if (this.searchInfo[idx].is_registered == 0) {
        this.$message.error('该客户尚未注册App，无法发送消息')
        return false
      } else if (this.searchInfo[idx].is_bind_customer == 0) {
        this.$message.error('该客户处于一线已分配状态，只有其专属顾问才可以发送消息。')
        return false
      }
      if (this.searchInfo[idx].user_info && this.searchInfo[idx].user_info != '') {
        this.getOpenim(this.searchInfo[idx].user_info.user_id)
      } else {
        this.$message.error('发送失败')
      }
    },
    // 获取更多搜索数据
    moreSerach() {
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/search/ContactSearch/doSearch', {
          params: {
            keyword: this.searchValue,
            brm_adviser_id: brm_userId,
            page_depend: this.page_depend
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            if (res.data.data) {
              if (res.data.data.list == '') {
                this.loadingMore = true
                this.searchMoreLoading = false
                this.noMore=true;
                return
              }
              for (var i = 0; i < res.data.data.list.length; i++) {
                if (res.data.data.list[i].realname != '' && res.data.data.list[i].realname) {
                  res.data.data.list[i].realname = res.data.data.list[i].realname.replace(
                    this.searchValue,
                    "<span style='color:#FF668C'>" + this.searchValue + '</span>'
                  )
                }
                if (res.data.data.list[i].brm_username != '' && res.data.data.list[i].brm_username) {
                  res.data.data.list[i].brm_username = res.data.data.list[i].brm_username.replace(
                    this.searchValue,
                    "<span style='color:#FF668C'>" + this.searchValue + '</span>'
                  )
                }
                if (res.data.data.list[i].brm_user_remark != '' && res.data.data.list[i].brm_user_remark) {
                  res.data.data.list[i].brm_user_remark = res.data.data.list[i].brm_user_remark.replace(
                    this.searchValue,
                    "<span style='color:#FF668C'>" + this.searchValue + '</span>'
                  )
                }
              }
              this.searchInfo = this.searchInfo.concat(res.data.data.list)
              this.page_depend++
              this.loadingMore = true
              this.searchMoreLoading = false
            }
          } else if (!res.data.data) {
            this.$message.error('获取更多列表失败')
            this.loadingMore = true
            this.searchMoreLoading = false
          } else {
            this.$message.error(res.data.msg)
            this.loadingMore = true
            this.searchMoreLoading = false
          }
        })
    },
    // 获取顾问账号
    getOpenim(userid) {
      axios
        .post('https://api.hxsapp.com/account/userAccount/getOpenIMAccount?user_id=' + userid + '&app_name=hxs')
        .then(res => {
          if (res.data.code == '200') {
            var userJson = {
              To_Account: res.data.data.openim_account,
              MsgShow: '',
              MsgTimeStamp: Date.parse(new Date()) / 1000,
              C2cImage: ''
            }
            this.$store.commit('changeUserInfo', userJson)
            this.$store.commit('changeTabidx', 0)
            this.searchValue = ''
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 选择对话
    activeSession() {
      var _this = this
      var loadEnd = false
      for (let i = 0; i < this.recentContactsArr.length; i++) {
        if (this.isFrist) {
          for (let j = 0; j < this.recentContactsArr.length; j++) {
            if (
              this.recentContactsArr[j].To_Account != 'brm-110354224754775' &&
              this.recentContactsArr[j].To_Account != 'brm-110354224754518' &&
              !loadEnd
            ) {
              this.activeSessionRightId = j
              loadEnd = true
            }
          }
          this.$store.commit('changeSessionId', this.recentContactsArr[this.activeSessionRightId].To_Account)
          let selType = this.$store.getters.selTypeGetter
          // let selSess = webim.MsgStore.sessByTypeId(selType, _this.recentContactsArr[0].To_Account);//初始化当前会话对象
          var selSess = new webim.Session(
            selType,
            _this.recentContactsArr[_this.activeSessionRightId].To_Account,
            _this.recentContactsArr[_this.activeSessionRightId].To_Account,
            '',
            Math.round(new Date().getTime() / 1000)
          )
          this.$store.commit('changeSelSess', selSess)
          //点击用户设置消息为已读
          this.$emit('setAutoReadFn', selSess)

          setTimeout(() => {
            this.$emit('chatViewScrollFn', '')
          }, 300)
          this.isFrist = false
          window.require && ipc.send('scintillation')
          return
        }
      }
    },    
    filterNum(msg){
      //防止发送方使用空格符或者回车键作为号码分割符号
      var reg = /(\s)|(\r)/g;
      var isNewMsg = null;
      var filtermsg = (msg).replace(reg,'');

      //去除空格符或者回车键验证是否是点好号码
      if(commonJs.isPoneAvailable(filtermsg)){
        var regN = /1[345789]\d{9}/g;
        isNewMsg = filtermsg.replace(regN,"*** **** ****");
      }else{
        isNewMsg = msg;
      }

      return isNewMsg;
    },

    //会话列表展示好享瘦用户头像昵称
    getHxsUserInfo(toAccount) {
      var brm_userId = sessionStorage.getItem('brm_userId')
      var _this = this
      if (this.recentContactsArr.length > 0) {
        let userIdStr = ''
        for (var i = 0; i < this.recentContactsArr.length; i++) {
          userIdStr += this.recentContactsArr[i].To_Account + ','
        }
        axios
          .get('https://api.hxsapp.com/account/UserInfo/getUserInfoByOpenImAccount', {
            params: {
              openim_account: userIdStr,
              brm_adviser_id: brm_userId
            }
          })
          .then(res => {
            this.hxsUserInfoJson = res.data.data
            console.log(this.hxsUserInfoJson)

            //如果是用户关系列表进来的用户 选中
            if (toAccount) {
              var userInfo = this.hxsUserInfoJson[toAccount]
              this.selectAccount(
                {
                  To_Account: toAccount
                },
                userInfo.head_img,
                userInfo.display_name + '(' + userInfo.group_name + ')',
                userInfo.encode_phone,
                userInfo.user_id
              )
            }

            //第一次加载
            if (this.isFristLoad) {
              //初始当前用户

              //聊天窗口顶部名称

              console.log(_this.activeSessionRightId)
              var firstUserInfo = this.hxsUserInfoJson[_this.recentContactsArr[_this.activeSessionRightId].To_Account]
              var chatViewTopName = firstUserInfo.display_name
              var audioName= firstUserInfo.display_name;// 用户昵称
              if (firstUserInfo.group_name) {
                chatViewTopName += '(' + firstUserInfo.group_name + ')'
              }
              this.$emit('changchatViewTopName', chatViewTopName,audioName)
              //加密电话
              this.$emit('activeEncodePhone', firstUserInfo.encode_phone)
              //id
              this.$emit('changeUserIdFn', firstUserInfo.user_id)
              //推送到store 加密电话
              this.$store.commit('changeEncodePhone', firstUserInfo.encode_phone)
              // this.$store.commit("changeSessionId", _this.recentContactsArr[0].To_Account);
              this.isFristLoad = false
              this.$parent.isLoading = false
              this.$emit('endLoading', true)
            }
            if (this.$store.getters.sessionIdGetter) {
              this.$store.commit('changeSelHeadSrc', this.hxsUserInfoJson[this.$store.getters.sessionIdGetter].head_img)
            }
          })
      }
    },
    changeRemark(data) {
      //更改备注名
      var activeUserId = this.$store.getters.sessionIdGetter
      if (data) {
        //备注名不为空
        this.$parent.activeUserHxsName = data
        if (this.hxsUserInfoJson[activeUserId]) {
          this.hxsUserInfoJson[activeUserId].display_name = data
        }
      } else {
        //备注名为空
        var name = this.hxsUserInfoJson[activeUserId].brm_username || this.hxsUserInfoJson[activeUserId].nickname
        this.$parent.activeUserHxsName = name
        this.hxsUserInfoJson[activeUserId].display_name = name
      }
    },
    momentJs(time) {
      //聊天时间展示
      return commonJs.momentJsFn(time, true)
    },
    subStlengthFn(str) {
      //字符串截取
      return commonJs.subStlength(str)
    },
    selectAccount(item, headUrl, name, phone, id, group_name) {
      this.$nextTick(() => {
        if (item.To_Account == this.$store.getters.sessionIdGetter) {
          return
        }
        //当前会话类型
        let selType = this.$store.getters.selTypeGetter

        //初始化当前会话对象
        var selSess = new webim.Session(
          selType,
          item.To_Account,
          item.To_Account,
          '',
          Math.round(new Date().getTime() / 1000)
        )
        //当前的用户头像 会话id 加密电话推送到store
        this.$store.commit('changeSelHeadSrc', headUrl)
        this.toAccount = item.To_Account
        this.$store.commit('changeSessionId', item.To_Account)
        this.$store.commit('changeEncodePhone', phone)

        this.$parent.isXiTongTongZhi = false

        //聊天窗口置底
        this.$emit('chatViewScrollFn')

        //聊天窗口名称
        var topName = name

        this.$store.commit('changeSelSess', selSess)
        if (group_name) {
          topName = name + '(' + group_name + ')'
        }
        var audioName= name;// 用户昵称
        console.log("我修改了1",audioName)
        this.$emit('changchatViewTopName', topName,audioName)
        //聊天历史记录使用参数
        this.$emit('activeEncodePhone', phone)

        //点击用户设置消息为已读
        this.$emit('setAutoReadFn', selSess)

        this.$emit('changeUserIdFn', id)
        
        //切换选择人情况输入内容
        this.$emit('clearInputMsgFn');

        //如果上一个聊天用户打开历史聊天窗口 关闭
        this.$parent.isHistory = false
        if (window.require) {
          ipc.send('scintillation')
        } else {
          this.$emit('isInitUnreadMsgCountFn')
        }
      })
    },
    queryCustomerTopKey(id) {
      //判断置顶中是否有这个用户
      if (!this.customerTopJson) return false
      for (var j = 0; j < this.customerTopJson.length; j++) {
        if (id == this.customerTopJson[j].chat_account) {
          return true
        }
      }
      return false
    },
    unreadFn(toAccount) {
      //未读消息赋值到对应的用户
      console.log(this.unreadJson)
      for (var i in this.unreadJson) {
        if (toAccount == this.unreadJson[i]._impl.id) {
          return this.unreadJson[i]._impl.unread
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.li-user-message {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #999;
  padding-top: 5px;
}
.list-center-li {
  height: 100% !important;
}
.message-time {
  font-size: 10px;
  color: #999;
}
.message-username {
  color: #666;
}
.friend-List-center {
  border-top: 1px rgba(129, 141, 207, 0.16) solid;
}
.unread {
  position: absolute;
  left: 41px;
  border-radius: 50%;
  padding: 3px 8px;
  top: 5px;
  text-align: center;
  background: rgba(245, 84, 73, 0.9);
  font-size: 20px !important;
  color: #fff;
  transform: scale(0.5);
}
.el-badge__content {
  height: 15px;
  line-height: 15px;
  padding: 0 4px;
}
.li-img {
  position: relative;
}
.lenght-null {
  line-height: 44px;
  font-size: 12px;
}
.more-search-loading {
  font-size: 14px;
  color: #666;
  text-align: center;
  padding-bottom: 10px;
}
</style>
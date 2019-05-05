<template>
  <div class="bigmain flex" @click="hiddenModel" style="border-radius:0 5px 5px 0">
    <!-- 用户列表 -->
    <div class="friend-List" id="friend_list" onselectstart="return false">
      <div class="Watermark">右键点击空白处可以自创建分组</div>
      <div class="friend-search flex flex-align-center">
        <span class="search"></span>
        <input type="text" placeholder="搜索" v-model="searchValue">
      </div>
      <div class="friend-List-center" @contextmenu.prevent="alertModel($event,'',0)" id="search_scroll1">
        <!-- 搜索结果展示 -->
        <div class="list-center-item " v-if="searchValue!=''">
          <div class="list-center-li friend-search-body" v-loading="searchLoading">
            <div class="lenght-null" v-if="searchInfo.length==0|| searchInfo==''">暂无用户</div>
            <div :class="searchIndex==idx?'li-item-box flex flex-align-center itemActive':'li-item-box flex flex-align-center'" v-for="(_item,idx) in searchInfo" :key="idx" @click="searchSelect(idx)"  @contextmenu.prevent.stop="alertUserModel($event,'',idx,'search',_item.customer_group_id,_item.encode_phone)">
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
        <!-- 用户列表 -->
        <div v-else class="list-center-item" v-for="(item,index) in GroupingInfo" :key="index">
          <div class="list-center-item-title flex " @click="showList(index,item.id)" @contextmenu.prevent.stop="alertModel($event,index,item.type)">
            <span :class="index==listIndex?'list-icon iconfont icon-down selectIcon':'list-icon iconfont icon-down'"></span>
            <input class="list-lable" v-show="isReadonly==index" :readonly="isReadonly==index?false:true" @keyup.enter="hideInput" v-on:blur="groupingRename(index)" v-focus="isReadonly==index" v-model="item.name" />
            <div class="list-lable-div" v-show="isReadonly!=index">
              <span style="padding-right:5px">{{item.name}}</span>({{item.customer_count}})</div>
          </div>
          <div class="list-center-li " v-loading="isListLoading" :id="'scrollList'+index" v-show="index==listIndex">
            <div class="lenght-null" v-if="item.customer_count==0">暂无用户</div>
            <div :class="selectIndex==index&&selectIdx==idx?'li-item-box flex flex-align-center itemActive line_xi_after':'li-item-box flex flex-align-center line_xi_after'" v-for="(_item,idx) in item.customers" :key="idx" @click="selectFriend(index,idx)" @contextmenu.prevent.stop="alertUserModel($event,index,idx,'line')">
              <div class="li-img">
                <img :src="_item.img" alt="">
              </div>
              <div class="li-user-name">{{_item.name}}</div>
            </div>
          </div>
        </div>
        <div class="model flex" id="FriendsModel" v-show="showModel">
          <div class="left-model">
            <div class="model-item" v-for="(item,index) in  oneModelList" @mouseover="selectModel(index,'mouseover',item.id)" :key="index" @click.stop="selectModel(index,'click',item.id)">{{item.title}}
              <span class="model-item-icon iconfont icon-xiangyou" v-if="item.id==4"></span>
            </div>
          </div>
          <div class="right-model" v-show="showOther">
            <div class="model-item" v-for="(item,index) in GroupingInfo" v-if="showModelIndex!=index" :key="index" @click.stop="selectOtherModel(index)">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间消息框或发送消息框 -->
    <div class="friend-center" v-show="!isClose">
      <!-- 中间头部菜单 -->
      <div class="center-header flex flex-align-center flex-pack-end drag">
        <div class="header-img flex flex-align-center no-drag" @click="minSmall">
          <img src="../assets/img/header/icon_minimize.png">
        </div>
        <div class="header-img flex flex-align-center no-drag" @click="maxBig">
          <img src="../assets/img/header/icon_fullscreen.png">
        </div>
        <div class="header-img flex flex-align-center no-drag" @click="close">
          <img src="../assets/img/header/icon_close.png">
        </div>
      </div>
      <!-- 下方区域-->
      <div class="center-foot flex flex-pack-justify" id="foot">
        <!-- 下方左侧 -->
        <div class="foot-left flex flex-align-center ">
          <div class="foot-info-box" v-if="selectInfo">
            <div class="info-img">
              <img v-if="selectInfo.img" :src="selectInfo.img" alt="">
              <img v-else :src="selectInfo.head_img" alt="">
            </div>
            <div class="info-name" v-if="selectInfo.name">{{selectInfo.name}}</div>
            <div class="info-name" v-else>
              <span v-if="selectInfo.brm_username!=''" v-html="selectInfo.user_nickname"></span>
              <span v-else-if="selectInfo.brm_user_remark!=''" v-html="selectInfo.brm_user_remark"></span>
              <span v-else-if="selectInfo.realname!=''" v-html="selectInfo.realname"></span>
            </div>
            <div class="sub-btn">
              <button @click="sendMessage">发送消息</button>
            </div>
          </div>
          <div class="select-null" v-else>
            <img src="../assets/img/backgroun_logo.png" alt="">
          </div>
        </div>
        <userInfo :userId="phone_id" class="userinfo-box user-box" @modifyNote="updateNote"></userInfo>
      </div>
    </div>
    <!-- confirm 对话框 -->
    <div class="wrap-dialog hide flex flex-align-center flex-pack-center" v-show="isDialog" @click="hideDialog">
      <div class="dialog">
        <div class="dialog-header"></div>
        <div class="dialog-body flex flex-align-center">
          <div class="dialog-body-icon">

          </div>
          <span class="dialog-message">选定的分组将被删除，组内客户将被移至系统默认分组“我的客户”。 你确定要删除该分组吗？
          </span>
        </div>
        <div class="dialog-footer flex">
          <div class="btn confirm" @click.stop="cancel(false)">取消</div>
          <div class="btn cancel" @click.stop="cancel(true)">确认</div>
        </div>
      </div>
    </div>
    <ugtUserTel v-if="ugtUserTelShow" :ugtUserTelNumber="ugtUserTelNumber"></ugtUserTel>
  </div>

</template>
<script>
import commonJs from '@/util/common.js'

import ugtUserTel from '@/components/ugtUserTel'
// 左侧菜单栏组件
import leftMenu from '@/components/leftMenu'
// 右侧用户信息组件
import userInfo from '@/components/userInfo'
import historyRecord from '@/components/historyRecord'
import axios from 'axios'
// 引入打包工具
var ipc
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}
export default {
  name: 'imFriend',
  data() {
    return {
      isBig: 0, //1最大化 0最小化
      isClose: false, //又上角关闭
      listIndex: null, // 展开分组的下标
      loading: true,
      phone_id: '', // 用户加密id
      user_id: '', // 用户id
      isHistory: false, // 是否显示历史记录
      GroupingInfo: [], // 分组信息
      frindList: [], // 某个分组对应的数据
      selectInfo: null, //当前选择的用户信息
      selectIndex: null, // 选中用户的分组下标
      selectIdx: null, //当前选中的用户下标
      showModel: false, // 右键一级菜单是否显示
      showOther: false, //右键二级菜单是否显示
      isReadonly: null, // 编辑分组名称input是否只读
      showModelIndex: null, // 右键点击的分组下标
      R_clickFrindeIndex: null, // 右键点击用户的下标
      oneModelList: null, // 右键一级菜单数据
      twoModelList: null, //右键二级菜单数据
      isDialog: false, //是否显示确认对话框
      searchValue: '', // 搜索关键词
      searchInfo: null, //搜索到的数据
      searchIndex: null, // 当前点击的搜索到数据的下标
      oldName: null, // 修改分组名称之前的数据
      searchLoading: false, // 搜索加载等待状态
      lastId: null, // 分组下的用户列表最后一个的id
      loadingMore: true,
      isListLoading: false, //某分组下列表加载状态
      searchLoadingMore: true,
      page_depend: 1, // 搜索列表分页页码
      searchMoreLoading: false, // 搜索是否加载更多中
      noMore:false,
      searchGroupinfo:null,
      ugtUserTelShow: false,
      ugtUserTelNumber: null
    }
  },
  components: {
    leftMenu,
    userInfo,
    historyRecord,
    ugtUserTel,
  },
  // 自定义事件input获取焦点
  directives: {
    focus: {
      update: function(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  watch: {
    // 模糊搜索
    searchValue(value) {
      this.searchInfo = []
      this.page_depend = 1
      var _this = this
      this.noMore = false
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
                  if (res.data.data.list[i].realname != '' && res.data.data.list[i].realname != '') {
                    res.data.data.list[i].realname = res.data.data.list[i].realname.replace(
                      value,
                      "<span style='color:#FF668C'>" + value + '</span>'
                    )
                  }
                  if (res.data.data.list[i].brm_username != '' && res.data.data.list[i].brm_username != '') {
                    res.data.data.list[i].brm_username = res.data.data.list[i].brm_username.replace(
                      value,
                      "<span style='color:#FF668C'>" + value + '</span>'
                    )
                  }
                  if (res.data.data.list[i].brm_user_remark != '' && res.data.data.list[i].brm_user_remark != '') {
                    res.data.data.list[i].brm_user_remark = res.data.data.list[i].brm_user_remark.replace(
                      value,
                      "<span style='color:#FF668C'>" + value + '</span>'
                    )
                  }
                }
                this.searchInfo = res.data.data.list
                this.searchLoading = false
                this.page_depend++
                $('#search_scroll1').scroll(function() {
                  if ($(this)[0].scrollTop + $(this).height() + 60 >= $(this)[0].scrollHeight) {
                    if (_this.searchLoadingMore && !_this.noMore) {
                      _this.searchLoadingMore = false
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
    // 监听列表是否加载完成
    listIndex(value) {
      // 加载分组下更多用户列表
      var _this = this
      $('#scrollList' + value).scroll(function() {
        //当时滚动条离底部60px时开始加载下一页的内容
        if ($(this)[0].scrollTop + $(this).height() + 60 >= $(this)[0].scrollHeight) {
          if (_this.loadingMore) {
            _this.loadingMore = false
            _this.getFriendList(value)
          }
        }
      })
    }
  },
  created() {
    var windowWidth = document.body.clientWidth
    this.windowHeight = document.body.clientWidth
    // 获取本地设置的最大化最小化状态
    var localIsbig = localStorage.getItem('isBig') || '0'
    // this.isBig = localIsbig;
    this.showGrouping()
  },
  mounted() {},
  methods: {
    //设置最大化 /还原
    ugtUserTelShowFn(num){
      this.ugtUserTelShow = true;
      this.ugtUserTelNumber = num;
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
    // 获取分组
    showGrouping() {
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/im/Chat/getCustomerGroups', {
          params: {
            brm_adviser_id: brm_userId
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            this.GroupingInfo = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 展开分组列表数据
    showList(index) {
      if (this.listIndex == index) {
        this.listIndex = null
      } else {
        this.listIndex = index
        this.isListLoading = true
        this.lastId = null
        this.GroupingInfo[index].customers = []
        this.getFriendList(index)
      }
    },
    // 获取某分组下的用户列表
    getFriendList(index) {
      axios
        .get('https://api.hxsapp.com/im/Chat/showGroupCustomers', {
          params: {
            group_id: this.GroupingInfo[index].id,
            page_depend: this.lastId
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            if (res.data.data) {
              if (this.GroupingInfo[index].customers == '') {
                this.GroupingInfo[index].customers = res.data.data
                this.GroupingInfo[index].customer_count = res.data.count
                var length = res.data.data.length
                this.lastId = res.data.data[length - 1].id
                this.loadingMore = true
              } else {
                this.GroupingInfo[index].customers = this.GroupingInfo[index].customers.concat(res.data.data)
                var length = res.data.data.length
                this.lastId = res.data.data[length - 1].id
                this.GroupingInfo[index].customer_count = res.data.count
                this.loadingMore = true
              }
            }
            this.isListLoading = false
          } else if (!res.data.data) {
            this.$message.error('获取数据失败')
            this.loadingMore = true
          } else {
            this.$message.error(res.data.msg)
            this.loadingMore = true
          }
        })
    },
    // 列表点击好友
    selectFriend(index, idx) {
      // 当前选中用户信息
      this.selectInfo = this.GroupingInfo[index].customers[idx]
      //   当前选中用户分组下标
      this.selectIndex = index
      //   当前选中用户列表下标
      this.selectIdx = idx
      this.phone_id = this.selectInfo.encode_phone
    },
    // 点击搜索到的好友
    searchSelect(idx) {
      this.selectInfo = this.searchInfo[idx]
      this.searchIndex = idx
      this.user_id = this.selectInfo.user_info.user_id
      this.phone_id = this.selectInfo.encode_phone
    },

    // 隐藏右键菜单
    hiddenModel() {
      this.showModel = false
      this.showOther = false
    },
    //右键点击分组弹出菜单
    alertModel(event, index, type) {
      // 系统默认分组不允许删除和重命名   设置右键弹出菜单数据
      if (type == 0) {
        this.oneModelList = [
          {
            title: '添加分组',
            id: '0'
          }
        ]
      } else {
        this.listIndex = null
        this.oneModelList = [
          {
            title: '添加分组',
            id: '0'
          },
          {
            title: '重命名',
            id: '1'
          },
          {
            title: '删除分组',
            id: '2'
          }
        ]
      }
      this.showModel = true // 显示弹出
      this.showOther = false // 隐藏二级菜单
      this.isReadonly = null // 重置文本框只读
      this.showModelIndex = index // 当前选中分组下标
      this.R_clickFrindeIndex = null //重置选中的用户下标
      var oEvent = event
      this.oDivStyle(oEvent)
    },
    //右键点击用户弹出菜单
    alertUserModel(event, index, idx,type,gid,encode_phone) {
      this.oneModelList = [
        {
          title: '移动分组',
          id: '4'
        }
      ]
      this.showModel = true // 显示弹出
      this.showOther = false // 隐藏二级菜单
      this.isReadonly = null // 重置文本框只读
      if(type=='search'){
        var arry=this.GroupingInfo
        arry.forEach((item,_index)=>{
          if(item.id==gid){
            index=_index
          }
        })
        this.searchGroupinfo={
          gid:gid,
          encode_phone:encode_phone
        }
      }
      this.showModelIndex = index // 当前选中分组下标
      this.R_clickFrindeIndex = idx // 当前选中分组对应的用户下标
      var oEvent = event
      this.oDivStyle(oEvent,type)
    },
    // 右键显示操作菜单
    oDivStyle(oEvent,type) {
      var oDiv = document.getElementById('FriendsModel')
      let Top = oEvent.clientY
      var W = $(document).height()
      if (oEvent.clientY > W - 150) {
        if(type=="search"){
          Top = oEvent.clientY - 50
        }else{
          Top = oEvent.clientY - 100
        }
      }
      oDiv.style.left = oEvent.clientX + 'px'
      oDiv.style.top = Top + 'px'
      oDiv.style.position = 'fixed' // 为新创建的DIV指定绝对定位
      oDiv.style.zIndex = '5' // 指定高度
    },
    // 右键一级菜单选择事件
    selectModel(index, type, id) {
      var that = this
      // 判断是否点击的是用户列表
      if (this.R_clickFrindeIndex > 0 || this.R_clickFrindeIndex == 0) {
        this.showOther = true
        return false
      }
      if (type == 'click') {
        switch (id) {
          // 添加分组
          case '0':
            var brm_userId = sessionStorage.getItem('brm_userId')

            axios
              .get('https://api.hxsapp.com/im/Chat/addGroup', {
                params: {
                  brm_adviser_id: brm_userId
                }
              })
              .then(res => {
                if (res.data.code == '200') {
                  // 添加分组
                  this.addGrouping(res.data.id, res.data.name)
                  this.oldName = res.data.name
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            break
          // 分组重命名
          case '1':
            var index = this.showModelIndex
            this.oldName = this.GroupingInfo[index].name
            this.isReadonly = this.showModelIndex
            break
          //删除分组，将数据合并到我的客户中去
          case '2':
            var F_index = this.showModelIndex //选中的分组下标
            console.log(F_index)
            var listLength = this.GroupingInfo[F_index].customer_count
            // 判断是否该分组是否为空  空则直接删除， 反之先合并数据到我的客户分组 然后删除
            if (listLength == 0) {
              this.deleteGrouping(F_index)
            } else {
              this.isDialog = true
            }
            break
          default:
            break
        }
        this.showModel = false
        this.showOther = false
        this.R_clickFrindeIndex = null
      }
    },
    // 右键二级菜单选择事件   移动分组
    selectOtherModel(index) {
      this.showModel = false
      this.showOther = false
      var F_index = this.showModelIndex //选中的分组下标
      var Child_index = this.R_clickFrindeIndex //选中的用户下标
      this.movingGrouping(F_index, index, Child_index)
    },
    // 按enter键让重命名文本框失去焦点
    hideInput() {
      this.isReadonly = null
    },
    // 重命名
    groupingRename(index) {
      if (this.GroupingInfo[index].name == this.oldName) {
        this.isReadonly = null
        return false
      }
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/im/Chat/editGroupName', {
          params: {
            brm_adviser_id: brm_userId,
            group_id: this.GroupingInfo[index].id,
            new_name: this.GroupingInfo[index].name
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            this.isReadonly = null
          } else {
            this.isReadonly = null;
            this.showGrouping();
            this.$message.error(res.data.msg)
          }
        })
    },
    // 移动客户到其他分组
    movingGrouping(nowIndex, movIndex, childIndex) {
      // nowIndex 当前分组下标 movIndex 要移动到的分组下标  childIndex 当前用户的下标
      var brm_userId = sessionStorage.getItem('brm_userId')
      var dataJson;
      if(this.searchGroupinfo){
        dataJson={
            brm_adviser_id: brm_userId,
            encode_phone:this.searchGroupinfo.encode_phone,
            original_group_id:this.searchGroupinfo.gid,
            target_group_id: this.GroupingInfo[movIndex].id
          }
      }else{
       dataJson= {
            brm_adviser_id: brm_userId,
            encode_phone: this.GroupingInfo[nowIndex].customers[childIndex].encode_phone,
            original_group_id: this.GroupingInfo[nowIndex].id,
            target_group_id: this.GroupingInfo[movIndex].id
          }
      }
      axios
        .get('https://api.hxsapp.com/im/Chat/moveCustomerGroup', {
          params: dataJson
        })
        .then(res => {
          if (res.data.code == '200') {
            if(this.searchGroupinfo){
              this.$message({
              message: '移动成功',
              type: 'success'
              });
             this.GroupingInfo[movIndex].customer_count = this.GroupingInfo[movIndex].customer_count + 1
              this.searchGroupinfo=null;
              return
            }
            this.GroupingInfo[nowIndex].customers.splice(childIndex, 1)
            console.log("分组数量"+this.GroupingInfo[nowIndex].customers.length)
            this.GroupingInfo[nowIndex].customer_count = this.GroupingInfo[nowIndex].customer_count-1;
            this.GroupingInfo[movIndex].customer_count = this.GroupingInfo[movIndex].customer_count + 1
            this.searchGroupinfo=null;
            this.$message({
              message: '移动成功',
              type: 'success'
            });
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    //添加分组
    addGrouping(addId, addName) {
      var that = this
      var addlist = {
        id: addId,
        name: addName,
        type: 1,
        customer_count: 0,
        customers: []
      }
      this.GroupingInfo.push(addlist)
      this.selectIndex = null
      this.listIndex = null
      // 延迟50毫秒后将新建分组的名称获取焦点便于修改名称
      setTimeout(function() {
        that.showModelIndex = that.GroupingInfo.length - 1
        that.isReadonly = that.showModelIndex
      }, 50)
    },
    // 删除分组
    deleteGrouping(index) {
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/im/Chat/deleteCustomerGroup', {
          params: {
            brm_adviser_id: brm_userId,
            group_id: this.GroupingInfo[index].id
          }
        })
        .then(res => {
          if (res.data.code == '200') {
            if (this.GroupingInfo[index].customers != '') {
              if (this.GroupingInfo[2].customers == '') {
                this.GroupingInfo[2].customers = this.GroupingInfo[index].customers
              } else {
                this.GroupingInfo[2].customers = this.GroupingInfo[2].customers.concat(
                  this.GroupingInfo[index].customers
                )
              }
            }
            // 修改我的客户分组的数量
            this.GroupingInfo[2].customer_count = parseInt(
              this.GroupingInfo[2].customer_count + this.GroupingInfo[index].customer_count
            )
            this.GroupingInfo.splice(index, 1)
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 隐藏删除分组确认对话框
    hideDialog() {
      this.isDialog = false
    },
    // 删除分组确认对话框 确定或取消操作
    cancel(isSub) {
      var F_index = this.showModelIndex //选中的分组下标
      if (isSub) {
        this.deleteGrouping(F_index)
      }
      this.isDialog = false
    },
    // 发送消息
    sendMessage() {
      // 先判断是否已经注册  然后在判断是否是该顾问的绑定用户
      if (this.selectInfo.is_registered == 0) {
        this.ugtUserTelShowFn(this.selectInfo.encode_phone);
        // this.$message.error('该客户尚未注册App，无法发送消息')
        return false
      } else if (this.selectInfo.user_status == '一线已分配' && this.selectInfo.is_bind_customer == 0) {
        this.$message.error('该客户处于一线已分配状态，只有其专属顾问才可以发送消息。')
        return false
      }
      if (this.selectInfo.user_info && this.selectInfo.user_info != '') {
        this.getOpenim(this.selectInfo.user_info.user_id)
      } else {
        // this.$message.error('该客户尚未注册App，无法发送消息')
        this.ugtUserTelShowFn(this.selectInfo.encode_phone)
      }
    },
    // 获取聊天账号
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
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 更新备注
    updateNote(data) {
      //   当前选中用户分组下标
      let index = this.selectIndex
      //   当前选中用户列表下标
      let idx = this.selectIdx
      // 当前选中用户信息
      if (data == '') {
        this.GroupingInfo[index].customers[idx].name = this.GroupingInfo[index].customers[idx].realname
        this.selectInfo.name = this.GroupingInfo[index].customers[idx].realname
      } else {
        this.GroupingInfo[index].customers[idx].name = data
        this.selectInfo.name = data
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
                this.searchLoadingMore = true
                this.searchMoreLoading = false
                this.noMore = true
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
              this.searchLoadingMore = true
              this.searchMoreLoading = false
            }
          } else if (!res.data.data) {
            this.$message.error('获取更多列表失败')
            this.searchLoadingMore = true
            this.searchMoreLoading = false
          } else {
            this.$message.error(res.data.msg)
            this.searchLoadingMore = true
            this.searchMoreLoading = false
          }
        })
    }
  }
}
</script>
<style scoped>
.friend-List {
  min-width: 240px;
}
.list-center-item {
  position: relative;
  z-index: 2;
  background: #fff;
}
.Watermark {
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  text-align: center;
  margin-left: 35px;
  color: #b4b4b4;
}
.list-center-li {
  max-height: 280px;
}

.friend-search-body {
  height: 100%;
  max-height: 100% !important;
}

.center-foot {
  width: 100%;
  height: calc(100%-65px);
  position: relative;
  border-top: 1px #f2f2f2 solid;
  box-sizing: border-box;
}

.foot-left {
  height: calc(100%-65px);
  background: #f5f5f5;
}

.foot-info-box {
  width: 100%;
  text-align: center;
}

.info-img {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 80px;
  margin: auto;
  margin-bottom: 10px;
  box-shadow: 0 0 1px #ccc;
}

.info-img img {
  width: 100%;
  min-height: 80px;
}

.info-name {
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 16px;
  color: #333;
}

.sub-btn button {
  background: #657293;
  color: #fff;
  padding: 8px 40px;
  border: 0;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.select-null {
  width: 100%;
  text-align: center;
}

.select-null img {
  margin: auto;
}

.user-box {
  width: 30%;
  min-width: 280px;
  height: 100%;
  overflow-x: auto;
}

.wrap-dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.dialog {
  background: #fff;
  border-radius: 10px;
  width: 250px;
}

.dialog-message {
  padding: 10px 20px;
  text-align: center;
  line-height: 25px;
}

.dialog-footer {
  width: 100%;
  background: #fff;
  border-top: 1px #ddd solid;
  line-height: 44px;
  border-radius: 0 0 10px 10px;
}

.btn {
  width: 50%;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

.confirm {
  border-radius: 0 0 0 10px;
  border-right: 1px #ddd solid;
  box-sizing: border-box;
  color: #888;
}

.cancel {
  border-radius: 0 0 10px 0;
  color: #169bd5;
}

.btn:hover {
  background: #f9fafc;
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

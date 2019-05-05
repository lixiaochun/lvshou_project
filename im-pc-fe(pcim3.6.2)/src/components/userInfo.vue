<template>
  <!-- 下方右侧用户信息 -->
  <div class="userinfo-box" v-loading="isRefresh">
    <div @click="hideDirectio">
      <div class="user-info-li">
        <div class="user-info-li-title line_xi_after">基础信息</div>
        <div class="user-info-li-center">
          <label>真实姓名:</label>
          <span>{{userData.realname}}</span>
          <label style="padding-left:15px">App昵称:</label>
          <span>{{userData.nickname}}</span>
        </div>
        <div class="user-info-li-center flex">
          <label>备注:</label>
          <span v-show="!showRemark">{{userData.remark}}</span>
          <input v-show="showRemark" v-focus="showRemark" class="input-name" type="text" v-on:blur="saveRemark()" v-model="userData.remark">
          <i @click="updateRemark" class=" bianji-img" v-if="userData!=''"></i>
        </div>
        <div class="user-info-li-center">
          <label>身高:</label>
          <span>{{userData.body_high}} CM</span>
          <label style="padding-left:15px">体重:</label>
          <span>{{userData.body_weight}} KG</span>
        </div>
        <div class="user-info-li-center">
          <label>城市:</label>
          <span>{{userData.city}}</span>
        </div>
        <div class="user-info-li-center flex">
          <label>客户印象:
            <span style="color:#666" v-show="!showImpression">{{userData.impression}}</span>
          </label>
          <input v-show="showImpression" v-focus="showImpression" class="input-name" type="text" v-on:blur="saveImpression()" v-model="userData.impression">
          <i v-if="userData!=''" @click="updateImpressiong" class=" bianji-img"></i>
        </div>
      </div>
      <div class="user-info-li">
        <div class="user-info-li-title line_xi_after">客户资料</div>
        <div class="user-info-li-center">
          <label>客户状态:</label>
          <span>{{userData.customer_status}}</span>
          <i class="bianji-icon iconfont icon-wenhao" @click.stop="direction"></i>
        </div>
        <div class="user-info-li-center">
          <label>分配顾问:</label>
          <span>{{userData.distribute_name}}</span>
          <label style="padding-left:15px">分配时间:</label>
          <span>{{userData.distribute_time}}</span>
        </div>
        <div class="user-info-li-center">
          <label>授权顾问:</label>
          <span>{{userData.authorize_names}}</span>
        </div>
        <div class="user-info-li-center">
          <label>首次聊天:</label>
          <span>{{userData.first_chat_time}}</span>
        </div>
        <div class="user-info-li-center">
          <label>客户渠道:</label>
          <span>{{userData.channel}}</span>
        </div>
        <div class="user-info-li-center">
          <label>客户编号:</label>
          <span>{{userData.brm_user_id}}</span>
        </div>
      </div>
      <div class="user-info-li xw flex flex-warp">
        <div class="user-info-li-title line_xi_after flex flex-pack-justify">
          <div>行为数据</div>
        </div>
        <div class="user-info-li-center">
          <label>已发布动态:</label>
          <span @click="openLink('已发布动态',0)">{{userData.dynamic_count}}</span>
        </div>
        <div class="user-info-li-center">
          <label>已发布日记:</label>
          <span @click="openLink('已发布日记',1)">{{userData.diary_count}}</span>
        </div>
        <div class="user-info-li-center">
          <label>已评论:</label>
          <span @click="openLink('已评论',2)">{{userData.comment_online}}</span>
        </div>
        <div class="user-info-li-center">
          <label>被屏蔽动态:</label>
          <span @click="openLink('被屏蔽动态',3)">{{userData.shield_dynamic_count}}</span>
        </div>
        <div class="user-info-li-center">
          <label>被屏蔽日记:</label>
          <span @click="openLink('被屏蔽日记',4)">{{userData.shield_diary_count}}</span>
        </div>
        <div class="user-info-li-center">
          <label>被屏蔽评论:</label>
          <span @click="openLink('被屏蔽评论',5)">{{userData.comment_gag}}</span>
        </div>
        <div class="user-info-li-center">
          <label>被举报/禁言:</label>
          <span @click="openLink('被举报/禁言',6)">{{userData.excuse_count}}</span>
        </div>
      </div>
      <div class="user-info-li order">
        <div class=" user-info-li-title line_xi_after flex flex-pack-justify">
          <div>历史订单</div>
          <div class="refresh" @click="refresh">刷新</div>
        </div>
        <div class="user-info-li-center">
          <label>在线支付:</label>
          <span class="num" @click="openLink('在线支付',7)">{{userData.online_pay_count}}</span>
        </div>
        <div class="user-info-li-center">
          <label>订单数量:</label>
          <span class="num" @click="openLink('订单数量',8)">{{userData.order_quantity}}</span>
        </div>
        <div class="user-info-li-center">
          <label>最新订单状态:</label>
          <span>{{userData.latest_order_status}}</span>
        </div>
      </div>
    </div>
    <div class="directions-bg" v-if="isSdirection">
      <!-- <span class="directions-close iconfont icon-close" @click="direction"></span> -->
      <h4>客户状态</h4>
      <ul>
        <li>(1) 新客户：没有在绿瘦一二线成交过的客户；在电商渠道、好享瘦App商城成交过的客户也计为新客户</li>
        <li>(2) 一线已成交：已经在一线成交过，但是尚未被分配到二线的客户</li>
        <li>(3) 一线已分配：已经被分配到二线的客户</li>
        <li>(4) D类回收区：被二线顾问归入到D类客户的客户</li>
        <li>(5) 更换回收区：因无法联系、疾病、怀孕等状况，被二线提交更换的客户</li>
        <li>(6) 黑名单：被售后部门添加到黑名单的客户</li>
      </ul>
      <h4>客户渠道</h4>
      <ul>
        <li>(1) 电商客户：有在电商渠道成交过的客户</li>
        <li>(2) App商城客户：有在好享瘦App商城成交过的客户</li>
        <li>(3) 奶昔客户：购买过奶昔的客户，即，通过扫描奶昔瓶身的二维码注册的客户</li>
        <li>(4) App减肥广告客户：通过App运营部在外部投放的广告活动，注册下载的客户</li>
        <li>(5) 广告公司引流客户：通过万兔、祥宸两个广告公司引流进来的客户</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'userInfo',
  props: {
    userId: {
      type: String,
      default: function() {}
    }
  },
  data() {
    return {
      userData: '', // 用户资料
      showRemark: false, // 修改备注状态
      showImpression: false, //修改客户印象状态
      isSdirection: false, //客户状态显示开关
      phone_id: '',
      isRefresh: false
    }
  },
  // 自定义事件是input获取焦点
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
    userId(value) {
      this.phone_id = value || ''
      this.getCustomerInfo()
    }
  },
  mounted() {
    if (this.userId || this.userId != '') {
      this.phone_id = this.userId || ''
      this.getCustomerInfo()
    }
    // document.onselectstart = function(){
    //   event.returnValue = true;
    // };
  },
  methods: {
    // 跳转页面
    openLink(title, type) {
      let conductObject = {
        status: true,
        title: title,
        type: type,
        id: this.userData.user_info.user_id
      }
      this.$store.commit('changeConduct', conductObject)
    },
    // 行为数据点击刷新
    refresh() {
      if (this.isRefresh) return false
      this.isRefresh = true
      this.getCustomerInfo()
    },
    // 获取用户资料
    getCustomerInfo() {
      var brm_userId = sessionStorage.getItem('brm_userId')
      axios
        .get('https://api.hxsapp.com/im/Chat/getCustomerInfo', {
          params: {
            brm_adviser_id: brm_userId,
            encode_phone: this.phone_id
          }
        })
        .then(res => {
          console.log(res.data.data)
          if (res.data.code == '200') {
            if (res.data.data) {
              this.userData = res.data.data
              this.isRefresh = false
            }
          } else if (!res.data.data) {
            this.$message.error('获取用户资料失败')
            this.userData = ''
            this.isRefresh = false
          } else {
            this.$message.error(res.data.msg)
            this.isRefresh = false
          }
        })
    },
    // 触发编辑备注
    updateRemark() {
      this.showRemark = true
    },
    // 触发编辑印象
    updateImpressiong() {
      this.showImpression = true
    },
    // 保存备注
    saveRemark() {
      var brm_userId = sessionStorage.getItem('brm_userId')
      var json = {
        brm_adviser_id: brm_userId,
        encode_phone: this.userId,
        remark: this.userData.remark,
        type: 1
      }
      this.editInfo(json)
      this.showRemark = false
    },
    // 保存印象
    saveImpression() {
      var brm_userId = sessionStorage.getItem('brm_userId')
      var json = {
        brm_adviser_id: brm_userId,
        encode_phone: this.userId,
        impression: this.userData.impression,
        type: 2
      }
      this.editInfo(json)
      this.showImpression = false
    },
    // 显示客户状态说明
    direction() {
      this.isSdirection = !this.isSdirection
    },
    hideDirectio() {
      this.isSdirection = false
    },
    // 修改备注
    editInfo(jsonData) {
      axios
        .get('https://api.hxsapp.com/im/Chat/editRemarkOrImpression', {
          params: jsonData
        })
        .then(res => {
          if (res.data.code == '200') {
            // 触发父组件修改备注
            if (jsonData.type == 1) {
              this.$emit('modifyNote', jsonData.remark)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
    }
  }
}
</script>
<style scoped>
input {
  outline-color: #657293;
}
.userinfo-box {
  text-align: left;
  background: #fff;
  color: #333;
  overflow: auto;
  position: relative;
  border-radius: 0 0 10px 0;
}
.userinfo-box::-webkit-scrollbar {
  width: 0;
}
.user-info-li {
  padding: 0 15px;
  border-bottom: 8px rgba(245, 245, 248, 1) solid;
}
.user-info-li:last-of-type {
  border-bottom: 0;
}
.user-info-li .user-info-li-title {
  width: 100%;
  font-size: 14px;
  padding: 10px 0;
  color: #333;
  border-bottom: 1px rgba(129, 141, 207, 0.16) solid;
}
.user-info-li-title .refresh {
  font-size: 12px;
  color: #818dcf;
  cursor: pointer;
}
.user-info-li-center {
  font-size: 12px;
  line-height: 25px;
  color: #666;
  padding-top: 1px;
}
.order {
  padding-bottom: 5px;
}
.order .user-info-li-center .num,
.xw .user-info-li-center span {
  color: #818dcf;
  cursor: pointer;
}
.user-info-li-center label {
  color: #333;
}
.xw label {
  color: #666;
}
.xw .user-info-li-center {
  width: 50%;
}
.bianji-icon {
  position: relative;
  top: -1px;
  font-size: 12px;
  padding-left: 5px;
  color: #657293;
  cursor: pointer;
}
.bianji-img {
  position: relative;
  width: 12px;
  background: url('../assets/img/icon_bianji.png') no-repeat;
  background-size: 100%;
  margin-left: 5px;
  top: 6px;
  cursor: pointer;
}
.input-name {
  width: 80px;
  padding: 0 5px;
}

.directions-bg {
  position: absolute;
  width: 95%;
  min-width: 210px;
  max-width: 352px;
  height: calc(100% - 260px);
  padding: 10px 0;
  background: rgba(51, 51, 51, 0.8);
  color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 2;
  overflow: auto;
  border-radius: 5px;
}

.directions-bg h4 {
  padding: 10px 15px;
  font-size: 14px;
}

ul {
  padding-left: 0;
}

ul li {
  list-style-type: none;
  margin: 0;
  padding: 0 15px;
  line-height: 30px;
  font-size: 12px;
}
.directions-close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  margin-top: 10px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  text-align: center;
  line-height: 20px;
  color: #fff;
  cursor: pointer;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}
</style>

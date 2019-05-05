<template>
  <div class="bodyTestWarp">

    <!-- 站外h5的注册头部模块 -->
    <goSignPage v-if="!isApp" >
    </goSignPage>

    <div class="topBox">
      <ul class="tapBox">
        <li class="tap" v-for='n in 4' :key='n'>
          <div :class="tapIcon[n-1]"></div>
          <p class="tapName">{{tapName[n-1]}}</p>
        </li>
      </ul>
      <div class="notice">
        <em class="shockIcon"></em>
        <p>输入资料，您可以获得以上四项数据的评测结果</p>
      </div>
    </div>
    <ul class="mainBox">
      <li>
        <div class="mainTab">
          <p>身高</p>
          <div class="choose" @click='choose(heightArr,"height","身高")'>
            <p :style='highColor'>{{high.value}}</p>
            <em class="rightIcon"></em>
          </div>
        </div>
        <div class="bottomLine"></div>
      </li>
      <li>
        <div class="mainTab">
          <p>性别</p>
          <div class="choose" @click='choose(sexArr,"sex","性别")'>
            <p :style='sexColor'>{{sex.value}}</p>
            <em class="rightIcon"></em>
          </div>
        </div>
        <div class="bottomLine"></div>
      </li>
      <li>
        <div class="mainTab">
          <p>体重</p>
          <div class="choose" @click='choose(weightArr,"weight","体重")'>
            <p :style='weightColor'>{{weight.value}}</p>
            <em class="rightIcon"></em>
          </div>
        </div>
        <div class="bottomLine"></div>
      </li>
      <li>
        <div class="mainTab">
          <p>年龄</p>
          <div class="choose" @click='choose(ageArr,"age","年龄")'>
            <p :style='ageColor'>{{age.value}}</p>
            <em class="rightIcon"></em>
          </div>
        </div>
        <div class="bottomLine"></div>
      </li>
      <li>
        <div class="mainTab">
          <p>活动强度</p>
          <div class="choose" @click='choose(strengthArr,"strength","活动强度")'>
            <p :style='strengthColor'>{{strength.value}}</p>
            <em class="rightIcon"></em>
          </div>
        </div>
        <div class="bottomLine"></div>
      </li>
    </ul>
    <div class="bottomBox">
      <div class="commitBtn" @click='commit'>
        <p>开始评测</p>
      </div>
    </div>

    <!--  新的弹出层接入linkedme区域 -->
    <popupDownHxsLinkedMe v-if="isPopupDownLoad && !isApp && linkedMe" :linkedMe="linkedMe">
    </popupDownHxsLinkedMe>
    
    <downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
    <preLoading v-if="!loaded"></preLoading>
  </div>
</template>

<script>
// import 'jquery'

import downLoadApp from "@/components/down"
import downToLinkedMe from "@/components/downToLinkedMe"

import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

// 站外h5的注册头部模块
import goSignPage from "@/components/goSignPage"

import axios from 'axios'
import IosSelect from 'iosselect'
import { Toast } from 'mint-ui';
import common from '@/util/common.js'

export default {
  name: 'bodyTest',
  data() {
    return {
      linkedMe: null,
      isPopupDownLoad: false,
      loaded: false,

      tapIcon: [
        'tapIcon_1 tapIcon',
        'tapIcon_2 tapIcon',
        'tapIcon_3 tapIcon',
        'tapIcon_4 tapIcon'
      ],
      tapName: [
        '体重测量',
        '标准身材',
        '每天摄入量',
        '减脂心率'
      ],
      heightArr: [],
      weightArr: [],
      ageArr: [],
      sexArr: [{
        id: 0,
        value: '女'
      }, {
        id: 1,
        value: '男'
      }],
      strengthArr: [{
        id: 1,
        value: '卧床（全天）'
      }, {
        id: 2,
        value: '轻活动生活模式（多坐或缓步）'
      }, {
        id: 3,
        value: '一般活动度'
      }, {
        id: 4,
        value: '活动量大的生活模式（重工作者）'
      }],

      high: {
        value: '请选择', key: '', type: false
      },
      sex: {
        value: '请选择', key: '', type: false
      },
      weight: {
        value: '请选择', key: '', type: false
      },
      age: {
        value: '请选择', key: '', type: false
      },
      strength: {
        value: '请选择', key: '', type: false
      },
      strengthId: '',

      highColor: null,
      sexColor: null,
      weightColor: null,
      ageColor: null,
      strengthColor: null
    }
  },
  components: {
    downToLinkedMe,
    popupDownHxsLinkedMe,
    goSignPage,
    preLoading
  },
  computed: {
    isLogin: function() {
      return common.isLogin()
    },
    isApp: function() {
      return common.isApp()
    }
  },
  watch: {
    $route() {
      $(window).off('scroll', this.onScrollTabBox)
      console.log("wtach-route-log")
    }
  },
  beforeDestroy() {
    console.log("beforeDestroy-log")
    $(window).off('scroll', this.onScrollTabBox)
    window.hxsapp_visible_share_btn_mar && delete window.hxsapp_visible_share_btn_mar;

    //如果用户点开ioselect离开当前路由把当前页面iosselect隐藏
    var oBody = document.getElementsByTagName('body')[0];
    var selectBox = document.getElementsByClassName('ios-select-widget-box');
    if (selectBox.length >= 1) {
      oBody.removeChild(selectBox[0]);
      oBody.className = '';
    }
  },
  mounted() {
    this.setArr()

    // linkme
    if (!this.isApp) {
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      // var url = common.config.prefixUrl + "bodyTest";
      var url = "https://hxsapp_home_page";
      this.linkedMe = {
        params: {
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          "key": "hxsapp://scheduleBody"
        }
      }
    }

    // 埋点
    common.buriedPoint({
      access_occurred_type: 121103,//发生访问的【页面】类型
      access_occurred_type_id: '',//发生访问的【页面】类型ID
      previous_event_type_obj: '',//【事件】对象类型
      previous_event_type_obj_id: '',//【事件】对象类型ID
      previous_content_sort: ''//【事件】事件参数
    });

    // 分享的入口处理
    this.setShareContent();

    this.loaded = true
  },
  methods: {
    commit() {
      var _this = this
      if (!_this.high.type) {
        Toast('请选择身高')
      } else if (!_this.sex.type) {
        Toast('请选择性别')
      } else if (!_this.weight.type) {
        Toast('请选择体重')
      } else if (!_this.age.type) {
        Toast('请选择年龄')
      } else if (!_this.strength.type) {
        Toast('请选择活动强度')
      } else {
        let json = {
          sess_token: common.getUrlParam("sess_token"),
          body_high: _this.high.key,
          weight: _this.weight.key,
          age: _this.age.key,
          sex: _this.sex.key,
          activity_intensity: _this.strengthId
        }
        axios.get("https://api.hxsapp.com/slim/evaluate/saveReport", { params: json }).then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            let reportId = res.data.data.eval_id
            this.$router.push({
              path: '/bodyTestReport/' + reportId,
              params: {
                report_id: reportId
              }
            })
            $('html').animate({ scrollTop: 0 }, 30)
          } else {
            Toast('保存失败')
          }
        })
      }
    },
    setArr() {
      for (var i = 50; i < 301; i++) {
        this.heightArr.push({
          id: i,
          value: i + 'cm'
        });
      }
      for (var i = 1; i < 501; i++) {
        this.weightArr.push({
          id: i,
          value: i + 'kg'
        });
      }
      for (var i = 1; i < 201; i++) {
        this.ageArr.push({
          id: i,
          value: i + '岁'
        });
      }
    },
    choose(json, optionName, title) {
      var _this = this;
      var defaultInfo = null;
      //判断 身高 性别 select
      if (optionName == 'height') {
        defaultInfo = 150;
      } else if (optionName == 'sex') {
        defaultInfo = 0;
      } else if (optionName == 'weight') {
        defaultInfo = 45;
      } else if (optionName == 'age') {
        defaultInfo = 25;
      } else if (optionName = 'strength') {
        defaultInfo = 3;
      }

      var iosSelect = new IosSelect(1,
        [json],
        {
          title: title,
          oneLevelId: defaultInfo,
          callback: function(res) {
            if (optionName == 'height') {
              _this.high.value = res.value;
              _this.high.key = res.id;
              _this.high.type = true;
              _this.highColor = { 'color': '#666' }
            } else if (optionName == 'sex') {
              _this.sex.value = res.value;
              _this.sex.key = res.id;
              _this.sex.type = true;
              _this.sexColor = { 'color': '#666' }
            } else if (optionName == 'weight') {
              _this.weight.value = res.value;
              _this.weight.key = res.id;
              _this.weight.type = true;
              _this.weightColor = { 'color': '#666' }
            } else if (optionName == 'age') {
              _this.age.value = res.value;
              _this.age.key = res.id;
              _this.age.type = true;
              _this.ageColor = { 'color': '#666' }
            } else if (optionName == 'strength') {
              _this.strength.value = res.value;
              _this.strength.key = res.id;
              _this.strength.type = true;
              _this.strengthId = res.id;
              _this.strengthColor = { 'color': '#666' }
            }
          }
        }
      );
    },
    setShareContent() {
      var shareTitle = encodeURIComponent('好享瘦身体评测');
      // 邀请码
			// var __inviteCode = common.getInviteCode();
      // common.getInviteCode( ( res )=>{
         
      // })
      var inviteCode = this.$route.params.inviteCode ? this.$route.params.inviteCode: "";

      var __search = "?displayThumbBtn=1&inviteCode=" + inviteCode;

      var shareLink = common.config.prefixUrl + 'bodyTest/' + __search;
      var shareDescr = '输入身高、性别、体重、年龄为你评测标准体重、标准身材比例、摄入量与减脂心率。'
      var shareImages = 'https://app.hxsapp.com/static/bodyTest_share@3x.png'
      
      //分享描述
      var shareType = 'body_eval';

      var shareData = {
        shareTitle,
        shareLink,
        shareImages,
        shareDescr,
        shareType,
      }

      this.initShare(shareData)
    },
    // app右上角分享
    initShare(shareData) {
      if (this.isApp) {
        var json = {
          access_occurred_type: 121103,//发生访问的【页面】类型
          access_occurred_type_id: "",//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        };

        window.hxsapp_visible_share_btn_mar = function() {
          common.buriedPoint(json)
        }

        common.h5CallAppAction.hxsapp_visible_share_btn(shareData)
      } else {
        //二次分享－微信下
        // setShareContent
        // seconDaryShare(decodeURIComponent(Info.title), decodeURIComponent(Info.desc), Info.link, Info.img, data.appId, data.timestamp, data.noncestr, data.signature);
        var title = shareData.shareTitle;
        var desc = shareData.shareDescr;
        var link = shareData.shareLink;
        var img = shareData.shareImages;

        common.outSideShare({
          title,
          desc,
          link,
          img
        });
      }
    },
  }
}
</script>
<style scoped>
@import '../assets/style/iosSelect.css';
</style>
<style lang='less' scoped>
.flexS {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
}

.f22 {
  font-size: 11px;
  color: #666;
  height: 1.5em;
  overflow-y: hidden;
}

.bodyTestWarp {
  min-width: 300px;
}

.topBox {
  background: #F5F5F8;
  width: 100%;
  height: 112px;
  padding-top: 10px;
  .tapBox {
    // width: calc(~'100%' - 60px - 30px);
    height: 70px;
    border-radius: 5px;
    background: #FFF;
    margin: 0 15px;
    padding: 0 16px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    .tap {
      text-align: center;
    }
    .tapIcon_1 {
      background: url("./../assets/img/bodyTest/tizhong_icon@2x.png") left top no-repeat;
    }
    .tapIcon_2 {
      background: url("./../assets/img/bodyTest/shengcai_icon@2x.png") left top no-repeat;
    }
    .tapIcon_3 {
      background: url("./../assets/img/bodyTest/sheru_icon@2x.png") left top no-repeat;
    }
    .tapIcon_4 {
      background: url("./../assets/img/bodyTest/xin_icon@2x.png") left top no-repeat;
    }
    .tapIcon {
      background-size: 100% 100%;
      width: 25px;
      height: 25px;
      display: inline-block;
      margin: 12px 0 0 0;
    }
    .tapName {
      .f22;
    }
  }
  .notice {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10.5px 0 10.5px 15px;
    .shockIcon {
      display: inline-block;
      background: url("./../assets/img/bodyTest/warn_icon@2x.png") left top no-repeat;
      background-size: 100% 100%;
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }
    p {
      .f22;
    }
  }
}

.mainBox {
  .mainTab {
    .flexS;
    font-size: 15px;
    color: #666;
    height: 1.5em;
    overflow-y: hidden;
    padding: 16.5px 15px 18.5px 15px;
  }
  .choose {
    .flexS;
    font-size: 15px;
    color: #999;
    height: 1.5em;
    overflow-y: hidden;
    .rightIcon {
      display: inline-block;
      background: url("./../assets/img/bodyTest/return01-blue@2x.png") left top no-repeat;
      background-size: 100% 100%;
      width: 10px;
      height: 5.75px;
      margin-left: 4px;
      transform: rotate(270deg);
      -webkit-transform: rotate(270deg);
    } // 防止跳行
    @media screen and (max-width: 330px) {
      p {
        font-size: 13px;
      }
    }
  }
  .bottomLine {
    height: 0px;
    width: 96%;
    margin-left: 3.5%;
    border: .5px solid rgba(129, 141, 207, 0.20);
  }
}

.bottomBox {
  text-align: center;
  margin-top: 50px;
  padding-bottom: 120px;
  .commitBtn {
    padding: 11.25px 90px;
    background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
    border-radius: 31px;
    display: inline-block;
    p {
      font-size: 17px;
      color: #FFF;
      letter-spacing: 0;
    }
  }
}
</style>
<style>
/* ios控件样式 */

.ios-select-widget-box .cover-area1 {
  border: none;
  border-top: rgba(129, 141, 207, .2) solid .5px;
}

.ios-select-widget-box .cover-area2 {
  border: none;
  border-bottom: rgba(129, 141, 207, .2) solid .5px;
}
</style>


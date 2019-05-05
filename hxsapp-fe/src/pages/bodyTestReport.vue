<template>
  <div class="testReportWarp">
    <!-- 站外h5的注册头部模块 -->
    <goSignPage v-if="!isApp" >
    </goSignPage>
    
    <div class="weightBox">
      <div class="boxTitle">
        <em class="leftPoint"></em>
        <p>体重</p>
        <em class="rightPoint"></em>
      </div>
      <ul class="centerBox">
        <li class="weight" v-for='(data,index) in weightTypeArr' :key='index'>
          <p class="weightNum">
            {{weightTypeArr[index].value}}
            <span>kg</span>
          </p>
          <p class="weightType">{{weightTypeArr[index].des}}</p>
        </li>
      </ul>
      <div class="line"></div>
      <div class="bottomBox">
        <p class="bottomBoxC">想拥有{{userSexText}}身材，先给自己定个小目标吧</p>
        <!-- <p @click='goDown()'>
          <span>去输入我的数据</span>
          <em class="rightIcon"></em>
        </p> -->
      </div>
    </div>

    <div class="standBox">
      <div class="boxTitle">
        <em class="leftPoint"></em>
        <p>标准身材</p>
        <em class="rightPoint"></em>
      </div>
      <div class="centerBox">
        <div class="userImg" :class='userSex'></div>
        <div v-for='(data,index) in measureArr' :key='index' :class='measureArr[index].key' class='tab'>
          <p>{{measureArr[index].des + ':' + measureArr[index].value}}</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="bottomBox">
        <p>以上是测量出来的标准身材数据，你也可以去记录自己的真实数据哦</p>
        <p @click='goDown()'>
          <span>去输入我的数据</span>
          <em class="rightIcon"></em>
        </p>
      </div>
    </div>

    <div class="heatBox">
      <div class="boxTitle">
        <em class="leftPoint"></em>
        <p>测算热量</p>
        <em class="rightPoint"></em>
      </div>
      <div class="centerBox">
        <p>{{heat}}</p>
        <p>kcal</p>
      </div>
      <div class="line"></div>
      <div class="bottomBox">
        <p>每日能量摄入量指一个人为了维持体重尔摄入的能量，理论上讲，摄入的能量超过这个值将会长胖，低于这个值体重将会降低</p>
        <p @click='goDown()'>
          <span>去添加饮食计划</span>
          <em class="rightIcon"></em>
        </p>
      </div>
    </div>

    <div class="rateBox">
      <div class="boxTitle">
        <em class="leftPoint"></em>
        <p>减脂心率</p>
        <em class="rightPoint"></em>
      </div>
      <div class="centerBox">
        <p>{{heartRate}}</p>
        <p>次/分钟</p>
      </div>
      <div class="line"></div>
      <div class="bottomBox">
        <p>当有氧活动的心率处于最佳减脂运动心率区间时，减脂效率最高</p>
        <p @click='goDown()'>
          <span>去查看活动类型</span>
          <em class="rightIcon"></em>
        </p>
      </div>
    </div>

    <div class="commitBox" @click='goback()'>
      <div class="boldLine"></div>
      <p class="des">以上是根据您的当前身体情况测算出来的结果，如果发生了较大变化，请重新测评。</p>
      <div class="commitBtn">
        <p>重新评测</p>
      </div>
    </div>

    <!--  新的弹出层接入linkedme区域 -->
    <popupDownHxsLinkedMe v-if="isPopupDownLoad && !isApp && linkedMe" :linkedMe="linkedMe">
    </popupDownHxsLinkedMe>

    <downToLinkedMe v-if=" !isApp && linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
    <preLoading v-if="!loaded"></preLoading>
    <remFix></remFix>
  </div>
</template>

<script>
import downLoadApp from "@/components/down"
import downToLinkedMe from "@/components/downToLinkedMe"

import popupDownHxsLinkedMe from "@/components/popupDownHxsLinkedMe"

import remFix from "@/components/remFix"
// 初始化loadding的组件
import preLoading from "@/components/preLoading"

// 站外h5的注册头部模块
import goSignPage from "@/components/goSignPage"

import axios from 'axios'
import { Toast } from 'mint-ui';
import common from '@/util/common.js'

export default {
  name: 'bodyTestReport',
  data() {
    return {
      linkedMe: null,
      isPopupDownLoad: false,
      loaded: false,

      json: {
        id: common.getUrlParam("report_id"),
        sess_token: common.getUrlParam("sess_token")
      },
      reportId: this.$route.params.report_id,
      weightTypeArr: [
        { value: 0, des: '标准体重' },
        { value: 0, des: '美体体重' },
        { value: 0, des: '健康体重' }
      ],
      measureArr: [
        { key: 'shoulder', value: 0, des: '肩宽' },
        { key: 'chest', value: 0, des: '胸围' },
        { key: 'waistline', value: 0, des: '腰围' },
        { key: 'hipline', value: 0, des: '臀围' },
        { key: 'thigh_surround', value: 0, des: '大腿围' },
        { key: 'shank_surround', value: 0, des: '小腿围' },
        { key: 'thigh_length', value: 0, des: '大腿长' },
        { key: 'shank_length', value: 0, des: '小腿长' }
      ],
      userSex: {
        man: false,
        feman: false
      },
      userSexText:'',
      heat: 0, 
      heartRate: 0
    }
  },
  components: {
    downToLinkedMe,
    popupDownHxsLinkedMe,
    preLoading,
    goSignPage,
    remFix
  },
  computed: {
    isLogin: function() {
      return common.isLogin()
    },
    isApp: function() {
      return common.isApp()
    },
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
  },
  mounted() {
    this.loaded = true

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

    this.getReport();
  },
  methods: {
    getReport() {
      var _this = this
      let json = {
        id: this.$route.params.report_id,
        sess_token: common.getUrlParam("sess_token")
      }
      axios.get("https://api.hxsapp.com/slim/evaluate/getReport", { params: json }).then((res) => {
        // console.log(res.data.data)
        if (res.data.code == 200) {
          if (res.data.data.content.sex == 0) {
            _this.userSex = {
              man: false,
              feman: true
            }
            _this.userSexText = '女神'
          } else {
            _this.userSex = {
              man: true,
              feman: false
            }
            _this.userSexText = '男神'
          }

          // 体重
          for (let i = 0; i < res.data.data.weight.length; i++) {
            _this.weightTypeArr[i].value = res.data.data.weight[i].value
          }

          // 身材数据
          for (let i = 0; i < res.data.data.stature.length; i++) {
            _this.measureArr[i].value = res.data.data.stature[i].value
          }

          // 热量心率
          _this.heat = res.data.data.take.value
          _this.heartRate = res.data.data.heartRate.value
        }
      })
    },
    goDown() {
      this.isPopupDownLoad = true
    },
    hidePopupDownLoadCall() {
      this.isPopupDownLoad = false
    },
    setShareContent() {
      var shareTitle = encodeURIComponent('我刚刚评测了我的身材，你也来试试吧！');
      
      // 邀请码
			// var __inviteCode = commonJs.getInviteCode();
      var inviteCode = this.$route.params.inviteCode ? this.$route.params.inviteCode: "";
      var __search = "?displayThumbBtn=1&inviteCode=" + inviteCode;

      var shareLink = common.config.prefixUrl + 'bodyTest/' + __search;
      var shareDescr = '输入身高、性别、体重、年龄为你评测标准体重、标准身材比例、摄入量与减脂心率。'
      var shareImages = 'https://app.hxsapp.com/static/bodyTest_share@3x.png'
      //分享描述
      var shareType = 'eval_report';

      // return {
      //   shareTitle,
      //   shareLink,
      //   shareImages,
      //   shareDescr,
      //   shareType,
      // }
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
    goback() {
      var _this = this
      this.$router.replace({
        path: '/bodyTest'
      })
      $('html').animate({ scrollTop: 0 }, 30)
    }
  }
}
</script>

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

.testReportWarp {
  min-width: 300px;
}

.leftPoint {
  background: url("./../assets/img/bodyTest/r_daunxian@2x.png") left top no-repeat;
  margin-right: 13.5px;
}

.rightPoint {
  background: url("./../assets/img/bodyTest/l_daunxian@2x.png") left top no-repeat;
  margin-left: 13.5px;
}

.leftPoint,
.rightPoint {
  width: 19px;
  height: 4px;
  background-size: 100% 100%;
  display: inline-block;
}

// .line {
//   height: 0px;
//   width: calc(~'100%' - 1px);
//   border: .5px solid rgba(129, 141, 207, 0.20);
// }
.line {
  content: "";
  height: 0;
  display: block;
  border-bottom: 1px solid rgba(129, 141, 207, 0.2);
  // position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: calc(~'100%' - 1px);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .line {
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin: 50% 0%;
  }
}

.boldLine {
  height: 0px;
  width: calc(~'100%' - 7px);
  border: 3.5px solid #F5F5F8;
}

.rightIcon {
  display: inline-block;
  background: url("./../assets/img/bodyTest/return01-blue@2x.png") left top no-repeat;
  background-size: 100% 100%;
  width: 10px;
  height: 5.75px;
  margin-left: 4px;
  transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
}

.userImg {
  // height: 225px;
  height: 260px;
  width: 152px;
  display: inline-block;
}

.man {
  background: url("./../assets/img/bodyTest/boy@2x.png") left top no-repeat;
  background-size: 100% 100%;
}

.feman {
  background: url("./../assets/img/bodyTest/gril@2x.png") left top no-repeat;
  background-size: 100% 100%;
}

.boxTitle {
  background: #F5F5F8;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  padding: 12.5px 0;
  p {
    font-size: 15px;
    color: #333;
    display: inline-block;
  }
}

.rightBorder {
  transform: rotate(180deg);
  p {
    transform: rotate(180deg)
  }
}

.bottomBox {
  background: #FFF;
  text-align: center;
  .bottomBoxC{
    text-align: center !important;
  }
  p:nth-child(1) {
    font-size: 13px;
    color: #999;
    padding: 15px 15px 20px 15px;
    text-align: left;
  }
  p:nth-child(2) {
    font-size: 15px;
    color: #818DCF;
    padding-bottom: 20px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
}

.weightBox {
  // background: #F5F5F8;
  .centerBox {
    .flexS;
    background: #FFF;
    padding: 0 30px;
    .weightNum {
      font-family: "PingFang Medium", "Arial", "Hiragino Sans GB", "Microsoft Yahei";
      font-size: 21px;
      color: #333333;
    }
    .weight {
      text-align: center;
      padding: 16px 0;
      span {
        font-size: 11px;
        color: #999;
      }
      .weightType {
        font-size: 11px;
        color: #666;
      }
    }
  }
}

.standBox {
  // background: #F5F5F8;
  .centerBox {
    text-align: center;
    position: relative;
    padding: 21px 0 29px 0;
    background: #FFF;
    .tab {
      font-size: 11px;
      color: #999;
      display: inline-block;
      background: url("./../assets/img/bodyTest/big_kaung@2x.png") left center no-repeat;
      background-size: 100% 100%;
      position: absolute;
      padding: 4px 5px 5px 6px;
    }
    .chest {
      // top: 99px;
      // right: calc(~ '50% + 71px');
      top: 73px;
      right: calc(~ '50% + 74px');
      .rightBorder;
    }
    .hipline {
      // top: 136px;
      // right: calc(~ '50% + 76px');
      top: 142px;
      right: calc(~ '50% + 74px');
      .rightBorder;
    }
    .thigh_surround {
      // top: 180px;
      // right: calc(~ '50% + 63px');
      top: 186px;
      right: calc(~ '50% + 74px');
      .rightBorder;
    }
    .shank_surround {
      // top: 210px;
      // right: calc(~ '50% + 63px');
      top: 229px;
      right: calc(~ '50% + 74px');
      .rightBorder;
    }
    .shoulder {
      // top: 102px;
      // left: calc(~ '50% + 78px');
      top: 61px;
      left: calc(~ '50% + 76px');
    }
    .waistline {
      // top: 135.2px;
      // left: calc(~ '50% + 59px');
      top: 112px;
      left: calc(~ '50% + 75px');
    }
    .thigh_length {
      // top: 175px;
      // left: calc(~ '50% + 58px');
      top: 161px;
      left: calc(~ '50% + 75px');
    }
    .shank_length {
      // top: 203.5px;
      // left: calc(~ '50% + 58px');
      top: 216px;
      left: calc(~ '50% + 76px');
    }
  }
}

.heatBox,
.rateBox {
  .centerBox {
    text-align: center;
    p:nth-child(1) {
      font-family: "PingFang Medium", "Arial", "Hiragino Sans GB", "Microsoft Yahei";
      font-size: 32px;
      padding: 20px 0 5px 0;
      letter-spacing: 0;
    }
    p:nth-child(2) {
      font-size: 11px;
      color: #999;
      padding-bottom: 15px;
    }
  }
}

.commitBox {
  text-align: center;
  // padding-bottom: 45px;
  .des {
    padding: 20px 15px;
    font-size: 13px;
    color: #999;
    text-align: left;
  }
  .commitBtn {
    padding: 10.75px 90.5px;
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

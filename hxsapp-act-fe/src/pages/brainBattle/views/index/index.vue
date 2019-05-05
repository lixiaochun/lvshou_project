<template>
  <div class="brainBattle">
    <ls-pv ref="lspv"></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="brainBattleContent">
      <div class="brainBackgroundImage">
        <active-background-image></active-background-image>
      </div>
      <div class="bIcon">
        <img :src="bIcon43" class="bIcon43" alt="" />
        <img :src="bIcon44" class="bIcon44" alt="" />
        <img :src="bIcon44_1" class="bIcon44_1" alt="" />
        <img :src="bIcon46" class="bIcon46" alt="" />
        <img :src="bIcon47" class="bIcon47" alt="" />
      </div>
      <header>
        <div class="userLogo">
          <img :src="userInfo.head_img" alt="排行榜">
        </div>
        <div class="content">
          <h3>{{userInfo.nickname}}</h3>
          <div class="title">
            <div class="relative clearfix" :data-user="JSON.stringify(userInfo)">
              <img :src="userInfo.designationImage" v-if="userInfo.designationImage && userInfo.designationImage !== ''" alt="称号"/>
              <div class="star" :data-userInfo="userInfo">
                <img :src="starImage" alt="" class="starImage">
                <span><span class="X">X</span> {{userInfo.number}}</span>
              </div>
            </div>
          </div>
          <div class="description">共获胜<span>{{userInfo.game_num}}</span>场  获胜率<span>{{userInfo.win}}</span></div>
        </div>
      </header>
      <section class="right">
        <img :src="activeRules" alt="活动规则" @click="activeRulesWebview"/>
        <img :src="rankingList" alt="排行榜" @click="rankingListWebview">
        <img :src="titleAward" alt="称号奖励" @click="titleAwardClick" />
        <!--<br /><img :src="titleAward" alt="称号奖励" @click="titleAwardClick1" />-->
      </section>
      <footer>
        <img :src="startGramImage" alt="开始游戏" @click="startGamePlay"/>
        <img :src="invateFriends" alt="邀请好友" @click="invateFriendsFunction">
      </footer>
    </div>
    <!-- 开始游戏、再来一局 -->
    <start-game-play v-if="startGame"></start-game-play>
    <!-- 分享 -->
    <share v-if="shareShow"></share>
  </div>
</template>
<script>
import { baseInformation, getBaseInfo, getUserInfo, vueOpenWebview } from '../../lib/index.js';
import {mintToast} from 'Utils/method'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)

export default {
  data() {
    return {
      store: null,
      backgroundAnimationActive: true, // 背景动画
      startGame: false, // 开始游戏、再来一局
      shareShow: false,
      nickname: '绿瘦',
      lossStart: '',
      topicId: null,
      baseInformation: null,
      userInfo: {
        nickname: '',
        head_img: '',
        star: 1,
        rate: '0%',
        number: 0,
        grade: '加载中...',
        titleBg: require('../../assets/images/img_06.png')
      },
      beforeDestroyClearTimeout: false,
      activeRules: require('../../assets/images/img_01.png'),
      rankingList: require('../../assets/images/img_02.png'),
      titleAward: require('../../assets/images/img_03.png'),
      startGramImage: require('../../assets/images/img_04.png'),
      invateFriends: require('../../assets/images/img_05.png'),
      starImage: require('../../assets/images/img_15.png'),
      bIcon43: require('../../assets/images/img_43.png'),
      bIcon44: require('../../assets/images/img_44.png'),
      bIcon44_1: require('../../assets/images/img_44_1.png'),
      bIcon46: require('../../assets/images/img_46.png'),
      bIcon47: require('../../assets/images/img_47.png'),
      grameInfo: {} // 游戏信息 人物 层次
    }
  },
  // created() {
  //   this.$store.commit('removeStorage');
  // },
  beforeDestroy() {
    this.beforeDestroyClearTimeout = true;
  },
  mounted() {
    let isFirstLoad = this.$store.state.isFirstLoad;
    let state = this.$store.state;
    console.log('isFirstLoad--------------------------', isFirstLoad);
    // // 获取基础数据
    baseInformation.call(this);
    getBaseInfo.call(this, isFirstLoad || !state.baseInformation);
    getUserInfo.call(this, isFirstLoad || !state.userInfo, result => {
      this.userInfo = result;
    })
    let topicId = this.$route.params.topicId;
    this.$store.commit('topicId', topicId);
    this.$store.commit('isFirstLoad');
    this.topicId = this.$store.state.topicId;
    _hmt.push(['_trackEvent', '按钮', '脑力大作战', '页面初始化'])
    // mintToast('请求报错，请重新选择')
  },
  methods: {
    // 宝箱 \ 抽奖
    titleAwardClick() {
      vueOpenWebview.call(this, 'treasureBox')
    },
    // 开始游戏 // 开始匹配 如果匹配不成功
    async startGamePlay() {
      // alert(JSON.stringify(this.$store.state.baseInformation))
      _hmt.push(['_trackEvent', '开始游戏', '脑力大作战', '开始游戏'])
      this.startGame = true;
    },
    // 活动规则
    activeRulesWebview() {
      _hmt.push(['_trackEvent', '活动规则', '脑力大作战', '活动规则'])
      vueOpenWebview.call(this, 'rules')
    },
    rankingListWebview() {
      vueOpenWebview.call(this, 'rankingList')
    },
    invateFriendsFunction() {
      _hmt.push(['_trackEvent', '邀请好友', '脑力大作战', '邀请好友'])
      this.shareShow = true;
    }
  }
}
</script>
<style lang="less" scoped>
  .brainBattle{
    position: relative;
    background: #250b6c;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .brainBattleContent{
      width: 100vw;
      height: 100vh;
      position: relative;
      .brainBackgroundImage{
        width: 100vw;
        height: 100vh;
        position: relative;
      }
      .bIcon{
        .bIcon43{
          position: absolute;
          top: 100px;
          left: 7%;
          z-index: 1;
          width: 86%;
        }
        .bIcon44{
          position: absolute;
          bottom: 96vw;
          right: 6vw;
          z-index: 3;
          width: 25.3vw;
        }
        .bIcon44_1{
          position: absolute;
          bottom: 96vw;
          right: 6vw;
          z-index: 3;
          width: 25.3vw;
          animation: quest 2s linear 0s infinite alternate;
          -webkit-animation: quest 2s linear 0s infinite alternate;
        }
        .bIcon46{
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 2;
          width: 100%;
        }
        .bIcon47{
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1;
          width: 100%;
        }
        @keyframes quest
        {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-30deg);
          }
          75% {
            transform: rotate(30deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @-webkit-keyframes quest
        {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-30deg);
          }
          75% {
            transform: rotate(30deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      }
      header{
        position: absolute;
        width: 100%;
        top: 1.65vh;
        left: 0;
        z-index: 100;
        .userLogo{
          float: left;
          margin-left: 1.86vw;
          width: 12vw;
          height: 12vw;
          border: 0.6vw solid #000000;
          border-radius: 50%;
          overflow: hidden;
          background: #ffffff;
          padding: 0.6vw 0.6vw 1vw 0.6vw;
          box-shadow: 0 -0.6vw #e4e4e4 inset;
          text-align: center;
          img{
            width: 9.2vw;
            height: 9.2vw;
            border-radius: 50%;
            vertical-align: top;
          }
        }
        .content{
          float: left;
          margin-left: 1.3vw;
          width: 50vw;
          text-align: left;
          h3{
            text-align: left;
            margin: 0;
            padding: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 26px;
            height: 1.3em;
            line-height: 1.3em;
            color: #ffffff;
          }
          .description{
            font-size: 2.66vw;
            margin-top: 1px;
            color: #ffffff;
            width: 150%;
            span{
              color: #ffeb03;
            }
          }
          .title{
            /*height: 50px;*/
            /*height: 5.74vw;*/
            margin: -5px 0 0 0;
            text-align: left;
            font-size: 0;
            .relative{
              /*height: 50px;*/
              width: 100%;
              position: relative;
              display: inline-block;
              img{
                /*height: 100%;*/
                float: left;
                width: 20vw;
                vertical-align: top;
                margin: 0;
              }
              .grade{
                position: absolute;
                top: 14%;
                left: 22%;
                font-size: 22px;
                color: #000000;
                line-height: 22px;
                font-weight: 600;
              }
              .star{
                float: left;
                /*position: absolute;*/
                /*top: 14%;*/
                /*right: -35px;*/
                font-size: 26px;
                /*height: 26px;*/
                line-height: 6vw;
                color: #ffffff;
                margin-left: 6px;
                .starImage{
                  width: 6vw;
                }
                span{
                  display: inline-block;
                }
                .X{
                  font-size: 20px;
                  margin-left: 3px;
                  margin-right: 6px;
                }
              }
            }
          }
          >::after{
            content:"."; display:block; height:0; visibility:hidden; clear:both;
          }
        }
      }
      >::after{
        content:"."; display:block; height:0; visibility:hidden; clear:both;
      }
      section.right{
        position: absolute;
        left: 0;
        top: 20vh;
        width: 12.5vw;
        font-size: 0;
        z-index: 100;
        img{
          vertical-align: top;
          width: 100%;
          margin-bottom: 16px;
        }
      }
      footer{
        position: absolute;
        left: 0;
        bottom: 1.7vh;
        width: 100%;
        z-index: 100;
        font-size: 0;
        img{
          vertical-align: top;
          height: 19.5vh;
          margin: 0 6px;
        }
      }
      /*  */
      .matching{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
        background: rgba(0,0,0,0.5);
        color: #ffffff;
      }
    }
  }
</style>

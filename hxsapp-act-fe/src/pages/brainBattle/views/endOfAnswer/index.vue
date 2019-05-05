<template>
  <div class="brainBattle" v-bind:style="{backgroundSize: '60%',backgroundImage: 'url(' + Background + ')'}">
    <ls-pv ref="lspv"></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <!--<div class="brainBackgroundImage">-->
      <!--<active-background-image></active-background-image>-->
    <!--</div>-->
    <div class="brainContent">
      <!-- 倒计时和分数 -->
      <section>
        <img :src="victoryImg" alt="胜利" v-if="result.result === 1">
        <img :src="sfImg" alt="平局" v-else-if="result.result === 3">
        <img :src="failImg" alt="失败" v-else-if="result.result === 2">
      </section>
      <!-- 用户头像、用户名、题目和题目类型 -->
      <section>
        <div class="uservest user score userScore" v-if="result.user">{{result.user.source}}分</div>
        <div class="uservest user">
          <div class="content" v-if="grameInfo && grameInfo.user_info">
            <div class="userimg">
              <img :src="grameInfo.user_info.head_img" alt="">
            </div>
            <div class="name">{{grameInfo.user_info.nickname}}</div>
          </div>
        </div>
        <div class="uservest vest score vestScore" v-if="result.vest">{{result.vest.source}}分</div>
        <div class="uservest vest">
          <div class="content" v-if="grameInfo && grameInfo.vest_info">
            <div class="userimg">
              <img :src="grameInfo.vest_info.head_img" alt="">
            </div>
            <div class="name">{{grameInfo.vest_info.nickname}}</div>
          </div>
        </div>
      </section>
      <!-- 奖励 -->
      <section>
        <div class="reward" v-if="result.result === 1 || result.result === 3">奖励</div>
        <!-- 胜利 -->
        <div class="victory" v-if="result.result === 1">
          <div class="box">
            <div class="boxContent">
              <img :src="vdouImage" alt="">
              <div class="name">绿豆：{{lvdou}}</div>
            </div>
          </div>
          <div class="box">
            <div class="boxContent">
              <img :src="starImage" alt="">
              <div class="name">聪明星：1颗</div>
            </div>
          </div>
        </div>
        <!-- 平局 -->
        <div class="sf" v-else-if="result.result === 3">
          <div class="box">
            <div class="boxContent">
              <img :src="vdouImage" alt="">
              <div class="name">绿豆：{{lvdou}}</div>
            </div>
          </div>
        </div>
        <!-- 失败  -->
        <div class="fail" v-else-if="result.result === 2">
          <img :src="failIconImage" class="failIconImage" alt="" />
          <div class="failValue">失败乃成功之母！继续加油奥！</div>
        </div>
      </section>
      <!-- 题目选项 -->
      <section>
        <ul v-if="result.result">
          <li v-if="result.result === 1" @click="shareShowFunction">
            <!--炫耀一下-->
            <img :src="ShowOff" alt="炫耀一下" style="width: 100%;vertical-align: top;" />
          </li>
          <li v-else @click="shareShowFunction">
            <!--求助好友-->
            <img :src="HelpFriends" alt="求助好友" style="width: 100%;vertical-align: top;" />
          </li>
          <li @click="again">
            <!--再来一局-->
            <img :src="AnotherRound" alt="再来一局" style="width: 100%;vertical-align: top;" />
          </li>
        </ul>
      </section>
    </div>
    <!-- 胜利 -->
    <active-victory-box v-if="ActiveVictoryBoxShow" title="胜利" :star="victoryStar"></active-victory-box>
    <!-- 开始游戏、再来一局 -->
    <start-game-play v-if="startGame" replace="replace"></start-game-play>
    <!-- 分享 -->
    <share v-if="shareShow"></share>
  </div>
</template>
<script>

import {baseInformation, getBaseInfo, getUserInfo, api} from '../../lib/index.js';
import LvshouFetch from 'Api/common';
import {mintToast} from 'Utils/method'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)
export default {
  data() {
    return {
      nickname: '绿瘦',
      victoryStar: 1,
      Background: require('../../assets/images/img_07.png'),
      startGame: false, // 开始游戏、再来一局
      shareShow: false, // 分享
      lossStart: '',
      topicId: null,
      matchingAnimation: false, // 匹配成功动画 默认为true
      ActiveVictoryBoxShow: false, // 胜利 ActiveVictoryBoxShow // 解锁称号
      grameInfo: {},
      lvdou: 10, //  胜利10 平局5 失败不显示
      result: '',
      vdouImage: require('../../assets/images/img_14.png'),
      starImage: require('../../assets/images/img_15.png'),
      victoryImg: require('../../assets/images/img_11.png'),
      sfImg: require('../../assets/images/img_12.png'),
      failImg: require('../../assets/images/img_13.png'),
      failIconImage: require('../../assets/images/img_50.png'),
      logo: require('../../assets/images/img_03.png'),
      ShowOff: require('../../assets/images/img_51.png'),
      HelpFriends: require('../../assets/images/img_52.png'),
      AnotherRound: require('../../assets/images/img_39.png')
    }
  },
  created() {
    // 1 胜利 2失败 3平局
    baseInformation.call(this);
    getBaseInfo.call(this);
    getUserInfo.call(this);
    // // 获取基础数据
    this.grameInfo = this.$store.state.grameInfo;
    this.topicId = this.$route.params.topicId;
    _hmt.push(['_trackEvent', '按钮', '脑力大作战', '答题结束'])
  },
  mounted() {
    let guessAnswerCount = this.$store.state.guessAnswerCount;
    // alert(JSON.stringify(guessAnswerCount))
    if (guessAnswerCount) {
      this.setResult(guessAnswerCount);
    } else {
      this.getGrameCount();
    }
  },
  methods: {
    async getGrameCount() {
      let state = this.$store.state;
      let data = {
        sess_token: state.baseInformation.sess_token,
        act_id: state.baseInformation.act_id,
        vest_id: state.grameInfo.vest_info.user_id,
        number_id: state.grameInfo.number
      }
      // 胜利
      // let data = {sess_token: "fbca3d52487b2f4ed5a1323ebb13732a", act_id: "305", vest_id: "64552", number_id: "62"}
      // 平局
      // let data = {sess_token: "fbca3d52487b2f4ed5a1323ebb13732a", act_id: "305", vest_id: "64552", number_id: "72"}
      // 失败
      // let data = {sess_token: "247686a82dd5f676d29ddfdda6fde3bf", act_id: "324", vest_id: "62662", number_id: "168"}
      await LvshouFetch({
        url: api('lantern/GuessAnswer/count'),
        data
      }).then((result) => {
        this.$store.commit('guessAnswerCount', result);
        this.setResult(result);
      }).catch(err => {
        let msg = err && err.msg ? err.msg : 'api 接口报错';
        mintToast(msg)
      })
    },
    setResult(result) {
      // 重新载入用户信息
      getUserInfo.call(this, 'reload', (userInfo) => {
        if (parseInt(result.result) === 1) {
          this.lvdou = 10;
          //                        奋力青铜 ★x1 =>1
          // 奋力青铜 ★x1  赢三局→ 不屈白银 ★x1 =>4
          // 不屈白银 ★x1  赢三局→ 博学黄金 ★x1 =>7
          // 博学黄金 ★x1  赢五局→ 超凡钻石 ★x1 =>12
          // 超凡钻石 ★x1  赢六局→ 鸿儒大师 ★x1 =>18
          // 鸿儒大师 ★x1  赢十局→ 脑力王者 ★x1 =>28
          // 解锁称号
          let regStar = /^(4|7|12|18|28)$/g;
          let star = parseInt(userInfo.star.toString().trim());
          if (regStar.test(star)) {
            this.victoryStar = star;
            if (!result.popup && result.popup !== 'ActiveVictoryBoxShow') {
              this.ActiveVictoryBoxShow = true;
            }
          }
        } else if (parseInt(result.result) === 3) {
          this.lvdou = 5;
        }
        result.result = parseInt(result.result);
        this.result = result;
      })
    },
    // 再来一局
    again() {
      this.startGame = true;
    },
    //   分享
    shareShowFunction() {
      this.shareShow = true
    }
  }
}
</script>
<style lang="less" scoped>
  .brainBattle{
    background: #250b6c;
    /*background: #f8de23;*/
    width: 100vw;
    height: 100vh;
    position: relative;
    box-sizing: content-box;
    padding-bottom: 10vw;
    .brainBackgroundImage{
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    .brainContent{
      /*position: absolute;*/
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100%;
      section:first-child{
        box-sizing: content-box;
        padding: 60px 0 10px;
        text-align: center;
        img{
          width: 40vw;
          vertical-align: top;
        }
      }
      section:nth-child(2){
        position: relative;
        height: 39vw;
        .uservest{
          position: absolute;
          top: 0;
          color: #000000;
          box-shadow: 0 -8px 0 rgba(0, 0, 0, 0.21) inset;
          height: 39vw;
          width: 47.6vw;
          border: 6px solid #000000;
          display: flex;
          display: -webkit-flex;
          display: -webkit-inline-flex;
          justify-content: center;
          align-items: center;
          .content{
            .userimg{
              height: 106px;
              width: 106px;
              border-radius: 50%;
              box-sizing: content-box;
              background: #ffffff;
              box-shadow: 0 -8px 0 #c9c9c9 inset;
              text-align: center;
              margin: 0 auto;
              border: 6px solid #000000;
              img{
                width: 98px;
                height: 98px;
                border: 8px solid #ffffff;
                border-radius: 50%;
                vertical-align: top;
              }
            }
            .name{
              margin-top: 10px;
              height: 2em;
              color: #000000;
              font-size: 33px;
              font-weight: bold;
            }
          }
        }
        .score{
          color:#ffffff;
          font-size: 48px;
          line-height: 9.6vw;
          top: -9.6vw;
          width: 26.9vw;
          box-shadow: none;
          align-items: flex-start;
        }
        .userScore{
          padding-right: 6.9vw;
        }
        .user{
          left: 0;
          background: #6db1f6;
          border-left: 0;
          border-radius: 0 90px 90px 0;
        }
        .vestScore{
          padding-left: 3.9vw;
        }
        .vest{
          right: 0;
          background: #ff7bb5;
          border-right: 0;
          border-radius:  90px 0 0 90px;
        }
      }
      /* 奖励 */
      section:nth-child(3){
        .reward{
          width: 136px;
          height: 62px;
          line-height: 62px;
          color: #805af4;
          border-radius: 62px;
          text-align: center;
          margin: 30px auto 20px;
          font-size: 36px;
          font-weight: bold;
          background: rgba(0,0,0,0.5);
        }
        .box{
          width: 35.7vw;
          height: 35.7vw;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          display: -webkit-flex;
          display: -webkit-inline-flex;
          justify-content: center;
          align-items: center;
          .boxContent{
            img{
              width: 18.9vw;
              height: 18.9vw;
              vertical-align: top;
            }
            .name{
              font-size: 30px;
              color: #ffffff;
              font-weight: bold;
              margin-top: 16px;
            }
          }
        }
        .fail{
          margin-top: 56px;
          .failIconImage{
            width: 38.5vw;
          }
          .failValue{
            /*margin-top: 30px;*/
            font-size: 30px;
            color: #ffffff;
          }
        }
      }
      section:last-child{
         ul{
           list-style: none;
           margin: 0;
           padding: 0;
           width: 100%;
           margin-top: 50px;
           li{
             list-style: none;
             height: 108px;
             line-height: 88px;
             width: 69.6vw;
             margin: 32px auto 0;
             border-radius: 53px;
             font-size: 47px;
             color: #ffffff;
             text-align: center;
           }
         }
      }
    }
  }
</style>

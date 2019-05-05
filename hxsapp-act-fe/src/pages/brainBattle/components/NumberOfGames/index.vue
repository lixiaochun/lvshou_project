<template>
  <div>
    <div class="NumberOfGames">
      <div v-bind:class="{contentBox: true,openBox: openBox,closebox: closebox}">
        <img :src="topImage" alt="" class="topImage" />
        <div class="closeImageBox" @click="NumberOfGamesClose">
          <img :src="closeImage" alt="" class="closeImage" />
        </div>
        <div class="content">
           <div class="textContent">
             <div class="title">
               <div>当前剩余游戏次数：{{gametimes}}</div>
               <div>完成下列次数可获得更多次数哦</div>
             </div>
             <div class="ul">
               <div class="li">
                 <div class="number">1.邀请好友({{sharetimes}}/1)</div>
                 <img :src="success" class="buttonImage" alt="已完成"  v-if="parseInt(sharetimes) === 1 || sharetimes > 1" />
                 <img :src="fail" class="buttonImage" @click="InviteFriends" alt="未完成" v-else />
               </div>
               <div class="li">
                 <div class="number">2.发布动态 ({{movetimes}}/3)</div>
                 <img :src="success" class="buttonImage" alt="已完成" v-if="parseInt(movetimes) === 3 || movetimes > 3" />
                 <img :src="fail" class="buttonImage" alt="未完成" v-else  @click="movetimesClick" />
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
    <!-- 分享 -->
    <share v-if="shareShow"></share>
  </div>
</template>

<script>
import {visibilitychange, hxsappJumpDynamic} from '../../lib/index.js';
export default {
  name: 'number-of-games',
  data() {
    return {
      visibilityState: 'visible', // hidden visible
      shareShow: false,
      topImage: require('../../assets/images/img_26.png'),
      closeImage: require('../../assets/images/img_17.png'),
      success: require('../../assets/images/img_27.png'),
      fail: require('../../assets/images/img_29.png'),
      openBox: true,
      closebox: false
    }
  },
  props: [ 'gametimes', 'sharetimes', 'movetimes' ],
  mounted() {
    // 隐藏弹框
    visibilitychange.call(this, function (state) {
      if (this.visibilityState === 'hidden' && state === 'visible') {
        this.$parent.NumberOfGamesShow = false;
      }
      this.visibilityState = state;
    }.bind(this))
  },
  methods: {
    NumberOfGamesClose() {
      //   处理中奖问题
      let guessAnswerCount = this.$store.state.guessAnswerCount;
      if (guessAnswerCount) {
        guessAnswerCount.popup = 'ActiveVictoryBoxShow';
        this.$store.commit('guessAnswerCount', guessAnswerCount);
      }
      // this.$parent.NumberOfGamesObject.movetimes = 3;
      if (this.$parent.BoxClose && typeof this.$parent.BoxClose === 'function') {
        this.$parent.BoxClose()
      } else {
        this.openBox = false;
        this.closebox = true;
        setTimeout(function () {
          this.$parent.NumberOfGamesShow = false
        }.bind(this), 400)
      }
    },
    movetimesClick() {
      let topicId = this.$route.params.topicId;
      hxsappJumpDynamic.call(this, topicId);
    },
    InviteFriends() {
      this.shareShow = true;
    }
  }
}
</script>

<style lang="less" scoped>
  .NumberOfGames{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    .contentBox{
      position: relative;
      width: 90%;
      /*position: fixed;*/
      /*top: 50%;*/
      /*left: 50%;*/
      /*width: 86.8vw;*/
      /*-webkit-transform: translateX(-50%) translateY(-50%);*/
      /*transform: translateX(-50%) translateY(-50%);*/
      .content{
        position: relative;
        /*border: 7px solid red;*/
        padding: 23px;
        border: 7px solid #000000;
        background: #6db1f6;
        border-radius: 20px;
        .textContent{
          background: #3b83cd;
          border-radius: 20px;
          width: 100%;
          height: 100%;
          color: #ffffff;
          .title{
            font-size: 36px;
            width: 86%;
            line-height: 1.6em;
            margin: 0 auto;
            padding: 50px 0 10px;
            border-bottom: 1px dashed #ffffff;/*no*/
          }
          .ul{
            padding: 0 0 44px;
            width: 86%;
            margin: 0 auto;
            .li{
              display: flex;
              display: -webkit-flex;
              display: -webkit-inline-flex;
              justify-content: space-between;
              -webkit-justify-content: space-between;
              align-items: center;
              font-size: 36px;
              width: 100%;
              margin-top: 20px;
              /*background: pink;*/
              .buttonImage{
                width: 198px;
                height: 63px;
                margin-right: -5px;
                vertical-align: top;
              }
            }
          }
        }
      }
      .topImage{
        position: absolute;
        width: 100%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        left: 0;
        top: 0;
        z-index: 1000;
        vertical-align: top;
      }
      .closeImageBox{
        position: absolute;
        width: 51px;
        height: 51px;
        right: 0;
        top: 0;
        z-index: 1001;
        padding: 17px;
        box-sizing: content-box;
        /*background: palevioletred;*/
        .closeImage{
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
    }
    .openBox{
      animation: box 0.4s;
      -webkit-animation: box 0.4s;
    }
    @keyframes box{
      0%{
        transform: scale(0);
      }
      75%{
        transform: scale(1.5);
      }
      100%{
        transform: scale(1);
      }
    }
    @-webkit-keyframes box{
      0%{
        transform: scale(0);
      }
      75%{
        transform: scale(1.5);
      }
      100%{
        transform: scale(1);
      }
    }
    .closebox{
      animation: cbox 0.4s;
      -webkit-animation: cbox 0.4s;
    }
    @keyframes cbox{
      0%{
        transform: scale(1);
      }
      75%{
        transform: scale(1.5);
      }
      100%{
        transform: scale(0);
      }
    }
    @-webkit-keyframes cbox{
      0%{
        transform: scale(1);
      }
      75%{
        transform: scale(1.5);
      }
      100%{
        transform: scale(0);
      }
    }
  }
</style>

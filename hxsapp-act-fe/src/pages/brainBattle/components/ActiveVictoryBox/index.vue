<template>
  <div class="ActiveVictoryBox">
    <div v-bind:class="{VictoryBox: true,openBox: openBox,closebox: closebox}">
      <div class="top">
        <img :src="topImg" class="topImg" alt="" />
        <img :src="topClose" class="topClose" alt="" @click="VictoryBoxClose">
        <div class="title">{{title}}</div>
      </div>
      <div class="content" v-bind:style="{ backgroundImage: 'url(' + activeBackground + ')'}">
         <img :src="handleGradeFunction(star).designationImage" :alt="handleGradeFunction(star).grade" v-if="star" class="handleGradeFunction"/>
         <div class="description">
           <div>恭喜你解锁新称号！</div>
           <div style="margin-top: 3px;">并获得一次抽奖机会！</div>
         </div>
        <div class="button" @click="toLotteryDraw">去抽奖</div>
      </div>
      <div class="footer">
        <img :src="footerImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import {handleGrade, vueOpenWebview} from '../../lib/index.js';
export default {
  name: 'active-victory-box',
  data() {
    return {
      topImg: require('../../assets/images/img_16.png'),
      topClose: require('../../assets/images/img_17.png'),
      footerImg: require('../../assets/images/img_18.png'),
      activeBackground: require('../../assets/images/img_19.png'),
      openBox: true,
      closebox: false
    }
  },
  props: [ 'title', 'star' ],
  mounted() {

  },
  methods: {
    VictoryBoxClose() {
      if (this.$parent.BoxClose && typeof this.$parent.BoxClose === 'function') {
        this.$parent.VictoryBoxClose()
      } else {
        this.openBox = false;
        this.closebox = true;
        setTimeout(function () {
          this.$parent.ActiveVictoryBoxShow = false
        }.bind(this), 400)
      }
    },
    // 宝箱 \ 抽奖
    toLotteryDraw() {
      vueOpenWebview.call(this, 'treasureBox')
    },
    handleGradeFunction(n) {
      console.log('handleGrade.call(this, n)------', handleGrade.call(this, n))
      return handleGrade.call(this, n)
    }
  }
}
</script>

<style lang="less" scoped>
  .ActiveVictoryBox{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    .VictoryBox{
      position: fixed;
      width: 86.8vw;
      /*top: 50%;*/
      /*left: 50%;*/
      /*-webkit-transform: translateX(-50%) translateY(-50%);*/
      /*transform: translateX(-50%) translateY(-50%);*/
      font-size: 0;
      .top{
        position: relative;
        width: 100%;
        img{
          vertical-align: top;
        }
        .topImg{
          width: 100%;
        }
        .topClose{
          width: 9%;
          position: absolute;
          top: 62%;
          right: 4%;
        }
        .title{
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          font-size: 46px;
          font-weight: bold;
          color: #ffda0e;
          height: 10vw;
          letter-spacing: 3px;
          line-height: 10vw;
          width: 36vw;
        }
      }
      .content{
        background-size: 100%;
        margin-top: -2px;
        margin-bottom: -2px;
        padding: 30px 0;
        .handleGradeFunction{
          width: 56vw;
          margin: 20px auto 30px;
        }
        .description{
          font-size: 30px;
          color: #ffffff;
          text-align: center;
          margin-top: 25px;
        }
        .button{
          height: 90px;
          line-height: 74px;
          box-shadow: 0 -8px 0 rgba(0, 0, 0, 0.21) inset;
          width: 44.7%;
          margin: 32px auto 0;
          border-radius: 23px;
          font-size: 40px;
          color: #ffffff;
          text-shadow: 4px 4px 0 #000000,-4px -4px 0 #000000,4px -4px 0 #000000,-4px 4px 0 #000000,-4px 0 0 #000000,0 -4px 0 #000000,4px 0 0 #000000,0 4px 0 #000000;
          border: 4px solid #000000;
          text-align: center;
          font-weight: bold;
          background: #00ffff;
        }
      }
      .footer{
        width: 100%;
        img{
          width: 100%;
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

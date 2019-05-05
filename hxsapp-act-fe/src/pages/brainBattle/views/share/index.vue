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
      <footer>
        <img :src="startGramImage" alt="开始游戏" @click="channel_statistics"/>
      </footer>
    </div>
  </div>
</template>
<script>
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)

export default {
  data() {
    return {
      store: null,
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
      activeRules: require('../../assets/images/img_01.png'),
      rankingList: require('../../assets/images/img_02.png'),
      titleAward: require('../../assets/images/img_03.png'),
      startGramImage: require('../../assets/images/img_45.png'),
      invateFriends: require('../../assets/images/img_05.png'),
      starImage: require('../../assets/images/img_15.png'),
      bIcon43: require('../../assets/images/img_43.png'),
      bIcon44: require('../../assets/images/img_44.png'),
      bIcon44_1: require('../../assets/images/img_44_1.png'),
      bIcon46: require('../../assets/images/img_46.png'),
      bIcon47: require('../../assets/images/img_47.png'),
      grameInfo: { // 游戏信息 人物 层次
        uname: '',
        vname: ''
      },
      playGrame: false
    }
  },
  created() {
    // this.dynameicInfo()
    _hmt.push(['_trackEvent', '按钮', '脑力大作战', '站外分享页'])
  },
  mounted() {

  },
  methods: {
    channel_statistics() {
      window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=576'
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
          top: 20px;
          left: 0;
          z-index: 1;
          width: 100%;
        }
        .bIcon44{
          position: absolute;
          bottom: 100vw;
          right: 2.6vw;
          z-index: 3;
          width: 23vw;
        }
        .bIcon44_1{
          position: absolute;
          bottom: 100vw;
          right: 2.6vw;
          z-index: 3;
          width: 23vw;
          animation: quest 2s linear 0s infinite alternate;
          -webkit-animation: quest 2s linear 0s infinite alternate;
        }
        .bIcon46{
          position: absolute;
          bottom: -5vw;
          left: -2vw;
          z-index: 2;
          width: 110vw;
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
      footer{
        position: absolute;
        left: 0;
        bottom: 1.7vh;
        width: 100%;
        z-index: 100;
        font-size: 0;
        img{
          vertical-align: top;
          width: 73.2vw;
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

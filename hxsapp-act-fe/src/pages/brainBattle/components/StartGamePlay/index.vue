<template>
  <div>
    <!-- 任务弹窗 -->
    <number-of-games :gametimes='NumberOfGamesObject.gametimes'
                     :sharetimes="NumberOfGamesObject.sharetimes"
                     :movetimes='NumberOfGamesObject.movetimes'
                     v-if="NumberOfGamesShow">
    </number-of-games>
    <!-- 游戏次数用完了 -->
    <run-out-of-times v-if="RunOutOfTimesShow"></run-out-of-times>
  </div>
</template>

<script>
import {mintToast, isLogin} from 'Utils/method'
import LvshouFetch from 'Api/common';
import {vueOpenWebview, api} from '../../lib/index.js';
export default {
  name: 'start-game-play',
  data() {
    return {
      RunOutOfTimesShow: false, // 游戏次数用完了
      NumberOfGamesShow: false, // 游戏次数
      NumberOfGamesObject: {
        gametimes: 0, // 该用剩余游戏次数
        sharetimes: 0, // 分享好友次数
        movetimes: 0 // 发布动态次数
      }
    }
  },
  props: [ 'replace' ],
  mounted() {
    this.startGamePlay();
  },
  methods: {
    // 开始游戏 // 开始匹配 如果匹配不成功
    async startGamePlay() {
      // 1=进行中；-1=已结束；-2=未开始
      let baseActiveInfo = this.$store.state.baseActiveInfo;
      if (baseActiveInfo.state === -1) {
        mintToast('活动已结束');
        return false;
      }
      if (baseActiveInfo.state === -2) {
        mintToast('活动未开始');
        return false;
      }
      let data = this.$store.state.baseInformation;
      await LvshouFetch({
        url: api('lantern/GuessAnswer/pair'),
        warning: false,
        data
      }).then(result => {
        this.grameInfo = result;
        this.$store.commit('grameInfo', result);
        // 1.5跳转到答题
        let replace = !!(this.replace || this.$props.replace);
        vueOpenWebview.call(this, 'answer', replace);
      }).catch(err => {
        let msg = err.msg && err.msg !== '' ? err.msg : '网络异常';
        // 判断是否登录
        if (!isLogin(err.code)) {
          return false;
        };
        /* "code":305 1.邀请好友 2.发布动态 才可以继续猜题  */
        if (err && parseInt(err.code) === 305) {
          // alert(result.msg);
          this.NumberOfGamesShow = true;
          this.NumberOfGamesObject = err.data;
          return false;
        }
        /* "code":301 "msg":"每天只能玩5次"  */
        if (err && parseInt(err.code) === 301) {
          this.RunOutOfTimesShow = true;
          return false;
        }
        this.$parent.startGame = false;
        mintToast(msg);
      })
    }
  },
  watch: {
    RunOutOfTimesShow() {
      if (!this.RunOutOfTimesShow) {
        this.$parent.startGame = false;
      }
    },
    NumberOfGamesShow() {
      if (!this.NumberOfGamesShow) {
        this.$parent.startGame = false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  /*.NumberOfGames{*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*background: rgba(0, 0, 0, 0.5);*/
    /*display: flex;*/
    /*display: -webkit-flex;*/
    /*display: -webkit-inline-flex;*/
    /*justify-content: center;*/
    /*-webkit-justify-content: center;*/
    /*align-items: center;*/
    /*.contentBox{*/
      /*position: relative;*/
      /*width: 90%;*/
      /*!*position: fixed;*!*/
      /*!*top: 50%;*!*/
      /*!*left: 50%;*!*/
      /*!*width: 86.8vw;*!*/
      /*!*-webkit-transform: translateX(-50%) translateY(-50%);*!*/
      /*!*transform: translateX(-50%) translateY(-50%);*!*/
      /*.content{*/
        /*position: relative;*/
        /*!*border: 7px solid red;*!*/
        /*padding: 23px;*/
        /*border: 7px solid #000000;*/
        /*background: #6db1f6;*/
        /*border-radius: 20px;*/
        /*.textContent{*/
          /*background: #3b83cd;*/
          /*border-radius: 20px;*/
          /*width: 100%;*/
          /*height: 100%;*/
          /*color: #ffffff;*/
          /*text-align: center;*/
          /*padding: 100px 0;*/
          /*.rtitle{*/
            /*font-size: 39px;*/
          /*}*/
          /*.rtcon{*/
            /*font-size: 77px;*/
            /*font-weight: 600;*/
            /*letter-spacing: 5px;*/
          /*}*/
        /*}*/
      /*}*/
      /*.topImage{*/
        /*position: absolute;*/
        /*width: 100%;*/
        /*transform: translateY(-50%);*/
        /*-webkit-transform: translateY(-50%);*/
        /*left: 0;*/
        /*top: 0;*/
        /*z-index: 1000;*/
        /*vertical-align: top;*/
      /*}*/
      /*.closeImage{*/
        /*position: absolute;*/
        /*width: 51px;*/
        /*height: 51px;*/
        /*right: 17px;*/
        /*top: 17px;*/
        /*z-index: 1001;*/
        /*vertical-align: top;*/
      /*}*/
    /*}*/
  /*}*/
</style>

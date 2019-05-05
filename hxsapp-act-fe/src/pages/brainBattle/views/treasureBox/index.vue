<template>
  <div class="treasureBox" v-bind:style="{backgroundSize: '60%',backgroundImage: 'url(' + Background + ')'}">
    <ls-pv ref="lspv"></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="treasureBoxContent">
      <div class="title">每解锁一个新称号，即可获得抽奖资格！</div>
      <div class="box clearfix">
        <div class="boxLi">
          <div class="boxImage" @click="GuessAnswerDraw(1)">
            <img :src="box1" alt="" v-if="box_index === 1" />
            <img :src="box0" alt="" v-else />
          </div>
          <div class="boxName">宝箱1</div>
        </div>
        <div class="boxLi">
          <div class="boxImage" @click="GuessAnswerDraw(2)">
            <img :src="box1" alt="" v-if="box_index === 2" />
            <img :src="box0" alt="" v-else />
          </div>
          <div class="boxName">宝箱2</div>
        </div>
        <div class="boxLi">
          <div class="boxImage" @click="GuessAnswerDraw(3)">
            <img :src="box1" alt="" v-if="box_index === 3" />
            <img :src="box0" alt="" v-else />
          </div>
          <div class="boxName">宝箱3</div>
        </div>
      </div>
      <div class="Prizepool">奖品池</div>
      <div class="boxGift">
         <div class="boxGiftContent">
           <div class="swiper-container">
             <div class="swiper-wrapper" style="font-size: 30px">
               <div class="swiper-slide clearfix">
                 <div class="swiper-box">
                   <div class="swiper-img">
                     <img :src="gift[0].img" :alt="gift[0].name" />
                   </div>
                   <div class="swiper-name">{{gift[0].name}}</div>
                 </div>
                 <div class="swiper-box">
                   <div class="swiper-img">
                     <img :src="gift[1].img" :alt="gift[1].name" />
                   </div>
                   <div class="swiper-name">{{gift[1].name}}</div>
                 </div>
               </div>
               <div class="swiper-slide clearfix">
                 <div class="swiper-box">
                   <div class="swiper-img">
                     <img :src="gift[2].img" :alt="gift[2].name" />
                   </div>
                   <div class="swiper-name">{{gift[2].name}}</div>
                 </div>
                 <div class="swiper-box">
                   <div class="swiper-img">
                     <img :src="gift[3].img" :alt="gift[3].name" />
                   </div>
                   <div class="swiper-name">{{gift[3].name}}</div>
                 </div>
               </div>
               <div class="swiper-slide clearfix">
                 <div class="swiper-box">
                   <div class="swiper-img">
                     <img :src="gift[4].img" :alt="gift[4].name" />
                   </div>
                   <div class="swiper-name">{{gift[4].name}}</div>
                 </div>
                 <div class="swiper-box">
                   <div class="swiper-img">
                     <img :src="gift[5].img" :alt="gift[5].name" />
                   </div>
                   <div class="swiper-name">{{gift[5].name}}</div>
                 </div>
               </div>
             </div>
           </div>
         </div>
      </div>
       <div class="footer">
         <img :src="backImage" alt="返回" @click="backImageFunction" />
         <img :src="againImage" alt="再来一局" @click="againImageFunction" />
       </div>
    </div>
    <!-- 没解锁称号弹窗 -->
    <ununlocked-title v-if="UnunlockedTitleShow"></ununlocked-title>
    <!-- 虚拟奖品 -->
    <virtual-prizes v-if="VirtualPrizesShow" :prizes="prizes"></virtual-prizes>
    <!-- 真实奖品 -->
    <real-prizes v-if="RealPrizesShow" :prizes="prizes"></real-prizes>
    <!-- 开始游戏、再来一局 -->
    <start-game-play v-if="startGame" replace="replace"></start-game-play>
  </div>
</template>
<script>
import Swiper from 'swiper';
import {baseInformation, getBaseInfo, getUserInfo, api} from '../../lib/index.js';
import LvshouFetch from 'Api/common';
import {mintToast} from 'Utils/method'
import 'swiper/dist/css/swiper.css';
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)
export default {
  data() {
    return {
      storeTitle: [],
      UnunlockedTitleShow: false,
      VirtualPrizesShow: false,
      RealPrizesShow: false,
      prizes: {}, // 奖品
      startGame: false,
      nickname: '绿瘦',
      Background: require('../../assets/images/img_07.png'),
      topicId: null,
      title: '脑力王者榜',
      result: {}, // 请求回来的数据
      box0: require('../../assets/images/img_40.png'),
      box1: require('../../assets/images/img_41.png'),
      backImage: require('../../assets/images/img_37.png'),
      againImage: require('../../assets/images/img_39.png'),
      gift: [],
      box_index: 0
    }
  },
  created() {
    // 1 胜利 2失败 3平局
    // {sess_token: "fbca3d52487b2f4ed5a1323ebb13732a", act_id: "305", answer_id: "487", vest_id: "62325", number_id: "56"}
    baseInformation.call(this);
    // // 获取基础数据
    console.log('获取基础数据---------', this.$store.state)
    this.grameInfo = this.$store.state.grameInfo;
    this.topicId = this.$route.params.topicId;
    getBaseInfo.call(this);
    getUserInfo.call(this);
    _hmt.push(['_trackEvent', '宝箱', '脑力大作战', '宝箱'])
    this.gift = this.$store.state.gift;
  },
  mounted() {
    this.storeTitle = this.$store.state.title;
    let __Swiper = new Swiper('.swiper-container', {
      autoplay: {
        disableOnInteraction: false, // 默认true
        delay: 2000// 默认3000
      },
      loop: true
    })
    console.log(__Swiper);
    //   处理中奖问题
    let guessAnswerCount = this.$store.state.guessAnswerCount;
    if (guessAnswerCount) {
      guessAnswerCount.popup = 'ActiveVictoryBoxShow';
      this.$store.commit('guessAnswerCount', guessAnswerCount);
    }
  },
  methods: {
    //
    /**
     * @return {boolean}
     */
    async GuessAnswerDraw(index) {
      let baseActiveInfo = this.$store.state.baseActiveInfo;
      _hmt.push(['_trackEvent', '打开宝箱', '脑力大作战', '宝箱开启'])
      if (!baseActiveInfo) {
        baseInformation.call(this);
        console.log('baseActiveInfo------没找到')
        return false;
      }
      if (baseActiveInfo.state === -1) {
        mintToast('活动已结束');
        return false;
      }
      if (baseActiveInfo.state === -2) {
        mintToast('活动未开始');
        return false;
      }
      let data = this.$store.state.baseInformation;
      let result = await LvshouFetch({
        url: api('lantern/GuessAnswer/draw'),
        warning: false,
        data
      }).catch(err => {
        if (err && parseInt(err.code) === 608) {
          this.UnunlockedTitleShow = true;
        } else {
          let msg = err && err.msg ? err.msg : 'api 接口报错';
          mintToast(msg)
        }
      })
      // console.log('this.box_index = index;-------------------')
      // console.log(result);
      if (!result) {
        return false;
      }
      this.prizes = result;
      this.result = result;
      // 1=实物奖品,2=虚拟奖品
      if (parseInt(result.award_type) === 1) {
        this.RealPrizesShow = true;
      }
      if (parseInt(result.award_type) === 2) {
        this.VirtualPrizesShow = true;
      }
      this.box_index = index;
    },
    // 返回
    backImageFunction() {
      this.$router.back();
    },
    // 再来一局
    againImageFunction() {
      this.startGame = true;
    }
  },
  // 处理抽奖品盒子关闭
  watch: {
    UnunlockedTitleShow(value) {
      if (!value) {
        this.box_index = 0;
      }
    },
    VirtualPrizesShow(value) {
      if (!value) {
        this.box_index = 0;
      }
    },
    RealPrizesShow(value) {
      if (!value) {
        this.box_index = 0;
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .treasureBox {
    background: #250b6c;
    /*background: #f8de23;*/
    width: 100vw;
    min-height: 100vh;
    position: relative;
    h3{
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .treasureBoxContent {
      position: relative;
      width: 96vw;
      margin: 0 auto;
      font-size: 0;
      padding: 25px 0;
      .title{
        font-size: 36px;
        color: #ffffff;
        padding: 50px 0 25px;
      }
      .Prizepool{
        color: #805af4;
        font-size: 37px;
        width: 173px;
        height: 62px;
        line-height: 62px;
        text-align: center;
        border-radius: 31px;
        margin: 40px auto 15px;
        background: #1a074f;
        font-weight: 600;
      }
      .box{
        display: flex;
        display: -webkit-flex;
        display: -webkit-inline-flex;
        justify-content: space-between;
        align-items: center;
        width: 90vw;
        margin: 0 auto;
        .boxLi{
          .boxImage{
            border-radius: 20px;
            border:6px solid #000000;
            background: #ffffff;
            box-sizing: content-box;
            display: flex;
            display: -webkit-flex;
            display: -webkit-inline-flex;
            justify-content: center;
            align-items: center;
            width: 22vw;
            height: 22vw;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
              vertical-align: top;
            }
          }
          .boxName{
            font-size: 28px;
            color: #ffffff;
            margin-top: 15px;
          }
        }
      }
      .boxGift{
        box-sizing: content-box;
        border: 7px solid #000000;
        background: #ffc74f;
        padding: 25px 12px 37px;
        border-radius: 28px;
        box-shadow: 0 -12px 0 inset rgba(0, 0, 0, 0.21);
        width: 90%;
        margin: 0 auto;
        .boxGiftContent{
          background: #fca83a;
          border-radius: 20px;
          padding: 10px;
          .swiper-container {
            width: 100%;
            .swiper-slide{
              .swiper-box{
                float: left;
                width: 50%;
                overflow: hidden;
                .swiper-img{
                  width: 100%;
                  img{
                    width: 100%;
                    vertical-align: top;
                  }
                }
                .swiper-name{
                  color: #040404;
                  font-size: 22px;
                }
              }
            }
          }
        }
      }
      .footer {
        width: 100%;
        padding: 25px 0 60px;
        text-align: center;
        img {
          margin-top: 25px;
          width: 56.9%;
          vertical-align: top;
        }
      }
    }
  }
</style>

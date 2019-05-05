<template>
  <div class="brainBattle" v-bind:style="{backgroundSize: '60%',backgroundImage: 'url(' + Background + ')'}">
    <ls-pv ref="lspv"></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="VictoryBox">
       <section class="section">
          <div class="tipIcon">
            <img :src="activeRulesIcon" alt="" />
          </div>
         <div class="content">
           <ul class="first">
             <li v-for="item in rules">{{item}}</li>
           </ul>
         </div>
       </section>
      <section class="section">
        <div class="tipIcon">
          <img :src="winIcon" alt="" />
        </div>
        <div class="content">
          <div class="goods_title">1.晋升奖：用户星星数每达到一定数量可解锁新的荣誉称号并获得一次抽奖机会，百分百中奖哦！</div>
          <ul class="goods clearfix">
            <li v-for="item in gift">
              <div class="goods">
                <img :src="item.img" alt="" />
              </div>
              <div class="name">{{item.name}}</div>
            </li>
          </ul>
          <div class="goods_line"></div>
          <div class="goods_title">2.脑力王者奖：活动结束后，脑力王者榜上的前十五名都能获得丰厚奖励！</div>
          <ul class="goods goods_card clearfix">
            <li>
              <div class="card">
                <img :src="card.card100" alt="">
              </div>
              <div class="cardname">华润万家100元购物卡</div>
            </li>
            <li>
              <div class="card">
                <img :src="card.card50" alt="">
              </div>
              <div class="cardname">沃尔玛50元购物卡</div>
            </li>
          </ul>
        </div>
      </section>
       <div class="footer">
         <img :src="footerImg" alt="知道了" @click="iknow" />
       </div>
    </div>
  </div>
</template>
<script>
import {baseInformation, getBaseInfo, getUserInfo, addText} from '../../lib/index.js';
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)
export default {
  data() {
    return {
      nickname: '绿瘦',
      add_text: '',
      Background: require('../../assets/images/img_07.png'),
      topicId: null,
      title: '脑力王者榜',
      result: {}, // 请求回来的数据
      activeRulesIcon: require('../../assets/images/img_30.png'),
      winIcon: require('../../assets/images/img_31.png'),
      starImage: require('../../assets/images/img_15.png'),
      starX: require('../../assets/images/img_21.png'),
      topImg: require('../../assets/images/img_16.png'),
      topClose: require('../../assets/images/img_17.png'),
      footerImg: require('../../assets/images/img_32.png'),
      activeBackground: require('../../assets/images/img_19.png'),
      first: require('../../assets/images/img_23.png'),
      second: require('../../assets/images/img_24.png'),
      three: require('../../assets/images/img_25.png'),
      card: {
        card100: require('../../assets/images/img_33.png'),
        card50: require('../../assets/images/img_34.png')
      },
      rules: [
        '1.点击【开始匹配】即可进行1V1答题比赛对战，1局5题，均为单选题，每题需要10秒内完成作答；回答又对又快者加分多，最后一题分数加倍，回答错误或超时未答题不加分不扣分。',
        '2.每局结束后按照答题总得分决出胜负，获胜者可获得一定绿豆和加1颗星，失败或平局没有奖励且星星数不变。',
        '3.用户星星数每达到一定数量可解锁新的荣誉称号并获得一次抽奖机会，百分百中奖哦！',
        '4.每天赠送1次游戏次数，完成指定任务可获得更多挑战次数，每天游戏次数上限为5次。'
      ],
      gift: []
    }
  },
  created() {
    // 1 胜利 2失败 3平局
    // {sess_token: "fbca3d52487b2f4ed5a1323ebb13732a", act_id: "305", answer_id: "487", vest_id: "62325", number_id: "56"}
    // baseInformation.call(this);
    // // // 获取基础数据
    // console.log('获取基础数据---------', this.$store.state)
    // this.grameInfo = this.$store.state.grameInfo;
    // this.topicId = this.$route.params.topicId;
    // getBaseInfo.call(this);
    // getUserInfo.call(this);
    // alert(JSON.stringify(this.$store.state))
    this.gift = this.$store.state.gift;
    _hmt.push(['_trackEvent', '按钮', '脑力大作战', '排行榜'])
  },
  mounted() {
  },
  methods: {
    // 知道了
    iknow() {
      this.$router.back();
    }
  }
}
</script>
<style lang="less" scoped>
  .brainBattle {
    background: #250b6c;
    /*background: #f8de23;*/
    width: 100vw;
    min-height: 100vh;
    position: relative;
    h3{
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .VictoryBox {
      position: relative;
      width: 96vw;
      margin: 0 auto;
      font-size: 0;
      padding: 25px 0;
      section.section{
        position: relative;
        box-sizing: content-box;
        border-radius: 28px;
        background: #ffc74f;
        padding: 25px 25px 37px 25px ;
        border: 6px solid #000000;
        width: 80%;
        margin: 64px auto 0;
        box-shadow:0 -13px inset rgba(0, 0, 0, 0.21);
        .tipIcon{
          position: absolute;
          top: -60px;
          left: -13px;
          width: 38.3vw;
          /*-webkit-transform: translateY(-50%);*/
          /*transform: translateY(-50%);*/
          img{
            width: 100%;
            vertical-align: top;
          }
        }
        .content{
          border-radius: 28px;
          background: #fca83a;
          width: 100%;
          color: #040404;
          padding: 16px;
          ul{
            margin: 0;
            padding: 0;
            li{
              margin: 0;
              padding: 0;
              list-style: none;
            }
          }
          ul.first{
            li{
              font-size: 22px;
              margin-top: 20px;
              line-height: 1.3em;
              text-align: left;
              font-weight: bold;
            }
          }
          .goods_title{
            font-size: 24px;
            color: #040404;
            line-height: 1.6em;
            font-weight: 600;
            text-align: left;
          }
          .goods_line{
            height: 10px;
            border-radius: 10px;
            background: #ee9522;
            margin: 30px 0;
          }
          ul.goods{
            li{
              width: 50%;
              float: left;
              font-size: 22px;
              line-height: 1.6em;
              text-align: left;
              font-weight: bold;
              margin: 25px 0% 0;
              .goods{
                img{
                  vertical-align: top;
                  width: 100%;
                }
              }
              .name{
                text-align: center;
                font-size: 22px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          ul.goods_card{
            padding: 2.5%;
            li{
              width: 45%;
              margin: 0 2.5%;
              .card{
                img{
                  width: 100%;
                  vertical-align: top;
                }
              }
              .cardname{
                margin-top: 20px;
                text-align: center;
              }
            }
          }
        }
      }
      section:first-child{
        margin-top: 93px;
      }
      .footer {
        width: 100%;
        padding: 25px 0 60px;
        text-align: center;
        img {
          width: 334px;
          height: 103px;
          vertical-align: top;
        }
      }
    }
  }
</style>

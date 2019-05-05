<template>
  <div class="brainBattle" v-bind:style="{backgroundSize: '60%',backgroundImage: 'url(' + Background + ')'}">
    <ls-pv ref="lspv"></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="VictoryBox">
      <div class="top">
        <img :src="topImg" class="topImg" alt="" />
        <div class="title">{{title}}</div>
      </div>
      <div class="content" v-bind:style="{ fontSize: '50px', backgroundImage: 'url(' + activeBackground + ')'}">
        <h3 class="title">当前称号</h3>
        <div v-if="userInfo" class="designationImage">
          <img :src="userInfo.designationImage" :alt="userInfo.grade">
        </div>
        <div class="user">
           <div class="userStar" v-if="result.myself">
             <div class="star">
               <img :src="starImage" class="starImage" alt="" />
               <img :src="starX" class="starX" alt="" />
               <span class="num" :data-myself="result.myself">{{result.myself.number}}</span>
             </div>
           </div>
           <div class="userInfo" v-if="result.myself">
             <div class="clearfix">
               <div class="userLogo">
                 <div class="box">
                   <div class="logo">
                     <img :src="result.myself.head_img" class="starImage" alt="" />
                   </div>
                 </div>
               </div>
               <div class="ranking">
                 <h3 class="name">{{result.myself.nickname}}</h3>
                 <div class="rankingStar">当前排名{{result.myself.ranking}}</div>
               </div>
             </div>
           </div>
        </div>
        <div class="listImage"></div>
        <div class="items">
          <ul v-if="result.list">
            <li class="clearfix" v-for="item in result.list" :data-item="JSON.stringify(item)">
              <div class="number">
                <img :src="first" alt="" v-if="item.ranking === 1"/>
                <img :src="second" alt="" v-else-if="item.ranking === 2"/>
                <img :src="three" alt="" v-else-if="item.ranking === 3"/>
                <div v-else>{{item.ranking}}</div>
              </div>
              <div class="userInfo">
                <div class="clearfix">
                  <div class="userLogo">
                    <div class="box">
                      <div class="logo">
                        <img :src="item.head_img" class="starImage" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="ranking">
                    <h3 class="name">{{item.nickname}}</h3>
                  </div>
                </div>
              </div>
              <div class="designation">
                <img :src="item.designationImage" :alt="item.grade" class="designationImage" />
              </div>
              <!--<div class="ling">{{item.grade}}</div>-->
              <div class="userStar">
                <div class="star">
                  <img :src="starImage" class="starImage" alt="" />
                  <img :src="starX" class="starX" alt="" />
                  <span class="num">{{item.number}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="listImage"></div>
        <div class="end">活动结束后，胜场榜前三名均可获得100元华润万家购物卡1张！第四名至第十五名均可获得50元沃尔玛购物卡1张！</div>
      </div>
      <div class="footer">
        <img :src="footerImg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>

import {handleGrade, baseInformation, getBaseInfo, getUserInfo, api} from '../../lib/index.js';
import { urlGet } from 'Utils/common'
import LvshouFetch from 'Api/common';
import { Indicator } from 'mint-ui';
import {mintToast} from 'Utils/method'

// var vc = new VConsole();
// console.log(vc)
export default {
  data() {
    return {
      nickname: '绿瘦',
      Background: require('../../assets/images/img_07.png'),
      topicId: null,
      getRankingListTimeout: null,
      beforeDestroyClearTimeout: false,
      title: '脑力王者榜',
      result: {}, // 请求回来的数据
      userInfo: {},
      starImage: require('../../assets/images/img_15.png'),
      starX: require('../../assets/images/img_21.png'),
      topImg: require('../../assets/images/img_16.png'),
      topClose: require('../../assets/images/img_17.png'),
      footerImg: require('../../assets/images/img_18.png'),
      activeBackground: require('../../assets/images/img_19.png'),
      first: require('../../assets/images/img_23.png'),
      second: require('../../assets/images/img_24.png'),
      three: require('../../assets/images/img_25.png')
    }
  },
  created() {
    // 1 胜利 2失败 3平局
    // {sess_token: "fbca3d52487b2f4ed5a1323ebb13732a", act_id: "305", answer_id: "487", vest_id: "62325", number_id: "56"}
    baseInformation.call(this);
    // // 获取基础数据
    this.grameInfo = this.$store.state.grameInfo;
    this.topicId = this.$route.params.topicId;
    getBaseInfo.call(this);
    getUserInfo.call(this);
    _hmt.push(['_trackEvent', '按钮', '脑力大作战', '排行榜'])
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo;
    let rankingList = this.$store.state.rankingList;
    if (rankingList && rankingList.list) {
      this.handleResult(rankingList);
    }
    Indicator.open();
    this.getRankingList();
  },
  beforeDestroy() {
    this.getRankingListTimeout = null;
    this.beforeDestroyClearTimeout = true;
    clearTimeout(this.getRankingListTimeout);
  },
  methods: {
    async getRankingList(t = 1) {
      if (this.beforeDestroyClearTimeout) {
        return false;
      }
      let state = this.$store.state;
      let data = {
        sess_token: state.baseInformation.sess_token,
        act_id: state.baseInformation.act_id
      }
      await LvshouFetch({
        url: api('lantern/GuessAnswer/ranking'),
        warning: false,
        data
      }).then(result => {
        this.handleResult(result);
        this.$store.commit('rankingList', result);
        Indicator.close();
      }).catch((err) => {
        if (err.code && parseInt(err.code) === 401 && !urlGet('is_share')) {
          window.location.href = 'https://hxsapp_showloginpage';
          return false;
        }
        if (t < 3) {
          ++t;
          this.getRankingListTimeout = setTimeout(() => {
            this.getRankingList(t);
          }, t * 1000)
        } else {
          let msg = (err.msg && err.msg !== '') ? err.msg : '网络异常';
          Indicator.close();
          mintToast(msg);
        }
      })
    },
    handleResult(result) {
      for (let i = 0; i < result.list.length; i++) {
        let user = handleGrade.call(this, result.list[i].star);
        result.list[i] = Object.assign({}, result.list[i], user);
      }
      let myself = handleGrade.call(this, result.myself.star);
      result.myself = Object.assign({}, result.myself, myself);
      this.result = result;
    },
    // 再来一局
    again() {
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
      .top {
        position: relative;
        width: 100%;
        img {
          vertical-align: top;
        }
        .topImg {
          width: 100%;
        }
        .topClose {
          width: 9%;
          position: absolute;
          top: 62%;
          right: 4%;
        }
        .title {
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
      .content {
        background-size: 100%;
        margin-top: -2px;
        margin-bottom: -2px;
        padding: 30px 0;
        h3.title{
          box-sizing: content-box;
          font-size: 32px;
          color: #ffffff;
          height: 40px;
          line-height: 40px;
          padding-bottom: 30px;
          margin: 0;
          letter-spacing: 3px;
          font-weight: normal;
        }
        .designationImage{
          width: 55vw;
          margin: 0 auto;
          img{
            width: 100%;
            vertical-align: top;
          }
        }
        .user{
          font-size: 0;
          padding-bottom: 10px;
        }
        .userStar{
          font-size: 1rem;
          .star{
            line-height: 1em;
            img.starImage{
              width: 1em;
              height: 1em;
              margin: 0 -4px;/*no*/
              vertical-align: top;
            }
            img.starX{
              width: 0.3em;
              height: 0.3em;
              margin: 0 -4px;/*no*/
              margin-left: 0.25em;
              margin-top: 0.3em;
              vertical-align: top;
            }
            span.num{
              display: inline-block;
              vertical-align: top;
              font-size: 0.4em;
              margin: 0 -4px;/*no*/
              margin-left: 0.2em;
              color:#ffffff;
            }
          }
        }
        .userInfo{
          margin-top: 36px;
          font-size: 1rem;
          display: flex;
          display: -webkit-flex;
          display: -webkit-inline-flex;
          .userLogo{
            border: 0.1em solid #000000;
            background: #000000;
            border-radius: 50%;
            box-sizing: content-box;
            width: 1.2em;
            height: 1.25em;
            float: left;
            .box{
              box-sizing: content-box;
              border-bottom: 0.05em solid #e3e3e3;
              /*width: 100%;*/
              /*height: 100%;*/
              border-radius: 50%;
              background: #ffffff;
              padding: 0.1em;
              width: 1em;
              height: 1em;
              .logo{
                width: 1em;
                height: 1em;
                margin: 0 auto;
                background: #808080;
                border-radius: 50%;
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                }
              }
            }
          }
          .ranking{
            color: #ffffff;
            text-align: left;
            float: left;
            margin-left: 0.5em;
            h3.name{
              margin: 0.5em 0 0 0;
              font-size: 0.4em;
              line-height: 1em;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              width: 7em;
            }
            .rankingStar{
              font-size: 0.4em;
              margin-top: 0.5em;
            }
          }
        }
        .listImage{
          width: 76%;
          margin: 20px auto;
          height: 12px;
          background-image: url("../../assets/images/img_22.png");
          background-size: auto 100%;
        }
        .items{
          width: 76%;
          margin: 0 auto;
          ul{
            list-style: none;
            margin: 0;
            padding: 10px 0;
            li{
              list-style: none;
              font-size: 1rem;
              margin-top: 16px;

              >div{
                float: left;
              }
              .number{
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 0.4em;
                color: #ffffff;
                margin-top: 0.3em;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .userStar{
                font-size: 0.5rem;
                margin-left: 0.5em;
                margin-top: 0.4em;
                width: 8vw;
                .star{
                  white-space: nowrap;
                  img.starX{
                    margin-left: 1px;
                  }
                  span.num{
                    margin-left: 1px;
                    font-size: 0.7em;
                  }
                }
              }
              .userInfo{
                margin-left: 12px;
                margin-top: 0px;
                font-size: 0.6rem;
                .ranking{
                  font-size: 1rem;
                  margin-left: 0.1em;
                  .name{
                    line-height: 2.2em;
                    margin-top: 0;
                    width: 5.5em;
                  }
                }
              }
              .ling{
                background: url("../../assets/images/img_20.png") no-repeat;
                background-size: 100% 100%;
                padding: 0.1rem 0.1rem 0.1rem 0.6rem;
                font-size: 0.25rem;
                font-weight: 600;
              }
              .designation{
                width: 22vw;
                height: 0.86rem;
                float: left;
                display: flex;
                display: -webkit-flex;
                display: -webkit-inline-flex;
                align-items: center;
                .designationImage{
                  width: 100%;
                  vertical-align: top;
                }
              }
            }
          }
        }
        .end{
          font-size: 25px;
          color: #ffffff;
          line-height: 50px;
          width: 76%;
          margin: 20px auto;
          font-weight: 600;
          text-align: left;
        }
      }
      .footer {
        width: 100%;
        img {
          width: 100%;
          vertical-align: top;
        }
      }
    }
  }
</style>

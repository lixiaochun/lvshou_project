<template>
  <div class="brainBattle">
    <ls-pv ref="lspv"></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="brainBackgroundImage">
      <active-background-image></active-background-image>
    </div>
    <div class="brainContent">
      <!-- 倒计时和分数 -->
      <section>
        <div class="content">
            <div class="uv">
              <div class="uservest user">{{countSource.user ? countSource.user.source : 0}}</div>
              <div class="uservest vest">{{countSource.vest ? countSource.vest.source : 0}}</div>
            </div>
            <div class="count_down">
              <count-down-animation ref="count_down"></count-down-animation>
            </div>
        </div>
      </section>
      <!-- 用户头像、用户名、题目和题目类型 -->
      <section>
        <div class="uservest user">
          <div class="content">
            <div class="userimg" v-if="grameInfo.user_info">
              <img :src="grameInfo.user_info.head_img" alt="">
            </div>
            <div class="name" v-if="grameInfo.user_info">{{grameInfo.user_info.nickname}}</div>
          </div>
        </div>
        <div class="uservest vest">
          <div class="content">
            <div class="userimg" v-if="grameInfo.vest_info">
              <img :src="grameInfo.vest_info.head_img" alt="">
            </div>
            <div class="name" v-if="grameInfo.vest_info">{{grameInfo.vest_info.nickname}}</div>
          </div>
        </div>
        <div class="titleContent">
          <!-- 第几道题目 -->
          <div class="til tilTransfrom" v-if="grameTitleStatus">
            <h3>第{{getGrameStatus(grameStatus.type)}}题</h3>
            <div class="tn">{{grameStatus.value[grameStatus.type - 1]}}</div>
          </div>
          <!-- 题目 titleTransfrom -->
          <div class="title" v-else>
            <!--{{randQuestion.topic}}-->
            <div>{{randQuestionAddText}}</div>
          </div>
        </div>
      </section>
      <!-- 题目选项 -->
      <section v-if="itemsBool">
        <ul>
          <!--{{items}}-->
          <li v-for="item in items"
              v-bind:class="{
                green: (item.userIsChange || item.allAnswer) && item.answerValue === item.value,
                red: ((item.userIsChange && userInit) || (item.vestIsChange && vestInit)) && item.allAnswer
              }"
              @click="changeQuestion(item)">
              <div class="liContent">
                <img :src="item.userLogo" alt="" v-if="item.userIsChange" class="userVestLogo userLogo">
                <img :src="item.vestLogo" alt="" v-if="item.vestIsChange" class="userVestLogo vestLogo">
                {{item.value}}
              </div>
          </li>
        </ul>
      </section>
    </div>
    <!-- 匹配成功 -->
    <div class="" v-if="grameInfo">
      <active-matching-animation :uimg="grameInfo.user_info.head_img"
                                 :uname="grameInfo.user_info.nickname"
                                 :vimg="grameInfo.vest_info.head_img"
                                 :vname="grameInfo.vest_info.nickname"
                                 v-if="matchingAnimation && grameInfo.user_info && grameInfo.vest_info"></active-matching-animation>
    </div>
  </div>
</template>
<script>
import LvshouFetch from 'Api/common';
import {mintToast} from 'Utils/method'
import {baseInformation, getBaseInfo, getUserInfo, vueOpenWebview, addText, api} from '../../lib/index.js';
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)
export default {
  data() {
    return {
      nickname: '绿瘦',
      lossStart: '',
      topicId: null,
      matchingAnimation: true, // 匹配成功动画 默认为true
      grameInfo: {},
      // score: 0, //  grameInfo.user_info.score => 当前题目分数
      // allScore: 0 // grameInfo.user_info.allScore 总分
      // score: 0, //  grameInfo.vest_info.score => 当前题目分数
      // allScore: 0 // grameInfo.vest_info.allScore 总分
      baseInformation: null,
      logo: require('../../assets/images/img_03.png'),
      idata: {
        value: 'A.XXX', // 当前选项值
        key: 'A', // 当前选项
        index: 0, // 下标
        userLogo: '', // 用户头像
        vestLogo: '', // 马甲头像
        isChange: true, // 是否可以选
        answerValue: '', // 正确答案
        userIsChange: false, // 用户是否选题
        vestIsChange: false, // 马甲是否选题
        allAnswer: false // 是否全部答题（马甲和用户）
      },
      answerValue: '', // 正确答案
      userInit: true, // 如果userInit 为true 则表示用户完成答题
      vestInit: true, // 如果vestInit 为true 则表示马甲完成答题
      userScore: true, // 用户完成答题得分
      vestScore: true, // 马甲完成答题得分
      items: [], // 当前题目选项
      randQuestion: { // 请求接口返回的题目选项 抽取题目结果
        id: '0',
        topic: '', // 题目
        options: [] // 选项
      },
      randQuestionAddText: '', // 题目
      countSource: {
        user: {
          source: 0
        },
        vest: {
          source: 0
        }
      }, // 得分统计
      topicTime: 5, // 总共题目
      grameTitleStatus: false, // 显示题目类型(默认)则不显示题目和选项
      itemsBool: false, // 是否显示选项列表
      grameStatus: { // [1=>'猜灯谜',2=>'百科',3=>'健康',4=>'运动',5=>'减肥'
        type: 1,
        value: ['猜灯谜', '百科', '健康', '运动', '减肥']
      },
      thisSetTimeout: {
        mounted: null,
        init: null,
        init_grame: null,
        vQ: null,
        vestQuestion: null
      },
      getAnswerPromise: null // 获取题目信息返回信息
    }
  },
  created() {
    baseInformation.call(this);
    // // 获取基础数据
    this.grameInfo = this.$store.state.grameInfo;
    this.topicId = this.$route.params.topicId;
    getBaseInfo.call(this);
    getUserInfo.call(this);
    _hmt.push(['_trackEvent', '按钮', '脑力大作战', '活动规则'])
  },
  mounted() {
    // 移除上一局的统计记录
    this.$store.commit('removeStorage', {guessAnswerCount: 'guessAnswerCount'});
    this.$store.commit('guessAnswerCount', null);

    this.thisSetTimeout.mounted = setTimeout(() => {
      this.matchingAnimation = false;
      this.init();
    }, 2000)
  },
  methods: {
    // 开始游戏
    startAnimation(timeout) {
      this.$refs.count_down.startAnimation(timeout);
    },
    // 暂停游戏
    stopAnimation() {
      this.$refs.count_down.stopAnimation();
    },
    // 初始化游戏
    initAnimation() {
      this.$refs.count_down.initAnimation(10);
    },
    // 答题初始化
    init() {
      if (!(this.userInit && this.vestInit)) {
        // console.log('不可以初始化', this.userInit, this.vestInit);
        return false;
      }
      if (this.topicTime === 5) {
        this.grameTitleStatus = true;
        this.initAnimation();
      }
      // alert('可以初始化');
      // if (this.topicTime === 5) {
      //   alert('end---------')
      //   return false;
      // }
      if (this.topicTime < 1) {
        // alert('end---------')
        console.log('=全部答题已完成')
        this.answerEnd();
        return false;
      } else {
        this.topicTime -= 1;
        // 获取题目信息  // 抽取题目
      }
      // alert('setTimeout-------可以初始化')
      this.stopAnimation();
      // 首次进来没有选项和答案的
      if (this.topicTime === 4) {
        this.init_setTimeout();
      } else {
        setTimeout(function () {
          // alert('setTimeout---- end ---可以初始化')
          this.init_setTimeout();
        }.bind(this), 1000) // 一秒显示选项和正确答案
      }
    },
    init_setTimeout() {
      this.getAnswerPromise = null;
      this.getAnswerPromise = new Promise((resolve) => {
        this.getAnswer(this.grameStatus.type, result => {
          resolve(result);
        })
      })
      this.getAnswerPromise.then((result) => {
        this.items = [];
        this.itemsBool = false;
        this.initData(JSON.parse(result.options));
      })
      this.itemsBool = false;
      this.grameTitleStatus = true; // 显示题目类型
      this.initAnimation();
      clearTimeout(this.thisSetTimeout.init);
      this.thisSetTimeout.init = null;
      // this.grameTitleStatus = true; // 显示题目类型
      this.thisSetTimeout.init = setTimeout(function () {
        this.userInit = false;
        this.vestInit = false;
        // this.grameTitleStatus = true; // 显示题目类型
        setTimeout(function () {
          this.grameTitleStatus = false;
          this.init_grame(); // 初始化游戏
        }.bind(this), 1500)
      }.bind(this), 1500)
    },
    // 初始化游戏
    init_grame(stopAni) {
      if (stopAni) {
        this.stopAnimation();
      }
      console.log('抽取题目----------');
      this.grameStatus.type = this.grameStatus.type + 1;// 抽取题目
      this.getAnswerPromise.then((result) => {
        let topic = result.topic;
        this.randQuestionAddText = '';
        addText.call(this, topic, null, 100, function (t, i) {
          this.randQuestionAddText = t;
          // console.log('t----------', t);
        }.bind(this), function () {
          this.itemsBool = true;
          this.initAnimation();
          this.startAnimation(function () {
            // 清除马甲答题报错时重置答题的定时器
            clearTimeout(this.thisSetTimeout.vestQuestion);
            this.thisSetTimeout.vestQuestion = null;
            // 倒计时动画结束（15s)到了
            this.userIsCanChange(false);
            // 显示正确答案
            this.showAnswer(this.answerValue);
            // 可以初始化
            this.userInit = true; // 用户完成答题得分
            this.vestInit = true; // 马甲完成答题得分
            // 统计得分
            this.userVestFraction();
          }.bind(this));
          this.vQ()
        }.bind(this))
      })
    },
    // answerEnd() 答题完成后的处理
    answerEnd() {
      console.log('=全部答题已完成')
      if (this.items.length) {
        this.$store.commit('grameItemsList', this.items);
      }
      vueOpenWebview.call(this, 'endOfAnswer', true);
    },
    // 处理返回数据
    initData(list) {
      for (let i = 0; i < list.length; i++) {
        let data = Object.assign({}, this.idata);
        data.value = list[i];
        data.index = i;
        data.key = list[i].trim().substring(0, 1);
        this.items.push(data)
      }
    },
    // 用户是否可以点击 false=>不可以点击 true=》可以点击
    userIsCanChange(isChange) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].isChange = Boolean(isChange);
      }
    },
    // 用户选择答题
    async changeQuestion(item) {
      if (!this.items[item.index].isChange) {
        return false;
      }
      this.userIsCanChange(false);
      let state = this.$store.state;
      let type = this.grameStatus.type - 1; // 题目序号 题目类型
      let data = {
        sess_token: state.baseInformation.sess_token,
        act_id: state.baseInformation.act_id,
        option: item.key,
        answer_id: this.randQuestion.id,
        sn_id: type, // 题目序号 题目类型
        number_id: state.grameInfo.number
      }
      await LvshouFetch({
        url: api('lantern/GuessAnswer/userAnswer'),
        data
      }).then(result => {
        this.items[item.index].userLogo = this.grameInfo.user_info.head_img;
        this.items[item.index].userIsChange = true;
        // 说明用户已经选题了
        this.userInit = true;
        // this.answerValue = result;
        // 赋值正确答案
        this.showAnswer(result.answer)
        // 打分
        this.userVestFraction()
      }).catch(err => {
        console.log(err);
        // 处理请求报错，用户可以重新选择
        this.userIsCanChange(true);
        mintToast('网络异常，请重新选择')
      })
    },
    // //    马甲答题
    vQ() {
      let time = Math.random() / 2 * 10000;
      let _time = time > 5000 ? 5000 : time < 1000 ? 1000 : parseInt(time);
      clearTimeout(this.thisSetTimeout.vQ);
      this.thisSetTimeout.vQ = null;
      this.thisSetTimeout.vQ = setTimeout(() => {
        this.vestQuestion();
      }, _time)
    },
    // 马甲选择答题
    vestQuestion: async function (rvq) {
      // 处理请求报错，重新请求
      clearTimeout(this.thisSetTimeout.vestQuestion);
      this.thisSetTimeout.vestQuestion = null;
      let state = this.$store.state;
      let type = this.grameStatus.type - 1; // 题目序号 题目类型
      let vest_id = state.grameInfo.vest_info.user_id; // 马甲ID
      let data = {
        sess_token: state.baseInformation.sess_token,
        act_id: state.baseInformation.act_id,
        answer_id: this.randQuestion.id,
        sn_id: type, // 题目序号 题目类型
        vest_id: vest_id,
        number_id: state.grameInfo.number
      }
      await LvshouFetch({
        url: api('lantern/GuessAnswer/vestAnswer'),
        data
      }).then(result => {
        let grameInfo = this.$store.state.grameInfo;
        // 显示马甲头像
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].key === result.option) {
            this.items[i].vestLogo = grameInfo.vest_info.head_img;
            this.items[i].vestIsChange = true;
          }
        }
        // 存储正确答案
        this.answerValue = result.answer;
        this.vestInit = true;
        // 打分
        this.userVestFraction()
      }).catch(() => {
        // 处理请求报错，重新请求
        if (rvq) {
          return false;
        }
        this.thisSetTimeout.vestQuestion = setTimeout(function () {
          this.vestQuestion(true);
        }.bind(this), 3000);
      })
    },
    // 当前答题完成 显示正确答案
    showAnswer(key) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].allAnswer = true;
        if (key && key === this.items[i].key) {
          // 正确答案
          this.items[i].answerValue = this.items[i].value;
        }
      }
    },
    // 抽题目 type = grameStatus.type
    async getAnswer(type, callback, t = true) {
      if (this.items && this.items.length) {
        this.$store.commit('grameItemsList', this.items);
      }
      let baseInformation = this.$store.state.baseInformation;
      await LvshouFetch({
        url: api('lantern/GuessAnswer/randQuestion'),
        data: {
          sess_token: baseInformation.sess_token,
          act_id: baseInformation.act_id,
          type: type
        }
      }).then(result => {
        this.randQuestion = result;
        if (callback && typeof callback === 'function') {
          callback(result)
        }
      }).catch(err => {
        // 处理请求错误回调 容错处理
        if (t) {
          setTimeout(() => {
            this.getAnswer(type, callback, false);
          }, 3000)
        } else {
          let msg = (err.msg && err.msg !== '') ? err.msg : '网络异常';
          mintToast(msg);
        }
      })
    },
    // 用户马甲分数/得分统计
    async userVestFraction() {
      if (!(this.userInit && this.vestInit)) {
        return false;
      }
      // 停止游戏动画
      this.stopAnimation();
      let state = this.$store.state;
      let vest_id = state.grameInfo.vest_info.user_id; // 马甲ID
      let data = {
        sess_token: state.baseInformation.sess_token,
        act_id: state.baseInformation.act_id,
        answer_id: this.randQuestion.id,
        vest_id: vest_id,
        number_id: state.grameInfo.number
      }
      let result = await LvshouFetch({
        url: api('lantern/GuessAnswer/countSource'),
        data
      }).catch(err => {
        let msg = err.msg !== '' ? err.msg : '网络异常';
        mintToast(msg);
      })

      let countSource = {
        user: {
          source: this.countSource.user.source + result.user.source
        },
        vest: {
          source: this.countSource.vest.source + result.vest.source
        }
      }
      this.countSource = countSource;
      this.init();
    },
    getGrameStatus(type) {
      let k = '';
      type = parseInt(type);
      switch (type) {
        case 1:
          k = '一';
          break;
        case 2:
          k = '二';
          break;
        case 3:
          k = '三';
          break;
        case 4:
          k = '四';
          break;
        case 5:
          k = '五';
          break;
      }
      return k;
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
    .brainBackgroundImage{
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    .brainContent{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      section:first-child{
        box-sizing: content-box;
        padding: 60px 0 50px;
        .content{
          position: relative;
          width: 56.9vw;
          margin: 0 auto;
          box-sizing: content-box;
          .uv{
            height: 96px;
            line-height: 96px;
            border-radius: 30px;
            border: 6px solid #010101;
            overflow: hidden;
            box-sizing: content-box;
            .uservest{
              float: left;
              width: 30%;
              color:#ffffff;
              font-weight: bold;
              text-align: center;
              box-sizing: content-box;
              font-size: 50px;
            }
            .user{
              background: #6db1f6;
              padding-right: 20%;
            }
            .vest{
              background: #ff7bb5;
              padding-left: 20%;
            }
          }
          .count_down{
            position: absolute;
            font-size: 10vw;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            -webkit-transform: translateX(-50%) translateY(-50%);
          }
        }
        >::after{
          content:"."; display:block; height:0; visibility:hidden; clear:both;
        }
      }
      section:nth-child(2){
        position: relative;
        height: 212px;
        background: rgba(0,0,0,0.5);
        .uservest{
          position: absolute;
          top: 50%;
          color: #000000;
          box-shadow: 0 -8px 0 rgba(0, 0, 0, 0.21) inset;
          height: 250px;
          margin-top: -131px;
          width: 23.2vw;
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
              font-size: 24px;
              font-weight: bold;
            }
          }
        }
        .user{
          left: 0;
          background: #6db1f6;
          border-left: 0;
          border-radius: 0 60px 60px 0;
        }
        .vest{
          right: 0;
          background: #ff7bb5;
          border-right: 0;
          border-radius:  60px 0 0 60px;
        }
        .titleContent{
          position: absolute;
          left: 25vw ;
          width: 50vw;
          height: 100%;
          display: flex;
          display: -webkit-flex;
          display: -webkit-inline-flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          .title{
            font-size: 36px;
            display: flex;
            display: -webkit-flex;
            display: -webkit-inline-flex;
            justify-content: center;
            align-items: center;
            div{
              text-align: left;
            }
          }
          .titleTransfrom{
            animation: titleAnimation 1s;
            -webkit-animation: titleAnimation 1s;
          }
          @keyframes titleAnimation{
            0%{
              -webkit-transform: translateX(50vw);
              transform: translateX(50vw);
            }
            100%{
              -webkit-transform: translateX(0px);
              transform: translateX(0px);
            }
          }
          @-webkit-keyframes titleAnimation{
            0%{
              -webkit-transform: translateX(50vw);
              transform: translateX(50vw);
            }
            100%{
              -webkit-transform: translateX(0px);
              transform: translateX(0px);
            }
          }
          .tilTransfrom{
            animation: titleAnimation 1s;
            -webkit-animation: titleAnimation 1s;
          }
          @keyframes titleAnimation{
            0%{
              -webkit-transform: scale(3);
              transform: scale(3);
              opacity: 0.3;
            }
            100%{
              -webkit-transform: scale(1);
              transform: scale(1);
              opacity: 1;
            }
          }
          @-webkit-keyframes titleAnimation{
            0%{
              -webkit-transform: scale(3);
              transform: scale(3);
              opacity: 0.3;
            }
            100%{
              -webkit-transform: scale(1);
              transform: scale(1);
              opacity: 1;
            }
          }
          .til{
             h3{
               margin: 0;
               font-size: 50px;
               font-weight: bold;
             }
            .tn{
              font-size: 36px;
            }
          }
        }
      }
      section:last-child{
         ul{
           list-style: none;
           margin: 0;
           padding: 0;
           width: 100%;
           li{
             position: relative;
             list-style: none;
             /*min-height: 108px;*/
             padding: 0 10px;
             height: 108px;
             line-height: 88px;
             box-shadow: 0 -8px 0 #c9c9c9 inset;
             width: 69.6vw;
             margin: 32px auto 0;
             border-radius: 53px;
             background: #ffffff;
             font-size: 30px;
             color: #000000;
             border: 6px solid #000000;
             text-align: center;
             font-weight: bold;
           }
           .red{
             color: #ffffff;
             background: red;
             box-shadow: 0 -8px 0 rgba(0, 0, 0, 0.21) inset;
           }
           .green{
             background: green;
             color: #ffffff;
             box-shadow: 0 -8px 0 rgba(0, 0, 0, 0.21) inset;
           }
           .liContent{
             box-sizing: content-box;
             position: relative;
             .userVestLogo{
               position: absolute;
               top: 50%;
               height: 88px;
               width: 88px;
               border-radius: 50%;
               -webkit-transform: translateY(-50%);
               transform: translateY(-50%);
               border: 3px solid #000000;
               background: #ffffff;
             }
             .userLogo{
               left: -110px;
             }
             .vestLogo{
               right: -110px;
             }
           }
         }
      }
    }
  }
</style>

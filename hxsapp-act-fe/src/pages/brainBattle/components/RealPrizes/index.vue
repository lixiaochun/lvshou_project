<template>
  <div class="NumberOfGames">
    <div v-bind:class="{contentBox: true,openBox: openBox,closebox: closebox}">
      <img :src="topImage" alt="" class="topImage" />
      <div class="closeImageBox" @click="RealPrizesBoxClose">
        <img :src="closeImage" alt="" class="closeImage" />
      </div>
      <div class="content">
         <div class="textContent">
           <div class="rtitle">恭喜你获得奖品</div>
           <div class="gift">
             <img :src="prizes.image" class="giftImage" :alt="prizes.name" />
             <div class="name">{{prizes.name}}</div>
           </div>
           <div class="from">
             <ul class="ul">
               <li class="li">
                 <input type="text" v-model="user.name" placeholder="请输入收货人姓名"/>
               </li>
               <li class="li">
                 <input type="number" maxlength="11" v-model="user.phone" placeholder="请输入收货人电话"/>
               </li>
               <li class="li">
                 <input type="text" v-model="user.address" placeholder="请输入收货人地址"/>
               </li>
             </ul>
             <div class="tips">* 如不填写收货地址，默认放弃礼品。</div>
           </div>
           <div class="looking">
             <img :src="CollectImmediately" alt="立即查看" @click="CollectImmediatelyFunction" />
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mintToast} from 'Utils/method'
import LvshouFetch from 'Api/common';
import {visibilitychange, api} from '../../lib/index.js';
export default {
  name: 'real-prizes',
  description: '真实奖品弹窗',
  data() {
    return {
      visibilityState: 'visible', // hidden visible
      topImage: require('../../assets/images/img_26.png'),
      closeImage: require('../../assets/images/img_17.png'),
      CollectImmediately: require('../../assets/images/img_36.png'),
      gift: {},
      user: {
        name: '',
        phone: '',
        address: ''
      },
      openBox: true,
      closebox: false
    }
  },
  props: [ 'prizes' ],
  mounted() {
    let gift = this.$store.state.gift;
    this.gift = gift[0];
    // 隐藏弹框
    visibilitychange.call(this, function (state) {
      if (this.visibilityState === 'hidden' && state === 'visible') {
        this.$parent.RealPrizesShow = false
      }
      this.visibilityState = state;
    }.bind(this))
  },
  methods: {
    RealPrizesBoxClose() {
      if (this.$parent.BoxClose && typeof this.$parent.BoxClose === 'function') {
        this.$parent.BoxClose()
      } else {
        this.openBox = false;
        this.closebox = true;
        setTimeout(function () {
          this.$parent.RealPrizesShow = false
        }.bind(this), 400)
      }
    },
    /**
     *
     * @return {boolean}
     */
    async CollectImmediatelyFunction() {
      console.log(this.user)
      if (this.user.name.trim() === '') {
        mintToast('请输入收货人姓名');
        return false;
      }
      let reg = /^1([345789])\d{9}$/g;
      if (this.user.phone.trim() === '' || !reg.test(this.user.phone)) {
        mintToast('请输入收货人电话');
        return false;
      }
      if (this.user.address.trim() === '') {
        mintToast('请输入收货人地址');
        return false;
      }
      // alert('ok')
      let baseInformation = this.$store.state.baseInformation;
      let data = this.user;
      data.sess_token = baseInformation.sess_token;
      console.log('---------data-------------');
      console.log(JSON.stringify(data));
      let result = await LvshouFetch({
        url: api('lantern/GuessAnswer/consignee'),
        warning: false,
        data
      }).catch(err => {
        console.log('err---', err);
        let msg = err.msg !== '' ? err.msg : 'API接口出错';
        mintToast(msg);
      })
      if (!result) {
        mintToast('API接口出错');
        return false;
      }
      this.look();
    },
    look() {
      window.location.href = 'https://hxsapp_jump_myactivity#1'
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
    z-index: 100;
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
          text-align: center;
          padding: 30px 0;
          .rtitle{
            font-size: 39px;
            padding: 5px 0;
          }
          .gift{
            .giftImage{
              width: 47.7%;
              vertical-align: top;
            }
            .name{
              font-size: 22px;
            }
          }
          .looking{
            width: 100%;
            margin-top: 30px;
            img{
              width: 47.7%;
              vertical-align: top;
            }
          }
          .from{
            width: 80%;
            margin:0 auto;
            ul{
              margin: 0;
              padding: 0;
              list-style: none;
              margin-block-start: 0em;
              margin-block-end: 0em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
              padding-inline-start: 0px;
              li{
                margin: 0;
                padding: 0;
                list-style: none;
                margin-top: 11px;
                font-size: 0;
                input{
                  width: 100%;
                  height: 64px;
                  line-height: 64px;
                  padding: 0 20px;
                  margin: 0;
                  border-radius: 0;
                  font-size: 33px;
                  vertical-align: top;
                  border: 5px solid #000000;
                }
              }
            }
            .tips{
              text-align: left;
              font-size: 22px;
              margin-top: 17px;
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

<template>
  <div class="NumberOfGames">
    <div v-bind:class="{contentBox: true,openBox: openBox,closebox: closebox}">
      <img :src="topImage" alt="" class="topImage" />
      <div class="closeImageBox" @click="UnunlockedTitleBoxClose">
        <img :src="closeImage" alt="" class="closeImage" />
      </div>
      <div class="content">
         <div class="textContent">
           <div class="rtitle">你还没解锁新称号</div>
           <div class="rtitle">赶紧开始游戏赚取聪明星吧！</div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ununlocked-title',
  description: '没解锁称号弹窗',
  data() {
    return {
      topImage: require('../../assets/images/img_26.png'),
      closeImage: require('../../assets/images/img_17.png'),
      success: require('../../assets/images/img_27.png'),
      fail: require('../../assets/images/img_29.png'),
      openBox: true,
      closebox: false
    }
  },
  props: [ 'selfNumber', 'inviteFriendsNumber', 'releaseDynamicsNumber' ],
  mounted() {

  },
  methods: {
    UnunlockedTitleBoxClose() {
      if (this.$parent.BoxClose && typeof this.$parent.BoxClose === 'function') {
        this.$parent.BoxClose()
      } else {
        this.openBox = false;
        this.closebox = true;
        setTimeout(function () {
          this.$parent.UnunlockedTitleShow = false
        }.bind(this), 400)
      }
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
          text-align: center;
          padding: 130px 0;
          .rtitle{
            font-size: 39px;
            padding: 5px 0;
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

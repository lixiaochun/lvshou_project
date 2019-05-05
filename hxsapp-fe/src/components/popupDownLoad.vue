<template>
  <div class="popupDownLoad">
    <div class="share-down">
      <div class="bg"></div>
      <div class="share-cont">
        <img class="img" src="../assets/img/invite@2x.png" />
        <span>
          邀请函
        </span>
        <span class="tip">
          更多瘦身干货尽在好享瘦
        </span>
        <div class="cancel" @click="cancelBtn()"></div>
        <div class="confirm" @click="confirmBtn()">去下载</div>
      </div>
    </div>
  </div>
</template>

<script>
import commonJs from '@/util/common.js'

export default {
  name: 'popupDownLoad',
  methods: {
    cancelBtn() {
      this.$parent.hidePopupDownLoadCall && this.$parent.hidePopupDownLoadCall()
    },
    confirmBtn() {
      // this.$parent.showPopupDownLoadCall && this.$parent.showPopupDownLoadCall() 
      // window.location.href = commonJs.config.downLoadUrl
      window.location.replace( commonJs.config.downLoadUrl );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.popupDownLoad {

  .share-down {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
  }
  .share-down .bg {
    width: 100%;
    height: 100%;
    background: #333;
    opacity: 0.3;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10000;
  }

  .share-down .share-cont {
    width: 275px;
    height: 360px;
    background-size: 275px;
    position: absolute;
    left: 50%;
    top: 50%;
    background: #fff;
    border-radius: 10px;
    margin-left: -137px;
    margin-top: -180px;
    z-index: 10001;
  }

  .share-down .share-cont .img {
    width: 100%;
    display: block;
    height: auto;
    margin-top: 25px;
  }

  .share-down .share-cont span {
    margin-top: 15px;
    display: block;
    width: 100%;
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    color: #333;
    text-align: center;
  }
  .share-down .share-cont span.tip {
    margin-top: 5px;
    font-size: 14px;
    color: #999;
  }

  .share-down .share-cont .confirm {
    margin: 15px auto 0;
    width: 130px;
    text-align: center;
    height: 35px;
    line-height: 35px;
    border-radius: 20px;
    background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
    border: 1px solid #FF68B0;
    color: #fff;
  }
  .share-down .share-cont .cancel {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 35px;
    height: 35px;
    background: url(../assets/img/close@2x.png) left top no-repeat;
    background-size: 100% 100%;
  }
}
</style>

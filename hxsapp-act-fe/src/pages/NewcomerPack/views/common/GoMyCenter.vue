<!-- 案例介绍 -->
<template>
  <!-- <div class="flex-c box-bottom">
    <button class="flex-c" @click="goMyCenter()">点我赚绿豆</button>
  </div> -->
</template>
<script>
  import {
    urlGet,
    isApp,
    getHxsAppVersion,
    compareAppVersion,
    LsShare,userAgent
  } from 'Utils/common'
  export default {
    name: 'GoMyCenter',
    data() {
      return {}
    },
    props: {
      userId: String,
    },
    created() {

  },
  methods: {
    //跳转个人中心，看我的绿豆
    goMyCenter() {

      var _this = this
      //   if(!_this.userId) return;
      if (userAgent() === 'ios') {
        window.location.href = 'https://hxsapp_gopage?page_name=TaskBenefitController'
      } else if (userAgent() === 'and') {
        window.location.href = 'hxsapp://goPage?pageName=com.lvshou.hxs.activity.WelfareActivity'
      }

    }
  }
}

</script>
<style lang="less">
.flex-c {
  display: flex !important;
  display: -webkit-flex !important;
  display: -ms-flexbox !important;
  vertical-align: middle;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-align: center;
  /* -webkit-flex-wrap:wrap; */
  /* flex-wrap:wrap; */
  text-align: center;
}

.box-bottom {
  position: fixed;
  bottom: 0rem;
  width: 100%;
  z-index: 99;
  background: linear-gradient(to right, #654bfc, #9e4bfc);
  text-align: center;
  height: 1.5rem;
  line-height: 1.5rem;
  justify-content: center;
}

.box-bottom button {
  width: 100%;
  background: linear-gradient(to right, #654bfc, #9e4bfc);
  color: white;
  font-size: 0.35rem;
  border-radius: 0rem;
  height: 0.9rem;
  box-sizing: border-box;
  border: 0px;
  letter-spacing: 2px;
  text-align: center;
  margin: 0rem;
  font-size: 0.55rem;
  justify-content: center;
}
</style>

<template>
  <div class="wrapper pvNum" v-if="isShow">
    <h5>{{pvNum}}人参加</h5>
  </div>
</template>

<script>
import LvshouFetch from 'Api/common'
import { urlGet } from 'Utils/common'
// import { Toast } from 'mint-ui'

export default {
  name: 'ls-pv',
  data() {
    return {
      isShow: true,
      pvNum: 0
    }
  },
  mounted() {
    this.getPv();
  },
  methods: {
    async getPv() {
      const data = {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign')
      }
      if (!data.sess_token) {
        // Toast('sess_token 缺失!')
        return
      }
      const pvData = await LvshouFetch({
        url: 'https://act.hxsapp.com/base/Api/pv',
        data
      })
      this.pvNum = pvData.sum
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: fixed;
  right: 10px;
  top: 0;
  width: 160px;
  height: 60px;
  background: url("../../assets/images/pvBack.png") top left;
  background-size: 100% 100%;
  -webkit-transform: translateZ(0);
  h5 {
    font-size: 25px;
    margin-top: 27px;
    height: 30px;
    line-height: 30px;
    font-weight: 400;
    text-align: center;
    width: 100%;
    color: #fff;
  }
}
</style>

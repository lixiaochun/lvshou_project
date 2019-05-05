<template>
  <div class="wrapper">
      <div class="img-r img-top">
        <img src="../../assets/images/share.png">
      </div>
      <div class="img-r  img-bottom" @click="addButtom()">
        <img class="" src="../../assets/images/buttom.png">
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
  },
  methods: {
    addButtom() {
      window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=550';
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  .wrapper{
    position: relative;
    overflow: hidden;
    height: 100vh;
    
  }
   img{
     font-size:0px !important;
     width: 100%;
   }
   .img-top{
     height: 100vh;
     width: 100%;
   }
   .img-bottom{
    position: absolute;
    bottom: 0%;
    left: 0%;
    width: 100%;
    font-size: 0 !important;
   }
}
</style>

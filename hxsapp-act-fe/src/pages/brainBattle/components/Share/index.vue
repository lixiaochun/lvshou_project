<template>
  <div class="NumberOfGames" @click="shareClose">
     <img :src="shareImage" class="shareImage" alt="邀请你的好友，一起来作战吧"/>
  </div>
</template>

<script>
export default {
  name: 'share',
  description: '邀请你的好友，一起来作战吧',
  data() {
    return {
      shareImage: require('../../assets/images/img_42.png')
    }
  },
  props: [ 'prizes' ],
  mounted() {
    let gift = this.$store.state.gift;
    this.gift = gift[5];
  },
  methods: {
    shareClose() {
      if (this.$parent.BoxClose && typeof this.$parent.BoxClose === 'function') {
        this.$parent.BoxClose()
      } else {
        this.$parent.shareShow = false
      }
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
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    align-items: self-end;
    z-index: 10009;
    img{
      width: 56.8%;
      margin-top: 20px;
      margin-right: 50px;
    }
    .shareImage{
      animation:  share 0.4s;
      -webkit-animation:  share 0.4s;
    }
    @keyframes share{
      0%{
        margin-top: 300px;
        margin-right: 150px;
      }
      100%{
        margin-top: 20px;
        margin-right: 50px;
      }
    }
    @-webkit-keyframes share{
      0%{
        margin-top: 300px;
        margin-right: 150px;
      }
      100%{
        margin-top: 20px;
        margin-right: 50px;
      }
    }
  }
</style>

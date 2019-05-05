<template>
  <div class="carousel flex" @click.stop="close">
    <el-carousel class="imgSilde " arrow="always" :autoplay="false" ref="check" :initial-index="indexImg" @click.stop="stop">
      <div class="header no-drag">
        <img src="../assets/img/search_close_white.png" @click="close" alt="">
      </div>
      <el-carousel-item class="silder-item flex  flex-align-center flex-pack-center" @click.stop="stop" v-for="item in imgArr" :key="item">
        <img :src="item" alt="" @click.stop="stop">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'carousel',
  props: {
    imgArr: {
      type: Array,
      default: function() {}
    },
    indexImg: {
      type: Number,
      default: function() {}
    }
  },
  watch: {
    indexImg(value) {
      this.$refs.check.setActiveItem(value)
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    stop() {},
    close() {
      this.$emit('closeCarousel', false)
    }
  }
}
</script>
<style lang="less">
.carousel {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  .header {
    color: #fff;
    height: 35px;
    line-height: 35px;
    text-align: right;
    padding-right: 25px;
    position: relative;
    z-index:10;
    img {
      width: 11px;
      height: 11px;
      cursor: pointer;
    }
  }
  .imgSilde {
    position: relative;
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: auto;
    color: #fff;
    text-align: center;
    z-index: 9;
    .silder-item {
      height: 100%;
      overflow: scroll;
      &::-webkit-scrollbar {
          width: 0;
      }
      img {
        max-width: 100%;
      }
    }
    .el-carousel__indicators {
      display: none;
    }
    .el-carousel__arrow {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .el-carousel__container {
      height: 100%;
    }
    .el-icon-arrow-left,
    .el-icon-arrow-right {
      &::before {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
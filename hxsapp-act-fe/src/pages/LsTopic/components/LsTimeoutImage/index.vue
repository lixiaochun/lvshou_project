<template>
  <div class="ls-image" @click="imgClick" v-bind:class="classObject" v-if="isShow" :data-index="index">
    <img :src="imgSrc" :alt="alt" :style="imgSty" :data-src="src" />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'ls-timeout-image',
  data() {
    return {
      imgSrc: require('../../../../assets/images/load.gif'),
      isShow: true
    };
  },
  props: {
    index: 0,
    src: '',
    click: '',
    imgSty: '',
    alt: '',
    classObject: {}
  },
  mounted() {
    var self = this;
    console.log('---------------------')
    console.log(this)
    console.log(this._props.src);
    if (this._props && this._props.src) {
      // console.log(this._props.src);
      let index = this.index ? this.index : 0;
      var time_ = Math.ceil(index / 10) * 100;
      if (index > 30) {
        time_ = 300;
      }
      this.stimeout = setTimeout(() => {
        axios
          .get(this._props.src)
          .then(() => {
            console.log('------res--------')
            self.imgSrc = this._props.src;
            self.isShow = true;
            clearTimeout(self.stimeout);
            self.stimeout = null
          })
          .catch(() => {
            self.isShow = false;
            clearTimeout(self.stimeout);
            self.stimeout = null
          });
      }, index * time_)
    }
  },
  methods: {
    imgClick() {
      // console.log(this.$parent['imagesClick']())
      if (this._props && this._props.click) {
        if (typeof this._props.click === 'function') {
          this._props.click()
        } else if (typeof this._props.click === 'string') {
          this.$parent['imagesClick'] && this.$parent['imagesClick']()
        }
      }
      return false
    }
  }
}
</script>

<style lang="less" scoped>
  .ls-image{
    margin:0;
    padding:0;
    font-size: 0;
    overflow: hidden;
    img{
      vertical-align: top;
      outline: none;
      margin: 0;
      padding: 0;
    }
  }
</style>

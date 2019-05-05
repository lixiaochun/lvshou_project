<template>
  <div class="ls-image" @click="imgClick(index)" v-bind:class="classObject" v-if="isShow" :data-index="index" :data-click="click">
    <img :src="imgSrc" :alt="alt" :style="imgSty" :data-src="src" />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'ls-image',
  data() {
    return {
      imgSrc: require('../../../../assets/images/load.gif'),
      isShow: false
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
      axios
        .get(this._props.src)
        .then(() => {
          console.log('------res--------')
          // console.log(res);
          self.imgSrc = this._props.src;
          self.isShow = true;
        })
        .catch(() => {
          self.isShow = false;
        });
    }
  },
  methods: {
    imgClick(index) {
      // console.log(this.$parent['imagesClick']())
      // console.log(this._props);
      // console.log('-----------click -------')
      // this.$emit('imageClick')
      let $click = this._props.click;
      if (this._props && $click) {
        if (typeof $click === 'function') {
          $click(index)
        } else if (typeof $click === 'string') {
          this.$parent[$click] && this.$parent[$click](index)
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

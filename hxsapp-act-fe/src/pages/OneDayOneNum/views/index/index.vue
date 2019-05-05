<template>
  <div class="wrapper">
    <img   v-for="(item, key) in imgLists" v-lazy="item.src"  @click="addImg(item.id)">
    <div class="btn-box">
       <p>{{codeNum}}</p>
    </div>
    <img  v-lazy="imgLists2.src"  >
    <div class="btn-box">
      <p>{{codeNum}}</p>
   </div>
    <img  v-for="(item, key) in imgLists3" v-lazy="item.src"   @click="addImg(item.id)" >
    <div class="btn-box">
      <p>{{codeNum}}</p>
   </div>
    <img  v-for="(item, key) in imgLists4" v-lazy="item.src"    @click="addImg(item.id)">
    <div class="btn-box">
      <p>{{codeNum}}</p>
   </div>
  
    <img  v-for="(item, key) in imgLists6" v-lazy="item.src"  @click="addImg(item.id)" >
    <div class="btn-box">
      <p>{{codeNum}}</p>
   </div>
    <img  v-lazy="imgLists7.src"  >
    <div class="btn-box">
      <p>{{codeNum}}</p>
   </div>
    <img  v-for="(item, key) in imgLists8" v-lazy="item.src"  @click="addImg(item.id)" >
    <div class="btn-box">
      <p>{{codeNum}}</p>
   </div>
    <img  v-lazy="imgLists9.src"  :style="{'padding-bottom':'20px','background-color':'white'}">
    <div class="tocell"   >
      <div :style="{'position':'relative'}">    
          <img :src="button.src" >
        <p class="text">点击复制 {{codeNum}}</p>
      </div>


    </div>

    <div class="box-show" v-if="bigType" @click="bigType=false">
        <img class="img-big" :src="bigUrl.src">
    </div>

  </div>
</template>

<script>
import {urlGet} from 'Utils/common'
import clipboard from 'clipboard-polyfill'
export default {
  name: 'index',
  data() {
    return {
        baseInformation: {
          act_id: urlGet('id'),
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        },
      imgLists: [
        { src: require('../../asstes/image/img/1.png') },
        { src: require('../../asstes/image/img/2.png'),id:1},
        { src: require('../../asstes/image/img/3.png')},
        { src: require('../../asstes/image/img/4.png'),id:2},
        { src: require('../../asstes/image/img/5.png') },
        { src: require('../../asstes/image/img/6.png'),id:3 },
        { src: require('../../asstes/image/img/7.png'),id:4},
        { src: require('../../asstes/image/img/8.png')},
      ],
      imgLists2: { src: require('../../asstes/image/img/10.png') },
      imgLists3: [
        { src: require('../../asstes/image/img/12.png') },
        { src: require('../../asstes/image/img/13.png'),id:5},
        { src: require('../../asstes/image/img/14.png'),id:6},
        { src: require('../../asstes/image/img/15.png'),id:7},
      ],
      imgLists4: [
        { src: require('../../asstes/image/img/17.png') },
        { src: require('../../asstes/image/img/18.png')},
      ],
      // imgLists5: [
      //   { src: require('../../asstes/image/img/20.png') },
      //   { src: require('../../asstes/image/img/21.png')},
      // ],
      imgLists6: [
        { src: require('../../asstes/image/img/20.png') },
        { src: require('../../asstes/image/img/21.png'),id:8},
      ],
      imgLists7:  { src: require('../../asstes/image/img/23.png') },
      imgLists8: [
        { src: require('../../asstes/image/img/25.png') },
        { src: require('../../asstes/image/img/26.png'),id:9},
        { src: require('../../asstes/image/img/27.png') },
        { src: require('../../asstes/image/img/28.png'),id:10},
        { src: require('../../asstes/image/img/29.png'),id:11 },
        { src: require('../../asstes/image/img/30.png'),id:12},
        { src: require('../../asstes/image/img/31.png')},
        { src: require('../../asstes/image/img/32.png')},
      ],
      imgLists9:  { src: require('../../asstes/image/img/34.png') },
      button:  { src: require('../../asstes/image/button.png') },
      img555: { src: require('../../asstes/image/555.png') },
      img702: { src: require('../../asstes/image/702.png') },
      img009: { src: require('../../asstes/image/009.png') },
      img008: { src: require('../../asstes/image/008.png') },
      imgcode: { src: require('../../asstes/image/009.png') },
      codeNum:"hxsgu009",
      bigImg: [
        { src: require('../../asstes/image/big/1.jpg') },
        { src: require('../../asstes/image/big/2.jpg')},
        { src: require('../../asstes/image/big/3.jpg')},
        { src: require('../../asstes/image/big/4.jpg')},
        { src: require('../../asstes/image/big/5.jpg') },
        { src: require('../../asstes/image/big/6.jpg') },
        { src: require('../../asstes/image/big/7.jpg')},
        { src: require('../../asstes/image/big/8.jpg')},
        { src: require('../../asstes/image/big/9.jpg')},
        { src: require('../../asstes/image/big/10.jpg') },
        { src: require('../../asstes/image/big/11.jpg') },
        { src: require('../../asstes/image/big/12.jpg')},
      ],
      bigUrl:{
        src: require('../../asstes/image/big/1.jpg')
      },
      bigType:false
    }
  },
  created() {
   // this.getBaseInfo();
  },
  mounted: function () {
    var code=urlGet('code')+"";
    var that=this;
    var codeNum=Math.floor(Math.random()*4);
    console.log(codeNum);
     switch(codeNum){
       case 0:
       that.imgcode=that.img555;
       that.codeNum="hxsgu555";
       break;
       case 1:
       that.imgcode=that.img009;
       that.codeNum="hxsgu009";
       break;
       case 2:
       that.imgcode=that.img008;
       that.codeNum="hxsgu008";
       break;
       case 3:
       that.imgcode=that.img702;
       that.codeNum="hxsgu702";
       break;
     }
    
  },
  methods: {

    addImg:function(id){
       if(id){
         this.bigUrl=this.bigImg[(parseInt(id)-1)];
         this.bigType=true;
       }
    },
    copyCode:function(){
      clipboard.writeText(this.codeNum);
      this.$message("复制成功");
    }
  }
}
</script>

<style lang="less" scoped>
  html, body{
    font-size: 0px !important;
  }
  body{
    font-size: 0px !important;
  }
  .box-show{
    position:fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content:center;
    background-color: rgba(0,0,0,0.88);
    top:0px;
  }
  .box-show img{
    width: 100%;
    height: auto;
  }
.wrapper {
  font-size: 0px !important;
  img {
    font-size: 0px;
    width: 100%;
    height: auto;
    font-size: 0 !important;
  }
  a{
    font-size: 0 !important;
    height: initial;
    line-height: inherit;

  }
  .img-box {
    margin-bottom: 40px;
    font-size: 0 !important;
    height: 100vh;
    overflow: hidden;
    margin: 0px;
  }
  .text{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    letter-spacing: 2px;
    font-size: 0.5rem;
    line-height: 0.5rem;
    margin: 0px;
  }
  .tocell {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0px;
    font-size: 0 !important;
    
  }
  .btn-box{
    background-color: white;
  }
  .btn-box p{
    background-color: #0da384;
    width: 48%;
    height: 1.1rem;
    line-height: 1.1rem;
    border: 0px;
    border-radius: 1.5rem;
    color: white;
    margin: 0.2rem auto;
    letter-spacing: 2px;
    font-size: 0.60rem;
  }
}
</style>

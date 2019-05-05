<template>
  <div class="wrapper">
    <div class="img-r img-top">
      <img src="../../assets/images/item.png">
    </div>
    <div class="content">
      <div class="flex-c head">
        <span class="center title">
          <p class="num">{{persionInfo.rank}}</p>
          <p class="p2">我的排名</p>
        </span>
        <span class="img-head">
          <img :src="persionInfo.head_img">
        </span>
        <span class="esc name ellipsis">
            {{persionInfo.my}}
        </span>
        <span class="number flex-c">
            {{persionInfo.like}}
          <img src="../../assets/images/goodicon.png" />
        </span>
      </div>
      <ul>
        <li class="flex-c" v-for="(item,index) in fasrlist" :key="index">
          <span class="center title">
            {{index}}
          </span>
          <span class="img-head">
            <img :src="item.head_img">
          </span>
          <span class="esc name ellipsis">
              {{item.nickname}}
          </span>
          <span class="number flex-c">
            {{item.like}}
            <img src="../../assets/images/goodicon.png" v-if=" item.like != '--' " />
          </span>
        </li>
         <li v-if="listlangth==0">暂无排名</li>
      </ul>
    </div>
    <div class="img-r  img-bottom">
      <router-link :to="lossStart">
        <img  src="../../assets/images/back.png">
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    urlGet,
    isApp,
    getHxsAppVersion,
    compareAppVersion,
    LsShare
  } from 'Utils/common'
  import LvshouFetch from 'Api/common'
  export default {
    data() {
      return {
        topicId:null,
        fasrlist:[],
        listlangth:1,
        lossStart: '',
        persionInfo:{
          like:'',
          head_img:'',
          nickname:'',
          my:"",
        }
      }
    },
    created() {
      _hmt.push(['_trackEvent','按钮', '新年好礼第一波','查看排行榜']);
      this.topicId = this.$route.params.topicId;
      this.getActInfo();
      this.lossStart = '/index/' + this.$route.params.topicId;
      if (this.$route.fullPath.indexOf('?') > -1) {
         this.lossStart = this.lossStart + '?' + this.$route.fullPath.split('?')[1];
      }
    },
    methods: {
      getActInfo() {
        var that = this;
        let dataInfo = {
          move_id: that.topicId,
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        }
        axios
          .get('https://act.hxsapp.com/rankings/NewYear/getRank', {
            params: dataInfo
          })
          .then(res => {
            if (parseInt(res.data.code) === 200) {
              that.fasrlist= res.data.data[0];
              that.persionInfo=res.data.data[1];
              if(res.data.data[0].msg){
                that.fasrlist=[];
                that.listlangth=0;
              }
            
            } else {
              this.$message({
                message: '网络错误',
                center: true
              });
            }
          });
      },
    }
  }

</script>

<style lang="less" scoped>
  .wrapper {
    position: relative;
    overflow: hidden;
    height: 100vh;
  }
  .ellipsis {
     word-wrap: break-word;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
    }

  .wrapper {
  

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
    }

    span,
    p {
      font-size: 0.50rem;
      margin: 0rem;
      line-height: initial;
      height: auto;
    }

    .number {
      min-width: 1.55rem;
     margin-left: 0.1rem;
      justify-content: flex-end;
    }

    .number img {
      width: 0.42rem;
      margin-left: 0.2rem;
    }

    .content {
      position: absolute;
      top: 19%;
      z-index: 9;
      left: 50%;
      transform: translateX(-50%);
      color: white;
    }

    .content ul {
      margin: 0rem;
      padding: 0rem;
      overflow-y: scroll;
      margin-top: 0.9rem;
      max-height: 55vh;
    }

    .content .title {
      color: #fdee41;
    }

    .content .title .p2 {
      font-size: 0.35rem;
      width: auto;
      min-width: 1.6rem;
    }

    .content .name {
      width: 2.6rem;
      text-align: left;
      padding-left: 0.1rem;
      -webkit-box-orient: vertical;
    }
    .content .head .name{
      width: 1.5rem;
    }

    img {
      font-size: 0px !important;
      width: 100%;
    }
    .img-head{
      display: flex;
      justify-content:center;
      align-items: center;
    }
    .img-head img {
      width: 1.2rem;
      height: 1.2rem;
      background-color: #ff6e8d;
      border-radius: 4rem;
      margin: 0rem 0.05rem;
      margin-left: 0.1rem;

    }

    .img-top {
      height: 100vh;
      width: 100%;
    }
    .img-top  img{
      height: 100vh;
    }
    .img-bottom {
      position: absolute;
      bottom: 1%;
      left: 23%;
      width: 54%;
    }

    .content ul .title {
      color: #ff6e8d;
    }
  .head  .num{
      width: 2.1rem;
  }
  .wrapper    .head .number{
    min-width: 1.9rem;
  }
    .content ul li {
      color: #ff6e8d;
      border-bottom: 0.02rem solid #f0e8ff;
      margin: 0rem 0.3rem;
      padding: 0.2rem 0rem;
    }

    .content ul li .title {
      width: 0.85rem;
    }
    .wrapper .head .number{
        min-width: 1.50rem;
    }

    .content ul li  span{
      color: #ff6e8d;
    }

    .ellipsis {
     word-wrap: break-word;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
    }
  }

</style>

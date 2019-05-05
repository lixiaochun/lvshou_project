<template>
    <div class="explainReport">
        <div class="img-array">
          <img :src="item" v-for="(item,index ) in list">
        </div>
    </div>
  </template>
  
  <script>
  import common from '@/util/common.js'
  export default {
    name: 'stateReport',
    data() {
        return {
           video:"",
           list:[
           require("../../assets/img/report/state.png"),
           ],
        };
      },
      mounted() { 
        let typeNum=parseInt( common.getUrlParam("type") );
        const title1="承诺与声明";
        document.title = title1;
       
      },
      methods: {
  
  
      }
    };
  </script>
  <style   scoped lang="less">
  .explainReport{
  background-color: white;
  padding-top: 2px;
  img{
    font-size:0 !important;
    width: 100%;
    height: auto;
  }
  
  }
  </style>
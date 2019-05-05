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
  name: 'explainReport',
  data() {
      return {
         video:"",
         list:[],
         list1:[
         require("../../assets/img/report/1/1.png"),
         require("../../assets/img/report/1/2.png"),
         require("../../assets/img/report/1/3.png"),
         require("../../assets/img/report/1/4.png"),
         require("../../assets/img/report/1/5.png"),
         ],
         list2:[
         require("../../assets/img/report/2/1.png"),
         require("../../assets/img/report/2/2.png"),
         require("../../assets/img/report/2/3.png"),
         require("../../assets/img/report/2/4.png"),
         require("../../assets/img/report/2/5.png"),
         ]
      };
    },
    mounted() { 
      let typeNum=parseInt( sessionStorage.getItem("tag") );
      const title1="风险等级说明";
      const title2="能力等级说明";
      document.title = title1;
      this.list=this.list1;
      if(typeNum==2){
        document.title = title2;
        this.list=this.list2;
      }
     
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
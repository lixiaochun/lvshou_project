<template>
  <div id="healthyPackageInfo">
    <div class="title">
      W6体重管理套餐
    </div>
    <div class="content">
      <p>
        该套餐来源于欧洲，获得欧美临床医学验证，在全球应用超过30年，属于低热量瘦身法，已荣获世界卫生组织、美国糖尿病协会联合推荐。
      </p>
      <p>
        套餐周期为6周，分为减脂期、调理期、恢复期三个阶段，每个阶段为期2周。
      </p>
      <p>
        根据您的身体情况，经过科学分析，向您推荐每天
        <b>
        {{$route.query.text}}
        </b>
        大卡的饮食方案，同时保证必要的营养素补充，和循序渐进的运动锻炼。
      </p>
      <p>
        具体的方案内容，绿瘦的专业顾问会跟您详细沟通，并且全程指导。接下来，请开启您的轻盈之旅吧！
      </p>

    </div>

  </div>
</template>

<script>

import commonJs from '@/util/common.js'


export default {
  name: 'healthyPackageInfo',
  mounted(){
    // this.text = this.$route.query
    document.title = "W6体重管理套餐";
  },
  beforeDestroy(){
    document.title = commonJs.config.webTitle;
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

#healthyPackageInfo{
  margin: 0 auto;
  text-align: center;
  width: 100%;

  .title{
    padding:25px 0 20px; 
    font-size: 16px;
    color: #000000;
  }

  .content{
    width: calc(~"100%-30px");
    margin:0px 15px 0;
    font-size: 15px;
    color: #666;
    text-align: left;
    
    p{
      text-indent: 2em;
      margin-bottom: 30px;
      b{
        color: red;
      }
    }
  }
}
</style>

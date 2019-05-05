<template>
  <div id="healthyEvaluationReport">

    <div v-if="reportData.length" v-for="(data,index) in reportData" :key="index">
      <!-- index ＝3 健康预警 -->
      <div class="boxTitle" v-if=" !(index == 3 && data.length == 0) ">
        <em class="leftPoint"></em>
        <p>
          {{boxTitle[index]}}
        </p>
        <em class="rightPoint"></em>
      </div>
      
      <div v-if="data.length != 0">
        <div class="centerBox">
          <div v-if="index2 < 5" v-for='(data2,index2) in data' :key='index2' class="centerBoxLi list">
            <div>
              <div class="big_title">
                {{data2.label}}
              </div>
              <div class="big_tips">
                {{data2.advice}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="data.length == 0">
        <div v-if=" index !== 3 ">
          <br />
          恭喜您！暂未发现相关的不适症，请坚持定期体检，每年至少1年，有利于预防疾病！
          <br />
          <br />
        </div>
      </div>
      
    </div>
    <div v-if="reportData.length" class="shengming">
      <p>
        声明：以上内容是基于您填写的信息，借鉴国内外权威的专业的健康研究机构，经过综合分析从而得出的报告。本报告仅供参考，不具任何医疗诊断依据。若有相关疾病问题，请及时到医院就诊。
      </p>
      <div class="infoBtn" @click="infoBtn_w6">
        点击查看您的方案简报
      </div>
    </div>

    <preLoading v-if="!isPreLoading">
    </preLoading>

  </div>
</template>

<script>

import axios from 'axios'
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'
// import { Indicator } from 'mint-ui';

// 下载app组件
import downToLinkedMe from "@/components/downToLinkedMe"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
  name: 'healthyEvaluationReport',
  data() {
    return {
      isPreLoading:false,
      reportData:[],
      text:'',
      boxTitle:[
        "体型判断",
        "危险因子",
        "身体症状",
        "健康预警",
        "体重管理"
      ]
    }
  },
  components:{
    preLoading
  },
  mounted(){
    document.title = "健康评估报告";
    
    this.getUserLabel();
  },
  computed: {
    isLogin: function() {
      return commonJs.isLogin()
    },
    isApp: function() {
      return commonJs.isApp()
    }
  },
  methods:{
    infoBtn_w6(){
      this.$router.push({
        path:"/lvshou/healthyPackageInfo",
        query:{
          text:this.text
        }
      })
    },
    getUserLabel(){
      let json = {
        sess_token: commonJs.getUrlParam("sess_token"),
        user_id : this.$route.query.user_id ? this.$route.query.user_id :""
      }
      
      axios.get("https://api.hxsapp.com/slim/Questionnaire/getUserLabel", { params: json }).then((res) => {
        setTimeout(()=>{
          this.isPreLoading = true;
        },200)
        if(res.data.code == 200 && res.data.data.list) {
          this.reportData = res.data.data.list;
          this.text = res.data.data.text;
        }else{
          console.log(Error)
          Toast(res.data.msg)
        }
      }).catch((Error) => {
        console.log(Error)
        Toast("服务异常，请稍后再试！")
      })

      
    },
    gopage22(){
      this.$router.push({
        path:"/lvshou/vipClub?sess_token=f00e325214159ab2b207ebae92643448&utime=1514359705&sign=ZDIyNTQyZTQ2MDRmYTNhODk4NjNmN2M1MThjZWMzYmU%3D"
      })
    },
    
  },
  beforeDestroy(){
    document.title = commonJs.config.webTitle;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


#healthyEvaluationReport{
  margin: 0 auto;
  text-align: center;
  width: 100%;


  .boxTitle {
    background: #F5F5F8;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    
    .leftPoint {
      background: url("./../../assets/img/bodyTest/r_daunxian@2x.png") left top no-repeat;
      margin-right: 13px;
    }

    .rightPoint {
      background: url("./../../assets/img/bodyTest/l_daunxian@2x.png") left top no-repeat;
      margin-left: 13px;
    }

    .leftPoint,
    .rightPoint {
      width: 19px;
      height: 4px;
      background-size: 100% 100%;
      display: inline-block;
    }
    p {
      font-size: 15px;
      color: #333;
      display: inline-block;
    }
  }

  
  .centerBox {
    background: #FFF;
    padding: 25px 0;
    width: 100%;
    overflow: hidden;
    .centerBoxLi{
      float: left;
      width: 50%;
      text-align: center;

      &.list{
        width: 100%;
        padding: 0 15px 25px;
        box-sizing: border-box;
        text-align: left;
      }
      &.list:last-child{
        padding: 0 15px 23px;
      }
      .big_title{
        color: #333;
        font-size: 15px;
      }
      .big_tips{
        margin-top: 4px;
        color: #999;
        font-size: 13px;
      }
      .title{
        color: #999;
        font-size: 13px;
      }
      .center_box{
        padding: 4px 0 10px;
        font-size: 32px;
        color: #333;

        span{
          font-size: 13px;
          color: #999;
          position: relative;
          top: -4px;
          right: 4px;
        }
      }
      .tips{
        display: inline-block;
        text-align: center;
        overflow: hidden;
        width: 66px;
        height: 16px;
        line-height: 16px;
        background: #818DCF;
        border-radius: 2px;
        font-size: 11px;
        color: #fff;
      }
    }

  }

  .clear{
    clear: both;
  }

  .line{
    width: calc(~"100%"-30px);
    margin: 0 15px;
    box-sizing: border-box;
    height: 1px;
    background: rgba(129,141,207,0.20);
  }
  .disc_box{
    width: 100%;
    box-sizing: border-box;
    padding: 15px 15px 29px;
    p{
      text-align: left;
      font-size: 13px;
      color: #999999;
    }
  }


  .shengming{
    width: calc(~"100%-30px");
    margin:-20px 15px 0;
    padding-top: 12px;
    border-top: 1px solid rgba(129,141,207,0.20);
    font-size: 13px;
    color: #999999;
    text-align: left;
    .infoBtn{
      float: right;
      width: 160px;
      height: 25px;
      margin-top: 5px;
      line-height: 25px;
      text-align: center;
      border: 1px solid #818DCF;
      border-radius: 31px;
      font-size: 13px;
      color: #818DCF;
      margin-bottom: 60px;
    }
  }
}
</style>

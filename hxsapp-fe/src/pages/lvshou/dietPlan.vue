<template>

  <div id="dietPlan">
    <div v-if="dietPlanData">
      <div class="time_bar" v-if="startTime.time !='' ">
        <date-picker :date="startTime" :option="option" :limit="limit" @change="changeDatePicker"></date-picker>
      </div>

      <div v-for="(data,index) in dietPlanData" :key="index" v-if=" ( dietPlanData ) && (index == 'breakfast' || index == 'lunch' || index == 'dinner') ">
        
        <div class="title_box" >
          
          <img v-if="index == 'breakfast' " class="title_img" src="./../../assets/lvshou/img/zaocan_icon.png" />
          <img v-if="index == 'lunch' " class="title_img" src="./../../assets/lvshou/img/wucan_icon.png" />
          <img v-if="index == 'dinner' " class="title_img" src="./../../assets/lvshou/img/wancan_icon.png" />
          
          <span v-if="index == 'breakfast' " class="title_name">
            早餐
          </span>
          <span v-if="index == 'lunch' " class="title_name">
            中餐
          </span>
          <span v-if="index == 'dinner' " class="title_name">
            晚餐
          </span>
          <span class="title_time">
            {{data.desc}}
          </span>
        </div>

        <div class="content_box">
          <img class="content_img" :src="data.img" @click="goPage(data)" />
          <div class="content_text">
            <div @click="goPage(data)">
              <span class="content_title">
                {{data.title}}
              </span>
              <span class="content_kcal">
                {{data.kcal}}
              </span>
            </div>

            <div class="content_btn_box">
              
              <div class="reading_quantity" @click="addRecord(data)">
                <em>
                  <span class="jia"></span>
                  添 加
                </em>
              </div>

              <div class="reading_quantity" @click="changPlan(data,index)">
                <em>
                  换一换
                </em>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div v-if=" ! ( dietPlanData ) " class="noData_box">
        <div class="no_article">
        </div>
        <span class="text">
          {{startTime.time}}:暂无记录
        </span>
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

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

import myDatepicker from '@/components/lvshou/datepicker'

import moment from 'moment'

export default {
  name: 'dietPlan',
  data() {
    return {
      // 价值loading的判断
      isPreLoading:false,
      // 页面数据源
      dietPlanData:null,
      
      // 只是第一次改变一下时间的判断
      isLimit:false,

      // 日历的数据－开始
      startTime: {
        time: ''
      },

      option: {
        wrapperClass:"wrapperClass_dietPlan",
        type: 'day',
        format: 'YYYY-MM-DD',
        week: ['一', '二', '三', '四', '五', '六', '日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        // type: 'min',
        // format: 'YYYY-MM-DD HH:mm',
        placeholder: '',
        inputStyle: {
          'display': 'inline-block',
          // 'padding': '6px',
          // 'line-height': '22px',
          'font-size': '16px',
          "text-align":"center",
          // 'border': '2px solid #fff',
          // 'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          // 'border-radius': '2px',
          'color': '#4a4a4a'
        },
        color: {
          // checked: 'blue',
          // header: '#ccc',
          // headerText: 'red'
        },
        buttons: {
          ok: '确定',
          cancel: '取消'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      limit: [{
        type: 'fromto',
        from: '',
        to: ''
      }]
      // 日历的数据－结束
    }
  },
  mounted(){
    document.title = "饮食计划";
    
    this.getStartTime()
  },
  watch:{
    "startTime.time":function(val,old){

      if(val !=  old){
        console.log("时间不同，向后端获取数据")
        this.getPlan( val )
      }else{
        console.log("时间相同，我们不处理逻辑")

      }
    }
  },
  components:{
    'date-picker': myDatepicker,
    preLoading
  },

  methods:{
    getStartTime(){
      
      let json = {
        format:"Y-m-d"
      }
      console.log(JSON.stringify(json))
      axios.get("https://api.hxsapp.com/base/common/getTime", { params: json }).then((res) => {
        console.log("getStartTime：这里获取林极光的接口")
        var data = res.data;
        if( data.code == 200){

          this.startTime.time = res.data.data;

        }else{
          Toast(res.data.msg)
        }
      }).catch((Error) => {
        console.log(Error)
        Toast("服务异常，请稍后再试！")
      })
    },

    addRecord(res){
      // alert("这里需要木勇去拿套餐的id，去调林计光的去保存记录接口，前端这里拿接口的返回做业务，限制保存2个套餐,成功之后就调用app去添加记录的地方去");
      // debugger
      let json = {
        eat_type:res.eat_type,
        recipes_id: res.recipes_id,
        sess_token: commonJs.getUrlParam("sess_token")
      }

      console.log(JSON.stringify(json))
      axios.get("https://api.hxsapp.com/slim/food/saveRecord", { params: json }).then((res) => {
        console.log("getStartTime：这里获取林极光的接口")
        var data = res.data;
        if( data.code == 200){
          
          Toast({
            message: res.data.msg,
            duration: 1000
          })

          setTimeout(()=>{
            // debugger
            console.log("这里调用－hxsapp://foodAndSportRecord")
            var __appVersion = commonJs.getHxsAppVersion();

            var __is =  !! ( commonJs.compareAppVersion( __appVersion, "3.5.0" ) || __appVersion == "3.5.0" ) 
            // var __is =  !! ( commonJs.compareAppVersion( __appVersion, "3.2.1" ) || __appVersion == "3.2.1" ) 

            __is && ( window.location.href = "hxsapp://foodAndSportRecord" );

          },1200)
        }else{
          Toast(res.data.msg)
        }
      }).catch((Error) => {
        console.log(Error)
        Toast("服务异常，请稍后再试！")
      })

    },

    changeDatePicker(data){
      console.log("data:"+data)
      console.log("this.startTime.time:"+this.startTime.time)
    },
    getPlan( date ){
      let json = {
        date: date,
        sess_token: commonJs.getUrlParam("sess_token"),
        user_id: this.$route.query.user_id
        // user_id: "60019"
      }
      console.log(JSON.stringify(json))
      axios.get("https://api.hxsapp.com/slim/LsFood/getPlan", { params: json }).then((res) => {
        console.log("axios2-getSportScheme2,这里获取林极光的接口")
        var data = res.data;
        
        !this.isPreLoading  && setTimeout(()=>{
          this.isPreLoading = true;
        },200)

        if( data.code == 200){

          // debugger
          console.log("res.data.data.date:"+res.data.data.date)
          console.log("res.data.data.date-1:"+moment( res.data.data.startTime).subtract(1,"days").format('YYYY-MM-DD'))
          console.log("res.data.data.date+1:"+moment( res.data.data.date).add(1,"days").format('YYYY-MM-DD'))
          
          !this.isLimit && res.data.data && setTimeout(()=>{
          
            this.limit.splice(0,1,Object.assign({}, this.limit[0], {
              type: 'fromto',
              from: moment( res.data.data.startTime ).subtract(1,"days").format('YYYY-MM-DD'),
              to: moment( res.data.data.date ).add(2,"days").format('YYYY-MM-DD')
            }))

            this.isLimit = true;
          },300)
          if( data.data && data.data.list) {
            this.dietPlanData = res.data.data.list;
            
            Toast({
              message: "加载数据!",
              duration: 1000
            })
          }
        }else{
          Toast(res.data.msg)
        }
      }).catch((Error) => {
        console.log(Error)
        Toast("服务异常，请稍后再试！")
      })
      
    },

    changPlan( res,index){
      // alert("这里拿后端的数据来做业务")
      
      let json = {
        eat_type: res.eat_type,
        recipes_id: res.recipes_id,
        date: this.startTime.time,
        sess_token: commonJs.getUrlParam("sess_token")
      }
      // debugger
      console.log(JSON.stringify(json))
      axios.get("https://api.hxsapp.com/slim/LsFood/changPlan", { params: json }).then((res) => {
        console.log("axios2-changPlan,这里获取粱木勇的接口")
        var data = res.data;
        
        if( data.code == 200){

          if( data.data ) {
            this.dietPlanData[index] = res.data.data;
            Toast({
              message: "加载数据!",
              duration: 1200
            })
          }else{
            Toast({
              message: "暂无数据!",
              duration: 1200
            })
          }
        }else{
          Toast(res.data.msg)
        }
      }).catch((Error) => {
        console.log(Error)
        Toast("服务异常，请稍后再试！")
      })

    },
    goPage( res ){
      var recipes_date = this.startTime.time;
      var __url = commonJs.config.prefixUrl + "lvshou/dietPlanDetail/"+ res.recipes_id + "/"+ recipes_date + '/' + res.eat_type;
      console.log("__url:"+__url)
      // debugger
      if( process.env.NODE_ENV !== 'production' ){
        // window.location.replace ( __url )
        window.location.href =  __url+window.location.search;
      }else{
        commonJs.h5CallAppAction.hxsapp_new_webview( encodeURIComponent(__url) )
      }
    }

  },
  
  computed: {
    isLogin: function() {
      return commonJs.isLogin()
    },
    isApp: function() {
      return commonJs.isApp()
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

#dietPlan{
  margin: 0 auto;
  text-align: center;
  width: 100%;
  overflow: hidden;

  .noData_box{
    width: 100%;
    margin: 0 auto;
    height: 500px;
    text-align: center;
    font-size: 18px;
    position: relative;
    .no_article{
      display: block;
      position: absolute;
      width: 140px;
      height: 140px;
      left: 50%;
      top: 50%;
      z-index: 1;
      margin-left:-70px;
      margin-top:-120px;
      background: url(./../../assets/images/quesheng_kong.png) left top no-repeat;
      background-size: 100%;
    }
    .text{
      display: block;
      position: absolute;
      width: 240px;
      height: 30px;
      line-height: 30px;
      top:50%;
      left:50%;
      margin-top:50px;
      margin-left: -120px;
      text-align: center;
      color: #333;
      font-size: 17px;
      z-index:2;
    }
  }


  .time_bar{
    width: 100%;
    background: #F5F5F8;
  }

  .title_box{
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: left;
    overflow: hidden;

    .title_img{
      display: block;
      float: left;
      margin-top: 12px;
      margin-left: 15px;
      width: 18px;
      height: 18px;
    }
    .title_name{
      display: block;
      float: left;
      color: #333333;
      line-height: 22px;
      font-size: 17px;
      margin-top: 10px;
      margin-left: 15px;
    }
    .title_time{
      display: block;
      float: right;
      color: #999;
      font-size: 13px;
      line-height: 18px;
      margin-right: 23px;
      margin-top: 12px;
      margin-left: 15px;
    }
  }

  .content_box{
    width: 100%;
    height: 85px;
    padding-bottom: 24px;
    text-align: left;
    overflow: hidden;
    position: relative;
    border-bottom: 7px solid #F5F5F8;

    .content_img{
      display: block;
      position: absolute;
      top:0px;
      left:15px;
      width: 109px;
      height: 85px;
    }
    .content_text{
      width: 100%;
      padding-left: 139px;
      box-sizing: border-box;
      height: 85px;

      .content_title{
        display: block;
        color: #333333;
        margin-top: 6px;
        height: 21px;
        line-height: 21px;
        font-size: 15px;
      }
      .content_kcal{
        display: block;
        color: #4a4a4a;
        margin-top: 3px;
        height: 21px;
        line-height: 21px;
        font-size: 15px;
      }
      .content_btn_box{
        margin-top: 10px;
        height: 25px;
        overflow: hidden;

        .reading_quantity {
          display: block;
          float: right;
          margin-right: 23px;
          width: 60px;
          text-align: center;
          border: 1px solid #818DCF;
          height: 25px;
          line-height: 23px;
          box-sizing: border-box;
          border-radius: 15px;
          em {
            color: #818DCF;
            font-size: 13px;
            display: block;
            width: 100%;
            text-align: center;
            .jia{
              display: inline-block;
              // margin-right: 3px;
              // margin-left: -6px;
              width: 10px;
              height: 10px;
              background: url("./../../assets/img/jia_btn_120x50@2x.png") no-repeat;
              background-size: 100%;		
            }
          }
        }

      }

    }
  }
  
  
}
</style>

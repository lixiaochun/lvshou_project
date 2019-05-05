<template>
  <div id="sportsPlan">

    <div v-if="sportsPlanData">
      <div class="time_bar" v-if="startTime.time !='' ">
        <date-picker :date="startTime" :option="option" :limit="limit" @change="changeDatePicker"></date-picker>
      </div>
      <div class="info_box">
        <img src="./../../assets/lvshou/img/yundong_icon.png" />
        <span class="title">
          训练时长
        </span>
        <span class="time">
          30分钟
        </span>
        <span v-if="0" class="kcal">
          30Kcal
        </span>
        
      </div>

      <img @click="goAppPageView" src="./../../assets/lvshou/img/sportsPlan/banner.jpg" />

      <div class="info_title" >
        抗阻运动
      </div>
      <div class="img_box" v-if=" sportsPlanData.sportList && sportsPlanData.sportList.length" v-for="(data,index) in sportsPlanData.sportList" :key="index" @click="goPage(data)">
        <img :src="data.images" />
      </div>

      <div v-if="!( sportsPlanData.sportList && sportsPlanData.sportList.length )  ">
        <img src="./../../assets/lvshou/img/sportsPlan_no1.jpg" />
        <img v-if="0" src="./../../assets/lvshou/img/sportsPlan_no2.jpg" />
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
  name: 'sportsPlan',
  data() {
    return {
      isPreLoading:false,
      sportsPlanData:null,

      isLimit:false,

      // 日历的逻辑
      startTime: {
        time: ''
      },

      option: {
        wrapperClass:"wrapperClass_sportsPlan",
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
      // limit: []
      limit: [{
        type: 'fromto',
        from: '',
        to: ''
        // from: moment("2018-02-02").subtract(1, 'days'),
        // to: moment("2018-03-10").add(1, 'days')
      }]
    }
  },
  components:{
    'date-picker': myDatepicker,
    preLoading
  },
  mounted(){
    document.title = "运动方案";
    
    this.getStartTime()
    
  },
  watch:{
    "startTime.time":function(val,old){

      if(val !=  old){
        console.log("时间不同，向后端获取数据")
        this.getSportScheme( val )
      }else{
        console.log("时间相同，我们不处理逻辑")

      }
    }
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
    goAppPageView(){

      window.location.href = "hxsapp://sportPool";
    },

    changeDatePicker(data){
      console.log("data:"+data)
      console.log("this.startTime.time:"+this.startTime.time)
    },

    getSportScheme( record_date ){
      let json = {
        record_date: record_date.replace("-","").replace("-",""),
        sess_token: commonJs.getUrlParam("sess_token"),
        user_id: this.$route.query.user_id
        // user_id: "60019"
      }
      var _this = this;

      console.log(JSON.stringify(json))
      axios.get("https://api.hxsapp.com/slim/Sport/getSportScheme", { params: json }).then((res) => {
        console.log("axios2-getSportScheme：这里获取林极光的接口2")
        var data = res.data;
        !this.isPreLoading  && setTimeout(()=>{
          this.isPreLoading = true;
        },200)

        if( data.code == 200){
          
          // debugger
          console.log("res.data.data.endTime:"+res.data.data.endTime)
          console.log("res.data.data.startTime-1:"+moment( res.data.data.startTime).subtract(1,"days").format('YYYY-MM-DD'))
          console.log("res.data.data.endTime+1:"+moment( res.data.data.endTime).add(1,"days").format('YYYY-MM-DD'))

          !this.isLimit && res.data.data && setTimeout(()=>{
            
            this.limit.splice(0,1,Object.assign({}, _this.limit[0], {
              type: 'fromto',
              from: moment( res.data.data.startTime ).subtract(1,"days").format('YYYY-MM-DD'),
              to: moment(res.data.data.endTime).add(1,"days").format('YYYY-MM-DD')
            }))
            this.isLimit = true;
          },300)

          if( data.data && data.data.sportList) {
            this.sportsPlanData = res.data.data;

            if( ! data.data.sportList.length ){
              Toast({
                message: "暂无数据:"+record_date,
                duration: 1000
              })
            }else{
              Toast({
                message: "加载数据:"+record_date,
                duration: 1000
              })
            }
          }
        }else{
          // this.sportsPlanData = {}

          Toast(res.data.msg)
        }
      }).catch((Error) => {
        console.log(Error)
        Toast("服务异常，请稍后再试！")
      })
      
    },

    goPage(data){
      
      var __url = data.url ;
      console.log("__url:"+__url)
      // debugger
      commonJs.h5CallAppAction.hxsapp_new_webview( encodeURIComponent(__url) )
      
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

#sportsPlan{
  margin: 0 auto;
  text-align: center;
  width: 100%;
  overflow: hidden;
  .time_bar{
    width: 100%;
    background: #F5F5F8;
  }

  img{
    width: 100%;
  }
  .info_title{
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    color: #4a4a4a;
    font-size: 16px;
    background: #fff;
    text-align: center;
  }    
  .info_box{
    width: 100%;
    padding-left:15px;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    color: #4a4a4a;
    font-size: 16px;
    background: #fff;
    text-align: left;
    img{
      width: 18px;
      height:18px;
      display: inline-block;
      position: relative;
      top: 2px;
    }
    .title{
      display: inline-block;
      padding:0 10px;
      font-size: 17px;
      color: #333333;
    }
    .time{
      display: inline-block;
      font-size: 13px;
      color: #999999;
      position: relative;
      top: -2px;
    }
    .kcal{
      display: inline-block;
      font-size: 13px;
      color: #999999;
    }
  }

  .img_box{
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    img{
      width: 100%;
    }

  }


}
</style>

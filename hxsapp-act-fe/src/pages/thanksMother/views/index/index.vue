<template>
  <div class="wrapper" style="background-color: #fd6fa1;">
     
    <div class="img-box" >
        <img src="../../asstes/image/top_01.jpg" >
        <img src="../../asstes/image/top_02.jpg">
        <img src="../../asstes/image/top_03.jpg">
        <img src="../../asstes/image/top_04.jpg"  >
        <img src="../../asstes/image/top_05.jpg"  style="padding-bottom: 20px;">
    </div>
    <a href="#" class="tocell"  >
      <img src="../../asstes/image/btn.jpg" @click="toShop">
    </a>
  </div>
</template>

<script>

  import axios from 'axios'
  import {
    urlGet,
    LsShare,
    userAgent
  } from 'Utils/common'

  import { Toast,Popup } from 'mint-ui'
  import LvshouFetch from 'Api/common';
  export default {
    name: 'index',
    data() {
      return {
        popupData:{
          name:"",
          content:"",
          index:1,
          right:"",
          bottom:""

        },
        popupVisible:false,
        popupType:false,
        baseInformation: {
          act_id: urlGet('id'),
          sess_token: urlGet('sess_token'),
          utime: urlGet('utime'),
          sign: urlGet('sign')
        },
        fromdata:{
           name:"",
           num:"",
           email:"",
           content:"",
        },
        imgLists1: [{
            src: require('../../asstes/image/3_1.png')
          },
          {
            src: require('../../asstes/image/3_2.png')
          },
          {
            src: require('../../asstes/image/3_3.png')
          },
          {
            src: require('../../asstes/image/3_4.png')
          },
          {
            src: require('../../asstes/image/3_5.png')
          },
          {
            src: require('../../asstes/image/3_6.png')
          },
          {
            src: require('../../asstes/image/3_7.png')
          },
          {
            src: require('../../asstes/image/3_8.png')
          },
        ],
        imgLists2: [{
            src: require('../../asstes/image/4.png')
          },
          {
            src: require('../../asstes/image/5.png')
          },
          {
            src: require('../../asstes/image/6.png')
          },
          {
            src: require('../../asstes/image/7.png')
          },
          {
            src: require('../../asstes/image/8.png')
          },
          {
            src: require('../../asstes/image/9.png')
          },
          {
            src: require('../../asstes/image/10.png')
          }
        
       
        ],
        imgLists3:[
          {
            src: require('../../asstes/image/12.png')
          },
          {
            src: require('../../asstes/image/13.png')
          },
        ],
        imgLists4:   {
            src: require('../../asstes/image/11.png'),name: 'coupon'
          },
        defaultImg:{
          src: require('../../asstes/image/21.png')
        },
        defaultImg2:{
          src: require('../../asstes/image/22.png')
        }
        ,titleName:[
          {
            name:"品牌实力",
            content:"绿瘦是一家集美容美体产品及保健品经营的集团，以“绿色、健康”为目标，并融合健康咨询、健康服务、健康购物指导为一体，建成绿瘦连锁体系，致力成为绿色、健康的代表品牌。"
          },
          {
            name:"模式领先",
            content:"精准、庞大、专业的“大数据云平台”，以客户为中心提供一对一管理服务。其中绿瘦商场拥有国内数以万计的体重管理大数据库，不断刷新保健品、食品电商发展新奇迹，为绿瘦美学馆的实体加盟打下坚实基础，真正实现线上购买、线下体验的O2O商业模式。"
          },
          {
            name:"数据优势",
            content:"绿瘦旗下的绿瘦商场已积累了数千万客户的数据资源，且每年以数十万的速度增长。绿瘦美学馆将利用这些数据优势，将线上客户导入线下门店，实现商业生态圈的资源引流，帮助加盟商解决客源难题，缩短加盟店的试运营期，提高加盟店的赢利点。"
          },
          {
            name:"高端仪器设备",
            content:"绿瘦携手国内外的美容仪器机构，引进一批高科技减肥纤体、美容抗衰仪器，致力于为消费者提供高端、健康的美丽体验。"
          },
          {
            name:"完善售后及整店输出优势",
            content:"绿瘦拥有完善的售后体系，丰富的售后服务经验，在开业筹备、人员培训、店务管理、终端拓展等方面均具有强大的服务能力，能给予加盟商更周到的售后支持。实现5大输出：产品输出、仪器输出、SI形象输出、技术输出、人员输出。"
          },
          {
            name:"“利润捆绑”及“人才捆绑”",
            content:"美学馆加盟商可免费获赠一家“线上商店”，并在线上商店销售绿瘦商场的所有产品，从而增加活力渠道。同事提升加盟商店内员工的收入，降低人才流失，从而实现“利润捆绑”及“人才捆绑”。"
          },
          {
            name:"托管服务和联营开店",
            content:" 公司可提供托管服务，担任加盟商的投资理财顾问；如客户经验成熟，但资金预算不足，公司可和加盟商联营开店，由公司出面向银行担保，帮助加盟商申请贷款，做加盟商的投资人。"
          }
          ,
          {
            name:"项目粘合度优势",
            content:"绿瘦拥有绿瘦美学馆（实体专业线）、绿瘦美妆、绿瘦康孚国际医美、绿瘦商场、绿瘦地面公司（药妆）、绿瘦微商等。集团打通产业链，联合各个项目，加盟一家美学馆=投资N个项目，实现绿瘦美学馆+。"
          }
        ],
        type:{
          coupon:2,
          commit:2,
          disabled:false
        },
        index:null,
      }
    },
    components: {
      Popup
    },
    created() {
     // this.getBaseInfo();
    },
    mounted: function () {
      var that=this;
    },
    methods: {
      async getBaseInfo() {
        // 通过接口获取基础信息
        const data = this.baseInformation
        //  url=http://act.hxsapp.com/base/Api/actInfo?act_id=276
        const apiData = await LvshouFetch({
          url: 'https://act.hxsapp.com/base/Api/actInfo',
          data
        })
        // 通过api 接口 动态改变title
        document.title = apiData.title
        let link = "https://app.hxsapp.com/actweb/EstheticsShop/index"
        // 调起app 的分享协议
        LsShare({
          shareLink: link,
          shareTitle: apiData.title,
          shareImages: apiData.share_pic,
          shareDescr: apiData.descr,
          shareType: apiData.share_type
        })
      },
        //跳转商城首页
      toShop() {
        debugger;
        if (userAgent() === 'ios') {
         // window.location.href = 'https://hxsapp_gopage?page_name=MallHomeController'
            window.location.href = 'https://hxsapp_gopage?page_name=HXSMallHomeViewController'
        } else if (userAgent() === 'and') {
       //   window.location.href = 'https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.shop.ShopActivity'
           window.location.href = 'https://hxsapp_gopage?page_name=com.lvshou.hxs.activity.shop.ShopSecondActivity'
        }
      },
      getData(type){
        if(type) return;
        var that=this;
        that.popupType=false;
        that.$refs['fromdata'].validate((valid) => {
          if(this.fromdata.num.length<11){
            this.$message("手机格式有误，请重新输入(11位的手机号码)");
            return;
          }
          if(!(/^1[345789]\d{9}$/.test(this.fromdata.num))){ 
              this.$message("手机格式有误，请重新输入");
              return; 
          } 
          if (valid) {
            axios.get('https://act.hxsapp.com/art/Apply/applys', {
              params: {
                sess_token: this.baseInformation.sess_token,
                act_id: this.baseInformation.act_id,
                name:this.fromdata.name,
                mobile:this.fromdata.num,
                email:this.fromdata.email,
                message:this.fromdata.content
              }
            }) .then(res => {
                if(parseInt(res.data.code)==200){
                  that.type.disabled=true;
                  that.type.commit=1;
                  this.$message(res.data.msg);
                }else{
                  this.$message(res.data.msg);
                  Toast(res.data.msg);
                }
            })
          } else {
            return false;
          }
        });
      },
      getCoupon(name){
        var that=this;
        that.popupType=false;
        if(that.type.coupon==1){
          this.$message("已领取");
           return;
        }
        if(name=="coupon"){
          axios.get('https://act.hxsapp.com/art/Apply/index', {
            params: {
              sess_token: this.baseInformation.sess_token,
              act_id: this.baseInformation.act_id,
            }
          }) .then(res => {
              if(parseInt(res.data.code)==200){
                this.$message(res.data.msg);
                that.type.coupon=1;
              }else{
                this.$message(res.data.msg);
              }
          })
        }
     
      }
      ,getPopup(index){
         var that=this;
         if(that.index==index){
          that.index=null;
          that.popupType=false;
         }else{
          that.index=index;
          that.popupType=true;
         }


         
         that.popupData.name=that.titleName[index].name;
         that.popupData.content=that.titleName[index].content;
         if(index>3){
           that.popupData.bottom="3.5rem";
         }else{
          that.popupData.bottom="6.5rem";
         }
         if(index==0||index==4){
          that.popupData.right="7.8rem";
         }else if(index==1||index==5){
          that.popupData.right="5.4rem";
         }else if(index==2||index==6){
          that.popupData.right="2.9rem";
         }else if(index==3||index==7){
          that.popupData.right="1rem";
         }
      },
    }
  }
</script>
<style>
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before{
    content: "";
    margin-right:0rem;
  }
.el-textarea__inner{
  resize: none;
  background:rgba(255,255,255,1);
border-radius:8px;
border:1px solid rgba(151,151,151,1);
}
.el-input__inner{
  background:rgba(255,255,255,1);
border-radius:8px;
border:1px solid rgba(151,151,151,1);
}
.el-form-item  .el-form-item__label{
  color:#999999;
}
.el-form-item:first-of-type .el-form-item__label{
  letter-spacing: 0.76rem;
    left: 0.7rem;
    width: 100px !important;/*no*/
    position: absolute;
}
.el-form-item:last-of-type .el-form-item__label{
  letter-spacing: 0.76rem;
    left: 0.7rem;
    width: 100px !important;/*no*/
    position: absolute;
}
.el-textarea__inner{
  border: 0.023333rem solid rgba(151,151,151,1);
}
.el-input__inner{
  border: 0.023333rem solid rgba(151,151,151,1);
  height: 0.8rem;
    line-height: 0.8rem;
}
.el-form-item .el-form-item__label{

  font-size: 0.4rem;
}
.el-input__inner{
  font-size: 0.4rem;
}
.el-textarea__inner{
  font-size: 0.4rem;
}
</style>
<style lang="less" scoped>
  html{
    background-color: white !important;
  }
  body {
    background-clip: white;
    background-color: white !important;
  }
  .wrapper {
    img {
      font-size: 0px;
      width: 100%;
      height: auto;
      font-size: 0 !important;
    }
      .from-box{
        padding: 0.5rem;
      }
    .img-box {
      margin-bottom: 40px;
      font-size: 0 !important;
    }

    .row img {
      width: 25%;
      display: inline-block;
    }
   .row{
     position: relative;
   }
    .tocell {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 00px;
      font-size: 0 !important;
      bottom: -7px;
      background-color: #10987a;
    }
    .popup{
      background:rgba(255,255,255,1);
      border-radius:8px 8px 8px 4px;
      border:0.02rem solid rgba(59,157,56,1);
      padding: 0.3rem;
      position: absolute;
      margin: 0 0.6rem;
    }

      .angle{
         height: 0.20rem;
         position: absolute;
    bottom: -0.16rem;
    background-color: white;
    width: 0.40rem;
      }
      .angle i{
        font-size: 0.4rem;
    position: relative;
    transform: scale(1.5);
    margin-top: -0.03rem;
    color: rgba(59,157,56,1);
      }
      .angle .l{
         height: 0.20rem;
         width:0.02rem;
         position: relative;
         margin-right: 0.06rem;
         display: inline-block;
          transform: rotate(-45deg);
          background-color: rgba(59,157,56,1);
      }
      .angle .r{
        height: 0.20rem;
         width: 0.02rem;
         position: relative;
         margin-left: 0.06rem;
         display: inline-block;
         transform: rotate(45deg);
         background-color: rgba(59,157,56,1);
      }
      .big{
        font-size: 0.36rem;
        margin: 0px;
        color: rgba(59,157,56,1);
        line-height: 0.36rem;
        letter-spacing: 1px;
        text-align: left;
      }
      .small{
        color: rgba(102,102,102,1);
        line-height: 0.44rem;
        font-size: 0.26rem;
        text-align: left;
        margin: 0rem;
        margin-top: 0.1rem;
       
      }
  }
</style>

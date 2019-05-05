<template>
    <div class="itemReport">
        
      <div class="item-box" v-for="(item,index)  in dataList ">
          <div class="flex-c title head-table mar-15" v-if="item.description">
              <span></span> <h4>{{item.header}}</h4> <span></span> 
          </div>
          <p class="head-centent mar-15"  v-if="item.description" >
           {{item.description}}
          </p>
      </div>
        <div class="flex-c title head-table">
            <span></span> <h4>{{gradetitle}}</h4> <span></span> 
        </div>
        <img :src="thisimg" class="risk-state center">
        <h5 class="center font-s"> {{thistitle}}</h5>
        <p class="head-centent">
               {{thiscontent}}
        </p>
        <h5 class="font-s mar-30">检测基因：</h5>
        <table class="table" cellspacing="0" cellpadding="0"  >
              <tr v-for="(item,index) in geneList" >
                <td class="td-f">{{item.origeneName }}</td>
                <td class="td-s" @click="poPup(index)">
                  <span class="flex-c">
                    {{gradetitle}} <img src="../../assets//lvshou/img/right_point.png" class="arrows-img">
                  </span></td>
              </tr>
        </table>
      <div v-if="this.gradetitle=='风险等级'">

    
        <h5 class="font-s">多少人和我一样：</h5>
        <div class="item-img">
          <h3 class="item-h3">{{bcakData.num}}%</h3>
          <img src="../../assets/img/report/D_risk level_lower(1).png">
        </div>
        <h5 class="font-s">体检策略：</h5>
        <pre>{{thislist}}</pre>
        <!-- <table class="table table-b" cellspacing="0" cellpadding="0"  >
            <tr v-for="(item,index) in geneList2" >
              <td class="td-f">{{item.name}}</td>
              <td class="td-s">{{item.content}}  </td>
            </tr>
        </table> -->

      </div>

        <el-dialog width="80%" :visible.sync="dialogTableVisible">
            <div class="share-down">
              <div class="bg"></div>
              <div class="share-cont">
                  <div class="flex-c title head-table mar-0">
                     <h4>检测基因</h4>
                  </div>
                  <table class="table table-b" cellspacing="0" cellpadding="0"  >
                      <tr >
                          <td class="td-f">位点编号</td>
                          <td class="td-s center">{{geneList3.gtid}}  </td>
                      </tr>
                      <tr >
                          <td class="td-f">基因中文名</td>
                          <td class="td-s center">{{geneList3.origeneName}}  </td>
                      </tr>
                      <tr >
                          <td class="td-f">基因名</td>
                          <td class="td-s center">{{geneList3.origeneID}}  </td>
                      </tr>
                      <tr >
                          <td class="td-f">基因功能</td>
                          <td class="td-s">{{geneList3.origeneFunction}} </td>
                      </tr>
                      <tr >
                          <td class="td-f">基因型</td>
                          <td class="td-s center" v-if="geneList3.gt">
                            <p>
                                ···[{{geneList3.gt[0]}}]··· 
                            </p>
                            <p>
                                ···[{{geneList3.gt[1]}}]··· 
                            </p>
                            </td>
                      </tr>
                      <tr >
                          <td class="td-f">等级</td>
                          <td class="td-s center">
                              <img :src="cellImg[geneList3.type]" class="risk-state center">
                          </td>
                      </tr>
                  </table>
              </div>
            </div>
          </el-dialog>


    </div>
  </template>
  
  <script>
  import commonJs from '@/util/common.js'
  export default {
    name: 'itemReport',
    data() {
        return {
           video:"",
           list:[
           require("../../assets/img/report/state.png"),
           ],
           geneList:[
             {
               href:"1",
               name:"甲基四氢叶酸还原酶基因",
             }
           ],
           geneList2:[
             {
               content:"肺癌常被认为与以下风险因素相关： 1．吸烟：吸烟者肺癌死亡率比不吸烟者高10～13倍，而且吸烟年龄越早、吸烟时间越长、吸烟量越大，肺癌的死亡率越高；被动吸烟也容易引起肺癌。 2．空气污染：室外大环境污染，如工业废气、汽车尾气等，室内小环境污染，如厨房油烟等均为肺癌发生的风险因素。",
               name:"体检策略",
             }
           ],
           geneList3:{ },
           bcakData:{
              content:"",
              title:"",
              riskState:0,
              num:"50",
              introduce:"介绍",

           },
           dataList:[],
           gradetitle:"",
           dialogTableVisible:false,
           cellImg:[
              require("../../assets/img/report/5.png"),
              require("../../assets/img/report/5.png"),
              require("../../assets/img/report/4.png"),
              require("../../assets/img/report/3.png"),
              require("../../assets/img/report/2.png"),
              require("../../assets/img/report/1.png"),

            ],
            celltitle:[
               "低遗传风险",
               "低遗传风险",
               "较低遗传风险",
               "中度遗传风险",
               "较高遗传风险",
               "较高遗传风险"

            ],
            thistitle:"",
            thisimg:"",
            thiscontent:'',
            thislist:"",

        };
      },
      mounted() { 
      
        const title1="检查项目结果详情页";
        document.title = title1;
        var  tag=commonJs.getUrlParam('tag');
       var title=JSON.parse(  sessionStorage.getItem("itemreportitle") );
       var content=JSON.parse(   sessionStorage.getItem("itemreporcontent") );
        console.log("res",title,content);
        var s_arr = Object.getOwnPropertyNames(content); 
    var s_arr2 = Object.keys(content);
       var s_valArr = s_arr.map(function(i){return content[i]});
      var s_valArr2 = s_arr2.map(function(i){return content[i]});
    //或者2,4和3,5各自合并成一条语句
         var s_valArr22 = Object.keys(content).map(function(i){return content[i]});
         this.dataList=s_valArr22.reverse();
         var tag=parseInt( sessionStorage.getItem("tag"))
   
         if(tag==2){
          this.gradetitle="能力等级";
         }else{
          this.gradetitle="风险等级"
          this.bcakData.num=title.levelPercent;
   
          this.thislist=(content.suggestion.healthy.part1)
         }
         this.thisimg=this.cellImg[title.type];
         this.thistitle=this.celltitle[title.type];
         this.thiscontent=title.concl;
         this.geneList=title.genotype;
        
      
      },
      methods: {
        poPup(id){
          debugger;
          var that=this;
          this.geneList3=this.geneList[id];
          var gat1= that.geneList[id].gt;
          var gat2= that.geneList[id].gt;
          if(gat1.length||gat1.length>0){
            gat2="";
            for(var i=0;i<gat1.length;i++ ){
              gat2+=gat1[i];
            }
          }
          var gt1=(gat2).substring(0,1);
          var gt2=( gat2 ).substring(1,2);
          this.geneList3.gt=[];
          this.geneList3.gt[0]=gt1;
          this.geneList3.gt[1]=gt2;
          this.dialogTableVisible=true;
        },
  
      }
    };
  </script>

  <style lang="less">
  .itemReport{
    .el-dialog__wrapper{


      background:#bbbcbe;
    }
    .el-dialog{
      margin: 0px auto;
      border-radius: 8px;

      .center{
      text-align: center !important;
      margin: 0 auto;
      vertical-align: middle
    }

    }
    pre{
      word-wrap: break-word;
    height: auto;
    white-space: pre-line;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 30px;
    margin-bottom: 40px;
    }
    .el-dialog__headerbtn .el-dialog__close{
      width:35px;
      height:35px;
      background:rgba(238,238,238,1);
      color:rgba(173,173,173,1);
      border-radius: 50px;
      line-height: 35px;
    font-size: 24px;
    font-weight: 500;
    border-radius: 60px;
    position: absolute;
    top: -35px;
    }
    .el-dialog__body{
      padding: 1px 20px;
      .table .td-f{
        line-height: 15px !important;
      font-size: 11px !important;
      width: 35% !important;
    }
    .table .td-s{
      width: 65% !important;
      line-height: 15px !important;
      font-size: 11px !important;
      }
      .risk-state{
        margin: 0 auto  !important;
      }
    }
    .mar-0{
      margin: 15px 0px;
    }
    .el-dialog__header{
      padding: 0px;
    }
  }
  
  </style>
  <style   scoped lang="less">
  .itemReport{
      margin:  15px;
      .head-table{
      font-size:17px;
      font-family:PingFangSC-Regular;
      color:rgba(51,51,51,1);
      margin-top:30px;
    }
    .head-centent{
      color:rgba(102,102,102,1);
      margin-bottom: 15px;
      font-size:15px;
    }
    .table{
      margin-bottom: 30px;
      display: table;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid rgba(129,141,207,0.2);
    }
    .arrows-img{
      height: 13px;
      width: auto;
      padding-left: 8px;
      box-sizing: content-box;
      vertical-align: middle;
      display: inline;
    }
    .table tr{
 
    }

    .table td{
      border-collapse: collapse;
      border: 1px solid rgba(129,141,207,0.2);
      /* padding:10px 10px ; */
      min-height: 50px;
      height: auto;
      line-height: 50px;
      text-align: center;
      background-color: #fff;
      vertical-align: middle;
      box-sizing: border-box;
      word-break:break-all;

    }
    .table .td-f{
      font-size:13px;
      color:rgba(102,102,102,1);
      width: 74%;
    }
    .table .td-s{
      width: 26%;
      font-size:13px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(129,141,207,1);
    }
    .table-b{

    }
    .table-b .td-s{
      color:rgba(102,102,102,1);
      width: 74%;
      text-align: left;
      padding: 15px;
      line-height:18px;
    }
    .table-b .td-f{
      color:rgba(102,102,102,1);
      width: 26%;
      overflow: hidden;
    }
    .head-table span{
      width: 12px;
      height: 1px;
      display: inline-block;
      background-color: rgba(51,51,51,1);
      border-radius: 1px;
      margin: 0px 5px;
    }
    .head-table h4{
      font-size:17px;
      font-family:PingFangSC-Regular;
      color:rgba(51,51,51,1);
      font-weight: 500;
    }
    .item-img{
      position: relative;
    }
    .item-img .item-h3{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size:40px;
font-family:PingFangSC-Semibold;
font-weight:600;
color:rgba(129,141,207,1);
    }
    .center{
      text-align: center;
      margin: 0 auto;
      vertical-align: middle
    }
    .font-s{
      font-size:15px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(51,51,51,1);
line-height:21px;
margin: 15px 0px;
    }
    .risk-state{
      height: 20px;
      width: auto;
      margin: 15px auto;
    }
    .item-img img{
      height: 90px;
      width: auto;
      margin: 0 auto;
      margin-bottom: 30px;
    }
    .flex-c{
       display: flex !important;
      justify-content:center;
      align-items: center;
     }
     .mar-15{
       margin: 15px 0px;
     }
     .mar-30{
        margin-top: 30px;
      }
  }
  </style>
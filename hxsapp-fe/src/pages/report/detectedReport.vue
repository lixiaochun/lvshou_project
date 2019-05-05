<template>
  <div class="geneReport">
    <div v-show="isPreLoading">
      <div class="banner">
        <img :src="headimg2">
      </div>

      <div class="myInfo">

        <div class="flex-c  head-table" style="justify-content: center;">
          <span></span>
          <h4>我的信息</h4>
          <span></span>
        </div>

        <div class="lineRowBox" v-if="getGeneReportByIdData">
          <div class="threeLine">
            <p>
              <span class="name">
                姓名
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.nick}}
              </span>
            </p>
            <p>
              <span class="name">
                年龄
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.age}}
              </span>
            </p>
          </div>
          <div class="threeLine">
            <p>
              <span class="name">
                性别
              </span>
              ：
              <span class="value" v-if="getGeneReportByIdData.sex =='1'">
                男
              </span>
              <span class="value" v-if="getGeneReportByIdData.sex =='0'">
                女
              </span>
              <span class="value" v-if="getGeneReportByIdData.sex =='2'">
                未提供
              </span>
            </p>
            <p>
              <span class="name">
                BMI值
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.bmi}}
              </span>
            </p>
          </div>
          <!-- <div class="oneLine">
            <p>
              <span class="name">
                BMI值
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.bmi}}
              </span>
            </p>
          </div> -->

          <div class="oneLine">
            <p>
              <span class="name">
                样本采集日期
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.collect_date}}
              </span>
            </p>
          </div>

          <div class="oneLine">
            <p>
              <span class="name">
                样本接收日期
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.receive_date}}
              </span>
            </p>
          </div>

          <div class="oneLine">
            <p>
              <span class="name">
                样本报告日期
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.create_time}}
              </span>
            </p>
          </div>

          <div class="oneLine">
            <p>
              <span class="name">
                样本检测编号
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.check_num}}
              </span>
            </p>
          </div>

        </div>
        <!--
          gnb3 
          0 未检测
          1 低风险
          2 中风险
          3 高风险
          4 无法检测
          // type=fto/threeplusone
        -->

        <div class="tableBox"  style="min-height:130px;"  v-if=" getGeneReportByIdData ">





          <div class="flex-c title head-table" >
            <span></span>
            <h4>基因检测结果</h4>
            <span></span>
          </div>

          <div class="table" v-if="disList.length>0">
            <div class="table-tr">
              <div class="table-td" style="width:60%;">检测项目</div>
              <div class="table-td">风险</div>
            </div>
            <div class="table-tr" v-for="(item,index) in disList">

              <div class="table-td">{{item.Title}}</div>
              <div class="table-td">
                <div class="flex-c" @click="toItemReport(index)">
                  <img :src="cellImg[item.type]" class="icon-img">
                  <img src="../../assets//lvshou/img/right_point.png" class="arrows-img">
                </div>
              </div>


            </div>

          </div>


          <div class="table table-b" v-if="disList.length>0">
            <div class="table-tr">
              <div class="table-td">
                <router-link class="flex-c" to="/explainReport">
                  {{title2}}
                  <img src="../../assets//lvshou/img/right_point.png" class="arrows-img">
                </router-link>
              </div>
            </div>

          </div>




        </div>

        <div class="lineBorder"></div>

        <div class="gene_box">
          <div class="gene_box_title flex-c">
            <router-link to="/stateReport" class="flex-c">
              <span class="flex-item">承诺与声明</span>
              <img src="../../assets//lvshou/img/right_point.png" class="arrows-img">
            </router-link>
          </div>

        </div>

      </div>
    </div>


    <preLoading v-if="!isPreLoading"></preLoading>

  </div>
</template>
<script>
  import commonJs from '@/util/common.js'
  import {
    Toast
  } from 'mint-ui'
  import axios from 'axios'

  // 初始化loadding的组件
  import preLoading from "@/components/preLoading"
  export default {
    name: 'detectedReport',
    data() {
      return {
        // isNodata
        cellImg: [
          require("../../assets/img/report/5.png"),
          require("../../assets/img/report/5.png"),
          require("../../assets/img/report/4.png"),
          require("../../assets/img/report/3.png"),
          require("../../assets/img/report/2.png"),
          require("../../assets/img/report/1.png"),

        ],
        headImg: [
          require("../../assets/img/report/head.png"),
          require("../../assets/img/report/head1.png"),
        ],
        title2:"查看风险等级说明",
        num1:1,
        headimg2: require("../../assets/img/report/head1.png"),
        isPreLoading: false,
        isShowCheckResult: false,
        allRisk: "",
        getGeneReportByIdData: null,

        mockGeneFto: {
          "1": {
            "text": "高风险",
            "type": "A",
            // "riskDisc":"高脂饮食容易导致肥胖，同时脂质不易分解"
          },
          "0": {
            "text": "低风险",
            "type": "T",
            // "riskDisc":"单一的高脂饮食不易导致肥胖，脂质容易分解代谢"
          }
        },
        disList: [],
        disList2: [],
        mockGeneApoe: {
          "3": {
            "text": "高风险",
            "type": "CC",
            "riskDisc": "高脂饮食容易导致肥胖，同时脂质不易分解"
          },
          "2": {
            "text": "中风险",
            "type": "CT",
            "riskDisc": "高脂饮食容易导致肥胖，同时脂质不太易分解"
          },
          "1": {
            "text": "低风险",
            "type": "TT",
            "riskDisc": "单一的高脂饮食不易导致肥胖，脂质容易分解代谢"
          }
        },
        mockGeneGnb3: {
          "3": {
            "text": "高风险",
            "type": "TT",
            "riskDisc": "G蛋白活性增强，脂肪容易形成，容易导致肥胖" // 且女性产后容易增重
          },
          "2": {
            "text": "中风险",
            "type": "CT",
            "riskDisc": "G蛋白活性加强，脂肪比较容易形成，可导致肥胖" // 且女性产后较易增重
          },
          "1": {
            "text": "低风险",
            "type": "CC",
            "riskDisc": "G蛋白活性一般，脂肪不易形成" // 且女性产后不易增重
          }
        },
        mockGeneUcp2: {
          "3": {
            "text": "高风险",
            "type": "TT",
            "riskDisc": "热量不容易被代谢掉，新陈代谢能力差，容易导致肥胖"
          },
          "2": {
            "text": "中风险",
            "type": "CT",
            "riskDisc": "热量不太容易被代谢掉，新陈代谢能力较差，可导致肥胖"
          },
          "1": {
            "text": "低风险",
            "type": "CC",
            "riskDisc": "热量容易被代谢掉，新陈代谢能力强，不易因此导致肥胖"
          }
        }
      }
    },
    mounted() {
      document.title = "基因检测报告";
      this.getReportData();
    },
    components: {
      preLoading
    },
    computed: {
      mockGeneGnb3RiskDisc() {
        let num = this.getGeneReportByIdData.gnb3,
          str = ''

        // 判断性别情况
        if (this.getGeneReportByIdData.sex == '0') {
          // 判断type类型
          if (this.mockGeneGnb3[num].type == 'TT') {
            str = '，且女性产后容易增重'
          } else if (this.mockGeneGnb3[num].type == 'CT') {
            str = '，且女性产后较易增重'
          } else if (this.mockGeneGnb3[num].type == 'CC') {
            str = '，且女性产后不易增重'
          }
        }

        return str
      }
    },
    methods: {
      openView() {
        // type=fto/threeplusone
        if (this.$route.query.type && this.$route.query.type == "fto") {
          var __urlFto = "https://app.hxsapp.com/hxsweb/geneDetail?id=" + this.$route.query.id + "&type=" + this.$route
            .query.type;
          if (process.env.NODE_ENV !== 'production') {
            window.location.href = __urlFto;
          } else {
            setTimeout(() => {
              window.location.href = 'https://hxsapp_new_webview#' + __urlFto;
            }, 200);
          }

        } else if (this.$route.query.type && this.$route.query.type == "threeplusone") {
          var __urlThreePlusOne = "https://app.hxsapp.com/hxsweb/geneReportDetail?id=" + this.$route.query.id +
            "&type=" + this.$route.query.type;

          if (process.env.NODE_ENV !== 'production') {
            window.location.href = __urlThreePlusOne;
          } else {
            setTimeout(() => {
              window.location.href = 'https://hxsapp_new_webview#' + __urlThreePlusOne;
            }, 200);
          }
        }
      },
      gene_box_titleEvnet() {
        // debugger
        $('.gene_box_title').on('click', function () {
          if ($(this).find('i').hasClass('open')) {
            $(this).find('i').removeClass('open');
            $(this).parent().find('.slide_box').slideUp(500);
          } else {
            $(this).find('i').addClass('open');
            $(this).parent().find('.slide_box').slideDown(500);
          }

        });
      },
      toItemReport(index) {

       var that=this;
       console.log(this.disList,this.disList2);
        var list1 = JSON.stringify(this.disList[index]);
        var list2 = JSON.stringify(this.disList2[index]);
        for(var i=0;i<that.disList2.length;i++){
            if( (that.disList2[i].summary.description).indexOf(that.disList[index].Title) !=-1){
           
              list2 = JSON.stringify(this.disList2[i]);

              sessionStorage.setItem("itemreporcontent", list2);
              break;
            }
        }
        sessionStorage.setItem("itemreportitle", list1);
        
        sessionStorage.setItem("itemreporcontent", list2);
        var tag = that.num1;
        sessionStorage.setItem("tag", tag);
        this.$router.push({
          path: '/itemReport',
          query: {
            tag: tag
          }
        })
      },
      getReportData() {
        let sessToken = commonJs.getUrlParam('sess_token');
        let utime = commonJs.getUrlParam('utime');
        let sign = commonJs.getUrlParam('sign');
        let check_num = commonJs.getUrlParam('check_num');
        let tag = commonJs.getUrlParam('product_type');

        var that = this;
        let json = {
          utime: utime,
          check_num: check_num,
          sign: sign,
          sess_token: sessToken
        };
        axios.get("https://api.hxsapp.com/slim/Gene/getYMRReportByCheckNum", {
          params: json
        }).then((res) => {
          // this.getGeneReportByIdData = res.data.data;
           

          if (res.data.data.report.item!=undefined) {
         
            let num1=parseInt(res.data.data.report.product_type);
           that.num1=num1;
            if (num1 == 2) {
              this.headimg2 = this.headImg[1];
              this.title2="查看能力等级说明";
              sessionStorage.setItem("tag", 2);
            } else {
              this.headimg2 = this.headImg[0];
              sessionStorage.setItem("tag", 1);
            
            }

            var object2 = (JSON.parse(res.data.data.report.data)).data.dis;
            //对象转数组
            var arr = Object.getOwnPropertyNames(object2);
            var arr2 = Object.keys(object2);
            var valArr = arr.map(function (i) {
              return object2[i]
            });
            var valArr2 = arr2.map(function (i) {
              return object2[i]
            });
            //或者2,4和3,5各自合并成一条语句
            var valArr22 = Object.keys(object2).map(function (i) {
              return object2[i]
            });
            that.disList = valArr22;
            var s_object2 = (JSON.parse(res.data.data.report.data)).data.description;

            //对象转数组
            var s_arr = Object.getOwnPropertyNames(s_object2);
            var s_arr2 = Object.keys(s_object2);
            var s_valArr = s_arr.map(function (i) {
              return s_object2[i]
            });
            var s_valArr2 = s_arr2.map(function (i) {
              return s_object2[i]
            });
            //或者2,4和3,5各自合并成一条语句
            var s_valArr22 = Object.keys(s_object2).map(function (i) {
              return s_object2[i]
            });
            that.disList2 = s_valArr22;


          }
          that.getGeneReportByIdData = res.data.data.userinfo;

          // document.title = res.data.data.userinfo.product_name; 
          setTimeout(() => {
            this.isPreLoading = true;
          }, 500)

        })

      },
      getGeneReportById() {
        let sessToken = commonJs.getUrlParam('sess_token');
        let json = {
          id: this.$route.query.id,
          sess_token: sessToken
        };
        // debugger

        axios.get("https://api.hxsapp.com/slim/gene/getGeneReportById", {
          params: json
        }).then((res) => {
          console.log(res)

          setTimeout(() => {
            this.isPreLoading = true;
          }, 300)

          if (res.data.code == 200) {

            if (!res.data.data) {
              Toast(res.data.msg)

              return
            }
            this.getGeneReportByIdData = res.data.data;
            // this.getGeneReportByIdData.gnb3 = 2 // 本地测试
            // this.isShowCheckResult = true;

            // "check_result": "0",//检测结果：检测结果：0-正常 TT，1-不正常 AA
            // var url;
            if (res.data.data.check_result == 0) {
              // url = this.url.success + '?sess_token=' + sessToken;
              // this.checkResultYes = true;
              console.log("检测正常")
            } else if (res.data.data.check_result == 1) {
              // this.checkResultNo = true;
              console.log("检测不正常")
              // url = this.url.error + '?sess_token=' + sessToken;
            } else if (res.data.data.check_result == 2) {
              console.log("未检测")
            } else if (res.data.data.check_result == -1) {
              console.log("无法检测")

            }

            // 3.综合风险等级:

            // 根据  好享瘦后台>基因检测室>基因检测报告>“3+1基因检测结果”字段进行判断

            //       一项及一项以上高风险，则综合风险为高风险；

            //       一项及以上为中风险，且无高风险，则综合风险为中等风险；

            //       三项全为低风险，则综合风险为低风险；

            if (this.$route.query.type && this.$route.query.type == "threeplusone") {
              if (res.data.data.gnb3 == 3 || res.data.data.ucp2 == 3 || res.data.data.apoe == 3) {
                this.allRisk = 3
              } else if ((res.data.data.gnb3 == 2 || res.data.data.ucp2 == 2 || res.data.data.apoe == 2) && (res
                  .data.data.gnb3 != 3 && res.data.data.ucp2 != 3 && res.data.data.apoe != 3)) {
                this.allRisk = 2
              } else if (res.data.data.gnb3 == 1 && res.data.data.ucp2 == 1 && res.data.data.apoe == 1) {
                this.allRisk = 1
              }
            }

            this.$nextTick(() => {
              // debugger
              this.gene_box_titleEvnet()
            })


          } else {
            // debugger
            setTimeout(() => {
              this.isPreLoading = true;
            }, 500)
            Toast("加载数据异常，请稍后再试！")
          }
        }).catch((error) => {
          Toast("加载数据异常，请稍后再试(catch)！")
          console.log(error)
          setTimeout(() => {
            this.isPreLoading = true;
          }, 500)
        })
      },

    },
    beforeDestroy() {
      document.title = commonJs.config.webTitle;
      $('.gene_box_title').off('click')
    }
  }
</script>
<style lang="less" scoped>
  .geneReport {
    width: 100%;
    margin: 0 auto;
    min-width: 320px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
    }

    .flex-c {
      display: flex;
      align-items: center;
      width: 100%;
      color: rgba(51, 51, 51, 1);
    }

    .flex-item {
      flex: 1;
      color: rgba(102, 102, 102, 1);
    }

    .head-table {
      font-size: 17px;
      font-family: PingFangSC-Regular;
      color: rgba(51, 51, 51, 1);
      margin-top: 30px;
    }

    .table-b {
      position: relative;
      margin-top: -10px !important;
      margin-bottom: 15px !important;


    }

    .table-b .table-td {
      border-top: 0px !important;
    }

    .head-table span {
      width: 12px;
      height: 1px;
      display: inline-block;
      background-color: rgba(51, 51, 51, 1);
      border-radius: 1px;
      margin: 0px 5px;
    }

    .head-table h4 {
      font-size: 17px;
      font-family: PingFangSC-Regular;
      color: rgba(51, 51, 51, 1);
      font-weight: 500;
    }

    .arrows-img {
      height: 13px;
      width: auto;
      padding-left: 8px;
      padding-right: 15px;
    }

    .icon-img {
      height: 20px;
      width: auto;
    }

    .banner {
      width: 100%;
    }

    .tableBox {
      margin-top: 14px;
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;

      .title {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: #333;
        margin-bottom: 25px;
      }

      .flex-c {
        display: flex !important;
        justify-content: center;
        align-items: center;
      }

      .table {
        margin: 0 auto 10px;
        padding: 0;
        font-size: 14px;
        display: table;
        width: 100%;
        border-collapse: collapse;
        /* background: #f5f5f8; */
        background: white;

        .table-tr {
          display: table-row;
          height: 45px;

          .table-th {
            display: table-cell;
            font-weight: bold;
            border: 1px solid rgba(129, 141, 207, 0.2);
            text-align: center;
            vertical-align: middle;
          }

          .table-td {
            display: table-cell;
            border: 1px solid rgba(129, 141, 207, 0.2);
            text-align: center;
            vertical-align: middle;
            padding: 10px 8px;
          }
        }
      }

      .allReportBtn {
        margin: 42px auto 30px;
        width: 100%;
        text-align: center;

        span {
          display: inline-block;
          width: 250px;
          height: 45px;
          text-align: center;
          color: #fff;
          font-size: 17px;
          line-height: 45px;
          background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
          border-radius: 62px;
        }
      }
    }

    .myInfo {
      margin-top: 14px;
      width: 100%;

      .title {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: #333;
      }

      .lineRowBox {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;


        .threeLine {
          width: 100%;
          height: 45px;
          overflow: hidden;

          p {
            float: left;
            height: 45px;
            line-height: 45px;
            font-size: 13px;

            &:nth-child(1) {
              width: 40%;
              text-align: left;
            }

            &:nth-child(2) {
              width: 40%;
              text-align: left;
            }

            &:nth-child(3) {
              width: 40%;
              text-align: right;
            }

            .name {
              color: #666;
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 18px;
            }

            .value {
              color: #333;
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 18px;
            }
          }
        }

        .oneLine {
          width: 100%;
          height: 45px;
          overflow: hidden;

          p {
            float: left;
            height: 45px;
            line-height: 45px;
            font-size: 13px;
            width: 100%;
          }

          .name {
            color: #666;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
          }

          .value {
            color: #333;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 18px;
          }

        }

      }
    }

    .lineBorder {
      width: 100%;
      height: 7px;
      background: #f5f5f8;
    }

    .gene_box {
      margin: 0 auto;
      width: 100%;

      // height: 50px;
      .gene_box_title {
        font-size: 15px;
        padding: 0px 14px;
        background: #fff;
        color: #333;
        line-height: 50px;
        position: relative;
        cursor: pointer;
        box-sizing: border-box;

        &:after {
          content: "";
          height: 1px;
          background: rgba(129, 141, 207, .2);
          // background:  red;
          display: block;
          position: absolute;
          bottom: 0;
          left: 14px;
          width: 100%;
        }

        i {
          width: 15px;
          height: 9px;
          background: url(./../../assets/img/return01-blue@2x.png) no-repeat;
          position: absolute;
          right: 5%;
          top: 50%;
          margin-top: -5px;
          -webkit-background-size: 100% auto;
          background-size: 100% auto;
        }

        i.open {
          -webkit-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -o-transform: rotate(180deg);
          transform: rotate(180deg);
        }
      }

      .slide_box {
        display: none;
        width: 100%;
        box-sizing: border-box;
        padding: 12px 15px;

        p {
          color: #666;
          font-size: 13px;
          text-indent: 2em;
          line-height: 23px;
        }
      }
    }

  }
</style>

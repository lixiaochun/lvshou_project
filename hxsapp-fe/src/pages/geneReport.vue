<template>
  <div class="geneReport">
    <div v-show="isPreLoading">
      <div class="banner">
        <img src="../assets/img/geneReport/jiyin_bg.png">
      </div>
      
      <div class="myInfo">
        <span class="title">
          - 我的信息 -
        </span>
        <div class="lineRowBox" v-if="getGeneReportByIdData">
          <div class="oneLine">
            <p>
              <span class="name">
                姓名
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.username}}
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
                年龄
              </span>
              ：
              <span class="value">
              {{getGeneReportByIdData.age}}
              </span>
            </p>
          </div>
          <div class="oneLine">
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

          <div class="oneLine">
            <p>
              <span class="name">
                样本采集日期
              </span>
              ：
              <span class="value">
                {{getGeneReportByIdData.collect_time}}
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
                {{getGeneReportByIdData.receive_time}}
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
                {{getGeneReportByIdData.report_time}}
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
        
        <div class="tableBox" v-if=" this.$route.query.type && getGeneReportByIdData ">
          
          <div v-if=" ( this.$route.query.type == 'fto' && getGeneReportByIdData.check_result != -1 && getGeneReportByIdData.check_result != 2 ) 
          || ( this.$route.query.type == 'threeplusone' && getGeneReportByIdData.gnb3 != 4 && getGeneReportByIdData.ucp2 != 4 && getGeneReportByIdData.apoe != 4  && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.apoe != 0)  ">
            <span class="title" v-if="this.$route.query.type == 'threeplusone' && getGeneReportByIdData.gnb3 != 4 && getGeneReportByIdData.ucp2 != 4 && getGeneReportByIdData.apoe != 4 && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.apoe != 0 " >
              - 3+1基因检测结果 -
            </span>
            <span class="title" v-if="this.$route.query.type == 'fto' && getGeneReportByIdData.check_result != -1 ">
              - FTO基因检测结果 -
            </span>

            <div class="table" v-if="this.$route.query.type == 'fto' && getGeneReportByIdData && getGeneReportByIdData.check_result != -1 && getGeneReportByIdData.check_result != 2 ">  
              <div class="table-tr">  
                <div class="table-td" style="width:120px;">检测基因名称</div>  
                <div class="table-td">FTO</div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">检测位点</div>  
                <div class="table-td">
                  FTO-rs9939609
                </div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">您的基因型别</div>  
                 
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 0">
                  T
                </div>  
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 1">
                  A
                </div> 

              </div>
              <div class="table-tr">  
                <div class="table-td">风险等级</div>  
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 0">
                  低
                </div>  
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 1">
                   高
                </div>   
              </div>
              <div class="table-tr">  
                <div class="table-td">与正常T基因相比</div>  
                
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 0">
                  0-30%
                </div>  
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 1">
                  高70%
                </div>  
              </div>

              <div class="table-tr">  
                <div class="table-td">肥胖风险分析</div>  
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 0" style="text-align:left;">
                  1.饱腹感较好———容易吃饱，减少过量热量的摄入。<br />
                  2.新陈代谢没有受到抑制———体育锻炼消耗能量效果较好。
                </div>  
                <div class="table-td" v-if="getGeneReportByIdData.check_result == 1" style="text-align:left;">
                  1.饱腹感较差———不易吃饱，喜好高脂高热量的食物。<br />
                  2.能量消耗受到抑制———不容易消耗掉。<br />
                  这样在吸收的能量升高，消耗的能量降低的情况下，人体容易积累能量从而导致肥胖且难以降下体重。
                </div>  
              </div>  
            </div>
            

            <span class="title" v-if="this.$route.query.type == 'fto' " style="margin-bottom:5px;">
              - FTO基因介绍 -
            </span>
            <div v-if="this.$route.query.type == 'fto' ">
              <img src="./../assets/img/gene_detail/gene_detail_02.jpg" />
              <img src="./../assets/img/gene_detail/gene_detail_03.jpg" />
            </div>
            
            <div class="table" v-if="this.$route.query.type == 'threeplusone' && getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 "> 
              <div class="table-tr">  
                <div class="table-td" style="width:120px;">检测项目一</div>  
                <div class="table-td">脂肪型肥胖基因</div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">检测基因名称</div>  
                <div class="table-td">
                  GNB3
                </div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">您的基因型别</div>  
                <div class="table-td">
                  {{ mockGeneGnb3[getGeneReportByIdData.gnb3].type }}
                </div>  
              </div>
              <div class="table-tr">  
                <div class="table-td">风险等级</div>  
                <div class="table-td">
                  {{ mockGeneGnb3[getGeneReportByIdData.gnb3].text }}
                </div>  
              </div>
              <div class="table-tr">  
                <div class="table-td">风险分析</div>  
                <div class="table-td">
                  <!-- {{ mockGeneGnb3[getGeneReportByIdData.gnb3].riskDisc }} -->
                  {{ mockGeneGnb3[getGeneReportByIdData.gnb3].riskDisc }}{{ mockGeneGnb3RiskDisc }}
                </div>  
              </div>  
            </div>

            <div class="table" v-if="this.$route.query.type == 'threeplusone' && getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 ">   
              <div class="table-tr">  
                <div class="table-td" style="width:120px;">检测项目二</div>  
                <div class="table-td">代谢型肥胖基因</div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">检测基因名称</div>  
                <div class="table-td">
                  UCP2
                </div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">您的基因型别</div>  
                <div class="table-td">
                  {{ mockGeneUcp2[getGeneReportByIdData.ucp2].type }}
                </div>  
              </div>
              <div class="table-tr">  
                <div class="table-td">风险等级</div>  
                <div class="table-td">
                  {{ mockGeneUcp2[getGeneReportByIdData.ucp2].text }}
                </div>  
              </div>
              <div class="table-tr">  
                <div class="table-td">风险分析</div>  
                <div class="table-td">
                  {{ mockGeneUcp2[getGeneReportByIdData.ucp2].riskDisc }}
                </div>  
              </div>  
            </div>

            <div class="table" v-if="this.$route.query.type == 'threeplusone' && getGeneReportByIdData && getGeneReportByIdData.apoe != 0 ">  
              <div class="table-tr">  
                <div class="table-td" style="width:120px;">检测项目三</div>  
                <div class="table-td">内分泌型肥胖基因</div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">检测基因名称</div>  
                <div class="table-td">
                  APOE
                </div>  
              </div>

              <div class="table-tr">  
                <div class="table-td">您的基因型别</div>  
                <div class="table-td">
                  {{ mockGeneApoe[getGeneReportByIdData.apoe].type }}
                </div>  
              </div>
              <div class="table-tr">  
                <div class="table-td">风险等级</div>  
                <div class="table-td">
                  {{ mockGeneApoe[getGeneReportByIdData.apoe].text }}
                </div>  
              </div>
              <div class="table-tr">  
                <div class="table-td">风险分析</div>  
                <div class="table-td">
                  {{ mockGeneApoe[getGeneReportByIdData.apoe].riskDisc }}
                </div>  
              </div>  
            </div>

            <div class="table" v-if="this.$route.query.type == 'threeplusone' && allRisk != '' ">  
              <div class="table-tr">  
                <div class="table-td" style="width:120px;">综合风险等级</div>  
                <div class="table-td">
                  {{ allRisk == 3 ? "高风险" 
                                  : ( allRisk == "2" ? "中风险" 
                                  : (allRisk == "1" ? "低风险" : "") ) }}
                </div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">建议饮食</div>  
                <div class="table-td">
                  少油、少盐、高钙、{{ allRisk == 1 ? "均衡饮食" 
                                  : ( (allRisk == 2 || allRisk == 3) ? "控制饮食":"") }}

                </div>  
              </div>  
              <div class="table-tr">  
                <div class="table-td">建议运动</div>  
                <div class="table-td">游泳等有氧运动</div>  
              </div>

            </div>

            <div class="allReportBtn" v-if=" ( this.$route.query.type == 'fto' && getGeneReportByIdData.check_result != -1 ) 
            || ( this.$route.query.type == 'threeplusone' && getGeneReportByIdData.gnb3 != 4 && getGeneReportByIdData.ucp2 != 4 && getGeneReportByIdData.apoe != 4 ) ">
              <span @click="openView()">
                查看全部报告
              </span>
            </div>
            
          </div>
          <div v-else>
            <span class="title">
              由于您没有送样，所以无法出具报告
            </span>
          </div>

        </div>
        
        <div class="lineBorder"></div>

        <div class="gene_box">
          <div class="gene_box_title">检测须知
            <i></i>
          </div>
          <div class="slide_box">
            <p>
              本样本的检测结果是基于您提供的样本进行检测得出的数据，如您的样本不合格，有可能导致实验结果出现偏差。请悉知！
            </p>
            <p>
              1、取样过程中接触其他物质，如取样刷头沾上其他人的细胞，这将使得您的结果不是本人的。
            </p>
            <p>
              2、如果您没有按照取样方法取样，使得样本量不够，将会导致检测失败，出现假阳性或假阴性。
            </p>
          </div>
        </div>

        <div class="gene_box">
          <div class="gene_box_title">郑重承诺
            <i></i>
          </div>
          <div class="slide_box">
            <p>
              1.未经受检者同意，本中心决不将本报告用于任何商业用途和其它用途。
            </p>
            <p>
              2.受检者当前的项目检测报告中所记录的个人信息是真实的。
            </p>
          </div>
        </div>

        <div class="gene_box">
          <div class="gene_box_title">特别说明
            <i></i>
          </div>
          <div class="slide_box">
            <p>1.本检测不能用做一个决定性的诊断。肥胖基因检测不是一个决定性的诊断检测，而是一个风险评估，高风险并不意味着一定会肥胖，低风险也不意味着一定没有肥胖的风险。</p>

            <p>2.本报告结果仅表示当前套餐内的项目检测。本中心确认本报告为所提供测试者样本的正确检测结果。</p>

            <p>3.本中心只对检测结果的当前正确性负责，但受检者依据前述检测结果所做出的民事行为，由受检者自行承担一切法律后果。</p>

            <p>4.本报告的最终解释权归绿瘦基因检测中心所有。</p>
          </div>
        </div>
      </div>
    </div>


    <preLoading v-if="!isPreLoading"></preLoading>

  </div>
</template>
<script>
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui'
import axios from 'axios'

// 初始化loadding的组件
import preLoading from "@/components/preLoading"
// type=fto/threeplusone

// var mockGeneIndex = {
//   "0": "未检测",
//   "1": "低风险",
//   "2": "中风险",
//   "3": "高风险",
//   "4": "无法检测"
// }


export default {
  name:'geneReport',
  data(){
    return {
      // isNodata

      isPreLoading: false,
      isShowCheckResult:false,
      allRisk:"",
      getGeneReportByIdData:null,

      mockGeneFto : {
        "1": {
          "text" :"高风险",
          "type":"A",
          // "riskDisc":"高脂饮食容易导致肥胖，同时脂质不易分解"
        },
        "0": {
          "text" :"低风险",
          "type":"T",
          // "riskDisc":"单一的高脂饮食不易导致肥胖，脂质容易分解代谢"
        }
      },

      mockGeneApoe : {
        "3": {
          "text" :"高风险",
          "type":"CC",
          "riskDisc":"高脂饮食容易导致肥胖，同时脂质不易分解"
        },
        "2": {
          "text" :"中风险",
          "type":"CT",
          "riskDisc":"高脂饮食容易导致肥胖，同时脂质不太易分解"
        },
        "1": {
          "text" :"低风险",
          "type":"TT",
          "riskDisc":"单一的高脂饮食不易导致肥胖，脂质容易分解代谢"
        }
      },
      mockGeneGnb3 : {
        "3": {
          "text" :"高风险",
          "type":"TT",
          "riskDisc":"G蛋白活性增强，脂肪容易形成，容易导致肥胖" // 且女性产后容易增重
        },
        "2": {
          "text" :"中风险",
          "type":"CT",
          "riskDisc":"G蛋白活性加强，脂肪比较容易形成，可导致肥胖" // 且女性产后较易增重
        },
        "1": {
          "text" :"低风险",
          "type":"CC",
          "riskDisc":"G蛋白活性一般，脂肪不易形成" // 且女性产后不易增重
        }
      },
      mockGeneUcp2 : {
        "3": {
          "text" :"高风险",
          "type":"TT",
          "riskDisc":"热量不容易被代谢掉，新陈代谢能力差，容易导致肥胖"
        },
        "2": {
          "text" :"中风险",
          "type":"CT",
          "riskDisc":"热量不太容易被代谢掉，新陈代谢能力较差，可导致肥胖"
        },
        "1": {
          "text" :"低风险",
          "type":"CC",
          "riskDisc":"热量容易被代谢掉，新陈代谢能力强，不易因此导致肥胖"
        }
      }         
    }
  },
  mounted(){
    document.title = "基因检测报告"; 
    this.getGeneReportById();
  },
  components: {
		preLoading
	},
  computed: {
    mockGeneGnb3RiskDisc() {
      let num = this.getGeneReportByIdData.gnb3,
          str =''

      // 判断性别情况
      if(this.getGeneReportByIdData.sex == '0') {
        // 判断type类型
        if(this.mockGeneGnb3[num].type == 'TT') {
          str = '，且女性产后容易增重'
        }else if(this.mockGeneGnb3[num].type == 'CT') {
          str = '，且女性产后较易增重'
        }else if(this.mockGeneGnb3[num].type == 'CC') {
          str = '，且女性产后不易增重'
        }
      }

      return str
    }
  },
  methods: {
    openView(){
      // type=fto/threeplusone
      if( this.$route.query.type  && this.$route.query.type == "fto" ){
        var __urlFto = "https://app.hxsapp.com/hxsweb/geneDetail?id="+ this.$route.query.id+"&type="+ this.$route.query.type;
        if( process.env.NODE_ENV !== 'production' ){
          window.location.href = __urlFto;
        }else{
          setTimeout(()=>{
            window.location.href = 'https://hxsapp_new_webview#'+__urlFto;
          },200);
        }

      }else if( this.$route.query.type  && this.$route.query.type == "threeplusone" ){
        var __urlThreePlusOne = "https://app.hxsapp.com/hxsweb/geneReportDetail?id="+ this.$route.query.id+"&type="+ this.$route.query.type;
        
        if( process.env.NODE_ENV !== 'production' ){
          window.location.href = __urlThreePlusOne;
        }else{
          setTimeout(()=>{
            window.location.href = 'https://hxsapp_new_webview#'+__urlThreePlusOne;
          },200);
        }
      }
    },
		gene_box_titleEvnet() {
        // debugger
			$('.gene_box_title').on('click', function() {
				if ($(this).find('i').hasClass('open')) {
					$(this).find('i').removeClass('open');
					$(this).parent().find('.slide_box').slideUp(500);
				} else {
					$(this).find('i').addClass('open');
					$(this).parent().find('.slide_box').slideDown(500);
				}

			});
		},
    getGeneReportById() {
			let sessToken = commonJs.getUrlParam('sess_token');
			let json = {
				id: this.$route.query.id,
				sess_token: sessToken
			};
			// debugger

			axios.get("https://api.hxsapp.com/slim/gene/getGeneReportById", { params: json }).then((res) => {
				console.log(res)
        
        setTimeout(()=>{
          this.isPreLoading = true;
        },300)
				
				if (res.data.code == 200) {
            
          if( ! res.data.data){
            Toast( res.data.msg )

            return 
          }  
          this.getGeneReportByIdData = res.data.data;
          // this.getGeneReportByIdData.gnb3 = 2 // 本地测试
					// this.isShowCheckResult = true;

					// "check_result": "0",//检测结果：检测结果：0-正常 TT，1-不正常 AA
					// var url;
					if (res.data.data.check_result == 0 ) {
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

          if(this.$route.query.type  && this.$route.query.type == "threeplusone"){
            if( res.data.data.gnb3 == 3 || res.data.data.ucp2 == 3 || res.data.data.apoe == 3 ){
              this.allRisk = 3
            } else if( (res.data.data.gnb3 == 2 || res.data.data.ucp2 == 2 || res.data.data.apoe == 2) && (res.data.data.gnb3 != 3 && res.data.data.ucp2 != 3 && res.data.data.apoe != 3)  ){
              this.allRisk = 2
            } else if( res.data.data.gnb3 == 1 && res.data.data.ucp2 == 1 && res.data.data.apoe == 1 ){
              this.allRisk = 1
            }
          }

					this.$nextTick(() => {
            // debugger
						this.gene_box_titleEvnet()
					})


				} else {
          // debugger
          setTimeout(()=>{
            this.isPreLoading = true;
          },500)
					Toast("加载数据异常，请稍后再试！")
				}
			}).catch((error) => {
				Toast("加载数据异常，请稍后再试(catch)！")
        console.log(error)
        setTimeout( ()=>{
				  this.isPreLoading = true;
        },500)
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
  .geneReport{
    width:100%;
    margin: 0 auto;
    min-width: 320px;
    overflow: hidden;
    img{
      width: 100%;
      height: auto;
    }

    .banner{
      width: 100%;
    }

    .tableBox{
      margin-top: 14px;
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      .title{
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: #333;
        margin-bottom: 25px;
      }

      .table {
        margin: 0 auto 10px; 
        padding: 0;
        font-size: 14px;
        display: table; width: 100%; border-collapse: collapse;
        background: #f5f5f8;
        .table-tr {
          display: table-row; height: 45px;
          .table-th {display: table-cell;font-weight: bold;border: 1px solid rgba(129,141,207,0.1);text-align: center;vertical-align: middle;}   
          .table-td {display: table-cell; border: 1px solid rgba(129,141,207,0.1); text-align: center;vertical-align: middle;padding:10px 8px;}  
        }   
      }

      .allReportBtn{
        margin: 42px auto 30px;
        width: 100%;
        text-align: center;
        span{
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

    .myInfo{
      margin-top: 14px;
      width: 100%;
      .title{
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: #333;
      }
      .lineRowBox{
        width: 100%;
        box-sizing: border-box;
        padding:0 20px;
        
        
        .threeLine{
          width: 100%;
          height: 45px;
          overflow: hidden;
          p{
            float: left;
            height: 45px;
            line-height: 45px;
            font-size: 13px;
            &:nth-child(1){
              width: 30%;
            }
            &:nth-child(2){
              width: 30%;
              text-align: center;
            }
            &:nth-child(3){
              width: 30%;
              text-align: right;
            }
            .name{
              color: #666;
            }
            .value{
              color: #333;
            }
          }
        }
        .oneLine{
          width: 100%;
          height: 45px;
          overflow: hidden;
          p{
            float: left;
            height: 45px;
            line-height: 45px;
            font-size: 13px;
            width: 100%;
          }

        } 
        
      }
    }

    .lineBorder{
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
        padding-left: 14px;
        background: #fff;
        color: #333;
        line-height: 50px;
        position: relative;
        cursor: pointer;
        
        &:after{
          content: "";
          height: 1px;
          background:  rgba(129,141,207,.2);
          // background:  red;
          display: block;
          position: absolute;
          bottom: 0;
          left:14px;
          width: 100%;
        }
        i {
          width: 15px;
          height: 9px;
          background: url(./../assets/img/return01-blue@2x.png) no-repeat;
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
      .slide_box{
        display: none;
        width:100%; 
        box-sizing: border-box;
        padding: 12px 15px;
        p{
          color: #666;
          font-size: 13px;
          text-indent: 2em;
          line-height:23px;
        }
      }
    }

  }
</style>


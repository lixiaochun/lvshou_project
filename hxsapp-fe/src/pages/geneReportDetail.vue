<template>
  <div class="geneReportDetail">
    <div v-show="isPreLoading">
      <div class="gene_box">
        <div class="gene_box_title">
          第一部分  基因检测结果
          <i class="open"></i>
        </div>
        <div class="slide_box image_box" style="display:block">
          <!--
            gnb3 
            0 未检测
            1 低风险
            2 中风险
            3 高风险
            4 无法检测
          -->
          <div class="tableBox" v-if="getGeneReportByIdData && allRisk != '' ">
            
            <div class="table" v-if=" getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0">  
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

            <div class="table" v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 ">   
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

            <div class="table" v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 ">
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

            <div class="table" v-if="allRisk != '' ">  
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
            <div v-else>
              <span class="title">
                由于您没有送样，所以无法出具报告
              </span>
            </div> 

          </div>

          <div class="showHideBox">
            
            <div class="showHideBtn" @click="showHideBoxFn(0)">
              收起
              <i class="open"></i>
            </div>
          </div>

        </div>
      </div>
      <div class="lineBorder"></div>
      
      <div class="gene_box">
        <div class="gene_box_title">第二部分  检测结果分析
          <i></i>
        </div>
        <div class="slide_box image_box twoBox">
          <div class="mainTitle">
            1 脂肪型肥胖基因——GNB3基因
          </div>
          <div class="infoBox">
            <p class="info" v-if="1">
              基因介绍：<br />
              位于12p13.31，编码G蛋白β3亚基。GNB3基因的突变可使G蛋白活性增强，通过转导细胞信号，促进脂肪细胞组织的分化形成、抑制脂肪分解代谢，导致脂肪细胞过度增生及细胞内脂质堆积，最终会引起肥胖的产生。
            </p>
            <p class="info">
              您的该项检测结果图如下：
            </p>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 3 ">
              <img src="../assets/img/geneReport/quxian/hongping.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>

            <div v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 3 " >
              <img  src="../assets/img/geneReport/quxian/lvqi.png">
              <b>
              T碱基荧光曲线
              </b>
            </div>
            <img v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 3 " style="width:60%;" src="../assets/img/geneReport/fengxian/3.png">
            

            <div v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 2 ">
              <img  src="../assets/img/geneReport/quxian/hongqi.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 2 ">
              <img  src="../assets/img/geneReport/quxian/lvqi.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 2 " style="width:60%;" src="../assets/img/geneReport/fengxian/2.png">
            

            <div v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 1 ">
              <img  src="../assets/img/geneReport/quxian/hongqi.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 1 ">
              <img  src="../assets/img/geneReport/quxian/lvping.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 1 " style="width:60%;" src="../assets/img/geneReport/fengxian/1.png">
            <br />

            <div class="tableBox">
              <div class="table" v-if=" getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0">  
                <div class="table-tr">  
                  <div class="table-td" style="width:120px;">基因名称</div>  
                  <div class="table-td">GNB3</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">检测位点</div>  
                  <div class="table-td">rs5443</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">
                    基因型别
                  </div>  
                  <div class="table-td">
                    {{ mockGeneGnb3[getGeneReportByIdData.gnb3].type }}
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">肥胖风险</div>  
                  <div class="table-td">
                    {{ mockGeneGnb3[getGeneReportByIdData.gnb3].text }}
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">对体重指数的影响</div>  
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 3 " >
                    BMI值正常的可能性低，相比一般人有较大的肥胖风险{{mockGeneGnb3RiskDisc}}
                  </div>
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 2 " >
                    BMI值正常的可能性一般，相比一般人有较大的肥胖风险{{mockGeneGnb3RiskDisc}}
                  </div>
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 1 " >
                    BMI值正常的可能性高，肥胖风险低{{mockGeneGnb3RiskDisc}}
                  </div>
                </div>
                
              </div> 
            </div>  

          </div>
          <div class="zhuText">
            注：报告中的肥胖风险分为三级：高、中、低，分别代表肥胖风险高，肥胖风险中等，肥胖风险低。
          </div>
          <div class="jkgljyBox">
            <div class="title">
              === 健康管理建议 ===
            </div>
            <p v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 3 ">
            您的脂肪型肥胖基因位点遗传风险属高风险：
            </p>
            <p v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 3 ">
            脂肪形成能力强，应限制碳水化合物的摄入量，拒绝高脂肪饮食。<br />
            另外，长期保持适量运动，如每日保证有氧运动（慢跑、骑车、跳操、游泳等）和抗阻力运动（哑铃、卷腹、俯卧撑、平板撑、机械锻炼等）。
            </p>

            <p v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 2 ">
              您的脂肪型肥胖基因位点遗传风险属中等风险：
            </p>
            <p v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 2 ">
              脂肪形成能力较强，应限制碳水化合物的摄入量，拒绝高脂肪饮食。<br />另外，长期保持适量运动，如每日保证有氧运动，如慢跑、骑车、跳操、游泳等。
            </p>

            <p v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 1 ">
              您的脂肪型肥胖基因位点遗传风险属低风险：
            </p>
            <p v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 != 0 && getGeneReportByIdData.gnb3 == 1 ">
              脂肪形成能力弱，碳水化合物的摄入不易形成脂肪，但也要拒绝高脂肪饮食。<br />另外，长期保持适量运动如有氧运动：慢跑、骑车、跳操、游泳等，可达到良好的体重管理效果。
            </p>

          </div>

          <br />
          <div class="mainTitle">
            2 代谢型肥胖基因——UCP2基因
          </div>
          <div class="infoBox">
            <p class="info">
              基因介绍：<br />
              位于11q13.4，编码线粒体的解耦联蛋白2。UCP2的主要功能是参与棕色脂肪组织的产热调节和能量代谢来维持机体的能量代谢平衡。通过氧化磷酸化过程与ATP合成过程的解耦联，使能量以热量形式散耗，影响机体能量代谢、脂肪燃烧分解。UCP2基因发生突变，可以导致基础代谢率低，容易积累脂肪，造成肥胖。
            </p>
            <p class="info">
              您的该项检测结果图如下：
            </p>
            
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 3 ">
              <img  src="../assets/img/geneReport/quxian/hongping.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 3 ">
              <img  src="../assets/img/geneReport/quxian/lvqi.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if=" getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 3 " style="width:60%;" src="../assets/img/geneReport/fengxian/3.png">

            
            
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 2 ">
              <img  src="../assets/img/geneReport/quxian/hongqi.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 2 ">
              <img  src="../assets/img/geneReport/quxian/lvqi.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 2 " style="width:60%;" src="../assets/img/geneReport/fengxian/2.png">
            

            <div v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 1 ">
              <img  src="../assets/img/geneReport/quxian/hongqi.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 1 ">
              <img  src="../assets/img/geneReport/quxian/lvping.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 1 " style="width:60%;" src="../assets/img/geneReport/fengxian/1.png">

            <br />
            <div class="tableBox">
              <div class="table" v-if=" getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0">  
                <div class="table-tr">  
                  <div class="table-td" style="width:120px;">基因名称</div>  
                  <div class="table-td">UCP2</div>  
                </div>  
                <div class="table-tr">
                  <div class="table-td">检测位点</div>  
                  <div class="table-td">rs660339</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">
                    基因型别
                  </div>  
                  <div class="table-td">
                    {{ mockGeneUcp2[getGeneReportByIdData.ucp2].type }}
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">肥胖风险</div>  
                  <div class="table-td">
                    {{ mockGeneUcp2[getGeneReportByIdData.ucp2].text }}
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">对体重指数的影响</div>  
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 3 " >
                    基础代谢能力受到抑制，身体吸收的能量不易被消耗，能量容易堆积导致肥胖。
                  </div>
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 2 " >
                    基础代谢能力受到抑制，身体吸收的能量不易被消耗，能量容易堆积导致肥胖。
                  </div>
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 1 " >
                    基础代谢能力没有受到抑制，身体吸收的能量容易被消耗，能量不易堆积导致肥胖。
                  </div>
                </div>

              </div> 
            </div>  

          </div>
          <div class="zhuText">
            注：报告中的肥胖风险分为三级：高、中、低，分别代表肥胖风险高，肥胖风险中等，肥胖风险低。
          </div>

          <div class="jkgljyBox">
            <div class="title">
              === 健康管理建议 ===
            </div>

            <p v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 3 ">
              您的代谢型肥胖基因位点遗传风险属高风险：
              </p>
              <p v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 3 ">
              代谢型肥胖基因主要是基础代谢率低，导致“脂肪燃烧”出现异常造成的肥胖。这种类型的肥胖，脂肪顽固性强，易堆积在臀部及大腿外侧皮下，不容易分解。<br />需要配合运动提高基础代谢率，才能获得良好的减肥效果，运动以有氧运动为主，最好是游泳。代谢型肥胖多为洋梨身材，上身瘦瘦的，下身却惊人的粗壮。
              </p>

              <p v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 2 ">
                您的代谢型肥胖基因位点遗传风险属中等风险：
              </p>
              <p v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 2 ">
                代谢型肥胖基因主要是基础代谢率降低，导致脂肪燃烧出现异常造成的肥胖。这种类型的肥胖，脂肪顽固性强，易堆积在臀部及大腿外侧皮下，不容易分解。<br />需要配合运动提高基础代谢率，才能获得良好的减肥效果，运动以有氧运动为主，最好是游泳。代谢型肥胖多为洋梨身材，上身瘦瘦的，下身却惊人的粗壮。
              </p>

              <p v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 1 ">
                您的代谢型肥胖基因位点遗传风险属低风险：
              </p>
              <p v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 != 0 && getGeneReportByIdData.ucp2 == 1 ">
                您的基础代谢率正常，脂肪容易分解。良好的新陈代谢使得您摄入的脂肪可以获得有效的代谢分解，因此如果您要减肥的话，需注意减少整体的热量摄入，避免能量过剩导致体重上升；<br />同时新陈代谢快，可以使运动的减肥效果显著，您可以选择长跑类的运动加速热量的消耗，但是每次的长跑需要超过30分钟，才能使身体的脂肪消耗起来。
              </p>

          </div>

          <br />
          <div class="mainTitle">
            3 内分泌型肥胖基因——APOE基因
          </div>
          <div class="infoBox">
            <p class="info">
              基因介绍：<br />
              位于19q13.31，编码载脂蛋白E。载脂蛋白E通过与脂蛋白、脂蛋白受体、APOE受体的结合，促进体内脂蛋白( 携带胆固醇、甘油三酯等)的循环运输、分解代谢。当APOE基因发生突变时，将影响ApoE与脂蛋白受体结合，导致富含胆固醇的脂蛋白清除作用发生障碍，血脂代谢从而发生紊乱；并且体内脂肪酸合成增多，最终导致肥胖。
            </p>
            <p class="info">
              您的该项检测结果图如下：
            </p>

            <div v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 3 ">
              <!-- <img  src="../assets/img/geneReport/quxian/lvqi.png"> -->
              <img  src="../assets/img/geneReport/quxian/hongqi.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 3 ">
              <!-- <img  src="../assets/img/geneReport/quxian/hongping.png"> -->
              <img  src="../assets/img/geneReport/quxian/lvping.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if=" getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 3 " style="width:60%;" src="../assets/img/geneReport/fengxian/3.png">
            

            <div v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 2 ">
              <!-- <img  src="../assets/img/geneReport/quxian/lvqi.png"> -->
              <img  src="../assets/img/geneReport/quxian/hongqi.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 2 ">
              <!-- <img  src="../assets/img/geneReport/quxian/hongqi.png"> -->
              <img  src="../assets/img/geneReport/quxian/lvqi.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 2 " style="width:60%;" src="../assets/img/geneReport/fengxian/2.png">
            

            <div v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 1 ">
              <!-- <img  src="../assets/img/geneReport/quxian/lvping.png"> -->
              <img  src="../assets/img/geneReport/quxian/hongping.png">
              <b>
                C碱基荧光曲线
              </b>
            </div>
            <div v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 1 ">
              <!-- <img  src="../assets/img/geneReport/quxian/hongqi.png"> -->
              <img  src="../assets/img/geneReport/quxian/lvqi.png">
              <b>
                T碱基荧光曲线
              </b>
            </div>
            <img v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 1 " style="width:60%;" src="../assets/img/geneReport/fengxian/1.png">



            <br />
            <div class="tableBox">
              <div class="table" v-if=" getGeneReportByIdData && getGeneReportByIdData.apoe != 0">  
                <div class="table-tr">  
                  <div class="table-td" style="width:120px;">基因名称</div>  
                  <div class="table-td">APOE</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">检测位点</div>  
                  <div class="table-td">rs429358</div>  
                </div>  
                
                <div class="table-tr">  
                  <div class="table-td">
                    基因型别
                  </div>  
                  <div class="table-td">
                    {{ mockGeneApoe[getGeneReportByIdData.apoe].type }}
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">肥胖风险</div>  
                  <div class="table-td">
                    {{ mockGeneApoe[getGeneReportByIdData.apoe].text }}
                  </div>  
                </div>
                
                <div class="table-tr">  
                  <div class="table-td">对体重指数的影响</div>  
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 3 " >
                    BMI值正常的可能性低，血脂的代谢能力弱，有较高的肥胖风险。
                  </div>
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 2 " >
                    BMI值正常的可能性中等，血脂的代谢能力弱，有较高的肥胖风险
                  </div>
                  <div class="table-td" v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 1 " >
                    BMI值正常的可能性高，血脂的代谢能力强，有较低的肥胖风险
                  </div>
                </div> 
              </div> 
            </div>  

          </div>
          <div class="zhuText">
            注：报告中的肥胖风险分为三级：高、中、低，分别代表肥胖风险高，肥胖风险中等，肥胖风险低。
          </div>
          <div class="jkgljyBox">
            <div class="title">
              === 健康管理建议 ===
            </div>

            <p v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 3 ">
            您的内分泌型肥胖基因位点遗传风险属高风险：
            </p>
            <p v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 3 ">
            载脂蛋白E结合脂蛋白受体的作用下降，导致血脂代谢能力减弱。控制高脂类食物的摄入量。<br />例如：猪油、牛油等；控制饱和脂肪酸量的摄入量，选择橄榄油、茶籽油等不饱和脂肪酸代替动物油、花生油等饱和脂肪酸；选择高纤维食物。每天坚持运动30分钟以上的有氧运动，每周3次无氧运动，感觉呼吸心率加快、微微出汗即可。
            </p>

            <p v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 2 ">
              您的内分泌型肥胖基因位点遗传风险属中等风险：
            </p>
            <p v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 2 ">
              载脂蛋白E结合脂蛋白受体的作用下降，血脂代谢能力减弱。应控制高脂类食物的摄入量。<br />例如：猪油、牛油等；控制饱和脂肪酸量的摄入量，选择橄榄油、茶籽油等不饱和脂肪酸代替动物油、花生油等饱和脂肪酸；选择高纤维食物。每天坚持运动30分钟以上的有氧运动，每周3次无氧运动，感觉呼吸心率加快、微微出汗即可。
            </p>

            <p v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 1 ">
              您的内分泌型肥胖基因位点遗传风险属低风险：
            </p>
            <p v-if="getGeneReportByIdData && getGeneReportByIdData.apoe != 0 && getGeneReportByIdData.apoe == 1 ">
              载脂蛋白E结合脂蛋白受体的作用正常，血脂代谢能力正常。单一控制高脂类食物的摄入量并不能降低，应限制整体的饮食热量摄入，避免过多的能量摄入累积；<br />同时也要控制饱和脂肪酸量的摄入量，选择橄榄油、茶籽油等不饱和脂肪酸代替动物油、花生油等饱和脂肪酸；选择高纤维食物。每天坚持运动30分钟以上的有氧运动。
            </p>
          </div>

          <div class="showHideBox">
            
            <div class="showHideBtn" @click="showHideBoxFn(1)">
              收起
              <i class="open"></i>
            </div>
          </div>
        </div>

      </div>
      <div class="lineBorder"></div>

      <div class="gene_box">
        <div class="gene_box_title">第三部分  饮食运动建议
          <i></i>
        </div>
        <div class="slide_box image_box threeBox">
          <div class="mainTitle">
            1.1 基因说饮食健康 —— 个性化膳食营养分析
          </div>
          <div class="infoBox">
            <div class="childTitle">
              GNB3基因检测结果显示：
            </div>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 == 3 ">
              您的基因检测结果显示：您的食物吸收消化能力差，可能会发生消化不良的情况，平时饮食应遵循“少食多餐”的习惯，从而避免消化不良。
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 == 2 ">
              您的基因检测结果显示：您的食物吸收消化能力差，可能会发生消化不良的情况，平时饮食应遵循“少食多餐”的习惯，从而避免消化不良。
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.gnb3 == 1 ">
              您的基因检测结果显示：您的食物吸收消化能力正常，避免过量进食，减慢用餐速度，细嚼慢咽，控制摄食总量，避免暴饮暴食。调节口味，以清淡口味为主，可使用薄荷等香料控制食欲。另外，少食多餐，每餐少量，晚上8点后不进食。选择富含膳食纤维、高蛋白、低糖的食物，进餐时先吃蔬菜，然后吃肉、蛋、豆制品，最后吃米面等主食
            </p>
            <p v-show="0">
              暂无纪录
            </p>


            <p class="childTitle">
              UCP2基因检测结果显示：
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 == 3 ">
              您的基因检测结果显示：您在能量代谢方面导致的肥胖风险高，您的基础代谢率偏低，餐后生热作用及能量代谢紊乱，较易囤积皮下脂肪，而且较难分解，需要加强运动才能达到明显减肥效果。
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 == 2 ">
              您的基因检测结果显示：您在能量代谢方面导致的肥胖风险高，您的基础代谢率偏低，餐后生热作用及能量代谢紊乱，较易囤积皮下脂肪，而且较难分解，需要加强运动才能达到明显减肥效果。
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.ucp2 == 1 ">
              您的基因检测结果显示：您在能量代谢方面导致的肥胖风险低，您的基础代谢率正常，此时应保持正常饮食，避免节食引起新陈代谢下降导致。应远离脂肪含量高的食物、并且控制食物分量，不暴饮暴食。
            </p>
            <p v-show="0">
              暂无纪录
            </p>


            <p class="childTitle">
              APOE基因检测结果显示：
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.apoe == 3 ">
              你的基因检测结果显示：您在脂肪吸收方面导致的肥胖风险高，从而导致脏器型肥胖风险增加，应降低油脂的摄入；您在日常饮食过程中应注意减少脂肪特别是饱和脂肪（动物来源的脂肪）和反式脂肪酸的摄入（快餐食品、爆米花等常含有此类脂肪酸）。您若想通过饮食控制来减肥，控制饮食摄入脂肪（饱和脂肪酸）。另外可以适当提高优质蛋白的含量。在日常膳食中，注意仍以碳水化合物为主要能源，蛋白质、脂肪作为其补充，三者比例合理，均衡营养为科学选择。
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.apoe == 2 ">
              你的基因检测结果显示：您在脂肪吸收方面导致的肥胖风险较高，从而导致脏器型肥胖风险增加，应降低油脂的摄入；您在日常饮食过程中应注意减少脂肪特别是饱和脂肪（动物来源的脂肪）和反式脂肪酸的摄入（快餐食品、爆米花等常含有此类脂肪酸）。您若想通过饮食控制来减肥，控制饮食摄入脂肪（饱和脂肪酸）。另外可以适当提高优质蛋白的含量。在日常膳食中，注意仍以碳水化合物为主要能源，蛋白质、脂肪作为其补充，三者比例合理，均衡营养为科学选择。
            </p>
            <p class="info" v-if="getGeneReportByIdData && getGeneReportByIdData.apoe == 1 ">
              你的基因检测结果显示：您在脂肪吸收方面导致的肥胖风险正常，请保持良好的饮食习惯，选择多种新鲜蔬果、菌类，每日保证优质蛋白（鱼、鸡、蛋、豆、奶），减少精细主食（精白米面），每日有适当运动。
            </p>
            <p v-show="0">
              暂无纪录
            </p>

          </div>
          
          <div class="mainTitle">
            1.2 基因说饮食健康 —— 具体饮食建议
          </div>
          <div class="infoBox">
            <div class="childTitle_2">
              您的饮食总原则：“素多荤少，清淡，多果蔬，营养均衡”
            </div>
            
            <ul>
              <li>
              摄入脂肪以单不饱和脂肪酸（如橄榄油、菜籽油等）和多不饱和脂肪酸（如三文鱼，沙丁鱼等海鱼）为主，尽量少吃饱和脂肪酸（如猪油、黄油、奶油等）。
              </li>
              <li class="showImg">
                <img src="../assets/img/geneReport/other/img_01@2x.png">
              </li>

              <li>
              摄入含优质蛋白的食物，如牛奶、鱼肉、鸡胸肉、鸡蛋清等。
              </li>
              <li>
              多食新鲜蔬菜，它们富含维生素、矿物质、膳食纤维，水分多、能量低。有些食物具有辅助降脂功能（如玉米、洋葱、大蒜、木耳等）。
              </li>
              <li>  
              多食用蓝莓、核桃等水果、坚果。
              </li>
              <li>
              注意饮食清淡，坚持“少油、少盐、少调料”。
              </li>  
              <li>
              减少摄入高脂高胆固醇食物：如动物内脏、肥肉、蛋黄等。
              </li>  
              
              <li class="showImg">
                <img src="../assets/img/geneReport/other/img_02@2x.png">
              </li>

              <li>  
              这些食物，您需限量食用：红肉，瘦牛肉、猪肉、培根、火腿等。
              </li>

              <li>
              这些食物，您要间断食用：精制白米饭、白面粉做的面包、白面粉做的面类、米糕、玉米饼等。
              </li>
              <li>
              这些食物，您要管住“嘴”哟：五花肉、内脏、鸡翅及腿、鸭肉、鹅肉、禽肉加工品、油炸物、全脂乳酪、奶油及其制品（如冰淇淋）。
              </li>
            </ul>

            <div class="tableBox">
              <div class="table">  
                <div class="table-tr">  
                  <div class="table-td" style="width:160px;">宜食名单</div>  
                  <div class="table-td" >忌食名单</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">鱼肉、沙丁鱼、三文鱼等</div>  
                  <div class="table-td">精制碳水化合物</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">
                    高钙低脂奶等
                  </div>  
                  <div class="table-td">红肉</div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">非淀粉蔬菜</div>  
                  <div class="table-td">
                    动物内脏
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">高蛋白食物</div>  
                  <div class="table-td">
                    全脂奶制品
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">坚果类</div>  
                  <div class="table-td">
                    油炸食品
                  </div>  
                </div>
              </div> 
            </div>  
          </div>
          <div class="zhuText">
            注：以上食物仅做列举示范，你可以根据当地相似的食材进行选择。
          </div>

          <div class="mainTitle">
            2.0 基因说运动建议 —— 具体运动建议
          </div>
          <div class="infoBox">
            <div class="childTitle_2">
              基因检测结果告诉您，您应遵循以下的运动方式进行减肥：
            </div>

            <ul>

              <li>
                <b>
                内在不足，外在补充：
                </b>
                鉴于您的基因结果显示新陈代谢比较慢，建议您在运动前最好使用可以增加新陈代谢、脂肪消耗的产品，以辅助能量的消耗，达到较好的运动减肥效果。
              </li>
              <li>
                <b>
                恒心减肥，原则为先：
                </b>
                选择安全有效，方法简便，并能持之以恒的有氧运动，才能消耗能量、燃烧脂肪、促进脂质分解、代谢。如长距离步行、慢跑、爬楼梯、跳绳、骑自行车、游泳、跳健身操、打网球等有氧运动。
              </li>
              <li>  
                <b>
                方法很重要，安全始终排第一：
                </b>
                运动需要有度，以有氧运动为主（有氧运动判断：和同伴一块运动时，边运动边交谈，不觉得气促，能交谈）。在有氧运动过程中，当我们觉得有些气喘、微微出汗时，就进入了中等强度的运动状态。这时男、女消耗能量分别为4.8-7.0千卡/分钟和3.5-5.1千卡/分钟。
              </li>
              <li>
                <b>
                能量消耗有周期：
                </b>
                由于机体的生物节律周期，参加同样的运动，下午和晚间比上午多消耗20%的能量，在安排活动时应予以注意。
              </li>
              <li>
                <b>
                  建议您的运动减肥的最佳时间为：
                </b>
                轻度运动在饭后1小时后进行，中度运动应安排在饭后两小时进行，高强度运动可在正餐后3小时进行。
              </li>
            </ul>
            <div class="tableBox">
              <div class="table">  
                <div class="table-tr">  
                  <div class="table-td" style="width:160px;">室外运动</div>  
                  <div class="table-td">室内运动</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">游泳</div>  
                  <div class="table-td">游泳</div>  
                </div>  
                <div class="table-tr">  
                  <div class="table-td">
                    中速跑
                  </div>  
                  <div class="table-td">有氧操</div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">跳绳</div>  
                  <div class="table-td">
                    跑步机
                  </div>  
                </div>
                
                <div class="table-tr">  
                  <div class="table-td">骑行</div>  
                  <div class="table-td">
                    动感单车
                  </div>  
                </div>
                <div class="table-tr">  
                  <div class="table-td">羽毛球、篮球等球类运动</div>  
                  <div class="table-td">
                    划船机等
                  </div>  
                </div>
              </div> 
            </div> 

            <div class="zhuText">
              注：以上运动类型仅做列举示范，具体您选择的运动方式，取决于您的兴趣及运动设施。
            </div>
            <div class="showImgLine">
                <img src="../assets/img/geneReport/other/5.png">
            </div>
          </div>

          <div class="showHideBox">
            
            <div class="showHideBtn" @click="showHideBoxFn(2)">
              收起
              <i class="open"></i>
            </div>
          </div>

        </div>
      </div>
      <div class="lineBorder"></div>

      <div class="gene_box">
        <div class="gene_box_title">第四部分  参考文献
          <i></i>
        </div>
        <div class="slide_box image_box">
          <p>
          [1] 楼晓明，朱心强，秦建芬等.GNB3基因C825T位多态性与肥胖相关性[J].上海交通大学学报医学版, 2006, 26(8):895-898
          </p>
          <p>
          [2] JJ Roh，MJ Kim etc.Positive association of obesity with single nucleotide polymorphisms of syndecan 3 (SDC3) in Korean population[J].Journal of Clinical Endocrinology & Metabolism, 2006, 91(12):5095-9
          </p>
          <p>
          [3] WH Huang，LC Hwang etc.The Association of Obesity with Single Nucleotide Polymorphisms of SDC3 and PPARγ2 Genes in the Taiwanese Population[J].BMJ Open,bmjopen-2016-011713
          </p>
          <p>
          [4] 修玲玲, 翁建平, 隋昳,等. 解偶联蛋白2基因和β3-肾上腺素能受体基因联合变异与2型糖尿病及肥胖症的关系[J]. 中华医学杂志, 2004, 84(5):375-379.
          </p>
          <p>
          [5] 向伟, 赵水平. 肥胖儿童载脂蛋白 E 基因多态性的研究[J]. 中华儿科杂志, 1999, 37(8): 486-489.
          </p>
          <p>
          [6] E Zintzaras,GD Kitsios,F Triposkiadis,J Lau,G Raman，et a1．APOE gene polymorphisms and response to statin therapy．Pharmacogenomics Journal,2009,9 (4):248
          </p>
          <p>
          [7] Holtmann G，Siffert W，Haag S,et a1．G-protein beta 3 subunit 825 CC genotype is associated with unexplained (functional) dyspepsia. Gastroenterology , 2004 , 126 (4) :971-979
          </p>

          <div class="showHideBox">
            
            <div class="showHideBtn" @click="showHideBoxFn(3)">
              收起
              <i class="open"></i>
            </div>
          </div>

        </div>
      </div>
    </div>

    <a v-show="isPreLoading" href="javascript:;" class="customBtn" @click="clickCustom"></a>
    <preLoading v-if="!isPreLoading"></preLoading>
  </div>
</template>
<script>
import commonJs from '@/util/common.js'
import { Toast } from 'mint-ui'
import axios from 'axios'

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

// var mockGeneIndex = {
//   "0": "未检测",
//   "1": "低风险",
//   "2": "中风险",
//   "3": "高风险",
//   "4": "无法检测"
// }


export default {
  name:'geneReportDetail',
  data(){
    return {
      isPreLoading: false,
      isShowCheckResult:false,
      allRisk:"",
      getGeneReportByIdData:null,
      
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
		gene_box_titleEvnet() {
			$('.gene_box_title').on('click', function() {
        // debugger
				if ($(this).find('i').hasClass('open')) {
					$(this).find('i').removeClass('open');
					$(this).parent().find('.slide_box').slideUp(500);
				} else {
					$(this).find('i').addClass('open');
					$(this).parent().find('.slide_box').slideDown(500);
				}

			});
		},
    
    showHideBoxFn(index){
      $('.gene_box_title').eq(index).click()
    },
    clickCustom() {

      //随机数
      function rnd(n, m) {
        return parseInt(Math.random() * (m - n) + n);
      }
      //设置cookie
      function setCookie(name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
      }

      //获取cookie
      function getCookie(name) {
        var arr = document.cookie.split('; ');
        //blue=123   busy=250

        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=');
          //arr2[0]->blue  arr2[1]->123
          if (arr2[0] == name) {
            return arr2[1];
          }
        }
        return '';
      }

      var __arr = ['brm-110354224754518', 'brm-110354224754775'];
      var __iNow = getCookie('ArrRnd');

      var __now = rnd(0, 2);
      if (__iNow) {
        __now = __iNow;
      }

      
      var __version = commonJs.getHxsAppVersion()
      console.log("__version:"+__version)
      
      console.log('commonJs.compareAppVersion("3.0.1", "2.2.0"):'+ commonJs.compareAppVersion( '3.0.1', "2.2.0") )

      if ((commonJs.compareAppVersion(__version, "2.2.0") || __version == "2.2.0") && __version) {

        window.location.href = 'https://hxsapp_openim#' + __arr[__now];
      } else {
        window.location.href = 'hxsapp://openim|' + __arr[__now];
      }

      setCookie('ArrRnd', __now, 1);
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
				// debugger
        setTimeout(()=>{
				  this.isPreLoading = true;
        },300)
				
				if (res.data.code == 200) {
            
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

        // debugger
          if( res.data.data.gnb3 == 3 || res.data.data.ucp2 == 3 || res.data.data.apoe == 3 ){
            this.allRisk = 3
          } else if( (res.data.data.gnb3 == 2 || res.data.data.ucp2 == 2 || res.data.data.apoe == 2) && (res.data.data.gnb3 != 3 && res.data.data.ucp2 != 3 && res.data.data.apoe != 3)  ){
            this.allRisk = 2
          } else if( res.data.data.gnb3 == 1 && res.data.data.ucp2 == 1 && res.data.data.apoe == 1 ){
            this.allRisk = 1
          }

					this.$nextTick(() => {
						this.gene_box_titleEvnet()
					})


				} else {
          setTimeout(()=>{
            this.isPreLoading = true;
          },500)
					Toast("加载数据异常，请稍后再试！")
				}
			}).catch((error) => {
				Toast("加载数据异常，请稍后再试！")
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
  .geneReportDetail{
    width:100%;
    margin: 0 auto;
    min-width: 320px;
    overflow: hidden;
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
        padding-left: 14px;
        background: #fff;
        color: #333;
        font-size: 15px;
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
          &.open {
            -webkit-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            transform: rotate(180deg);
          }
        }
      }
      
      .slide_box{
        display: none;
        width:100%; 
        box-sizing: border-box;
        padding: 12px 15px 10px;
        p{
          color: #666;
          // text-indent: 2em;
          line-height:26px;
          padding-bottom: 5px;
        }
        .tableBox{
          width: 100%;
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
            display: table; width: 100%; 
            border-collapse: collapse;
            background: #f5f5f8;
            .table-tr {
              display: table-row; height: 45px;
              .table-th {display: table-cell;font-weight: bold;
              border: 1px solid rgba(129,141,207,0.1);
              text-align: center;
              vertical-align: middle;
              }   
              .table-td {display: table-cell; border: 1px solid rgba(129,141,207,0.10); text-align: center;vertical-align: middle;padding:10px 8px;}  
            }   
          }
        } 
        .showHideBox{
            width: 100%;
            position: relative;
            text-align: center;
            margin: 0 auto;
          .showHideBtn{
            font-size: 13px;
            color: #333;
            i{
              display: inline-block;
              width: 15px;
              height: 9px;
              background: url(./../assets/img/return01-blue@2x.png) no-repeat;
              margin-bottom: 2px;
              -webkit-background-size: 100% auto;
              background-size: 100% auto;
              &.open {
                -webkit-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transform: rotate(180deg);
              }

            }
          }
        }
        &.twoBox{
          width: 100%;
          .mainTitle{
            font-size: 13px;
            color: #818cdf;
            font-weight: 400;
          }

          .infoBox{
            width: 100%;
            padding: 10px 0 15px;
            box-sizing: border-box;

            b{
              text-align: center;
              display: inline-block;
              width: 100%;
              font-size: 14px;
              padding: 0 0 10px;
            }
            p{
              &.info{
                line-height: 23px;
                font-size: 13px;
                color: #151515;
                padding-bottom: 15px;
              }

            }
            img{
              display: block;
              width: 100%;
              margin:0 auto 10px;
            }
          } 
          .jkgljyBox{
            width: 100%;
            padding: 10px 0 15px;
            box-sizing: border-box;

            .title{
              display: block;
              text-align: center;
              font-size: 13px;
              color: #333;
              height: 30px;
              line-height: 30px;
              margin-bottom: 10px;
            }
            p{
              line-height: 23px;
              font-size: 13px;
              color: #151515;
            }
          } 

          .zhuText{
            font-size: 11px;
            color: #999999;
            padding-bottom: 15px;
          }

        }
        &.threeBox{
          width: 100%;
          .mainTitle{
            font-size: 13px;
            color: #333;
            font-weight: 400;
          }
          .infoBox{
            width: 100%;
            padding: 10px 0 15px;
            box-sizing: border-box;
            .childTitle{
              font-weight: 400;
              font-size: 13px;
              color: #818cdf;
              padding-bottom: 5px;
            }
            .childTitle_2{
              font-weight: 400;
              font-size: 13px;
              color: #333;
              padding-bottom: 15px;
            }
            
            p{
              &.info{
                line-height: 23px;
                font-size: 13px;
                color: #151515;
                padding-bottom: 15px;
              }

            }
            ul{
              width: 100%;
              li{
                font-size: 13px;
                color: #333;
                position: relative;
                width: 100%;
                padding:0px 0 15px 16px; 
                box-sizing: border-box;
                &:after{
                  content: "";
                  display: block;
                  height: 6px;
                  width: 6px;
                  border-radius: 50%;
                  background: black;
                  position: absolute;
                  top: 8px;
                  left:3px;
                }
                &.showImg{
                  padding:0 0 15px;
                  clear: both;
                  img{
                    width: 100%;
                  }
                  &:after{
                    display: none;
                  }
                }
              }
            }
          }

          .zhuText{
            font-size: 11px;
            color: #999999;
            padding-bottom: 15px;
          }

          .showImgLine{
            img{
              width: 100%;
            }
          }
        }

      }
    }

    .customBtn {
      width: 65px;
      height: 70px;
      background: url(./../assets/img/kefu_btn@3x.png) no-repeat;
      background-size: 65px 70px;
      position: fixed;
      right: 14px;
      bottom: 88px;
      z-index: 99;
      display: block;
    }
  }
</style>

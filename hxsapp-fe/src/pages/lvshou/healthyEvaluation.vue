<template>
  <div id="healthyEvaluation">
  <div v-if="0">
    pageNextHistory:{{pageNextHistory}}<br />
    testPrePageHistory:{{testPrePageHistory}}<br />
    questionCurid:{{questionCurid}}<br />
    questionCuridPre:{{questionCuridPre}}<br />
  </div>
    <div v-if="questionAllData.length">
      <mt-progress :value="progressValue" :bar-height="barHeight"></mt-progress>
      <div :id="'question_box_id_'+ data.question_id" class="question_box" v-for="(data,index) in questionAllData" :key="index" v-show="questionAllData.length && questionCurid ==  data.question_id" >
        <div class="question_text">
          {{questionCurIndex+1}}. {{data.question_text}}
        </div>

        <div class="option_box">
          <div class="option_list" v-for="(option,index2) in data.option" :key="index2">

            <div v-if="data.question_id == '1' ">
              <div class="input_box" @click="input_box(data)">
                <span>
                  {{questionAllConfig[data.question_id].text}}
                </span>
              </div>
            </div>
            <div v-if="data.question_id == '2' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>

            <div v-if="data.question_id == '2_1' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p class="p_2_1">
                  {{option.option_text}}    
                  <br />
                  <span v-if="questionAllConfig[data.question_id].isSelectRadio[index2]  && index2 == 1">
                    温馨提示：由于孕妇及浦乳期女性属于特殊人群，请联系营养顾问获取精准的体重管理方案。<br />
                  </span>        
                </p>
              </div>
            </div>
            
            <div v-if="data.question_id == '3' ">
              <div class="input_box" @click="input_box(data)">
                <span>
                  {{questionAllConfig[data.question_id].text}}
                </span>
              </div>
            </div>
            <div v-if="data.question_id == '4' ">
              <div class="input_box" @click="input_box(data)">
                <span>
                  {{questionAllConfig[data.question_id].text}}
                </span>
              </div>
            </div>

            <div v-if="data.question_id == '5' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '5_1' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>

            <div v-if="data.question_id == '6' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 8" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>

            <div v-if="data.question_id == '7' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 7" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '8' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p class="p_8">
                  {{option.option_text}}    
                  <br />
                  <span v-if="questionAllConfig[data.question_id].isSelectRadio[index2]  && index2 == 0">
                    <input id="p_8_input" type="text" placeholder="请罗列食物／药物的具体名称" />
                  </span>        
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '9' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>

            <div v-if="data.question_id == '9_1' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 5" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>

            <div v-if="data.question_id == '10' ">
              <div class="input_box" @click="input_box(data)">
                <span>
                  {{questionAllConfig[data.question_id].text}}
                </span>
              </div>
            </div>

            <div v-if="data.question_id == '11' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 6" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '12' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 5" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '12_1' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '13' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 6" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '13_1' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '14' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 7" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '15' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 4" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '16' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '17_1' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '17_2' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '18' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '19' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 5" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '20' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>

            <div v-if="data.question_id == '21' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 5" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>
            <div v-if="data.question_id == '22' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 13" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>

            <div v-if="data.question_id == '23' ">
              <div class="s_box" @click="clickSelect(data,option,index2)">
                <div :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>


            <div v-if="data.question_id == '24' ">
              <div class="s_box" @click="clickMoreSelect(data,option,index2)">
                <div v-if="index2 == 5" :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_radio_active' :'mock_radio'  "></div>
                <div v-else :class=" questionAllConfig[data.question_id].isSelectRadio[index2] ? 'mock_more_radio_active' :'mock_more_radio'  "></div>
                <p>
                {{option.option_text}}            
                </p>
              </div>
            </div>


          </div>
          <div class="clear"></div>
        </div>
        <button class="nextQuestionBtn" @click="preQuestionBtn(data)" v-if="0  && data.question_id != 1 && questionCuridPre != '' && questionCurIndex >= 1 " >
          <span v-if="data.question_id != '24' ">
            上一题
          </span>
        </button>

        <button class="nextQuestionBtn" @click="nextQuestionBtn(data)" >
          <span v-if="data.question_id == '24' ">
            提交
          </span>
          <span v-else>
            下一题
          </span>
        </button>


      </div>
    </div>

    <preLoading v-if="!isPreLoading && !isCorrectVersion">
    </preLoading>


    <div class="layerTip" v-if="isCorrectVersion">
      <div class="rightsInterest">
        <span class="closeBtn"></span>
        <div class="rightsInterestTitle">好享瘦APP版本过低</div>
        <div class="textBox">
          <div class="cont">更新即刻查看更多精彩</div>
        </div>
        <a href="https://hxsapp_close" class="determine">确定</a>
      </div>
    </div>
    
  </div>
</template>

<script>

import axios from 'axios'
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'
import IosSelect from 'iosselect'
import { Progress } from 'mint-ui';

import { MessageBox } from 'mint-ui';

// 下载app组件
import downToLinkedMe from "@/components/downToLinkedMe"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
  name: 'healthyEvaluation',
  data() {
    return {
      // 页面的下一题路径记录
      pageNextHistory:[],
      // 页面的上一题路径记录
      testPrePageHistory:[],

      // 2_1 的人工服务id
      service_openim_account:'',
      // 是否显示loading
      isPreLoading:false,
      // 保存到后端的数据
      saveUserAnswer:[],

      // 是否在app版本 >= 3.2.1
      isCorrectVersion:false,

      // 所有问题的长度
      questionNum :0,

      // 进度百分比 ＝ 0
      progressValue:0,

      // 进度条的高度
      barHeight:0,

      // 当前题目的前端索引
      questionCurIndex:0,
      
      // 当前题目的question的id this.$route.params.question_id
      questionCurid:"",
      // 和上一提相关的业务的问题id
      questionCuridPre:"",

      // 后端返回全部题目的数据
      questionAllData:[],
      
      // 所有的题目的类型，全部前端枚举处理的处理
      questionAllConfig:{
        // select 单选题
        // moreSelect 多选题
        // input 填空题
        // moreSelectOrSelect 多选或单选题

        "1":{
					type:"input",
					text:"请输入",

					iosSelectOneLevelId:'',
					iosSelectTitle:"",
					iosSelectData:[]
				},
        "2":{
					type:"select",
					text:"",
          isSelectRadio:[true,false]
				},
        "2_1":{
					type:"select",
					text:"",
          isSelectRadio:[true,false]
				},
        "3":{
					type:"input",
					text:"请输入",

					iosSelectOneLevelId:'',
					iosSelectTitle:"",
					iosSelectData:[]
				},
        "4":{
					type:"input",
					text:"请输入"
				},
        "5":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false]
				},
        "5_1":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false,false]
				},
        "6":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false,false,false,false]
				},
        "7":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false,false,false,false]
				},
        "8":{
					type:"select",
					text:"",
          isSelectRadio:[true,false]
				},
        "9":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false,false]
				},
        "9_1":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false]
				},
        "10":{
					type:"input",
					text:"请输入"
				},
        "11":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false,false]
				},
        "12":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false]
				},
        "12_1":{
					type:"select",
					text:"",
          isSelectRadio:[true,false]
				},
        "13":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false,false]
				},
        "13_1":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false,false,false]
				},
        "14":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false,false,false,false]
				},
        "15":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false]
				},
        "16":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false,false]
				},
        "17_1":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false,false]
				},
        "17_2":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false,false]
				},
        "18":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false]
				},
        "19":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false]
				},
        "20":{
					type:"select",
					text:"",
          isSelectRadio:[true,false,false]
				},
        "21":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false]
				},
        "22":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false,false,false,false,false,false,false,false,false]
				},
        "23":{
					type:"select",
					text:"",
          isSelectRadio:[false,false,false,false,false,false]
				},
        "24":{
					type:"moreSelectOrSelect",
					text:"",
          isSelectRadio:[false,false,false,false,false,false]
				},
      }

    }
  },
  mounted(){
    var __this = this;
    document.title = "健康评测";

    this.barHeight = 10;

    // 设置页面题目的索引 
    this.questionCurIndex = this.$route.query.questionCurIndex ? parseInt( this.$route.query.questionCurIndex ) : 0;

    // 设置当前的问题id
    this.questionCurid = this.$route.params.question_id;
    
    var __appVersion = commonJs.getHxsAppVersion();
    
    var __is =  !! ( commonJs.compareAppVersion( __appVersion, "3.5.0" ) || __appVersion == "3.5.0" ) 
    // var __is =  !! ( commonJs.compareAppVersion( __appVersion, "3.2.1" ) || __appVersion == "3.2.1" ) 

    this.isCorrectVersion = process.env.NODE_ENV !== 'production' ? false : ! __is;  
    // 获取接口的所有字段
    this.getAllQuestion();

    // 获取题目2_1 人工客服账号 
    this.getOpenIMAccount()

    if(this.questionCurid == 1 ){
      console.log("// 初始化第一题的ios－select的数据")
      this.initIosSelectData( "1","",18,100)
    }

    window.hxsapp_auto_fill = function(jsonString){
      // alert(jsonString)
      if( typeof jsonString == "string" && jsonString.length > 0 && JSON.parse(jsonString) ) {
        var question_id = __this.$route.params.question_id;
        // weight_4
        // weight_10
        if( JSON.parse(jsonString)["weight_"+question_id] && JSON.parse(jsonString)["weight_"+question_id].length > 0  ){
          __this.questionAllConfig[question_id].text = JSON.parse(jsonString)["weight_"+question_id];
        }
      }
    }
  },

  watch:{
    questionCurIndex: function ( val,oldval){
        this.progressValue = parseFloat( ( this.questionCurIndex / this.questionNum ) *100);
    }
  },

  components:{
    preLoading
  },
  beforeEnter(to,from,next){
    console.log('router beforeEnter');
    next();
  },
  beforeRouteUpdate (to, from, next) {
    console.log('component beforeRouteUpdate');
    console.log(to,from,next)
    // next();
    next({
      replace: true
    });

    this.questionCurid = to.params.question_id;
    console.log("questionCurid", to.params.question_id)
    // this.questionCuridPre = ""

  },
  beforeRouteLeave(to,from,next){
    console.log('component beforeRouteLeave');
    next();
  },
  beforeDestroy(){
    console.log('component beforeDestroy');
    // app 回调删除相关处理
		window.hxsapp_auto_fill &&  delete window.hxsapp_auto_fill;
  },
  methods:{
    getOpenIMAccount(){
      let json = {
				sess_token: commonJs.getUrlParam("sess_token")
			};

			axios.get("https://api.hxsapp.com/account/userAccount/getOpenIMAccount", { params: json }).then((res) => {
				console.log(res)

        if(res.data.code == "200" && res.data.data.service_openim_account){
          this.service_openim_account = res.data.data.service_openim_account
        }

      })
    },
    
    getAllQuestion(){
      let json = {
				from_where:this.$route.query.from_where,
				article_id: this.$route.params.article_id,
				sess_token: commonJs.getUrlParam("sess_token")
			};

			axios.get("https://api.hxsapp.com/slim/Questionnaire/getAllQuestion", { params: json }).then((res) => {
				console.log(res)
        setTimeout(()=>{
          this.isPreLoading = true;
        },200)

        this.questionAllData = res.data.data
        this.questionNum = res.data.data.length
        this.progressValue = this.progressValue = parseFloat( ( this.questionCurIndex / this.questionNum ) *100)
      })
    },

    // 多选处理事件
    clickMoreSelect(data,optiondata,index){
      var  that = this;  

      if(this.questionCurid == "6"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 8){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第九个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[8] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(8, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "7"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 7){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第八个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[7] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(7, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "9_1"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 5){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[5] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(5, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "11"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 6){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第七个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[6] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(6, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "12"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 5){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[5] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(5, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "13"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 6){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[6] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(6, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "14"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 7){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[7] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(7, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "15"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 4){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[4] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(4, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "19"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 5){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[5] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(5, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "21"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 5){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[5] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(5, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if(this.questionCurid == "22"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 13){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[13] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(13, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }else if( 0 &&  this.questionCurid == "23" ){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }

        this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
          if(i == index){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
          }
        })

      }else if(this.questionCurid == "24"){
        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
        }
        if(index == 5){

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            
            if(i == index ){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }else{
              that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
            }
          })
        }else{
          // 第六个是选中的
          if( this.questionAllConfig[data.question_id].isSelectRadio[5] ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(5, 1, false);
          }

          this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
            if(i == index){
              that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
            }
          })
        }
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }
    },
    // 单选处理事件
    clickSelect(data,optiondata,index){
      var  that = this;  
      if(this.questionCurid == "2" || this.questionCurid == "2_1" 
                                   || this.questionCurid == "5" 
                                   || this.questionCurid == "5_1" 
                                   || this.questionCurid == "8" 
                                   || this.questionCurid == "9" 
                                   || this.questionCurid == "12_1" 
                                   || this.questionCurid == "13_1" 
                                   || this.questionCurid == "16" 
                                   || this.questionCurid == "17_1" 
                                   || this.questionCurid == "17_2" 
                                   || this.questionCurid == "18" 
                                   || this.questionCurid == "20" 
                                   || this.questionCurid == "23" 
      ){

        console.log(optiondata)
        console.log(index)

        if(this.questionAllConfig[data.question_id].isSelectRadio[index]){
          console.log("点击已经选中的数据，不处理任何东西")
          return;
        }
        this.questionAllConfig[data.question_id].isSelectRadio.find((element, i, array)=>{
          
          if(i == index ){
            that.questionAllConfig[data.question_id].isSelectRadio.splice(index, 1, !element);
          }else{
            that.questionAllConfig[data.question_id].isSelectRadio.splice(i, 1, false);
          }

        })
        console.log(this.questionAllConfig[data.question_id].isSelectRadio)
      }


    },
    preQuestionBtn(data){
      
      this.questionCurIndex = this.questionCurIndex -1 ? this.questionCurIndex -1 : 0;

      this.goPrePage(this.questionCurid)
    },

    getQuestionCuridPre(){
      var clickNextnum = this.pageNextHistory.length;
      var __questionCuridPre = "";

      if(clickNextnum == 1 ){
        console.log("只是点击过一次")
        __questionCuridPre = 1;
        this.pageNextHistory.splice( clickNextnum-1,1)
        return __questionCuridPre;
      }else{

        __questionCuridPre = this.pageNextHistory[clickNextnum-2];

        this.pageNextHistory.splice( clickNextnum-1,1)
        return __questionCuridPre
      }
    },
    goPrePage(){
      // debugger
      if(this.questionCuridPre == ""){
        Toast("不处理")
        return;
      }

      this.questionCuridPre = this.getQuestionCuridPre();

      if(this.questionCurid == 3 ){
        this.initIosSelectData( "3","厘米",140,230)
      }

      var __path = "";  
      if( !window.location.search ){
        __path = "/lvshou/healthyEvaluation/"+ this.questionCuridPre + "?questionCurIndex="+ (this.questionCurIndex-1)
      }else{
        if(window.location.search.indexOf("questionCurIndex=")>0){
           
           var __array = window.location.search.split("?")[1].split("&");

           var result = __array.filter(data => data.indexOf("questionCurIndex=") < 0)

           __path = "/lvshou/healthyEvaluation/"+ this.questionCuridPre + "?"+ result.join("&") + "&questionCurIndex="+ (this.questionCurIndex-1)

        }else{
          __path = "/lvshou/healthyEvaluation/"+ this.questionCuridPre + window.location.search + "&questionCurIndex="+ (this.questionCurIndex-1)
        }
      }

      this.testPrePageHistory.push({
        "testPrePageHistory":this.questionCuridPre
      })
      this.$router.push({
        path:__path
      })
    },
    // 下一题的处理事件
    nextQuestionBtn(data){
      
      if(data.question_id == "1"){
        var __text = this.questionAllConfig[data.question_id].text
        var __iosSelectOneLevelId = this.questionAllConfig[data.question_id].iosSelectOneLevelId
        if( __text == "请输入" ){
          Toast("请选择年龄")
          return;
        }

        this.saveUserAnswerPushData([{
            option_id: data.option[0].option_id,     // 选项id
            text: __text
          }]
        )
        
        this.questionCurid = "2"
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        

        return;
      }else if(data.question_id == "2"){

        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "2_1";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

          if(element && index == 0 ){
            __questionCurid = "3"
          }
        })
        

        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;

      }else if(data.question_id == "2_1"){

        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "3";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })


        if( __arr[1] ){
          MessageBox({
            title: '',
            message: '温馨提示：由于孕妇及浦乳期女性属于特殊人群，请联系营养顾问获取精准的体重管理方案。',
            confirmButtonText:"去人工服务",
            cancelButtonText:"取消",
            showCancelButton: true,
            closeOnClickModal: false
          }).then((action) => {
            console.log("actio-value:" + action);
            if (action == "confirm") {
              console.log(action + "-case")
              // alert("confirm")
              
              if(this.service_openim_account == ""){
                Toast("获取人工客服的服务异常，请稍后再试！")
              }else{

                var __appVersion = commonJs.getHxsAppVersion();  
                var __is =  !! ( commonJs.compareAppVersion( __appVersion, "3.1.1" ) || __appVersion == "3.1.1" ) 

                if( __is ){
                  window.location.href = "https://hxsapp_openim_page?service_id="+ this.service_openim_account +"&title="+ encodeURIComponent("人工服务"); 
                }else{
                  window.location.href = "https://hxsapp_openim#="+ this.service_openim_account;
                }

                // setTimeout(()=>{
                //   window.location.href = "https://hxsapp_close"
                // },500)
              }
              

            } else if (action == "cancel") {
              console.log(action + "-case")
              console.log("cancel")
              // 
              
            }
          })   
        }else{
          this.saveUserAnswerPushData(__saveUserAnswer)

          this.questionCurid = __questionCurid
          this.questionCurIndex ++;
          this.goNextPage(this.questionCurid)
          
          
          return;
        }

      }else if(data.question_id == "3"){

        var __text = this.questionAllConfig[data.question_id].text
        var __iosSelectOneLevelId = this.questionAllConfig[data.question_id].iosSelectOneLevelId
        if( __text == "请输入" ){
          Toast("请选择身高")
          return;
        }
        this.saveUserAnswerPushData([{
            option_id: data.option[0].option_id,     // 选项id
            text: __text.replace("厘米","")
          }]
        )

        this.questionCurid = "4"
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "4"){
        // this.questionAllConfig[data.question_id].text = "100斤";
        var __text = process.env.NODE_ENV !== 'production' ? "100" : this.questionAllConfig[data.question_id].text;

        // var __iosSelectOneLevelId = this.questionAllConfig[data.question_id].iosSelectOneLevelId
        if( __text == "请输入" ){
          Toast("请选择您的体重")
          return;
        }

        this.saveUserAnswerPushData([{
            option_id: data.option[0].option_id,     // 选项id
            text: __text
          }]
        )

        this.questionCurid = "5"
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "5"){

        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "6";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

          if(element && index == 0 ){
            __questionCurid = "5_1"
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;

      }else if(data.question_id == "5_1"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "6";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;

      }else if(data.question_id == "6"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })

        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = "7"
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "7"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })

        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = "8"
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "8"){
        
        if( this.questionAllConfig[data.question_id].isSelectRadio[0] ){
          var __text = $("#p_8_input").val();

          if( __text == "" ){
            Toast("请输入填写食物/药物的名称！")
            return;
          }
        }

        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "9";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: index == 0 ? $("#p_8_input").val() : ''
            })
          }

        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;

      }else if(data.question_id == "9"){
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "9_1";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

          if(element && index == 0 ){
            __questionCurid = "10"
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "9_1"){
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })

        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = "10"
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "10"){
        // this.questionAllConfig[data.question_id].text = "80斤";
        // var __text = this.questionAllConfig[data.question_id].text
        var __text = process.env.NODE_ENV !== 'production' ? "80" : this.questionAllConfig[data.question_id].text;

        // var __iosSelectOneLevelId = this.questionAllConfig[data.question_id].iosSelectOneLevelId
        if( __text == "请输入" ){
          Toast("请选择您的体重")
          return;
        }

        this.saveUserAnswerPushData([{
            option_id: data.option[0].option_id,     // 选项id
            text: __text
          }]
        )

        this.questionCurid = "11"
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "11"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "12"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })

        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "12"){
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "12_1";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

          if(element && (index == 3 || index == 5 ) ){
            __questionCurid = "13"
          }
        })

        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "12_1"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "13";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "13"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "14"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
          if(element && (index == 3 ) ){
            __questionCurid = "13_1"
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "13_1"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "14";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "14"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "15"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "15"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "16"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "16"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        // 默认男性题目 容错
        var __questionCurid = "17_1";

        if( this.saveUserAnswer  &&  this.saveUserAnswer[1] ){
          if( this.saveUserAnswer[1].answer[0].option_id  == 1){
            // 男
            __questionCurid = "17_1";

          }else if( this.saveUserAnswer[1].answer[0].option_id  == 2){
            // 女
            __questionCurid = "17_2";

          }

        }

        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)
        // debugger
        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "17_1" || data.question_id == "17_2"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "18";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "18"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "19";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "19"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "20"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "20"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;

        var __saveUserAnswer = []
        var __questionCurid = "21";
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }
        })
        this.saveUserAnswerPushData(__saveUserAnswer)

        this.questionCurid = __questionCurid
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "21"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "22"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "22"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        // 默认男性题目 容错
        var __questionCurid = "24";

        if( this.saveUserAnswer  &&  this.saveUserAnswer[1] ){
          if( this.saveUserAnswer[1].answer[0].option_id  == 1){
            // 男
            __questionCurid = "24";

          }else if( this.saveUserAnswer[1].answer[0].option_id  == 2){
            // 女
            __questionCurid = "23";

          }

        }

        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "23"){
        
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "24"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;
        this.questionCurIndex ++;
        this.goNextPage(this.questionCurid)
        
        return;
      }else if(data.question_id == "24"){
        var __arr = this.questionAllConfig[data.question_id].isSelectRadio;
        var __is = __arr.every((element, index, array) => {
          // console.log("element:"+element)
          // console.log("index:"+index)
          return element == false
        });

        if( __is ){
          Toast("请至少选中一项")
          return;
        }

        var __saveUserAnswer = []
        var __questionCurid = "24"
        __arr.forEach((element, index, array)=>{
          if( element ){
            __saveUserAnswer.push({
              option_id: data.option[index].option_id,     // 选项id
              text: ''
            })
          }

        })

        this.saveUserAnswerPushData(__saveUserAnswer)
        this.questionCurid = __questionCurid;

        this.goSaveData(__questionCurid)

      }
      
      // alert(JSON.stringify(data))
    },
    initIosSelectData(question_id,danwei,startIndex,endIndex) {
      if(question_id == 1){
        this.questionAllConfig[question_id].iosSelectOneLevelId = "18"
        this.questionAllConfig[question_id].iosSelectTitle = "请选择年龄"
      }

      for (var i = startIndex; i <= endIndex; i++) {
        this.questionAllConfig[question_id].iosSelectData.push({
          id: i,
          value: i + danwei
        });
      }
    },
		input_box(data){
			console.log( data.question_id + JSON.stringify(data))
			
			if( data.question_id == "1" || data.question_id == "3"){
				this.iosSelectEvnet(data.question_id)
			}
			if( data.question_id == "4"){
        console.log("（3.2.1）调用app的拉标尺的协议,40－200公斤")
        
        window.location.href = "https://hxsapp_auto_fill_float_picker?type=weight_4&title="+ encodeURIComponent("请选择您的体重") +"&unit="+ encodeURIComponent("公斤") +"&min=40&max=200&curr=50";

        // setTimeout(()=>{
        //   window.hxsapp_auto_fill( '{name:"wuwanbin",age:20}' )
        // },2000)
      }
      if( data.question_id == "10"){
        console.log("（3.2.1）调用app的拉标尺的协议, >=1公斤")
        window.location.href = "https://hxsapp_auto_fill_float_picker?type=weight_10&title="+ encodeURIComponent("请选择您的体重") +"&unit="+ encodeURIComponent("公斤") +"&min=40&max=200&curr=1";
      }
      
		},
		iosSelectEvnet(question_id){
			var that = this;
			// var __showBankDom = document.querySelector('#showBank_'+question_id);
			// var __bankIdDom = document.querySelector('#bankId_'+question_id);
			
			// var __bankId = __showBankDom.dataset['id'];
			// var __bankName = __showBankDom.dataset['value'];
			var __data = this.questionAllConfig[question_id].iosSelectData;
			var __oneLevelId = this.questionAllConfig[question_id].iosSelectOneLevelId;
			var __title = this.questionAllConfig[question_id].iosSelectTitle;

			var bankSelect = new IosSelect(
          1, 
					[__data],
					{
            title: __title,
            itemHeight: 50,
            itemShowCount: 3,
            oneLevelId: __oneLevelId,
            callback: function (selectOneObj) {
              that.questionAllConfig[question_id].iosSelectOneLevelId = selectOneObj.id;
              that.questionAllConfig[question_id].text = selectOneObj.value;
              $("body").removeClass("ios-select-body-class")
           }
          }
      );

		},

    goSaveData(){
      this.progressValue = 100;
      setTimeout(()=>{

        $(".mint-msgbox").css({
            "border-radius": "5px"
        })
        $(".mint-msgbox-content").css({
            "padding": "35px 20px"
        })
        
        $(".mint-msgbox-confirm").css({
            color: "#FF68B0"
        })
        
        $(".mint-msgbox-message").css({
            color: "#333"
        })

      },10)
  
      MessageBox({
        title: '',
        message: '测评提交之后将无法重新评测，请认真填写',
        confirmButtonText:"提交",
        cancelButtonText:"重新测试",
        showCancelButton: true,
        closeOnClickModal: false
      }).then((action) => {
        console.log("actio-value:" + action);
        if (action == "confirm") {
          console.log(action + "-case")

          var json ={
            sess_token: commonJs.getUrlParam("sess_token"),
            answer: JSON.stringify(this.saveUserAnswer)
          }

          axios({
						method: 'POST',
						url: 'https://api.hxsapp.com/slim/Questionnaire/saveUserAnswer',
						data: json,
						transformRequest: [function (data) {
							// Do whatever you want to transform the data
							let ret = ''
							for (let it in data) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
							}
							return ret
						}],
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {
            
            if (res.data.code == 200) {

              // Toast(res.data.msg)
              var __sess_token = commonJs.getUrlParam("sess_token");
              var __utime = commonJs.getUrlParam("utime");
              var __sign = commonJs.getUrlParam("sign");

              var __search = "?sess_token="+ __sess_token + "&utime=" + __utime + "&sign=" + __sign;

              var __url = commonJs.config.prefixUrl + "lvshou/healthyEvaluationReport" + __search;
              
              // debugger
              window.location.replace( __url )

            }else if( res.data.code == 401 ){
              Toast(res.data.msg)
              setTimeout(()=>{
                console.log("没有登录了,这里调起app的登录协议");
                commonJs.h5CallAppAction.hxsapp_showloginpage()
              },350)
            }else{
              Toast(res.data.msg)
            }
          }).catch((Error) => {
            console.log(Error)
            Toast("服务异常，请稍后再试！")
          })

        } else if (action == "cancel") {
          console.log(action + "-case")

          var __arr = window.location.search.split("?")[1].split("&");

          var __arr =  __arr.filter((val)=>{
            return val.indexOf("questionCurIndex=") < 0
          }) 
          
          var __search = "";
          if(__arr.length != 0){
            __search = "?"+__arr.join("&");
          }

          var __url = commonJs.config.prefixUrl + "lvshou/healthyEvaluation/1" + __search

          window.location.replace( __url )
        }
      });

    },


    goNextPage(question_id){
      // debugger
      if(this.questionCurid == 3 ){
        this.initIosSelectData( "3","厘米",140,230)
      }

      var __path = "";  
      if( !window.location.search ){
        __path = "/lvshou/healthyEvaluation/"+ question_id + "?questionCurIndex="+ this.questionCurIndex
      }else{
        if(window.location.search.indexOf("questionCurIndex=")>0){
           
           var __array = window.location.search.split("?")[1].split("&");

           var result = __array.filter(data => data.indexOf("questionCurIndex=") < 0)

           __path = "/lvshou/healthyEvaluation/"+ question_id + "?"+ result.join("&") + "&questionCurIndex="+ this.questionCurIndex

        }else{
          __path = "/lvshou/healthyEvaluation/"+ question_id + window.location.search + "&questionCurIndex="+ this.questionCurIndex
        }
      }

      this.pageNextHistory.push( question_id )

      this.$router.replace({
        path:__path
      })
    },
    saveUserAnswerPushData(answer_arr){
      this.saveUserAnswer.push({
        question_id: this.$route.params.question_id,        //题目id
        answer: answer_arr
      })
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

<style scoped>
  @import '../../assets/style/iosSelect.css';
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

#healthyEvaluation{
  margin: 0 auto;
  text-align: center;
  padding:0 15px 15px;
  box-sizing: border-box;
  width: 100%;

  .mt-progress{
    margin-bottom: 30px;
    // width: 100px;
    .mt-progress-runway{
      background: #F1F1F1;
      border-radius: 32px;
    }
    .mt-progress-progress{
      background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
      border-radius: 32px;
    }
  }

  .question_box{
    width: 100%;

    .question_text{
      width: 100%;
      text-align: left;
      color: #666;
      font-size: 15px;
      margin-bottom: 30px;
    }

    .nextQuestionBtn{
      margin-top:150px;
      width: 250px;
      height: 45px;
      line-height: 45px;
      color: #fff;
      font-size: 17px;
      text-align: center;
      background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
      border-radius: 31px;
      outline:none;
      border: 0 none;
    }
    .option_box{
       width: 100%;

      .option_list{
        float: left;
        width: 100%;
        padding-right:10px;
        box-sizing: border-box;

        .input_box{
          text-align: left;
          color:#666;
          width:50%;
          height:30px;
          line-height: 30px;
          font-size: 13px;
          border-bottom:1px solid #666;     
        }
        .s_box{
          display: block;
          width: 100%;
          position: relative;
          padding-left: 0px;
          box-sizing: border-box;
          text-align: left;

          // 单选按钮
          .mock_radio,
          .mock_radio_active {
            position: absolute;
            top: 0;
            left: 0px;
            width: 20px;
            height: 20px;
            background: url("./../../assets/lvshou/img/btn_danxuan_no@2x.png") top left no-repeat;
            background-size: 100% 100%;
            border: 0 none;
            z-index:1;
          } 
          .mock_radio_active {
            background: url("./../../assets/lvshou/img/btn_danxuan_yes@2x.png") top left no-repeat;
            background-size: 100% 100%;
          }
          // 多选按钮
          .mock_more_radio,
          .mock_more_radio_active {
            position: absolute;
            top: 0;
            left: 0px;
            width: 20px;
            height: 20px;
            background: url("./../../assets/lvshou/img/btn_duoxuan_no@2x.png") top left no-repeat;
            background-size: 100% 100%;
            border: 0 none;
            z-index:1;
          } 
          //选中索引样式
          .mock_more_radio_active {
            background: url("./../../assets/lvshou/img/btn_duoxuan_yes@2x.png") top left no-repeat;
            background-size: 100% 100%;
          }

          
          p {
            width: 100%;
            box-sizing: border-box;
            padding: 0 0 0 32px;
            line-height: 22px;
            font-size: 13px;
            color: #999;
            margin-bottom: 20px;
            overflow: hidden;
            &.p_2_1{
              span {
                font-size: 13px;
                color:#666;
              }
              button{
                color:blue;
              } 
            }

            &.p_8{
              input{
                width: 90%;
                text-align: left;
                color:#666;
                font-size: 13px;
                height:30px;
                line-height: 30px;
                border-bottom:1px solid #666;  
              }
            }
          }
        }
      }
    }
    .claer{
      clear: both;
    }
  }

  .layerTip{
			width:100%;
			height: 100%;
			background: rgba(0,0,0,0.4);
			position: fixed;
			left: 0; 
			top:0;
			z-index: 99;
			.rightsInterest{
				width: 60%;
				padding-top: 20px;
				background: #fff;
				margin:0 auto;
				border-radius: 7px;
				position: absolute;
				left: 50%;
				top:35%;
				margin-left: -30%;
				.closeBtn{
					width: 35px;
					height: 35px;
					position: absolute;
					right: 32px;
					top: -10px;
					background: url(./../../assets/lvshou/img/vip_explain_close.png) left top no-repeat;
					background-size:100%;
					display: none;
				}
				.rightsInterestTitle{
					height: 30px;
					text-align: center;
					color: #333;
					padding-top: 5px;
				}
				.textBox{
					min-height: 45px;
					max-height: 200px;
					overflow-y: scroll;
					-webkit-overflow-scrolling: touch;
					overflow-x: hidden;
					.cont{
						line-height: 24px;
						color: #333;
						font-size: 14px;
						text-align: center;
					}
				}
				.determine{
					width: 100%;
					height: 40px;
					line-height: 40px;
					text-align: center;		
					background: #ff68ac;
					color: #fff;
					font-size: 18px;
					border-bottom-left-radius: 7px;
					border-bottom-right-radius: 7px;
					display: block;
				}
			}
		}
}
</style>

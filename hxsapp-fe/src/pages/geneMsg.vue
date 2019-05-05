<template>
  <div>
    <preLoading v-if="!isPreLoading"></preLoading>

    <div class="genePage">
      <div id="submitBox">
        <div class="gene_msg_banner">
          <p>尊敬的客户：<br />&#12288;&#12288;您好！
            <br />&#12288;&#12288;非常感谢您决定在绿瘦健康产业集团有限公司体验基因检测服务， 为了确保服务质量，请您认真阅读。您同意且自愿向我们提供您的样 品，您这样做的主要目的是为了了解和获知自身的基因遗传学信息。基 于这些基因遗传学信息的评估意见也仅供您个人参考使用，它并不代表 已经涵盖了相关疾病或症状未来所有的风险，也并不等同于一般意义上 的临床医学检测，不能作为临床医学诊断，更不能替代临床医学诊断， 在很多情况下，基因遗传风险评估仅仅是临床医学诊断的补充，是从基 因遗传学的角度，为医生做出临床医学诊断、为健康顾问做出健康咨询 时提供依据和参考，一旦我们收到您的样品，即表明您已经阅读并理解 上述文字内容，并对此不存在任何误解和歧义。
            <br /> 对于您的理解和支持，我们在此表示衷心的感谢！
            <br />
          </p>
<!--           <div class="numberGene">
            <h1>您的基因检测编号是
              <span>123123</span>
            </h1>
            <p>请将检测编号填写在样品试管上</p>
          </div> -->
        </div>
      </div>
      <div class="gene_msg_warp">
        <div>
          <div class="gene_msg_box_title" @click="baseClick">基本信息
            <!-- <i class="iconfont" :class="boxSty.base ? 'icon-xiangshangjiantou' : 'icon-shuangxiajiantou'"></i> -->
            <i class="arrow" :class="boxSty.base ? 'shang' : 'xia'"></i>
          </div>
          <div class="base-wrapper" v-show="boxSty.base">
            <div class="gene_msg_box">
                <span class="gene_msg_box_left">单号</span>
                <div class="gene_remove_box gene_msg_box_right">
                  <input class="user_express" placeholder="请填写回寄样本快递单号 " type="text" v-model='user_express_val'></input>
                  <!-- <i class="iconfont" @click="scave" style="image"></i> -->
                  <i class="sao" @click="scave"></i>
                </div>
              </div>
              <div class="gene_msg_box">
              <!-- <span class="gene_msg_box_left">
                <i class="point" v-if="pointShow"></i>姓名</span> -->
                <p class="gene_msg_box_left">
                 <i class="point" v-if="pointShow"></i>
                 <span>姓名</span>
               </p>
                <div class="gene_remove_box gene_msg_box_right">
                  <input class="user_name" placeholder="请输入接受检人真实姓名 " maxlength="20" v-model='user_name_val'></input>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>手机</span>
                <div class="gene_remove_box gene_msg_box_right">
                  <input class="user_number" placeholder="请填写下单时的手机号" maxlength="11" type="tel" v-model='user_number_val'></input>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>性别</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_sex">请选择性别</span>
                  <i class="more" v-if="moreShow"></i>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>年龄</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr ">
                  <span class="user_age">
                    <select>
                      <option class="user_age_tip">请选择年龄</option>
                      <option v-for='n in 80' :key='n' :id='"age_" + (n+1)'>{{n}}</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left"><i class="point" v-if="pointShow"></i>婚姻</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_marry">
                    <select>
                      <option class="user_marry_tip">请选择婚姻状况</option>
                      <option>未婚</option>
                      <option>已婚</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>地址</span>
                <div class="gene_remove_box gene_msg_box_right">
                  <input class="user_address" placeholder="请填写您的邮寄地址" v-model='user_address_val'></input>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>邮箱</span>
                <div class="gene_remove_box gene_msg_box_right" style="width: 70%;">
                  <input class="user_email" placeholder="请输入您的电子邮箱" maxlength="30" v-model='user_email_val' style="width: 90%;"></input>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>日期</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_commitdate" id="showGeneral">请选择采样日期</span>
                  <i class="more" v-if="moreShow"></i>
                  <input type="hidden" name="su_id" id="suId" value="">
                  <input type="hidden" name="wei_id" id="weiId" value="">
                  <input type="hidden" name="day_id" id="dayId" value="">
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">民族</span>
                <div class="gene_remove_box gene_msg_box_right">
                  <input class="user_nation" placeholder="请填写您的民族" maxlength="16" v-model='user_nation_val'></input>
                </div>
              </div>
              
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">原籍</span>
                <div class="gene_remove_box gene_msg_box_right">
                  <input class="user_belong" placeholder="请填写原籍" v-model='user_belong_val'></input>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">职业</span>
                <div class="gene_remove_box gene_msg_box_right">
                  <input class="user_work" placeholder="请填写您的职业" v-model='user_work_val'></input>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>身高</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_height">
                    <select>
                      <option class="user_height_tip">请选择您的身高</option>
                      <option v-for='n in 281' :key='n' :id='"height_" + (n+19)'>{{n+19}}cm</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">
                  <i class="point" v-if="pointShow"></i>体重</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_weight">
                    <select>
                      <option class="user_weight_tip">请选择您的体重</option>
                      <option v-for='n in 491' :key='n' :id='"height_" + (n+9)'>{{n+9}}kg</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">腰围</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_waist">
                    <select>
                      <option class="user_waist_tip">请选择您的腰围</option>
                      <option v-for='n in 281' :key='n' :id='"waist_" + (n+19)'>{{n+19}}cm</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">胸围</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_bust">
                    <select>
                      <option class="user_bust_tip">请选择您的胸围</option>
                      <option v-for='n in 281' :key='n' :id='"bust_" + (n+19)'>{{n+19}}cm</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">臀围</span>
                <div class="gene_remove_box gene_msg_box_right gene_msg_box_right_mr">
                  <span class="user_hip">
                    <select>
                      <option class="user_hip_tip">请选择您的臀围</option>
                      <option v-for='n in 281' :key='n' :id='"hip_" + (n+19)'>{{n+19}}cm</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
              <div class="gene_msg_box">
                <span class="gene_msg_box_left">血型</span>
                <div class="gene_remove_box gene_msg_box_right_mr gene_msg_box_right">
                  <span class="user_blood">
                    <select>
                      <option class="user_blood_tip">请选择您的血型</option>
                      <option>A型</option>
                      <option>B型</option>
                      <option>AB型</option>
                      <option>O型</option>
                    </select>
                    <i class="more" v-if="moreShow"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="gene_msg_box_title" @click="moreClick" id="moreWrapper">点击填写更多信息(选填)
            <!-- <i class="iconfont" :class="boxSty.more ? 'icon-xiangshangjiantou' : 'icon-shuangxiajiantou'"></i> -->
            <i class="arrow" :class="boxSty.more ? 'shang' : 'xia'"></i>
          </div> 
          <div v-show="boxSty.more" class="more-wrapper">
            <div class="gene_msg_box more_box" v-for="(more, index) in moreBox" :key="index">
                <h6 v-if="more.noNum" style="font-weight: bold;">{{more.name}} : </h6>
                <h6 v-else-if="more.delNum">{{index+1-more.delNum}}. {{more.name}} : </h6>
                <h6 v-else>{{index+1}}. {{more.name}} : </h6>
                <ls-form :form-options="more.opts" :style="index > 12 && index !== 16  && index !== 22  && index !== 23? 'margin-bottom: 30px;' : ''"></ls-form>
            </div>
          </div>
          
        <div class="gene_msg_bottom" v-if='pageBottom'>
          <p class="gene_msg_bottom_ico">
            <img class="check_state nocheck" :src="checkIco" @click='checking'></img>
            <span>我确认以上信息是本人如实填写</span>
          </p>
          <p class="gene_msg_commit_button" id="commit" @click='commitList'>确认提交</p>
        </div>
      </div>
    </div>

    <!--性别浮层-->
    <div id="sex_choose" v-show='sexBox'>
      <div class="sex_choose_top">
        <p class="sex_choose_man">男</p>
        <p class="sex_choose_woman">女</p>
      </div>
      <div class="sex_choose_bottom">
        <p class="sex_choose_cancel" @click='sexBox = false'>取消</p>
      </div>
    </div>

    <!--表单错误浮层-->
    <div id="commit_error">
      <div class="commit_error_top">
        <p id="error_msg_title"></p>
        <p id="error_msg">带 * 的信息要填写完整哦！</p>
        <p id="error_msg_cancel">确定</p>
      </div>
    </div>

    <!-- <mt-button @click="testdata">test</mt-button> -->

    <!--iosselect组件位置-->
    <div class="container"></div>

    <!-- 提交成功弹出页面 -->
    <div class="flexBox">
      <header class="submitSuccess"></header>
      <section>
        <!-- <p>提交成功</p> -->
        <div class="sNumber">
          <p>您的基因检测编号是</p>
          <p class='numberDetail'></p>
        </div>
        <div class="remind">
          温馨提示：为了更好地记录检测结果，请将检测编号填写在样品试管上（如下图所示）
          <img src="http://app.hxsapp.com/html/img/tube.png" alt="">
        </div>
      </section>
    </div>

  </div>
</template>
<script>
import common from "@/util/common.js";
import { Toast } from "mint-ui";
import axios from "axios";
import IosSelect from "iosselect";
import timejs from "./../assets/img/gene_msg/time.js";
import { urlGet } from 'Utils/common'

// 初始化loadding的组件
import preLoading from "@/components/preLoading";
// 引入ls-form
import LsForm from '@/components/lsForm'

import LsFetch from 'API/common'

export default {
  name: "geneMsg",
  data() {
    return {
      moreBox: [ // 更多信息
        {
          name: '高血压',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[0]['opts'][0].type === 'default' && (this.moreBox[0]['opts'][0].type = 'primary', this.moreBox[0]['opts'][1].type = 'default') || (this.moreBox[0]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '血压',
                  isType: 'input',
                  input: '',
                  placeholder: 'mmHg'
                },
                {
                  name: '心率',
                  isType: 'input',
                  input: '',
                  placeholder: '次/分'
                },
                {
                  name: '呼吸',
                  isType: 'input',
                  input: '',
                  placeholder: '次/分'
                },
                {
                  name: '服药情况',
                  isType: 'textarea',
                  input: '',
                  placeholder: '若有服药，请填写服药时间、药名、用量；若无，则不填写'
                }
              ],
              click: () => {
                this.moreBox[0]['opts'][1].type === 'default' && (this.moreBox[0]['opts'][1].type = 'primary', this.moreBox[0]['opts'][0].type = 'default') || (this.moreBox[0]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '高血脂',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[1]['opts'][0].type === 'default' && (this.moreBox[1]['opts'][0].type = 'primary', this.moreBox[1]['opts'][1].type = 'default') || (this.moreBox[1]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '服药情况',
                  isType: 'textarea',
                  input: '',
                  placeholder: '若有服药，请填写服药时间、药名、用量；若无，则不填写'
                }
              ],
              click: () => {
                this.moreBox[1]['opts'][1].type === 'default' && (this.moreBox[1]['opts'][1].type = 'primary', this.moreBox[1]['opts'][0].type = 'default') || (this.moreBox[1]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '糖尿病',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[2]['opts'][0].type === 'default' && (this.moreBox[2]['opts'][0].type = 'primary', this.moreBox[2]['opts'][1].type = 'default') || (this.moreBox[2]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '空腹血糖',
                  isType: 'input',
                  input: '',
                  placeholder: 'mmHg'
                },
                {
                  name: '服药情况',
                  isType: 'textarea',
                  input: '',
                  placeholder: '若有服药，请填写服药时间、药名、用量；若无，则不填写'
                }
              ],
              click: () => {
                this.moreBox[2]['opts'][1].type === 'default' && (this.moreBox[2]['opts'][1].type = 'primary', this.moreBox[2]['opts'][0].type = 'default') || (this.moreBox[2]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '痛风',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[3]['opts'][0].type === 'default' && (this.moreBox[3]['opts'][0].type = 'primary', this.moreBox[3]['opts'][1].type = 'default') || (this.moreBox[3]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '尿酸(umol/L)',
                  isType: 'input',
                  input: '',
                  placeholder: 'umol/L'
                },
                {
                  name: '发作情况',
                  isType: 'textarea',
                  input: '',
                  placeholder: '请描述发作情况'
                }
              ],
              click: () => {
                this.moreBox[3]['opts'][1].type === 'default' && (this.moreBox[3]['opts'][1].type = 'primary', this.moreBox[3]['opts'][0].type = 'default') || (this.moreBox[3]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '肝炎/肝脏疾病史',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[4]['opts'][0].type === 'default' && (this.moreBox[4]['opts'][0].type = 'primary', this.moreBox[4]['opts'][1].type = 'default') || (this.moreBox[4]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '肝功能',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '好'
                    },
                    {
                      name: '中'
                    },
                    {
                      name: '差'
                    }
                  ]
                },
                {
                  name: '发作情况',
                  isType: 'textarea',
                  input: '',
                  placeholder: '请描述发作情况'
                }
              ],
              click: () => {
                this.moreBox[4]['opts'][1].type === 'default' && (this.moreBox[4]['opts'][1].type = 'primary', this.moreBox[4]['opts'][0].type = 'default') || (this.moreBox[4]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '脂肪肝',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[5]['opts'][0].type === 'default' && (this.moreBox[5]['opts'][0].type = 'primary', this.moreBox[5]['opts'][1].type = 'default') || (this.moreBox[5]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '脂肪肝程度',
                  isType: 'input',
                  input: '',
                  placeholder: 'umol/L'
                },
                {
                  name: '服药情况',
                  isType: 'textarea',
                  input: '',
                  placeholder: '若有服药，请填写服药时间、药名、用量；若无，则不填写'
                }
              ],
              click: () => {
                this.moreBox[5]['opts'][1].type === 'default' && (this.moreBox[5]['opts'][1].type = 'primary', this.moreBox[5]['opts'][0].type = 'default') || (this.moreBox[5]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '肾脏疾病史',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[6]['opts'][0].type === 'default' && (this.moreBox[6]['opts'][0].type = 'primary', this.moreBox[6]['opts'][1].type = 'default') || (this.moreBox[6]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '肾功能不全',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无',
                      optName: '肾功能不全无'
                    },
                    {
                      name: '有',
                      optName: '肾功能不全有'
                    }
                  ]
                },
                {
                  name: '肾功能',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无',
                      optName: '肾功能无'
                    },
                    {
                      name: '有',
                      optName: '肾功能有'
                    }
                  ]
                },
                {
                  name: '描述',
                  isType: 'textarea',
                  input: '',
                  placeholder: '请描述肾功能情况'
                }
              ],
              click: () => {
                this.moreBox[6]['opts'][1].type === 'default' && (this.moreBox[6]['opts'][1].type = 'primary', this.moreBox[6]['opts'][0].type = 'default') || (this.moreBox[6]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '其他病史',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[7]['opts'][0].type === 'default' && (this.moreBox[7]['opts'][0].type = 'primary', this.moreBox[7]['opts'][1].type = 'default') || (this.moreBox[7]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '其他病史',
                  isType: 'textarea',
                  input: '',
                  placeholder: '请填写其他病史'
                }
              ],
              click: () => {
                this.moreBox[7]['opts'][1].type === 'default' && (this.moreBox[7]['opts'][1].type = 'primary', this.moreBox[7]['opts'][0].type = 'default') || (this.moreBox[7]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '已知过敏史',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[8]['opts'][0].type === 'default' && (this.moreBox[8]['opts'][0].type = 'primary', this.moreBox[8]['opts'][1].type = 'default') || (this.moreBox[8]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '药物',
                  isType: 'input',
                  input: '',
                  placeholder: ''
                },
                {
                  name: '食物',
                  isType: 'input',
                  input: '',
                  placeholder: ''
                },
                {
                  name: '保健品',
                  isType: 'input',
                  input: '',
                  placeholder: ''
                }
              ],
              click: () => {
                this.moreBox[8]['opts'][1].type === 'default' && (this.moreBox[8]['opts'][1].type = 'primary', this.moreBox[8]['opts'][0].type = 'default') || (this.moreBox[8]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '将来是否还要小孩',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '是',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[9]['opts'][0].type === 'default' && (this.moreBox[9]['opts'][0].type = 'primary', this.moreBox[9]['opts'][1].type = 'default') || (this.moreBox[9]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '否',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: rgb(220, 219, 219); width: 100%; height: auto; padding: 8px 0 0 0;',
              click: () => {
                this.moreBox[9]['opts'][1].type === 'default' && (this.moreBox[9]['opts'][1].type = 'primary', this.moreBox[9]['opts'][0].type = 'default') || (this.moreBox[9]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '生育情况',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '男',
              isMargin: true,
              sty: 'position: absolute; top: 0; left: 0;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '精液质量',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '好'
                    },
                    {
                      name: '中'
                    },
                    {
                      name: '差'
                    }
                  ]
                },
                {
                  name: '性欲望减退',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                }
              ],
              click: () => {
                this.moreBox[10]['opts'][0].type === 'default' && (this.moreBox[10]['opts'][0].type = 'primary', this.moreBox[10]['opts'][1].type = 'default') || (this.moreBox[10]['opts'][0].type = 'default')
                this.moreBox[10]['opts'][1].sty = 'position: absolute; top: -121px; left: 86px;'
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '女',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '月经',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '正常'
                    },
                    {
                      name: '失调'
                    }
                  ]
                },
                {
                  name: '性欲望减退',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                },
                {
                  name: '多囊卵巢综合征',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                }
              ],
              click: () => {
                this.moreBox[10]['opts'][1].type === 'default' && (this.moreBox[10]['opts'][1].type = 'primary', this.moreBox[10]['opts'][0].type = 'default') || (this.moreBox[10]['opts'][1].type = 'default')
                this.moreBox[10]['opts'][1].sty = 'position: absolute; top: -38px; left: 86px;'
              }

            }
          ]
        },
        {
          name: '内分泌疾病',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '无',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[11]['opts'][0].type === 'default' && (this.moreBox[11]['opts'][0].type = 'primary', this.moreBox[11]['opts'][1].type = 'default') || (this.moreBox[11]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '有',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '便秘',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                },
                {
                  name: '甲减',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                },
                {
                  name: '胆结石',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                },
                {
                  name: '口打鼾',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                },
                {
                  name: '胆囊切除',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                },
                {
                  name: '其他内分泌疾病',
                  isType: 'label',
                  input: '',
                  placeholder: '',
                  labelList: [
                    {
                      name: '无'
                    },
                    {
                      name: '有'
                    }
                  ]
                },
                {
                  name: '描述',
                  isType: 'textarea',
                  input: '',
                  placeholder: '请进行描述'
                }
              ],
              click: () => {
                this.moreBox[11]['opts'][1].type === 'default' && (this.moreBox[11]['opts'][1].type = 'primary', this.moreBox[11]['opts'][0].type = 'default') || (this.moreBox[11]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '食用保健品情况',
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '从未食用',
              sty: 'position: absolute; top: 0; left: 0;',
              click: () => {
                this.moreBox[12]['opts'][0].type === 'default' && (this.moreBox[12]['opts'][0].type = 'primary', this.moreBox[12]['opts'][1].type = 'default') || (this.moreBox[12]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '曾经食用',
              sty: 'position: absolute; top: -38px; left: 86px;',
              moreSty: 'background-color: #fff; width: 100%; height: auto; padding: 8px 0 0 0;',
              more: [
                {
                  name: '正在食用产品名称',
                  isType: 'input',
                  input: '',
                  placeholder: ''
                }
              ],
              click: () => {
                this.moreBox[12]['opts'][1].type === 'default' && (this.moreBox[12]['opts'][1].type = 'primary', this.moreBox[12]['opts'][0].type = 'default') || (this.moreBox[12]['opts'][1].type = 'default')
              }

            }
          ]
        },
        {
          name: '家族肥胖史描述',
          opts: [
            {
              isType: 'textarea',
              input: '',
              placeholder: '请进行描述'
            }
          ]
        },
        {
          name: '减肥史描述',
          opts: [
            {
              isType: 'textarea',
              input: '',
              placeholder: '请进行描述'
            }
          ]
        },
        {
          name: '减肥药物使用情况描述',
          opts: [
            {
              isType: 'textarea',
              input: '',
              placeholder: '请进行描述'
            }
          ]
        },
        {
          name: '初步计算活动量',
          noNum: true,
          opts: [
          ]
        },
        {
          name: '您的工作强度',
          delNum: 1,
          opts: [
            {
              isType: 'button',
              type: 'default',
              desction: '备注：75%时间坐或站立，25%时间站着活动，如:办公室工作等',
              size: 'small',
              disabled: false,
              name: '轻度',
              sty: 'display: inline-block; margin-bottom:10px;vertical-align: middle;',
              click: () => {
                this.moreBox[17]['opts'][0].type === 'default' && (this.moreBox[17]['opts'][0].type = 'primary', this.moreBox[17]['opts'][1].type = 'default', this.moreBox[17]['opts'][2].type = 'default') || (this.moreBox[17]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              desction: '备注：25%时间坐或站立，75%时间从事中等强度的职业活动，如:学生日常活动、机动车驾驶等',
              size: 'small',
              disabled: false,
              name: '中度',
              sty: 'display: inline-block; margin-bottom:10px;vertical-align: middle;',
              click: () => {
                this.moreBox[17]['opts'][1].type === 'default' && (this.moreBox[17]['opts'][1].type = 'primary', this.moreBox[17]['opts'][0].type = 'default', this.moreBox[17]['opts'][2].type = 'default') || (this.moreBox[17]['opts'][1].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              desction: '备注：40%时间坐或站立，60%时间从事重强度的特殊职业活动，如:舞蹈、体育活动等',
              size: 'small',
              disabled: false,
              name: '重度',
              sty: 'display: inline-block; margin-bottom:10px;vertical-align: middle;',
              click: () => {
                this.moreBox[17]['opts'][2].type === 'default' && (this.moreBox[17]['opts'][2].type = 'primary', this.moreBox[17]['opts'][1].type = 'default', this.moreBox[17]['opts'][0].type = 'default') || (this.moreBox[12]['opts'][2].type = 'default')
              }
            }
          ]
        },
        {
          name: '您每周的工作时间和坐立时间',
          delNum: 1,
          opts: [
            {
              isType: 'inputNotTitle',
              input: '',
              placeholder: '请输入工作时间，小时/天'
            },
            {
              isType: 'inputNotTitle',
              input: '',
              placeholder: '请输入坐立时间，小时/天'
            }
          ]
        },
        {
          name: '您最近3个月的出行方式主要是',
          delNum: 1,
          opts: [
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '步行',
              sty: 'margin-bottom:10px;',
              inlineDisplay: true,
              click: () => {
                this.moreBox[19]['opts'][0].type === 'default' &&
                  (this.moreBox[19]['opts'][0].type = 'primary', this.moreBox[19]['opts'][1].type = 'default', this.moreBox[19]['opts'][2].type = 'default', this.moreBox[19]['opts'][3].type = 'default', this.moreBox[19]['opts'][4].type = 'default') ||
                  (this.moreBox[19]['opts'][0].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '骑自行车',
              sty: ' margin-bottom:10px;',
              inlineDisplay: true,
              click: () => {
                this.moreBox[19]['opts'][1].type === 'default' &&
                  (this.moreBox[19]['opts'][1].type = 'primary', this.moreBox[19]['opts'][0].type = 'default', this.moreBox[19]['opts'][2].type = 'default', this.moreBox[19]['opts'][3].type = 'default', this.moreBox[19]['opts'][4].type = 'default') ||
                  (this.moreBox[19]['opts'][1].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '公共交通',
              sty: ' margin-bottom:10px;',
              inlineDisplay: true,
              click: () => {
                this.moreBox[19]['opts'][2].type === 'default' && (this.moreBox[19]['opts'][2].type = 'primary', this.moreBox[19]['opts'][1].type = 'default', this.moreBox[19]['opts'][0].type = 'default', this.moreBox[19]['opts'][3].type = 'default', this.moreBox[19]['opts'][4].type = 'default') || (this.moreBox[12]['opts'][2].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '坐私家车',
              sty: ' margin-bottom:10px;',
              inlineDisplay: true,
              click: () => {
                this.moreBox[19]['opts'][3].type === 'default' &&
                  (this.moreBox[19]['opts'][3].type = 'primary', this.moreBox[19]['opts'][0].type = 'default', this.moreBox[19]['opts'][2].type = 'default', this.moreBox[19]['opts'][1].type = 'default', this.moreBox[19]['opts'][4].type = 'default') ||
                  (this.moreBox[19]['opts'][3].type = 'default')
              }
            },
            {
              isType: 'button',
              type: 'default',
              size: 'small',
              disabled: false,
              name: '其他',
              sty: 'margin-bottom:10px;',
              inlineDisplay: true,
              click: () => {
                this.moreBox[19]['opts'][4].type === 'default' && (this.moreBox[19]['opts'][4].type = 'primary', this.moreBox[19]['opts'][1].type = 'default', this.moreBox[19]['opts'][0].type = 'default', this.moreBox[19]['opts'][2].type = 'default', this.moreBox[19]['opts'][3].type = 'default') ||
                  (this.moreBox[19]['opts'][4].type = 'default')
              }
            }
          ]
        },
        {
          name: '您平均每天出行的时间是',
          delNum: 1,
          opts: [
            {
              isType: 'inputNotTitle',
              input: '',
              placeholder: '分钟'
            }
          ]
        },
        {
          name: '您平均每天做家务的时间是',
          delNum: 1,
          opts: [
            {
              isType: 'inputNotTitle',
              input: '',
              placeholder: '小时'
            }
          ]
        },
        {
          name: '每日膳食习惯',
          noNum: true,
          opts: [
          ]
        },
        {
          name: '饮食偏好',
          delNum: 2,
          opts: [
            {
              name: '主食',
              isType: 'label',
              input: '',
              placeholder: '',
              lineNo: true,
              labelList: [
                {
                  name: '米饭'
                },
                {
                  name: '面食'
                }
              ]
            },
            {
              name: '副食',
              isType: 'label',
              input: '',
              placeholder: '',
              lineNo: true,
              labelList: [
                {
                  name: '肉类'
                },
                {
                  name: '蔬菜'
                }
              ]
            }
          ]
        }
      ],
      boxSty: { // 信息框的样式
        base: true,
        more: false,
      },
      isPreLoading: false,
      userInfo: {
        sess_token: ""
      },
      isAdd: urlGet('isAdd'), // 是否新增 1为新增  0 非新增
      checkIco: require("./../assets/img/gene_msg/check.png"),
      checked: false,
      pageBottom: true,
      moreShow: true,
      pointShow: true,
      sexBox: false,
      // 表单数据
      user_name_val: "",
      user_number_val: "",
      user_sex_val: "",
      user_age_val: "",
      user_address_val: "",
      user_email_val: "",
      user_commitdate_val: "",
      user_express_val: "",
      user_nation_val: "",
      user_marry_val: "",
      user_belong_val: "",
      user_work_val: "",
      user_height_val: "",
      user_weight_val: "",
      user_waist_val: "",
      user_bust_val: "",
      user_hip_val: "",
      user_blood_val: ""
    };
  },
  mounted() {
    document.title = "基因检测知情同意书";

    // 基因检测
    common.buriedPoint({
      access_occurred_type: 260505, //发生访问的【页面】类型
      access_occurred_type_id: "", //发生访问的【页面】类型ID
      previous_event_type_obj: "", //【事件】对象类型
      previous_event_type_obj_id: "", //【事件】对象类型ID
      previous_content_sort: "" //【事件】事件参数
    });

    // 用户信息
    this.userInfo.sess_token = common.getUrlParam("sess_token");
    this.getGeneAgreement();
    this.remFix();
    // this.appendLine();
    this.isPreLoading = true;
  },
  components: {
    preLoading,
    LsForm
  },
  methods: {
    testdata() {
      console.log(this.moreBox)
    },
    // 调起扫码协议
    scave() {
      let that = this
      // 扫描完成的回调函数
      window.returnErCode = data => {
        this.user_express_val = data
      }
      window.location.href = 'https://hxsapp_scanordercode'
    },
    // 基本信息 点击事件
    baseClick() {
      let _base = this.boxSty.base
      !_base && (this.boxSty.base = true) || (this.boxSty.base = false)
    },
    // 更多信息 点击事件
    moreClick() {
      this.boxSty.base = false
      !this.boxSty.more && (
        this.boxSty.more = true

      ) || (this.boxSty.more = false)

      this.$nextTick(() => {
        const div = document.getElementById("moreWrapper");
        div.scrollIntoView()
      })

    },
    appendLine() {
      $(".gene_msg_box").after(
        '<div class="bottomBorder" style="height:0;width:calc(96%-2px);border:0.5px solid rgba(129,141,207,0.20);margin-left:4%;"></div>'
      );
    },
    getGeneAgreement() {

      // 初始化icon
      // this.enterMode();
      // this.iosselectCom();

      if (!urlGet('id')) {
        this.enterMode();
        this.iosselectCom();
        return
      }

      if (Number(this.isAdd) === 1) {
        this.enterMode();
        this.iosselectCom();
        return
      }

      let _this = this;
      let sessToken = common.getUrlParam("sess_token");
      let json = {
        sess_token: sessToken,
        id: urlGet('id')
        // express_num: urlGet('express_num')
      };
      axios
        .get("https://api.hxsapp.com/slim/gene/getGeneAgreementById", {
          // .get("https://api.hxsapp.com/slim/gene/getGeneAgreementByExpressNum", {
          // .get("https://api.hxsapp.com/slim/gene/getGeneAgreement", {
          params: json
        })
        .then(res => {
          console.log('res  ', res)
          if (res.data.code == 401) {
            this.enterMode();
            this.iosselectCom();
            common.h5CallAppAction.hxsapp_showloginpage();
          } else if (res.data.code == 200) {
            // 如果data数据为空表示用户未填写过基因检测知情同意书，所以要放出让用户填写的按钮，有数据则隐藏填
            // 主入口方法，state_id=0为填写报告,使用提交接口;state_id=1为查看报告,使用读取接口
            // debugger

            var __state_id = res.data && res.data.data ? 1 : 0;
            console.log("__state_id:" + __state_id);

            if (__state_id === 1 && !Number(_this.isAdd)) {
              this.readingMode();
              // 更多
              this.moreBox = JSON.parse(res.data.data.pathological)
            } else {
              this.enterMode();
              this.iosselectCom();
            }

            // window.location.replace('https://app.hxsapp.com/html/geneMsg.html?sess_token=' + sessToken + '&state_id=' + __state_id);
          } else {
            if (res.data.msg) {
              Toast(res.data.msg);
            } else {
              // Toast("加载数据异常，请稍后再试！");
              console.log(res.data)
              console.log('error')
            }
          }
        })
        .catch(error => {
          // Toast("加载数据异常，请稍后再试！");
          console.log(res.data)
          console.log('error')
        });
    },
    remFix() {
      !(function () {
        function e() {
          var e = document.documentElement.clientWidth;
          var t = document.querySelector("html");
          var f = e / 25;
          window.fontSize = f;
          t.style.fontSize = f + "px";
        }
        e();
        window.addEventListener("resize", e);
      })();
    },
    readingMode() {
      var _this = this;
      //查看状态布局修改
      _this.pageBottom = false;
      _this.moreShow = false;
      _this.pointShow = false;

      $(".gene_msg_warp").css("padding-bottom", "60px");
      $(".gene_msg_box_right").css("float", "none");
      $(".gene_msg_box").css("display", "flex");

      $(".more_box").css("display", "block");

      $(".gene_msg_box_left").css("width", "7rem");
      $(".gene_msg_box_right input").css("text-align", "left");

      $(".gene_remove_box span").css("color", "#666");
      //填充数据
      var loadData = {
        sess_token: common.getUrlParam("sess_token"),
        id: urlGet('id')
      };
      $.getJSON(
        "https://api.hxsapp.com" + "/slim/gene/getGeneAgreementById",
        loadData,
        function (result) {
          //格式化数据
          var sex_load, marriage_load, year_load, month_load, day_load;
          if (result.code == 200) {
            if (result.data.sex == "1") {
              sex_load = "男";
            } else {
              sex_load = "女";
            }
            var marriage = Number(result.data.marriage);
            if (marriage == 1) {
              marriage_load = "已婚";
            } else if (marriage == 0) {
              marriage_load = "未婚";
            } else {
              marriage_load = "未知";
            }
            year_load = result.data.sample_date.substr(0, 4);
            month_load = result.data.sample_date.substr(4, 2);
            day_load = result.data.sample_date.substr(6, 2);

            $(".user_name")
              .parent()
              .html("<p>&nbsp;" + result.data.name + "</p>");
            $(".user_number")
              .parent()
              .html("<p>&nbsp;" + result.data.mobile + "</p>");
            $(".user_sex")
              .parent()
              .html("<p>&nbsp;" + sex_load + "</p>");
            $(".user_age")
              .parent()
              .html("<p>&nbsp;" + result.data.age + " 岁</p>");
            $(".user_address")
              .parent()
              .html("<p>&nbsp;" + result.data.address + "</p>");
            $(".user_email")
              .parent()
              .html("<p style='float:left;'>&nbsp;" + result.data.email + "</p>");
            $(".user_commitdate")
              .parent()
              .html(
                "<p>&nbsp;" +
                year_load +
                "年" +
                month_load +
                "月" +
                day_load +
                "日</p>"
              );
            $(".user_express")
              .parent()
              .html("<p>&nbsp;" + result.data.express_num + "</p>");
            $(".user_nation")
              .parent()
              .html("<p>&nbsp;" + result.data.nationality + "</p>");
            $(".user_marry")
              .parent()
              .html("<p>&nbsp;" + marriage_load + "</p>");
            $(".user_belong")
              .parent()
              .html("<p>&nbsp;" + result.data.household + "</p>");
            $(".user_work")
              .parent()
              .html("<p>&nbsp;" + result.data.vocation + "</p>");
            $(".user_height")
              .parent()
              .html("<p>&nbsp;" + result.data.height + " cm</p>");
            $(".user_weight")
              .parent()
              .html("<p>&nbsp;" + result.data.weight + " kg</p>");
            $(".user_waist")
              .parent()
              .html("<p>&nbsp;" + result.data.waistline + " cm</p>");
            $(".user_bust")
              .parent()
              .html("<p>&nbsp;" + result.data.chestline + " cm</p>");
            $(".user_hip")
              .parent()
              .html("<p>&nbsp;" + result.data.hipline + " cm</p>");
            $(".user_blood")
              .parent()
              .html("<p>&nbsp;" + result.data.blood_type + " 型</p>");

            if (result.data.user_id) {
              $(".gene_msg_banner h1 span").html(result.data.user_id);
              $(".numberGene").css("display", "block");
            }
          } else {
            $(".gene_remove_box").html("<p>&nbsp;</p>");
          }
        }
      );
    },
    enterMode() {
      var _this = this;
      $(".user_sex").on("click", function () {
        _this.sexBox = true;
      });
      $(".sex_choose_man").on("click", function () {
        $(".user_sex").html('男');
        $(".user_sex").css("color", "#666");
        _this.sexBox = false;
        _this.user_sex_val = 1;
      });
      $(".sex_choose_woman").on("click", function () {
        $(".user_sex").html('女');
        $(".user_sex").css("color", "#666");
        _this.sexBox = false;
        _this.checkinguser_sex_val = 0;
      });

      $(".user_marry").on("click", function () {
        if (
          $(".user_marry")
            .find("select")
            .val() == "已婚"
        ) {
          _this.user_marry_val = "1";
        } else if (
          $(".user_marry")
            .find("select")
            .val() == "未婚"
        ) {
          _this.user_marry_val = "0";
        } else {
          _this.user_marry_val = "";
        }
      });
      $(
        ".user_age,.user_marry,.user_height,.user_weight,.user_waist,.user_bust,.user_hip,.user_blood"
      )
        .find("select")
        .on("click", function () {
          $(this).css("color", "#666");
        });
      // $(".user_marry")
      //   .find("select")
      //   .on("click", function() {
      //     $(this).css("color", "#666");
      //   });
      // $(".user_height")
      //   .find("select")
      //   .on("click", function() {
      //     $(this).css("color", "#666");
      //   });
      // $(".user_weight")
      //   .find("select")
      //   .on("click", function() {
      //     $(this).css("color", "#666");
      //   });
    },
    iosselectCom() {
      var _this = this;
      //iosselect配置
      var showGeneralDom = document.querySelector("#showGeneral");
      var year = document.querySelector("#yearId");
      var month = document.querySelector("#monthId");
      var day = document.querySelector("#dayId");

      showGeneralDom.addEventListener("click", function () {
        var scrollLong = $(window).scrollTop();
        var suValue = showGeneralDom.dataset["su_value"];
        var weiValue = showGeneralDom.dataset["wei_value"];
        var dayValue = showGeneralDom.dataset["day_value"];
        var sanguoSelect = new IosSelect(
          3,
          [timejs.suData, timejs.weiData, timejs.dayData],
          {
            title: "采样日期",
            itemHeight: 35,
            oneLevelId: "2015",
            twoLevelId: "06",
            threeLevelId: "day_10",
            itemShowCount: 5,
            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
              /*year.value = selectOneObj.id;
              month.value = selectTwoObj.id;*/

              $(window).scrollTop(scrollLong); // 补坑
              $("#showGeneral")
                .parent()
                .css('padding-right', '15px')
                .removeClass("gene_msg_box_right_mr"); // 补坑

              showGeneralDom.innerHTML =
                selectOneObj.value +
                selectTwoObj.value +
                selectThreeObj.value +
                '<i class="more"></i>';

              showGeneralDom.dataset["su_id"] = selectOneObj.id;
              showGeneralDom.dataset["su_value"] = selectOneObj.value;
              showGeneralDom.dataset["wei_id"] = selectTwoObj.id;
              showGeneralDom.dataset["wei_value"] = selectTwoObj.value;
              showGeneralDom.dataset["day_id"] = selectTwoObj.id;
              showGeneralDom.dataset["day_value"] = selectTwoObj.value;

              _this.user_commitdate_val =
                selectOneObj.value.substring(0, 4) +
                selectTwoObj.value.substring(0, 2) +
                selectThreeObj.value.substring(0, 2);
            }
          }
        );
      });
      //iosselect控件补坑
      $(".user_commitdate").on("click", function () {
        $(window).scrollTop("700");
        $(this).css("color", "#666");
      });
    },
    commitList() {
      var _this = this;
      var maryyR = $(".user_marry")
        .find("select")
        .val();
      _this.user_marry_val = maryyR == "已婚" ? "1" : maryyR == "未婚" ? "0" : "";
      var json = {
        name: _this.user_name_val,
        mobile: _this.user_number_val,
        sex: _this.user_sex_val,
        age: $(".user_age")
          .find("select")
          .val(),
        address: _this.user_address_val,
        email: _this.user_email_val,
        sample_date: _this.user_commitdate_val,
        express_num: _this.user_express_val,
        nationality: _this.user_nation_val,
        marriage: _this.user_marry_val,
        household: _this.user_belong_val,
        vocation: _this.user_work_val,
        height: $(".user_height")
          .find("select")
          .val()
          .replace(/[^0-9]/gi, ""),
        weight: $(".user_weight")
          .find("select")
          .val()
          .replace(/[^0-9]/gi, ""),
        waistline: $(".user_waist")
          .find("select")
          .val()
          .replace(/[^0-9]/gi, ""),
        chestline: $(".user_bust")
          .find("select")
          .val()
          .replace(/[^0-9]/gi, ""),
        hipline: $(".user_hip")
          .find("select")
          .val()
          .replace(/[^0-9]/gi, ""),
        blood_type: $(".user_blood")
          .find("select")
          .val()
          .replace(/[^A-Za-z]/gi, ""),
        sess_token: _this.userInfo.sess_token
      };

      if (
        json.name == "" ||
        json.mobile == "" ||
        $(".user_sex select").val() == "请选择性别" ||
        json.age == "请选择年龄" ||
        json.email == "" ||
        json.address == "" ||
        json.sample_date == "" ||
        $(".user_height select").val() == "请选择您的身高" ||
        $(".user_weight select").val() == "请选择您的体重" 
      ) {
        Toast("带 * 的信息要填写完整哦！", "信息未填完");
        return; //不通过验证就不会提交接口
      } else if (!_this.checked) {
        Toast("请勾选确认信息是个人如实填写", "请确认信息");
        return;
      } else {
        /*$.each(json, function(key, i) {
          console.log(key + '=' + i);
        });*/
      }

      if (!/^1[0-9][0-9]\d{8}$/.test(json.mobile)) {
        Toast('不是完整的11位手机号或者正确的手机号前七位')
        return
      }

      const emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
      if (!emailReg.test(json.email)) {
        Toast('邮箱地址不正确!')
        return
      }

      if (json.express_num && !/\w+/.test(json.express_num)) {
        Toast('快递单号输入错误!')
        return
      }

      // 传递自定义字段
      // let _data = {}
      // _data['data'] = json
      json['pathological'] = JSON.stringify(this.moreBox)

      // 加入版本号
      json['app_version'] = '3.7.0'

      LsFetch({
        url: 'https://api.hxsapp.com/slim/gene/saveGeneAgreement?sess_token=' + _this.userInfo.sess_token,
        type: 'post',
        data: json
      }).then(result => {
        console.log(result)
        Toast('提交成功!')
        window.location.href="https://hxsapp_comeback"
      })

      // $.getJSON(
      //   "https://api.hxsapp.com/" + "/slim/gene/saveGeneAgreement",
      //   json,
      //   function (result) {
      //     if (result.code == 200) {
      //       Toast("提交成功");
      //       document.title = "提交成功";
      //       //提交成功后跳转提示成功页面
      //       //跳转我的报告页面
      //       $(".numberDetail").html(result.user_id);
      //       setTimeout(function () {
      //         $(".genePage").css("display", "none");
      //         $(".flexBox").css("display", "block");
      //       }, 1000);

      //       common.buriedPoint({
      //         access_occurred_type: 260507, //发生访问的【页面】类型
      //         access_occurred_type_id: "", //发生访问的【页面】类型ID
      //         previous_event_type_obj: "", //【事件】对象类型
      //         previous_event_type_obj_id: "", //【事件】对象类型ID
      //         previous_content_sort: "" //【事件】事件参数
      //       });
      //     } else {
      //       Toast("提交失败了,基因报告无法重复提交");
      //       console.log("请求服务器失败");
      //     }
      //   }
      // );
    },
    checking() {
      var _this = this;
      if (this.checked) {
        this.checked = false;
        this.checkIco = require("./../assets/img/gene_msg/check.png");
        // this.checkIco = "https://app.hxsapp.com/html/img/gene_msg/check.png";
      } else {
        this.checked = true;
        this.checkIco = require("./../assets/img/gene_msg/checked.png");
        // this.checkIco = "https://app.hxsapp.com/html/img/gene_msg/checked.png";
      }
    },
    //日期截取
    subDate(str) {
      var year = str.substr(0, 4);
      var month = str.substr(4, 2);
      var day = str.substr(6, 2);
      var outer = year + "年" + month + "月" + day + "日";
      return outer;
    }
  },
  beforeDestroy() {
    $(window).off("resize");
    document.title = common.config.webTitle;
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/iosSelect.css";
.gene_msg_box:after {
  content: "";
  height: 0;
  display: block;
  border-bottom: 1px solid rgba(129, 141, 207, 0.2);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: calc(~"96%-2px");
  margin-left: 6%;
}
.gene_msg_box:first-child:after {
  border-bottom: none;
}
.more_box:after {
  border-bottom: none;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .gene_msg_box:after {
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin: 50% 0%;
  }
}
// .bottomBorder {
//   height: 0;
//   width: calc(~"100% - 2px");
// }
// @bottomborderb : 1px solid #ddd;
// .bottomBorder:after {
//   content: "";
//   height: 0;
//   display: block;
//   border-bottom: 10px solid #ddd;
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
// }
// @media only screen and (-webkit-min-device-pixel-ratio: 2) {
//   .gene_msg_box:after {
//     -webkit-transform: scaleY(0.5);
//     -webkit-transform-origin: 50% 0%;
//   }
// }
.genePage,
.gene_msg_box {
  // min-width: 300px;
}

.gene_msg_first {
  margin-top: 65px;
}

.gene_msg_warp {
  padding-top: 7px;
  background-color: #f5f5f8;
}
#moreWrapper{
  margin-bottom: 7px;
}
.gene_msg_box_title {
  margin-bottom: 7px;
  padding-left: 12px;
  font-size: 14px;
  background-color: #fff;
  color: #333333;
  line-height: 50px;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  i {
    position: absolute;
    right: 16px;
    color: #818dcf;
  }
  .arrow{ 
    top: 24px;
    width: 10px;
    height: 6px;
    &.shang {
      background-image: url('./../assets/images/Fill_up.png');
      background-size: 100% 100%;
    }
    &.xia {
      background-image: url('./../assets/images/Fill_down.png');
      background-size: 100% 100%;
    }
  }
}

.gene_msg_banner {
  width: 22.5rem;
  margin: 0 auto;
  padding: 20px 0 20px 0;
  color: #666;
  line-height: 24px;
  font-size: 14px;
}
.more-wrapper {
  margin-bottom: 7px;
  padding-top: 30px;
  background-color: #fff;
}
.gene_msg_box {
  height: 50px;
  line-height: 50px;
  padding: 0 12px; // border-bottom: solid 1px #ddd;
  position: relative;
  font-family: "PingFangSC-Regular";
  // height: 60px;
  // line-height: 60px;
  // padding: 0 12px;
  // border-bottom: solid 1px #ddd;
  // position: relative;
  &.more_box {
    line-height: 30px;
    height: auto;
    h6{
      font-size:17px;
      font-weight: 300;
    }
  }
  .mint-button {
    width: 100%;
    height: 30px;
  }
  .gene_msg_box_right {
    background-color: rgba(0, 0, 0, 0);
    select {
      background-color: rgba(0, 0, 0, 0);
    }
  }
}

.gene_msg_box select {
  /*appearance:none;*/
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  color: #999;
  background-color: white;
  direction: rtl;
  font-size: 11px;
}

.gene_msg_box input {
  -webkit-appearance: none;
  /*appearance: none;*/
  margin: 0;
}

.gene_msg_box_left {
  font-size: 13px;
  font-family: "PingFangSC-Regular";
  color: #333;
  margin-left: 13px;
  width: 5.5em;
  display: inline-block;
  float: left;

  // font-size: 14px;
  // color: #595959;
  // margin-left: 13px;
  // width: 8em;
  // display: inline-block;
}

.gene_msg_box_left .point {
  width: 7px;
  height: 7px;
  background: url(./../assets/img/gene_msg/point.png) no-repeat;
  background-size: 100%;
  position: absolute;
  left: 12px;
  top: 50%;
  margin-top: -3.5px;
  -webkit-background-size: 100% auto;
  background-size: 100% auto;
}

.gene_msg_box_right {
  .user_express {
    margin-right: 32px;
    padding-top: 21px;

  }
  .sao {
    width: 25px;
    height: 25px;
    background: url(./../assets/images/sao.png) no-repeat;
    background-size: 100%;
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -8.5px;
    -webkit-background-size: 100% auto;
    background-size: 100% auto;
  }
}

.sao {
  width: 17px;
  height: 17px;
  background: url(./../assets/images/sao.png) no-repeat;
  background-size: 100%;
  position: absolute;
  right: 12px;
  top: 50%;
  margin-top: -8.5px;
  -webkit-background-size: 100% auto;
  background-size: 100% auto;
}

.gene_msg_box_right .more {
  width: 10px;
  height: 5.8px;
  background: url(./../assets/img/return01-blue@2x.png) no-repeat;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  transform: rotate(270deg);
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -2.9px;
  // width: 10px;
  // height: 15px;
  // background: url(./../assets/img/gene_msg/more.png) no-repeat;
  // background-size: 100%;
  // position: absolute;
  // right: 12px;
  // top: 50%;
  // margin-top: -8px;
  // -webkit-background-size: 100% auto;
  // background-size: 100% auto;
}

.gene_msg_box_right {
  float: right;
  font-size: 11px;
  color: #999999;
  height: 50px;
  text-align: right;
  cursor: pointer;
}

.gene_msg_box_right_mr {
  margin-right: 25px;
}

.gene_msg_bottom {
  background-color: #fff;
  padding: 30px 0 70px 0;
}

.gene_msg_bottom_ico {
  position: relative;
  text-align: center;
  span {
    font-family: "PingFangSC-Regular";
    font-size: 15px;
    color: #333;
    display: inline-block;
    height: 1rem;
    margin-top: -0.1rem;
  }
  .check_state {
    width: 18px;
    height: 18px;
    display: inline-block;
    margin-bottom: -0.14rem;
    margin-right: 4.5px;
  }
}

// .gene_msg_bottom_ico {
//   position: relative;
//   text-align: center;
//   line-height: 1rem;
//   height: 1rem;
//   span {
//     font-size: 13px;
//     color: #999999;
//     display: inline-block;
//     line-height: 1rem;
//     height: 1rem;
//     margin-top: -0.2rem;
//   }
// }

// .gene_msg_bottom_ico .check_state {
//   width: 1.2rem;
//   height: 1.2rem;
//   display: inline-block;
//   margin-bottom: -0.16rem;
//   margin-right: 10px;
// }

.gene_msg_commit_button {
  width: 250px;
  background-image: linear-gradient(-270deg, #ff68b0 0%, #ff6e8d 97%);
  border-radius: 31px;
  line-height: 45px;
  text-align: center;
  margin: 20px auto 0 auto;
  cursor: pointer;
  font-family: "PingFangSC-Regular";
  font-size: 17px;
  color: #ffffff;

  // width: 300px;
  // background-color: #29cc96;
  // color: #ffffff;
  // line-height: 40px;
  // border-radius: 5px;
  // text-align: center;
  // margin: 20px auto 0 auto;
  // cursor: pointer;
}

#sex_choose {
  z-index: 10000;
  background: rgba(11, 11, 11, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  text-align: center; // display: none;
}

.sex_choose_top {
  position: absolute;
  bottom: 113px;
  width: 90%;
  left: 5%;
  background-color: #ffffff;
  border-radius: 10px;
  opacity: 1;
}

.sex_choose_top p {
  line-height: 48px;
  color: #157efb;
}

.sex_choose_man {
  border-bottom: 1px solid #f2f2f2;
}

.sex_choose_bottom {
  position: absolute;
  bottom: 40px;
  width: 90%;
  left: 5%;
  background-color: #ffffff;
  border-radius: 10px;
  opacity: 1;
}

.sex_choose_bottom p {
  line-height: 48px;
  color: #157efb;
}

#commit_error {
  z-index: 10000;
  background: rgba(11, 11, 11, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  text-align: center;
  display: none;
}

.commit_error_top {
  position: absolute;
  top: 240px;
  width: 280px;
  left: calc(50% - 140px);
  background-color: #ffffff;
  border-radius: 10px;
  opacity: 1;
}

#error_msg_title {
  font-size: 18px;
  color: #333;
  margin-top: 30px;
}

#error_msg {
  font-size: 15px;
  color: #999999;
  padding: 18px 0;
  border-bottom: 1px solid #f2f2f2;
}

#error_msg_cancel {
  font-size: 18px;
  line-height: 50px;
  color: #157efb;
}

.star {
  color: red;
  font-size: 1.2em;
}

.gene_remove_box {
  display: inline-block;
  color: #999;
  background-color: white;
  input {
    text-align: right;
    color: rgb(102, 102, 102);
    font-size: 13px;
    &.user_number{
    }
  }
  input::-webkit-input-placeholder {
    color: #999;
    font-size: 11px;
  }
}

.flexBox {
  position: absolute;
  top: 0;
  display: none;
  width: 100%;
}
.genePage {
  // display: none;
}
.flexBox h1 {
  text-align: center;
  line-height: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
}

.flexBox h1 a {
  background: url("https://app.hxsapp/com/html/img/gene_detail/ico_back.jpg") 0
    center no-repeat;
  background-size: 100%;
  display: block;
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.5rem;
  left: 2rem;
}

.flexBox .submitSuccess {
  margin: 70px auto 30px auto;
  background: url("./../assets/img/gene_msg/suss.png") 0 center no-repeat;
  width: 90px;
  height: 90px;
  background-size: 100%;
}

.flexBox section {
  margin-top: 20px;
  text-align: center;
  padding: 0 1.5rem;
}

.flexBox section .sNumber {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}

.flexBox section .numberDetail {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}

.flexBox section .sNumber span {
  font-size: 1.3rem;
  font-weight: bold;
}

.flexBox section .remind {
  text-align: left;
  margin-top: 1rem;
}

.flexBox section img {
  width: 100%;
  margin-top: 1.3rem;
}

.gene_msg_banner h1 {
  font-size: 1.1rem;
  font-weight: bold;
}

.gene_msg_banner h1 span {
  font-size: 1.1rem;
  font-weight: bold;
}

.numberGene {
  display: none;
}

.gene_msg_warp {
  width: 25rem;
}
</style>


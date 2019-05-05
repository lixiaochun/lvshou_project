<template>
  <div class="faqList">
    <div class="problem_box_content">
      <div class="problem_nav bgf" id="problem_nav" v-show="helpType===false">
        <ul class="flex clearfix">
          <!-- v-show="index!=5&&index!=6" -->
          <li
            v-show="index!=5&&index!=6"
            :style="{ width : styleWidth }"
            v-for="(data,index) in curTypes"
            :key="index"
            :class=" data.isCur ? 'current' :'' "
            @click="curTab(data,index)"
          >
            {{data.name}}
            <i></i>
          </li>
        </ul>
      </div>

      <div class="problem_list" v-if="isShowCurList">
        <div v-if="curList && curList.length == 0" class="centerBox">
          <div v-if="0">暂无{{curTypes[this.curIndex].name }}纪录</div>
          <div class="no_article"></div>
        </div>

        <ul style="padding-bottom:49px;" v-if="curList && curList.length != 0 ">
          <li v-if="type_id===3">
            <h5 @click="clickOpen(data,index)" id="tab3_open">Q：为什么找不到我以前的顾问？</h5>
            <ul>
              <li>
                <div v-html="data.content"></div>
              </li>
            </ul>
          </li>
          <li v-for="(data,index) in curList" :key="index" :class=" data.isCur ? 'open' :'' ">
            <h5 @click="clickOpen(data,index)">
              {{data.title}}
              <i></i>
            </h5>
            <ul>
              <li>
                <div v-html="data.content" v-if="data.content!='app使用的第一条'"></div>
                <div v-if="data.content==='app使用的第一条'" class="head_app_1">
                  <p>
                    a:可能是你注册的手机号和你下单的手机号不是同一个，导致你
                    找不到以前的顾问。想要找回以前的顾问？
                    <span
                      @click="inputPhone"
                    >
                      <popupPhone></popupPhone>
                    </span>
                  </p>
                  <p>b：拿目前注册登录的手机号拨打给之前电话联系过你的顾问座机号码，顾问会帮你找回你的专属顾问</p>
                  <p>
                    c：如果忘记顾问座机号码，请直接致电
                    <a href="tel://4008880891">4008880891</a>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="feedback_tip" @click="openCustomer" v-show="helpType===false"></div>
    <div class="dialogBox" v-if="helpType2===false"></div>
    <preLoading v-if="!isShowCurList"></preLoading>

    <!--  非app环境下的app下载区域 -->
    <downToLinkedMe v-if=" 0 && !isApp && linkedMe" :linkedMe="linkedMe"></downToLinkedMe>

    <!-- <popupPhone v-if="popupPhone_type"  :popupPhoneType="popupPhone_type"  @popupPhoneType="inputPhoneFalse"></popupPhone> -->
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";
import commonJs from "@/util/common.js";
// import { Indicator } from 'mint-ui';

// 下载app组件
import downToLinkedMe from "@/components/downToLinkedMe";

// 初始化loadding的组件
import preLoading from "@/components/preLoading";
// 初始化popupPhone的组件
import popupPhone from "@/components/popupPhone"

export default {
  name: "faqList",
  data() {
    return {
      // 显示选中列表
      isShowCurList: false,
      // 选中的索引
      curIndex: 0,
      // url带的type_id参数
      type_id: 1,

      //问题列表的数据
      curList: [],

      curTypes: [],

      list: [],
      arrList: [[], [], [], [], [], [], []],
      types: [],

      // 给linkedeme使用的数据
      linkedMe: null,

      styleWidth: 0,
      sess_token: null,
      //判断加载填入号码的弹出框
      popupPhone_type: false,
      htmlContent: null,
      helpType: false,
      helpType2: false
    };
  },
  computed: {
    isLogin: function () {
      return commonJs.isLogin();
    },
    isApp: function () {
      return commonJs.isApp();
    }
  },

  mounted() {
    console.log(1234)
    document.title = "常见问题";
    this.type_id =
      this.$route.query.type_id && parseInt(this.$route.query.type_id) <= 4
        ? this.$route.query.type_id
        : 1;
    // debugger
    // Indicator.open('Loading...');
    this.sess_token = commonJs.getUrlParam("sess_token");
    this.getCommonQuestions();
    this.getCustomer();
    // 非app场景下面才有用 有有版本限制 是3.0.1开始的
    if (!this.isApp) {
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
      var __url = commonJs.config.prefixUrl + "faqList";
      this.linkedMe = {
        params: {
          // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
          key: "hxsapp://web?url=" + __url
        },
        domText: "test"
      };
    };

  },
  updated() {


  },
  components: {
    preLoading,
    downToLinkedMe,
    popupPhone
  },

  methods: {
    // 获取客服id
    getCustomer() {
      var that = this;
      if (this.sess_token) {
        axios
          .get("https://api.hxsapp.com/account/userAccount/getOpenIMAccount", {
            params: {
              sess_token: this.sess_token
            }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.operate_server =
                res.data.data.operate_server;
            }

          });
      } else {
        console.log("没有登录了,这里调起app的登录协议");
        commonJs.h5CallAppAction.hxsapp_showloginpage();
      }
    },
    // 跳转客服
    openCustomer() {
      var __url = commonJs.config.prefixUrl + "feed";
      // alert(1)
      //帮助与反馈埋点
      commonJs.buriedPoint({
        access_occurred_type: 260144, //发生访问的【页面】类型
        access_occurred_type_id: "", //发生访问的【页面】类型ID
        previous_event_type_obj: "", //【事件】对象类型
        previous_event_type_obj_id: "", //【事件】对象类型ID
        previous_content_sort: "" //【事件】事件参数
      });
      var __version = commonJs.getHxsAppVersion();
      if (
        commonJs.compareAppVersion(__version, "3.1.1") ||
        __version == "3.1.1"
      ) {
        window.location.href =
          "https://hxsapp_openim_page?service_id=" +
          this.operate_server +
          "&title=" +
          encodeURIComponent("专业咨询");
      } else {
        //专业咨询顾问账号
        window.location.href =
          "https://hxsapp_openim#" + this.operate_server;
      }
    },
    curTab(data, index) {
      this.curIndex = index;
      // this.curList = this.list[index];
      this.curList = this.arrList[index][0];

      var dian = {
        "0": 260147,
        "1": 260148,
        "2": 260149,
        "3": 260150
      };

      if (data.isCur) {
        console.log("不处理这个tab，index=" + index);

        commonJs.buriedPoint({
          access_occurred_type: dian[index], //发生访问的【页面】类型
          access_occurred_type_id: "", //发生访问的【页面】类型ID
          previous_event_type_obj: "", //【事件】对象类型
          previous_event_type_obj_id: "", //【事件】对象类型ID
          previous_content_sort: "" //【事件】事件参数
        });

        return;
      } else {
        console.log("处理这个tab，index=" + index);

        this.curTypes.forEach((cur, _index) => {
          if (_index != index) {
            cur.isCur = false;
          } else {
            cur.isCur = true;
          }
        });
      }

      if (index == 0) {
        //体脂秤埋点
        commonJs.buriedPoint({
          access_occurred_type: 260147, //发生访问的【页面】类型
          access_occurred_type_id: "", //发生访问的【页面】类型ID
          previous_event_type_obj: "", //【事件】对象类型
          previous_event_type_obj_id: "", //【事件】对象类型ID
          previous_content_sort: "" //【事件】事件参数
        });
      } else if (index == 1) {
        //数据报告埋点
        commonJs.buriedPoint({
          access_occurred_type: 260148, //发生访问的【页面】类型
          access_occurred_type_id: "", //发生访问的【页面】类型ID
          previous_event_type_obj: "", //【事件】对象类型
          previous_event_type_obj_id: "", //【事件】对象类型ID
          previous_content_sort: "" //【事件】事件参数
        });
      } else if (index == 2) {
        //APP使用
        commonJs.buriedPoint({
          access_occurred_type: 260149, //发生访问的【页面】类型
          access_occurred_type_id: "", //发生访问的【页面】类型ID
          previous_event_type_obj: "", //【事件】对象类型
          previous_event_type_obj_id: "", //【事件】对象类型ID
          previous_content_sort: "" //【事件】事件参数
        });
      } else if (index == 3) {
        //手环问题埋点
        commonJs.buriedPoint({
          access_occurred_type: 260150, //发生访问的【页面】类型
          access_occurred_type_id: "", //发生访问的【页面】类型ID
          previous_event_type_obj: "", //【事件】对象类型
          previous_event_type_obj_id: "", //【事件】对象类型ID
          previous_content_sort: "" //【事件】事件参数
        });
      }
    },

    clickOpen(data, index) {
      console.log("clickOpen-处理这个tab，index=" + index,data);
      this.curList.splice(
        index,
        1,
        Object.assign({}, data, {
          isCur: !data.isCur
        })
      );
      //具体问题展开/收起埋点
      commonJs.buriedPoint({
        access_occurred_type: 260151, //发生访问的【页面】类型
        access_occurred_type_id: "", //发生访问的【页面】类型ID
        previous_event_type_obj: "", //【事件】对象类型
        previous_event_type_obj_id: "", //【事件】对象类型ID
        previous_content_sort: "" //【事件】事件参数
      });
    },
    //单收货的手机号
    inputPhone() {
      this.popupPhone_type = true;
      // document.documentElement.style.overflowY = 'hidden'; 
    },
    //单收货的手机号
    inputPhoneFalse() {
      this.popupPhone_type = false;
      // document.documentElement.style.overflowY = 'scroll'; 
    },
    //座机号码
    callPhone() {
      console.log("del");
    },//获取 url 后的参数值
    getUrl(para) {
      var paraArr = location.search.substring(1).split('&');
      for (var i = 0; i < paraArr.length; i++) {
        if (para == paraArr[i].split('=')[0]) {
          return paraArr[i].split('=')[1];
        }
      }
      return '';
    },
    // https://api.hxsapp.com/base/common/getCommonQuestions
    getCommonQuestions() {
      var that = this;
      var loadNum = 1;
      let json = {
        type_id: 1,
        sess_token: commonJs.getUrlParam("sess_token")
      };
      axios
        .get("https://api.hxsapp.com/base/common/getCommonQuestions", {
          params: json
        })
        .then(res => {
          // console.log(res)
          // debugger

          if (res.data.code == 200) {

            this.types = res.data.data.types;

            this.styleWidth =
              this.types.length >= 1
                ? 100 / parseInt(this.types.length - 2) + "%"
                : "100%";

            that.list.push(res.data.data.list);
            that.arrList[0].push(res.data.data.list);

            this.curTypes = res.data.data.types.map((cur, index) => {
              if (index == 0) {
                if (this.type_id == 1) {
                  cur.isCur = true;
                } else {
                  cur.isCur = false;
                }
              } else {
                if (this.type_id - 1 == index) {
                  cur.isCur = true;
                } else {
                  cur.isCur = false;
                }
              }

              return cur;
            });

            var tab3Data="";

            this.types.forEach((curV, index, array) => {
              console.log("curV.id", curV.name);
              if (curV.id != 1) {
                let json2 = {
                  type_id: curV.id,
                  sess_token: commonJs.getUrlParam("sess_token")
                };
                axios
                  .get(
                    "https://api.hxsapp.com/base/common/getCommonQuestions",
                    { params: json2 }
                  )
                  .then(res2 => {
                    loadNum++;
                    // console.log(json2.type_id)
                    var tabIndex = json2.type_id - 1;
                    if (curV.name == "跑步机帮助页") {
                      tabIndex = 5;
                    } else if (curV.name == "跑步鞋帮助页") {
                      tabIndex = 6;
                    }
                    if (res2.data.code == 200) {
                      let res2List = res2.data.data.list;
                      if (tabIndex == 2) {
                        let startContent = {
                          content: 'app使用的第一条',
                          title: "Q：为什么找不到我以前的顾问？ "
                        }
                        res2List.unshift(startContent);
                        tab3Data=startContent;
                      }
                      that.list.push(res2List);
                      if (that.arrList[tabIndex] != undefined) {
                        that.arrList[tabIndex].push(res2List);
                      }


                      // console.log('第'+(tabIndex+1)+'格')
                      // console.log(this.arrList[tabIndex])
                      // console.log(loadNum)
                      // console.log(this.types.length)

                      if (loadNum == that.types.length) {
                        // Indicator.close();
                        var __index = that.type_id - 1;
                        this.curIndex = __index;

                        this.curList = this.list[__index].map((cur, index) => {
                        
                          cur.isCur = false;
                          //判断进去那个页面
                          setTimeout(function () {
                            if(commonJs.getUrlParam("type_id")){
                               var type_id = parseInt(commonJs.getUrlParam("type_id"))-1;
                               that.curTab(that.curTypes[type_id], type_id);
                            }
                            if(commonJs.getUrlParam("type_id")&&parseInt(commonJs.getUrlParam("type_id"))==3){
                              that.clickOpen(tab3Data,0);
                            }
                           // that.clickOpen(cur,0);
                            // var paraArr = location.search.substring(1).split('&');
                            // for (var i = 0; i < paraArr.length; i++) {
                            //   if ("type_id" == paraArr[i].split('=')[0]) {
                            //     type_id = parseInt(paraArr[i].split('=')[1]) - 1;
                            //     that.curTab(that.curTypes[type_id], type_id);
                            //   }
                            // }



                            if ((index + 1) == that.list[__index].length) {
                             // that.clickOpen(cur,0);
                             console.log("data2",cur);
                             $("#tab3_open").click();
                              if (commonJs.getUrlParam("help")) {
                                if (parseInt(commonJs.getUrlParam("help")) == 0) {
                                  that.curTab(that.curTypes[5], 5);
                                  console.log("dddd", that.curTypes[5]);
                                  document.title = that.curTypes[5].name;
                                } else if (parseInt(commonJs.getUrlParam("help")) == 1) {
                                  that.curTab(that.curTypes[6], 6);
                                  console.log("dddd", that.curTypes[6]);
                                  document.title = that.curTypes[6].name;
                                }
                                that.helpType = true;


                              }

                              setTimeout(function () {
                                that.helpType2 = true;
                              }, 200)
                            }

                          }, 1);

                          return cur;
                        });
                   

                      }
                    } else {
                      console.log(
                        "[index=" +
                        this.type_id +
                        "]getCommonQuestions-ajax,code !== 200"
                      );
                      // Indicator.close();
                    }
                    setTimeout(function () {
                      that.isShowCurList = true;
                    }, 200);

                  });
              }
            });
          
         
          } else {
            this.isShowCurList = true;
            // Indicator.close();
            console.log("[index=0]getCommonQuestions-ajax,code !== 200");
            Toast("加载数据异常，请稍后再试！");
          }
        })
        .catch(err => {
          this.isShowCurList = true;
          console.log(err);
          console.log("[index=0]getCommonQuestions-ajax,eror");
          // Indicator.close();
          Toast("加载数据异常，请稍后再试！");
        });
      console.log(this.list);
    }
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/*常见问题*/
.faqList {
  .problem_nav {
    width: 100%;
  }
  .head_app_1 p a {
    color: #ff6e8d;
    cursor: pointer;
  }

  .flex {
    width: 100%;
  }

  .flex li {
    float: left;
    width: 25%;
    position: relative;
  }

  .problem_nav li {
    position: relative;
    float: left;
    height: 42px;
    line-height: 40px;
    color: #333;
    text-align: center;
    border-bottom: 1px solid rgba(129, 141, 207, 0.2);

    cursor: pointer;
    font-size: 15px;
    box-sizing: border-box;

    i {
      display: none;
    }
  }

  .problem_nav li.current {
    // border-bottom: 2px solid #FF6E8D;
    i {
      display: block;
      width: 15px;
      height: 2px;
      position: absolute;
      left: 50%;
      margin-left: -10px;
      bottom: 0;
      background: #ff6e8d;
      border-radius: 4px;
    }
    color: #ff6e8d;
  }

  .problem_list ul ul li > *,
  .problem_list ul ul li p,
  .problem_list .open ul {
    font-size: 0.93em;
    margin: 0em;
  }
  .problem_list {
    margin-top: 0 !important;
  }
  .problem_list .centerBox {
    width: 100%;
    margin: 0 auto;
    height: 500px;
    text-align: center;
    font-size: 18px;
    position: relative;
    .no_article {
      display: block;
      position: absolute;
      width: 140px;
      height: 140px;
      left: 50%;
      top: 50%;
      z-index: 1;
      margin-left: -70px;
      margin-top: -120px;
      background: url(../assets/images/quesheng_kong.png) left top no-repeat;
      background-size: 100%;
      &:after {
        content: "抱歉，暂无记录";
        display: block;
        position: absolute;
        bottom: -50px;
        left: -50px;
        width: 240px;
        text-align: center;
        color: #333;
        font-size: 17px;
      }
    }
  }

  .problem_list > ul > li {
    padding: 0 0px 12px 15px;
    // border-bottom: 1px solid rgba(129, 141, 207, .2);
    // border-top: 1px solid rgba(129, 141, 207, .2);
    padding-bottom: 0;
    // margin-bottom: 10px;
    background: #fff;
  }

  .problem_list > ul > li:nth-of-type(1) {
    border-top: none;
  }

  .problem_list h5 {
    padding: 16px 25px 15px 0;
    // padding: 1px 25px 15px 0;
    border-bottom: 1px solid rgba(129, 141, 207, 0.16);
    color: #333;
    // margin-bottom: -1px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    font-weight: normal;
  }

  .problem_list h5 i {
    width: 12px;
    height: 9px;
    background: url("../assets/img/return01-blue@2x.png") no-repeat;
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -5px;
    -webkit-background-size: 100% auto;
    background-size: 80% auto;
  }

  .open h5 i {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .problem_list ul ul {
    padding: 10px 0;
    display: none;
  }

  .problem_list .open ul {
    display: block;
    background: #f5f5f8;
    margin-left: -15px;
    margin-top: -1px;
    position: relative;
  }

  .problem_list ul ol li {
    list-style: initial;
    list-style-position: inside;
    list-style-type: decimal;
    line-height: 26px;
    padding-left: 6px;
  }

  .problem_list ul ul li:last-of-type {
    padding: 5px 12px;
    color: #666;
    padding: 5px 15px;
    color: #666;
    padding-left: 20px;
    padding-right: 40px;
    line-height: 1.8rem;
  }

  .feedback_tip {
    position: fixed;
    height: 70px;
    width: 65px;
    background: url(./../assets/images/solution/head_purple.png) no-repeat;
    background-size: 65px 70px;
    z-index: 1;
    bottom: 40px;
    right: 20px;
  }

  .dialogBox {
    background-color: white;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    z-index: 9;
  }
}
</style>

<template>
  <div class="sportsLessonGraphic">
    <div class="graphic_head" v-if="0 &&  ajax && ajax.is_work == 1 ">
      <p class="graphic_head_title">
        {{ajax.scheme_title}} -
        <span v-if="ajax && ajax.title" class="graphic_head_smalltitle">
          {{ajax.title}}
        </span>
      </p>
      <p v-if="ajax && ajax.suit_crowds">适用人群:
        <span class="graphic_head_people">
          {{ajax.suit_crowds}}
        </span>
      </p>
      <p v-if="ajax && ajax.play_time">课程时长:
        <span class="graphic_head_time">
          {{ajax.play_time}}
        </span>
      </p>
      <p v-if="ajax && ajax.calories">课程热量消耗:
        <span class="graphic_head_cal">
          {{ajax.calories}}
        </span>
      </p>
      <p v-if="ajax && ajax.level">课程难度:
        <span class="graphic_head_hard">
          {{ajax.level}}
        </span>
      </p>
    </div>
    <div class="graphic_main">
      <div v-for="(data,index) in action_list" :key="index">
        <div class="lesson_line"></div>
        <div class="graphic_box">
          <div class="graphic_box_title clearfix graphic_up" @click="clickUp($event,index)">
            <div style="float:left;display:inline-block">
              <p class="graphic_name">
                {{data.title}}
              </p>
            </div>
            <div style="float:right;display:inline-block">
              <p>动作讲解</p>
              <p class="graphic_more" style="transform: rotate(180deg);"></p>
            </div>
          </div>
          <div class="graphic_box_main" style="display: block;">
            <div class="graphic_box_main_title">
              <p class="graphic_small_name">
                {{data.small_title}}
              </p>
            </div>

            <div class="graphic_box_main_warp swiper-container swiper-container-horizontal">
              <swiper :options="swiperOption" :id='"mySwiper"+index'>
                <!-- slides -->
                <swiper-slide v-for="(data2,index) in data.images_list" :key="data2.images+'-'+index">
                  <div class="img_box"><img :src="data2.images"></div>
                  <p class="text">
                    {{data2.descr}}你好你号号
                  </p>
                </swiper-slide>
              </swiper>

            </div>
          </div>
        </div>
      </div>
    </div>

    <preLoading v-if="0 && !ajax"></preLoading>
  </div>
</template>

<script>
import axios from 'axios'
import commonJs from '@/util/common.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';

import { Toast } from 'mint-ui';

// 居中弹出下载appdownload组件
import popupDownLoad from "@/components/popupDownLoad"

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
  name: "sportsLessonGraphic",
  data() {
    return {
      swiperOption: {
        // swiper optionss 所有的配置同swiper官方api配置
        //api: http://www.swiper.com.cn/api/callbacks/2015/0308/222.html

        // demo: https://surmon-china.github.io/vue-awesome-swiper/

        //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
        // autoplay: 3000,

        //滑动方向，可设置水平(horizontal)或垂直(vertical)。
        // direction : 'horizontal',

        // 拖动时指针是否会变成抓手形状
        // grabCursor : true,

        // Swiper从3.0开始使用flexbox布局
        // setWrapperSize :true,

        // 自动高度，设为truewrapper和container会随着当前slide的高度而发生变化。
        // autoHeight: true,
        // 容器样式
        pagination: '.swiper-pagination',
        // 为true时，点击分页器的指示点分页器会控制Swiper切换。
        paginationClickable: true,

        // 后退按钮的css选择器或HTML元素。
        // prevButton:'.swiper-button-prev',

        // 前进按钮的css选择器或HTML元素。
        // nextButton:'.swiper-button-next',

        // Scrollbar容器的css选择器或HTML元素。
        // scrollbar:'.swiper-scrollbar',

        // 是否开启鼠标控制Swiper切换
        // mousewheelControl : true,

        // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        observeParents: true,

        // 设置slider容器能够同时显示的slides数量(carousel模式)。
        slidesPerView: "auto",

        // slide之间的距离（单位px）。
        spaceBetween: 0,

        //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
        freeMode: true,

        // 设定初始化时slide的索引。
        // initialSlide:0,

        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper) {
          console.log("onTransitionStart-log")
          console.log(swiper)
        },
        // 回调函数，过渡结束时触发，接收Swiper实例作为参数。
        onTransitionEnd: function(swiper) {
          console.log("onTransitionEnd-log-过渡结束")
        }
      },
      ajax: null,
      action_list: []
    }
  },
  components: {
    swiper,
    swiperSlide,
    preLoading
  },

  computed: {
    isLogin: function() {
      return commonJs.isLogin()
    },
    isApp: function() {
      return commonJs.isApp()
    }
  },

  methods: {

    //H5通知客户端显示分享数据
    setShareContent() {
      var shareTitle = encodeURIComponent(this.ajax.title);
      var __search = "?displayThumbBtn=1";
      var shareLink = commonJs.config.prefixUrl + 'sportsLessonGraphic/' + this.$route.params.scheme_id + '/' + this.$route.params.plan_id + '/' + this.$route.params.course_id + __search;

      var shareImages = this.ajax.images;
      var shareDescr = encodeURIComponent(this.ajax.descr);//分享描述
      // var shareArticleId = this.ajax.id;
      var shareArticleId = '';
      var shareType = "sportsLessonGraphic";
      // var shareType = 0;
      var shareMediaLink = this.ajax.media_data ? this.ajax.media_data : "";

      var shareActWindowTitle = "";
      var shareActWindowDescr = "";

      var shareData = {
        shareTitle,
        shareLink,
        shareImages,
        shareDescr,
        shareArticleId,
        shareType,
        shareMediaLink,
        shareActWindowTitle,
        shareActWindowDescr
      }

      this.initShare(shareData)
    },

    clickUp(e, index) {
      // debugger
      // this.$refs.mySwiper.swiper

      // 埋点
			var __course_id = this.$route.params.course_id;
			var jsonMar = {
				access_occurred_type: 210540,//发生访问的【页面】类型
				access_occurred_type_id: __course_id,//发生访问的【页面】类型ID
				previous_event_type_obj: '',//【事件】对象类型
				previous_event_type_obj_id: "",//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			};
			commonJs.buriedPoint(jsonMar)

      if (e.currentTarget.className.indexOf("graphic_up") >= 0) {
        e.currentTarget.className = e.currentTarget.className.replace("graphic_up", " ");

        this.showTab(index)
      } else {
        e.currentTarget.className = e.currentTarget.className + " graphic_up";

        this.hideTab(index)
      }
    },
    // app右上角分享
    initShare(shareData) {
      if (this.isApp) {
        // debugger
        // 埋点
        var __course_id = this.$route.params.course_id;
        var jsonMar = {
          access_occurred_type: 210541,//发生访问的【页面】类型
          access_occurred_type_id: __course_id,//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        };
      
				window.hxsapp_visible_share_btn_mar = function(){
			    commonJs.buriedPoint(jsonMar)
				}

        console.log(shareData)
        commonJs.h5CallAppAction.hxsapp_visible_share_btn(shareData)
      } else {

        //二次分享－微信下
        // setShareContent
        // seconDaryShare(decodeURIComponent(Info.title), decodeURIComponent(Info.desc), Info.link, Info.img, data.appId, data.timestamp, data.noncestr, data.signature);
        var title = shareData.shareTitle;
        var desc = shareData.shareDescr;
        var link = shareData.shareLink;
        var img = shareData.shareImages;

        commonJs.outSideShare({
          title,
          desc,
          link,
          img
        });
      }
    },
    getActionByCourseId() {
      // 接口请求数据
      var _this = this;
      let json = {
        scheme_id: this.$route.params.scheme_id,
        plan_id: this.$route.params.plan_id,
        course_id: this.$route.params.course_id,
        sess_token: commonJs.getUrlParam("sess_token")
      };

      function __hideTab(i) {
        if (i != 0) {
          _this.$nextTick(() => {
            console.log("__hideTab-fun,i=" + i)
            _this.hideTab(i)
          })

        }
      }

      // https://api.hxsapp.com/content/Fitness/getActionByCourseId
      axios.get('https://api.hxsapp.com/content/Fitness/getActionByCourseId',
        { params: json }
      ).then((res) => {
        if (res.data.code == 200) {
          console.log(res)
          // Toast(res.data.msg)
          this.ajax = res.data.data;
          console.log(typeof this.ajax.is_work)
          if (res.data.data.action_list && res.data.data.action_list.length) {

            this.action_list = res.data.data.action_list
            var len = this.action_list.length;

            this.action_list && len && setTimeout(() => {
              for (var i = 0; i < len; i++) {
                __hideTab(i)
              }
            }, 200)
            // 分享初始化
            this.setShareContent();
          }
        }

      }).catch((Error) => {
        console.log(Error)
        Toast("服务异常，请稍后再试！")
      })
    },
    hideTab(index) {
      console.log("hideTab-fun,index=" + index)
      $('.graphic_more').eq(index).css({
        'transform': 'rotate(0deg)',
        '-webkit-transform': 'rotate(0deg)'
      })
      $(".graphic_box_main").eq(index).slideUp(200);
    },
    showTab(index) {
      $('.graphic_more').eq(index).css({
        'transform': 'rotate(180deg)',
        '-webkit-transform': 'rotate(180deg)'
      })
      $(".graphic_box_main").eq(index).slideDown(200);
    }
  },
  mounted() {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    this.getActionByCourseId()

    var __course_id = this.$route.params.course_id
		commonJs.buriedPoint({
			access_occurred_type: 110205,//发生访问的【页面】类型
			access_occurred_type_id: __course_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

  },
  beforeDestroy() {
		console.log("beforeDestroy-log")
		window.hxsapp_visible_share_btn_mar &&  delete window.hxsapp_visible_share_btn_mar;
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sportsLessonGraphic {
  min-height: 100%;
  width: 100%;
}

/*图解教程*/

.sportsLessonGraphic .lesson_line {
  width: 100%;
  height: 10px;
  background-color: #f2f2f2;
}

.sportsLessonGraphic .graphic_box {
  height: auto;
  
}

.sportsLessonGraphic .graphic_box_title {
  height: auto;
  /*display: flex;
    justify-content: space-between;*/
  cursor: pointer;
}

.sportsLessonGraphic .graphic_box_title.graphic_up {
  height: auto;
  /*display: flex;
    justify-content: space-between;*/
  cursor: pointer;
  padding:0 0 14px;
}




.sportsLessonGraphic .graphic_name {
  font-size: 15px;
  margin: 15px 0 0 15px;
}

.sportsLessonGraphic .graphic_box_title div:nth-child(2) p:nth-child(1) {
  font-size: 13px;
  color: #818DCF;
  margin: 14px 0 0 6px;
  display: inline-block;
}

.sportsLessonGraphic .graphic_more {
  width: 11px;
  height: 6px;
  background-image: url('../assets/img/return01-blue@2x.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  display: inline-block;
  margin: 0px 15px 0 0;
  top: -2px;
  position: relative;
  transition: All 0.4s ease-in-out;
  -webkit-transition: All 0.4s ease-in-out;
  /*transform: rotate(180deg);
    -webkit-transform: rotate(180deg);*/
}

.sportsLessonGraphic .graphic_box_main {
  display: none;
}

.sportsLessonGraphic .graphic_box_main_title {
  margin: 2px 0 15px;
}

.sportsLessonGraphic .graphic_small_name {
  margin: 0 0 0 12px;
  color: #999999;
  font-size: 12px;
  display: inline-block;
}

.sportsLessonGraphic .graphic_small_num {
  margin: 0 0 0 12px;
  color: #999999;
  font-size: 12px;
}

.sportsLessonGraphic .graphic_times,
.sportsLessonGraphic .graphic_group {
  color: #999999;
}

.sportsLessonGraphic .graphic_box_main_warp {
  overflow: hidden;
  position: relative;
}

.sportsLessonGraphic .graphic_box_main_warp .swiper-wrapper {
  width: 1600px;
  overflow: hidden;
}

.sportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide {
  width: 123px;
  padding-right: 3px;
  display: inline-block;
  overflow: hidden;
}

.sportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide a {
  width: 123px;
  position: relative;
}

.sportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide .img_box {
  width: 123px;
  height: 69px;
  background: #f3f3f3;
}

.sportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide img {
  width: 123px;
  height: 69px;
}

.graphic_up .sportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide p {
  overflow: hidden;
  font-size: 13px;
  width:100%;
  box-sizing:border-box;
  color: #666;
  line-height: 18px;
  padding: 7px 10px 0px 10px;
}

.sportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide p {
  overflow: hidden;
  font-size: 13px;
  width:100%;
  box-sizing:border-box;
  color: #666;
  line-height: 18px;
  padding: 7px 10px 15px 10px;
}

</style>

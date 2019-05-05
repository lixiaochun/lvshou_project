<template>
  <div class="newSportsLessonGraphic" v-if="action_list.length">
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
                <swiper-slide v-for="(data2,index) in data.list" :key="data2.images+'-'+index">
                  <div class="img_box"><img :src="data2.images"></div>
                  <p class="text">
                    {{data2.descr}}
                  </p>
                </swiper-slide>
              </swiper>

            </div>
          </div>
        </div>
      </div>
    </div>
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


export default {
  name: "newSportsLessonGraphic",
  props:{
    dataArr:{
			type: Array,
      default: function () {
        return []
      }
		}
  },
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
      action_list: [],
      isClickIndexFirst:false
    }
  },
  components: {
    swiper,
    swiperSlide
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

    clickUp(e, index) {
      // debugger
      // this.$refs.mySwiper.swiper

      // 埋点
			var __course_id = this.$route.params.sport_id;
			var jsonMar = {
				access_occurred_type: 210540,//发生访问的【页面】类型
				access_occurred_type_id: __course_id,//发生访问的【页面】类型ID
				previous_event_type_obj: '',//【事件】对象类型
				previous_event_type_obj_id: "",//【事件】对象类型ID
				previous_content_sort: ''//【事件】事件参数
			};
			commonJs.buriedPoint(jsonMar)
      console.log(e.currentTarget.className)
      
      if( index == 0  && !this.isClickIndexFirst){
        console.log("第一次点击")
        this.hideTab(index)
        this.isClickIndexFirst = true;
        return;
      }

      if (e.currentTarget.className.indexOf("graphic_up") >= 0) {
        e.currentTarget.className = e.currentTarget.className.replace("graphic_up", " ");

        this.showTab(index)
      } else {
        e.currentTarget.className = e.currentTarget.className + " graphic_up";

        this.hideTab(index)
      }
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

    this.action_list = this.dataArr;
    
    var _this = this;

    function __hideTab(i) {
      if (i != 0) {
        _this.$nextTick(() => {
          console.log("__hideTab-fun,i=" + i)
          _this.hideTab(i)
        })
      }
    }
    var len = this.action_list.length;

    this.$nextTick(()=>{

      this.action_list && setTimeout(() => {
        for (var i = 0; i < len; i++) {
          __hideTab(i)
        }
      }, 200)  

    })


    var __sport_id = this.$route.params.sport_id
		commonJs.buriedPoint({
			access_occurred_type: 110205,//发生访问的【页面】类型
			access_occurred_type_id: __sport_id,//发生访问的【页面】类型ID
			previous_event_type_obj: '',//【事件】对象类型
			previous_event_type_obj_id: '',//【事件】对象类型ID
			previous_content_sort: ''//【事件】事件参数
		});

  },
  beforeDestroy() {
		console.log("beforeDestroy-log")
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newSportsLessonGraphic {
  min-height: 100%;
  width: 100%;
}

/*图解教程*/

.newSportsLessonGraphic .lesson_line {
  width: 100%;
  height: 10px;
  background-color: #f2f2f2;
}

.newSportsLessonGraphic .graphic_box {
  height: auto;
  
}

.newSportsLessonGraphic .graphic_box_title {
  height: auto;
  /*display: flex;
    justify-content: space-between;*/
  cursor: pointer;
}

.newSportsLessonGraphic .graphic_box_title.graphic_up {
  height: auto;
  /*display: flex;
    justify-content: space-between;*/
  cursor: pointer;
  padding:0 0 14px;
}




.newSportsLessonGraphic .graphic_name {
  font-size: 15px;
  margin: 15px 0 0 15px;
}

.newSportsLessonGraphic .graphic_box_title div:nth-child(2) p:nth-child(1) {
  font-size: 13px;
  color: #818DCF;
  margin: 14px 0 0 6px;
  display: inline-block;
}

.newSportsLessonGraphic .graphic_more {
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

.newSportsLessonGraphic .graphic_box_main {
  display: none;
}

.newSportsLessonGraphic .graphic_box_main_title {
  margin: 2px 0 15px;
}

.newSportsLessonGraphic .graphic_small_name {
  margin: 0 0 0 12px;
  color: #999999;
  font-size: 12px;
  display: inline-block;
}

.newSportsLessonGraphic .graphic_small_num {
  margin: 0 0 0 12px;
  color: #999999;
  font-size: 12px;
}

.newSportsLessonGraphic .graphic_times,
.newSportsLessonGraphic .graphic_group {
  color: #999999;
}

.newSportsLessonGraphic .graphic_box_main_warp {
  overflow: hidden;
  position: relative;
}

.newSportsLessonGraphic .graphic_box_main_warp .swiper-wrapper {
  width: 1600px;
  overflow: hidden;
}

.newSportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide {
  width: 123px;
  padding-right: 3px;
  display: inline-block;
  overflow: hidden;
}

.newSportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide a {
  width: 123px;
  position: relative;
}

.newSportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide .img_box {
  width: 123px;
  height: 69px;
  background: #f3f3f3;
}

.newSportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide img {
  width: 123px;
  height: 69px;
}

.graphic_up .newSportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide p {
  overflow: hidden;
  font-size: 13px;
  width:100%;
  box-sizing:border-box;
  color: #666;
  line-height: 18px;
  padding: 7px 10px 0px 10px;
}

.newSportsLessonGraphic .graphic_box_main_warp .swiper-wrapper .swiper-slide p {
  overflow: hidden;
  font-size: 13px;
  width:100%;
  box-sizing:border-box;
  color: #666;
  line-height: 18px;
  padding: 7px 10px 15px 10px;
}

</style>

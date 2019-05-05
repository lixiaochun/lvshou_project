<template>
  <div class="myFeedBack-t">
    <ul>
      <!--  <li>
                <div class="top-title">
                    <em>您的反馈：</em>无法连接蓝牙无法连接蓝牙无法连接蓝牙无法连接蓝牙无法连接蓝牙无法连接蓝牙无法连接蓝牙
                    <div class="date">2016.10.15   15:25</div>
                </div>
                <div class="myFeedBack-a">
                    <div class="title">
                        <div class="myFeedBack-a_left"></div>
                        <div class="myFeedBack-a_right">好享瘦客服回复：</div>
                    </div>
                    <div class="myFeedBack-content">您好，请您确认手机蓝牙是在开启状态下，体脂称可在3s内自动连接，请您查看APP界面上的显示，谢谢！您好，请您确认手机蓝牙是在开启状态下，体脂称可在3s内自动连接，请您查看APP界面上的显示，谢谢！您好，请您确认手机蓝牙是在开启状态下，体脂称可在3s内自动连接，请您查看APP界面上的显示，谢谢！</div>
                   <div class="date">2016.10.15  15:25</div>
                </div>
      </li>-->
    </ul>
    <div class="defalut_ico_box">
      <span></span>
      <p>暂无反馈消息哦!</p>
    </div>
    <p class="load_tip">{{ loadTipText[loadTipTextIndex] }}</p>
    <preLoading v-if="!(myFeedBackData)"></preLoading>
  </div>
</template>
<script>

import axios from 'axios'
import common from '@/util/common.js'
import { Toast } from 'mint-ui';
import IosSelect from 'iosselect'
import preLoading from '@/components/preLoading'

export default {
  name: 'myFeedBack',
  data() {
    return {
      bTrue: true,
      iNow: true,
      sess_token: null,
      myFeedBackData: null,
      childLastId: null,
      loadTipTextIndex: 0,//下拉加载提示文本的下标
      loading: false,//是否使用下滑加载
      loadTip: false, //下滑加载提示
      loadTipText: ['正在加载中...', '没有更多评论了'], //下拉加载或加载完提示
    }
  },
  mounted() {
    document.title = '我的反馈';
    this.getChildData();
  },
  methods: {
    getChildData() {
      var sessToken = common.getUrlParam('sess_token');
      var _this = this;
      var commonData = {
        sess_token: sessToken
      };

      var modelIdfa = common.getUrlParam('model_idfa');
      var CallBack = '?callback=?' + '&model_idfa=' + modelIdfa;

      function feedBackFn(json) {
        $.getJSON('https://api.hxsapp.com/base/feedback/getUserFeedback' + CallBack, json, function (data) {
          if (data.code == '200') {
            console.log(data.code);
            _this.myFeedBackData = true;
            if (data.data.length > 0) {
              this.iNow = false;
              console.log(this.iNow)
              var html = '';
              $.each(data.data, function (i) {
                if (data.data[i].service_reply) {
                  html += [
                    '<li data-id="' + data.data[i].id + '">',
                    '<div class="top-title">',
                    data.data[i].content,
                    // '<div class="date">' + data.data[i].create_time + '</div>',
                    '</div>',
                    '<div class="myFeedBack-a">',
                    '<div class="title">',
                    // '<div class="myFeedBack-a_left"></div>',
                    '<div class="myFeedBack-a_right">客服回复：</div>',
                    '</div>',
                    '<div class="myFeedBack-content">' + data.data[i].service_reply + '</div>',
                    '<div class="date">' + data.data[i].update_time + '</div>',
                    '</div>',
                    '<div class="solid"></div>',
                    '</li>'
                  ].join('');
                } else {
                  html += [
                    '<li data-id="' + data.data[i].id + '">',
                    '<div class="top-title">',
                    data.data[i].content,
                    // '<div class="date">' + data.data[i].create_time + '</div>',
                    '</div>',
                    '<div class="solid"></div>',
                    '</li>'
                  ].join('');
                }

              })
              $('.myFeedBack-t ul').append(html);

              _this.bTrue = true;

              if ($('.myFeedBack-t ul li').length >= 10) {
                $('.load_tip').show();
              }

              $(window).unbind('scroll');
              $(window).scroll(function () {
                if ($(this).scrollTop() + $(window).height() >= $('.myFeedBack-t ul').height()) {
                  if (_this.bTrue) {
                    _this.bTrue = false;
                    json = {
                      sess_token: sessToken,
                      last_id: $('.myFeedBack-t ul').find('li').eq($('.myFeedBack-t ul').find('li').length - 1).attr('data-id')
                    };
                    console.log(1);
                    feedBackFn(json);
                  }
                }
              })

            } else {
              // this.iNow = true;
              $('.load_tip').hide();
              if (this.iNow) {
                $('.myFeedBack-t ul').hide();
                $('.defalut_ico_box').show();
              }
            }
            // this.iNow = false;
          }
        });
      }

      feedBackFn(commonData);

      $.getJSON('https://api.hxsapp.com/base/feedback/doReadFeedback' + CallBack, commonData, function (data) {
        if (data.code == '200') { };
      });
    }
  },
  beforeDestroy() {
    document.title = '好享瘦';
    $(window).off('scroll', this.getChildData)
    $(window).off('scroll', this.feedBackFn)
  },
  components: {
    preLoading
  }
}
</script>
<style>
.feedback_tip_t {
  width: 100%;
  height: 49px;
  line-height: 49px;
  color: #fff;
  font-size: 18px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #39d9ab;
  text-align: center;
}
.myFeedBack-t ul {
  padding-top: 12px;
}
.myFeedBack-t ul li {
  padding: 0 12px 17px 16px;
  background: #fff;
}
.myFeedBack-t ul li .top-title {
  font-size: 15px;
  color: #333;
  line-height: 24px;
  margin-bottom: 16px;
}
.myFeedBack-t ul li .top-title em {
  font-size: 15px;
  color: #333;
}
.myFeedBack-t ul li .date {
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  color: #999;
}
.myFeedBack-t ul li .top-title .date {
  margin-top: 9px;
  margin-bottom: 14px;
  color: #999;
}
.myFeedBack-t ul li .myFeedBack-a .myFeedBack-a_left {
  /*background: url(../img/feedback-a.png) left top no-repeat;*/
  background-size: 23px;
  padding-left: 28px;
  height: 17px;
  float: left;
}
.myFeedBack-t ul li .myFeedBack-a .title {
  height: 17px;
  margin-bottom: 3px;
}
.myFeedBack-t ul li .myFeedBack-a .myFeedBack-a_right {
  height: 17px;
  line-height: 17px;
  font-size: 13px;
  color: #ff668c;
  float: left;
}
.myFeedBack-content {
  line-height: 25px;
  font-size: 13px;
  color: #2a2a2a;
  margin-bottom: 8px;
}
.myFeedBack-a {
  padding: 20px 10px 16px;
  background: #f5f5f8;
}
.min_height_articleDetail {
  /*
  min-height: 500px;*/
}
.myFeedBack-t .loading_tip {
  width: 88px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  display: none;
}
.myFeedBack-t .loading_tip span {
  width: 28px;
  height: 28px;
  float: left;
  /*background:url(../img/loading.gif) left top no-repeat;*/
  background-size: 28px;
  margin-right: 5px;
  margin-top: 4px;
}
.myFeedBack-t .loading_tip em {
  width: 50px;
  height: 40px;
  line-height: 36px;
  float: left;
  color: #999;
}
.myFeedBack-t .defalut_ico_box {
  position: absolute;
  left: 50%;
  top: 30%;
  margin-left: -50px;
  display: none;
}
.myFeedBack-t .defalut_ico_box span {
  width: 60px;
  height: 57px;
  /*background: url(../img/defalut.png) left top no-repeat;*/
  background-size: 60px;
  display: block;
  margin: 0 auto;
}
.myFeedBack-t .defalut_ico_box p {
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  text-align: center;
}
.myFeedBack-t .load_tip {
  background: #fff;
  text-align: center;
  color: #666;
  font-size: 15px;
  height: 18px;
  line-height: 18px;
  padding-bottom: 10px;
  display: none;
  padding-top: 10px;
}
.myFeedBack-t ul li .solid {
  width: 100%;
  height: 1px;
  overflow: hidden;
  background: rgba(129, 141, 207, 0.2);
  margin-top: 20px;
}
</style>
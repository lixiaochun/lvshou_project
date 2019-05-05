<template>
  <div class="newfeedback">
    <div class="feedbackContent">
      <div class="sessTokenNone"></div>
      <p>
        <textarea placeholder="问题描述的越详细，我们会解决的更快哟！" id="suggestion_2"></textarea>
      </p>
      <loginFrame></loginFrame>
    </div>
    <div class="solid"></div>
    <div class="feedbackTab">
      <div class="feedbackTab_c feedbackType">
        <p class="feedbackTab_l" id="feedbackType" data-feedtype="1" data-value="体脂秤">体脂秤</p>
        <div class="feedbackTab_r">
          <span>请选择</span>
          <img
            src="../assets/images/fh-xiao-lan.png"
            alt
            class="feedbackMore"
            style="width:6px; height:10px; margin-top:20px;"
          >
        </div>
        <input type="hidden" name="feedType" id="feedId" value>
        <loginFrame></loginFrame>
      </div>
      <div class="feedbackTab_c feedbackBlue newFeedbackBlue">
        <p class="feedbackTab_l">蓝牙开启状态</p>
        <div class="feedbackTab_r">
          <span>未开启</span>
          <img src="../assets/images/help_icon.png" alt class="feedbackMore">
        </div>
      </div>
      <div class="feedbackTab_c feedbackState newFeedbackState">
        <p class="feedbackTab_l">体脂秤连接状态</p>
        <div class="feedbackTab_r">
          <span>未连接</span>
          <img src="../assets/images/help_icon.png" alt class="feedbackMore">
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import common from '@/util/common.js'
import { Toast } from 'mint-ui'
import IosSelect from 'iosselect'
import loginFrame from '@/components/loginFrame'

export default {
  name: 'feedBack',

  mounted() {
    this.feedBack();
  },
  methods: {
    feedBack() {
      var suggestion = $("#suggestion");
      var suggestion2 = $("#suggestion_2");
      var bluetoothState = common.getUrlParam('bluetooth_state'),
        deviceState = common.getUrlParam('device_state'),
        problemEntry = common.getUrlParam('problem_entry'),
        feedbackType = 1;

      // $('.feedback_commit').on('click',function(){
      //     commitFeedback();
      // })
      //监测输入框
      $("#suggestion_2").on('keyup', function () {

        //提交编辑反馈埋点
        common.buriedPoint({
          access_occurred_type: 260152,//发生访问的【页面】类型
          access_occurred_type_id: '',//发生访问的【页面】类型ID
          previous_event_type_obj: '',//【事件】对象类型
          previous_event_type_obj_id: '',//【事件】对象类型ID
          previous_content_sort: ''//【事件】事件参数
        });

      })

      var iNow = true;
      document.title = "意见反馈"
      window.commitFeedback = function () {
        $('#suggestion_2')
        var suggestTxt = $('#suggestion_2').val();
        //bluetoothState = 0;
        //connectState = 0; 
        feedbackType = $('#feedbackType').attr('data-feedtype');
        if (suggestTxt == "") {

          Toast({
            message: '请填写您宝贵的意见',
            duration: 1000
          });
          return;
        }
        else {
          $.ajax({
            type: "post",
            url: 'https://api.hxsapp.com/base/feedback/saveFeedback',
            dataType: "jsonp",
            data: {
              content: suggestTxt,
              type: feedbackType,
              bluetooth_state: common.getUrlParam('bluetooth_state'),
              device_state: common.getUrlParam('device_state'),
              sess_token: common.getUrlParam('sess_token')
            },
            async: false,
            success: function (result) {
              console.log(result);
              if (result.code == 200) {
                Toast({
                  message: result.msg,
                  duration: 1000
                });
                suggestion2.val('');
                setTimeout(function () {
                  // window.location.href = 'https://app.hxsapp.com/hxsweb/feedBack?sess_token=' +　common.getUrlParam('sess_token');
                  var __url = 'https://app.hxsapp.com/hxsweb/feedBack?sess_token=' + 　common.getUrlParam('sess_token');
                  window.location.replace(__url);
                }, 1000)

                //提交埋点
                common.buriedPoint({
                  access_occurred_type: 260154,//发生访问的【页面】类型
                  access_occurred_type_id: '',//发生访问的【页面】类型ID
                  previous_event_type_obj: '',//【事件】对象类型
                  previous_event_type_obj_id: '',//【事件】对象类型ID
                  previous_content_sort: ''//【事件】事件参数
                });
              }
              //showLoginPage(result.code, 1, '.common_tip', result.msg);
            },
            error: function () {
              console.log("请求服务器失败");
            }
          });
        }
      }

      $(function () {

        var suggestion = $("#suggestion");
        var bluetoothState = common.getUrlParam('bluetooth_state'),
          deviceState = common.getUrlParam('device_state'),
          feedbackType = 1;

        //设备状态
        deviceCheck(bluetoothState, deviceState);
        function deviceCheck(bluetooth, device) {
          switch (bluetooth) {
            case '-1':
              $('.feedbackBlue >.feedbackTab_r >span').text('未开启');
              break;
            case '0':
              $('.feedbackBlue >.feedbackTab_r >span').text('未知');
              break;
            case '1':
              $('.feedbackBlue >.feedbackTab_r >span').text('已开启');
              break;
            default:
            // console.log(bluetooth);
          }
          switch (device) {
            case '-1':
              $('.feedbackState >.feedbackTab_r >span').text('未连接');
              break;
            case '0':
              $('.feedbackState >.feedbackTab_r >span').text('未知');
              break;
            case '1':
              $('.feedbackState >.feedbackTab_r >span').text('已连接');
              break;
            default:
            // console.log(device);
          }
        }
        //常见问题进入默认
        if (problemEntry == 1) {
          $('#feedbackType').attr({
            'data-feedtype': '0',
            'data-value': '其他'
          })
          $('#feedbackType').text('其他');
          $('.feedbackState').hide();
        }

        //监测输入框
        $("#suggestion").on('input', function () {
          if ($(this).val()) {
            console.log($(this).val());
          }
        })

        //未登录显示登录
        // locationCheckSessToken('.feedbackSubmit', 1);

        //文本框有文字按钮变亮
        // setInterval(function(){
        //     if($('.feedbackContent p textarea').val()){
        //        $("#feedbackSubmit").addClass('bright');
        //     }else{
        //        $("#feedbackSubmit").removeClass('bright');
        //     };
        // });
        //输入时安卓下btn会提高
        // $('.min_height').css({'min-height':$(window).height()});

        //问题
        clickMsg('.feedbackBlue>.feedbackTab_r>img', '将蓝牙状态反馈给我们，有助于帮您解决问题。');
        clickMsg('.feedbackState>.feedbackTab_r>img', '将体脂秤连接状态反馈给我们，有助于帮您解决问题。');
        function clickMsg(obj, msg) {
          $(document).on('click', obj, function () {
            Toast({
              message: msg,
              duration: 1000
            });
          })
        }

        //调起下拉框
        clickLinkage('.feedbackType>.feedbackTab_r>img');
        function clickLinkage(obj) {
          $(document).on('click', obj, function () {
            $('#feedbackType').trigger('click');
          })
          //埋点
          common.buriedPoint({
            access_occurred_type: 260158,//发生访问的【页面】类型
            access_occurred_type_id: '',//发生访问的【页面】类型ID
            previous_event_type_obj: '',//【事件】对象类型
            previous_event_type_obj_id: '',//【事件】对象类型ID
            previous_content_sort: ''//【事件】事件参数
          });
        }

        //iosselect配置
        var showTypeDom = document.querySelector('#feedbackType');
        var TypeIdDom = document.querySelector('#feedId');

        showTypeDom.addEventListener('click', function () {
          var typeId = showTypeDom.dataset['feedtype'];
          var typeValue = showTypeDom.dataset['value'];

          var selectData = [
            { 'id': '2', 'value': '手环' },
            { 'id': '3', 'value': '数据报告' },
            { 'id': '1', 'value': '体脂秤' },
            { 'id': '4', 'value': 'APP使用' },
            { 'id': '0', 'value': '其他' }
          ]
          var sanguoSelect = new IosSelect(1,
            [selectData], {
              title: '请选择问题类型',
              itemHeight: 40,
              oneLevelId: typeId,
              itemShowCount: 5,
              callback: function (selectOneObj) {
                TypeIdDom.value = selectOneObj.id;
                showTypeDom.innerHTML = selectOneObj.value;
                showTypeDom.dataset['feedtype'] = selectOneObj.id;
                showTypeDom.dataset['value'] = selectOneObj.value;

                if ($('#feedbackType').text() != '体脂秤') {
                  $('.feedbackState').hide();
                } else {
                  $('.feedbackState').show();
                }
                //体脂称埋点
                if (selectOneObj.id == 1) {
                  common.buriedPoint({
                    access_occurred_type: 260157,//发生访问的【页面】类型
                    access_occurred_type_id: '',//发生访问的【页面】类型ID
                    previous_event_type_obj: '',//【事件】对象类型
                    previous_event_type_obj_id: '',//【事件】对象类型ID
                    previous_content_sort: ''//【事件】事件参数
                  });
                }
              }
            });
        });

        //iosselect控件补坑
        // $('.user_commitdate').on('click',function(){
        //     $(window).scrollTop('700');
        //     $(this).css('color','#666');
        // });
      })
    }
  },
  beforeDestroy() {
    document.title = common.config.webTitle;
    window.commitFeedback = null;
  },
  components: {
    loginFrame
  }
}
</script>
<style>
@import "../assets/style/iosSelect.css";

.feedbackContent {
  padding: 21px 18px;
  height: 180px;
  position: relative;
}
.feedbackContent p {
  background: url() no-repeat left 1px;
  padding-left: 22px;
  -webkit-background-size: 20px auto;
  background-size: 20px auto;
  color: #333;
}
.feedbackContent p textarea {
  height: 180px;
  color: #333;
  width: 100%;
  resize: none;
  font-size: 16px;
  line-height: 24px;
}
.feedbackContent p textarea:-webkit-textarea-placeholder {
}
.feedbackTab_c {
  height: 50px;
  margin: 0 12px;
  position: relative;
}
.newFeedbackState,
.newFeedbackBlue {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.feedbackType,
.feedbackBlue,
.feedbackState {
  border-bottom: 1px solid rgba(129, 141, 207, 0.2);
}
#feedbackType {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.feedbackTab_l,
.feedbackTab_r {
  font-size: 14px;
  line-height: 50px;
  color: #999;
  cursor: pointer;
}
.feedbackTab_r {
  float: right;
}
.feedbackTab_r span {
  float: left;
}
.feedbackTab_r img {
  float: left;
}
.feedbackTab_l {
  color: #333;
}
.feedbackTab_r img {
  width: 16px;
  height: 16px;
  margin-left: 10px;
  cursor: pointer;
  margin-top: 17px;
}
.newfeedback {
}
.newfeedback .feedbackContent {
  padding: 14px 12px;
  position: relative;
}
.feedbackBlue,
.feedbackState {
  border-bottom: 1px solid rgba(129, 141, 207, 0.2);
}
.newfeedback .feedbackContent p {
  background: url() no-repeat left 1px;
  padding-left: 0;
  -webkit-background-size: auto auto;
  background-size: auto auto;
  color: #333;
}
.newfeedback .solid {
  width: 100%;
  height: 7px;
  background: #f5f5f8;
}
</style>
<style>
/* ios控件样式 */
/* 外部css必须要暴露作用域 */
.ios-select-widget-box .cover-area1 {
  border: none;
  border-top: rgba(129, 141, 207, 0.2) solid 0.5px;
}

.ios-select-widget-box .cover-area2 {
  border: none;
  border-bottom: rgba(129, 141, 207, 0.2) solid 0.5px;
}
</style>
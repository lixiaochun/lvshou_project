<template>
  <div class="getVote" v-if="isShow">

    <div class="infoDetail_vote_box">
      
      <!-- 投票操作选择 区域 -->
      <div v-if="!isShowVoteResulat">
        <div class="infoDetail_vote_box_head">
          <p class="infoDetail_vote_box_title">
            {{columns.vote_theme.theme}}
          </p>
          <span v-if="columns.vote_theme.vote_option == 1">
            单选
          </span>
          <span v-if="columns.vote_theme.vote_option == 2">
            多选
          </span>

        </div>
        
        <div v-for="(data,index) in  columns.vote_option" :key="data.id">
          <div class="infoDetail_vote_box_option">
            <div class="infoDetail_vote_box_radio" @click="clickActive(index,$event)"></div>
            <p>
            {{data.content}}<br />
            </p>
          </div>
        </div>

        <div class="infoDetail_vote_btn" @click="submit()">
          投票
        </div>
      </div>



      <!-- 投票结果显示区域 -->
      <div v-if="isShowVoteResulat">
        <div class="infoDetail_vote_box_head">
          <p class="infoDetail_vote_box_title">
            {{columns.vote_theme.theme}}
          </p>
          <span v-if="columns.vote_theme.vote_option == 1">
            单选
          </span>
          <span v-if="columns.vote_theme.vote_option == 2">
            多选
          </span>
        </div>
        <p class="infoDetail_vote_box_title">
          投票结果 {{columns.vote_sum }}
        </p>
        <div v-for="(data,index) in voteResulat" :key="index">
          <p class="infoDetail_vote_answer_option">
            {{data.content}}
          </p>
          <div class="infoDetail_vote_answer_b">
            <div class="infoDetail_vote_answer_line_box">
              <div class="infoDetail_vote_answer_line">
                <div class="infoDetail_vote_answer_real" :style="'width:'+ ( data.vote_num /columns.vote_sum *100 ) +'%'"></div>
              </div>
            </div>
            <span>
              {{data.vote_num}}
              <br /> 人投票
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import axios from 'axios'
import commonJs from '@/util/common.js'

// var vode_scale = data.data.vote_option[i].vote_num / sumvote;
import { Toast } from 'mint-ui';

export default {
  name: 'getVote',
  props: {
    vote_theme_id: {
      type: String
    }
  },
  data() {
    return {
      
      // 是否显示投票页面组件区域
      isShow: false,

      // 单选 还是双选
      isClooeseOne: false,

      //是否显示投票结果
      isShowVoteResulat: false,

      // 投票结果的数据
      voteResulat: [],

      //测试数据
      columns: null
    }
  },
  mounted() {
    this.selectUserVoteResult();
  },
  methods: {
    // init 投票组件的数据
    selectUserVoteResult() {
      var __sess_token = commonJs.getUrlParam('sess_token');
      var __relation_id = this.$route.params.article_id;

      axios.get('https://api.hxsapp.com/community/vote/selectUserVoteResult', {
        params: {
          sess_token: __sess_token,
          vote_type: 'article',
          relation_id: __relation_id
        }
      })
        .then((response) => {
          console.log(response);
          // debugger

          var __response = response.data;
          this.columns = __response.data;
          // 容错 后端接口没有data的键名称
          if(__response.data){
            // debugger
            this.voteResulat = __response.data.vote_option ? __response.data.vote_option : [];
            this.isClooeseOne = this.columns.vote_theme.vote_option == 1 ? true : false; 
          }

          if (__response.code == 200) {

          // debugger
            //投票时间状态：1-投票未开始 ， 2-投票进行中 ， 3-投票已结束
            if (this.columns.time_state >= 2) {
              this.isShow = true;
              if (this.columns.time_state >= 3) {
                this.isShowVoteResulat = true;
                return;
              }

              //用户是否投票：1-已投票 ， 0-未投票
              if (this.columns.user_is_vote == 1) {
                this.isShowVoteResulat = true;
              }else{

              }
            }
            
          }
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    submit() {
      console.log("submit-test：");
      console.log("submit");

      var indexArr = [];
      $(".infoDetail_vote_box_radio").each(function(index) {

        if (!!$(this).attr("data-index") && $(this).attr("data-index").length != 0) {
          indexArr.push(index)
        }
      })
      if (indexArr.length == 0) {
        console.log("请选择至少一个投票选择")
        Toast({
          message: '请选择至少一个投票选择',
          position: 'bottom',
          iconClass: 'icon icon-warning'
        });
        return;
      }

      console.log(indexArr)

      var __sess_token = commonJs.getUrlParam('sess_token');
      var __relation_id = this.$route.params.article_id;
      var __vote_theme_id = this.vote_theme_id ? this.vote_theme_id : "0" ;

      var __option_id = indexArr.map((index) =>{
        return this.columns.vote_option[index].id
      })
      var saveVoteData = {
          vote_type:'article',
          relation_id:__relation_id,
          vote_theme_id:__vote_theme_id,
          option_id:__option_id,
          sess_token:__sess_token
      }
  
      // debugger
      axios.get('https://api.hxsapp.com/community/vote/saveUserVoteData', {
        params: saveVoteData
      }).then( (response) => {
        console.log(response);
        // debugger
        if(response.data.code == "200"){

          Toast(response.data.msg)

          this.selectUserVoteResult();
          this.isShowVoteResulat = true;

        }else{
          Toast("投票失败："+ response.data.msg )
        }
      })
      .catch(function (error) {
        // debugger
        Toast("投票失败，请稍后再试！")
        console.log(error);

      });

      this.voteResulat = indexArr
    },
    clickActive(index, e) {
      console.log(index, e)
      console.log($(".infoDetail_vote_box_radio").eq(index))
      var __index = index;

      if ($(".infoDetail_vote_box_radio").eq(index).hasClass("radio_active")) {
        $(".infoDetail_vote_box_radio").eq(index).removeClass("radio_active");
        $(".infoDetail_vote_box_radio").eq(index).removeAttr("data-index");

      } else {
        $(".infoDetail_vote_box_radio").eq(index).addClass("radio_active")
        $(".infoDetail_vote_box_radio").eq(index).attr("data-index", index);

        // 单选逻辑
        if (this.isClooeseOne) {
          $(".infoDetail_vote_box_radio").each(function(index) {
            index !== __index && $(this).removeClass("radio_active") && $(this).removeAttr("data-index");
          })
        }
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/*文章投票部分*/

.infoDetail_vote_box {
  width: 100%;
  background-image: linear-gradient(-135deg, #616299 0%, #4E5680 100%);
  padding: 15px 15px 20px;
  box-sizing: border-box;
  color: #fff; // 头部区域
  .infoDetail_vote_box_head {
    position: relative;
    box-sizing: border-box;
    padding-right: 50px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    margin-bottom: 15px;

    .infoDetail_vote_box_title {
      min-height: 25px;
      font-size: 17px;
      line-height: 25px;
      margin-bottom: 10px;
    }
    span {
      text-align: right;
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 20px;
      font-size: 14px;
      color: rgba(255, 255, 255, .5);
    }
  } //选择radio 区域
  .infoDetail_vote_box_option {
    display: block;
    width: 100%;
    position: relative;

    p {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0 0 32px;
      line-height: 22px;
      font-size: 15px;
      margin-bottom: 15px;
      overflow: hidden;
    }

    .infoDetail_vote_box_radio {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      background: url("./../assets/img/radio.png") top left no-repeat;
      background-size: 100% 100%;
      border: 0 none;
    } //选中索引样式
    .radio_active {
      background: url("./../assets/img/radio2.png") top left no-repeat;
      background-size: 100% 100%;
    }
  } //按钮提交 区域
  .infoDetail_vote_btn {
    text-align: center;
    margin: 15px auto 0;
    width: 250px;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    line-height: 45px;
    color: #FFF;
    background-image: linear-gradient(-270deg, #FF6E8D 0%, #FF68B0 97%);
    border-radius: 32px;
    cursor: pointer;
  } //投票显示 区域
  .infoDetail_vote_answer_option {
    margin: 10px 0 0;
  }

  .infoDetail_vote_answer_b {
    width: 100%;
    position: relative;
    height: 18px;

    span {
      position: absolute;
      font-size: 12px;
      width: 60px;
      height: 40px;
      line-height: 16px;
      top: -8px;
      right: 0;
      text-align: right;
    }
    .infoDetail_vote_answer_line_box {
      width: 100%;
      padding-right: 65px;
      box-sizing: border-box;
      height: 12px;

      .infoDetail_vote_answer_line {
        width: 100%;
        margin-top: 5px;
        height: 13px;
        background-color: #F5F5F5;
      }
      .infoDetail_vote_answer_real {
        background-color: #FF6E8D;
        width: 0;
        height: 100%
      }
    }
  }
}
</style>

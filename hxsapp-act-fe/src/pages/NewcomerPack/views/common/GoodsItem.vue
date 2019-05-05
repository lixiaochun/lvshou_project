<!-- 案例介绍 -->
<template>
  <div class="wrapper goods-box">
    <div class="flex">
      <div class="img-r show-img" @click="dialogImg = true ">
        <div class="img-r">
        <img :src="itemsrc">
      </div>
        <img src="../../assets/images/boder.png" class="itembg">
      </div>
      <div class="flex-item">
        <div class="img-r goods-item-img" v-if="total.actinfo!='已开奖'">
          <img src="../../assets/images/join.png" v-if="itemdata.status===0">
        </div>

        <div class="img-r goods-item-img" v-if="total.actinfo === '已开奖'">
          <img src="../../assets/images/back.png" v-if="itemdata.status===1 || itemdata.status===2">
        </div>

        <h4 class="title2">{{itemdata.goods_name}}</h4>
        <div class="progress-box">
          <div class="progress" :style="{'width':allNum}"></div>
        </div>
        <h6 class="number flex-c">参与人数 {{itemdata.user_num}} / {{itemdata.num}}</h6>
        <span class="flex-c">
          <h5 class="flex-item num">
            <span>需要{{itemdata.bean}}绿豆</span>
          </h5>

          <button
            class="flex-c"
            v-if="total.actinfo!='已开奖'"
            @click="dialogTableVisible = true"
            v-bind:disabled="itemdata.status==1? false:true"
            :style="{'color': '#fff', 'background-color':(itemdata.status==1?'#fa4d62':'#959595')}"
          >{{itemdata.status==1?'马上夺宝':'等待开奖'}}</button>
          
          <button
            v-else-if="total.actinfo==='已开奖'"
            class="lookend flex-c"
            :class="itemdata.user_num == itemdata.num ? 'link' : 'text'"
          >
            <router-link
              v-if="itemdata.user_num == itemdata.num"
              :to="{path:'item',query:{goods_id:itemdata.id,sess_token:sess_token,act_id:act_id} }"
            >夺宝结果</router-link>
            <span v-else>夺宝失败</span>
          </button>

          <!-- <router-link to="item"> {{itemdata.type}}</router-link> -->
        </span>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog width="60%" :visible.sync="dialogTableVisible" id="shareDown">
      <div class="share-down">
        <div class="box">
          <div
            class="img-r money-img"
            :style="{'background-color':(code!=''?'rgba(0,0,0,0)':'white'),'padding':(code!=''?'2% 0%':'10%'),'width':(code!=''?'100%':'3.2rem')}"
          >
            <div class="img-r" :style="{'background-color':(code!=''?'rgba(0,0,0,0)':'white'),'padding':(code!=''?'2% 30%':'10%')}">
               <img :src="typeImg">
             </div>
             <img src="../../assets/images/border2.png" class="itembg2" v-if="code==''">

          </div>
          <h2 class="center box1"> <h2 class="center" v-if="tipMsg=='绿豆不足'" :style="{'font-size':'0.5rem'}">参与失败</h2>
          {{code ==""?itemdata.bean+'绿豆':tipMsg}}
          </h2>
         
          <div class="box2">
            <h5 class="title center">{{code ==""?'需要支付'+itemdata.bean+'绿豆参与夺宝':msg}}</h5>
          </div>
          <button class="confirm2" @click="addActivity(itemdata.id, itemdata)" v-if="btnMsg!='马上赚取绿豆'">{{btnMsg}}</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog width="80%" :visible.sync="dialogImg" id="showBox">
      <div class="img-r dialog-img">
        <img :src="itemsrc">
      </div>
      <div class="center box5">
        <h5>{{itemdata.goods_name}}</h5>
      </div>
      <h5>{{itemdata.description}}</h5>
    </el-dialog>
    <!-- 弹出框 -->
  </div>
</template>
<script>
import axios from 'axios'
import {
  urlGet,
  isApp,
  getHxsAppVersion,
  compareAppVersion,
  LsShare
} from 'Utils/common'
import LvshouFetch from 'Api/common'
import {
  userAgent
} from 'Utils/common'
export default {
  name: 'GoodsItem',
  data() {
    return {
      dialogTableVisible: false,
      dialogImg: false,
      awardBtn: "马上夺宝",
      lodou: 100,
      awardNum: 5,
      snatchType: false,
      disabledType: false,
      code: "",
      msg: "",
      typeImg: require('../../assets/images/money.png'),
      tipMsg: "参与成功",
      btnMsg: '确定',
      sess_token: urlGet('sess_token'),
      act_id: urlGet('id'),
      allNum: parseInt(this.itemdata.user_num) / parseInt(this.itemdata.num) * 100 + '%'
    }
  },
  props: {
    itemsrc: String,
    itemdata: Object,
    total: Object,
  },
  created() {

  },
  methods: {
    confirmBtn() {
      var that = this;
      that.dialogTableVisible = false;
    },
    rewardsLook() {
      window.location.href = 'https://hxsapp_jump_myactivity#1';
    },
    addActivity(id, allData) {

      _hmt.push(['_trackEvent', '按钮', '赢绿豆享大牌', '页面初始化'])

      var that = this;
      if (that.code == 200) {
        that.dialogTableVisible = false;
        return;
      } else if (that.code == 305) {
        if (userAgent() === 'ios') {
          window.location.href = 'https://hxsapp_gopage?page_name=TaskBenefitController'
        } else if (userAgent() === 'and') {
          window.location.href = 'hxsapp://goPage?pageName=com.lvshou.hxs.activity.WelfareActivity'
        }

      }
      let dataInfo = {
        sess_token: urlGet('sess_token'),
        act_id: urlGet('id'),
        goods_id: id,
      }
      axios
        .get('https://act.hxsapp.com/beanTreasure/BeanTreasure/Threasure', {
          params: dataInfo
        })
        .then(res => {
          if (parseInt(res.data.code) === 200) {
            that.code = res.data.code;
            that.typeImg = require('../../assets/images/yes.png');
            that.msg = res.data.msg;
            that.itemdata.status = 0;
            // window.location.reload()
            allData.user_num = res.data.num
            this.allNum = parseInt(res.data.num) / parseInt(this.itemdata.num) * 100 + '%'
          } else {
            that.code = res.data.code;
            const _code = res.data.code;
            that.typeImg = require('../../assets/images/no.png');
            if (_code === 603 || _code === 303) {
              that.tipMsg = " 参与失败"
            } else if (_code === 305) {
              that.tipMsg = "绿豆不足"
            } else if (_code === 602) {
              that.tipMsg = "敬请期待"
            }


            that.btnMsg = "马上赚取绿豆"
            that.msg = res.data.msg;
          }
        });
    }
  }
}

</script>
<style>
.el-progress__text {
  font-size: 15px !important;
  margin-left: 0.01rem;
  display: none;
}

.el-progress {
}

.goods-box button {
  line-height: 0.7rem;
  border: 0px;
  letter-spacing: 1px;
  height: 0.7rem;
  padding: 0rem 0.35rem;
  border-radius: 19px;
  text-align: center;
}

.goods-box button a {
  font-size: 0.35rem;
  text-align: center;
  line-height: 0.76rem;
}

.el-progress-bar {
  margin: 0rem;
  padding-right: 0rem;
  margin-bottom: 0.1rem;
  border: 0.06rem solid rgba(0, 0, 0, 0);
  /* background-color: #00000024; */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1.333333rem;
}

.el-progress-bar__outer {
  border-radius: 1.333333rem;
  background-color: rgba(0, 0, 0, 0) !important;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}

.goods-box .el-dialog {
  height: inherit;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/dialog.png");
  border-radius: 0.2rem;
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
}

.goods-box .el-dialog span {
  display: flex !important;
  display: -webkit-flex !important;
  display: -ms-flexbox !important;
  vertical-align: middle;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-align: center;
}

.el-dialog__body {
  padding: 0.5rem 0.6rem;
}

.el-dialog__headerbtn {
  color: hsl(0, 0%, 100%);
  right: 0.05rem;
  text-align: right;
  top: 0.08rem;
}

.el-dialog__headerbtn i {
  color: #909399 !important;
  font-size: 0.5rem;
  font-weight: 600;
}

#showBox .el-dialog__headerbtn i {
}

.el-dialog__header {
  padding-top: 0rem;
}

.el-progress {
  line-height: 0.5rem;
}

.goods-box .el-button {
  border-radius: 0.266667rem;
}

.flex-c {
  display: flex !important;
  display: -webkit-flex !important;
  display: -ms-flexbox !important;
  vertical-align: middle;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-align: center;
  /* -webkit-flex-wrap:wrap; */
  /* flex-wrap:wrap; */
}
</style>
<style lang="less" scoped>
.goods-box {
  padding-bottom: 10px;
  margin-bottom: 0.6rem;
  background-image: url("../../assets/images/b_banner.png");
  background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
}
.goods-box:last-child {
  background-image: url("");
}
.goods-box:first-child{
  background-image: url("../../assets/images/b_banner.png");
}
.goods-box {

  .progress-box {
    padding: 0.05rem 0.06rem;
    margin: 0.15rem 0rem;
    /* border: 0.08rem solid rgba(0, 0, 0, 0); */
    /* background-color: #00000024; */
    /* background-color: rgba(0, 0, 0, 0.3); */
    border-radius: 1.333333rem;
    overflow: hidden;
    background-image: linear-gradient(0deg, 
		#fefbff 0%, #cbedfe 100%), 
   	linear-gradient(	#ef387a, #ef387a);
   	background-blend-mode: normal, 
  }

  .dialog-img {
    width: 100%;
    min-height: 2rem;
  }

  .progress {
    height: 0.3rem;
    width: 100%;
    border-radius: 1.333333rem;
    background-image: url("../../assets/images/banner.png");
    background-size: auto 100%;
  }

  .title {
    margin-bottom: 0.001rem;
  }

  .title2 {
    margin: 0rem;
    padding-top: 0.1rem;
  }

  h5 {
    font-size: 35px;
    margin: 0px;
    text-align: left;
    color: #ffffff;
    font-family: PingFangSC-Regular;
    letter-spacing: 1px;
  }

  h4 {
    font-size: 0.35rem;
    line-height: 0.35rem;
    font-family: PingFangSC-Regular;
    margin: 0px;
    text-align: left;
    letter-spacing: 1px;
    color: #ffffff;
  }

  .goods-item-img {
    width: 1.3rem;
    height: 1.3rem;
    position: absolute;
    top: -20px;
    right: -30px;
    z-index: 98;
  }

  .lookend {
    background: linear-gradient(to right, #664bfc, #9e4bfc);

    &.text {
      background: linear-gradient(to right, #bdbdbd, #bdbdbd);
	    box-shadow: 0px 3px 0px 0px 	rgba(137, 46, 198, 0.6);
    }
  }

  .money-img {
    background-color: white;
    height: 3.2rem;
    width: 3.2rem;
    padding: 12% 15%;
    position: relative;
    border-radius: 0.12rem;
    overflow: inherit;
    margin: 0 auto;
  }
  .money-img>img{

  }
.money-img>div{}
  .number {
    font-size: 0.25rem;
    color: white;
    margin-bottom: 0.09rem;
  }

  .num span {
    font-size: 0.35rem;
    padding: 0rem 0.04rem;
    letter-spacing: 1px;
    color: #2df7d1;
  }

  .confirm2 {
    width: 100%;
    border-radius: 0px;
    border: 0px;
    color: white;
    height: 0.8rem;
    border: 0rem;
    line-height: 0.65rem;
    font-size: 0.35rem;
    background-color: #fe5854;
    background: linear-gradient(to right,#fe5854, #fe5854);
    width: 65%;
    border-radius: 2.5rem;
  }

  .box1 {
    color: white;
    font-size: 0.5rem;
    padding: 0.2rem 0px;
  }

  .box2 .title {
    margin-bottom: 0.4rem;
    padding-top: 0.2rem;
    border-top: 2px dashed white;

    text-align: center;
    width: auto;
    font-size: 0.3rem;
    letter-spacing: 1px;
  }

  .box5 {
    border-bottom: 1px dashed white;
    padding: 0.3rem 0rem;
    margin-bottom: 0.2rem;
    text-align: center;
  }

  .show-img {
       width: 2.2rem;
    height: 2.2rem;
    margin-right: 0.4rem;
    background-color: #ffffff;
    position: relative;
    padding: 0.1rem;
    border-radius: 0.65rem;
    overflow: inherit;
  }
  
  .show-img .img-r{
    width: 2.1rem;
    height: 2.1rem;
    background-color: #ffffff;
    position: relative;
    border-radius: 0.4rem;
    overflow: hidden;
    padding: 0.05rem;
  }
  .itembg{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 110%;
  }
  .itembg2{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 110%;
  }


}
</style>

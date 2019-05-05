<template>
	<div class="solution">
    <div v-if="pageData&&pageData!=''">
      <div class="solution-title">{{pageData.title}}</div>
      <div class="solution-content" v-html="pageData.content"></div>
    </div>
    <div  v-if="pageData==''" class="solution-null">暂无解决方案</div>
    <div class="solution-float" @click="openCustomer" v-if="tag=='hxsHelp_report'||tag=='hxsHelp_impedance'">
        <img src="../assets/images/solution/head_purple.png" alt="">
    </div>
    <preLoading v-if="isPreLoading"></preLoading>
  </div>
</template>
<script>
import axios from "axios";
import { Toast } from "mint-ui";
import commonJs from "@/util/common.js";
import preLoading from "@/components/preLoading";
export default {
  name: "solution",
  data() {
    return {
      tag: null,
      pageData: null,
      sess_token: null,
      isPreLoading: true
    };
  },
  mounted() {
    /**
     * tag  参数值为以下内容
     * hxsHelp_impedance	阻抗值说明
     * hxsHelp_find	 找不到体脂秤-解决方法
     * hxsHelp_report	 无法生成报告-解决方法
     * hxsHelp_connect	称重失败-帮助 (连接失败-解决方法)
     */
    this.tag = commonJs.getUrlParam("tag");
    if (commonJs.getUrlParam("tag") == "hxsHelp_impedance") {
      document.title = "阻抗值说明";
    } else {
      document.title = "解决方案";
    }
    this.sess_token = commonJs.getUrlParam("sess_token");
    this.showPage();
    this.getCustomer();
  },
  beforeDestroy() {
    document.title = common.config.webTitle;
  },
  components: {
    preLoading
  },
  methods: {
    // 获取显示内容
    showPage() {
      axios
        .get("https://act.hxsapp.com/base/Award/rule/" + this.tag + "/json", {})
        .then(res => {
          if (res.data.code == 200) {
            // debugger
            this.pageData = res.data.data;
            this.isPreLoading = false;
          }
        });
    },

    // 跳转客服  咨询我
    getCustomer() {
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
    openCustomer() {
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
    }
  }
};
</script>
<style scoped>
.solution {
  padding: 0 20px;
}
.solution-title {
  color: #333;
  font-size: 17px;
  padding: 14px 0;
}
.solution-content {
  font-size: 15px !important;
  color: #666 !important;
  line-height: 40px !important;
}
.solution-null {
  text-align: center;
  padding-top: 50px;
}
.solution-float {
  position: fixed;
  right: 15px;
  bottom: 25px;
  width: 75px;
  z-index: 99;
}
.solution-float img {
  width: 100%;
}
</style>
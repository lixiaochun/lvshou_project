<template>
  <div class="msg-wrapper">
    <div class="explain-wrapper same">
      <span class="title-1">尊敬的客户：</span>
      <p>您好！</p>
      <p>
        非常感谢您决定在绿瘦健康产业集团有限公司体验基因检测服务，为了确保服务质量，请您认真阅读。您同意且自愿向我们提供您的样品，
        您这样做的主要目的是为了了解和获取自身的基因遗传学信息。基于这些基因遗传学信息和评估意见也仅供您个人参考使用，它并不代表
        已经涵盖了相关疾病或症状未来所有的风险，也并不等于一般意义上的临床医学检测，不能作为临床医学判断，更不能替代临床医学诊断，
        在很多情况下，基因遗传风险评估仅仅是临床医学诊断的补充，是从基因遗传学的角度，为医生做出临床医学诊断、为健康顾问做出健康
        咨询时提供依据和参考，一旦我们收到您的样品，即表明您已经阅读并理解上述文字内容，并对此不存在任何误解和歧义。对于您的理解
        和支持，我们在此表示衷心的感谢！
      </p>
      <span class="message-box">
        对于本次检测，请仔细阅读并理解以下的
        <b @click="goExplainPage">知情同意书>></b>,若您已知悉本次的检测依据，请勾选以下项目确认：
      </span>
      <p class="gene_msg_bottom_ico" v-if="!isAdd">
        <img class="check_state nocheck" src="./../../assets/img/gene_msg/checked.png">
        <span>我已知悉检测同意书</span>
      </p>
      <p class="gene_msg_bottom_ico" @click="checking(showMsg)" v-else>
        <img class="check_state nocheck" :src="showMsg.checkIco">
        <span>我已知悉检测同意书</span>
      </p>
    </div>

    <div class="infor-wrapper same">
      <div class="infor-box">
        <span class="left-infor">基本信息</span>
      </div>
      <div class="infor-box" :class="!isAdd ? '' : 'specil'">
        <i class="point" :class="!isAdd ? 'point-1' : ''"></i>
        <span class="left-infor point-left">检测套餐</span>
        <div class="right-infor write-right-infor" v-if="!isAdd">
          <p class="gene_msg_ico" v-if="getSave.product_type === '1'">
            <span>J2易健康-女性疾病易感基因检测</span>
          </p>
          <p class="gene_msg_ico" v-if="getSave.product_type === '2'">
            <span>M1伊美颜-美容全套基因检测</span>
          </p>
        </div>
        <div class="right-infor" v-else>
          <p class="gene_msg_ico" @click="checking(J2Radio, 'M1Radio', 1)">
            <img class="check_state nocheck" :src="J2Radio.checkIco">
            <span>J2易健康-女性疾病易感基因检测</span>
          </p>
          <p class="gene_msg_ico" @click="checking(M1Radio, 'J2Radio', 2)">
            <img class="check_state nocheck" :src="M1Radio.checkIco">
            <span>M1伊美颜-美容全套基因检测</span>
          </p>
        </div>
      </div>

      <div class="infor-box bottom1" v-for="(item, key) in inforLists" :key="key">
        <i class="point point-1" v-if="item.showPoint"></i>
        <span class="left-infor" :class="item.showPoint ? 'point-left' : ''">{{item.leftName}}</span>

        <div
          class="right-infor write-right-infor"
          v-if="!isAdd"
          :class="item.rightIcon === 'sao' ? 'text-specil' : ''"
        >
          <p class="gene_msg_ico">
            <span>{{item.placeholder}}</span>
          </p>
        </div>

        <div class="right-infor" v-else>
          <div v-if="item.rightType === 'text'">
            <input
              :placeholder="item.placeholder"
              type="text"
              v-model="item.value"
              :style="item.sty"
            >
            <i :class="item.rightIcon" @click="item.click(item)" v-if="item.click"></i>
          </div>

          <div v-if="item.rightType === 'actionsheet'">
            <span @click="item.click(item)" :style="item.sty">{{item.placeholder}}</span>
            <mt-actionsheet :actions="item.lists" v-model="item.value"></mt-actionsheet>
            <i :class="item.rightIcon"></i>
          </div>

          <div v-if="item.rightType === 'select'">
            <select :style="item.sty" v-model="item.value">
              <option class="user_age_tip">{{item.placeholder}}</option>
              <option v-for="(n, key) in item.lists" :key="key">{{n}}{{item.unit}}</option>
            </select>
            <i :class="item.rightIcon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="gene_msg_bottom" v-if="isAdd">
      <p class="gene_msg_bottom_ico">
        <img class="check_state nocheck" :src="submitMsg.checkIco" @click="checking(submitMsg)">
        <span>我确认以上信息是本人如实填写</span>
      </p>
      <p
        class="gene_msg_commit_button"
        :class="isSubmit ? 'commit_check' : ''"
        @click="commitList"
      >确认提交</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { urlGet } from 'Utils/common'
import LsFetch from 'API/common'

export default {
  data() {
    return {
      isRepeat: false, // 是否重复提交
      getSave: {}, // 获取保存的数据
      isAdd: Number(urlGet('isAdd')), // 是否新增 1为新增  0 非新增
      submitMsg: { // 查看同意书 的radio
        checkIco: require("./../../assets/img/gene_msg/check.png"),
        checked: false,
      },
      showMsg: { // 查看同意书 的radio
        checkIco: require("./../../assets/img/gene_msg/check.png"),
        checked: false,
      },

      J2Radio: { // J2易健康-女性疾病易感基因检测
        checkIco: require("./../../assets/img/gene_msg/check.png"),
        checked: false,
      },

      M1Radio: { // M1伊美颜-美容全套基因检测
        checkIco: require("./../../assets/img/gene_msg/check.png"),
        checked: false,
      },

      user: { // 用户的信息填写
        product_type: null, // 选择的套餐类型
        utime: urlGet('utime'),
        sign: urlGet('sign'),
        sess_token: urlGet('sess_token'),
        express_num: '', // 条形码
        sex: '', // 选择的性别
        name: '', // 姓名
        mobile: '', // 手机
        age: '', // 选择的性别
        height: '', // 身高
        weight: '', // 体重
        nationality: '', // 民族
        blood_type: '', // 血型
        email: '', // 邮箱
        address: '' // 地址
      },
      inforLists: [ // 填写列表
        {
          typeName: 'check_num',
          showPoint: true,
          leftName: '检测套餐上的条形码',
          rightType: 'text',
          rightIcon: 'sao',
          placeholder: '请填写编号',
          value: '',
          sty: 'margin-right: 30px;',
          click: () => {
            this.scave()
          }
        },
        {
          typeName: 'nick',
          showPoint: true,
          leftName: '姓名',
          rightType: 'text',
          rightIcon: '',
          value: '',
          placeholder: '请输入受检人真实姓名',
          sty: ''
        },
        {
          typeName: 'order_mobile',
          showPoint: true,
          leftName: '手机',
          rightType: 'text',
          rightIcon: '',
          value: '',
          placeholder: '请填写下单时的手机号码',
          sty: ''
        },
        {
          typeName: 'sex',
          showPoint: true,
          leftName: '性别',
          lists: [
            {
              name: '男',
              method: (value) => {
                this.inforLists[3].placeholder = value.name
                this.user.sex = value.name
              }
            },
            {
              name: '女',
              method: (value) => {
                this.inforLists[3].placeholder = value.name
                this.user.sex = value.name
              }
            }
          ],
          click: (item) => {
            if (!item.value) item.value = true
          },
          rightType: 'actionsheet',
          rightIcon: 'more',
          value: false,
          placeholder: '请选择性别',
          sty: 'margin-right: 10px;'
        },
        {
          typeName: 'age',
          showPoint: true,
          leftName: '年龄',
          rightType: 'select',
          rightIcon: 'more',
          lists: 80,
          value: '请选择年龄',
          placeholder: '请选择年龄',
          unit: '', // 数据单位
          sty: 'margin-right: 10px;'
        },
        {
          typeName: 'height',
          showPoint: true,
          leftName: '身高',
          rightType: 'select',
          rightIcon: 'more',
          lists: 280,
          value: '请选择您的身高',
          placeholder: '请选择您的身高',
          unit: 'cm', // 数据单位
          sty: 'margin-right: 10px;'
        },
        {
          typeName: 'weight',
          showPoint: true,
          leftName: '体重',
          rightType: 'select',
          rightIcon: 'more',
          lists: 500,
          value: '请选择您的体重',
          placeholder: '请选择您的体重',
          unit: 'kg', // 数据单位
          sty: 'margin-right: 10px;'
        },
        {
          typeName: 'nationality',
          showPoint: false,
          leftName: '民族',
          rightType: 'text',
          rightIcon: '',
          value: '',
          placeholder: '请填写您的民族',
          sty: ''
        },
        {
          typeName: 'blood_type',
          showPoint: false,
          leftName: '血型',
          rightType: 'select',
          rightIcon: 'more',
          lists: ['A型', 'B型', 'AB型', 'O型'],
          value: '请选择您的血型',
          placeholder: '请选择您的血型',
          unit: '', // 数据单位
          sty: 'margin-right: 10px;'
        },
        {
          typeName: 'email',
          showPoint: false,
          leftName: '邮箱',
          rightType: 'text',
          rightIcon: '',
          value: '',
          placeholder: '请输入您的电子邮箱',
          sty: ''
        },
        {
          typeName: 'address',
          showPoint: false,
          leftName: '地址',
          rightType: 'text',
          rightIcon: '',
          value: '',
          placeholder: '请填写您的邮寄地址',
          sty: ''
        }
      ]
    }
  },
  created() {
    document.title = '基因检测知情同意书'

    // 如果isAdd = 0 获取检测报告
    if (!this.isAdd) this.getGeneInfo()
  },

  watch: {
    inforLists: {
      handler(value, oldvalue) {
        value.forEach(item => {
          if (item.leftName === '检测套餐上的条形码') {
            this.user.express_num = item.value
          }
          if (item.leftName === '姓名') {
            this.user.name = item.value
          }
          if (item.leftName === '手机') {
            this.user.mobile = item.value
          }
          if (item.leftName === '年龄') {
            this.user.age = item.value === '请选择年龄' ? '' : item.value
          }
          if (item.leftName === '身高') {
            this.user.height = item.value === '请选择您的身高' ? '' : item.value
          }
          if (item.leftName === '体重') {
            this.user.weight = item.value === '请选择您的体重' ? '' : item.value
          }
          if (item.leftName === '民族') {
            this.user.nationality = item.value
          }
          if (item.leftName === '血型') {
            this.user.blood_type = item.value === '请选择您的血型' ? '' : item.value
          }
          if (item.leftName === '邮箱') {
            this.user.email = item.value
          }
          if (item.leftName === '地址') {
            this.user.address = item.value
          }
        });
      },
      deep: true // 深度监控 
    }
  },

  computed: {
    isSubmit() { // 是否允许提交
      let isInit = true
      Object.keys(this.user).forEach(key => {
        if (key !== 'nationality' && key !== 'blood_type' && key !== 'email' && key !== 'address' && !this.user[key]) isInit = false
      })
      if (!isInit) return false
      if (this.submitMsg.checked && this.showMsg.checked && (this.J2Radio.checked || this.M1Radio.checked)) {
        return true
      }
      return false
    }
  },

  methods: {

    // 根据检测编号-获取基因检测报告
    async getGeneInfo() {
      let opts = {
        utime: urlGet('utime'),
        sign: urlGet('sign'),
        sess_token: urlGet('sess_token'),
        check_num: urlGet('check_num')
      }

      let data = await LsFetch({
        url: 'https://api.hxsapp.com/slim/Gene/getYMRGeneAgressByCheckNum',
        type: 'post',
        data: opts
      })
      console.log(data)
      this.getSave = data

      // 写入页面
      this.inforLists.forEach(list => {
        if (list['typeName'] === 'sex') {
          list['placeholder'] = data[list['typeName']] === '1' ? '男' : '女'
        } else {
          list['placeholder'] = data[list['typeName']]
        }
        
      })
    },

    // 提交
    async commitList() {
      let json = JSON.parse(JSON.stringify(this.user))

      if (
        json.express_num === '' || // 条形码
        json.sex === '' || // 选择的性别
        json.name === '' || // 姓名
        json.mobile === '' || // 手机
        json.age === '' || // 选择的性别
        json.height === '' || // 身高
        json.weight === '' // 体重
      ) {
        Toast("带 * 的信息要填写完整哦！", "信息未填完");
        return; //不通过验证就不会提交接口
      }

      if (!/^1[0-9][0-9]\d{8}$/.test(json.mobile)) {
        Toast('不是完整的11位手机号或者正确的手机号前七位')
        return
      }

      const emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
      if (json.email && !emailReg.test(json.email)) {
        Toast('邮箱地址不正确!')
        return
      }
      json['nick'] = json['name']
      json['order_mobile'] = json['mobile']
      json['check_num'] = json['express_num']
      json['sex'] = json['sex'] === '男' ? 1 : 0

      // console.log(json, this.isSubmit)
      if (!this.isSubmit) return
      if (this.isRepeat) {
        Toast('正在提交中, 请勿重复提交!')
        return
      }
      this.isRepeat = true
      await LsFetch({
        url: 'https://api.hxsapp.com/slim/Gene/saveYMRGeneAgreement',
        type: 'post',
        data: json
      })
      // this.isRepeat = false

      Toast('提交成功!')
      window.location.href = "https://hxsapp_comeback"
    },

    // 调起扫码协议
    scave() {
      let that = this
      // 扫描完成的回调函数
      window.returnErCode = data => {
        this.inforLists[0].value = data
      }
      window.location.href = 'https://hxsapp_scanordercode'
    },

    // 跳转基因检测知情同意书
    goExplainPage() {
      window.location.href = 'https://app.hxsapp.com/hxsweb/showMsg'
    },

    // 对应的radio
    checking(item, otherType, num) {
      let _Boolean = item.checked

      if (otherType && num) {
        this[otherType].checked = false;
        this[otherType].checkIco = require("./../../assets/img/gene_msg/check.png");
        this.user.product_type = num
      }


      if (_Boolean) {
        item.checked = false;
        item.checkIco = require("./../../assets/img/gene_msg/check.png");
      } else {
        item.checked = true;
        item.checkIco = require("./../../assets/img/gene_msg/checked.png");
      }
    }
  }
}
</script>

<style lang="less" scoped>
.msg-wrapper {
  .same {
    width: 92%;
    height: 100%;
    background-color: #fff;
    padding: 4%;
    color: #666666;
    font-size: 15px;
    line-height: 30px;
  }
  .explain-wrapper {
    span {
      display: block;
    }
    p {
      text-indent: 2em;
    }
    .message-box {
      margin-top: 10px;
      b {
        color: #818dcf;
        font-weight: normal;
      }
    }
    .gene_msg_bottom_ico {
      margin-top: 10px;
      margin-bottom: 18px;
      text-align: center;
      text-indent: 0em;
      img {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-top: 3px;
        vertical-align: top;
      }
      span {
        display: inline-block;
        padding: 0 1px;
        text-align: left;
        line-height: 15px;
        margin-top: 5px;
        vertical-align: top;
      }
    }
  }
  .infor-wrapper {
    border-top: 7px solid #f5f5f8;
    padding: 0 4% 4%;
    .infor-box {
      position: relative;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #f5f5f8;
      .left-infor {
        // display: inline-block;
        // width: 30%;
        font-weight: 500;
        color: #333333;
      }
      .point-left {
        margin-left: 7px;
      }
      &.bottom1 {
        // border-bottom: 1px solid #e6e8f5;
      }
      .point {
        width: 7px;
        height: 7px;
        background: url(./../../assets/img/gene_msg/point.png) no-repeat;
        background-size: 100%;
        position: absolute;
        left: 0px;
        top: 27%;
        margin-top: -3.5px;
        margin-right: 5px;
        -webkit-background-size: 100% auto;
        background-size: 100% auto;
      }
      .point-1 {
        top: 50%;
      }

      .right-infor {
        display: inline-block;
        position: absolute;
        right: 0;
        &.text-specil {
          width: 50%;
        }
        input {
          text-align: right;
          color: #666666;
          font-size: 13px;
        }
        .sao {
          width: 25px;
          height: 25px;
          background: url(./../../assets/images/sao.png) no-repeat;
          background-size: 100%;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -12.5px;
          -webkit-background-size: 100% auto;
          background-size: 100% auto;
        }
        .more {
          width: 10px;
          height: 5.8px;
          background: url(./../../assets/img/return01-blue@2x.png) no-repeat;
          background-size: 100% 100%;
          -webkit-background-size: 100% 100%;
          transform: rotate(270deg);
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -2.9px;
        }
        span,
        input::-webkit-input-placeholder {
          color: #999;
          font-size: 11px;
        }
        select {
          -webkit-appearance: none;
          border: none;
          color: #999;
          background-color: white;
          direction: rtl;
          font-size: 11px;
        }
      }

      .write-right-infor {
        display: inline-block;
        position: absolute;
        right: 0;
        color: #999999;
        font-size: 13px;
        width: 75%;
      }

      .gene_msg_ico {
        line-height: 15px;
        margin-top: 15px;
        text-indent: 0em;
        img {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-top: 3px;
          vertical-align: top;
        }
        span {
          display: inline-block;
          padding: 0 1px;
          text-align: left;
          line-height: 15px;
          margin-top: 5px;
          vertical-align: top;
        }
      }
      &.specil {
        height: 90px;
      }
    }
  }
  .gene_msg_bottom {
    padding: 30px 0 70px 0;
    .gene_msg_bottom_ico {
      position: relative;
      text-align: center;
      .check_state {
        width: 18px;
        height: 18px;
        display: inline-block;
        margin-bottom: -0.14rem;
        margin-right: 4.5px;
      }
      span {
        font-family: "PingFangSC-Regular";
        font-size: 15px;
        color: #333;
        display: inline-block;
        height: 1rem;
        margin-top: -0.1rem;
      }
    }
    .gene_msg_commit_button {
      width: 250px;
      background-color: #e0e0e0;
      border-radius: 31px;
      line-height: 45px;
      text-align: center;
      margin: 20px auto 0 auto;
      cursor: pointer;
      font-family: "PingFangSC-Regular";
      font-size: 17px;
      color: #ffffff;
    }
    .commit_check {
      background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#ff68b0),
        color-stop(97%, #ff6e8d)
      );
    }
  }
}
</style>

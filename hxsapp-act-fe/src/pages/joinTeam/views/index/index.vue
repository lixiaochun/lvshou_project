<template>
  <div class="wrapper joinTeam-wrapper">
    <ls-pv :is-bg="isBg"></ls-pv>
    <div class="rule-wrapper" @click="dialogVisible = true">
      <span>活动规则</span>
    </div>
    <mt-swipe :auto="6666">
      <mt-swipe-item class="bg-same bg1"></mt-swipe-item>
      <mt-swipe-item class="bg-same bg2"></mt-swipe-item>
      <mt-swipe-item class="bg-same bg3"></mt-swipe-item>
      <mt-swipe-item class="bg-same bg4"></mt-swipe-item>
    </mt-swipe>

    <div class="price">
      <span>￥29</span>
      <div class="people">
        <b>4</b>
        <span>人团</span>
        <span class="text">火力组队价</span>
      </div>
      <div class="time">
        <div class="last-time">距离活动结束仅剩</div>
        <ls-time-down></ls-time-down>
      </div>
    </div>

    <div class="title-wrapper">
      <h5>智能体脂秤 12项数据为你身体解密</h5>
      <span>
        {{titleText}}
        <b>{{titleExplain}}</b>
      </span>
      <span class="rule">拼团规则：开团并邀请3人参团，人数未...</span>
      <div class="people-atavar">
        <img :src="list.img" v-for="(list, key) in peopleList" :key="key" @click="goWechat(list)">
      </div>
    </div>

    <div v-if="isWechat">
      <div class="detail" v-for="(list, key) in detailList" :key="key">
        <img :src="list.img">
      </div>
    </div>

    <div class="btn-wrapper" v-if="isWechat">
      <div class="left" @click="goBuy">
        <span class="price-box">￥89</span>
        <span>单独购买</span>
      </div>
      <div class="right" @click="goWechat(null)">
        <span class="price-box">￥29</span>
        <span>发起拼团</span>
      </div>
    </div>

    <div class="login-wrapper" v-if="!isWechat">
      <h5>{{login.title}}</h5>
      <span class="desc">{{login.desc}}</span>
    </div>

    <div>
      <el-dialog :visible.sync="dialogVisible" style="margin-top: 0px;">
        <i class="close-btn" @click="dialogVisible = false"></i>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { urlGet, splicingUrl, baseInforPage } from 'Utils/common'
import { LsShareInit } from 'Utils/share'

export default {
  data() {
    return {
      login: {
        title: '注册下载即可参团',
        desc: '如您已注册好享瘦APP,可优先在APP发起拼团哦'
      },
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign')
      },
      isBg: '',
      dialogVisible: false,
      titleText: '商城价 89元，成功分享3位好友即可',
      titleExplain: '立减60',
      peopleList: [
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/ltpsht8aunr0go5n9rmdfy7gsdmlpnxy'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/t5g2w1v31dvtxrzapl1wxrk5fv2byo5w',
          isClick: true
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/c3o6c47jgot6inbw9g8hiqnxo7a7fz07',
          isClick: true
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/xj21yl4nfjqvmsafxtrc2xhlu0gbhtth',
          isClick: true
        }
      ],
      detailList: [
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/5uudbzti4hdx8m9uwirkho2kcaihgg63'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/4nktkcbo9a1vnj3r3q74vwmv9b0iwgx3'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/xkfajymmgzup0ai3uamup6qvqxmh07g3'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/zdgzj7fhuqgeh8d346jp9t09p6c7xys5'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/nfecpez2c19sh34wqav8nvj37mo6ax59'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/b0pvb61600q67jzre58v18ylg1g621ab'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/y6yp3788fvmk5xrur94dchid4p0ejz1b'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/qz3l80lxjl43wse76otgaq5j5t2cfhdm'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/09q4qanen6t4ed67r5rrig8ql0s52w5g'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/lk85fxu4nneunm2cum2rljjur69lt2dh'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/3lxb3lioikenjsndyjc0i0qocamryadp'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/gwm710czmad79k7she15pknk7vhx48zr'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/x8atvpo7wvhycifi2u7h8szo03s4i3qj'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/c5fcdx26pdtwe4ojsbov178gafiqxvci'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/3fxidvoxw7403soznlw55o4c7orccp43'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/dwj6uuzz91al0uwp0jvzdhuvdggs0jkg'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/ntlo1bkq4d20smpj2tf9wllqwz0g58i3'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/ptue44z04tcwb2sw4wg3zu2a9w8g9juh'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/u2j6aq2r312kxsjlbokh417ivr1ttp9o'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/hbbeddl6u803798hc73feipw5z22dhno'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/b6aiechc84f9olvpirjofxl3bfajisqi'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/gi4hmtml1lxzu54ugyqd906u2n1goxpj'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/ljf53avsumv2lzgqrq7u8hxslg6frct5'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/c1ahdj2okghn3icz9g2slw06dcmpmb22'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/xvuv4uvwjurxhircmnk5nij922wr2k2a'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/8k0g7cca6be9urdoz2pwqwufo44q1ef6'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/d1qadeua1wh34mh5zsh16yc041rxu39x'
        },
        {
          img: 'http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/hgfq5bclev75cxisgkn3examwpvbdjg5'
        }
      ]
    }
  },
  created() {
  },
  computed: {
    isWechat() {
      if (urlGet('iswechat')) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.isBg = '#61ddc3'
  },
  methods: {
    showRule() {

    },
    goBuy() {
      const buyUrl = splicingUrl(this.baseInformation, 'https://app.hxsapp.com/hxsweb/newShopDetail/tizhichen1')
      window.location.href = buyUrl
    },
    async goWechat(item) {
      if ((item && !item.isClick) || !this.isWechat) return
      const { link } = await baseInforPage()
      Object.assign(this.baseInformation, { iswechat: 1 })
      const shareLink = splicingUrl(this.baseInformation, link)
      const opts = {
        type: true,
        initData: { shareLink },
        isJs: true
      }
      LsShareInit(opts)
    }
  }
}
</script>

<style lang="less">
.joinTeam-wrapper {
  .rule-wrapper {
    position: fixed;
    top: 19px;
    width: 130px;
    height: 50px;
    line-height: 50px;
    background-image: url("http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/88deoh1h5haq0w2034yvqet6lqsuuysx");
    background-repeat: no-repeat;
    background-size: 100% auto;
    z-index: 999;
    color: #109781;
    font-size: 18px;
    font-weight: bold;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .price {
    position: relative;
    padding: 9px 22px;
    width: 100%;
    height: 110px;
    background: linear-gradient(#fedac0, #ffcda5);
    text-align: left;
    span {
      display: inline-block;
      color: #c63115;
      font-size: 70px;
    }
    .people {
      position: absolute;
      top: 48px;
      margin-left: 12px;
      display: inline-block;
      width: 98px;
      height: 35px;
      background: #88633f;
      border-radius: 5px;
      b {
        margin: 2px 2px 2px 3px; /*no*/
        display: block;
        width: 36px;
        height: 27px;
        line-height: 30px;
        background-color: #ffd1ae;
        border-radius: 5px;
        font-size: 32px;
        text-align: center;
        font-weight: 200;
        color: #88633f;
      }
      span {
        position: absolute;
        display: block;
        top: 4px;
        right: 5px;
        font-size: 21px;
        color: #fff;
      }
      .text {
        top: 4px;
        left: 110px;
        width: 130px;
        font-size: 23px;
        color: #87623e;
      }
    }
    .time {
      position: absolute;
      top: 20px;
      right: 30px;
      .last-time {
        font-size: 23px;
        color: #703e36;
      }
      .time-box {
        color: #88633f;
        span {
          font-size: 23px;
        }
      }
    }
  }
  .title-wrapper {
    width: 100%;
    height: auto;
    min-height: 100px;
    background-color: #fffcf5;
    font-size: 0;
    h5 {
      margin: 20px auto;
      display: block;
      width: 90%;
      text-align: left;
      font-size: 42px;
      color: #7b5b3c;
    }
    span {
      margin: 0 auto;
      padding-bottom: 10px;
      display: block;
      width: 90%;
      font-size: 30px;
      color: #a09081;
      text-align: left;
      border-bottom: 2px dashed #f1e3da;
      b {
        color: #ff6600;
      }
      &.rule {
        margin: 20px auto;
        border-bottom: none;
      }
    }
    .people-atavar {
      margin: 0 auto;
      width: 90%;
      height: 150px;
      img {
        width: 97px;
        height: 94px;
        border-radius: 50%;
      }
    }
  }
  .detail {
    font-size: 0px; /*no*/
    img {
      margin-top: -1px;
      width: 100%;
      height: auto;
    }
  }
  .btn-wrapper {
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 120px;
    background: #fff;
    div {
      display: inline-block;
      padding-top: 12px;
      width: 48.5%;
      height: 100%;
      font-size: 0px;
      span {
        display: block;
        font-size: 25px;
        text-align: center;
      }
      &.left {
        color: #736457;
      }
      &.right {
        color: #fff;
        background-color: #ff668c;
      }
      .price-box {
        font-weight: 400;
        font-size: 40px;
      }
    }
  }
  .mint-swipe {
    width: 100%;
    height: 745px;
    .mint-swipe-item {
      &.bg1 {
        background: url("http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/bd9jruzatgg2mgolwx0bc4zd5ft49h4b");
      }
      &.bg2 {
        background: url("http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/bit06ueqmn1e6bgx9iir233nnnb657v9");
      }
      &.bg3 {
        background: url("http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/qzf0agyg5klzjauc9fc0pddenn999orz");
      }
      &.bg4 {
        background: url("http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/lmacptwprtb8723fomz6jt40sf2oemt3");
      }
      &.bg-same {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
      }
    }
    .mint-swipe-indicators {
      bottom: 2px;
      .mint-swipe-indicator {
        width: 12px;
        height: 12px;
        background: #726c7a;
        opacity: 1;
        &.is-active {
          background: #32de93;
        }
      }
    }
  }
  .login-wrapper {
    margin-top: 10px;
    width: 100%;
    height: auto;
    min-height: 180px;
    background-color: #fffcf5;
    font-size: 0px;
    h5 {
      display: block;
      margin: 0;
      padding: 25px 0 10px;
      color: #68463c;
      font-size: 38px;
      font-weight: 600;
    }
    .desc {
      font-size: 28px;
      color: #b95e3c;
    }
  }
  .el-dialog {
    width: 80%;
    height: 70%;
    background: none;
    background-image: url("http://hxsapp-fe.oss-cn-hangzhou.aliyuncs.com/201905/me74lt0a95vuy33oiif4crgxs6vxifz0");
    background-repeat: no-repeat;
    background-size: 100% auto;
    box-shadow: none;
    .el-dialog__body {
      position: relative;
      width: 100%;
      height: 100%;
      .close-btn {
        position: absolute;
        display: block;
        width: 15%;
        height: 25%;
        top: 65%;
        left: 43%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>

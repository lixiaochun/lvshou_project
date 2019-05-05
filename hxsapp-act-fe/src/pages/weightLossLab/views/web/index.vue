<template>
  <div class="wrapper weightLossLab">
    <ls-pv></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="imgBox">
      <img src="../../assets/images/img_01.jpg" class="image" alt="">
    </div>
    <!--第一个顾问-->
    <section v-for="(item, index) in items" v-bind:key="index" v-if="item.code==200" :data-code="item.code" v-bind:class="sectionClass(item.vid)">
      <div class="imgBox">
        <img :src="item.user_logo" class="image" alt="">
      </div>
      <!--视频-->
      <div class="web_video autoWidth" v-if="isQQBrowser">
        <ls-x5-image-video :poster="item.poster" :sourceSrc="item.video" :vid="item.lookMoreMoveUserId"></ls-x5-image-video>
      </div>
      <div class="autoWidth video-js-box" v-else>
        <ls-video :poster="item.poster" :sourceSrc="item.video" :vid="item.lookMoreMoveUserId"></ls-video>
      </div>
      <!--<div class="web_video autoWidth">-->
        <!--<ls-video :poster="item.poster" :sourceSrc="item.video" :vid="item.lookMoreMoveUserId"></ls-video>-->
      <!--</div>-->
      <div class="autoWidth">
        <!--热评-->
        <div class="hot" @click='lookMove(index,0)' v-if="item.comment_hot.length">
          <div class="thr"></div>
          <div class="content">
            <section class="contTop">
              <h5>
                <img src="../../assets/images/hotReview.png" class="image" alt="">
                <div>热评</div>
              </h5>
              <div class="fabulous">{{item.comment_hot[0].hot}}赞</div>
            </section>
            <section class="comment">
              <h4>{{item.comment_hot[0].nickname}}：</h4>
              <div>{{item.comment_hot[0].content}}</div>
            </section>
          </div>
          <div class="foo"></div>
        </div>
        <!--视频点赞-->
        <div class="videoFabulous">
          <div>
            <img src="../../assets/images/comment.png" class="image" alt="">
            <span>{{item.comment_num}}</span>
          </div>
          <div>
            <img src="../../assets/images/fabulous.png" class="image" alt="">
            <span>{{item.commend_num}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- end -->
    <div class="footerToH5"></div>
    <footer class="toh5 buttonBackground flex" @click="downLoadApp">
      点击下载好享瘦APP观看更多视频
    </footer>
  </div>
</template>
<script>
import axios from 'axios';
import { urlGet, LsShare, splicingUrl } from 'Utils/common'
import LvshouFetch from 'Api/common';
import { Toast } from 'mint-ui'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)

export default {
  data() {
    return {
      nickname: '绿瘦',
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign'),
        is_web: urlGet('is_web')
      },
      isQQBrowser: true,
      items: [
        {
          diary_id: 143973,
          code: 200, // 动态状态码
          lookMoreMoveUserId: 'img_30',
          user_logo: require('../../assets/images/img_30.jpg'),
          poster: require('../../assets/images/img_31.jpg'),
          vid: 'video_1544087975',
          video: 'https://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-hd/video_1544087975.m3u8',
          video_description: '曾雪琳减肥第42天',
          comment_hot: [{
            nickname: 'hxs976896',
            content: '',
            hot: 0
          }],
          comment_num: 0,
          commend_num: '0'
        },
        {
          diary_id: 143972,
          code: 200, // 动态状态码
          lookMoreMoveUserId: 'img_32',
          user_logo: require('../../assets/images/img_32.jpg'),
          poster: require('../../assets/images/img_33.jpg'),
          vid: 'video_1544088155',
          video: 'https://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-hd/video_1544088155.m3u8',
          video_description: '蓝凌珂大结局',
          comment_hot: [{
            nickname: 'hxs976896',
            content: '',
            hot: 0
          }],
          comment_num: 0,
          commend_num: '0'
        },
        {
          diary_id: 143979,
          code: 200, // 动态状态码
          lookMoreMoveUserId: 'img_34',
          user_logo: require('../../assets/images/img_34.jpg'),
          poster: require('../../assets/images/img_35.jpg'),
          vid: 'video_1544088276',
          video: 'https://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-hd/video_1544088276.m3u8',
          video_description: '黄思颖减肥前',
          comment_hot: [{
            nickname: 'hxs976896',
            content: '',
            hot: 0
          }],
          comment_num: 0,
          commend_num: '0'
        }
      ]
    }
  },
  created() {
    // // 获取基础数据
    this.getBaseInfo();
    this.getData();
    this.topicId = this.$route.params.topicId;
    for (let i = 0; i < this.items.length; i++) {
      this.getDiaryById(this.items[i].diary_id, i);
    }
    // 判断是否是腾讯开发QQ浏览器内核
    let reg = /MQQBrowser/gi;
    let UA = window.navigator.userAgent;
    if (reg.test(UA)) {
      this.poster = this.posterQQ;
      this.isQQBrowser = true;
      // alert('这是QQ浏览器内核')
    } else {
      this.isQQBrowser = false;
    }
    // this.dynameicInfo()
    _hmt.push(['_trackEvent', '按钮', '减肥实验室', '页面初始化'])
  },
  mounted() {
    if (window.$pv_) {
      setTimeout(function () {
        this.$refs.loading.isLoading = false;
      }.bind(this), 500)
    } else {
      window.$pv_ = true
    }
  },
  methods: {
    sectionClass(index) {
      return 'section_' + index
    },
    async getBaseInfo() {
      // 通过接口获取基础信息
      const data = this.baseInformation
      const apiData = await LvshouFetch({
        url: 'https://act.hxsapp.com/base/Api/actInfo',
        data
      })
      // 通过api 接口 动态改变title
      document.title = apiData.title
      // 调起app 的分享协议
      // console.log('------------调起app 的分享协议--------------------')
      // console.log(Object.assign({}, this.baseInformation, {is_web: true}))
      // console.log(this.baseInformation)
      // let link = splicingUrl(Object.assign({}, this.baseInformation, {is_web: true}), apiData.link);
      // LsShare({
      //   shareLink: link,
      //   shareTitle: apiData.title,
      //   shareImages: apiData.share_pic,
      //   shareDescr: apiData.descr,
      //   shareType: apiData.share_type
      // })
    },
    // https://hxsapp_user_info#用户user-id
    hxsapp_user_info(user_id) {
      if (!user_id) {
        return false;
      }
      location.href = 'https://hxsapp_user_info#' + user_id
    },
    // 下载APP
    downLoadApp() {
      window.location.href = 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=536';
    },
    // 点击 观看视频
    lookMove() {

    },
    imagesClick(key) {
      console.log(key)
    },
    // 动态详情(3.0)
    getDiaryById(diary_id, _index) {
      let baseInformation = this.baseInformation;
      let self = this;
      axios
        .get('https://api.hxsapp.com/community/userDiary/getDiaryById', {
          params: {
            diary_id: diary_id,
            utime: baseInformation.utime,
            sign: baseInformation.sign
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code && parseInt(res.data.code) !== 200) {
            if (_index || _index === 0) {
              self.items[_index].code = parseInt(res.data.code);
            } else {
              Toast(res.data.msg)
            }
            return false
          }
          self.items[_index].comment_num = parseInt(res.data.data.comment_num) > 999 ? '999+' : parseInt(res.data.data.comment_num);
          self.items[_index].commend_num = parseInt(res.data.data.commend_num) > 999 ? '999+' : parseInt(res.data.data.commend_num);
          self.items[_index].comment_hot = res.data.data.comment_hot;
        });
    },
    // 获取视频 点赞
    getMoveFabulous() {

    },
    // 获取评论
    dynameicInfo() {
      let baseInformation = this.baseInformation;
      axios
        .get('https://api.hxsapp.com/community/userDiary/getDiaryById', { params: {
          diary_id: 14397,
          utime: baseInformation.utime,
          sign: baseInformation.sign
        }})
        .then(res => {
          console.log('---------------------https://api.hxsapp.com/community/userDiary/getDiaryById-------------------')
          console.log(res.data);
        })
        .catch(err => {
          console.log('err', err)
        });
    },
    getData() {
      var _this = this;

      let IMjson = {
        sess_token: urlGet('sess_token')
      };
      axios
        .get('https://api.hxsapp.com/account/userAccount/getOpenIMAccount', {
          params: IMjson
        })
        .then(res => {
          if (parseInt(res.data.code) === 200 && res.data.data.service_openim_account) {
            _this.service_openim_account = res.data.data.service_openim_account;
            let json = {
              chat_account: _this.service_openim_account
            };
            axios
              .get(
                'https://api.hxsapp.com/account/UserInfo/getChatInfoByChatAccount',
                {
                  params: json
                }
              )
              .then(resp => {
                console.log('------resp.data--------')
                console.log(resp.data)
                if (resp.data.data) {
                  _this.nickname = resp.data.data[_this.service_openim_account].nickname;
                }
              });
          }
        });
    },
    player(e) {
      if (e.status !== 'init') {
        return false;
      }
      switch (e.vid) {
        case 'video_1544087975':
          _hmt.push(['_trackEvent', '视频', '减肥实验室', '曾雪琳减肥第42天'])
          break;
        case 'video_1544088155':
          _hmt.push(['_trackEvent', '视频', '减肥实验室', '蓝凌珂大结局'])
          break;
        case 'video_1544088276':
          _hmt.push(['_trackEvent', '视频', '减肥实验室', '黄思颖减肥前'])
          break;
        default:
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .hot{
    margin-top: 20px;
    .thr{
      /*backgound-color:#f5f4f9;*/
      width: 0;
      height: 0;
      border-left:20px solid #f5f4f9;
      border-top:10px solid transparent;
      border-right:10px solid transparent;
    }
    .content{
      background:#f5f4f9;
      padding: 30px;
      .contTop{
        display: flex;
        justify-content: space-between;
        align-items: center;
        h5{
          margin: 0;
          font-size: 0.5rem;
          color: #ff668c;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img{
            width: 0.5rem;
            height: 0.5rem;
            margin-bottom: 0.05rem;
            margin-right: 0.1rem;
          }
        }
        .fabulous{
          color: #bfbfc1;
          font-size: 0.44rem;
        }
      }
      .comment{
        /*display: flex;*/
        /*justify-content: flex-start;*/
        /*align-items: flex-start;*/
        font-size: 0.4rem;
        text-align: left;
        margin-top: 20px;
        line-height: 44px;
        >h4{
          display: inline;
          margin: 0;
          color: #818dcf;
        }
        >div{
          display: inline;
          color: #666666;
        }
      }
    }
    .foo{
      padding-top: 30px;
      border-bottom: 1px solid #e6e8f5;
    }
  }
  .videoFabulous{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 0 40px;
    >div{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 20px;
      margin-left: 40px;
      img{
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 10px;
      }
      span{
        font-size: 0.4rem;
        color:#999999;
      }
    }
  }
  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .consultant{
    position: relative;
    .button{
      position: absolute;
      padding: 0.25rem 0.3rem;
      border-radius: 2rem;
      top: 2.15rem;
      right: 0.7rem;
      font-size: 0.3rem;
      line-height: 1em;
      color: #ffffff;
    }
    >img{
      width: 100%;
    }
  }
  .videoTitle{
    position:relative;
    h3{
      margin: 0.5rem 0;
      >img{
        width: 44%;
      }
    }
    .more{
      position: absolute;
      right: 0;
      font-size: 12px;
      top:50%;
      margin-top: -0.5em;
      height: 1em;
      line-height: 1em;
      color:#818dcf;
      >img{
        width: 0.5em;
        height: 1em;
        vertical-align: middle;
        margin-left: 0.35em;
      }
    }
  }
  .lookMoreMove{
    border-radius: 5rem;
    margin: 0.5rem auto;
    color:#ffffff;
    width: 7rem;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.4rem;
  }
  .buttonBackground{
    background: -webkit-linear-gradient(left, #FF68B0 , #FF6E8D); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF68B0, #FF6E8D); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF68B0, #FF6E8D); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF68B0 , #FF6E8D); /* 标准的语法 */
  }
  .footerToH5,.toh5{
    height: 1.5rem;
    min-height: 100px;
    text-align: center;
  }
  .toh5{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1990;
    color:#ffffff;
    font-size: 0.5rem;
    letter-spacing: 0.005rem;
  }
  .imgBox{
    width: 100%;
    font-size: 0;
    .image{
      width: 100%;
      vertical-align:top;
    }
  }
  /* 视频 */
  .three-video{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
  }
  .three-video section:first-child{
    width: 61%;
  }
  .three-video section:last-child{
    width: calc( 39% - 10px );
  }
  .three-video section:last-child{
    margin-left:10px;
  }
  .three-video section img{
    width: 100%;
    height: 300px;
    vertical-align: top;
  }
  .three-video section:last-child img{
    height: 145px;
    margin-bottom: 10px
  }
  .autoWidth{width: 92%;margin: 0 auto;}
  section .web_video{
    padding: 30px;
    margin-top: 10px;
    border-radius: 10px;
  }
  .section_video_1544087975 .web_video{
    background: -webkit-linear-gradient(left top, #a395df ,#d8b7ee);
    background: -ms-linear-gradient(left top, #a395df ,#d8b7ee);
    background: -o-linear-gradient(left top, #a395df ,#d8b7ee);
    background: linear-gradient(to left top, #a395df ,#d8b7ee);
  }
  .section_video_1544088155 .web_video{
    background: -webkit-linear-gradient(left top, #6f98ce ,#a9d1f7);
    background: -ms-linear-gradient(left top, #6f98ce ,#a9d1f7);
    background: -o-linear-gradient(left top, #6f98ce ,#a9d1f7);
    background: linear-gradient(to left top, #6f98ce ,#a9d1f7);
  }
  .section_video_1544088276 .web_video{
    background: -webkit-linear-gradient(left top, #fac758 ,#f5df35);
    background: -ms-linear-gradient(left top, #fac758 ,#f5df35);
    background: -o-linear-gradient(left top, #fac758 ,#f5df35);
    background: linear-gradient(to left top, #fac758 ,#f5df35);
  }
</style>

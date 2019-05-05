<template>
  <div class="wrapper">
    <ls-pv></ls-pv>
    <ls-loading ref="loading"></ls-loading>
    <div class="imgBox">
      <img src="../../assets/images/img_01.jpg" class="image" alt="">
    </div>
    <!--第一个顾问-->
    <section v-for="(item, index) in forItems" v-bind:key="index" v-if="item.code===200" :data-code="item.code">
      <div class="imgBox">
        <img :src="item.user_logo" class="image" alt="">
      </div>
      <div style="width: 9.2rem;margin: 0 auto;">
        <div class="videoTitle">
          <h3 class="flex">
            <img :src="item.move_title" class="image" alt="">
          </h3>
          <div class="more" @click="hxsapp_user_info(item.lookMoreMoveUserId, '更多视频')">更多视频<img
            src="../../assets/images/right.png" class="image" alt=""></div>
        </div>
        <!--视频-->
        <div class="three-video">
          <section class="one">
            <img :src="item.move[0].img" class="image" alt="视频" @click='lookMove(index,0)'>
          </section>
          <section>
            <img :src="item.move[1].img" class="image" alt="视频" @click='lookMove(index,1)'>
            <img :src="item.move[2].img" class="image" alt="视频" @click='lookMove(index,2)'>
          </section>
        </div>
        <!--热评-->
        <div class="hot" @click='lookMove(index,0)' v-if="item.comment_hot&&item.comment_hot.length">
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
        <div class="videoFabulous" @click='lookMove(index,0)'>
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
      <!--顾问有话说-->
      <div class="consultant">
        <img :src="item.consultantImg" class="image" alt="">
        <div class="button buttonBackground" @click="hxsapp_user_info(item.consultantId, '点击咨询')">点击咨询</div>
      </div>
    </section>

    <!-- end -->
    <div class="lookMoreMove buttonBackground" @click="lookMoreMove">观看更多人的减肥视频</div>
    <div class="imgBox">
      <img src="../../assets/images/img_03.jpg" class="image" alt="">
    </div>
    <div class="footerToH5"></div>
    <footer class="toh5 buttonBackground flex">
      <router-link :to='lossStart'>我的减肥故事从这一刻开始</router-link>
    </footer>
  </div>
</template>
<script>
import axios from 'axios';
import {
  urlGet,
  LsShare,
  splicingUrl,
  getHxsAppVersion,
  compareAppVersion,
  userAgent
} from 'Utils/common'
import LvshouFetch from 'Api/common';
// import {Toast} from 'mint-ui'
import {mintToast} from 'Utils/method'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// var vc = new VConsole();
// console.log(vc)
export default {
  data() {
    return {
      nickname: '绿瘦',
      lossStart: '',
      baseInformation: {
        act_id: urlGet('id'),
        sess_token: urlGet('sess_token'),
        utime: urlGet('utime'),
        sign: urlGet('sign'),
        is_web: urlGet('is_web')
      },
      env: 'release', //  test preRelease release
      topicId: null,
      test: {
        items: [
          {
            move: [
              {
                dynamic_id: 142746, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/142746?inviteCode=3130980',
                img: require('../../assets/images/img_10.jpg')
              },
              {
                dynamic_id: 142845, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/142845?inviteCode=3130980',
                img: require('../../assets/images/img_11.jpg')
              },
              {
                dynamic_id: 142942, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/142942?inviteCode=3130980',
                img: require('../../assets/images/img_12.jpg')
              }
            ],
            diary_id: 142746, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3286950, // 查看更多视频用户ID
            consultantId: 3286950, // 点击咨询  顾问主页    用户id
            user_logo: require('../../assets/images/img_02.jpg'),
            move_title: require('../../assets/images/img_06.jpg'),
            consultantImg: require('../../assets/images/img_09.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          },
          {
            move: [
              {
                dynamic_id: 142966, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/142966?inviteCode=3130980',
                img: require('../../assets/images/img_13.jpg')
              },
              {
                dynamic_id: 143226, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/143226?inviteCode=3130980',
                img: require('../../assets/images/img_14.jpg')
              },
              {
                dynamic_id: 143303, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/143303?inviteCode=3130980',
                img: require('../../assets/images/img_15.jpg')
              }
            ],
            diary_id: 142966, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3286949, // 查看更多视频用户ID
            consultantId: 3286950, // 点击咨询  顾问主页    用户id
            user_logo: require('../../assets/images/img_04.jpg'),
            move_title: require('../../assets/images/img_07.jpg'),
            consultantImg: require('../../assets/images/img_19.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          },
          {
            move: [
              {
                dynamic_id: 143899, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/143899?inviteCode=3130980',
                img: require('../../assets/images/img_16.jpg')
              },
              {
                dynamic_id: 143908, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/143908?inviteCode=3130980',
                img: require('../../assets/images/img_17.jpg')
              },
              {
                dynamic_id: 143907, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/143907?inviteCode=3130980',
                img: require('../../assets/images/img_18.jpg')
              }
            ],
            diary_id: 143899, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3286947, // 查看更多视频用户ID
            consultantId: 3286950, // 点击咨询  顾问主页    用户id
            user_logo: require('../../assets/images/img_05.jpg'),
            move_title: require('../../assets/images/img_08.jpg'),
            consultantImg: require('../../assets/images/img_20.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          }
        ]
      },
      preRelease: {
        items: [
          {
            move: [
              {
                dynamic_id: 416736, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/416736?inviteCode=3130980',
                img: require('../../assets/images/img_10.jpg')
              },
              {
                dynamic_id: 416613, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/416613?inviteCode=3130980',
                img: require('../../assets/images/img_11.jpg')
              },
              {
                dynamic_id: 416470, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/416470?inviteCode=3130980',
                img: require('../../assets/images/img_12.jpg')
              }
            ],
            diary_id: 416736, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3211202, // 查看更多视频用户ID
            consultantId: 3211202, // 点击咨询  顾问主页    用户id
            user_logo: require('../../assets/images/img_02.jpg'),
            move_title: require('../../assets/images/img_06.jpg'),
            consultantImg: require('../../assets/images/img_09.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          },
          {
            move: [
              {
                dynamic_id: 416161, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/416161?inviteCode=3130980',
                img: require('../../assets/images/img_13.jpg')
              },
              {
                dynamic_id: 416076, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/416076?inviteCode=3130980',
                img: require('../../assets/images/img_14.jpg')
              },
              {
                dynamic_id: 415740, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/415740?inviteCode=3130980',
                img: require('../../assets/images/img_15.jpg')
              }
            ],
            diary_id: 416161, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3203595, // 查看更多视频用户ID
            consultantId: 3211202, // 点击咨询  顾问主页    用户id
            user_logo: require('../../assets/images/img_04.jpg'),
            move_title: require('../../assets/images/img_07.jpg'),
            consultantImg: require('../../assets/images/img_19.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          },
          {
            move: [
              {
                dynamic_id: 415615, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/415615?inviteCode=3130980',
                img: require('../../assets/images/img_16.jpg')
              },
              {
                dynamic_id: 415626, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/415626?inviteCode=3130980',
                img: require('../../assets/images/img_17.jpg')
              },
              {
                dynamic_id: 415594, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/415594?inviteCode=3130980',
                img: require('../../assets/images/img_18.jpg')
              }
            ],
            diary_id: 415615, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3209486, // 查看更多视频用户ID
            consultantId: 3211202, // 点击咨询  顾问主页    用户id
            user_logo: require('../../assets/images/img_05.jpg'),
            move_title: require('../../assets/images/img_08.jpg'),
            consultantImg: require('../../assets/images/img_20.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          }
        ]
      },
      release: {
        items: [
          {
            move: [
              {
                dynamic_id: 441500, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/441500?inviteCode=3130980',
                img: require('../../assets/images/img_10.jpg')
              },
              {
                dynamic_id: 442724, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/442724?inviteCode=3130980',
                img: require('../../assets/images/img_11.jpg')
              },
              {
                dynamic_id: 443583, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/443583?inviteCode=3130980',
                img: require('../../assets/images/img_12.jpg')
              }
            ],
            diary_id: 441500, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3101848, // 查看更多视频用户ID 颜爆包 用户主页
            consultantId: 3339633, //  点击咨询 刘乐   顾问主页    用户id
            user_logo: require('../../assets/images/img_02.jpg'),
            move_title: require('../../assets/images/img_06.jpg'),
            consultantImg: require('../../assets/images/img_09.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          },
          {
            move: [
              {
                dynamic_id: 440280, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/440280?inviteCode=3130980',
                img: require('../../assets/images/img_13.jpg')
              },
              {
                dynamic_id: 442122, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/442122?inviteCode=3130980',
                img: require('../../assets/images/img_14.jpg')
              },
              {
                dynamic_id: 443555, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/443555?inviteCode=3130980',
                img: require('../../assets/images/img_15.jpg')
              }
            ],
            diary_id: 440280, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3095095, // 查看更多视频用户ID 刘乐   顾问主页
            consultantId: 2089742, //  点击咨询 温丽霞  顾问主页    用户id
            user_logo: require('../../assets/images/img_04.jpg'),
            move_title: require('../../assets/images/img_07.jpg'),
            consultantImg: require('../../assets/images/img_19.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          },
          {
            move: [
              {
                dynamic_id: 439339, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/439339?inviteCode=3130980',
                img: require('../../assets/images/img_16.jpg')
              },
              {
                dynamic_id: 440921, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/440921?inviteCode=3130980',
                img: require('../../assets/images/img_17.jpg')
              },
              {
                dynamic_id: 442720, // 动态ID
                url: 'https://app.hxsapp.com/hxsweb/dynamicInfo/442720?inviteCode=3130980',
                img: require('../../assets/images/img_18.jpg')
              }
            ],
            diary_id: 439339, // 第一个视频动态ID
            code: 404, // 动态状态码
            lookMoreMoveUserId: 3059937, // 查看更多视频用户ID 扁桃体 用户主页
            consultantId: 3276352, //  点击咨询 Celia    顾问主页    用户id
            user_logo: require('../../assets/images/img_05.jpg'),
            move_title: require('../../assets/images/img_08.jpg'),
            consultantImg: require('../../assets/images/img_20.jpg'),
            comment_hot: [{
              nickname: '',
              content: '',
              hot: 0
            }],
            comment_num: 0,
            commend_num: '0'
          }
        ]
      },
      forItems: [] //循环的数组
    }
  },
  created() {
    // // 获取基础数据
    this.topicId = this.$route.params.topicId;
    this.env = this.$route.params.env ? this.$route.params.env : 'test';
    this.forItems = this[this.env].items;
    // alert(this.env);
    // this.lossStart = '/topic/' + this.env + '/' + this.topicId;
    this.lossStart = '/topic/' + this.topicId;
    this.getBaseInfo();
    this.getData();
    if (this.$route.fullPath.indexOf('?') > -1) {
      this.lossStart = this.lossStart + '?' + this.$route.fullPath.split('?')[1];
    }
    for (let i = 0; i < this.forItems.length; i++) {
      this.getDiaryById(this.forItems[i].diary_id, i);
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
    async getBaseInfo() {
      // 通过接口获取基础信息
      const data = this.baseInformation
      const apiData = await LvshouFetch({
        url: 'https://act.hxsapp.com/base/Api/actInfo',
        data
      })
      console.log('apiData', apiData)
      // 通过api 接口 动态改变title
      document.title = apiData.title
      // 调起app 的分享协议
      // console.log('------------调起app 的分享协议--------------------')
      // console.log(Object.assign({}, this.baseInformation, {is_web: true}))
      // console.log(this.baseInformation)
      // 本地跑代码
      // if ( window.webpackHotUpdate ) {
      //    return false;
      // }
      // let link = splicingUrl(Object.assign({}, this.baseInformation, {is_web: true}), apiData.link);
      let link = window.location.origin + '/actweb/weightLossLab/web' + window.location.search + 'is_web=true';
      LsShare({
        shareLink: link,
        shareTitle: apiData.title,
        shareImages: apiData.share_pic,
        shareDescr: apiData.descr,
        shareType: apiData.share_type
      })
    },
    // https://hxsapp_user_info#用户user-id
    hxsapp_user_info(user_id, msg) {
      if (msg) {
        _hmt.push(['_trackEvent', '按钮', '减肥实验室', msg])
      }
      if (!user_id) {
        return false;
      }
      location.href = 'https://hxsapp_user_info#' + user_id
    },
    // 点击 观看视频
    lookMove(i, index) {
      // window.location.href = this.items[i].move[index].url;
      _hmt.push(['_trackEvent', '动态详情', '减肥实验室', '观看视频'])
      let appVersion = getHxsAppVersion();
      let isTrue = compareAppVersion(appVersion, '3.7.0');
      if (!isTrue) {
        // 如果低于3.7.0版本没有这个协议 所以提示下载
        mintToast('请安装最新版后查看该视频');
        return false;
      }
      let dynamic = 'https://hxsapp_dynamicdetail?dynamic_id=' + this.forItems[i].move[index].dynamic_id + '&show_keyboard=false';
      // alert(dynamic);
      window.location.href = dynamic;
    },
    // 点击 观看更多人的减肥视频
    lookMoreMove() {
      // console.log('lookMoreMove');
      // 正式 2053
      // 话题主页
      let topicId = this.topicId;
      // alert(topicId);
      if (userAgent() === 'ios') {
        window.location.href = 'https://hxsapp_topic_page?topicId=' + topicId;
      } else if (userAgent() === 'and') {
        // window.location.href = 'hxsapp://hxsapp_topic_page?topicId=' + topicId;
        window.location.href = 'hxsapp://topicInfo?topicId=' + topicId;
      }
    },
    imagesClick(key) {
      console.log(key)
    },
    // 动态详情(3.0)
    async getDiaryById(diary_id, _index) {
      let baseInformation = this.baseInformation;
      let self = this;
      const data = {
        diary_id: diary_id,
        utime: baseInformation.utime,
        sign: baseInformation.sign
      }
      console.log('getDiaryById---', data);
      // let getDiaryById = 'https://app.hxsapp.com/user/userDiary/getDiaryById';
      // let getDiaryById = 'https://community.hxsapp.com/user/userDiary/getDiaryById';
      let getDiaryById = 'https://api.hxsapp.com/community/userDiary/getDiaryById';
      const res = await LvshouFetch({
        url: getDiaryById,
        data
      }).catch(err => {
        console.log('err', err)
        self.forItems[_index].code = 404;
        mintToast('请求接口出错');
      })
      console.log('-------------res----------------------',res === undefined)
      console.log(res);
      // debugger;
      if (res === undefined) {
        console.log(self[self.env].items[_index])
        self.forItems[_index].code = 404;
        return false
      }
      // alert(self.env);
      console.log(self.env);
      self.forItems[_index].code = 200;
      self.forItems[_index].comment_num = parseInt(res.comment_num) > 999 ? '999+' : parseInt(res.comment_num);
      self.forItems[_index].commend_num = parseInt(res.commend_num) > 999 ? '999+' : parseInt(res.commend_num);
      self.forItems[_index].comment_hot = res.comment_hot;
      console.log(self.forItems)
    },
    // 获取视频 点赞
    getMoveFabulous() {

    },
    // 获取评论
    dynameicInfo() {
      let baseInformation = this.baseInformation;
      axios
        .get('https://api.hxsapp.com/community/userDiary/getDiaryById', {
          params: {
            diary_id: 14397,
            utime: baseInformation.utime,
            sign: baseInformation.sign
          }
        })
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
    }
  }
}
</script>
<style lang="less" scoped>
  .hot {
    margin-top: 20px;
    .thr {
      /*backgound-color:#f5f4f9;*/
      width: 0;
      height: 0;
      border-left: 20px solid #f5f4f9;
      border-top: 10px solid transparent;
      border-right: 10px solid transparent;
    }
    .content {
      background: #f5f4f9;
      padding: 30px;
      border-radius: 0px 8px 8px 8px;
      .contTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h5 {
          margin: 0;
          font-size: 0.44rem;
          color: #ff668c;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 0.5rem;
            height: 0.5rem;
            margin-bottom: 0.05rem;
            margin-right: 0.1rem;
          }
        }
        .fabulous {
          color: #bfbfc1;
          font-size: 0.44rem;
        }
      }
      .comment {
        /*display: flex;*/
        /*justify-content: flex-start;*/
        /*align-items: flex-start;*/
        font-size: 0.4rem;
        text-align: left;
        margin-top: 20px;
        line-height: 44px;
        > h4 {
          display: inline;
          margin: 0;
          color: #818dcf;
        }
        > div {
          display: inline;
          color: #666666;
        }
      }
    }
    .foo {
      padding-top: 30px;
      border-bottom: 1px solid #e6e8f5;
    }
  }

  .videoFabulous {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 0;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 20px;
      margin-left: 40px;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 10px;
      }
      span {
        font-size: 0.4rem;
        color: #999999;
      }
    }
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .consultant {
    position: relative;
    .button {
      position: absolute;
      border-radius: 50px;
      top: 2.2rem;
      right: 0.7rem;
      font-size: 26px;
      width: 138px;
      height: 50px;
      line-height: 55px;
      text-align: center;
      color: #ffffff;
    }
    > img {
      width: 100%;
    }
  }

  .videoTitle {
    position: relative;
    h3 {
      margin: 0.5rem 0;
      > img {
        width: 44%;
      }
    }
    .more {
      position: absolute;
      right: 0;
      font-size: 26px;
      top: 50%;
      margin-top: -0.5em;
      height: 1em;
      line-height: 1em;
      color: #818dcf;
      > img {
        width: 11.5px;
        height: 20.3px;
        vertical-align: -1px;
        margin-left: 0.35em;
      }
    }
  }

  .lookMoreMove {
    border-radius: 5rem;
    margin: 0.5rem auto;
    color: #ffffff;
    width: 500px;
    height: 90px;
    line-height: 90px;
    font-size: 34px;
  }

  .buttonBackground {
    background: -webkit-linear-gradient(left, #FF68B0, #FF6E8D); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF68B0, #FF6E8D); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF68B0, #FF6E8D); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF68B0, #FF6E8D); /* 标准的语法 */
  }

  .footerToH5, .toh5 {
    height: 1.5rem;
    min-height: 100px;
  }

  .toh5 {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1009;
    a {
      text-decoration: none;
      color: #ffffff;
      font-size: 0.5rem;
      letter-spacing: 0.005rem;
      display: block;
      width: 100%;
      line-height: 1.5rem;
    }
  }

  .imgBox {
    width: 100%;
    font-size: 0;
    .image {
      width: 100%;
      vertical-align: top;
    }
  }

  /* 视频 */
  .three-video {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
  }

  .three-video section:first-child {
    width: 61%;
  }

  .three-video section:last-child {
    width: calc(39% - 10px);
  }

  .three-video section:last-child {
    margin-left: 10px;
  }

  .three-video section img {
    width: 100%;
    height: 300px;
    vertical-align: top;
  }

  .three-video section:last-child img {
    height: 145px;
    margin-bottom: 10px
  }
</style>

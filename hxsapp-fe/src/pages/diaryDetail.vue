<template>
  <div class="diaryDetail-container" v-if="diaryDetail">
    <goSignPage v-if="!isDiaryDelete"></goSignPage>
    <div v-if="isDiaryDelete" class="diaryDeleteTip">
      该日记已删除
    </div>
    <div class="diaryDetail-title clearfix" v-if="!isDiaryDelete">
      <span class="headImg" :style="{background:'url(' + diaryDetail.userInfo.headImg + ') center center no-repeat',backgroundSize:'160%'}"></span>
      <div class="info clearfix">
        <span>{{diaryDetail.userInfo.name}}</span>
        <em>{{diaryDetail.createTime}}</em>
      </div>
      <div class="follow clearfix" @click="showPopupDownLoadCall">关注</div>
    </div>
    <div class="diaryDetail-main" v-if="!isDiaryDelete">
      <div class="list" v-if="cheackJson('plan')">
        <div class="list-title">体重计划</div>
        <div class="list-info clearfix">
          <em class="icon2" :style="{background:'url(' + diaryDetail.plan.icon + ') center center no-repeat',backgroundSize:'100%'}"></em>
          <span class="cont" :style="{width:planSize}">{{diaryDetail.plan.name}}</span>
          <div class="junm clearfix" @click="showPopupDownLoadCall" v-if="diaryDetail.plan.url">
            <em>查看计划</em>
            <span></span>
          </div>
        </div>
      </div>
      <div class="border_7"></div>
      <div class="list">
        <div class="list-title">心情指数</div>
        <div class="list-info clearfix" v-for="(item,index) in emotionImg" v-if="index == diaryDetail.emotion">
          <span class="cont">{{item.text}}</span>
          <img class="icon" :src="item.img" :style="{width:moodSize}">
        </div>
      </div>
      <div class="border_7"></div>
      <div class="list">
        <div class="list-title">体重计划</div>
        <div class="record clearfix">
          <div>
            <span>{{diaryDetail.weight}}</span>
            <em>kg</em>
            <i></i>
          </div>
          <div>
            <span class="ml">{{diaryDetail.steps}}</span>
            <em>步</em>
          </div>
        </div>
        <ul class="clearfix" v-if="diaryDetail">
          <li v-if="diaryDetail.iconInfo.drink == 'true'" class="drink"></li>
          <li v-if="diaryDetail.iconInfo.sports == 'true'" class="sports"></li>
          <li v-if="diaryDetail.iconInfo.diet == 'true'" class="diet"></li>
          <li v-if="diaryDetail.iconInfo.excretion == 'true'" class="excretion"></li>
          <li :class="{emotion0:diaryDetail.emotion=='0',emotion1:diaryDetail.emotion=='1',emotion2:diaryDetail.emotion=='2',emotion3:diaryDetail.emotion=='3',emotion4:diaryDetail.emotion=='4'}"></li>
        </ul>
      </div>
      <div class="border_7"></div>
      <!--<div class="listDiary-title"> 
				日记
			</div> -->
      <ul class="diary">
        <li>
          <!-- <span class="date">{{diaryDetail.userInfo.diary_number}}</span> -->
          <div class="diary-content">
            <!-- <div class="diary-title">
							<span>红红火火的第08篇日记</span>
							<em>1小时前</em>
							<i></i>
						</div> -->
            <p class="text">{{diaryDetail.content}}</p>
            <div class="img-box clearfix" v-if="!diaryDetail.video">
              <span v-for="(item, index) in diaryDetail.images" :key="index" :style="{background:'url(' + item + ') center center no-repeat',backgroundSize:'160%', width: photoWallSize, height:photoWallSize}" @click="openImgIndexFn(index)"></span>
            </div>
            <div class="mood" v-if="false">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <aliyunPlayer 
              pageSoure="diaryDetail" 
              v-if="diaryDetail.video" 
              :media_id="'0'" 
              :sourceUrl="diaryDetail.video" 
              :coverUrl="diaryDetail.cover_img">
            </aliyunPlayer>
          </div>
        </li>
      </ul>
      <!-- 阿里云播放器 -->
      <div class="border_7"></div>
      <pictureBox :dynamicImages="diaryDetail.images" :openPictureIndex="openImgIndex" @obtain="pictrueCallBack" v-if="pictureShow"></pictureBox>
      <counselors :adviserInfo="diaryDetail.adviser"></counselors>
      <!-- 全部评论区域 -->
      <allCommentList soucrePage="diaryDetail" :initType="'5'" :initDataId="diaryId" :newCommentData="null" :commentInfo="commentInfo" :comment_num="diaryDetail.community.commentNum" :views_num="diaryDetail.community.viewsNum" :doCommendId="5" :commend_num="diaryDetail.community.commendNum" :is_commend="'no'" :is_collect="'no'" @updateCommentTotalNum="updateCommentTotalNum">
      </allCommentList>
      <!--  新的弹出层接入linkedme区域 -->
      <popupDownHxsLinkedMe v-if="isPopupDownLoad && linkedMe" :linkedMe="linkedMe">
      </popupDownHxsLinkedMe>
      <downToLinkedMe v-if="linkedMe" :linkedMe='linkedMe'></downToLinkedMe>
      <preLoading v-if="!isLoading"></preLoading>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import commonJs from '@/util/common.js'
import goSignPage from '@/components/goSignPage'
import preLoading from '@/components/preLoading'
import picture from '@/components/picture'
import counselors from '@/components/counselors'
import allCommentList from '@/components/allCommentList'
import downToLinkedMe from '@/components/downToLinkedMe'
import popupDownHxsLinkedMe from '@/components/popupDownHxsLinkedMe'

// 阿里云视频的播放器
import aliyunPlayer from '@/components/alyPlayer'

export default {
  data() {
    return {
      diaryDetail: null, //日记详情的总数据
      openImgIndex: 0, //当前打开的是第几张图片
      pictureShow: false, //图片查看是否显示
      isDiaryDelete: false, //日记是否删除
      emotionImg: null, //用户心情表情包
      diaryId: null, //日记的id
      isPopupDownLoad: false, //app下载提示框是否显示
      photoWallSize: null, //动态的图片大小
      isLoading: false, //页面数据是否加载完毕
      linkedMe: null, // 第三方linkedme的接入数据
      moodSize: null, //用户的图片的大小
      planSize: null, //计划文字的大小
      commentInfo: {
        type: 5, //文章类型
        data_id: null, //文章id
        parent_comment_id: null, //父级评论id,(可无)
        reply_comment_id: null, //二级评论id,(可无)
        arguedName: null, //被回复人的评论(可无)
        sess_token: null
      }
    }
  },
  mounted() {
    //获取用户id
    this.getDiaryId()
    //获取用户总数据
    this.getDiaryDetail()
    //计算日记的图片大小
    this.photoWallSizeFn()
    //用户的图片的大
    this.moodSizeFn()
    //计划文字的大小
    this.planSizeFn()
  },
  methods: {
    getDiaryDetail() {
      //获取日记想起的总数据
      axios
        .get('https://api.hxsapp.com/slim/Notes/detail', {
          params: {
            id: this.diaryId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.diaryDetail = res.data.data
            //用户心情表情图标
            this.emotionImg = [
              { img: 'https://app.hxsapp.com/hxsweb/static/emotionImg/D_daku.png', text: '大哭' },
              { img: 'https://app.hxsapp.com/hxsweb/static/emotionImg/D_yumen.png', text: '郁闷' },
              { img: 'https://app.hxsapp.com/hxsweb/static/emotionImg/D_yiban.png', text: '一般' },
              { img: 'https://app.hxsapp.com/hxsweb/static/emotionImg/D_kaixin.png', text: '开心' },
              { img: 'https://app.hxsapp.com/hxsweb/static/emotionImg/D_shuangdai.png', text: '爽呆' }
            ]

            //用户的邀请码
            let inviteCode = commonJs.getUrlParam('inviteCode') || ''
            var _this = this

            //默认分享图片
            var sharedeImg = 'https://app.hxsapp.com/hxsweb/static/wechat_invite.png'
            //日记的id
            this.commentInfo.data_id = this.diaryId

            //微信分享
            commonJs.setTitle(_this.diaryDetail.userInfo.name + '的日记')
            commonJs.outSideShare({
              title: '我在好享瘦的减肥日记',
              desc: _this.diaryDetail.content || '',
              link: commonJs.config.prefixUrl + 'diaryDetail/' + _this.userId + '?inviteCode=' + inviteCode,
              img: _this.diaryDetail.images[0] || sharedeImg
            })
            //第三方linkedMe使用
            // var __url = commonJs.config.prefixUrl+ "diaryDetail/"+ 'diaryId=' + this.diaryId;
            this.linkedMe = {
              params: {
                key: 'hxsapp://diary/detail?id=' + this.diaryId
              }
            }
          } else {
            //异常隐藏日记详情提示
            this.isDiaryDelete = true
          }
          //页面加载完毕
          setTimeout(() => {
            this.isLoading = true
          }, 600)
        })
    },
    getDiaryId() {
      //接受picture子组件参数
      let routeParams = this.$route.params
      this.diaryId = routeParams.id
    },
    cheackJson(str) {
      for (var key in this.diaryDetail) {
        if (key == str) {
          return true
        }
      }
      return false
    },
    photoWallSizeFn() {
      //日记详情的图片的大小
      this.photoWallSize = (document.documentElement.clientWidth - 27 - 9) / 3 + 'px'
    },
    moodSizeFn() {
      //用户的图片的大小
      this.moodSize = document.documentElement.clientWidth - 64 + 'px'
    },
    planSizeFn() {
      //计划文字的大小
      this.planSize = document.documentElement.clientWidth - 125 + 'px'
    },
    pictrueCallBack(isBoolean) {
      //接受picture子组件参数
      this.pictureShow = isBoolean
    },
    openImgIndexFn(index) {
      //查看图片
      this.openImgIndex = index
      this.pictureShow = true
    },
    updateCommentTotalNum() {},
    showPopupDownLoadCall() {
      //下载弹窗
      this.isPopupDownLoad = true
    },
    // 显示和异常弹出提示下载层
    hidePopupDownLoadCall() {
      this.isPopupDownLoad = false
    }
  },
  components: {
    counselors,
    pictureBox: picture,
    allCommentList,
    popupDownHxsLinkedMe,
    downToLinkedMe,
    preLoading,
    goSignPage,
    aliyunPlayer
  },
  beforeDestroy() {
    document.title = commonJs.config.webTitle
  }
}
</script>
<style scoped lang="less">
.diaryDetail-container {
  .diaryDeleteTip {
    width: 100%;
    height: 250px;
    line-height: 250px;
    text-align: center;
    color: #999;
  }
  .border_7 {
    width: 100%;
    height: 7px;
    background: rgba(245, 245, 248, 1);
  }
  .diaryDetail-title {
    width: 96%;
    background: url(../assets/images/diaryDetail/B_rjxqbg.png) left top no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    border-radius: 7px;
    margin-top: 13px;
    height: 80px;
    margin-bottom: 10px;
    .headImg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      float: left;
      margin: 10px 10px 0 15px;
    }
    .info {
      float: left;
      margin-top: 17px;
      span {
        height: 21px;
        font-size: 15px;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
        display: block;
        margin-bottom: 5px;
      }
      em {
        height: 18px;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
        display: block;
      }
    }
    .follow {
      float: right;
      height: 18px;
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      line-height: 18px;
      margin-top: 30px;
      margin-right: 15px;
    }
  }
  .diaryDetail-main {
    .list {
      padding: 19px 15px;
      .list-title {
        height: 18px;
        font-size: 13px;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
      .list-info {
        margin-top: 15px;
        .icon {
          width: 300px;
          float: left;
          margin-top: 30px;
        }
        .icon2 {
          width: 25px;
          height: 25px;
          margin-right: 10px;
          margin-top: 0;
          float: left;
        }
        .cont {
          font-size: 17px;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          float: left;
        }
        .junm {
          float: right;
          margin-top: 6px;
          em {
            font-size: 11px;
            color: rgba(153, 153, 153, 1);
            float: left;
            margin-right: 5px;
            height: 13px;
            line-height: 13px;
          }
          span {
            width: 7px;
            height: 10px;
            background: url(../assets/images/fh-xiao-lan.png) left top no-repeat;
            background-size: 100% 100%;
            float: left;
            margin-top: 1px;
          }
        }
      }
      .record {
        margin-top: 15px;
        div {
          width: 50%;
          float: left;
          span {
            height: 25px;
            font-size: 25px;
            color: rgba(51, 51, 51, 1);
            line-height: 25px;
            float: left;
            margin-right: 10px;
            &.ml {
              margin-left: 15px;
            }
          }
          em {
            height: 21px;
            font-size: 15px;
            color: rgba(102, 102, 102, 1);
            line-height: 21px;
            float: left;
            margin-top: 4px;
          }
          i {
            width: 1px;
            height: 25px;
            background: rgb(129, 141, 207);
            float: right;
            opacity: 0.2;
          }
        }
      }
      ul {
        margin-top: 20px;
        li {
          width: 25px;
          height: 25px;
          float: left;
          margin-right: 10px;
        }
        .drink {
          background: url(../assets/images/diaryDetail/B_icon_xqzs.png) left top no-repeat;
          background-size: 100%;
        }
        .sports {
          background: url(../assets/images/diaryDetail/B_icon_yd.png) left top no-repeat;
          background-size: 100%;
        }
        .excretion {
          background: url(../assets/images/diaryDetail/B_icon_pb.png) left top no-repeat;
          background-size: 100%;
        }
        .diet {
          background: url(../assets/images/diaryDetail/B_icon_ys.png) left top no-repeat;
          background-size: 100%;
        }
        .emotion0 {
          background: url(../assets/images/emotionImg/B_icon_dk.png) left top no-repeat;
          background-size: 100%;
        }
        .emotion1 {
          background: url(../assets/images/emotionImg/B_icon_ym.png) left top no-repeat;
          background-size: 100%;
        }
        .emotion2 {
          background: url(../assets/images/emotionImg/B_icon_yb.png) left top no-repeat;
          background-size: 100%;
        }
        .emotion3 {
          background: url(../assets/images/emotionImg/B_icon_kx.png) left top no-repeat;
          background-size: 100%;
        }
        .emotion4 {
          background: url(../assets/images/emotionImg/B_icon_sd.png) left top no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  .listDiary-title {
    height: 18px;
    font-size: 13px;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
    padding: 15px 0 0 15px;
  }
  .diary {
    padding: 15px 12px 15px 15px;
    li {
      position: relative;
      .date {
        position: absolute;
        left: 15px;
        top: 15px;
        height: 23px;
        font-size: 23px;
        color: rgba(153, 153, 153, 1);
        line-height: 23px;
      }
      .diary-title {
        position: relative;
        padding-top: 15px;
        span {
          height: 18px;
          font-size: 13px;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
          display: block;
        }
        em {
          height: 15px;
          font-size: 11px;
          color: rgba(153, 153, 153, 1);
          line-height: 15px;
          display: block;
          margin-top: 3px;
        }
        i {
          width: 10px;
          height: 13px;
          background: url(../assets/images/fh-xiao-lan.png) left top no-repeat;
          -webkit-transform: rotate(90deg);
          background-size: 100% 100%;
          position: absolute;
          right: 20px;
          top: 27px;
          display: none;
        }
      }
      .text {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        padding: 0 15px 10px 0;
      }
      .img-box {
        padding-bottom: 12px;
        span {
          width: 98px;
          height: 98px;
          float: left;
          margin-right: 3px;
        }
      }
      .mood {
        height: 20px;
        padding-bottom: 10px;
        span {
          width: 20px;
          height: 20px;
          float: left;
          margin-right: 8px;
        }
      }
    }
  }
  .comment {
    border-top: rgba(129, 141, 207, 1, 0.2) solid 1px;
    height: 13px;
    padding: 10px 0;
    padding-right: 15px;
    .comment-info {
      float: right;
      div {
        height: 13px;
        float: left;
        span {
          width: 15px;
          height: 13px;
          background: red;
          float: left;
          margin-right: 5px;
        }
        em {
          height: 13px;
          line-height: 13px;
          float: left;
          color: rgba(153, 153, 153, 1);
        }
      }
      .mr {
        margin-right: 32px;
      }
    }
  }
}
</style>
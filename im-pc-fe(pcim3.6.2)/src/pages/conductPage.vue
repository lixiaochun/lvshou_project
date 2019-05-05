<template>
  <div class="conduct" @click="hideView">
    <div class="right-view no-drag" @click.stop="stop">
      <div class="view-header flex flex-pack-justify flex-align-center">
        <div>{{conductInfo.title}}</div>
        <img src="../assets/img/close_btn.png" @click="hideView" alt="">
      </div>
      <div class="list-view no-drag" id="scroll">
        <!-- 动态 -->
        <div class="dynamic-box" v-if="conductInfo.type==0 || conductInfo.type==3">
          <div class="dynamic-item" v-for="(item,index) in listInfo" :key="index">
            <!-- <div class="dynamic-item-header">时间：08-16 10:47</div> -->
            <div class="dynamic-item-header">时间：{{item.time_specification}}</div>
            <div class="dynamic-item-content">
              <span class="content-text">{{ item.fold ? maxSlice(item.content) : item.content}}</span>
              <span v-show="item.content.length>maxLength">
                <span class="show-lable" @click="changeFold(index)" v-show="item.fold">全部</span>
                <span class="show-lable" @click="changeFold(index)" v-show="!item.fold">收起</span>
              </span>
            </div>
            <div class="columns-style flex flex-align-center" v-if="item.content_list ">
              <div class="columns-img">
                <img :src="item.content_list.images" alt="">
              </div>
              <div class="columns-text" @click="openIframeUrl(item.content_list.link,index)">
                {{item.content_list.title}}
            </div>
            </div>
            <div class="content-img flex flex-warp">
              <div class="item-box-item" v-for="(_item,_index) in item.images" :key="_index" @click="preview(_index,item.images)">
                <img v-lazy="_item" alt="">
              </div>
            </div>
          </div>
        </div>
        <!-- 日记 -->
        <div class="diary-box" v-if="conductInfo.type==1 || conductInfo.type==4">
          <div class="dynamic-item" v-for="(item,index) in listInfo" :key="index">
            <div class="dynamic-item-header flex flex-warp flex-pack-justify">
              <span>时间：{{item.create_time}}</span>
              <span>心情：
                <span v-if="item.emotion=='0'">大哭</span>
                <span v-if="item.emotion=='1'">郁闷</span>
                <span v-if="item.emotion=='2'">一般</span>
                <span v-if="item.emotion=='3'">开心</span>
                <span v-if="item.emotion=='4'">爽呆</span>
              </span>
              <span>步数：{{item.steps}}</span>
              <span>体重：{{item.weight}}kg</span>
            </div>
            <div class="dynamic-item-content">
              <span class="content-text">{{ item.fold ? maxSlice(item.content) : item.content}}</span>
              <span v-show="item.content.length>maxLength">
                <span class="show-lable" @click="changeFold(index)" v-show="item.fold">全部</span>
                <span class="show-lable" @click="changeFold(index)" v-show="!item.fold">收起</span>
              </span>
            </div>
            <div class="content-img flex flex-warp">
              <div class="item-box-item" v-for="(_item,_index) in item.images" :key="_index" @click="preview(_index,item.images)">
                <img v-lazy="_item" alt="">
              </div>
            </div>
            <div class="content-icon">
              <img v-if="item.drink!='0'" src="../assets/img/icon/D_buttum_water_pre@2x.png">
              <img v-if="item.sports!='0'" src="../assets/img/icon/D_buttum_run_pre@2x.png">
              <img v-if="item.excretion!='0'" src="../assets/img/icon/D_buttum_shit_pre@2x.png">
              <img v-if="item.diet!='0'" src="../assets/img/icon/D_buttum_eat_pre@2x.png">
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment-box" v-if="conductInfo.type==2 || conductInfo.type==5">
          <div class="dynamic-item" :class="isActive==index?'item-active':''" v-for="(item,index) in listInfo" :key="index">
            <div class="dynamic-item-header flex flex-warp flex-pack-justify">
              <span>时间：{{item.create_time}}</span>
              <span class="tag">
                <span v-if="item.type=='0'">文章</span>
                <span v-if="item.type=='1'">动态</span>
                <span v-if="item.type=='3'">课程</span>
                <span v-if="item.type=='5'">日记</span>
                <span v-if="item.type=='6'">方案</span>
              </span>
            </div>
            <div class="dynamic-item-content">
              <span class="content-text">{{ item.fold ? maxSlice(item.content) : item.content}}</span>
              <span v-show="item.content.length>maxLength">
                <span class="show-lable" @click="changeFold(index)" v-show="item.fold">全部</span>
                <span class="show-lable" @click="changeFold(index)" v-show="!item.fold">收起</span>
              </span>
            </div>
            <!-- 左右布局 图片在做内容在右 咨讯/文章 columns-style -->
            <div class="columns-style flex flex-align-center" v-if=" item.type=='0'&& item.content_list ">
              <div class="columns-img">
                <img :src="item.content_list.images" alt="">
              </div>
              <div class="columns-text" @click="openIframe(item.content_list.id,index,item.type)">
                {{item.content_list.descr}}
              </div>
            </div>
            <!-- 左右布局 图片在做内容在右 课程 columns-style -->
            <div class="columns-style flex flex-align-center" v-if=" item.type=='3' && item.content_list ">
              <div class="columns-img">
                <img :src="item.content_list.images" alt="">
              </div>
              <div class="columns-text" @click="openIframe(item.content_list.id,index,item.type)">
                {{item.content_list.title}}
              </div>
            </div>
            <!-- 左右布局 图片在做内容在右 案例 columns-style -->
            <div class="columns-style flex flex-align-center" v-if=" item.type=='6' && item.content_list">
              <div class="columns-img">
                <img v-if="item.content_list.info && item.content_list.info.before" :src="item.content_list.info.before" alt="">
              </div>
              <!-- <div class="columns-text" @click="openIframe(item.content_list.plan.id,index,item.type)">
                {{item.content_list.plan.name}}
              </div> -->
              <div class="columns-text" @click="openIframe(item.content_list.info.id,index,item.type)">
                {{item.content_list.info.title.slice(0,34)}}...
              </div>
            </div>

            <!-- 上下多行布局 文本在上 图片在下 动态 row-style -->
            <div class="row-style" v-if="item.type=='1'&& item.content_list">
              <div class="row-style-content" @click="openIframe(item.content_list.id,index,item.type)">{{item.content_list.content}}</div>
              <div class="content-img flex flex-warp">
                <div class="item-box-item" v-for="(_item,_index) in item.content_list.images" :key="_index" @click="preview(_index,item.img)">
                  <img v-lazy="_item" alt="">
                </div>
              </div>
            </div>
            <!-- 上下多行布局 文本在上 图片在下 日记 row-style -->
            <div class="row-style" v-if="item.type=='5'&& item.content_list">
              <div class="flex report flex-pack-justify">
                <span>心情：一般</span>
                <span>步数：2069</span>
                <span>体重：60kg</span>
              </div>
              <div class="row-style-content" @click="openIframe(item.id,index,item.type)">{{item.content_list.content}}</div>
              <div class="content-img flex flex-warp">
                <div class="item-box-item" v-for="(_item,_index) in item.img" :key="_index" @click="preview(_index,item.img)">
                  <img v-lazy="_item" alt="">
                </div>
              </div>
              <div class="content-icon">
                <img v-if="item.drink!='0'" src="../assets/img/icon/D_buttum_water_pre@2x.png">
                <img v-if="item.sports!='0'" src="../assets/img/icon/D_buttum_run_pre@2x.png">
                <img v-if="item.excretion!='0'" src="../assets/img/icon/D_buttum_shit_pre@2x.png">
                <img v-if="item.diet!='0'" src="../assets/img/icon/D_buttum_eat_pre@2x.png">
              </div>
            </div>
          </div>
        </div>
        <!-- 被举报/禁言 -->
        <div class="comment-box report-box" v-if="conductInfo.type==6">
          <div class="dynamic-item" v-if="item.content_type=='2' || item.content_type=='5'" v-for="(item,index) in listInfo" :key="index">
            <div class="dynamic-item-header flex flex-pack-justify">
              <div class="flex flex-warp report">
                <span>时间：{{item.create_time}}</span>
                <span v-if="item.content_type=='5' && item.content_list">心情：
                  <span v-if="item.content_list.emotion=='0'">大哭</span>
                  <span v-if="item.content_list.emotion=='1'">郁闷</span>
                  <span v-if="item.content_list.emotion=='2'">一般</span>
                  <span v-if="item.content_list.emotion=='3'">开心</span>
                  <span v-if="item.content_list.emotion=='4'">爽呆</span>
                </span>
                <span v-if="item.content_type=='5' && item.content_list">步数：{{item.content_list.steps}}</span>
                <span v-if="item.content_type=='5' && item.content_list">体重：{{item.content_list.weight}}kg</span>
              </div>
              <span class="tag">
                <span v-if="item.content_type=='2'">动态</span>
                <span v-if="item.content_type=='5'">日记</span>
              </span>
            </div>
            <div class="dynamic-item-content">
              <span class="content-text" v-if="item.content_list">{{ item.fold ? maxSlice(item.content_list.content) : item.content_list.content}}</span>
              <span class="content-text" v-else>该信息不存在</span>
              <span v-if="item.content_list">
                <span v-if="item.content_list.content.length > maxLength">
                  <span class="show-lable" @click="changeFold(index)" v-show="item.fold">全部</span>
                  <span class="show-lable" @click="changeFold(index)" v-show="!item.fold">收起</span>
                </span>
              </span>
            </div>
            <div class="content-img flex flex-warp" v-if="item.content_list">
              <div class="item-box-item" v-for="(_item,_index) in item.content_list.images" :key="_index" @click="preview(_index,item.content_list.images)">
                <img v-lazy="_item" alt="">
              </div>
            </div>
            <div class="content-icon" v-if="item.content_type=='5' && item.content_list">
              <img v-if="item.content_list.drink!='false'" src="../assets/img/icon/D_buttum_water_pre@2x.png">
              <img v-if="item.content_list.sports!='false'" src="../assets/img/icon/D_buttum_run_pre@2x.png">
              <img v-if="item.content_list.excretion!='false'" src="../assets/img/icon/D_buttum_shit_pre@2x.png">
              <img v-if="item.content_list.diet!='false'" src="../assets/img/icon/D_buttum_eat_pre@2x.png">
            </div>
            <div class="report-message flex flex-pack-justify" v-if="item.report_type!='0'">
              <span class="label">
                <span v-if="item.report_type=='1'">其他</span>
                <span v-if="item.report_type=='2'">违法有害信息</span>
                <span v-if="item.report_type=='3'">淫秽色情信息</span>
                <span v-if="item.report_type=='4'">恶意攻击谩骂</span>
                <span v-if="item.report_type=='5'">垃圾广告营销</span>
              </span>
              <span class="Informer">举报人：{{item.informants_name}}</span>
            </div>
            <div class="penalty-information flex flex-pack-justify flex-align-center" v-if="item.ttype=='1'">
              <div class="penalty-result flex flex-align-center">
                <span>被禁言：</span>
                <span style="color:#FF668C" v-if="item.date=='0'">永久禁言</span>
                <span style="color:#FF668C" v-if="item.date=='1'">禁言1天</span>
                <span style="color:#FF668C" v-if="item.date=='7'">禁言7天</span>
              </div>
              <span class="penalty-time">时间：{{item.create_time}}</span>
            </div>
          </div>
        </div>
        <!-- 在线支付 -->
        <div class="line-pay order-box" v-if="conductInfo.type=='7'">
          <div class="item-box" v-for="(item,index)  in listInfo" :key="index">
            <div class="order-info-item flex flex-pack-justify flex-align-center">
              <div class="label">预付款单号：</div>
              <div class="item-right-text">{{item.order_sn}}</div>
            </div>

            <div class="order-info-item flex flex-pack-justify flex-align-center">
              <div class="label">预付金额：</div>
              <div class="item-right-text" v-show="item.order_amount">¥{{item.order_amount}}</div>
            </div>
            <div class="order-info-item flex flex-pack-justify flex-align-center">
              <div class="label">支付时间：</div>
              <div class="item-right-text">{{item.create_time}}</div>
            </div>
          </div>
        </div>
        <!-- 订单数量 -->
        <div class="order-box" v-if="conductInfo.type=='8'">
          <div class="item-box" v-for="(item,index)  in listInfo" :key="index">
            <div class="order-info-item flex flex-pack-justify flex-align-center">
              <div class="label">预付款单号：</div>
              <div class="item-right-text">{{item.OrderNo}}</div>
            </div>
            <div class="order-info-item flex flex-pack-justify flex-align-center">
              <div class="label">预付金额：</div>
              <div class="item-right-text">¥{{item.Amount}}</div>
            </div>
            <div class="order-info-item flex flex-pack-justify ">
              <div class="label">购买商品：</div>
              <div class="item-right-text">
                <div v-for="(_item,indx) in item.ProductList" :key="indx">
                  <div style="text-align:right">{{_item.Model}}</div>
                  <div class="money">¥{{_item.Price}} X {{_item.Num}}</div>
                </div>
              </div>
            </div>
            <div class="order-info-item flex flex-pack-justify flex-align-center">
              <div class="label">订单状态：</div>
              <div class="item-right-text">已完成</div>
            </div>
          </div>
        </div>

        <div class="no-more" v-if="noMore && listInfo!=''">没有更多数据了</div>
        <div class="page-null flex flex-align-center flex-warp" v-if="listInfo==''">
          <div>
            <img src="../assets/img/quesheng_kong.png" alt="">
            <p>暂无用户数据</p>
          </div>
        </div>
      </div>
    </div>
    <carousel v-if="isSilder&&!isWebiframe" :imgArr="imgArr" :indexImg="imgIndex" v-on:closeCarousel="closeCarousel" class="left-view" @click.stop="stop"></carousel>
    <transition name="slideleft">
      <webIframe v-if="isWebiframe && !isSilder" :webUrl="webUrl" v-on:closeWebIframe="closeWebIframe" :class="isWebiframe?'left-show':''" class="left-view left-web" @click.stop="stop"></webIframe>
    </transition>
  </div>
</template>
<script>
import commonJs from '@/util/common.js'
import carousel from '@/components/carousel'
import webIframe from '@/components/webIframe'
import axios from 'axios'
export default {
  name: 'conductPage',
  data() {
    return {
      conductInfo: '', //
      maxLength: 83, // 动态页面中文章的显示最大字数
      isActive: null, //列表点击选中状下标
      listInfo: null,
      imgArr: [], // 要预览的图片数组
      imgIndex: '0', // 当前点击图片的下标
      fold: true, // 文章是否展开或者收起
      isSilder: false, // 是否预览图片
      isWebiframe: false, // 是否显示web页面加载窗口
      webUrl: '', // iframe的网络地址
      serverUrl: '', // 接口请求路径
      params: '', // 接口请求参数
      loadMore: false,
      noMore: false
    }
  },
  components: {
    carousel, //图片预览组件
    webIframe
  },
  created() {
    /*
    *获取vuex中存储的点击的行为数据的相关信息
    *@parameter(status, title, type, id)
    *type  0已发布动态  1已发布日记 2已评论 3被屏蔽动态 4被屏蔽日记 5被屏蔽评论 6被举报/禁言 7在线支付 8订单数量
    *id user_id
    */
    this.conductInfo = this.$store.getters.conductGetter
    var httpUrl = 'https://api.hxsapp.com/im/'
    switch (this.conductInfo.type) {
      case 0:
        //已发布动态
        this.serverUrl = httpUrl + 'Chat/diaryStateListData'
        this.params = {
          user_id: this.conductInfo.id,
          type: 'diary', //评论=comment,动态=diary, 禁言举报=gag
          status: '1', //1=在线 , 0=屏蔽（默认）（type=comment/diary 有效）
          page_depend: '0'
        }
        break
      case 1:
        //已发布日记
        this.serverUrl = httpUrl + 'Chat/diaryListData'
        this.params = {
          user_id: this.conductInfo.id,
          type: 'all',
          last_id: '0'
        }
        break
      case 2:
        //已评论
        this.serverUrl = httpUrl + 'Chat/diaryStateListData'
        this.params = {
          user_id: this.conductInfo.id,
          type: 'comment', //评论=comment,动态=diary, 禁言举报=gag
          status: '1', //1=在线 , 0=屏蔽（默认）（type=comment/diary 有效）
          page_depend: '0'
        }
        break
      case 3:
        //被屏蔽动态
        this.serverUrl = httpUrl + 'Chat/diaryStateListData'
        this.params = {
          user_id: this.conductInfo.id,
          type: 'diary', //评论=comment,动态=diary, 禁言举报=gag
          status: '0', //1=在线 , 0=屏蔽（默认）（type=comment/diary 有效）
          page_depend: '0'
        }
        break
      case 4:
        //被屏蔽日记
        this.serverUrl = httpUrl + 'Chat/diaryListData'
        this.params = {
          user_id: this.conductInfo.id,
          type: 'not_pass',
          last_id: '0'
        }
        break
      case 5:
        //被屏蔽评论
        this.serverUrl = httpUrl + 'Chat/diaryStateListData'
        this.params = {
          user_id: this.conductInfo.id,
          type: 'comment', //评论=comment,动态=diary, 禁言举报=gag
          status: '0', //1=在线 , 0=屏蔽（默认）（type=comment/diary 有效）
          page_depend: '0'
        }
        break
      case 6:
        //被举报/禁言
        this.serverUrl = httpUrl + 'Chat/diaryStateListData'
        this.params = {
          user_id: this.conductInfo.id,
          type: 'gag', //评论=comment,动态=diary, 禁言举报=gag
          status:'0',
          page_depend: '0'
        }
        break
      case 7:
        //在线支付
        this.serverUrl = httpUrl + 'Chat/onlinePayData'
        this.params = {
          user_id: this.conductInfo.id,
          PageIndex: 1
        }
        break
      case 8:
        //订单数量
        this.serverUrl = httpUrl + 'Chat/orderListData'
        this.params = {
          user_id: this.conductInfo.id,
          PageIndex: 1
        }
        break
      default:
    }
    this.showInfo()
  },
  mounted() {
    let _this = this
    $('.list-view').scroll(function() {
      //当时滚动条离底部60px时开始加载下一页的内容
      if ($(this)[0].scrollTop + $(this).height() + 60 >= $(this)[0].scrollHeight) {
        if (!_this.loadMore && !_this.noMore) {
          _this.loadMore = true
          _this.showInfo()
        }
      }
    })
  },
  methods: {
    // 阻止事件冒泡
    stop() {},
    // 文章在收起状态下最大显示数量
    maxSlice(text) {
      return text.length > this.maxLength ? text.slice(0, this.maxLength) + '...' : text
    },
    // 修改文章的展开 收起状态
    changeFold(index) {
      this.listInfo[index].fold = !this.listInfo[index].fold
    },
    // 关闭图片预览
    closeCarousel(data) {
      this.isSilder = data
      this.imgArr = []
      this.imgIndex = 0
    },
    // 关闭web新窗口
    closeWebIframe(data) {
      this.isWebiframe = data
      this.webUrl = ''
      this.isActive = null
    },
    // 获取页面信息
    showInfo() {
      axios
        .get(this.serverUrl, {
          params: this.params
        })
        .then(res => {
          if (res.data.code == '200') {
            if (res.data.data) {
              res.data.data.list.forEach(item => {
                item.fold=true
              });
              if (this.listInfo == '' || !this.listInfo) {
                this.listInfo = res.data.data.list
              } else {
                this.listInfo = this.listInfo.concat(res.data.data.list)
              }
              if (this.params.PageIndex) {
                this.params.PageIndex = this.params.PageIndex + 1
              }
              if (this.params.last_id) {
                this.params.last_id = res.data.data.last_id
              }
              if (this.params.page_depend) {
                this.params.page_depend = res.data.data.page_depend
              }
            } else {
              if (this.listInfo == '' || !this.listInfo) {
                this.listInfo = ''
              }
              this.noMore = true
            }
            this.loadMore = false
          } else {
            this.$message.error(res.data.msg)
            this.loadMore = false
          }
        })
    },
    
    // 打开web新窗口
    openIframe(id, index, type) {
      let url
      this.isWebiframe = true
      this.isSilder = false
      this.isActive = index
      switch (type) {
        case '0':
          url = 'https://app.hxsapp.com/hxsweb/articleDetail/' + id
          break
        case '1':
          url = 'https://app.hxsapp.com/hxsweb/dynamicInfo/' + id
          break
        case '3':
          url = 'https://app.hxsapp.com/hxsweb/newSportsLessonDetail/' + id
          break
        case '5':
          url = 'https://app.hxsapp.com/hxsweb/diaryDetail/' + id
          break
        case '6':
          url = 'https://app.hxsapp.com/hxsweb/demoDetail/' + id
          break
      }
      this.webUrl = url
    },
    // 后台给跳转链接
    openIframeUrl(url, index){
      this.isWebiframe = true
      this.isSilder = false
      this.isActive = index
      this.webUrl = url
    },
    // 预览图片
    preview(index, data) {
      this.isWebiframe = false
      this.isSilder = true
      this.imgArr = data
      this.imgIndex = index
    },
    // 点击遮罩层隐藏页面
    hideView() {
      let conductObject = {
        status: false,
        title: '',
        type: '',
        id: ''
      }
      this.$store.commit('changeConduct', conductObject)
    }
  }
}
</script>
<style scoped lang="less">
.conduct {
  position: fixed;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  .left-view {
    width: calc(100% - 375px);
    position: relative;
  }
  .slideleft-leave-active {
    transition: all 0.3s;
  }
  .slideleft-leave-to {
    transform: translateX(375px);
    opacity: 0;
  }
  .left-show {
    animation: leftshow 0.1s linear;
  }
  @-webkit-keyframes leftshow {
    0% {
      right: -375px;
      opacity: 0;
    }
    100% {
      right: 0;
      opacity: 1;
    }
  }
  .right-view {
    position: absolute;
    right: 0;
    width: 375px;
    height: 100%;
    z-index: 2;
    border-radius: 0 5px 5px 0;
    background: #f5f5f8;
  }
  .view-header {
    width: 345px;
    position: fixed;
    padding: 10px 15px;
    background: #657293;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    z-index: 9;
  }
  .view-header {
    img {
      width: 11px;
      height: 11px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .page-null {
    position: fixed;
    width: 375px;
    background: #fff;
    top: 0;
    height: 100%;
    text-align: center;
    img {
      width: 125px;
      height: 125px;
      margin: auto;
      vertical-align: middle;
    }
    div {
      width: 100%;
      p {
        font-size: 16px;
        text-align: center;
        padding-top: 6px;
      }
    }
  }
  .list-view {
    position: absolute;
    width: 380px;
    height: calc(100% - 40px);
    padding-top: 40px;
    overflow-y: scroll;
    z-index: 5;
    .no-more {
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #999;
    }
    .dynamic-item {
      padding: 0 15px;
      background: #fff;
      margin-bottom: 5px;
      &:last-of-type {
        margin-bottom: 0;
      }
      .dynamic-item-header {
        font-size: 12px;
        color: #999999;
        padding: 10px 0;
      }
      .dynamic-item-content {
        font-size: 14px;
        color: #333;
        line-height: 20px;
        padding-bottom:5px;
        .show-lable {
          color: #818dcf;
          cursor: pointer;
        }
      }
      .content-img {
        .item-box-item {
          width: 113px;
          height: 113px;
          padding-right: 3px;
          margin-bottom: 5px;
          box-sizing: border-box;
          overflow: hidden;
          img {
            width: 100%;
            min-height: 113px;
            vertical-align: middle;
          }
        }
      }
      .content-icon {
        padding: 14px 0;
        img {
          width: 13px;
          height: 14px;
          margin-right: 16px;
        }
      }
      .tag {
        font-size: 12px;
        font-weight: 400;
        color: rgba(129, 141, 207, 1);
        padding: 2px 8px;
        background: rgba(241, 241, 248, 1);
        border-radius: 3px;
      }
    }
    .item-active {
      background: rgba(129, 141, 207, 0.2);
    }
    .diary-box {
      .dynamic-item-header {
        span {
          display: inline-block;
          width: 50%;
          padding: 3px 0;
        }
      }
    }
    .comment-box {
      .dynamic-item {
        padding-bottom: 10px;
        .content-icon {
          padding: 0;
          padding-top: 10px;
        }
      }
    }
    .columns-style {
      background: rgba(245, 245, 248, 1);
      padding: 10px;
      .columns-img {
        width: 60px;
        height: 60px;
        overflow: hidden;
        img {
          width: 100%;
          min-height: 60px;
          vertical-align: middle;
        }
      }
      .columns-text {
        width: calc(100% - 60px);
        padding-left: 10px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
      }
    }
    .row-style {
      background: rgba(245, 245, 248, 1);
      padding: 10px;
      .report {
        font-size: 12px;
        color: #999;
        padding-bottom: 6px;
      }
      .item-box-item {
        width: 106px !important;
        height: 106px !important;
        overflow: hidden;
        img {
          width: 100% !important;
          min-height: 106px !important;
        }
      }
      .row-style-content {
        width: 100%;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
    .report-box {
      .report {
        width: 80%;
        span {
          width: 70%;
          margin-bottom: 6px;
        }
      }
      .tag {
        position: absolute;
        right: 15px;
      }
      .content-icon {
        border-bottom: 1px rgba(129, 141, 207, 0.16) solid;
        padding-bottom: 10px !important;
      }
      .report-message {
        padding: 10px 0;
        .label {
          font-size: 12px;
          color: #ff668c;
        }
        .Informer {
          font-size: 12px;
          color: #999999;
        }
      }
      .penalty-information {
        background: #fff;
        font-size: 12px;
        color: #999;
        .penalty-time {
          padding: 10px 0;
        }
      }
    }
    .order-box {
      .item-box {
        background: #fff;
        margin-bottom: 5px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .order-info-item {
          padding: 15px;
        }
        .label {
          font-size: 14px;
          color: #999;
        }
        .item-right-text {
          font-size: 14px;
          color: #333;
          .money {
            font-size: 12px;
            color: #ff668c;
            padding: 5px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
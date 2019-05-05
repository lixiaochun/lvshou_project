<template>
  <div class="shopDetailContainer" :class="{shopDetailContainerActiveClass : popupVisible}">
    <div :style="popupVisible? shopDetailContainerActive: windowScrollTopFn()">
      <div class="head-tab">
        <defaultVideo v-show="tabActive==1&&(goods_data.video_url)!=''"></defaultVideo>
        <mt-swipe :showIndicators="false" @change="handleChange" :auto="3000" v-if="tabActive==2">
          <mt-swipe-item v-for="(item,index) in tabImgSrc" :key="index">
            <div class="mt-swipe-img" :style="{'background-image':'url('+item+')' }"></div>
          </mt-swipe-item>
        </mt-swipe>
        <div class="indicators-box" v-if="tabActive==2">{{defaultIndex}}/{{alllength}}</div>
        <div class="tab-btn center" v-if="(goods_data.video_url)!=''">
          <button :class="tabActive==1?'active':''" class="sp btn" @click="tabActive2(1)">视频</button>
          <button :class="tabActive==2?'active':''" class="btn" @click="tabActive2(2)">图片</button>
        </div>
      </div>

      <div class="ware">
        <p style="word-break: break-all;">{{ ware.title }}</p>
        <!-- <div class="intro">{{ware.LightPoints}}</div> -->
        <div class="ware-price" v-if="ware.wareInfo && ware.wareInfo.length" v-show="!seckillType">
          <span></span>
          {{ ware.wareInfo[0].price }}
        </div>
        <div class="ware-price" v-else v-show="!seckillType">
          <span></span>
          {{ ware.price }}
        </div>
        <div class="ware-mail">
          <em>运费：0.0</em>
          <!-- <em>已售:12</em> -->
        </div>
        <div class="discount flex-c" v-if="discount" v-show="!seckillType" @click="dialogDC">
          <span class="head">优惠券</span>
          <ul class="flex-item flex-c">
            <li v-for="(data,index) in discountList" :key="index">
              <div class="item">{{ data.usage_rules }}</div>
            </li>
          </ul>
          <i></i>
        </div>

        <div class="seckill-box" v-if="seckillType">
          <div
            class="flex-c div1"
            v-if="ware.wareInfo && ware.wareInfo.length && actPrice !== ware.wareInfo[0].price"
          >
            <span class="flex-item title">{{ actPrice }}</span>
          </div>
          <div class="flex-c div1" v-else>
            <span class="flex-item title" v-if="actPrice !== ware.price">{{ actPrice }}</span>
          </div>
          <div class="flex-c div2-b">
            <div class="flex-item title2">
              <div v-if="ware.wareInfo && ware.wareInfo.length">
                <div
                  class="title3"
                  v-show="!goodsType_rm"
                  v-if="ware.wareInfo && ware.wareInfo.length && actPrice !== ware.wareInfo[0].price"
                >
                  {{ ware.wareInfo[0].price }}
                  <p class="line"></p>
                </div>
                <div class="title3" v-else>
                  <span
                    class="flex-item title"
                  >{{ (ware.wareInfo && ware.wareInfo.length ? ware.wareInfo[0].price : actPrice) }}</span>
                </div>
              </div>
              <div v-else>
                <div class="title3" v-show="!goodsType_rm">
                  {{ ware.price }}
                  <p class="line"></p>
                </div>
              </div>
            </div>

            <!-- <div class="line-box">
              <div class="line-bar" :style="{'width':(seckillNum+'%')}"></div>
            </div>
            <span class="title2">只剩下{{inStock}}件</span>-->
          </div>
        </div>
      </div>
      <div class="ware-content">
        <div class="title clearfix" :style="{background:'rgba(245,245,248,1)'}">
          <div>
            <span></span>
            <span>商品详情</span>
            <span></span>
          </div>
        </div>
        <div class="ware-info" v-html="ware.detail"></div>
      </div>
      <div
        class="shop-bar"
        v-if="!downHxsShow && !seckillType"
        :class="{'iphoneX-shop-bar': isiPhoneX}"
      >
        <div class="service small-bar" @click="openIm">
          <span></span>
          <em>客服</em>
        </div>
        <div class="cart small-bar" @click="toShopCar" v-if="!seckillType">
          <span>
            <i v-if="shopCarNumber">{{ shopCarNumber }}</i>
          </span>
          <em>购物车</em>
        </div>
        <div class :style="{'width':'49px'}" v-if="seckillType"></div>
        <div class="join" @click="toBuy()" v-show="!seckillType">加入购物车</div>
        <div class="join" v-if="seckillType"></div>
        <div class="shop" @click="toBuy('buyNow')">立即购买</div>
      </div>

      <!-- 秒杀底部样式修改 -->
      <div
        class="shop-bar"
        v-if="!downHxsShow && seckillType"
        :class="[{'iphoneX-shop-bar': isiPhoneX}, seckillType ? 'seckillType' : '']"
      >
        <div class="service small-bar" @click="openIm">
          <span></span>
          <em>客服</em>
        </div>
        <!-- <div style="width:200px;"></div> -->
        <div class="shop" @click="toBuy('buyNow')">立即购买</div>
      </div>
      <!-- 秒杀底部样式修改 -->
      <a href="javascript:;" class="bottom-bar seat" v-if="!downHxsShow"></a>
      <downToLinkedMe v-if="linkedMe && downHxsShow" :linkedMe="linkedMe"></downToLinkedMe>
      <mt-popup v-model="popupVisible" position="bottom" @touchmove.prevent>
        <div class="to-bug" @touchmove.prevent>
          <em class="close" @click="closePop"></em>
          <div class="info">
            <div class="img-box">
              <img v-if="smallTabImg" :src="smallTabImg">
            </div>
            <div class="design">
              <span v-if="ware.wareInfo && ware.wareInfo.length && !seckillType">
                <em></em>
                {{ ware.wareInfo[0].price }}
              </span>
              <span v-if="seckillType">
                <em></em>
                {{ actPrice }}
              </span>
              <span v-if="ware.wareInfo && ware.wareInfo.length">
                已选{{propertys_name }}{{
                wareNumber}}
              </span>
            </div>
          </div>
          <div class="border-soild"></div>

          <div
            class="choice-color"
            v-if="propertiesMap"
            v-for="(item, parentIndex) in propertiesMap"
          >
            <!-- <span>颜色</span> -->
            <div class="pattern clearfix">
              <a
                href="javascript:;"
                v-for="(childItem, childIndex) in propertiesMap[parentIndex].item_value"
                @touchstart="selected2($event,childIndex, parentIndex, item.id)"
              >{{childItem.text }}</a>
            </div>
          </div>

          <!-- <div class="border-soild"></div> -->
          <div class="choice-number clearfix">
            <span>数量</span>
            <div class="number clearfix" @touchmove.prevent>
              <em
                @touchstart.prevent="wareReduce"
                class="reduce"
                @touchmove.prevent
                @touchend.prevent
              ></em>
              <span>{{ wareNumber }}</span>
              <em
                @touchstart.prevent="wareIncrease"
                class="increase"
                @touchmove.prevent
                @touchend.prevent
              ></em>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="bottom-bar yellow" @click="submit">确认</a>
      </mt-popup>
    </div>
    <!-- 优惠券的弹出框 -->
    <mt-popup v-model="popupVisibleDC" position="bottom" @touchmove.prevent>
      <div class="dialog-box">
        <h4 class="head center">领取优惠券</h4>
        <ul>
          <li class="flex-c" v-for="(data,index) in couponsList" :key="index">
            <div class="img-r head-img">
              <img :src="data.coupon_cover">
            </div>
            <div class="flex-item content">
              <p class="flex-c">
                <span v-if="data.is_receive==false">{{ data.coupon_amount }}</span>
                <span
                  v-else-if="data.is_receive==true"
                  style="color:#333333"
                >{{ data.coupon_amount }}</span>
                {{ data.coupon_name }}
              </p>
              <div class="flex-c">
                <span class="img-r ellipsis">
                  <!-- <img src="../assets/lvshou/img/shopDetail/content1.png"> -->
                  <img
                    src="../assets/lvshou/img/shopDetail/content1.png"
                    v-if="data.is_receive==false"
                  >
                  <img
                    src="../assets/lvshou/img/shopDetail/content2.png"
                    v-if="data.is_receive==true"
                  >
                </span>
                <span class="flex-item" v-if="data.deadline=='0'">
                  <h5>{{ data.usage_rules }}</h5>
                  <h5>{{ data.start_time }}-{{ data.end_time }}</h5>
                </span>
                <span class="flex-item" v-if="data.deadline!='0'">
                  <h5>{{ data.usage_rules }}</h5>
                </span>
              </div>
            </div>
            <img class="bar" src="../assets/lvshou/img/shopDetail/bar.png">
            <button class="get" v-if="data.is_receive==false" @click="addCoupons(data.c_id)">立即领取</button>
            <button class="pass" v-else-if="data.is_receive==true">已领取</button>
          </li>
        </ul>
        <button class="ok" @click="popupVisibleDC=false">确认</button>
      </div>
    </mt-popup>
    <popupDownHxsLinkedMe v-if="linkedMe && isPopupDownLoad" :linkedMe="linkedMe"></popupDownHxsLinkedMe>
  </div>
</template>
<script>
// import Vue from 'vue'
import { Toast, Popup, Lazyload } from 'mint-ui'
import axios from 'axios'
import downToLinkedMe from '@/components/downToLinkedMe'
import popupDownHxsLinkedMe from '@/components/popupDownHxsLinkedMe'
import common from '@/util/common.js'
import defaultVideo from '../components/comment/defaultVideo'


export default {
  name: 'showDetail',
  data() {
    return {
      tabActive: 1,//设置选择的头部视频和图片切换的tab
      noAttrBoolean: true, // 默认是有属性 属性下架 不能执行添加购物车 和 立即购买
      popupVisible: false, //pop show/hide
      produceID: null, //购买商品id
      mallNumber: 1, //购买商品数量
      beforeShopCarNumber: 1, //加入购物车商品数量
      wareNumber: 1,
      patternIndex: 0, //默认购买商品选中的规格
      shopPatternIndex: 0, //默认购物车商品选中的规格
      disorderPrice: null, //价格下定单选规格使用
      downHxsShow: false, //下载好享瘦是否出现
      tabImgSrc: null, //轮播图 地址
      sessToken: '',
      isShopCarWare: true,
      // isOutStock:null,商品是否缺货
      shopCarNumber: null,
      shopDetailContainerActive: null,
      shopDetailContainerActiveNone: null,
      windowScrollTop: null,
      ware: {
        title: null,
        detail: null,
        price: null,
        wareInfo: null
      },
      shopCarproduceID: null,
      wareIndex: -1,
      isiPhoneX: null,
      propertiesMap: null, //商品所有规格
      produceText: null, //选择规格当前项判断
      smallTabImg: null, //规格选择展示的图片
      shopProduceText: [], //选择的购物车商品参数
      buyProduceText: [], //选择的wq`145立即购买商品参数
      enougBean: false, //判断用户是否有足够的绿豆
      shopParamType: null, //商品名称
      isPopupDownLoad: false, //app下载提示框是否显示
      linkedMe: null, //接入linkedme在微信打开app
      discount: true, //弹出框优惠券的判断
      popupVisibleDC: false,
      discountList: [],
      couponsList: [],
      //秒杀
      seckillType: false,
      seckillTime: '00:00:00',
      seckillNum: 0,
      goodsType: 0,
      actPrice: 0,
      inStock: 0,
      goodsType_rm: false,
      goods_data: {
        video_url: "",
        video_cover: ""
      },
      goods_item: {
        parent_active: null,
        children_active: null,
        first_active: true
      },
      parent_active: [
        99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99
      ],
      children_active: [
        99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99
      ],
      parentactive: 99,
      childrenactive: 99,
      first_active: false,
      select_active: [],
      disable_active: [],
      //检查库存的情况
      check_stock: [],
      select_type: false,
      sku_ids: 0,
      goods_sku: [],
      defaultIndex: 1,
      alllength: 0,
      propertys_name: "",
      listMap: '',
    }
  },
  components: {
    downToLinkedMe: downToLinkedMe,
    popupDownHxsLinkedMe: popupDownHxsLinkedMe,
    defaultVideo
  },
  created() {

  },
  mounted() {



    document.title = '商品详情'
    //判断是否是iphoneX
    this.isiPhoneXFn()

    var locationSearch = window.location.href.split('?')
    this.sessToken = common.getUrlParam('sess_token', locationSearch[1])

    //商品名称
    this.shopParamType = this.$route.params.id

    //判断使用新旧版商品详情
    // this.isJunpOldshopDetail();

    //获取购物车数量
    this.getShopCar()

    //请求商品详情
    //  this.getGoodsList();
    this.getNewGoodList();



  },
  methods: {
    // 判断是否下架 false 下架 true 上架
    _isOn() {
      const _arr = this.ware.wareInfo
      if (_arr && _arr.length) return true
      return false
    },
    getNewGoodList() {
      var that = this;
      var _this = this;
      let routeParams = this.$route.params;
      var shareContent = null
      var wareType = routeParams.id;
      this.$nextTick(() => {
        _hmt.push(['_trackEvent', '好享受商品详情页', routeParams.id, '商品统计'])
      })
      let wareInfoParam = {
        utime: parseInt(common.getUrlParam('utime')),
        sign: common.getUrlParam('sign'),
        id: routeParams.id
      };

      axios
        .get('https://api.hxsapp.com/mall/NewGoods/newGoodsDet', {
          params: wareInfoParam
        })
        .then(res => {


          let listMap = res.data.data.goods_data;


          //秒杀状态
          var that = this;
          that.listMap = listMap;
          that.goodsType = res.data.data.goods_data.goods_type;
          //let goods_type=common.getUrlParam("goods_type");

          if (parseInt(that.goodsType) == 2 || parseInt(that.goodsType) == 1) {

            that.actPrice = res.data.data.goods_data.act_price
            that.inStock = res.data.data.goods_data.in_stock
            if (res.data.data.goods_data.in_stock == undefined) that.inStock = 0
            that.seckillNum = res.data.data.goods_data.in_stock
            that.seckillType = true;
          }

          //优惠券
          if (res.data.data.coupon_data) {
            this.discountList = res.data.data.coupon_data
            if (this.discountList.length == 0) {
              this.discount = false
            }
          } else {
            this.discount = false
          }

          this.ware.detail = listMap.content
          this.ware.title = listMap.title;

          // if( this.ware.title==null){

          //   window.location.reload();
          // }
          this.smallTabImg = listMap.img;
          this.propertiesMap = res.data.data.goods_item;
          this.goods_sku = res.data.data.goods_sku;

          if (res.data.data.goods_data.video_url) {
            that.goods_data.video_cover = res.data.data.goods_data.video_cover;
            that.goods_data.video_url = res.data.data.goods_data.video_url;
            that.$children[0].src1 = res.data.data.goods_data.video_url;
            that.$children[0].poster = res.data.data.goods_data.video_cover;

            setTimeout(function () {

              //    that.$children[0].initVideo();
              //  that.$children[0].video.src(res.data.data.goods_data.video_url);
              //  that.$children[0].video.poster(res.data.data.goods_data.video_cover);

              // that.$children[0].video.load(); 

              //判断是否有wifi


              if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                if (window.location.href.indexOf('sess_token') == -1) {
                  if(that.isWeiXin){
                   
                  }else{
                    that.$children[0].autoplay1 = true;
                    that.$children[0].imgType = false;
                      setTimeout(function () {
                        that.$children[0].imgType2 = false;
                        that.$children[0].imgType3 = false;
                      }, 500);
                      that.$children[0].initVideo();
                    }

                }else{
                  window.location.href = 'https://hxsapp_get_network_state';
                  window.netWorkState = data => {
                    if (data == 'wifi') {
                      that.$children[0].autoplay1 = true;
                      that.$children[0].imgType = false;
                      setTimeout(function () {
                        that.$children[0].imgType2 = false;
                        that.$children[0].imgType3 = false;
                      }, 500);
                      that.$children[0].initVideo();
                    }
                  }
                }
              } else { 
                that.$children[0].autoplay1 = true;
                that.$children[0].imgType = false;
                setTimeout(function () {
                  that.$children[0].imgType2 = false;
                  that.$children[0].imgType3 = false;
                }, 500) 
                that.$children[0].initVideo();
              }
            }, 1000);

          } else {
            this.tabActive = 2;
          }

          this.tabImgSrc = res.data.data.goods_data.img_list;
          this.alllength = this.tabImgSrc.length;
          this.ware.wareInfo = [] //整合商品信息(商品名称,id,规格)

          if (this.propertiesMap[0].item_value.length) {

            for (var j = 0; j < this.propertiesMap[0].item_value.length; j++) {
              // for(var i = 0; i < this.propertiesMap.length; i++){
              this.ware.wareInfo.push({
                id: listMap.id,
                price: listMap.price,
                key: this.propertiesMap[0].id,
                model: listMap.name,
                propertys: this.propertiesMap[0].item_value[j].text,
                images: this.propertiesMap[0].item_value[j].img,
                listFormat: [
                  // this.propertiesMap[i]
                ]
              })
              // }
            }
            console.log("sss", this.ware.wareInfo)

            //   _this.ware.wareInfo[0].id=res.data.data.goods_data.id;
            //  _this.ware.wareInfo[0].price=res.data.data.goods_data.price;
          } else {
            this.noAttrBoolean = false
          }

          if (that.goodsType == 1 && this._isOn() && that.actPrice == that.ware.wareInfo[0].price) {
            that.goodsType_rm = true;
          }
          this.tabImgSrc = listMap.img_list

          //商品详情显示的价格
          this.ware.price = this.ware.wareInfo.length ? this.ware.wareInfo[0].price : listMap.price
          this.produceID = this.ware.wareInfo.length ? this.ware.wareInfo[0].id : null //默认选中第一个商品id


          // for(var j = 0; j < this.propertiesMap.length; j++){
          //    this.select_active[j]=null;
          //   if(this.propertiesMap[j].item_value.length>1){
          //       this.first_active=false
          //   }

          // }

          if (this.propertiesMap[0].item_value.length) {
            // for (var j = 0; j < this.propertiesMap[0].item_value.length; j++) {
            // for(var i = 0; i < this.propertiesMap.length; i++){
            // }
            // }
          }

          //判断用户是否有足够的绿豆
          axios
            .get('https://api.hxsapp.com/mall/UserAccount/getUserAccount', {
              params: {
                sess_token: this.sessToken
              }
            })
            .then(res => {
              console.log(res)
              if (res.data.code == 200) {
                if (parseInt(listMap.bean_price) <= parseInt(res.data.data.bean) || parseInt(listMap.bean_price) == 0)
                  this.enougBean = true
              }
            });

          //发送客户端分享参数
          let _LsImages = listMap.img;
          let _LsModel = listMap.title;
          let params_data = '?utime=' + common.getUrlParam('utime') +
            '&sign=' + common.getUrlParam('sign');

          shareContent = [
            encodeURIComponent('商品详情'),
            common.config.prefixUrl + 'newShopDetail2/' + wareType + params_data,
            _LsImages,
            encodeURIComponent(_LsModel),
            '',
            // this.produceID,
            7,
            '',
            '',
            ''
          ].join('#')
          //发送客户端分享参数
          if (window.location.href.indexOf('sess_token') != -1) {
            window.hxsapp_visible_share_btn_mar = function () {
              //分享埋点
              common.buriedPoint({
                access_occurred_type: 300313, //发生访问的【页面】类型
                access_occurred_type_id: '', //发生访问的【页面】类型ID
                previous_event_type_obj: '', //【事件】对象类型
                previous_event_type_obj_id: wareType, //【事件】对象类型ID
                previous_content_sort: '' //【事件】事件参数
              })
            }
            //分享的按钮
            if (process.env.NODE_ENV === 'production' && common.getHxsAppVersion() !== '0.0.0') {

              window.location.href = 'https://hxsapp_visible_share_btn#' + shareContent;
            }
          } else {
            //判断是否在app，在站内
            this.downHxsShow = true
          }

          //发送微信二次分享参数
          var _this = this
          common.outSideShare({
            title: '商品详情',
            desc: _LsModel,
            link: common.config.prefixUrl + 'shopDetail/' + wareType,
            img: listMap.img
          })
          //接入linkedMe在非app浏览器直接打开app
          this.linkedMe = {
            params: {
              key: 'hxsapp://web?url=' + common.config.prefixUrl + 'shopDetail/' + wareType + '&showKeyboard=false'
            }
          }

          //埋点
          common.buriedPoint({
            access_occurred_type: 130201, //发生访问的【页面】类型
            access_occurred_type_id: wareType, //发生访问的【页面】类型ID
            previous_event_type_obj: '', //【事件】对象类型
            previous_event_type_obj_id: '', //【事件】对象类型ID
            previous_content_sort: '' //【事件】事件参数
          })



        });




    },
    isWeiXin(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
    },
    shareBtn(){
          //发送客户端分享参数
          var shareContent = null;
          let routeParams = this.$route.params
          var wareType = routeParams.id;
          var listMap=this.listMap;
          let _LsImages =  listMap.img;
          let _LsModel = listMap.title;
          let params_data=  '?utime='+common.getUrlParam('utime')+
            '&sign='+common.getUrlParam('sign');
          
          shareContent = [
            encodeURIComponent('商品详情'),
            common.config.prefixUrl + 'newShopDetail2/' + wareType+params_data,
            _LsImages,
            encodeURIComponent(_LsModel),
            '',
            // this.produceID,
            7,
            '',
            '',
            ''
          ].join('#')
          //发送客户端分享参数
          if (window.location.href.indexOf('sess_token') != -1) {
            window.hxsapp_visible_share_btn_mar = function () {
              //分享埋点
              common.buriedPoint({
                access_occurred_type: 300313, //发生访问的【页面】类型
                access_occurred_type_id: '', //发生访问的【页面】类型ID
                previous_event_type_obj: '', //【事件】对象类型
                previous_event_type_obj_id: wareType, //【事件】对象类型ID
                previous_content_sort: '' //【事件】事件参数
              })
            }
            //分享的按钮
            if (process.env.NODE_ENV === 'production' && common.getHxsAppVersion() !== '0.0.0') {

          window.location.href = 'https://hxsapp_visible_share_btn#' + shareContent;


        }
      } else {
        //判断是否在app，在站内
        this.downHxsShow = true
      }

      //发送微信二次分享参数
      var _this = this
      common.outSideShare({
        title: '商品详情',
        desc: _LsModel,
        link: common.config.prefixUrl + 'shopDetail/' + wareType,
        img: listMap.img
      })
      //接入linkedMe在非app浏览器直接打开app
      this.linkedMe = {
        params: {
          key: 'hxsapp://web?url=' + common.config.prefixUrl + 'shopDetail/' + wareType + '&showKeyboard=false'
        }
      }
    },
    handleChange(index) {
      console.log("11", index)
      this.defaultIndex = index + 1;
    },
    //商品增加
    getGoodsList() {
      let routeParams = this.$route.params
      var _this = this
      var shareContent = null
      var wareType = routeParams.id

      var wareInfoParam = {
        type: wareType
      }

      // goods_type = 1 今日推荐 goods_type = 2 每日秒杀
      axios
        .get('https://mall.hxsapp.com/base/Goods/getGoodsListWithProperties', {
          params: wareInfoParam
        })
        .then(res => {
          console.log(res)
          //秒杀状态
          var that = this
          that.goodsType = res.data.goods_type
          //let goods_type=common.getUrlParam("goods_type");

          if (parseInt(that.goodsType) == 2 || parseInt(that.goodsType) == 1) {

            that.actPrice = res.data.list_map.act_price
            that.inStock = res.data.list_map.in_stock
            if (res.data.list_map.in_stock == undefined) that.inStock = 0
            that.seckillNum = res.data.list_map.percentage
            that.seckillType = true;
          }


          let listMap = res.data.list_map
          this.propertiesMap = res.data.properties_map
          //优惠券
          if (res.data.coupon_data) {
            this.discountList = res.data.coupon_data
            if (this.discountList.length == 0) {
              this.discount = false
            }
          } else {
            this.discount = false
          }

          this.ware.detail = listMap.content
          this.ware.title = listMap.name
          this.ware.wareInfo = [] //整合商品信息(商品名称,id,规格)

          if (this.propertiesMap[0].list.length) {
            for (var j = 0; j < this.propertiesMap[0].list.length; j++) {
              // for(var i = 0; i < this.propertiesMap.length; i++){
              this.ware.wareInfo.push({
                id: listMap.id,
                price: listMap.Price,
                key: this.propertiesMap[0].key,
                model: listMap.name,
                propertys: this.propertiesMap[0].list[j].name,
                images: this.propertiesMap[0].list[j].img,
                listFormat: [
                  // this.propertiesMap[i]
                ]
              })
              // }
            }
          } else {
            this.noAttrBoolean = false
          }


          console.log(this.ware.wareInfo)
          if (that.goodsType == 1 && this._isOn() && that.actPrice == that.ware.wareInfo[0].price) {
            that.goodsType_rm = true;
          }
          this.tabImgSrc = listMap.img_list

          //商品详情显示的价格
          this.ware.price = this.ware.wareInfo.length ? this.ware.wareInfo[0].price : listMap.Price
          this.produceID = this.ware.wareInfo.length ? this.ware.wareInfo[0].id : null //默认选中第一个商品id

          //判断用户是否有足够的绿豆
          axios
            .get('https://api.hxsapp.com/mall/UserAccount/getUserAccount', {
              params: {
                sess_token: this.sessToken
              }
            })
            .then(res => {
              console.log(res)
              if (res.data.code == 200) {
                if (parseInt(listMap.bean_price) <= parseInt(res.data.data.bean) || parseInt(listMap.bean_price) == 0)
                  this.enougBean = true
              }
            })

          //所有的规格，默认选中第一个有库存的商品
          this.produceText = []

          var isAlike = ''
          var isAlike2 = ''
          var isAlike3 = ''
          var _that = this

          function defaultSelection(code, arr) {
            for (let i = 0; i < _that.propertiesMap.length; i++) {
              for (let j = 0; j < _that.propertiesMap[i].list.length; j++) {
                if (_that.propertiesMap[i].list[j].stock != '0') {
                  if (_that.wareIndex == -1) {
                    _that.wareIndex = j //默认购买商品选中的规格
                    _that.shopPatternIndex = j
                    _that.patternIndex = j
                  }

                  if (!_that.smallTabImg && i == 0) {
                    _that.smallTabImg = _that.propertiesMap[i].list[j].img //小切换图
                  }

                  var key = _that.propertiesMap[i].key

                  if (code != key) {
                    var value = _that.propertiesMap[i].list[j].value
                    var json = {}
                    json[key] = value
                    arr.push(json)
                    code = key
                  }
                }
              }
            }
            //如果
            if (!_that.smallTabImg) {
              _that.smallTabImg = _that.propertiesMap[0].list.length && _that.propertiesMap[0].list[0].img //小切换图
            }

            if (_that.wareIndex == -1) {
              _that.wareIndex = 0 //默认购买商品选中的规格
              _that.shopPatternIndex = 0
              _that.patternIndex = 0
            }
          }

          defaultSelection(isAlike, this.produceText)
          defaultSelection(isAlike2, this.buyProduceText)
          defaultSelection(isAlike3, this.shopProduceText)
          if (this.produceText.length < this.propertiesMap.length) {
            //所有商品库存为0
            for (let i = 0; i < this.propertiesMap.length; i++) {
              this.wareIndex = 0 //默认购买商品选中的规格
              this.shopPatternIndex = 0
              this.patternIndex = 0

              let key = this.propertiesMap[i].key
              var _this = this
              var produceTextString = JSON.stringify(_this.produceText)
              if (produceTextString.indexOf('"' + key + '":') == -1) {
                let value = this.propertiesMap[i].list.length && this.propertiesMap[i].list[0].value
                var json = {}
                json[key] = value
                this.produceText.splice(i, 0, json)
                this.buyProduceText.splice(i, 0, json)
                this.shopProduceText.splice(i, 0, json)
              }
            }
          }
          //发送客户端分享参数
          let _LsImages = this.ware.wareInfo.length ? this.ware.wareInfo[0].images : ''
          let _LsModel = this.ware.wareInfo.length ? this.ware.wareInfo[0].model : ''
          shareContent = [
            encodeURIComponent('商品详情'),
            common.config.prefixUrl + 'newShopDetail2/' + wareType,
            _LsImages,
            encodeURIComponent(_LsModel),
            '',
            // this.produceID,
            7,
            '',
            '',
            ''
          ].join('#')
          //发送客户端分享参数
          if (window.location.href.indexOf('sess_token') != -1) {
            window.hxsapp_visible_share_btn_mar = function () {
              //分享埋点
              common.buriedPoint({
                access_occurred_type: 300313, //发生访问的【页面】类型
                access_occurred_type_id: '', //发生访问的【页面】类型ID
                previous_event_type_obj: '', //【事件】对象类型
                previous_event_type_obj_id: wareType, //【事件】对象类型ID
                previous_content_sort: '' //【事件】事件参数
              })
            }
            //分享的按钮
            if (process.env.NODE_ENV === 'production' && common.getHxsAppVersion() !== '0.0.0') {
              window.location.href = 'https://hxsapp_visible_share_btn#' + shareContent
            }
          } else {
            //判断是否在app，在站内
            this.downHxsShow = true
          }

          //发送微信二次分享参数
          var _this = this
          common.outSideShare({
            title: '商品详情',
            desc: _this.ware.wareInfo.length ? _this.ware.wareInfo[0].model : '',
            link: common.config.prefixUrl + 'shopDetail/' + wareType,
            img: _this.ware.wareInfo.length ? _this.ware.wareInfo[0].images : ''
          })
          //接入linkedMe在非app浏览器直接打开app
          this.linkedMe = {
            params: {
              key: 'hxsapp://web?url=' + common.config.prefixUrl + 'shopDetail/' + wareType + '&showKeyboard=false'
            }
          }

          //埋点
          common.buriedPoint({
            access_occurred_type: 130201, //发生访问的【页面】类型
            access_occurred_type_id: wareType, //发生访问的【页面】类型ID
            previous_event_type_obj: '', //【事件】对象类型
            previous_event_type_obj_id: '', //【事件】对象类型ID
            previous_content_sort: '' //【事件】事件参数
          })
        })
    },
    wareReduce() {
      var _this = this
      if (!this.isShopCarWare) {
        this.mallNumber = this.mallNumber <= 1 ? 1 : --this.mallNumber
        this.wareNumber = this.mallNumber
      } else {
        this.beforeShopCarNumber = this.beforeShopCarNumber <= 1 ? 1 : --this.beforeShopCarNumber
        this.wareNumber = this.beforeShopCarNumber
      }

      //埋点
      common.buriedPoint({
        access_occurred_type: 220607, //发生访问的【页面】类型
        access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
        previous_event_type_obj: '', //【事件】对象类型
        previous_event_type_obj_id: '', //【事件】对象类型ID
        previous_content_sort: '' //【事件】事件参数
      })

      return false
    },
    //商品增加
    wareIncrease() {
      var _this = this
      if (!this.isShopCarWare) {
        this.mallNumber = this.mallNumber >= 99 ? 99 : ++this.mallNumber
        this.wareNumber = this.mallNumber
      } else {
        this.beforeShopCarNumber = this.beforeShopCarNumber >= 99 ? 99 : ++this.beforeShopCarNumber
        this.wareNumber = this.beforeShopCarNumber
      }

      //埋点
      common.buriedPoint({
        access_occurred_type: 220607, //发生访问的【页面】类型
        access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
        previous_event_type_obj: '', //【事件】对象类型
        previous_event_type_obj_id: '', //【事件】对象类型ID
        previous_content_sort: '' //【事件】事件参数
      })
      return false
    },
    selected2($event, index, parentIndex, key) {
      if ($($event.target).hasClass("lack")) {
        return;
      }
      var el = $($event.target);
      var thisAction = false;
      if ($($event.target).hasClass("active")) {
        thisAction = true;
        $($event.target).parent().find("a").removeClass("active");

        if (this.propertiesMap[parentIndex + 1] != undefined) {
          $($event.target).parent().parent().nextAll().children().find("a").removeClass("active");
          $($event.target).parent().parent().nextAll().children().find("a").removeClass("lack");
        }
        this.select_active[parentIndex] = null;
      } else {

        $($event.target).parent().parent().nextAll().children().find("a").removeClass("active");
        $($event.target).parent().parent().nextAll().children().find("a").removeClass("lack");
        $($event.target).parent().find("a").removeClass("active");
        $($event.target).addClass("active");
        this.select_active[parentIndex] = index;
      }

      if (this.propertiesMap[parentIndex].item_value[index].img != "") {
        this.smallTabImg = this.propertiesMap[parentIndex].item_value[index].img;
      }
      const that = this;
      let thisData = this.propertiesMap[parentIndex].item_value[index].sku_ids;
      let parent_data = this.propertiesMap[parentIndex + 1];


      this.checkStockItem(el, thisData, parent_data, index, parentIndex, thisAction);

    },
    checkStockType(el) {
      let data = $(el.target)
    },
    checkStockItem(el, thisData, parentData, index, parentIndex, type) {
      var that = this;
      var parentData = parentData;
      var length2 = null;
      var type2 = type;
      if (parentData == undefined) {
        var sku_id = that.checkSku();
        var price = "";
        for (var j = 0; j < that.goods_sku.length; j++) {

          if (parseInt(sku_id) == parseInt(that.goods_sku[j].id)) {
            price = that.goods_sku[j].price;
          }
        }
        if (price != "") {
          that.ware.wareInfo[0].price = price;
        }
        var allname = "";
        for (var i = 0; i < that.propertiesMap.length; i++) {
          if ($(".choice-color").eq(i).children().find('a').hasClass("active")) {
            var index2 = $(".choice-color").eq(i).children().find('a.active').index();
            allname += that.propertiesMap[i].item_value[index2].text + "/";
          }
        }
        allname = allname.substring(0, allname.length - 1);
        that.propertys_name = allname;

        return;
      }

      // parentData=this.propertiesMap[parentIndex].item_value;
      length2 = parentData.item_value.length;


      if (length2 > 0) {

        // $((el.parent().parent().next().children().find("a")) ).removeClass("lack");
        for (let i = 0; i < length2; i++) {

          let children_data = parentData.item_value[i].sku_ids;
          let intersection = thisData.filter(v => children_data.includes(v));//判断是否有交集

          if (intersection.length > 0) {
            $((el.parent().parent().next().children().find("a"))[i]).removeClass("lack");
            if ((parseInt(parentIndex) + 2) == that.propertiesMap.length) {
              if (that.checkStock(i) == 0) {
                $((el.parent().parent().next().children().find("a"))[i]).addClass("lack");
              }
            }

          } else {
            $((el.parent().parent().next().children().find("a"))[i]).removeClass("active");
            if (type2) {
              $((el.parent().parent().next().children().find("a"))).removeClass("lack");
            } else {
              $((el.parent().parent().next().children().find("a"))[i]).addClass("lack");
            }

          }
          //判断是否下面有值，去判断库存是否为0
          if (that.propertiesMap[parentIndex + 2] == undefined) {

          }

        }

      }
      //判断头部的字体的变化
      var allname = "";
      for (var i = 0; i < that.propertiesMap.length; i++) {
        if ($(".choice-color").eq(i).children().find('a').hasClass("active")) {
          var index2 = $(".choice-color").eq(i).children().find('a.active').index();
          allname += that.propertiesMap[i].item_value[index2].text + "/";
        }
      }
      allname = allname.substring(0, allname.length - 1);
      that.propertys_name = allname;
    },
    //检查库存
    checkStock(index) {
      var _this = this;
      var select_type = true;
      var index2 = null;
      let length2 = this.propertiesMap.length;
      var params_property = [];
      var params_property2 = [];
      var num2 = null;
      for (var i = 0; i < _this.propertiesMap.length; i++) {
        if ($(".choice-color").eq(i).children().find('a').hasClass("active")) {

          var index2 = $(".choice-color").eq(i).children().find('a.active').index();
          params_property[i] = index2;
          var array1 = _this.propertiesMap[i].item_value[index2].sku_ids;
          params_property2.push(array1);
        } else {
          select_type = false;
          if (_this.propertiesMap.length == (i + 1) || _this.propertiesMap[i].item_value.length == 1) {
            select_type = true;
            var array1 = _this.propertiesMap[i].item_value[index].sku_ids;
            params_property2.push(array1);
          } else {

          }
        }
      }

      var allarray2 = null;
      for (var i = 0; i < params_property2.length; i++) {
        var array1 = params_property2[i];
        if (params_property2.length == (i + 1)) {
          break;
        }

        var array2 = params_property2[i + 1];
        let allarray = null;
        if (allarray2 != null) {
          array1 = allarray2;
        }
        allarray = array1.filter(v => array2.includes(v));
        allarray2 = allarray;
      }
      index2 = parseInt(this.select_active[length2 - 1]);
      var goods_sku2 = "";

      var sku_ids2 = parseInt(allarray2[0]);
      for (var j = 0; j < _this.goods_sku.length; j++) {
        if (parseInt(sku_ids2) == _this.goods_sku[j].id) {

          goods_sku2 = parseInt(_this.goods_sku[j].stock);
        }
      }
      return goods_sku2;


    },
    //tab 切换
    tabActive2(index) {
      if (parseInt(index) == 1) {
        this.tabActive = parseInt(index);
        // this.$children[0].play();
      } else {
        this.tabActive = parseInt(index);


        this.$children[0].pause();


      }

    },
    checkSku() {
      var _this = this;
      var select_type = true;
      var index2 = null;
      let length2 = this.propertiesMap.length;
      var params_property = [];
      for (var i = 0; i < _this.propertiesMap.length; i++) {
        if ($(".choice-color").eq(i).children().find('a').hasClass("active")) {

          var index2 = $(".choice-color").eq(i).children().find('a.active').index();
          params_property[i] = index2;
        } else {
          select_type = false;
          // Toast({
          //   message: "选择属性",
          //   duration: 1000
          // });
          return;
        }
      }
      index2 = parseInt(this.select_active[length2 - 1]);
      var goods_sku2 = "";

      var sku_ids2 = _this.propertiesMap[(length2 - 1)].item_value[index2].sku_ids;
      for (var j = 0; j < _this.goods_sku.length; j++) {
        if (parseInt(sku_ids2) == _this.goods_sku[j].id) {
          goods_sku2 = parseInt(_this.goods_sku[j].id);
          return goods_sku2;
        }
      }

    },
    selected(index, parentIndex, key) {

      if (this.propertiesMap[parentIndex].list[index].stock == '0' && parentIndex == 0) return
      var _this = this
      if (!this.isShopCarWare) {
        this.patternIndex = index
        // this.produceID = this.ware.wareInfo[0].id;//选择规格商品id

        if (parentIndex == 0) {
          this.wareIndex = this.patternIndex
          this.smallTabImg = this.propertiesMap[0].list[index].img
        }

        this.buyProduceText[parentIndex][key] = this.propertiesMap[parentIndex].list[index].value

        this.produceText[parentIndex][key] = this.propertiesMap[parentIndex].list[index].value

        console.log(this.produceText)
      } else {
        this.shopPatternIndex = index
        // this.shopCarproduceID = this.ware.wareInfo[0].id;//选择规格商品id

        //选择商品规格第一栏才触发
        if (parentIndex == 0) {
          this.wareIndex = this.shopPatternIndex
          this.smallTabImg = this.propertiesMap[0].list[index].img
        }

        //赋值选中的商品规格
        this.shopProduceText[parentIndex][key] = this.propertiesMap[parentIndex].list[index].value
        this.produceText[parentIndex][key] = this.propertiesMap[parentIndex].list[index].value
      }

      //埋点
      common.buriedPoint({
        access_occurred_type: 220606, //发生访问的【页面】类型
        access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
        previous_event_type_obj: '', //【事件】对象类型
        previous_event_type_obj_id: '', //【事件】对象类型ID
        previous_content_sort: '' //【事件】事件参数
      })
    },
    submit() {
      var _this = this;
      var select_type = true;
      var index2 = null;
      let length2 = this.propertiesMap.length;
      var params_property = [];
      var params_property2 = [];
      var num2 = null;
      for (var i = 0; i < _this.propertiesMap.length; i++) {
        if ($(".choice-color").eq(i).children().find('a').hasClass("active")) {
          var index2 = $(".choice-color").eq(i).children().find('a.active').index();
          params_property[i] = index2;
          var array1 = _this.propertiesMap[i].item_value[index2].sku_ids;
          params_property2.push(array1);
        } else {
          select_type = false;
          Toast({
            message: "选择属性",
            duration: 1000
          });
          return;
        }
      }

      var allarray2 = null;

      for (var i = 0; i < params_property2.length; i++) {
        var array1 = params_property2[i];
        if (params_property2.length == (i + 1)) {
          //判断是否只有一个的情况
          if (params_property2.length == 1) {
            allarray2 = params_property2[i];
          }
          break;
        }

        var array2 = params_property2[i + 1];
        let allarray = null;
        if (allarray2 != null) {
          array1 = allarray2;
        }
        allarray = array1.filter(v => array2.includes(v));
        allarray2 = allarray;


      }


      index2 = parseInt(this.select_active[length2 - 1]);
      var goods_sku2 = "";

      var sku_ids2 = parseInt(allarray2[0]);
      for (var j = 0; j < _this.goods_sku.length; j++) {
        if (parseInt(sku_ids2) == _this.goods_sku[j].id) {
          if (parseInt(_this.goods_sku[j].stock) == 0) {
            Toast('商品补货中，暂不支持购买')
            return;
          }
          goods_sku2 = parseInt(_this.goods_sku[j].id);
        }
      }


      if (!this.isShopCarWare) {
        //判断是否有足够的绿豆
        // if (!this.enougBean) {
        //   Toast({
        //     message: '绿豆不足',
        //     duration: 1000
        //   })
        //   return
        // }

        //埋点
        common.buriedPoint({
          access_occurred_type: 220610, //发生访问的【页面】类型
          access_occurred_type_id: _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
          previous_event_type_obj: '', //【事件】对象类型
          previous_event_type_obj_id: '', //【事件】对象类型ID
          previous_content_sort: '' //【事件】事件参数
        })





        //拼接buyCarproduceID参数格式 id=2@color-0_size-l
        const _LsWareInfoId = _this.ware.wareInfo[0].id;
        let buyCarproduceID = 'id=' + _LsWareInfoId + '@'
        for (let i = 0; i < this.propertiesMap.length; i++) {
          buyCarproduceID += this.propertiesMap[i].id + '-' + this.propertiesMap[i].item_value[params_property[i]].id + '_'
        }
        buyCarproduceID = buyCarproduceID.substring(0, buyCarproduceID.length - 1)
        // debugger;
        //检查库存
        axios
          .get('https://api.hxsapp.com/mall/Cart/checkStock', {
            params: {
              data: '[{"sku_id":"' + goods_sku2 + '","num":' + this.mallNumber + '}]',
              sess_token: this.sessToken,
              utime: common.getUrlParam('utime'),
              sign: common.getUrlParam('sign')
            }
          })
          .then(res => {

            if (parseInt(res.data.code) == 203) {
              //库存不足
              // $('.mint-toast').css({
              // 	'z-index':'4000'
              // })
              if(_this.goods_data.video_url!=""){
              _this.$children[0].imgType4=true;

              }

              Toast({
                message: res.data.msg,
                duration: 1000
              })
              return
            } else {
              if(_this.goods_data.video_url!=""){
                _this.$children[0].imgType4=true;
              }
              this.popupVisible = false
              setTimeout(() => {
                
                window.location.href =
                  'https://hxsapp_order_new_info/#[{"sku_id":"' +
                  goods_sku2 +
                  '","num":' +
                  this.mallNumber +
                  '}]'
              }, 100)
            }
          })
      } else {
        this.joinShopCar()
      }
    },
    closePop() {
      var _this = this
      this.popupVisible = false
      debugger;
      if(_this.goods_data.video_url!=""){
      setTimeout(function(){
        _this.$children[0].imgType4=true;
       _this.$children[0].paly2();
      },500);
      }
     

      //埋点
      common.buriedPoint({
        access_occurred_type: 220605, //发生访问的【页面】类型
        access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
        previous_event_type_obj: '', //【事件】对象类型
        previous_event_type_obj_id: '', //【事件】对象类型ID
        previous_content_sort: '' //【事件】事件参数
      })
    },
    toBuy(key) {
      var _this = this

      if (_this.seckillType == true && parseInt(_this.inStock) == 0) {
        Toast('商品补货中，暂不支持购买')
        return;
      }

      if (!_this.noAttrBoolean) {
        Toast('商品补货中，暂不支持购买')
        return
      }

      if (this.isOutStock) return false
      // if (this.sessToken < 5 || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)) {
      //   window.location.href = 'https://hxsapp_showloginpage'
      //   return
      // }
      
   

      //判断点击购物车还是直接购买

      if (key == 'buyNow') {
        this.isShopCarWare = false;
        if(_this.goods_data.video_url!=""){
          _this.$children[0].imgType4 = false;
          _this.$children[0].pause();
        }
        this.wareNumber = this.mallNumber
        this.wareIndex = this.patternIndex

        this.produceText = null
        this.produceText = this.buyProduceText

        //埋点
        common.buriedPoint({
          access_occurred_type: 220602, //发生访问的【页面】类型
          access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
          previous_event_type_obj: '', //【事件】对象类型
          previous_event_type_obj_id: '', //【事件】对象类型ID
          previous_content_sort: '' //【事件】事件参数
        })
      } else {
        this.isShopCarWare = true
        if(_this.goods_data.video_url!=""){
          _this.$children[0].imgType4 = false;
          _this.$children[0].pause();
        }

        this.wareNumber = this.beforeShopCarNumber
        this.wareIndex = this.shopPatternIndex
        this.shopCarproduceID = this.ware.wareInfo[this.shopPatternIndex].id

        this.produceText = null
        this.produceText = this.shopProduceText

        //埋点
        common.buriedPoint({
          access_occurred_type: 220601, //发生访问的【页面】类型
          access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
          previous_event_type_obj: '', //【事件】对象类型
          previous_event_type_obj_id: '', //【事件】对象类型ID
          previous_content_sort: '' //【事件】事件参数
        })
      }

      this.popupVisible = true

      this.windowScrollTop = document.body.scrollTop

      this.shopDetailContainerActive = {
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
        top: -this.windowScrollTop + 'px'
      }
    },
    toShopCar() {
      //打开购物车
      var _this = this
      if (this.sessToken.length < 5 || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)) {
        common.h5CallAppAction.hxsapp_showloginpage()
        return
      }

      //埋点
      common.buriedPoint({
        access_occurred_type: 220604, //发生访问的【页面】类型
        access_occurred_type_id: this.$route.params.id, //发生访问的【页面】类型ID
        previous_event_type_obj: '', //【事件】对象类型
        previous_event_type_obj_id: '', //【事件】对象类型ID
        previous_content_sort: '' //【事件】事件参数
      })

      window.location.href = 'https://hxsapp_open_shop_car'
    },
    joinShopCar() {
      //加入购物车

      var _this = this;
      var select_type = true;
      var index2 = null;
      let length2 = this.propertiesMap.length;
      var params_property = [];
      var params_property2 = [];
      var num2 = null;
      for (var i = 0; i < _this.propertiesMap.length; i++) {
        if ($(".choice-color").eq(i).children().find('a').hasClass("active")) {
          var index2 = $(".choice-color").eq(i).children().find('a.active').index();
          params_property[i] = index2;
          var array1 = _this.propertiesMap[i].item_value[index2].sku_ids;
          params_property2.push(array1);
        } else {
          select_type = false;
          Toast({
            message: "选择属性",
            duration: 1000
          });
          return;
        }
      }

      var allarray2 = null;
      for (var i = 0; i < params_property2.length; i++) {
        var array1 = params_property2[i];
        if (params_property2.length == (i + 1)) {
          //判断是否只有一个的情况
          if (params_property2.length == 1) {
            allarray2 = params_property2[i];
          }
          break;
        }

        var array2 = params_property2[i + 1];
        let allarray = null;
        if (allarray2 != null) {
          array1 = allarray2;
        }
        allarray = array1.filter(v => array2.includes(v));
        allarray2 = allarray;


      }


      index2 = parseInt(this.select_active[length2 - 1]);
      var goods_sku2 = "";

      var sku_ids2 = parseInt(allarray2[0]);
      for (var j = 0; j < _this.goods_sku.length; j++) {
        if (parseInt(sku_ids2) == _this.goods_sku[j].id) {

          if (parseInt(_this.goods_sku[j].stock) == 0) {
            Toast('商品补货中，暂不支持购买')
            return;
          }
          goods_sku2 = parseInt(_this.goods_sku[j].id);
        }
      }



      if (this.sessToken.length < 5 || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)) {
        common.h5CallAppAction.hxsapp_showloginpage()
        return
      }

      //拼接ProduceID参数格式 id=2@color-0_size-l
      const _LsWareInfoId2 = _this.ware.wareInfo.length ? _this.ware.wareInfo[0].id : ''
      let shopCarproduceID = 'id=' + _LsWareInfoId2 + '@'
      for (let i = 0; i < this.shopProduceText.length; i++) {
        for (var item in this.shopProduceText[i]) {
          shopCarproduceID += item + '-' + this.shopProduceText[i][item] + '_'
        }
      }
      shopCarproduceID = shopCarproduceID.substring(0, shopCarproduceID.length - 1)

      //检查库存
      axios
        .get('https://api.hxsapp.com/mall/Cart/checkStock', {
          params: {
            data: '[{"sku_id":"' + goods_sku2 + '","num":' + this.mallNumber + '}]',
            sess_token: this.sessToken,
            utime: common.getUrlParam('utime'),
            sign: common.getUrlParam('sign')
          }
        })
        .then(res => {

          if (parseInt(res.data.code) == 203) {
            //库存不足
            // $('.mint-toast').css({
            // 	'z-index':'4000'
            // })
            Toast({
              message: res.data.msg,
              duration: 1000
            })
            return false
          }
        })
      let routeParams = this.$route.params;
      var shareContent = null
      var wareType = routeParams.id;

      //提交购物车接口
      axios
        .get('https://api.hxsapp.com/mall/Cart/addNewCart', {
          params: {
            sess_token: this.sessToken,
            utime: common.getUrlParam('utime'),
            sign: common.getUrlParam('sign'),
            goods_id: wareType,
            sku_id: goods_sku2,
            num: _this.wareNumber
          }
        })
        .then(res => {
          console.log(res)
          //成功加入购物车

          // $('.mint-toast').css({
          // 	'z-index':'4000'
          // })

          if (parseInt(res.data.code) == 200) {
            Toast({
              message: '成功加入购物车',
              duration: 2000
            })
            _this.shopCarNumber = res.data.data.num
            _this.popupVisible = false

            if(_this.goods_data.video_url!=""){
              setTimeout(function(){
                  _this.$children[0].imgType4=true;
                _this.$children[0].paly2();
                },500);
            }
           
          } else if (parseInt(res.data.code) == 625) {
            Toast({
              message: res.data.msg,
              duration: 1000
            })
          } else {
            Toast({
              message: res.data.msg,
              duration: 1000
            })


          }
           

          //埋点
          common.buriedPoint({
            access_occurred_type: 220608, //发生访问的【页面】类型
            access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
            previous_event_type_obj: '', //【事件】对象类型
            previous_event_type_obj_id: '', //【事件】对象类型ID
            previous_content_sort: '' //【事件】事件参数
          })
        })
    },
    getShopCar() {
      //获取购物车数量
      if (!this.sessToken || this.sessToken.length < 5) return

      axios
        .get('https://api.hxsapp.com/mall/Cart/getNewCartNum', {
          params: {
            sess_token: this.sessToken,
            utime: common.getUrlParam('utime'),
            sign: common.getUrlParam('sign')
          }
        })
        .then(res => {
          if (res.data.code == 200) this.shopCarNumber = res.data.data.num
        })
    },
    openIm() {
      //打开商城客服
      var _this = this
      if (this.sessToken.length < 5 || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)) {
        common.h5CallAppAction.hxsapp_showloginpage()
        return
      }
      //埋点
      common.buriedPoint({
        access_occurred_type: 220603, //发生访问的【页面】类型
        access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
        previous_event_type_obj: '', //【事件】对象类型
        previous_event_type_obj_id: '', //【事件】对象类型ID
        previous_content_sort: '' //【事件】事件参数
      })

      setTimeout(() => {
        common.h5CallAppAction.hxsapp_openIm()
      }, 100)
    },
    windowScrollTopFn() {
      if (!this.windowScrollTop) return
      setTimeout(() => {
        document.body.scrollTop = this.windowScrollTop
      }, 1)
    },
    isJunpOldshopDetail() {
      //判断使用旧版商品详情
      var appVersion = common.getHxsAppVersion()
      var isTrue = common.compareAppVersion(appVersion, '3.2.0')
      if (!isTrue && window.location.href.indexOf('sess_token') != -1) {
        // if(window.location.href.indexOf('localhost:8082')!=-1) return;
        window.location.href =
          'https://app.hxsapp.com/hxsweb/shopDetail/' + this.shopParamType + '?sess_token=' + this.sessToken
      }
    },
    isiPhoneXFn() {
      var ua = window.navigator.userAgent
      this.isiPhoneX = new RegExp('iPhone X').test(ua)
    }, //弹出框的优惠券
    dialogDC(type) {
      var that = this
      // if (this.downHxsShow) {
      //   that.isPopupDownLoad = true;
      //   return;
      // }
      let wareInfoParam = {
        sess_token: common.getUrlParam('sess_token'),
        utime: common.getUrlParam('utime'),
        sign: common.getUrlParam('sign')
      }
      axios
        .get('https://api.hxsapp.com/mall/Coupon/getCouponsList', {
          params: wareInfoParam
        })
        .then(res => {
          if (res.data.code == 200) {
            that.couponsList = res.data.data
            if (type == true) {
              return
            }
            that.popupVisibleDC = true
          } else if (res.data.code == '0001') {
            window.location.href = 'https://hxsapp_showloginpage';
            Toast("请登录");

          } else {
            Toast(res.data.msg)
          }
        })
    },
    addCoupons(id) {
      var that = this
      // if (this.downHxsShow) {
      //   that.isPopupDownLoad = true;
      //   return;
      // }
      let wareInfoParam = {
        sess_token: common.getUrlParam('sess_token'),
        utime: common.getUrlParam('utime'),
        sign: common.getUrlParam('sign'),
        c_id: parseInt(id),
        dist_type: 1
      }
      axios
        .get('https://api.hxsapp.com/mall/Coupon/collectCoupons', {
          params: wareInfoParam
        })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.is_finished == false) {
              Toast('已领完')
              that.dialogDC(true)
              return
            }
            Toast('领取成功')
            that.dialogDC(true)
          } else {
            Toast(res.data.msg)
            that.dialogDC(true)
          }
        })
    },
    getSeckill() { }
  },
  beforeDestroy() {
    document.title = common.config.webTitle
    document.body.scrollTop = 0
    window.hxsapp_visible_share_btn_mar = null
    $('.mint-toast').css('z-index', '2001')
  },
  watch: {
    defaultIndex(val) {
      //  console.log(val);
      //  this.defaultIndex=this.$children[3].index;
    }
  },
}
</script>
<style lang="less">
.mt-swipe-img {
  height: inherit;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
.mint-swipe .mint-swipe-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mint-swipe .mint-swipe-item img {
  width: auto !important;
  height: 100% !important;
  max-height: 375px;
  object-fit: fill;
  margin: 0 auto;
}
.mint-toast {
  z-index: 4000;
}

.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: #333;
}
</style>
<style lang="less" scoped>
.shopDetailContainer {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  .indicators-box {
    width: 43px;
    height: 25px;
    background: rgba(51, 51, 51, 0.3);
    border-radius: 25px;
    /* width: 19px; */
    /* height: 18px; */
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 25px;
    position: absolute;
    right: 15px;
    bottom: 15px;
    text-align: center;
  }
  &.shopDetailContainerActiveClass {
    position: absolute;
    height: 100%;
    overflow: hidden;
  }

  .head-tab {
    position: relative;
    overflow: hidden;
  }

  .tab-btn {
    position: absolute;
    text-align: center;
    bottom: 12px;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
  }
  .tab-btn .btn {
    width: 48px;
    height: 20px;
    background: rgba(255, 255, 255, 1);
    border-radius: 62px;
    opacity: 0.8;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border: 0px;
    margin: 0px 4px;
  }

  .tab-btn .active {
    color: white;
    background: linear-gradient(
      270deg,
      rgba(255, 110, 141, 1) 0%,
      rgba(255, 104, 176, 1) 100%
    );
    border-radius: 25px;
  }
  .buy-now {
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .bottom-bar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background: #ff668c;
    font-size: 16px;
    display: block;
  }

  .seat {
    background: transparent;
  }

  .border-soild {
    width: 100%;
    height: 1px;
    background: #818dcf16;
  }

  .grey {
    background: #ccc;
  }

  .flex-c {
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    vertical-align: middle;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-align: center;
    /* -webkit-flex-wrap:wrap; */
    /* flex-wrap:wrap; */
  }

  .flex-item {
    flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
    -webkit-box: 1;
    -webkit-box-flex: 1;
    position: relative;
  }

  .img-r {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    /* background-color: #f2f2f2; */
  }

  .img-r img {
    width: 100%;
    height: auto;
    max-width: none;
  }

  .dialog-box {
  }

  .dialog-box .head {
    text-align: center;
    border-bottom: 1px solid #818dcf32;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #333333;
    padding: 12px 0px;
    margin: 0rem 1rem 0.5rem 1rem;
    letter-spacing: 1px;
  }

  .dialog-box .ok {
    letter-spacing: 1px;
    -webkit-flex: 1.5;
    width: 100%;
    display: block;
    height: 50px;
    font-size: 17px;
    color: white;
    font-family: PingFangSC-Regular;
    border: 0px;
    background: linear-gradient(
      270deg,
      rgba(255, 110, 141, 1) 0%,
      rgba(255, 104, 176, 1) 100%
    );
  }

  .dialog-box ul {
    /* margin: 0rem 1.0rem; */
    overflow-y: scroll;
    height: 13rem;
  }

  .dialog-box li {
    /* box-shadow: 0px 0px 5px #00000036; */
    margin-bottom: 1rem;
    -webkit-box-shadow: 1px 1px 3.5px 1.5px rgba(239, 239, 239, 0.6);
    box-shadow: 1px 1px 3.5px 1.5px rgba(239, 239, 239, 0.6);
    border-radius: 0.2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    height: 5.3rem;
    letter-spacing: 1px;
    padding: 0px 0px;
    margin: 0.5rem 1rem 1rem 1rem;
  }

  .dialog-box li .head-img {
    width: 5.3rem;
    height: 5.3rem;
    margin-right: 0.6rem;
  }

  .dialog-box li .head-img img {
    height: 100%;
    width: auto;
  }

  .dialog-box li .content {
  }

  .dialog-box li .content span h5 {
    color: #999999;
    /* line-height: 13px; */
    font-size: 10px;
    margin: 0rem;
    color: #999;
    letter-spacing: 0.1px;
  }

  .dialog-box li .bar {
    height: 5.3rem;
    letter-spacing: 1px;
  }

  .dialog-box li .content p {
    font-size: 13px;
    margin-bottom: 0.2rem;
    letter-spacing: 0.5px;
  }

  .dialog-box li .content p span {
    font-weight: 600;
    color: rgba(245, 166, 35, 1);
    margin-right: 0.4rem;
    letter-spacing: 0.5px;
  }

  .dialog-box li .content .img-r {
    width: 0.8rem;
    height: 0.8rem;
    position: relative;
  }

  .dialog-box li .content .img-r img {
    height: 100%;
    width: auto;
  }

  .dialog-box li .pass {
    background-color: white;
    border: 0px;
    height: 5.3rem;
    font-size: 13px;
    text-align: center;
    padding: 0rem 0.4rem;
    margin-right: 0.5rem;
    width: 3.7rem;
    letter-spacing: 1px;
    color: #999999;
  }

  .dialog-box li .get {
    background-color: white;
    border: 0px;
    height: 5.3rem;
    font-size: 13px;
    text-align: center;
    padding: 0rem 0.7rem;
    margin-right: 0.5rem;
    width: 3.7rem;
    color: #ff668c;
    letter-spacing: 1px;
  }

  .dialog-box li button:hover {
    border: 0px;
  }

  .dialog-box li button:focus {
    border: 0px;
    outline: 0px;
    /* color: #f5a623; */
  }

  .ellipsis {
    word-wrap: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .dialog-box {
    overflow: hidden;
  }

  .discount {
    /* padding-bottom: 15px; */
    border-top: 1px solid #818dc132;
    height: 50px;
    box-sizing: border-box;
  }

  .discount > span {
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    margin-right: 15px;
  }

  .discount li {
    background: linear-gradient(to left, #fad961 0%, #f5a623 100%);
    padding: 1px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 5px;
    min-height: 14px;
    text-align: center;

    margin-right: 0.4rem;
  }

  .discount li .item {
    background-color: white;
    font-size: 10px;
    color: #f5a623;
    border-radius: 4.2px;
    overflow: hidden;
    padding: 3px 5px;
  }

  .discount i {
    background: url("../assets/img/return01-blue@2x.png") no-repeat;
    transform: rotate(-90deg);
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-size: 70%;
    background-position-y: 50%;
    background-position-x: 50%;
    padding-top: 20px;
  }

  .seckill-box .title {
    height: 23px;
    line-height: 23px;
    color: #ff668c;
    font-size: 18px;
  }

  .seckill-box .time {
    height: 16px;
    padding: 2px 8px;
    /* background:linear-gradient(90deg,rgba(255,143,191,1) 0%,rgba(255,87,139,1) 100%); */
    background-color: #fff4f9;
    border-radius: 18px;
    border: 1px solid rgba(255, 102, 140, 1);
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 102, 140, 1);
    line-height: 14px;
  }

  .seckill-box .line-box {
    width: 67px;
    height: 3px;
    background: rgba(245, 245, 248, 1);
    border-radius: 4px;
    overflow: hidden;
    margin-right: 5px;
  }

  .seckill-box .div1 {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .seckill-box .div2-b {
    margin-bottom: 15px;
  }
  .seckill-box .line-bar {
    width: 0%;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(255, 143, 191, 1) 0%,
      rgba(255, 87, 139, 1) 100%
    );
    border-radius: 4px;
    padding: 0px;
    position: relative;
  }

  .seckill-box .line {
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%) scale(1, 0.5);
    height: 1px;
    background-color: #999999;
    width: 100%;
    line-height: 1px;
    min-height: 1px;
  }

  .seckill-box .title3 {
    display: inline;
    position: relative;
    color: #999999;
    font-size: 13px;
    padding: 0px 4px;
  }

  .seckill-box .title2 {
    color: #999999;
    font-size: 13px;
  }
}

.div_f5 {
  width: 100%;
  height: 10px;
  background: #f5.3f5;
}

.mint-swipe {
  width: 100%;
  height: 375px;

  .mint-swipe-item {
    width: 100%;
    height: 100%;
    line-height: 300px;
    text-align: center;
    background: #ccc;
    color: #000;
    font-size: 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .mint-swipe-indicator {
    background: #fff;
    margin-right: 5px;

    &.is-active {
      background: #ff668c;
      opacity: 1;
    }
  }
}

.ware {
  padding: 0 12px;

  p {
    color: #333;
    font-size: 20px;
    min-height: 24px;
    line-height: 24px;
    padding: 13px 0 3px;
  }

  .intro {
    font-size: 16px;
    line-height: 22px;
    color: #999;
  }

  .ware-price {
    height: 23px;
    line-height: 23px;
    color: #ff668c;
    font-size: 18px;
    padding: 5px 0 15px;

    span {
      font-size: 16px;
    }
  }

  .ware-mail {
    font-size: 13px;
    height: 15px;
    line-height: 15px;
    padding-bottom: 14px;
    display: none;

    em:nth-of-type(1) {
      float: left;
      color: #999;
    }

    em:nth-of-type(2) {
      float: right;
      color: #999;
    }
  }
}

.ware-content {
  .title {
    height: 40px;
    background: #f5.3f8;

    div {
      width: 112px;
      height: 40px;
      margin: 0 auto;
      overflow: hidden;
    }

    span:nth-of-type(1) {
      width: 23px;
      height: 1px;
      background: #818dcf;
      opacity: 0.2;
      float: left;
      margin-top: 19px;
      margin-right: 4px;
    }

    span:nth-of-type(2) {
      height: 40px;
      line-height: 40px;
      float: left;
      font-size: 14px;
      color: #999;
      text-align: center;
      margin-right: 4px;
    }

    span:nth-of-type(3) {
      width: 23px;
      height: 1px;
      background: #818dcf;
      opacity: 0.2;
      float: left;
      margin-top: 19px;
    }
  }

  .ware-info {
    padding: 0px 0 10px;
    color: #666;
    word-wrap: break-word;

    img {
      width: 100%;
    }
  }
}

.shop-bar {
  width: 100%;
  height: 50px;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: -webkit-flex;

  &.seckillType {
    div {
      width: 50%;
    }
  }

  .small-bar {
    span {
      width: 24px;
      height: 23px;
      display: block;
      margin: 0 auto;
      margin-top: 6px;
      position: relative;
    }

    em {
      width: 100%;
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      text-align: center;
      color: #999;
      margin-top: 4px;
      display: block;
    }
  }

  .service {
    width: 49px;
    border-right: 1px solid rgba(129, 141, 207, 0.2);
    border-top: 1px solid rgba(129, 141, 207, 0.2);

    span {
      width: 19px;
      background: url(../assets/images/kefu_icon.png) left top no-repeat;
      background-size: 100%;
    }
  }

  .cart {
    width: 49px;
    border-right: 1px solid rgba(129, 141, 207, 0.2);
    border-top: 1px solid rgba(129, 141, 207, 0.2);

    span {
      background: url(../assets/images/shop_cart.png) left top no-repeat;
      background-size: 100%;

      i {
        width: 14px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        background-color: rgb(245, 84, 73, 0.9);
        opacity: 0.9;
        font-size: 10px;
        color: #fff;
        position: absolute;
        right: -4px;
        top: -4px;
        border-radius: 50%;
      }
    }
  }

  .shop {
    -webkit-flex: 1.5;
    text-align: center;
    line-height: 50px;
    background: #ff668c;
    font-size: 17px;
    border-top: 1px solid #ff668c;
    color: #fff;
  }

  .join {
    -webkit-flex: 1.5;
    text-align: center;
    line-height: 50px;
    color: #666;
    font-size: 17px;
    border-top: 1px solid rgba(129, 141, 207, 0.2);
  }
}

.iphoneX-shop-bar {
  height: 60px;

  .small-bar {
    padding-bottom: 10px;

    .service {
      width: 66px;
    }

    .cart {
      width: 66px;
    }
  }
}

.mint-popup-bottom {
  width: 100%;
  opacity: 1;
  left: 0 !important;
  -webkit-transform: translate3d(0, 0, 0) !important;
  transform: translate3d(0, 0, 0) !important;

  .to-bug {
    padding: 0 12px;
    position: relative;

    .info {
      height: 75px;
      position: relative;

      .img-box {
        width: 86px;
        height: 86px;
        background: #fff;
        // border-radius:8px;
        position: absolute;
        left: 0;
        top: -23px;
      }

      img {
        width: 80px;
        height: 80px;
        // border-radius:8px;
        border: solid 3px #fff;
      }
    }

    .design {
      padding-left: 100px;
      padding-top: 13px;

      span {
        display: block;
      }

      span:nth-of-type(1) {
        color: #ff668c;
        font-size: 16px;
        line-height: 18px;
        line-height: 18px;

        em {
          font-size: 12px;
        }
      }

      span:nth-of-type(2) {
        color: #999;
        font-size: 13px;
        line-height: 16px;
        line-height: 16px;
        padding-top: 9px;
      }
    }

    .close {
      width: 15px;
      height: 15px;
      background: url(../assets/images/close-color.png) left top no-repeat;
      background-size: 100%;
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 2;
    }

    .choice-color {
      span {
        color: #333;
        font-size: 14px;
        height: 16px;
        line-height: 16px;
        padding: 19px 0 14px 0;
        display: block;
      }

      .pattern {
        padding-bottom: 18px;

        a {
          margin-top: 18px;
          padding: 3px 10px;
          color: #818dcf;
          font-size: 13px;
          border: solid 1px rgba(129, 141, 207, 0.7);
          border-radius: 5px;
          float: left;
          margin-right: 5px;
          background: #fff;

          &.active {
            border: solid 1px #ff668c;
            background: #ff668c;
            color: #fff;
          }

          &.lack {
            background: #e0e0e0;
            color: #fff;
            border: solid 1px #e0e0e0;
          }
        }
      }
    }

    .choice-number {
      padding: 20px 0;

      span {
        height: 21px;
        line-height: 21px;
        color: #999;
        font-size: 14px;
        float: left;
      }

      .number {
        width: 127px;
        float: right;

        em {
          width: 21px;
          height: 21px;

          &.reduce {
            float: left;
            background: url(../assets/images/jian_s_icon.png) left top no-repeat;
            background-size: 100%;
          }

          &.increase {
            float: right;
            background: url(../assets/images/jia_s_icon.png) left top no-repeat;
            background-size: 100%;
          }
        }

        span {
          width: 85px;
          height: 21px;
          line-height: 21px;
          font-size: 14px;
          color: #333;
          text-align: center;
          float: left;
        }
      }
    }
  }
}
</style>
<template>
  <div class="shopDetailContainer" :class="{shopDetailContainerActiveClass : popupVisible}">
    <div :style="popupVisible? shopDetailContainerActive: windowScrollTopFn()">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item,index) in tabImgSrc" :key="index">
          <div  class="mt-swipe-img" :style="{'background-image':'url('+item+')' }"></div>
        </mt-swipe-item>
      </mt-swipe>
      <div class="ware">
        <p>{{ ware.title }}</p>
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
        <div class="title clearfix">
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
        :class="[{'iphoneX-shop-bar': isiPhoneX}, !seckillType ? 'seckillType' : '']"
      >
        <div class="service small-bar" @click="openIm">
          <span></span>
          <em>客服</em>
        </div>

        <!-- <div class="cart small-bar" style="border-right:0px;" v-if="!seckillType"> -->
        <!-- <span>
            <i v-if="shopCarNumber">{{ shopCarNumber }}</i>
          </span>
        <em>购物车</em>-->
        <!-- </div>

        <div class :style="{'width':'49px'}" v-if="seckillType"></div>

        <div class="join" v-show="!seckillType"></div>-->

        <!-- <div class="join"></div> -->
        <!-- <div class="join" v-if="seckillType"></div> -->
        <div class="shop" @click="toBuy('buyNow')">立即购买</div>
      </div>

      <!-- 秒杀底部样式修改 -->
      <div
        class="shop-bar"
        v-if="!downHxsShow && seckillType"
        :class="{'iphoneX-shop-bar': isiPhoneX}"
      >
        <div class="service small-bar" @click="openIm" style="width:50%;">
          <span></span>
          <em>客服</em>
        </div>
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
                已选{{ ware.wareInfo[wareIndex].propertys }}{{
                wareNumber }}
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
                v-for="(childItem, childIndex) in propertiesMap[parentIndex].list"
                @touchstart="selected(childIndex, parentIndex, item.key)"
                :class="{active: childItem.value == produceText[parentIndex][item.key], lack: childItem.stock == '0'}"
              >
                {{
                childItem.name }}
              </a>
            </div>
            <div class="border-soild"></div>
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
                <span style="width: auto;" v-if="data.is_receive==false">{{ data.coupon_amount }}</span>
                <span
                  v-else-if="data.is_receive==true"
                  style="color:#333333;width: auto;"
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
                <span class="flex-item">
                  <h5>{{ data.usage_rules }}</h5>
                  <h5>{{ data.start_time }}-{{ data.end_time }}</h5>
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
import { Toast, Popup } from 'mint-ui'
import axios from 'axios'
import downToLinkedMe from '@/components/downToLinkedMe'
import popupDownHxsLinkedMe from '@/components/popupDownHxsLinkedMe'
import common from '@/util/common.js'

export default {
  name: 'showDetail',
  data() {
    return {
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
      buyProduceText: [], //选择的立即购买商品参数
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
      defaultIndex: 1,
    }
  },
  components: {
    downToLinkedMe: downToLinkedMe,
    popupDownHxsLinkedMe: popupDownHxsLinkedMe
  },
  mounted() {
    console.log('mounted')
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
    this.getGoodsList()
  },
  methods: {
    // 判断是否下架 false 下架 true 上架
    _isOn() {
      const _arr = this.ware.wareInfo
      if (_arr && _arr.length) return true
      return false
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
            common.config.prefixUrl + 'newShopDetail/' + wareType,
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
    selected(index, parentIndex, key) {
      console.log(this.produceText)
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
    getTestData(OrderDetail) {
      //监控的数据
      if (!this.sessToken || this.sessToken.length < 5) return
      var _this = this;
      axios
        .get('https://api.hxsapp.com/mall/Order/addOrderLog', {
          params: {
            sess_token: this.sessToken,
            utime: common.getUrlParam('utime'),
            sign: common.getUrlParam('sign'),
            client: 1,
            OrderDetail: OrderDetail,
          }
        })
        .then(res => {
          debugger;
          console.log(res)
        })
    },
    submit() {
      var _this = this

      if (!this.isShopCarWare) {
        //判断是否有足够的绿豆
        if (!this.enougBean) {
          // $('.mint-toast').css({
          // 	'z-index':'4000'
          // })

          Toast({
            message: '绿豆不足',
            duration: 1000
          })
          return
        }

        //埋点
        common.buriedPoint({
          access_occurred_type: 220610, //发生访问的【页面】类型
          access_occurred_type_id: _this.ware.wareInfo.length && _this.ware.wareInfo[0].id, //发生访问的【页面】类型ID
          previous_event_type_obj: '', //【事件】对象类型
          previous_event_type_obj_id: '', //【事件】对象类型ID
          previous_content_sort: '' //【事件】事件参数
        })

        //拼接buyCarproduceID参数格式 id=2@color-0_size-l
        const _LsWareInfoId = _this.ware.wareInfo.length ? _this.ware.wareInfo[0].id : ''
        let buyCarproduceID = 'id=' + _LsWareInfoId + '@'
        if (this.buyProduceText.length <= 0) {
          Toast({
            message: '网络出差了...',
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000)
          return false;
        }
        for (let i = 0; i < this.buyProduceText.length; i++) {
          for (var item in this.buyProduceText[i]) {
            buyCarproduceID += item + '-' + this.buyProduceText[i][item] + '_'
          }
        }

        buyCarproduceID = buyCarproduceID.substring(0, buyCarproduceID.length - 1)
        this.getTestData('[{"ProduceID":"' + buyCarproduceID + '","Quantity":' + this.mallNumber + '}]');
        //检查库存
        axios
          .get('https://api.hxsapp.com/mall/Order/checkStock', {
            params: {
              data: '[{"ProduceID":"' + buyCarproduceID + '","Quantity":' + this.mallNumber + '}]',
              sess_token: this.sessToken
            }
          })
          .then(res => {
            if (res.data.code == '625') {
              //库存不足
              // $('.mint-toast').css({
              // 	'z-index':'4000'
              // })
              Toast({
                message: res.data.msg,
                duration: 1000
              })
              return
            } else {
              this.popupVisible = false
              setTimeout(() => {
                window.location.href =
                  'https://hxsapp_order_info#[{"ProduceID":"' +
                  buyCarproduceID +
                  '","Quantity":' +
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

      if (!_this.noAttrBoolean) {
        Toast('商品补货中，暂不支持购买')
        return
      }

      if (this.isOutStock) return false
      if (this.sessToken < 5 || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)) {
        window.location.href = 'https://hxsapp_showloginpage'
        return
      }

      //判断点击购物车还是直接购买

      if (key == 'buyNow') {
        this.isShopCarWare = false
        this.wareNumber = this.mallNumber
        this.wareIndex = this.patternIndex
        this.produceText = null
        if (this.buyProduceText.length <= 0) {
          for (let i = 0; i < this.propertiesMap.length; i++) {
            let key = this.propertiesMap[i].key
            let value = this.propertiesMap[i].list.length && this.propertiesMap[i].list[0].value
            var json = {}
            json[key] = value
            _this.buyProduceText.splice(i, 0, json)
          }
        }
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
        this.wareNumber = this.beforeShopCarNumber
        this.wareIndex = this.shopPatternIndex
        this.shopCarproduceID = this.ware.wareInfo[this.shopPatternIndex].id

        this.produceText = null
        if (this.shopProduceText.length <= 0) {
          for (let i = 0; i < this.propertiesMap.length; i++) {
            let key = this.propertiesMap[i].key
            let value = this.propertiesMap[i].list.length && this.propertiesMap[i].list[0].value
            var json = {}
            json[key] = value
            _this.shopProduceText.splice(i, 0, json)
          }
        }
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

      var _this = this
      if (this.sessToken.length < 5 || (window.location.href.indexOf('sess_token') != -1 && !this.sessToken)) {
        common.h5CallAppAction.hxsapp_showloginpage()
        return
      }

      //拼接ProduceID参数格式 id=2@color-0_size-l
      const _LsWareInfoId2 = _this.ware.wareInfo.length ? _this.ware.wareInfo[0].id : ''
      let shopCarproduceID = 'id=' + _LsWareInfoId2 + '@'
      if (this.shopProduceText.length <= 0) {
        Toast({
          message: '网络出差了...',
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000)
        return false;
      }
      for (let i = 0; i < this.shopProduceText.length; i++) {
        for (var item in this.shopProduceText[i]) {
          shopCarproduceID += item + '-' + this.shopProduceText[i][item] + '_'
        }
      }
      shopCarproduceID = shopCarproduceID.substring(0, shopCarproduceID.length - 1)
      this.getTestData('[{"ProduceID":"' + shopCarproduceID + '","Quantity":' + this.beforeShopCarNumber + '}]');
      //检查库存
      axios
        .get('https://api.hxsapp.com/mall/Order/checkStock', {
          params: {
            data: '[{"ProduceID":"' + shopCarproduceID + '","Quantity":' + this.beforeShopCarNumber + '}]',
            sess_token: this.sessToken
          }
        })
        .then(res => {
          if (res.data.code == '625') {
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

      //提交购物车接口
      axios
        .get('https://api.hxsapp.com/mall/Cart/addCart', {
          params: {
            sess_token: this.sessToken,
            ProduceID: shopCarproduceID,
            Quantity: this.beforeShopCarNumber
          }
        })
        .then(res => {
          console.log(res)
          //成功加入购物车

          // $('.mint-toast').css({
          // 	'z-index':'4000'
          // })

          if (res.data.code == 200) {
            Toast({
              message: res.data.data.result,
              duration: 1000
            })
            this.shopCarNumber = res.data.data.cartNum
            this.popupVisible = false
          } else if (res.data.code == '625') {
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
        .get('https://api.hxsapp.com/mall/Cart/getCartNum', {
          params: {
            sess_token: this.sessToken
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 200) this.shopCarNumber = res.data.data.cartNum
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
  }
}
</script>
<style lang="less">
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
<style lang="less">
  .mt-swipe-img{
    height:inherit;background-position:50% 50%;background-size:cover;background-repeat:no-repeat;

  }
.shopDetailContainer {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;

  &.shopDetailContainerActiveClass {
    position: absolute;
    height: 100%;
    overflow: hidden;
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
    margin-right: 0.1rem;
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
    padding: 0 0 10px;
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
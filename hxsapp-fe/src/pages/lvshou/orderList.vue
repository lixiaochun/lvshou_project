<template>
  <div id="lvshouOrderList">
    <p v-if='0' v-for="data in 1" :key="data">
      dfdjfdfj<br />
    loadTip={{loadTip}}<br />
    </p>

    <!-- 头部 -->
    <div class="tabBox">
      <div class="li" v-for="(data,index) in orderTypeTab" 
        :key="index" :class=" orderTypeTabIndex == index ? ( index == 0 ? 'active on':'on' ) : ( index == 0 ? 'active ':'' ) " 
        @click.stop="clickTab(data,index)">
        {{data}}
      </div>
    </div>
    <!-- 头部结束 -->
    
    <div class="change-background"></div>
    <!--
    orderTypeTabIndex = {{orderTypeTabIndex}}
    -->

    <!-- 列表区域部分 -->
      <div class="scrollLoading" 
      v-infinite-scroll="loadMore" 
      :infinite-scroll-disabled="loading" 
      infinite-scroll-distance="0" 
      infinite-scroll-immediate-check="true" v-if="hasOrderData">

        <div :id="'OrderNo_'+item.OrderNo" v-for="(item,index1) in orderList" :key="index1">
          <div class="listBox" v-if="item.OrderDetail && item.OrderDetail.length > 0 ">
            
            <!-- 订单信息区域  -->
            <div class="orderInfo">
              <span class="orderNumber">
                订单编号：
                {{item.OrderNo}}
              </span>
              <span class="orderStatus">
                {{item.OrderStatusCode}}
              </span>
            </div>
            <!--
            item.OrderStatus ＝ {{item.OrderStatus}}<br />
            item.OrderStatusCode ＝ {{item.OrderStatusCode}}<br />
            -->

            <!-- 商品列表信息区域  -->
            <div class="listInfo" v-if="item.OrderDetail && item.OrderDetail.length > 0 ">
              <div class="list" 
              v-for="(item2,index2) in item.OrderDetail" 
              :key="index2">
                <img v-if="item2.ImgList" :src="item2.ImgList" @click="goDetailPage(item.OrderNo)" />
                <div class="goodText">
                  <span class="goodTitle">
                    {{item2.Model}}
                  </span>

                  <span class="goodNumber">
                    x {{item2.Amount}}
                  </span>
                  <br />
                  {{item.Address}}

                </div>
              </div>
            </div>

            <!-- 订单按钮操作区域  -->
            <div class="doHandleInfo" v-if="item.OrderDetail && item.OrderDetail.length > 0 ">
              <div class="moneyBox">
                总共 {{item.Quantity}} 件
                <span class="money">
                  ¥
                </span>
                <span class="moneyNumber">
                  {{item.Amount}}
                </span>
              </div>

              <div class="handleBox">
              <!--
                0全部、1未付款、2待收货、3待发货 、 4 已关闭 、 5 已完成 （请注意顺序）
              -->

                <div v-if="item.OrderStatus == 1" >
                  <span class="handleTip" @click="cancelOrder(item.OrderNo)">
                    取消订单
                  </span>
                  <span class="handleBold" @click="payBtn(item.OrderNo)">
                    付款
                  </span>
                </div>
                <div v-if="item.OrderStatus == 2 || item.OrderStatus == 3" >
                  <span class="handleTip" @click="getExpress(item.OrderNo)">
                    查看物流
                  </span>
                </div>

                <div v-if="item.OrderStatus == 4" >

                </div>

                <div v-if="item.OrderStatus == 5" >
                  <span class="handleTip" @click="evaluatePage(item.OrderNo)">
                    评价
                  </span>
                </div>

              </div>  

            </div>

          </div>
          <div class="change-background" v-if="item.OrderDetail && item.OrderDetail.length > 0 " ></div>
        </div>

      </div>


    <div class="init_no_text" v-if="!hasOrderData">
      <div class="no_pinlun">
        暂无此类订单
      </div>
    </div>

    <div class="loadTip" v-if="loadTip">{{ loadTipText[loadTipTextIndex] }}</div>
    <!-- 列表区域部分结束 -->
    
    <!-- 弹出框切换订单用的 部分 -->
    <div class="popupChangeOrder" v-if="isPopupChangeOrder">
      <div class="share-down" >
        <div class="bg" @click="cancelBtn()"></div>
        <div class="share-cont">
          <span v-for="(data,index) in orderName" 
          :key="index" :class=" orderNameIndex == index ? 'on' :'' " 
          @click="popupChangeOrder(data,index)">
          {{data}}订单
          </span>
        </div>
      </div>
    </div>

    <preLoading v-if="isPreLoading">
    </preLoading>

  </div>
</template>

<script>

import axios from 'axios'
import { Toast,MessageBox } from 'mint-ui'
import commonJs from '@/util/common.js'

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
  name: 'lvshouOrderList',
  data() {
    return {

      // 是否订单数据，默认有订单
      hasOrderData:true,
      
      //是否使用下滑加载
      loading: true,

      // 滚动加载后端接口使用的参数lastId
      lastId: null,

      // 是否显示加载中的提示文案
      loadTip: false, //下滑加载提示
      loadTipText: ['正在加载中...','没有更多动态了'], //下拉加载或加载完提示,
      loadTipTextIndex:0,//下拉加载提示文本的下标

      isFirst: true, //是否是第一次加载
      
      resultLoading: true,//每次下拉加载完毕才可以加载下一次

      // 是否显示弹出框的切换订单
      isPopupChangeOrder:false,

      // tab默认数据
      // 0全部、1未付款、2待收货、3待发货 、 4 已关闭 、 5 已完成 （请注意顺序）
      orderTypeTab: {
        "0":"全部",
        "1":"待支付",
        "3":"待发货",
        "2":"待收货",
        // "4":"已关闭",
        "5":"已完成"
      },
      // 弹出框的tab默认数据
      orderName:{
        "all":"全部",
        "lv":"绿瘦",
        "hxs":"App"  
      },
      // 弹出框的tab默认选择索引
      orderNameIndex:'all',

      // 当前tab的选择的索引
      orderTypeTabIndex:'',

      // 列表数据  
      orderList:[],

      // 判断loadding和文章删除的场景
			isPreLoading:true
    }
  },
  computed: {
		isLogin: function() {
			return commonJs.isLogin()
		},
		isApp: function() {
			return commonJs.isApp()
		}
	},
  components: {
		preLoading
	},
  mounted(){
    // 处理异常的情况
    if (this.$route.query && this.$route.query.orderType ){
      if( this.$route.query.orderType <= 4 && this.$route.query.orderType >= 0 ) {
        this.orderTypeTabIndex = this.$route.query && this.$route.query.orderType ? this.$route.query.orderType : "0";
      }else{
        this.orderTypeTabIndex = "0";
      }
    }else{
      this.orderTypeTabIndex = "0";
    }

    document.title = this.orderTypeTab[ this.orderTypeTabIndex ] +"订单"; 

    this.getOrderList("initTabPage");
  },
  methods:{
    loadMore(){
      console.log("scrollHandler-dosomething")
      // if (this.loading) {
      //   return
      // }
      this.getOrderList('scrollLoadData')
    },
    goDetailPage(orderNo){
      alert("去详情的页面去")
    },
    // 切换弹出框的订单操作业务
    popupChangeOrder(data,index){

      this.orderNameIndex = index;

      var name = this.orderName[ this.orderNameIndex ]
      document.title = name +"订单";
      
      if( data == this.orderTypeTab['0'] ){
        console.log("点击和之前一样的订单选择，不处理切换订单的ajax逻辑")  
        // 取消
        this.cancelBtn()
      }else{
        // 取消
        this.cancelBtn()

        this.orderTypeTab['0'] = name;
        
        this.getOrderList('clickTabPage')
      }
      
      
      // debugger
      // 清除上次的选择状态，根据模态框之前的状态去选择
      // if( this.orderTypeTab['0'] == "全部" ){
      //   this.orderNameIndex = 'all';
      // }else if( this.orderTypeTab['0'] == "绿瘦" ){
      //   this.orderNameIndex = 'lv';
      // }else if( this.orderTypeTab['0'] == "好享瘦" ){
      //   this.orderNameIndex = 'hxs';
      // }


    },

    // 点击取消阴影部分的逻辑
    cancelBtn(){
      $("body").removeAttr("style");
      this.isPopupChangeOrder = false;
    },
    // 点击头部tab的点击处理
    clickTab(data,index){
      console.log(data,index)

      if(index == 0){
        if( this.orderTypeTabIndex == 0 ){
          console.log("全部按钮是选中状态的时候，点击他，弹出选择框来切换订单类型按钮")
          
          $("body").css({
            height: "100%",
            overflow: "hidden"
          });

          this.isPopupChangeOrder = true;
        }else{
          this.orderTypeTabIndex = index;
          document.title = data +"订单"; 

          this.getOrderList('clickTabPage')
        }
      }else{
        if( this.orderTypeTabIndex == index ){
          console.log("点击了当前选中状态的tab，这里不加载数据")
          Toast({
            message:  "点击了当前选中状态的tab，这里不加载数据",
            duration: 1000
          });
        } else{
          
          this.orderTypeTabIndex = index;
          document.title = data +"订单"; 

          this.getOrderList('clickTabPage')
        }
      }
        
    },
    getOrderList(doEvent = 'other'){
      
      console.log('getOrderList... ' + new Date());

      // doEvent 的状态
      // initTabPage 初始化加载tab数据行为
      // scrollLoadData 滚动加载数据行为
      // clickTabPage 点击头部tab的加载数据行为


      //判断是否加载中 如果是 ，则阻止加载；否则加载
      if( !this.resultLoading ){
        return;
      }else{
        this.resultLoading = false;
      }

      // 切换tab时候 重置部分数据
      if( doEvent == "clickTabPage" ){
        this.loadTip = false;
        Toast({
          message:  document.title +',加载中!',
          duration: 1500
        });
        this.orderList = [];
      }
      
      if( doEvent == "scrollLoadData" ){
        Toast({
          message:  '加载数据中，请稍候!',
          duration: 1500
        });
      }

      setTimeout( () => {
        // 第一次加载
        if(this.isFirst) {
          this.isPreLoading = false;
        }
        
        // mock数据
        var _a = {
            "Orders_ID": "aea84cfa-852c-45a3-9c8a-e8a27e8272dc",
            "OrderNo": "220171012105159514",
            "NewOrderNo": null,
            "Amount": "99",
            "OrderStatus": 1,
            "PayMode": "未支付",
            "Customer_ID": "619a10e0-1a05-4d88-8d66-8dd1bde25af8",
            "Receiver": "梁木勇",
            "Mobile": "15817148601",
            "OrderDate": "2017-10-12 10:51:59",
            "UpdateDate": "2017-10-12 10:51:59",
            "OrderDetail": [
                {
                    "Produce_ID": "7fb28646-ce97-42b4-b10a-3c2ead9dca78",
                    "Model": "LV SHOU 智能体脂秤 健康瘦身管家",
                    "ImgList": "https://image-hxsmall.hxsapp.com/Images/Productlist/201709091520565428342.jpg",
                    "Propertys": "颜色随机发货",
                    "Quantity": 1,
                    "Amount": "99"
                }
            ],
            "Address": "广东省广州市荔湾区绿瘦产业园",
            "OrderStatusCode": "待支付",
            "Quantity": 1
        };
        _a.Address = "mock:"+Math.random();

        // 后端的mock数据的数组长度
        var data = 3;

        // 接口有返回数据 200 
        if( 200 ){
          
          // 接口数组数据 有数据 > 0 
          if( data > 0 ){
            
            this.orderList.push(_a)
            this.orderList.push(_a)
            this.orderList.push(_a)
            
            //加载个数超过10个显示加载更多
            if( data >= 3 ){
              this.loadTip = true;
            }

            //进入这里有动态
            this.isFirst = false;

          }else{
          // 接口数组数据 有数据 <= 0
          
            this.loading = true;
            this.loadTipTextIndex = data <= 3 ? 1 : 0;

            //第一次加载没有订单
            if(this.isFirst) {
              this.hasOrderData = false
            };

          }
        
        }

        this.resultLoading = true

      }, 2000)
    },

    // 取消订单的操作
    cancelOrder(orderNo){
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        closeOnClickModal:false,
        showCancelButton: true
      }).then(action => {
        if(action == "confirm"){
          alert("点击了取消订单的确认按钮，ajax后端接口")
          Toast("删除订单成功")
          // https://api.hxsapp.com/mall/Order/cancelOrder
          // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=7342708
        }else{
          console.log("点击了取消订单的取消按钮")
        }
      });
    },
    payBtn(No){
      alert("调用app的新协议，挂起支付既可，看看他们是会有支付成功的回调函数给我，不给没发更新页面")
      // https://api.hxsapp.com/mall/Order/getExpress
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=7342674
    },
    getExpress(No){
      alert("获取物流信息，这里利用app新开一个页面窗口，然后ajax获取订单信息")
      // https://api.hxsapp.com/mall/Order/getExpress
      // http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=7342674
    },
    evaluatePage(){
      alert("调用发记封装的组件页面，这里利用app新开一个页面窗口，然后ajax评价订单信息")
    }
     
  },
  beforeDestroy(){
   document.title = commonJs.config.webTitle; 
  }
}

window.testdata = {
    "data": [
        {
            "Orders_ID": "aea84cfa-852c-45a3-9c8a-e8a27e8272dc",
            "OrderNo": "220171012105159514",
            "NewOrderNo": null,
            "Amount": "99",
            "OrderStatus": 1,
            "PayMode": "未支付",
            "Customer_ID": "619a10e0-1a05-4d88-8d66-8dd1bde25af8",
            "Receiver": "梁木勇",
            "Mobile": "15817148601",
            "OrderDate": "2017-10-12 10:51:59",
            "UpdateDate": "2017-10-12 10:51:59",
            "OrderDetail": [
                {
                    "Produce_ID": "7fb28646-ce97-42b4-b10a-3c2ead9dca78",
                    "Model": "LV SHOU 智能体脂秤 健康瘦身管家",
                    "ImgList": "https://image-hxsmall.hxsapp.com/Images/Productlist/201709091520565428342.jpg",
                    "Propertys": "颜色随机发货",
                    "Quantity": 1,
                    "Amount": "99"
                }
            ],
            "Address": "广东省广州市荔湾区绿瘦产业园",
            "OrderStatusCode": "待支付",
            "Quantity": 1
        },
        {
            "Orders_ID": "bafe552c-52eb-4aae-834c-96700997335a",
            "OrderNo": "120171010143413998",
            "NewOrderNo": null,
            "Amount": "29",
            "OrderStatus": 3,
            "PayMode": "已支付",
            "Customer_ID": "619a10e0-1a05-4d88-8d66-8dd1bde25af8",
            "Receiver": "?",
            "Mobile": "18617365670",
            "OrderDate": "2017-10-10 14:34:13",
            "UpdateDate": "2017-10-12 11:06:28",
            "OrderDetail": [
                {
                    "Produce_ID": "2caa3e41-ec0b-41e4-a1f9-bddfc25648d0",
                    "Model": "荷叶茶4盒装",
                    "ImgList": "https://image-hxsmall.hxsapp.com/Images/Productlist/201709071737388563237.jpg",
                    "Propertys": "4盒装",
                    "Quantity": 1,
                    "Amount": "29"
                }
            ],
            "Address": "??СӪ",
            "OrderStatusCode": "待发货",
            "Quantity": 2
        },
        {
            "Orders_ID": "6f18ad4c-d434-4fca-a45b-a042ec601462",
            "OrderNo": "120171010143350174",
            "NewOrderNo": null,
            "Amount": "0",
            "OrderStatus": 2,
            "PayMode": "已支付",
            "Customer_ID": "619a10e0-1a05-4d88-8d66-8dd1bde25af8",
            "Receiver": null,
            "Mobile": "18617365670",
            "OrderDate": "2017-10-10 14:33:50",
            "UpdateDate": "2017-10-12 11:06:28",
            "OrderDetail": [
                {
                  "Produce_ID": "031983c5-7258-4f45-bc38-dba0bd5a39b2",
                  "Model": "LV SHOU 智能手环 感知你的每一步",
                  "ImgList": "https://image-hxsmall.hxsapp.com/Images/Productlist/201709011518553223237.jpg",
                  "Propertys": "黑色",
                  "Quantity": 1,
                  "Amount": "169"
                }
            ],
            "Address": "广东省广州市荔湾区切。。经营不善用",
            "OrderStatusCode": "待收货",
            "Quantity": 2
        },
        {
            "Orders_ID": "0733a07e-20f1-48ed-a5be-84e6cbb65013",
            "OrderNo": "120170929141957592",
            "NewOrderNo": null,
            "Amount": "169",
            "OrderStatus": 4,
            "PayMode": "未支付",
            "Customer_ID": "619a10e0-1a05-4d88-8d66-8dd1bde25af8",
            "Receiver": "梁木勇",
            "Mobile": "15817148601",
            "OrderDate": "2017-09-29 14:19:57",
            "UpdateDate": "2017-10-12 11:06:29",
            "OrderDetail": [
                {
                    "Produce_ID": "031983c5-7258-4f45-bc38-dba0bd5a39b2",
                    "Model": "LV SHOU 智能手环 感知你的每一步",
                    "ImgList": "https://image-hxsmall.hxsapp.com/Images/Productlist/201709011518553223237.jpg",
                    "Propertys": "黑色",
                    "Quantity": 1,
                    "Amount": "169"
                }
            ],
            "Address": "广州市荔湾区绿瘦产业园",
            "OrderStatusCode": "已关闭",
            "Quantity": 15
        },
        {
            "Orders_ID": "0733a07e-20f1-48ed-a5be-84e6cbb65013",
            "OrderNo": "120170929141957592",
            "NewOrderNo": null,
            "Amount": "169",
            "OrderStatus": 5,
            "PayMode": "已支付",
            "Customer_ID": "619a10e0-1a05-4d88-8d66-8dd1bde25af8",
            "Receiver": "梁木勇",
            "Mobile": "15817148601",
            "OrderDate": "2017-09-29 14:19:57",
            "UpdateDate": "2017-10-12 11:06:29",
            "OrderDetail": [
                {
                    "Produce_ID": "031983c5-7258-4f45-bc38-dba0bd5a39b2",
                    "Model": "LV SHOU 智能手环 感知你的每一步",
                    "ImgList": "https://image-hxsmall.hxsapp.com/Images/Productlist/201709011518553223237.jpg",
                    "Propertys": "黑色",
                    "Quantity": 1,
                    "Amount": "169"
                }
            ],
            "Address": "广州市荔湾区绿瘦产业园",
            "OrderStatusCode": "已完成",
            "Quantity": 15
        }
    ],
    "code": "200",
    "msg": ""
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


#lvshouOrderList{
  // margin: 0 auto;
  // text-align: center;
  width: 100%;
  
  // 弹出层切换订单
  .popupChangeOrder {

    .share-down {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9999;
    }
    .share-down .bg {
      width: 100%;
      height: 100%;
      background: #333;
      opacity: 0.3;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10000;
    }

    .share-down .share-cont {
      width: 85px;
      height: 95px;
      padding-top:8px;
      position: absolute;
      left: 11px;
      top: 42px;
      background: url("./../../assets/lvshou/img/order_dialog@2x.png") -5px -5px no-repeat ;
      background-size: 95px 100px;

      z-index: 10001;
    }

    .share-down .share-cont span {
      display: block;
      width: 100%;
      font-size: 13px;
      height: 25px;
      line-height: 25px;
      color: #333;
      text-align: center;
    }
    .share-down .share-cont span.on {
      color: #818DCF;
    }

  }

  .change-background {
    width: 100%;
    height: 7px;
    background: #f5f5f8;
  }

  // 头部tab区域
  .tabBox{
    margin: 0 auto;
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    background: #FFFFFF;
    
    .li{
      float: left;
      width: 20%;
      position: relative;
      color: #333;
      
      &.active{
        &:before{
          position: absolute;
          top: 28px;
          left:50%;
          margin-left: 15px;
          height: 10px;
          width:10px;
          background: url("./../../assets/lvshou/img/order_icn@2x.png") left top no-repeat;
          background-size: 100% 100%;
          content: "";

        }
      }
      &.on{
        color: #FF668C;
        &:after {
          content: "";
          position: absolute;
          width:50px;
          height: 2px;
          background: #FF668C;
          top:38px;
          left:50%;
          margin-left: -25px;
        }
      }
    }
  }
  

  // .scrollLoading {
  //   height: 300px;
  //   width: 100%;
  //   margin: 0 auto;
  //   box-sizing: border-box;
  //   overflow-y: auto;
  //   -webkit-overflow-scrolling: touch;
  //   position: relative;
  // }

  .loadTip {
    height: 45px;
    line-height: 45px;
    font-size: 13px;
    text-align: center;
    color: #999;
    background: #f5f5f8;
  }


  .init_no_text {
    padding: 0 0 0 11px;
    margin-bottom: 19px;
    text-align: center;
    .no_pinlun{
      width: 240px;
      height: 140px;
      background: url(../../assets/images/quesheng_kong.png) 50% top no-repeat;
      background-size: 140px 140px;
      display: block;
      margin: 50px auto 0;
      position: relative;
      left: -11px;
      padding-top:150px;
    }
  }

  // 订单相关区域
  .listBox{
    padding: 0 16px 0 14px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;

    // 订单信息区域
    .orderInfo{
      height: 44px;
      width: 100%;
      line-height: 44px;
      font-size: 13px;
      overflow: hidden;
      border-bottom: 1px solid rgba(129,141,207,0.20);
      .orderNumber{
        float: left;
        display: inline-block;
        color: #999999;
      }  
      .orderStatus{
        float: right;
        display: inline-block;
        color: #FF668C;
      }
    }

    // 商品订单的列表区域
    .listInfo{
      width: 100%;
      padding:10px 0;
      .list{
        width: 100%;
        margin-bottom:15px; 
        height: 80px;
        position: relative;
        &:last-child{
          margin-bottom: 0;
        }
        img{
          width: 80px;
          height: 80px;
          display: block;
          position: absolute;
          top:0;
          left:0;
          z-index: 1;
        }
        .goodText{
          padding-left:92px;
          width: 100%;
          box-sizing: border-box;
          height: 90px;
          text-align: left;
          .goodTitle{
            display: block;
            height: 21px;
            font-size: 15px;
            color: #666;
            width: 100%;
            overflow: hidden;
          }
          .goodNumber{
            display: black;
            height: 15px;
            font-size: 11px;
            color: #999;
            width: 100%;
            overflow: hidden
          }
        }
      }
    }

    // 操作按钮事件区域
    .doHandleInfo{
      background: #FFFFFF;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid rgba(129,141,207,0.20);
      .moneyBox{
        float: left;
        font-size: 13px;
        color:#999;

        .money{
          color:#FF668C;
        }
        .moneyNumber{
          font-size: 17px;
          color:#FF668C;
        }
      }

      .handleBox{
        float: right;

        .handleTip,
        .handleBold{
          display: inline-block;
          background: #fff;
          color: #818DCF;
          border: 1px solid #818DCF;
          border-radius: 32px;
          padding: 3px 12px;
          height: 25px;
          line-height: 19px;
          box-sizing: border-box;
          font-size: 13px;
          margin-left:14px;
        }
        .handleBold{
          border: 1px solid #FF668C;
          background: #FF668C;
          color: #fff;
        }

      }
    }
  }
}
</style>

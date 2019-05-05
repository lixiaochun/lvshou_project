<template>
  <div id="lvshouOrderDetail" >
    <div v-if="orderDetail">

      <div class="addressBox">
        <img  src="https://img10.360buyimg.com/da/jfs/t13792/76/2553225335/85708/1fdcb73c/5a434610N72ec02cb.jpg" />
        <div class="addressInfo">
          <span class="name">
            {{orderDetail.Receiver}}
          </span>
          <span class="phone">
            {{orderDetail.Mobile}}
          </span>

          <p class="address">
            {{orderDetail.Address}}
          </p>
        </div>
      </div>
      <div class="change-background"></div>

      <div class="listBox">
        <!-- 订单信息区域  -->
        <div class="orderInfo">
          <span class="orderNumber">
            订单编号：
            {{orderDetail.OrderNo}}
          </span>
          <span class="orderStatus">
            {{orderDetail.OrderStatusCode}}
          </span>
        </div>

        <!-- 商品列表信息区域  -->
        <div class="listInfo">
          <div class="list" v-for="(item,index) in orderDetail.OrderDetail" :key="index">
            <img v-if="item.ImgList" :src="item.ImgList" />
            <div class="goodText">
              <span class="goodTitle">
                {{item.Model}}
              </span>
              <span class="goodNumber">
                x {{item.Amount}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="change-background h45">

        <div class="handleBox">
          <!--
            0全部、1未付款、2待收货、3待发货 、 4 已关闭 、 5 已完成 （请注意顺序）
          -->

          <div v-if="orderDetail.OrderStatus == 1" >
            <span class="handleTip" @click="cancelOrder(orderDetail.OrderNo)">
              取消订单
            </span>
            <span class="handleBold" @click="payBtn(orderDetail.OrderNo)">
              付款
            </span>
          </div>
          <div v-if="orderDetail.OrderStatus == 2 || orderDetail.OrderStatus == 3" >
            <span class="handleTip" @click="getExpress(orderDetail.OrderNo)">
              查看物流
            </span>
          </div>

          <div v-if="orderDetail.OrderStatus == 4" >

          </div>

          <div v-if="orderDetail.OrderStatus == 5" >
            <span class="handleTip" @click="shouHou()">
              售后
            </span>
            <span class="handleTip" @click="evaluatePage(orderDetail.OrderNo)">
              评价
            </span>
          </div>

        </div> 

        <div class="handleBox" v-if="0">
          <span class="handleTip" @click="shouHou()">
            售后
          </span>
          <span class="handleBold" @click="evaluatePage()">
            评价
          </span>
        </div>
      </div>

      <div class="change-background showBox">
        <div class="leftTitle">
          实际支付
        </div>
        <div class="rightText boldText">
          ¥ {{orderDetail.Amount}}
        </div>
      </div>
      
      <div class="change-background"></div>

      <div class="change-background showBox">
        <div class="leftTitle">
          下单时间
        </div>
        <div class="rightText">
          {{orderDetail.OrderDate}}
        </div>
      </div>

      <div class="change-background"></div>

      <div class="change-background showBox">
        <div class="handleBox">
          <span class="handleTip" @click="getExpress()">
            物流查询
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
import { Toast } from 'mint-ui';
import commonJs from '@/util/common.js'
// import { Indicator } from 'mint-ui';

// 初始化loadding的组件
import preLoading from "@/components/preLoading"

export default {
  name: 'lvshouOrderDetail',
  data() {
    return {
      // 显示选中列表
      orderDetail:null,
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
    setTimeout(()=>{

      this.isPreLoading = false;

      this.orderDetail = window.testdata1.data[0];

    },500)

  },
  methods:{
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
    shouHou(){
      alert("这里接入阿里百川的客服协议即可－to do")
    }
  }
}

window.testdata1 = {
    "data": [
        {
            "Orders_ID": "33462b38-9317-4d16-b50b-bb9ba368023a",
            "OrderNo": "15034527361503452778",
            "Amount": 299,
            "OrderStatus": 3,
            "PayMode": "支付宝支付",
            "Customer_ID": "2d29b93b-6920-4bba-b94f-d28f6e6aecea",
            "Receiver": "张三",
            "Mobile": "15817148601",
            "OrderDate": "2017-08-22 05:00:29",
            "UpdateDate": "2017-08-26 12:00:00",
            "OrderDetail": [
                {
                    "Produce_ID": "128abd05-92eb-4529-be59-0c5b5323f0e9",
                    "Model": "绿瘦玫瑰荷叶茶",
                    "ImgList": "https://img10.360buyimg.com/da/jfs/t13792/76/2553225335/85708/1fdcb73c/5a434610N72ec02cb.jpg",
                    "Propertys": null,
                    "Quantity": 1,
                    "Amount": "0"
                },
                {
                    "Produce_ID": "128abd05-92eb-4529-be59-0c5b5323f0e9",
                    "Model": "2绿瘦玫瑰荷叶茶",
                    "ImgList": "https://img10.360buyimg.com/da/jfs/t13792/76/2553225335/85708/1fdcb73c/5a434610N72ec02cb.jpg",
                    "Propertys": null,
                    "Quantity": 1,
                    "Amount": "0"
                },
                {
                    "Produce_ID": "128abd05-92eb-4529-be59-0c5b5323f0e9",
                    "Model": "3绿瘦玫瑰荷叶茶",
                    "ImgList": "https://img10.360buyimg.com/da/jfs/t13792/76/2553225335/85708/1fdcb73c/5a434610N72ec02cb.jpg",
                    "Propertys": null,
                    "Quantity": 1,
                    "Amount": "0"
                }
            ],
            "Address": "广东省广州市荔湾区花地大道南404号",
            "OrderStatusCode": "待发货",
            "Tags": "商品已打包，等待发货",
            "PostageType": "快递免邮"
        }
    ],
    "code": "200"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

#lvshouOrderDetail{
  
  .change-background {
    width: 100%;
    height: 7px;
    background: #f5f5f8;
    overflow: hidden;

    &.h45{
      height:45px;
      line-height: 45px;
    }
    &.showBox{
      height:45px;
      line-height: 45px;
      background: #FFFFFF;
      .leftTitle{
        font-size: 15px;
        color: #666666;
        float: left;
        padding-left: 14px;
      }

      .rightText{
        font-size: 15px;
        color: #999;
        float: right;
        padding-right: 17px;
        &.boldText{
          color: #FF668C;

        }
      }
    }
    
  }
  .addressBox{
    padding: 0 16px 0 14px;
    width: 100%;
    box-sizing: border-box;
    height: 80px;
    background: #fff;
    position: relative;
    img{
      width: 17px;
      height: 21px;
      display: block;
      position: absolute;
      top:30px;
      left:16px;
      z-index: 1;
    }
    .addressInfo{
      padding: 10px 0 0 30px;
      width: 100%;
      box-sizing: border-box;
      height: 80px;
      background: #fff;
      font-size: 15px;
      color: #333333;
      .name{
        display: inline-block;
      }
      .phone{
        padding-left:27px;
        display: inline-block;
      }
      .address{
        margin-top:5px;
        font-size: 13px;
        color: #666;
      }
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
        }
        .handleBold{
          border: 1px solid #FF668C;
          background: #FF668C;
          color: #fff;
        }

      }
    }
  }

  .handleBox{
    height: 45px;
    line-height: 45px;
    float: right;
    margin-right: 17px;
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
</style>

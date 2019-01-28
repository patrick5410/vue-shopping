<!--支付结果-->
<template>
  <div class="payResult-container">
    <div class="payResult-img">
      <!--支付成功-->
      <div v-if="$route.query.payResult == 'success'" class="pay-success">
        <div class="pay-result-tip">支付成功</div>
      </div>

      <!--支付失败-->
      <div v-else class="pay-fail">
        <div class="pay-result-tip">支付失败</div>
        <div class="pay-result-tip2">超时订单将关闭</div>
      </div>
    </div>

    <div class="order-info">
      <div class="order-info-left">
        <div>订单金额</div>
        <div>订单编号</div>
        <div>收货信息</div>
      </div>
      <div class="order-info-right">
        <div>{{ order.paymentAmount.toFixed(2) }}元</div>
        <div>{{ order.orderId }}</div>
        <div class="receive-info">
          <div>{{ order.addressSelect + order.addressDetail }}</div>
          <div>
            {{ order.receiveName }}&nbsp;&nbsp;&nbsp; {{ order.receivePhone }}
          </div>
        </div>
      </div>
    </div>

    <div class="pay_type">
      <div class="weixin">微信支付</div>
      <div style="display:flex;align-items: center">
        <box> <icon type="success"></icon> </box>
      </div>
    </div>

    <!--成功-->
    <div v-if="$route.query.payResult == 'success'" class="pay-order-info">
      <div class="order-detail">查看订单</div>
    </div>

    <!--失败-->
    <div v-else class="pay-div">
      <div class="pay-money">
        <div class="paymentAmount">
          合计：<span style="color: #995454"
            >¥{{ order.paymentAmount.toFixed(2) }}元</span
          >
        </div>
        <div class="pay-money-cancelTime">
          距订单关闭还有{{ getCancelTime(order) }}分钟
        </div>
      </div>
      <div class="pay-button">
        <div style="background-color: #3d7a99">立即支付</div>
        <div>查看订单</div>
      </div>
    </div>


  </div>
</template>

<script>
import { Box,Icon} from 'vux'

export default {
  components: {
    Box,
    Icon
  },
  data(){
    return{
      order:{}//订单
    }
  },
  created(){
    //模拟订单数据
    this.order = {
      orderId: 'TDX20190122123',
      orderState:1,//订单状态
      orderStateStr:'待付款',//订单状态描述
      orderDate:'2019-01-21 21:51:21',//下单时间
      totalPrice:9106,//总价（不含运费）
      deliveryMoney:0,//运费
      paymentAmount:9106,//支付金额
      goodCount:6,//商品件数
      leaveWord:'',//留言
      addressId:1,//地址Id
      addressSelect:'广东省佛山市禅城区张槎街道',//选择地址（从省份到街道）
      addressDetail:'江湾一路18号（佛山科学技术学院仙溪校区）',//详细地址
      receiveName:'李世虎',// 收货人
      receivePhone:'13425816985',//收货手机号
      goods:[{
        id: 125,
        name: '华为手机',
        originalPrice: 1108,
        price: 1058,
        buyCount: 5,
        img: '/img/good/1.jpg'
      },
      {
          id: 128,
          name: '戴尔电脑',
        originalPrice:3855,
        price: 3566,
        buyCount:1,
        img: '/img/good/2.jpg'
      }]
    };


  }
  methods: {
    // 获取订单取消剩余时间，单位是分钟
    getCancelTime(order){
      let seconds = 3600 - (new Date() - new Date(order.orderDate))/1000;

        return Math.floor(seconds/60);
    }
  }
}

</script>

<style lang="scss" scoped>
.payResult-container {
  width: 100%;
  height: 100vh;
  background-color: #e5e5e5;

  .payResult-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-color: white;
    font-size: 16px;

    .pay-success,
    .pay-fail {
      width: 100px;
      height: 100%;
      background-size: 100px;
      background-position: center center;
      background-repeat: no-repeat;
      position: relative;
    }

    .pay-success {
      background-image: url('/img/paySuccess.png');
      color: #3d998a;
    }

    .pay-fail {
      background-image: url('/img/payFail.png');
      color: #995454;
    }

    .pay-result-tip {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 25px;
    }

    .pay-result-tip2 {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 5px;
      font-size: 12px;
      color: #2c3e50;
    }
  }

  .order-info {
    display: flex;
    width: 355px;
    height: 100px;
    background-color: white;
    margin-top: 15px;
    padding: 0 10px;
    justify-content: flex-start;

    .order-info-left {
      width: 55px;
      color: #808080;

      div {
        display: flex;
        width: 100%;
        height: 25px;
        align-items: center;
      }
    }

    .order-info-right {
      margin-left: 10px;
      width: 320px;

      div {
        display: flex;
        width: 100%;
        height: 25px;
        align-items: center;
      }

      .receive-info {
        display: block;
        text-align: left;


        }
    }
  }

  .pay_type {
    display: flex;
    height: 40px;
    background-color: white;
    margin-top: 10px;
    justify-content: space-between;
    width: 355px;
    padding: 0 10px;

    .weixin {
      display: flex;
      width: 100px;
      background-image: url('/img/weixin.png');
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 25px 22px;
      padding-left: 30px;
      align-items: center;
    }
  }

  .pay-order-info {
    display: flex;
    width: 100%;
    height: 49px;
    background-color: white;
    position: fixed;
    bottom: 0;
    justify-content: center;
    align-items: center;

    .order-detail {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 30px;
      background-color: #3d7a99;
      color: white;
      border-radius: 5px;
      font-size: 15px;
    }
  }

  .pay-div {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    background-color: white;
    justify-content: space-between;
    font-size: 16px;

    .pay-money {
      /*display: flex;*/
      margin-left: 10px;
      /*align-items: center;*/
      text-align: left;

      .paymentAmount {
        margin-top: 5px;
      }

      .pay-money-cancelTime {
        font-size: 12px;
        color: #808080;
      }
    }

    .pay-button {
      display: flex;
      width: 200px;
      justify-content: center;
      align-items: center;
      background-color: #995454;
      color: white;

      div {
        display: flex;
        width: 100px;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

<style lang="less" scoped>
@import '~vux/src/styles/weui/icon/weui_icon_font';

@icon-success-color: #995454;
</style>

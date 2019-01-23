<!--支付页面-->
<template>
  <div class="pay-container">
    <div class="receive-info">
      <div class="receive-info-left">
        <div>{{addressInfo.receiveName}}</div>
        <div>{{addressInfo.addressSelect}}</div>
      </div>

      <div class="receive-info-right">
        <div style="margin-right: .25rem">{{addressInfo.receivePhone}}</div>
        <div style="align-items: center;">
          <img class="forward_right" src="/img/forward_right.png">
        </div>
      </div>
    </div>
    <div class="receive-bottom"></div>

    <div class="pay_type">
      <div class="weixin">
        微信支付
      </div>
      <div style="display:flex;align-items: center">
        <box>
          <icon type="success"></icon>
        </box>
      </div>
    </div>

    <div class="good-detail">
      <div class="good-detail-title" style="text-align: left">商品详细</div>

      <div class="good" v-for="(item,index) in order.goods">
        <div class="good-left">
          <div class="good-img">
            <img style="width: 100%;height: auto" src="/img/good/1.jpg">
          </div>
          <div class="good-left-info">
            <div>{{item.name}}</div>
            <div style="color: #995454">¥{{item.price.toFixed(2)}}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;color: #808080">x{{item.buyCount}}</div>
      </div>



      <div class="good-common">
        <div>配送方式</div>
        <div style="color: #808080">快递配送</div>
      </div>
      <div class="good-common">
        <div>发票类型</div>
        <div style="color: #808080">不开发票</div>
      </div>
      <div class="good-common">
        <div>买家留言</div>
        <div>
          <input  style="color: #995454" class="leave-word" v-model="order.leaveWord"  type="text" maxlength="20"  placeholder="填写内容需与商家协商并确认，20字以内">
        </div>
      </div>
    </div>


    <div style="padding-bottom: 6rem">
      <div class="pay-info">
        <div>
          <div>商品总价</div>
          <div style="color: #995454">¥{{order.totalPrice.toFixed(2)}}</div>
        </div>
        <div>
          <div>运费</div>
          <div style="color: #995454">+¥{{order.deliveryMoney.toFixed(2)}}</div>
        </div>
      </div>
    </div>

    <!--详细地址-->
    <div class="detail-address">
      配送至：{{addressInfo.addressDetail}}
    </div>
    <!--支付按钮-->
    <div class="pay-div">
      <div class="pay-money">合计：<span style="color: #995454">¥{{order.paymentAmount.toFixed(2)}}</span></div>
        <div class="pay-button">去支付</div>
    </div>

  </div>
</template>

<script>
  import {  Box,Icon} from 'vux'

  export default {
    components: {
      Box,
      Icon
    },
    data: function () {
      return {
        order:{},//订单中有地址，但未填写，在付款后地址才补全
        addressInfo:{},//地址信息，含有手机号码等信息

      }
    },
    created(){
      //模拟订单数据
      this.order = {
        orderId: 12,
        orderState:1,//订单状态
        orderStateStr:'待付款',//订单状态描述
        orderDate:'2019-01-21 21:51:21',//下单时间
        totalPrice:9106,//总价（不含运费）
        deliveryMoney:0,//运费
        paymentAmount:9106,//支付金额
        goodCount:6,//商品件数
        leaveWord:'',//留言
        addressId:1,//地址Id
        addressSelect:'',//选择地址（从省份到街道）
        addressDetail:'',//详细地址
        receiveName:'李世虎',// 收货人
        receivePhone:'13425816985',//收货手机号
        goods:[{
          id: 125,
          name: '华为手机',
          originalPrice:1108,
          price: 1058,
          buyCount:5,
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

      this.addressInfo = {
        addressId:1,//地址Id
        addressSelect:'广东省佛山市禅城区张槎街道',//选择地址（从省份到街道）
        addressDetail:'江湾一路18号（佛山科学技术学院仙溪校区）',//详细地址
        receiveName:'李世虎',// 收货人
        receivePhone:'13425816985',//收货手机号
      }
    },
    mounted() {
      this.$nextTick(() => {



      })
    }
  }

</script>


<style lang="scss" scoped>
  .pay-container{
    width: 100%;
    /*height: 100vh;*/
    background-color: #e5e5e5;
    font-size: 15px;

    .receive-info{
      display: flex;
      width: 355px;
      background-color: white;
      justify-content: space-between;
      padding: 6px 10px;

      div{
        height: 50px;
      }

      .receive-info-left{
        text-align: left;

        div{
          display: flex;
          height: 25px;
          align-items: center;
        }
      }

      .receive-info-right{
        display: flex;
        justify-content: flex-end;

        div{
          display: flex;
          height: 100%;


          .forward_right{
            width: 12px;
            height: 19px;
          }
        }




      }

    }


    .receive-bottom{
      width: 100%;
      height: 3px;
      background-image: url("/img/receive_bottom.png");
      background-repeat: no-repeat;
      background-size: 375px 3px;

    }

    .pay_type{
      display: flex;
      height: 40px;
      background-color: white;
      margin-top: 10px;
      justify-content: space-between;
      width: 355px;
      padding: 0 10px;

      .weixin{
        display: flex;
        width: 100px;
        background-image: url("/img/weixin.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 25px 22px;
        padding-left: 30px;
        align-items: center;

      }


    }

    .good-detail{
      background-color: white;
      margin-top: 15px;
      width: 355px;
      padding: 0 10px;

      .good-detail-title{
        display: flex;
        height: 40px;
        align-items: center;

      }

      .good-common{
        display: flex;
        height: 40px;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e5e5e5;

      }

      .leave-word{
        width: 280px;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        vertical-align:middle;
        outline: none;
        border: 0;
        margin: auto 0;
      }

      .good{
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #e5e5e5;
        padding: 10px 0;

        .good-left{
          display: flex;
          justify-content: flex-end;

          .good-img{
            width: 80px;
            height: 80px;
            margin-right: 10px;

          }

          .good-left-info{
            height: 30px;
            text-align: left;
            line-height: 30px;
          }

        }


      }
    }


    .pay-info{
      width: 355px;
      height: 60px;
      padding: 0 10px;
      background-color: white;
      margin-top: 15px;


      div{
        display: flex;
        height: 30px;
        justify-content: space-between;
        align-items: center;
      }
    }


    .detail-address{
      display: flex;
      position: fixed;
      bottom: 49px;
      width: 100%;
      height: 30px;
      align-items: center;
      background-color: #fbf9c9;
    }

    .pay-div{
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 49px;
      background-color: white;
      justify-content: space-between;
      font-size: 16px;

      .pay-money{
        display: flex;
        margin-left: 10px;
        align-items: center;

        span{
          font-size: 18px;
        }
      }

      .pay-button{
        display: flex;
        width: 150px;
        justify-content: center;
        align-items: center;
        background-color: #995454;
        color: white;

      }

    }

  }
</style>

<style lang="less" scoped>
  @import '~vux/src/styles/weui/icon/weui_icon_font';

  @icon-success-color:#995454;
</style>

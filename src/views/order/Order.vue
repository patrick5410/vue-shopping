<!--我的订单-->
<template>
  <div class="order-container">
    <div class="order-head" id="order-head">
      <tab custom-bar-width="1rem" active-color="#3d7a99"  :scroll-threshold="5" >
        <tab-item selected @on-item-click="onItemClick">全部订单</tab-item>
        <tab-item @on-item-click="onItemClick">待付款</tab-item>
        <tab-item @on-item-click="onItemClick">待收货</tab-item>
        <tab-item @on-item-click="onItemClick">已收货</tab-item>
        <tab-item  @on-item-click="onItemClick">退款订单</tab-item>
      </tab>
    </div>

    <!--订单-->
    <div class="order-content" :style="{paddingTop: contentPaddingTop+'px'}">
      <OrderCom :orders="showOrders"></OrderCom>
    </div>
  </div>



</template>

<script>
  import OrderCom from '@/components/OrderCom'
  import { Tab, TabItem,LoadingPlugin } from 'vux'
  import Vue from 'vue'


  Vue.use(LoadingPlugin)
  export default {
    components: {
      Tab,
      TabItem,
      OrderCom
    },
    data: function () {
      return {
        orders:[],//所有订单 orderState:0,//0：全部 1：待付款  2：待发货 3：已发货  4:待收货  5：已收货 6：退款中 7：已退款
        showOrders:[],//显示的订单
        contentPaddingTop:0,
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        //初始化订单内容的顶部内边距
        this.contentPaddingTop = window.document.getElementById("order-head").clientHeight;


        // 模拟订单
        this.orders.push({
          orderId: 12,
          orderState:1,//订单状态
          orderStateStr:'待付款',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:9106,//支付金额
          goodCount:6,//商品件数
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
        });


        this.orders.push({
          orderId: 13,
          orderState:1,//订单状态
          orderStateStr:'待付款',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:4980,//支付金额
          goodCount:4,//商品件数
          goods:[{
            id: 256,
            name: '华为手机',
            originalPrice:1108,
            price: 1245,
            buyCount:4,
            img: '/img/good/3.jpg'
          }]
        });


        this.orders.push({
          orderId: 14,
          orderState:2,//订单状态
          orderStateStr:'待发货',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:4624,//支付金额
          goodCount:2,//商品件数
          goods:[{
            id: 125,
            name: '华为手机',
            originalPrice:1108,
            price: 1058,
            buyCount:1,
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
        });



        this.orders.push({
          orderId: 15,
          orderState:3,//订单状态
          orderStateStr:'已发货',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:2490,//支付金额
          goodCount:2,//商品件数
          goods:[{
            id: 256,
            name: '华为手机',
            originalPrice:1108,
            price: 1245,
            buyCount:2,
            img: '/img/good/3.jpg'
          }]
        });


        this.orders.push({
          orderId: 16,
          orderState:4,//订单状态
          orderStateStr:'待收货',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:4624,//支付金额
          goodCount:2,//商品件数
          goods:[{
            id: 125,
            name: '华为手机',
            originalPrice:1108,
            price: 1058,
            buyCount:1,
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
        });



        this.orders.push({
          orderId: 17,
          orderState:5,//订单状态
          orderStateStr:'已收货',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:2490,//支付金额
          goodCount:2,//商品件数
          goods:[{
            id: 256,
            name: '华为手机',
            originalPrice:1108,
            price: 1245,
            buyCount:2,
            img: '/img/good/3.jpg'
          }]
        });


        this.orders.push({
          orderId: 18,
          orderState:6,//订单状态
          orderStateStr:'退款中',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:6890,//支付金额
          goodCount:4,//商品件数
          goods:[{
            id: 125,
            name: '华为手机',
            originalPrice:1108,
            price: 1058,
            buyCount:3,
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
        });



        this.orders.push({
          orderId: 19,
          orderState:7,//订单状态
          orderStateStr:'已退款',//订单状态描述
          orderDate:'2019-01-21 16:08:21',//下单时间
          paymentAmount:1245,//支付金额
          goodCount:1,//商品件数
          goods:[{
            id: 256,
            name: '华为手机',
            originalPrice:1108,
            price: 1245,
            buyCount:1,
            img: '/img/good/3.jpg'
          }]
        });


        this.showOrders = this.orders;

        this.$vux.loading.show({
          text: '加载中'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 1000)


      })
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
        // orderState://0：全部 1：待付款  2：待发货 3：已发货  4:待收货  5：已收货 6：退款中 7：已退款
        this.showOrders = [];
        switch (index) {
          case 1:
            //待付款
            this.orders.forEach((item)=>{
              if(item.orderState == 1){
                this.showOrders.push(item)
              }
            })
            break;
          case 2:
            //待收货
            this.orders.forEach((item)=>{
              if(item.orderState == 2 || item.orderState == 3 || item.orderState == 4){
                this.showOrders.push(item)
              }
            })
            break;
          case 3:
            //已收货
            this.orders.forEach((item)=>{
              if(item.orderState == 5){
                this.showOrders.push(item)
              }
            })
            break;
          case 4:
            //退款订单
            this.orders.forEach((item)=>{
              if(item.orderState == 6 || item.orderState == 7){
                this.showOrders.push(item)
              }
            })
            break;
          default:
            // 所有订单
            this.showOrders = this.orders;
        }

      }
    }
  }
</script>

<style lang="scss" scoped>

  .order-container{
    width: 375px;
    height: 100vh;
    background-color: #e5e5e5;
  }

  .order-head{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
  }

  .order-content{

  }




</style>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .order-container .vux-tab .vux-tab-item{
    font-size: 15px;
  }


</style>

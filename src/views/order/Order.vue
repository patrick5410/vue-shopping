<!--我的订单-->
<template>
  <div class="order-container">
    <div class="order-head" id="order-head">
      <tab custom-bar-width="1rem" active-color="#3d7a99"  :scroll-threshold="5" >
        <tab-item :selected="!($route.query.index>0 && $route.query.index<5)" @on-item-click="onItemClick">全部订单</tab-item>
        <tab-item @on-item-click="onItemClick" style="position: relative" :selected="$route.query.index === 1">
          待付款
          <Badge :text="unPayCount" class="pay-count" v-show="unPayCount>0"></Badge>
        </tab-item>
        <tab-item @on-item-click="onItemClick" :selected="$route.query.index === 2">待取书</tab-item>
        <tab-item @on-item-click="onItemClick" :selected="$route.query.index === 3">已完成</tab-item>
        <tab-item  @on-item-click="onItemClick" :selected="$route.query.index === 4">已取消</tab-item>
      </tab>
    </div>

    <!--订单-->
    <div class="order-content">
      <OrderCom :orders="showOrders"></OrderCom>
    </div>
  </div>



</template>

<script>
  import OrderCom from '@/components/OrderCom'
  import { Tab, TabItem,LoadingPlugin,Badge  } from 'vux'
  import Vue from 'vue'


  Vue.use(LoadingPlugin)
  export default {
    components: {
      Tab,
      TabItem,
      OrderCom,
      Badge
    },
    data: function () {
      return {
        // orders:[],//0：全部 1：待付款  2：待发货 3：已发货  4：已收货 5：退款中 6：已退款 7：订单取消（超时或用户主动取消）
        showOrders:[],//显示的订单
        // contentPaddingTop:0,//头部高度
        unPayCount:0,//未付款数量
        currentIndex:-1//当前选项卡
      }
    },
    computed: {
      getOrders () {
        return this.$store.state.orders
      }
    },
    watch:{
      getOrders:function(val,oldval) {
        if(val){
          console.log("订单已改变",val,oldval)
          if(oldval && this.currentIndex>-1){
            //重新更新订单数据
            this.onItemClick(this.currentIndex);
          }else {
            //初始化订单页面
            if(this.$route.query.index>0 && this.$route.query.index<5){
              console.log("有index",this.$route.query.index)
              this.onItemClick(parseInt(this.$route.query.index))
            }else{
              //显示的订单
              this.showOrders = val;
            }

          }

          //计算未付款订单数量
          this.unPayCount = 0
          val.forEach((item)=>{
            if(item.orderState === 1){
              this.unPayCount++
            }
          })

          //关闭加载框
          this.$vux.loading.hide()

        }
      }
    },
    beforeCreate(){

    },
    created(){

      this.$vux.loading.show({
        text: '正在加载中'
      })
      console.log("内容加载完毕")
    },
    mounted: function () {
      this.$nextTick(function () {
        //初始化订单内容的顶部内边距
        // this.contentPaddingTop = window.document.getElementById("order-head").clientHeight;



      })
    },
    beforeDestroy(){
      //页面销毁前关闭加载框
      this.$vux.loading.hide()
      console.log("页面销毁前事件")
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
        // 1.待付款 2.订单取消（超时或用户主动取消） 3.退款中 4.已退款 5.待发货 6.已发货 7.已收货
        this.showOrders = [];
        switch (index) {
          case 1:
            //待付款
            this.$store.state.orders.forEach((item)=>{
              if(item.orderState === 1){
                this.showOrders.push(item)
              }
            })
            break;
          case 2:
            //待收货
            this.$store.state.orders.forEach((item)=>{
              if(item.orderState === 5 || item.orderState === 6 ){
                this.showOrders.push(item)
              }
            })
            break;
          case 3:
            //已收货
            this.$store.state.orders.forEach((item)=>{
              if(item.orderState === 7){
                this.showOrders.push(item)
              }
            })
            break;
          case 4:
            //退款订单
            this.$store.state.orders.forEach((item)=>{
              if(item.orderState ===2 ||item.orderState ===3 || item.orderState === 4){
                this.showOrders.push(item)
              }
            })
            break;
          default:
            // 所有订单
            this.showOrders = this.$store.state.orders;
        }
        this.currentIndex = index

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
    margin-top: 44px;
  }

  .pay-count{
    position: absolute;
    left: 55px;
    top: 7px;
  }


</style>

<style lang="less" scoped>
  /*@import '~vux/src/styles/1px.less';*/
  /*@import '~vux/src/styles/center.less';*/

  .order-container .vux-tab .vux-tab-item{
    font-size: 15px;
  }


  .order-container .vux-badge{
    background-color: #995454;
  }
</style>

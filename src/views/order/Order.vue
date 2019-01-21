<!--我的订单-->
<template>
  <div class="order-container">
    <tab custom-bar-width="1rem" active-color="#3d7a99"  :scroll-threshold="5"  @on-before-index-change="switchTabItem">
      <tab-item selected @on-item-click="onItemClick">全部订单</tab-item>
      <tab-item @on-item-click="onItemClick">待付款</tab-item>
      <tab-item @on-item-click="onItemClick">待收货</tab-item>
      <tab-item @on-item-click="onItemClick">已收货</tab-item>
      <tab-item  @on-item-click="onItemClick">退款订单</tab-item>
    </tab>

  </div>

</template>

<script>
  import { Tab, TabItem,LoadingPlugin } from 'vux'
  import Vue from 'vue'

  Vue.use(LoadingPlugin)
  export default {
    components: {
      Tab,
      TabItem
    },
    methods: {
      switchTabItem (index) {
        console.log('on-before-index-change', index)
        this.$vux.loading.show({
          text: 'loading'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.index01 = index
        }, 1000)
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      switchTabItem (index) {
        console.log('on-before-index-change', index)
        this.$vux.loading.show({
          text: 'loading'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          // this.index01 = index
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-container{
    width: 375px;
    font-size: 12px;
  }

  .testClass{
    width: 10px;
  }

 .vux-tab-item{
   width: 10px;
 }
</style>

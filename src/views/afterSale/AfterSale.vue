<!--售后中心-->
<template>
  <div class="orderCom-container">

    <div class="order" v-for="(item,orderIndex) in $store.state.afterSaleGoods">
      <div class="order-head" @click="toOrderDetail(item)">
        <div class="head-date" style="color: #808080" @click="toOrderDetail(item)">订单编号:{{item.orderId}}</div>
        <div class="orderType-detail" v-if="item.returnState === 0 || item.returnState === 5" :style="{color: '#3d7a99' }">{{item.returnStateStr}}</div>
        <div class="orderType-detail" v-else :style="{color: '#995454'}">
          <span v-if="item.returnState<5">退货中</span>
          <span v-else @click.stop="seeAuditRemark(item)">{{item.returnStateStr}}：点击查看</span>
        </div>
      </div>

      <!--一种书籍-->
      <div class="order-good" @click.stop="toGoodDetail(item)">
        <div class="good-left">
          <div class="good-img">
            <img :src="item.goodImg" style="width: 100%;height: auto"  ref='itemImg' />
            <!--<img  src="../assets/img/good/1.jpg" style="width: 100%;height: auto" >-->
          </div>
          <div style="text-align: left">
            <div @click.stop="">{{item.goodName}}</div>
            <div style="margin-top: .35rem;color: #808080;font-size: 0.35rem">{{item.goodSpecificationItems}}</div>
          </div>
        </div>
        <div class="good-right">
          <div>¥{{item.goodPrice.toFixed(2)}}</div>
          <div>x{{item.buyCount}}</div>
        </div>
      </div>

      <!--订单合算-->
      <div class="order-calInfo" @click="">书籍总金额<span style="color: #995454">¥{{(item.buyCount*item.goodPrice).toFixed(2)}}元</span></div>
      <!--订单底部-->
      <div class="order-bottom">

        <!--退货进度-->
        <div class="order-bottom-button" v-if="item.returnState > 0 && item.returnState<5">
          <div style="color: #3d7a99;border-color: #3d7a99" @click="returnProcess(item)">退货进度</div>
        </div>

        <!--申请退货-->
        <div class="order-bottom-button" v-if="item.returnState === 0">
          <!--超过退货期限，不能再进行退货-->
          <div v-if="new Date(item.deadline)<new Date()" @click="unableReturnGood(item)">申请退货</div>
          <div v-else style="color: #3d7a99;border-color: #3d7a99" @click="returnGood(item)">申请退货</div>
        </div>

        <div class="order-bottom-button" v-if="item.returnState === 5">
          <div style="color: #3d7a99;border-color: #3d7a99" @click="returnProcess(item)">查看详情</div>
        </div>

        <div class="order-bottom-button" v-if="item.returnState === 6">
          <div style="color: #3d7a99;border-color: #3d7a99" @click="returnGood(item)">重新申请</div>
        </div>

      </div>
    </div>

    <!--底部占位-->
    <div class="bottom-placeholder"></div>
  </div>
</template>

<script>
  import { Countdown,ToastPlugin,LoadingPlugin } from 'vux'
  import  { ConfirmPlugin } from 'vux'
  import  { AlertPlugin } from 'vux'
  import Vue from 'vue'

  Vue.use(AlertPlugin)
  Vue.use(ToastPlugin,LoadingPlugin)
  Vue.use(ConfirmPlugin)
  export default {
    components: {
      Countdown
    },
    data: function () {
      return {

      }
    },
    mounted: function () {

    },
    methods: {
      /**
       * 查看审核不通过原因
       */
      seeAuditRemark(item){
        this.$vux.alert.show({
          title: '审核不通过原因',
          content: item.auditRemark
        })
      },
      /**
       * 跳转到书籍详情页面
       * @param item
       */
      toGoodDetail(item){
        this.$router.push({name:'good',query:{goodId:item.goodId}})
      },
      /**
       * 跳转到订单详情页面
       * @param item
       */
      toOrderDetail(item){
        //跳转到订单详情页面
          this.$router.push({name:'orderDetail',query:{orderId:item.orderId}})
      },
      unableReturnGood(item){
        this.$vux.alert.show({
          title: '退货提示',
          content: '该书籍退货截止时间为：'+item.deadline
        })
      },
      /**
       * 退货申请进度
       * @param item
       */
      returnProcess(item){
        this.$router.push({name:'returnDetail',query:{afterSaleId:item.afterSaleId}})
      },
      /**
       * 申请退货
       * @param item
       */
      returnGood(item){
        this.$router.push({name:'returnApplication',query:{afterSaleId:item.afterSaleId}})
      }

    }
  }
</script>

<style lang="scss" scoped>
  .orderCom-container{
    background-color: #e5e5e5;

    .order{
      width: 355px;
      /*border: 1px solid red;*/
      padding: 0 10px;
      background-color: white;
      font-size: 14px;
      margin-top: 6px;

      .order-head{
        display: flex;
        justify-content: space-between;

        .head-date,.orderType-detail{
          display: flex;
          height: 30px;
          justify-content: center;
          align-items: center;
        }

        .head-date{
          font-size: 12px;
        }

      }

      .order-good{
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #e5e5e5;
        padding-top: 8px;

        .good-left{
          display: flex;

          .good-img{
            width: 80px;
            height: 80px;
            background-color: #e5e5e5;
          }

        }

        .good-right{
          /*display: flex;*/
          /*justify-content: flex-end;*/
          /*align-items: flex-end;*/
          text-align: right;

          div{
            display: flex;
            height: 25px;
            justify-content: flex-end;
            align-items: center;
            color: #808080;
          }
        }

      }


      .order-calInfo{
        text-align: right;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
      }


      .order-bottom{
        border-top: 1px solid #e5e5e5;

        .order-bottom-button{
          display: flex;
          height: 50px;
          justify-content: flex-end;
          align-items: center;
          color: #808080;

          div{
            display: flex;
            height: 30px;
            width: 80px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
          }
        }
      }
    }


    .bottom-placeholder{
      width: 100%;
      height: 6px;
    }
  }
</style>

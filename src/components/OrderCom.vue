<!--订单组件-->
<template>
    <div class="orderCom-container">

        <div class="order" v-for="(item,orderIndex) in orders">
            <div class="order-head" @click="toOrderDetail(item)">
                <div class="head-date" style="color: #808080">{{item.createDate}}</div>
                <div v-if="item.orderState === 2" class="orderType-detail" style="color: #808080">{{item.orderStateStr}}</div>
                <div v-else="item.orderState" class="orderType-detail" :style="{color: item.orderState===1 || item.orderState===3 ||item.orderState===5? '#995454':'#3d7a99'}">{{item.orderStateStr}}</div>
            </div>

            <!--一种商品-->
            <div class="order-good" v-for="(good,goodIndex) in item.goods" @click="toOrderDetail(item)">
                <div class="good-left">
                    <div class="good-img" @click.stop="toGoodDetail(good)">
                        <img :src="good.goodImg" style="width: 100%;height: auto"  ref='itemImg' />
                        <!--<img  src="../assets/img/good/1.jpg" style="width: 100%;height: auto" >-->
                    </div>
                    <div style="text-align: left">
                      <div @click.stop="toGoodDetail(good)">{{good.goodName}}</div>
                      <div style="margin-top: .35rem;color: #808080;font-size: 0.35rem">{{good.goodSpecificationItems}}</div>
                    </div>
                </div>
                <div class="good-right">
                    <div>¥{{good.goodPrice}}</div>
                    <div>x{{good.buyCount}}</div>
                </div>
            </div>

            <!--订单合算-->
            <div class="order-calInfo" @click="toOrderDetail(item)">共{{item.goodCount}}件商品，总金额<span style="color: #995454">¥{{item.paymentAmount}}元</span></div>
            <!--订单底部-->
            <div class="order-bottom">
                <!--待支付-->
                <div  v-show="item.orderState === 1" style="display: flex;justify-content: space-between">
                    <div style="display: flex;align-items: center">
                        <span  v-if="getCancelTime(item)<120 && item.orderState === 1" style="color: #995454">
                            <Countdown :value="getCancelTime(item)" @on-finish="finishCancel"></Countdown>
                        </span>
                        <span v-if="getCancelTime(item)<120">秒后订单将取消</span>
                        <span v-else>{{Math.floor(getCancelTime(item) / 60)}}分钟后订单将取消</span>
                    </div>
                    <div class="order-bottom-button">
                        <div @click="cancelOrder(item)">取消</div>
                        <div style="color: #995454;border-color: #995454" @click="toPayPage(item)">去支付</div>
                    </div>
                </div>
                <!--// 1.待付款 2.订单取消（超时或用户主动取消） 3.退款中 4.已退款 5.待发货 6.已发货 7.已收货-->
                <!--待收货-->
                <div class="order-bottom-button" v-show="item.orderState === 5 || item.orderState === 6">
                    <div v-if="item.orderState === 5" @click="refund(item)">申请退款</div>
                    <div v-else @click="queryExpress(item)">物流查询</div>
                    <div v-show="item.orderState === 6" style="color: #3d7a99;border-color: #3d7a99" @click="confirmReceive(item)">确认收货</div>
                </div>

                <!--已收货-->
                <div class="order-bottom-button" v-if="item.orderState === 2">
                    <div @click="deleteOrder(item)">删除订单</div>
                </div>

            </div>
        </div>

        <!--底部占位-->
        <div class="bottom-placeholder"></div>
    </div>
</template>

<script>
    import '../assets/css/KDNWidget.css'
    import { Countdown,ToastPlugin,LoadingPlugin } from 'vux'
    import  { ConfirmPlugin } from 'vux'
    import Vue from 'vue'

    Vue.use(ToastPlugin,LoadingPlugin)
    Vue.use(ConfirmPlugin)
    export default {
        props: {
            orders: Array//0：全部 1：待付款  2：待发货 3：已发货  4：已收货 5：退款中 6：已退款 7：订单取消（超时或用户主动取消）
        },
        components: {
            Countdown
        },
        data: function () {
            return {
                // orders:[],
            }
        },
        mounted: function () {
            console.log("orders",this.orders)
        },
        methods: {
            // 获取订单取消剩余时间，单位是秒
            getCancelTime(order){
                let seconds = 3600 - (new Date() - new Date(order.createDate))/1000;
                // console.log("时间差",seconds,order.orderDate);
                return Math.floor(seconds);
            },
            finishCancel(){
                // 需要重新获取订单数据
                console.log("重新获取订单数据")
              this.$store.commit('getOrders')

            },
            toPayPage(item){
                console.log("item",item)
                //如果该页面的订单信息不详细，则需要根据id去请求再跳转
                this.$store.state.order = item
                //跳转到支付页面
                this.$router.push({name:'payPage'})
            },
            toOrderDetail(item){
              //跳转到订单详情页面,没有收货地址的订单不能跳转到订单详情
              if(item.addressInfo.addressId || item.orderState===2){
                this.$router.push({name:'orderDetail',query:{orderId:item.orderId}})
              }else{
                //跳转到支付页面
                this.$router.push({name:'payPage',query:{orderId:item.orderId}})
              }

            },
            cancelOrder(item){
              let that = this
              this.$vux.confirm.show({
                title: '操作确认',
                content:'亲，真的要取消订单吗？',
                // 组件除show外的属性
                onCancel () {
                  console.log(this) // 非当前 vm
                },
                onConfirm () {
                  that.$vux.loading.show({
                    text: '取消订单中'
                  })
                  that.$store.commit('cancelOrder', { data: { orderId: item.orderId },successCallBack:function () {
                      //刷新页面
                      console.log("取消订单成功",item.orderId)
                      that.$vux.loading.hide()
                      // that.$router.push({name:'order',query:{index:'1' }})
                      that.$store.commit('getOrders')
                      that.$vux.toast.show({
                        text: '取消成功'
                      })
                    }})
                }
              })

            },
           refund(item){
             console.log("this.$vux.confirm",this.$vux.confirm)
             let that = this
             this.$vux.confirm.show({
               title: '操作确认',
               content:'确认申请退款吗？',
               // 组件除show外的属性
               onCancel () {
                 console.log(this) // 非当前 vm
               },
               onConfirm () {
                 that.$vux.loading.show({
                   text: '退款申请中'
                 })
                 that.$store.commit('refundOrder', { data: { orderId: item.orderId },successCallBack:function () {
                     //刷新页面
                     console.log("订单退款申请成功",item.orderId)
                     that.$store.commit('getOrders')
                     //关闭加载框
                     that.$vux.loading.hide()
                     that.$vux.toast.show({
                       width:'11em',
                       text: '订单退款申请成功'
                     })
                   },failCallBack:function () {
                     //关闭加载框
                     that.$vux.loading.hide()
                     that.$vux.toast.show({
                       type: 'warn',
                       width:'11em',
                       text: '订单退款申请失败'
                     })
                   }})
               }
             })


           },
          deleteOrder(item){
            let that = this
            this.$vux.confirm.show({
              title: '操作确认',
              content:'确认删除订单吗？',
              // 组件除show外的属性
              onCancel () {
                console.log(this) // 非当前 vm
              },
              onConfirm () {
                that.$store.commit('deleteOrder', { data: { orderId: item.orderId },successCallBack:function () {
                    console.log("删除订单成功",item.orderId)
                    that.$store.commit('getOrders')
                    that.$vux.toast.show({
                      text: '删除成功'
                    })
                  }})
              }
            })


          },
          confirmReceive(item){
            let that = this
            this.$vux.confirm.show({
              title: '操作确认',
              content:'亲，确认已经收到货了吗？',
              // 组件除show外的属性
              onCancel () {
                console.log(this) // 非当前 vm
              },
              onConfirm () {
                that.$store.commit('confirmReceive', { data: { orderId: item.orderId },successCallBack:function () {
                    console.log("确认收货成功",item.orderId)
                    that.$store.commit('getOrders')
                    that.$vux.toast.show({
                      width: '10em',
                      text: '欢迎再次购买！'
                    })
                  }})
              }
            })


          },
          queryExpress(item){
              //快递查询
            if(item.deliveryId){
              KDNWidget.run({
                serviceType: "A",
                expCode: item.shipperCode,
                expNo: item.deliveryId,
              })
             // window.location.href = 'https://m.kuaidi100.com/index_all.html?type=&postid='+item.deliveryId+'&callbackurl='+window.location.href
            }
          },
          toGoodDetail(item){
            //跳转到商品详情页面
            this.$router.push({name:'good',query:{goodId:item.goodId}})
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

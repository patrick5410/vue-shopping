<!--订单组件-->
<template>
    <div class="orderCom-container">

        <div class="order" v-for="(item,orderIndex) in orders">
            <div class="order-head">
                <div class="head-date" style="color: #808080">{{item.orderDate}}</div>
                <div class="orderType-detail" :style="{color: item.orderState==1 || item.orderState==6 || item.orderState==8 ? '#995454':'#3d7a99'}">{{item.orderStateStr}}</div>
            </div>

            <!--一种商品-->
            <div class="order-good" v-for="(good,goodIndex) in item.goods">
                <div class="good-left">
                    <div class="good-img">
                        <img v-lazy="good.img" style="width: 100%;height: auto"  ref='itemImg' />
                        <!--<img  src="/img/good/1.jpg" style="width: 100%;height: auto" >-->
                    </div>
                    <div>{{good.name}}</div>
                </div>
                <div class="good-right">
                    <div>¥{{good.price}}</div>
                    <div>x{{good.buyCount}}</div>
                </div>
            </div>

            <!--订单合算-->
            <div class="order-calInfo">共{{item.goodCount}}件商品，总金额<span style="color: #995454">¥{{item.paymentAmount}}元</span></div>
            <!--订单底部-->
            <div class="order-bottom">
                <!--待支付-->
                <div  v-show="item.orderState == 1" style="display: flex;justify-content: space-between">
                    <div style="display: flex;align-items: center">
                        <span  v-if="getCancelTime(item)<120 && item.orderState == 1" style="color: #995454">
                            <Countdown :value="getCancelTime(item)" @on-finish="finishCancel"></Countdown>
                        </span>
                        <span v-if="getCancelTime(item)<120">秒后订单将取消</span>
                        <span v-else>{{Math.floor(getCancelTime(item) / 60)}}分钟后订单将取消</span>
                    </div>
                    <div class="order-bottom-button">
                        <div>取消</div>
                        <div style="color: #995454;border-color: #995454">去支付</div>
                    </div>
                </div>

                <!--待收货-->
                <div class="order-bottom-button" v-show="item.orderState == 2 || item.orderState == 3 || item.orderState == 4">
                    <div v-if="item.orderState == 2">申请退款</div>
                    <div v-else>物流查询</div>
                    <div style="color: #3d7a99;border-color: #3d7a99">确认收货</div>
                </div>

                <!--已收货-->
                <div class="order-bottom-button" v-show="item.orderState == 5">
                    <div>申请退货</div>
                </div>

            </div>
        </div>

        <!--底部占位-->
        <div class="bottom-placeholder"></div>
    </div>
</template>

<script>
    import { Countdown } from 'vux'
    export default {
        props: {
            orders: Array//所有订单 orderState:0,//0：全部 1：待付款  2：待发货 3：已发货  4:待收货  5：已收货 6：退款中 7：已退款 8：退货中 9：已退货
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
                let seconds = 3600 - (new Date() - new Date(order.orderDate))/1000;
                // console.log("时间差",seconds,order.orderDate);
                return Math.floor(seconds);
            },
            finishCancel(){
                // 需要重新获取订单数据
                console.log("重新获取订单数据")

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

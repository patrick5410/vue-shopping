<!--订单详情-->
<template>
    <div class="orderDetail-container" v-if="$store.state.order">
        <div class="head">
            <div class="content">
                <div v-text="$store.state.order.orderStateStr"></div>
                <div v-if="$store.state.order.orderState === 1 && getCancelTime($store.state.order)>120" style="font-size: .39rem">剩余时间：{{Math.floor(getCancelTime($store.state.order) / 60)}}分钟</div>
                <div v-if="$store.state.order.orderState === 1 && getCancelTime($store.state.order)<=120" style="font-size: .39rem">剩余时间：<Countdown :value="getCancelTime($store.state.order)" @on-finish="finishCancel"></Countdown>秒</div>
                <div v-if="$store.state.order.orderState === 6" style="font-size: .38rem">自动收货时间：{{$store.state.order.autoReceiveDate}}</div>
            </div>



            <div class="receive">
                <div class="receive-address" v-if="$store.state.order && $store.state.order.deliveryUpdateContent">
                    <div class="receive-address-left">
                        <img src="../../assets/img/delivery.png">
                    </div>
                    <div class="receive-address-right">
                        <div class="delivery-info">
                            <div>{{$store.state.order.deliveryUpdateContent}}</div>
                        </div>
                        <div class="update-update">
                            更新时间：{{$store.state.order.deliveryUpdateDate}}
                        </div>
                    </div>
                    <div  class="forward" @click="queryExpress($store.state.order)">
                        <img src="../../assets/img/forward2.png">
                    </div>
                </div>

                <div class="receive-info">
                    <div class="left">
                        <img src="../../assets/img/position.png">
                    </div>
                    <div class="right" v-if="$store.state.order.addressInfo && $store.state.order.addressInfo.addressId">
                        <div class="name-phone">
                            <div>{{$store.state.order.addressInfo.receiveName}}&nbsp;&nbsp;&nbsp;{{$store.state.order.addressInfo.receivePhone}}</div>
                        </div>
                        <div class="address">
                            {{$store.state.order.addressInfo.addressArea+$store.state.order.addressInfo.addressDetail}}
                        </div>
                    </div>
                    <div class="right" v-else style="width: 5rem;height:1rem;line-height: 1rem">
                      暂无收货信息
                    </div>
                </div>
            </div>

        </div>



        <div class="good">
            <div class="good-one" v-for="item in $store.state.order.goods">
                <div class="good-info" @click="toGoodDetail(item)">
                    <img v-lazy="item.goodImg">
                    <div>{{item.goodName}}</div>
                </div>
                <div class="buy-info">
                    <div>{{item.goodSpecificationItems}}</div>
                    <div style="display: flex;justify-content: space-between">
                        <div style="color: #e54545">¥{{item.goodPrice}}</div>
                        <div>x{{item.buyCount}}</div>
                    </div>
                </div>
            </div>
            <!--<div class="good-one">-->
                <!--<div class="good-info">-->
                    <!--<img src="../../assets/img/good/1.jpg">-->
                    <!--<div>车载配件</div>-->
                <!--</div>-->
                <!--<div class="buy-info">-->
                    <!--<div>商品规格：红色</div>-->
                    <!--<div style="display: flex;justify-content: space-between">-->
                        <!--<div style="color: #e54545">¥1288</div>-->
                        <!--<div>x1</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>

        <div class="service">
            <img  src="../../assets/img/service3.png"/>
            <div>联系客服</div>
        </div>

        <div class="order">
            <div class="common">
                <div>订单编号</div>
                <div>{{$store.state.order.orderId}}</div>
            </div>
            <div class="common border">
                <div>下单时间</div>
                <div>{{$store.state.order.createDate}}</div>
            </div>
            <div class="common border">
                <div>支付方式</div>
                <div>微信支付</div>
            </div>
            <div class="common border">
                <div>配送快递</div>
                <div>{{$store.state.order.deliveryCompany?$store.state.order.deliveryCompany:"暂无信息"}}</div>
            </div>
            <div class="common">
                <div>发票信息</div>
                <div>暂无信息</div>
            </div>
            <div class="common">
                <div>发票抬头</div>
                <div>暂无信息</div>
            </div>
            <div class="common">
                <div>发票内容</div>
                <div>暂无信息</div>
            </div>
            <div class="common">
                <div>订单备注</div>
                <div>{{$store.state.order.leaveWord?$store.state.order.leaveWord:'无'}}</div>
            </div>
        </div>

        <div class="pay-info">
            <div class="common">
                <div>商品金额</div>
                <div>¥{{$store.state.order.totalPrice}}</div>
            </div>
            <div class="common">
                <div>运费</div>
                <div>¥0</div>
            </div>
          <div class="common">
                <div>可获积分</div>
                <div>{{$store.state.order.score}}分</div>
            </div>

            <div class="pay-total">
                <div>合计：¥{{$store.state.order.paymentAmount}}</div>
            </div>
        </div>

        <div class="bottom" v-if="$store.state.order.orderState === 1">
            <div class="bottom-common" @click="cancelOrder($store.state.order)">取消订单</div>
            <div class="bottom-common changeColor" @click="pay">立即付款</div>
        </div>

        <div class="bottom" v-if="$store.state.order.orderState === 2">
            <div class="bottom-common" @click="deleteOrder($store.state.order)">删除订单</div>
        </div>

        <div class="bottom" v-if="$store.state.order.orderState === 5">
            <div class="bottom-common" @click="refund($store.state.order)">申请退款</div>
        </div>

        <div class="bottom" v-if="$store.state.order.orderState === 6">
            <div class="bottom-common changeColor" @click="confirmReceive($store.state.order)">确认收货</div>
        </div>

        <div class="bottom" v-if="$store.state.order.orderState === 7">
            <div class="bottom-common changeColor" @click="toClz">再次购买</div>
        </div>

    </div>
</template>


<script>
    import { Countdown } from 'vux'
    import  { ConfirmPlugin,ToastPlugin} from 'vux'
    import Vue from 'vue'
    import  { LoadingPlugin } from 'vux'


    Vue.use(LoadingPlugin)
    Vue.use(ConfirmPlugin)
    Vue.use(ToastPlugin)

    export default {
        data(){
            return{
                order:null,// 订单
                orders:[]// 模拟订单数据
            }
        },
        components: {
            Countdown
        },
        created() {


        },
        methods:{
            // 获取订单取消剩余时间，单位是秒
            getCancelTime(order){
                let seconds = 3600 - (new Date() - new Date(order.createDate))/1000;
                console.log("时间差",seconds,order.createDate);
                return Math.floor(seconds);
            },
            finishCancel(){
                // 付款时间到，需重新刷新页面
            },
            cancelOrder(item){
              let that = this
              this.$vux.confirm.show({
                title: '操作确认',
                content:'亲，真的要取消订单吗？',
                // 组件除show外的属性
                onCancel () {
                  console.log(this) // 非当前 vm
                  console.log(_this) // 当前 vm
                },
                onConfirm () {
                  that.$store.commit('cancelOrder', { data: { orderId: item.orderId },successCallBack:function () {
                      console.log("取消订单成功")
                      // item.orderState = 2
                      that.$store.commit('getOrder', { data: { orderId: item.orderId } })
                    }})
                }
              })




            },
            toClz(){
              this.$router.push({name:'clz'})
            },
            pay(){

            //请求后台，更新订单：收货信息以及留言，然后向微信发起预支付订单，并返回
            let that = this
            this.$store.commit('payOrder', { data: { orderId: this.$store.state.order.orderId,addressId: this.$store.state.order.addressInfo.addressId,leaveWord: this.$store.state.order.leaveWord }
              ,successCallBack: function (data) {
                //生成预支付单号成功
                console.log("预支付单号",data)
                /**
                 * 微信jsapi支付
                 */
                function onBridgeReady(){
                  // alert(res.data.appId+","+res.data.timeStamp+","+res.data.nonceStr+","+res.data.package+","+res.data.signType+","+res.data.paySign);
                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                      "appId":data.appId,     //公众号appId
                      "timeStamp":data.timeStamp,  //时间戳
                      "nonceStr":data.nonceStr, //随机字符串串
                      "package":data.package,
                      "signType":data.signType, //微信签名方式
                      "paySign":data.paySign //微信签名
                    },
                    function(res){
                      // console.log(res);
                      // alert(res.err_code+","+res.err_desc+","+res.err_msg);
                      if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        //跳转到支付结果页面
                        that.$router.push({name:'payResult',query:{payResult:"success"}})
                      }else {
                        that.$router.push({name:'payResult'})
                      }
                    });
                }

                //弹出支付窗口
                if (typeof WeixinJSBridge == "undefined"){
                  if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                  }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
                }else{
                  onBridgeReady();
                }



              },failCallBack:function () {
                //生成预支付单号失败
                that.$vux.toast.show({
                  type: 'cancel',
                  width:'11em',
                  text: '生成预支付单号失败'
                })

              } })




          },
            refund(item){
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
                      that.$store.commit('getOrder', { data: { orderId: item.orderId } })
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
                      that.$store.commit('getOrder', { data: { orderId: item.orderId } })
                      that.$vux.toast.show({
                        text: '删除成功'
                      })
                      that.$router.push({name:'order'})
                    }})
                }
              })


            },
            confirmReceive(item){
              let that = this
              console.log("确认收货订单",item)
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
                      that.$store.commit('getOrder', { data: { orderId: item.orderId } })
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


<style lang="less" scoped>

    .orderDetail-container {
        width: 100%;
        background-color: #e5e5e5;
        position: relative;


        .head {
            width: 100%;
            /*height: 120px;*/
            background-color: white;
            position: relative;

            .content {
                width: 100%;
                height: 100%;
                background-color: #e54545;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                padding-bottom: 45px;

                div {
                    text-align: left;
                    padding-top: 15px;
                    padding-left: 20px;
                    color: white;
                    font-size: 16px;
                }

                div:nth-child(2){
                    padding-top: 7px;
                }

            }
        }

        .receive {
            /*display: flex;*/
            width: 325px;
            /*height: 80px;*/
            padding: 0 10px 5px 10px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.5);
            position: relative;
            left: 15px;
            bottom: 30px;
            z-index: 20;
            font-size: 14px;
            /*padding-bottom: 20px;*/


            .left {
                width: 30px;
                height: 25px;
            }

            .right {
                margin-left: 5px;
                width: 290px;
                height: 25px;
            }



            .receive-address{
                width: 100%;
                /*height: 60px;*/
                display: flex;
                text-align: left;
                position: relative;

              .receive-address-left{
                width: 30px;
              }

              .receive-address-right{

                margin-left: 5px;
              }

                .delivery-info{
                    /*height: 40px;*/
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    width: 278px;
                }

                img{
                    position: relative;
                    top: 10px;
                    width: 24px;
                    height: auto;
                }

                .update-update{
                    margin-top: 5px;
                    color: #808080;
                }

                .forward{
                    display: flex;
                    width: 20px;
                    height: 100%;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    img{
                        top: 0;
                        height: 15px;
                        width: auto;
                    }
                }
            }



            .receive-info {
                width: 100%;
                /*height: 60px;*/
                display: flex;
                text-align: left;
                padding-bottom: 2px;

                .left{
                  display: inline-block;
                  height: 100%;

                  img {
                    position: relative;
                    top: 10px;
                    height: 25px;
                    width: auto;
                  }
                }



                .right{
                  display: inline-block;
                  height: 100%;

                  .name-phone {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    height: 25px;
                    margin-top: 10px;
                  }

                  .address {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    text-align: left;
                    line-height: 17px;
                    color: #808080;
                  }
                }

            }

        }


        .good{
            width: 100%;
            background-color: white;
            /*padding-top: 110px;*/
            font-size: 15px;

            .good-one{
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e5e5;


                .good-info{
                    display: flex;
                    background-color: white;
                    width: 355px;
                    padding: 0 10px;
                    margin-bottom: 10px;

                    img{
                        height: 60px;
                        width: auto;
                        margin-right: 10px;
                    }
                }

                .buy-info{
                    text-align: left;
                    width: 335px;
                    /*height: 60px;*/
                    padding: 0 10px;
                    background-color: #f2f2f2;
                    margin: 0 auto;

                    div{
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }

        }



        .service{
            display: flex;
            width: 100%;
            height: 50px;
            justify-content: center;
            align-items: center;
            background-color: white;
            font-size: 14px;

            div,img{
                width: auto;
                height: 20px;
                margin-left: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            img{
                width: auto;
                height: 15px;
            }
        }

        .common{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 10px;
            height: 30px;

            div:nth-child(2){
                margin-left: 10px;
                color: #808080;
            }
        }


        .order{
            width: 100%;
            background-color: white;
            margin-top: 10px;
            font-size: 14px;


            .border{
                border-bottom: 1px solid #e5e5e5;
            }
        }


        .pay-info{
            margin-top: 10px;
            background-color: white;
            font-size: 14px;

            div{
            display: flex;
            justify-content: space-between;

            }


            .pay-total{
                display: flex;
                width: 100%;
                height: 50px;
                border-top: 1px solid #e5e5e5;
                justify-content: flex-end;
                align-items: center;

                div{
                    margin-right: 10px;
                    font-size: 15px;
                    color: #e54545;
                }

            }
        }


        .bottom{
            display: flex;
            width: 100%;
            height: 50px;
            align-items: center;
            justify-content: flex-end;
            background-color: white;
            margin-top: 10px;

            .bottom-common{
                display: flex;
                width: 70px;
                height: 35px;
                border: 1px solid #e5e5e5;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                margin-right: 10px;
            }

            .changeColor{
                background-color: #e54545;
                color: white;
                border: 1px solid #e54545;
            }
        }


    }

</style>

<!--订单详情-->
<template>
    <div class="orderDetail-container">
        <div class="head">
            <div class="content">
                <div>{{order.orderStateStr}}</div>
                <div v-if="order.orderState == 1 && getCancelTime(order)>120" style="font-size: .39rem">剩余时间：{{Math.floor(getCancelTime(order) / 60)}}分钟</div>
                <div v-if="order.orderState == 1 && getCancelTime(order)<=120" style="font-size: .39rem">剩余时间：<Countdown :value="getCancelTime(order)" @on-finish="finishCancel"></Countdown>秒</div>
                <div v-if="order.orderState == 3" style="font-size: .38rem">自动收货时间：{{order.autoReceiveDate}}</div>
            </div>



            <div class="receive">
                <div class="receive-address" v-if="order.orderState >2 && order.orderState <9">
                    <div class="left">
                        <img src="../../assets/img/delivery.png">
                    </div>
                    <div class="right">
                        <div class="delivery-info">
                            <div>{{order.deliveryUpdateContent}}</div>
                        </div>
                        <div class="update-update">
                            更新时间：{{order.deliveryUpdateDate}}
                        </div>
                    </div>
                    <div  class="forward">
                        <img src="../../assets/img/forward2.png">
                    </div>
                </div>

                <div class="receive-info">
                    <div class="left">
                        <img src="../../assets/img/position.png">
                    </div>
                    <div class="right">
                        <div class="name-phone">
                            <div>{{order.addressInfo.receiveName}}&nbsp;&nbsp;&nbsp;{{order.addressInfo.receivePhone}}</div>
                        </div>
                        <div class="address">
                            {{order.addressInfo.addressArea+order.addressInfo.addressDetail}}
                        </div>
                    </div>
                </div>
            </div>

        </div>



        <div class="good">
            <div class="good-one" v-for="item in order.goods">
                <div class="good-info">
                    <img v-lazy="item.img">
                    <div>{{item.name}}</div>
                </div>
                <div class="buy-info">
                    <div>商品规格：红色</div>
                    <div style="display: flex;justify-content: space-between">
                        <div style="color: #e54545">¥{{item.price}}</div>
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
                <div>{{order.orderId}}</div>
            </div>
            <div class="common border">
                <div>下单时间</div>
                <div>{{order.orderDate}}</div>
            </div>
            <div class="common border">
                <div>支付方式</div>
                <div>微信支付</div>
            </div>
            <div class="common border">
                <div>配送快递</div>
                <div>顺丰快递</div>
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
        </div>

        <div class="pay-info">
            <div class="common">
                <div>商品金额</div>
                <div>¥{{order.totalPrice}}</div>
            </div>
            <div class="common">
                <div>运费</div>
                <div>¥0</div>
            </div>

            <div class="pay-total">
                <div>合计：¥{{order.paymentAmount}}</div>
            </div>
        </div>

        <div class="bottom" v-if="order.orderState == 1">
            <div class="bottom-common">取消订单</div>
            <div class="bottom-common changeColor" @click="pay">立即付款</div>
        </div>

        <div class="bottom" v-if="order.orderState == 2">
            <div class="bottom-common">申请退款</div>
        </div>

        <div class="bottom" v-if="order.orderState == 3">
            <div class="bottom-common changeColor">确认收货</div>
        </div>

        <div class="bottom" v-if="order.orderState>3">
            <div class="bottom-common">删除订单</div>
            <div class="bottom-common changeColor">再次购买</div>
        </div>

    </div>
</template>


<script>
    import { Countdown } from 'vux'

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


            // 模拟订单
            this.orders.push({
                orderId: "TDX2019012816281234",
                orderState:1,//订单状态
                orderStateStr:'待付款',//订单状态描述
                orderDate:'2019-01-21 21:51:21',//下单时间
                paymentAmount:9106,//支付金额
                goodCount:6,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: "TDX2019012816281235",
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1058,
                    buyCount:5,
                    img: 'img/good/4.jpg'
                },
                    {
                        id: 128,
                        name: '戴尔电脑',
                        originalPrice:3855,
                        price: 3566,
                        buyCount:1,
                        img: 'img/good/5.jpg'
                    }]
            });


            this.orders.push({
                orderId: "TDX2019012816281235",
                orderState:1,//订单状态
                orderStateStr:'待付款',//订单状态描述
                orderDate:'2019-01-21 21:46:21',//下单时间
                paymentAmount:4980,//支付金额
                goodCount:4,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 256,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1245,
                    buyCount:4,
                    img: 'img/good/3.jpg'
                }]
            });


            this.orders.push({
                orderId: "TDX2019012816281236",
                orderState:2,//订单状态
                orderStateStr:'待发货',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:4624,//支付金额
                goodCount:2,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 125,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1058,
                    buyCount:1,
                    img: 'img/good/1.jpg'
                },
                    {
                        id: 128,
                        name: '戴尔电脑',
                        originalPrice:3855,
                        price: 3566,
                        buyCount:1,
                        img: 'img/good/2.jpg'
                    }]
            });



            this.orders.push({
                orderId: "TDX2019012816281237",
                orderState:3,//订单状态
                orderStateStr:'已发货',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:2490,//支付金额
                goodCount:2,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 256,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1245,
                    buyCount:3,
                    img: 'img/good/3.jpg'
                }]
            });


            this.orders.push({
                orderId: "TDX2019012816281238",
                orderState:3,//订单状态
                orderStateStr:'已发货',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:4624,//支付金额
                goodCount:2,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 125,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1058,
                    buyCount:1,
                    img: 'img/good/1.jpg'
                },
                    {
                        id: 128,
                        name: '戴尔电脑',
                        originalPrice:3855,
                        price: 3566,
                        buyCount:1,
                        img: 'img/good/2.jpg'
                    }]
            });



            this.orders.push({
                orderId: "TDX2019012816281239",
                orderState:4,//订单状态
                orderStateStr:'已收货',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:2490,//支付金额
                goodCount:2,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 256,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1245,
                    buyCount:2,
                    img: 'img/good/3.jpg'
                }]
            });


            this.orders.push({
                orderId: "TDX2019012816281240",
                orderState:5,//订单状态
                orderStateStr:'退款中',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:6890,//支付金额
                goodCount:4,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 125,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1058,
                    buyCount:3,
                    img: 'img/good/1.jpg'
                },
                    {
                        id: 128,
                        name: '戴尔电脑',
                        originalPrice:3855,
                        price: 3566,
                        buyCount:1,
                        img: 'img/good/2.jpg'
                    }]
            });



            this.orders.push({
                orderId: "TDX2019012816281241",
                orderState:6,//订单状态
                orderStateStr:'已退款',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:1245,//支付金额
                goodCount:1,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 256,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1245,
                    buyCount:1,
                    img: 'img/good/3.jpg'
                }]
            });

            this.orders.push({
                orderId: "TDX2019012816281242",
                orderState:7,//订单状态
                orderStateStr:'退货中',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:1245,//支付金额
                goodCount:1,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 256,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1245,
                    buyCount:1,
                    img: 'img/good/3.jpg'
                }]
            });

            this.orders.push({
                orderId: "TDX2019012816281243",
                orderState:9,//订单状态
                orderStateStr:'已取消',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:1245,//支付金额
                goodCount:1,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 256,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1245,
                    buyCount:1,
                    img: 'img/good/3.jpg'
                }]
            });

            this.orders.push({
                orderId: "TDX2019012816281246",
                orderState:9,//订单状态
                orderStateStr:'已取消',//订单状态描述
                orderDate:'2019-01-21 16:08:21',//下单时间
                paymentAmount:1245,//支付金额
                goodCount:3,//商品件数

                totalPrice:9106,//总价（不含运费）
                deliveryMoney:0,//运费
                leaveWord:'',//留言
                sendDate:'2019-01-28 12:46:32',// 发货时间
                autoReceiveDate:'2019-02-04 12:46:32',// 自动收货时间，一般是发货时间+7天
                deliveryUpdateContent:'您已提交订单，请等待物流信息更新',//物流更新的内容
                deliveryUpdateDate:'2019-01-29 01:15:46',//物流更新时间
                addressInfo: {
                    addressId:1,//地址Id
                    addressArea:'广东省阳江市阳春市双窖镇',//所在地区（从省份到街道）
                    addressDetail:'双滘中心小学',//详细地址
                    receiveName:'黎国明',// 收货人
                    receivePhone:'13828600678',//收货手机号
                },
                goods:[{
                    id: 256,
                    name: '华为手机',
                    originalPrice:1108,
                    price: 1245,
                    buyCount:3,
                    img: 'img/good/4.jpg'
                }]
            });


            let orderId = this.$route.query.orderId;
            //模拟取数据
            let that = this
            this.orders.forEach((item)=>{
                if(orderId === item.orderId){
                    that.order = item
                    return
                }
            })

            console.log("订单",that.order)

        },
        methods:{
            // 获取订单取消剩余时间，单位是秒
            getCancelTime(order){
                let seconds = 3600 - (new Date() - new Date(order.orderDate))/1000;
                // console.log("时间差",seconds,order.orderDate);
                return Math.floor(seconds);
            },
            finishCancel(){
                // 付款时间到，需重新刷新页面
            },
            pay(){
            //请求后台，更新订单：收货信息以及留言，然后向微信发起预支付订单，并返回
            let that = this
            /**
             * 微信jsapi支付
             */
            function onBridgeReady(){
              // alert(res.data.appId+","+res.data.timeStamp+","+res.data.nonceStr+","+res.data.package+","+res.data.signType+","+res.data.paySign);
              //{timeStamp=1550326641, package=prepay_id=wx162214100027281c691eaa053398715316, paySign=531A7C1612714CED7EDB6A478E4639A0, appId=wx3411d52f54a19541, signType=MD5, nonceStr=3oFeCTai5HEZ3PRpvK2UuSSxbdQf8lQR}
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId":"wx3411d52f54a19541",     //公众号appId
                  "timeStamp":"1550328326",  //时间戳
                  "nonceStr":"veiKFb75dr72zPzOifmatSJUkb64pJNw", //随机字符串串
                  "package":"prepay_id=wx16224526759016e0b25b61c32481541413",
                  "signType":"MD5", //微信签名方式：
                  "paySign":"DB8A2CBF0D583CA202FA45BF8ACAC992" //微信签名
                },
                function(res){
                  // console.log(res);
                  alert(res.err_code+","+res.err_desc+","+res.err_msg);
                  if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    //支付成功，跳转到支付成功页面
                    //跳转到支付结果页面
                    that.$router.push({name:'payResult',query:{payResult:"success"}})
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
            padding: 0 10px 10px 10px;
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
                height: 60px;
                display: flex;
                text-align: left;
                position: relative;

                .delivery-info{
                    /*height: 40px;*/
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
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
                height: 60px;
                display: flex;
                text-align: left;

                img {
                    position: relative;
                    top: 10px;
                    height: 25px;
                    width: auto;
                }

                .name-phone {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    height: 25px;
                    margin-top: 10px;
                }

                .address {
                    text-align: left;
                    line-height: 17px;
                    color: #808080;
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

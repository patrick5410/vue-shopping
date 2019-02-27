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
        <div>{{order.paymentAmount.toFixed(2)}}元</div>
        <div>{{order.orderId}}</div>
        <div class="receive-info">
          <div>{{order.addressInfo.addressArea+order.addressInfo.addressDetail}}</div>
          <div>{{order.addressInfo.receiveName}}&nbsp;&nbsp;&nbsp; {{order.addressInfo.receivePhone}}</div>
        </div>
      </div>
    </div>

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

    <!--成功-->
    <div v-if="$route.query.payResult === 'success'" class="pay-order-info">
      <div class="order-detail" @click="toOrderDetail(order)">查看订单</div>
      <div class="order-detail toindex" @click="toIndex">返回首页</div>
    </div>

    <!--失败-->
    <div v-else class="pay-div">
      <div class="pay-money">
        <div class="paymentAmount">
          合计：<span style="color: #995454">¥{{order.paymentAmount.toFixed(2)}}元</span>
        </div>
        <div class="pay-money-cancelTime">
          距订单关闭还有{{getCancelTime(order)}}分钟
        </div>
      </div>
      <div class="pay-button">
        <div style="background-color: #3d7a99" @click="pay">立即支付</div>
        <div @click="toOrderDetail(order)">查看订单</div>
      </div>
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
    data(){
      return{
        order:{}//订单
      }
    },
    created(){
      this.order = this.$store.state.order
    },
    beforeDestroy() {
      // console.log("页面跳转之前");
      //页面关闭前把当前订单设为null
      if(this.$route.query.payResult === 'success'){
        this.$store.state.order = null
      }
    },

    methods: {
      // 获取订单取消剩余时间，单位是分钟
      getCancelTime(order){
        let seconds = 3600 - (new Date() - new Date(order.createDate))/1000;
        return Math.floor(seconds/60);
      },
      toOrderDetail(item){
        this.$router.push({name:'orderDetail',query:{orderId:item.orderId}})
      },
      toIndex(){
        this.$router.push({name:'index'})
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
              //{timeStamp=1550326641, package=prepay_id=wx162214100027281c691eaa053398715316, paySign=531A7C1612714CED7EDB6A478E4639A0, appId=wx3411d52f54a19541, signType=MD5, nonceStr=3oFeCTai5HEZ3PRpvK2UuSSxbdQf8lQR}
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
                    //支付成功，跳转到支付成功页面
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
              text: '生成预支付单号失败'
            })

          } })




      },
    }
  }

</script>


<style lang="scss" scoped>
  .payResult-container{
    width: 100%;
    height: 100vh;
    background-color: #e5e5e5;

    .payResult-img{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 200px;
      background-color: white;
      font-size: 16px;


      .pay-success,.pay-fail{
        width: 100px;
        height: 100%;
        background-size: 100px;
        background-position: center center;
        background-repeat: no-repeat;
        position: relative;
      }

      .pay-success{
        background-image: url("../../assets/img/paySuccess.png");
        color: #3d998a;
      }


      .pay-fail{
        background-image: url("../../assets/img/payFail.png");
        color: #995454;
      }

      .pay-result-tip{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 25px;
      }

      .pay-result-tip2{
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


    .order-info{
      display: flex;
      width: 355px;
      height: 100px;
      background-color: white;
      margin-top: 15px;
      padding: 0 10px;
      justify-content: flex-start;

      .order-info-left{
        width: 55px;
        color: #808080;

        div{
          display: flex;
          width: 100%;
          height: 25px;
          align-items: center;
        }

      }

      .order-info-right{
        margin-left: 10px;
        width: 320px;

        div{
          display: flex;
          width: 100%;
          height: 25px;
          align-items: center;
        }

        .receive-info{
          display: block;
          text-align: left;



        }

      }

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
        background-image: url("../../assets/img/weixin.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 25px 22px;
        padding-left: 30px;
        align-items: center;

      }
    }


    .pay-order-info{
      display: flex;
      width: 100%;
      height: 49px;
      background-color: white;
      position: fixed;
      bottom: 0;
      justify-content: space-between;
      align-items: center;

      .order-detail{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 30px;
        background-color: #3d7a99;
        color: white;
        border-radius: 5px;
        font-size: 15px;
        margin-left: 15px;
      }

      .toindex{
        margin-right: 15px;
        background-color: #995454
      }

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
        /*display: flex;*/
        margin-left: 10px;
        /*align-items: center;*/
        text-align: left;

        .paymentAmount{
          margin-top: 5px;
        }

        .pay-money-cancelTime{

          font-size: 12px;
          color: #808080;
        }

      }

      .pay-button{
        display: flex;
        width: 200px;
        justify-content: center;
        align-items: center;
        background-color: #995454;
        color: white;

        div{
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

  @icon-success-color:#995454;
</style>

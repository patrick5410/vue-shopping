<!--支付页面-->
<template>
  <div class="pay-container" v-if="$store.state.order">
    <div class="receive-info">
      <div class="receive-info-left">
        <div>{{$store.state.order.addressInfo.receiveName}}</div>
        <!--<div>{{$store.state.order.addressInfo.addressArea}}</div>-->
        <div>佛山科学技术学院</div>
      </div>

      <div class="receive-info-right">
        <div style="margin-right: .25rem">{{$store.state.order.addressInfo.receivePhone}}</div>
        <div style="align-items: center;" @click="toAddressManage">
          <img class="forward_right" src="../../assets/img/forward_right.png">
        </div>
      </div>
    </div>
    <div class="receive-bottom"></div>

    <div class="pay_type" @click="$store.state.order.paymentType=0">
      <div class="weixin">
        微信支付
      </div>
      <div style="display:flex;align-items: center">
        <box v-show="$store.state.order.paymentType===0">
          <icon type="success"></icon>
        </box>
      </div>
    </div>

    <div class="pay_type2" v-if="$store.state.order.sellUserId===0" @click="$store.state.order.paymentType=1">
      <div class="weixin">
        积分抵购
      </div>
      <div style="display:flex;align-items: center">
        <box v-show="$store.state.order.paymentType===1">
          <icon type="success"></icon>
        </box>
      </div>
    </div>

    <div class="good-detail">
      <div class="good-detail-title" style="text-align: left">书籍详细</div>

      <div class="good" v-for="(item,index) in $store.state.order.goods">
        <div class="good-left">
          <div class="good-img">
            <img :src="item.goodImg">
          </div>
          <div class="good-left-info">
            <div>{{item.goodName}}</div>
            <div style="color: #995454" v-if="$store.state.order.paymentType===1">{{item.goodScore}}积分</div>
            <div style="color: #995454" v-else>¥{{item.goodPrice.toFixed(2)}}</div>
            <div style="color: #808080">{{item.goodSpecificationItems}}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;color: #808080">x{{item.buyCount}}</div>
      </div>


      <!--<div class="good-common">-->
        <!--<div>可获积分</div>-->
        <!--<div style="color: #808080">{{$store.state.order.score}}分</div>-->
      <!--</div>-->
      <div class="good-common">
        <div>取书方式</div>
        <div style="color: #808080">上门取书</div>
      </div>
      <div class="good-common">
        <div>发票类型</div>
        <div style="color: #808080">不开发票</div>
      </div>
      <div class="good-common">
        <div>买家留言</div>
        <div>
          <input  style="color: #995454" class="leave-word" v-model="$store.state.order.leaveWord"  type="text" maxlength="20"  placeholder="填写订单备注">
        </div>
      </div>
    </div>


    <div style="padding-bottom: 6rem">
      <div class="pay-info">
        <div>
          <div>书籍总价</div>
          <div style="color: #995454" v-if="$store.state.order.paymentType===1">{{$store.state.order.score}}积分</div>
          <div style="color: #995454" v-else>¥{{$store.state.order.totalPrice.toFixed(2)}}</div>
        </div>
        <!--<div>-->
          <!--<div>运费</div>-->
          <!--<div style="color: #995454">+¥{{$store.state.order.deliveryMoney.toFixed(2)}}</div>-->
        <!--</div>-->
      </div>
    </div>

    <!--详细地址-->
    <div class="detail-address">
      &nbsp;您的宿舍：{{$store.state.order.addressInfo.addressDetail}}
    </div>
    <!--支付按钮-->
    <div class="pay-div">
      <div class="pay-money">合计：
        <span style="color: #995454" v-if="$store.state.order.paymentType===1">{{$store.state.order.score}}积分</span>
        <span style="color: #995454" v-else>¥{{$store.state.order.paymentAmount.toFixed(2)}}</span>
      </div>
       <div class="pay-button" @click="pay">去支付</div>
    </div>

  </div>
</template>

<script>
  import {  Box,Icon} from 'vux'
  import Vue from 'vue'
  import { ToastPlugin,LoadingPlugin } from 'vux'

  Vue.use(ToastPlugin)
  Vue.use(LoadingPlugin)

  export default {
    components: {
      Box,
      Icon
    },
    data: function () {
      return {
        // order:{},//订单中有地址，但未填写，在付款后地址才补全
        // addressInfo:{},//地址信息，含有手机号码等信息

      }
    },
    computed: {
      getOrder () {
        return this.$store.state.order
      }
    },
    watch:{
      getOrder:function(val) {
        if(val){
          this.order = val
          if(val.orderState !== 1){
            // 当前订单不是待付款状态，需要跳转到订单详情页面
            this.$router.push({name:'orderDetail',query:{orderId:val.orderId}})
          }
        }
      }
    },
    created(){

      //这个页面this.$store.state.order一定会存在
      this.order = this.$store.state.order
      console.log("order",this.order)
      // if(!this.$store.state.order && this.$route.query.orderId){
      //   //直接进入这个页面的，需要从后台获取
      //   this.$store.commit("getOrder",{ data: { orderId: this.$route.query.orderId }})
      // }else {
      //   this.$vux.toast.show({
      //     type: 'warn',
      //     text: '订单页面出错，准备跳转到首页'
      //   })
      //
      //   let that = this
      //   setTimeout(function () {
      //     that.$router.push({name:'index'})
      //   },2000)
      //
      // }


    },
    mounted() {
      this.$nextTick(() => {



      })
    },
    methods:{
      pay(){
        if(!this.$store.state.order.addressInfo || !this.$store.state.order.addressInfo.addressId){
          this.$vux.toast.show({
            type: 'text',
            width: '11em',
            text: '请先选择收货地址'
          })
          return
        }

        let href = 'http://www.tdxiov.com/shopping/testPay?orderId='+this.$store.state.order.orderId+'&addressId='
          +this.$store.state.order.addressInfo.addressId+"&leaveWord="+this.$store.state.order.leaveWord
          +"&userId="+this.$store.state.userInfo.userId+"&callBack="+encodeURIComponent("http://www.lzcj.site/shopping/order")
        // alert("请求链接："+href)
        window.location.href = href
        //请求后台，更新订单：收货信息以及留言，然后向微信发起预支付订单，并返回
        // let that = this
        // that.$vux.loading.show({
        //   text: '正在支付中'
        // })
        // this.$store.commit('payOrder', { data: { orderId: this.$store.state.order.orderId,addressId: this.$store.state.order.addressInfo.addressId,leaveWord: this.$store.state.order.leaveWord }
        // ,successCallBack: function (data) {
        //     //关闭加载框
        //     that.$vux.loading.hide()
        //   //生成预支付单号成功
        //     console.log("预支付单号",data)
        //     /**
        //      * 微信jsapi支付
        //      */
        //     function onBridgeReady(){
        //       // alert(res.data.appId+","+res.data.timeStamp+","+res.data.nonceStr+","+res.data.package+","+res.data.signType+","+res.data.paySign);
        //       //{timeStamp=1550326641, package=prepay_id=wx162214100027281c691eaa053398715316, paySign=531A7C1612714CED7EDB6A478E4639A0, appId=wx3411d52f54a19541, signType=MD5, nonceStr=3oFeCTai5HEZ3PRpvK2UuSSxbdQf8lQR}
        //       WeixinJSBridge.invoke(
        //         'getBrandWCPayRequest', {
        //           "appId":data.appId,     //公众号appId
        //           "timeStamp":data.timeStamp,  //时间戳
        //           "nonceStr":data.nonceStr, //随机字符串串
        //           "package":data.package,
        //           "signType":data.signType, //微信签名方式
        //           "paySign":data.paySign //微信签名
        //         },
        //         function(res){
        //           // console.log(res);
        //           // alert(res.err_code+","+res.err_desc+","+res.err_msg);
        //           if(res.err_msg == "get_brand_wcpay_request:ok" ){
        //             // 使用以上方式判断前端返回,微信团队郑重提示：
        //             //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        //             //支付成功，跳转到支付成功页面
        //             //跳转到支付结果页面
        //             that.$router.push({name:'payResult',query:{payResult:"success"}})
        //           }else {
        //             that.$router.push({name:'payResult'})
        //           }
        //         });
        //     }
        //
        //     //弹出支付窗口
        //     if (typeof WeixinJSBridge == "undefined"){
        //       if( document.addEventListener ){
        //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        //       }else if (document.attachEvent){
        //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        //       }
        //     }else{
        //       onBridgeReady();
        //     }
        //
        //
        //
        //   },failCallBack:function () {
        //     //关闭加载框
        //     that.$vux.loading.hide()
        //     //生成预支付单号失败
        //     that.$vux.toast.show({
        //       type: 'cancel',
        //       text: '生成预支付单号失败'
        //     })
        //
        //   } })




      },
      toAddressManage(){
        //跳转到选择地址页面（管理地址）
        this.$store.state.choosedAddress = this.$store.state.order.addressInfo
        this.$router.push({name:'personalAdrress'})
      }
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
      background-image: url("../../assets/img/receive_bottom.png");
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
        background-image: url("../../assets/img/weixin.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 25px 22px;
        padding-left: 30px;
        align-items: center;

      }


    }

    .pay_type2{
      display: flex;
      height: 40px;
      background-color: white;
      /*margin-top: 10px;*/
      justify-content: space-between;
      width: 355px;
      padding: 0 10px;
      border-top: 1px solid #e5e5e5;

      .weixin{
        display: flex;
        width: 100px;
        background-image: url("../../assets/img/jifen.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 31px 27px;
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

            img{
              height: 100%;
              width: auto;
              max-width: 100%;
            }

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
      height: 40px;
      padding: 0 10px;
      background-color: white;
      margin-top: 15px;


      div{
        display: flex;
        height: 40px;
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

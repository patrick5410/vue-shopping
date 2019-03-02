<!--个人中心-->
<template>
  <div class="personal-container">
    <div class="head">
      <div class="content">
        <div v-if="$store.state.userInfo.wechatInfo" class="head-img-div">
          <img class="head-img" :src="$store.state.userInfo.wechatInfo.headimgurl">
          <div class="nickname">{{$store.state.userInfo.wechatInfo.nickname}}</div>
        </div>
        <div v-else class="head-img-div">
          <img class="head-img" src="../../assets/img/good/加载.png">
          <div class="nickname">您的昵称</div>
        </div>

        <div class="head-right" @click="toPersonalData"></div>
      </div>

    </div>

    <div class="orders">
      <div class="orders-head">
        <div class="orders-head-left">我的订单</div>
        <div class="orders-head-right" @click="toOrder(0)">
          <div>全部订单</div>
          <img style="height: 100%;width: auto;margin-left: .4rem" src="../../assets/img/forward_right.png">
        </div>
      </div>

      <div class="common">
        <div @click="toOrder(1)">
          <img src="../../assets/img/unpay.png">
          <div>待付款</div>
        </div>
        <div  @click="toOrder(2)">
          <img src="../../assets/img/unreceive.png">
          <div>待收货</div>
        </div>
        <div  @click="toOrder(3)">
          <img src="../../assets/img/receive.png">
          <div>已收货</div>
        </div>
        <div  @click="toOrder(4)">
          <img src="../../assets/img/after_sale.png">
          <div>已退款</div>
        </div>
      </div>
    </div>

    <div class="other-entrance">
      <div class="common">
        <div @click="toAddressManage">
          <img src="../../assets/img/address_management.png">
          <div>地址管理</div>
        </div>
        <div @click="toCollect">
          <img src="../../assets/img/collect.png">
          <div>我的收藏</div>
        </div>
        <div>
          <img src="../../assets/img/after_sale2.png">
          <div>售后中心</div>
        </div>
        <div>
          <img src="../../assets/img/service2.png">
          <div>联系客服</div>
        </div>
      </div>
    </div>

    <!--底部菜单-->
    <Menu></Menu>
  </div>
</template>

<script>
  import Menu from '@/components/Menu'

  export default {
    components: {
      Menu
    },
    methods:{
      toPersonalData() {
        //跳转到个人资料
        this.$router.push({name:'personalData'})
      },
      toOrder(index){
        //跳转到订单管理
        this.$router.push({name:'order',query:{index:index}})
      },
      toAddressManage(){
        //跳转到地址管理
        this.$router.push({name:'addressManage'})
      },
      toCollect(){
        //跳转到收藏
        this.$router.push({name:'collect'})
      }
    }

  }

</script>


<style lang="less" scoped>
.personal-container{
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #e5e5e5;

  .head{
    display: flex;
    width: 100%;
    height: 175px;
    background-image: url("../../assets/img/personalHeadBg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    align-items: center;

    .content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 355px;
      height: 60px;
      padding: 0 10px;
      /*background-color: white;*/

      .head-img-div{
        display: flex;
        height: 60px;
        width: 250px;
        /*background-color: blue;*/
        justify-content: flex-start;
        align-items: center;

        .head-img{
          height: 100%;
          width: 60px;
          border-radius: 100%;
        }

        .nickname{
          margin-left: 10px;
          color: white;
          font-size: 16px;
        }

      }

      .head-right{
        position: absolute;
        right: 10px;
        width: 12px;
        height: 20px;
        background-image: url("../../assets/img/personalForwardRight.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

      }

    }
  }


  .orders{
    width: 355px;
    height: 105px;
    background-color: white;
    border: 1px solid white;
    position: absolute;
    top:145px;
    left: 10px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
    border-radius: 10px;

    .orders-head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 335px;
      height: 30px;
      padding: 0 10px;

      .orders-head-left{
        font-size: 14px;
      }

      .orders-head-right{
        display: flex;
        width: 150px;
        height: 14px;
        justify-content: flex-end;
        align-items: center;
        font-size: 12px;
        color: #808080;

      }


    }

  }

  .common{
    display: flex;
    width: 355px;
    height: 70px;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;

    img{
      width: 36px;
      height: 36px;
    }

  }

  .other-entrance{
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: absolute;
    top:260px;
    left: 0;

  }

}


</style>

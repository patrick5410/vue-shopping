<!--购物车-->
<template>
  <div id="cart">
    <div class="myCart">
      <div v-if="goods==null || goods.length<=0">
        <img @click="toClz" src="../../assets/img/cart_empty.png" style="width: 100%;height: 100%">
      </div>
      <div v-else>
        <!--购物车头部-->
        <div class="cart-head">
          <div class="cart-head-left" @click="selectAll">
            <x-icon v-show="isSelectAll" type="ios-checkmark" size="0.7rem" ></x-icon>
            <x-icon v-show="!isSelectAll" type="ios-circle-outline" size="0.7rem" class="unSelected"></x-icon>
            全选
          </div>
          <div class="cart-head-right">
            已免运费
          </div>
        </div>
        <!--购物车商品-->
        <div class="cart-good">
          <swipeout>
            <swipeout-item transition-mode="follow"  class="cart-good-one" v-for="(item,index) in goods" >
              <div slot="right-menu">
                <swipeout-button v-if="item.isCollect" @click.native="collectGood(item)" type="primary" background-color="#d7d6da" :width="130/750*containerWidth">已收藏</swipeout-button>
                <swipeout-button v-else="item.isCollect" @click.native="collectGood(item)" type="primary" background-color="#ff9600" :width="130/750*containerWidth">收藏</swipeout-button>
                <swipeout-button @click.native="deleteGood(item)" type="warn" :width="110/750*containerWidth">删除</swipeout-button>
              </div>
              <div slot="content" class="demo-content vux-1px-t cart-good-swipe">
                <!--左边勾选框-->
                <div class="good-one-left" @click="item.isSelected=!item.isSelected">
                  <x-icon v-show="item.isSelected" type="ios-checkmark" size="0.7rem" ></x-icon>
                  <x-icon v-show="!item.isSelected" type="ios-circle-outline" size="0.7rem" class="unSelected"></x-icon>
                </div>
                <!--右边商品-->
                <div class="good-one-right">
                  <div class="good-img" @click="goodDetail(item.id)">
                    <img :src="item.img" style="width: 100%;height: auto">
                  </div>
                  <div class="good-info">
                    <div class="goodName" @click="goodDetail(item.id)">{{item.name}}</div>
                    <div class="goodPrice">¥{{item.price}}元</div>
                    <div class="buyCount">
                      <div class="buyCount-cut" @click="item.buyCount>1?item.buyCount--:1">-</div>
                      <input class="buyCount-input" type="number" v-model="item.buyCount" @blur="changeCount(item)"></input>
                      <div class="buyCount-add" @click="item.buyCount<item.maxNum?item.buyCount++:item.maxNum">+</div>
                    </div>
                  </div>
                  <div class="good-sore">可获积分：10分</div>
                </div>
              </div>
            </swipeout-item>

          </swipeout>

        </div>

      </div>
    </div>

    <!--猜你喜欢-->
    <div class="guess-like" :style="selectCount>0?'paddingBottom:3rem':''">
      <div class="guess-like-title">可能您会喜欢</div>
      <Show2goods :goods="guessGoods" style="padding: 0"></Show2goods>
    </div>


    <!--结算栏-->
    <div class="pay-div" v-show="selectCount>0">
      <div class="pay-div-left" @click="selectAll">
        <x-icon v-show="isSelectAll" type="ios-checkmark" size="0.7rem" ></x-icon>
        <x-icon v-show="!isSelectAll" type="ios-circle-outline" size="0.7rem" class="unSelected"></x-icon>
        全选
      </div>

      <div class="pay-div-right">
        <div class="pay-info">
          合计：
          <span style="color: #995454">{{totalPrice.toFixed(2)}}元</span>
        </div>
        <div class="pay" @click="toPayPage">
          结算({{parseInt(selectCount)}})
        </div>
      </div>
    </div>

    <!--底部菜单栏-->
    <Menu/>
  </div>
</template>

<script>
  import Show2goods from '@/components/Show2goods'
  import Menu from '@/components/Menu'
  import { Swipeout, SwipeoutItem, SwipeoutButton,Checklist } from 'vux'

  export default {
    name: 'cart',
    components: {
      Show2goods,
      Menu,
      Checklist,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
    },
    data: function () {
      return {
        containerWidth:750,//容器高度
        goods: [{}], //商品
        guessGoods: [],//可能喜欢商品
        isSelectAll:false,
        selectCount:0,//已选中总数量
        totalPrice:0,//选中商品总价
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.containerWidth = window.innerWidth
        console.log("containerHeight",this.containerWidth)


        for (let i = 0; i < 8; i++) {
          this.guessGoods.push({
            id: i,
            name: '车载配件' + i,
            originalPrice: 1500,
            price: 1058 + Math.floor(Math.random() * 200),
            sellCount: Math.floor(Math.random() * 200),
            img: 'img/good/' + (i + 1) + '.jpg',
            isSelected:false,
            buyCount:1,//购买数量
            maxNum:200,//单件购买最大数量
            isCollect:i%2==1,//是否已收藏
          })

        }

        this.goods = this.guessGoods;

      })
    },
    methods: {
      toClz() {
        //跳转到分类
        this.$router.push({name:'clz'})
      },
      collectGood(item){
        //移至收藏
        alert("收藏商品成功");
        //删除商品
        this.deleteGood(item);
      },
      deleteGood(item){
        //删除购物车商品
        let index = this.goods.indexOf(item)
        if(index>-1){
          this.goods.splice(index,1)
        }
      },
      selectAll(){
        //选择所有的商品或取消所有的商品
        this.isSelectAll = !this.isSelectAll;
          this.goods.forEach((item)=>{
            if(this.isSelectAll){
              item.isSelected = true;
            }else {
              item.isSelected = false;
            }
          })
      },
      //商品详情页面
      goodDetail(goodId){
        this.$router.push({name:'good',query:{goodId:goodId}})
      },
      toPayPage(){
        //这里不用传选中商品id，直接存储在store中
        this.$router.push({name:'payPage'})
      },
      changeCount(item){
        console.log("item",item)
        if (item.buyCount || item.buyCount == ''){
          item.buyCount = 1
        }
      }

    },
    watch: {
      goods: {
        handler(val, oldVal){
         //开启深度监听，用于监听商品是否被选中和输入数量
          console.log("商品变化",val)
          this.selectCount = 0;
          this.totalPrice = 0;
          let selectKind = 0;//选中商品种类
          val.forEach((item)=>{
            if(item.isSelected){
              this.selectCount += parseInt(item.buyCount);
              this.totalPrice += parseInt(item.buyCount)*item.price.toFixed(2);
              selectKind++;
            }
          })
          //判断是否全选
          this.isSelectAll = this.goods.length == selectKind

        },
        deep:true
      }

    }


  }

</script>

<style lang="scss" scoped>
  #cart {
    background-color: #e5e5e5;
    font-size: 15px;
    /*font-weight: bold;*/
  }

  .myCart {
    width: 100%;
    /*height: 150px;*/
    border-bottom: 1px solid #e5e5e5;
    background-color: white;

    .cart-head {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 36px;
      border: 1px solid #e5e5e5;
      background-color: white;
      z-index: 10;
      /*justify-content: space-around;*/
      align-items: center;

      .cart-head-left {
        display: flex;
        /*position: absolute;*/
        /*left: 15px;*/
        /*top: 7px;*/
        margin-left: 10px;
        justify-content: center;
        align-items: center;
      }

      .cart-head-right {
        position: absolute;
        right: 15px;
        color: #808080;
      }

    }

    .cart-good {
      padding-top: 37px;
      width: 100%;

    }


    .cart-good-one{
      /*display: flex;*/
      width: 100%;
      /*height: 120px;*/
      border-bottom:  1px solid #e5e5e5;
      justify-content: center;


      .cart-good-swipe{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        /*padding: 0;*/

        .good-one-left{
          display: flex;
          width: 60px;
          height: 120px;
          justify-content: center;
          align-items: center;
          /*position: absolute;*/
          /*left: 0;*/

        }



        .good-one-right{
          /*display: flex;*/
          /*margin: auto 0;*/
          margin-top: 10px;
          width: 315px;
          height: 110px;
          text-align: left;
          font-size: 15px;
          position: relative;
          .good-img{
            position: relative;
            /*bottom: 20px;*/
            display: inline-block;
            width: 80px;
            height: 80px;
            background-color: #f2f2f2;
          }

          .good-info{
            display: inline-block;
            position: absolute;
            top: 0;
            margin-left: 20px;
            font-size: 14px;
            .goodName{
              /*margin: 5px 0;*/
              color: black;
            }

            .goodPrice{
              margin: 13px auto;
              color: #995454;
            }

            .buyCount{
              position: absolute;
              width: 84px;
              height: 18px;
              line-height: 18px;

              .buyCount-input{
                display: inline-block;
                position: absolute;
                line-height: 18px;
                top: 0;
                left: 21px;
                width: 40px;
                height: 100%;
                border: 1px solid #e5e5e5;
                font-size: 13px;
                text-align: center;
                outline:none;
              }



              .buyCount-cut,.buyCount-add{
                width: 20px;
                height: 100%;
                line-height: 18px;
                text-align: center;
                display: inline-block;
                border: 1px solid #e5e5e5;
              }

              .buyCount-cut{
                position: absolute;
                top: 0;
                left: 0;
              }

              .buyCount-add{
                position: absolute;
                top: 0;
                right: 0;

              }

            }

          }


          .good-sore{
            position: absolute;
            bottom: 5px;
            /*color: black;*/
            font-size: 13px;
            color: #808080;
          }

        }


      }





    }


  }


  .mycheckbox span{
    position: relative;
    input[type='checkbox'] {
      position: absolute;
      visibility: hidden;
    }
    input[type='checkbox'] + label {
      display: inline-block;
      width: 0.55rem;
      height: 0.55rem;
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      justify-content: center;
    }

    input[type='checkbox']:checked + label:after {
      content: "";
      position: absolute;
      left: 0.1rem;
      bottom: 0.36rem;
      width: 0.28rem;
      height: 0.11rem;
      border: 0.056rem solid white;
      border-top-color: transparent;
      border-right-color: transparent;
      -ms-transform: rotate(-60deg);
      -moz-transform: rotate(-60deg);
      -webkit-transform: rotate(-60deg);
      transform: rotate(-45deg);
    }

    input[type='checkbox']:checked + label{
      background-color: #995454;
      border-color: #995454;
    }


    .text-label{
      display: inline-flex;
      /*line-height: 20px;*/
      /*justify-content: center;*/
      width: 50px;
      position: absolute;
      bottom: 5px;
      left: 25px;
    }

  }



  .guess-like {
    margin-top: 10px;
    padding-bottom: 60px;
    width: 100%;
    background-color: white;

    .guess-like-title {
      padding-top: 10px;
      display: flex;
      width: 100%;
      height: 30px;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
    }
  }


  .pay-div{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 60px;
    left: 0;
    background-color: white;
    /*border: 1px solid #e5e5e5;*/

    .pay-div-left{
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 75px;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e5e5e5;
    }

    .pay-div-right{
      width: 300px;
      height: 100%;
      /*background-color: aqua;*/
      position: absolute;
      right: 0;
      display: flex;
      justify-content: flex-end;

      .pay-info{
        display: flex;
        height: 100%;
        width: 180px;
        padding-right: 20px;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #e5e5e5;
      }

      .pay{
        border-top: 1px solid #995454;
        display: flex;
        background-color: #995454;
        width: 100px;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 16px;

      }


    }

  }


  .vux-x-icon {
    fill: #995454;
  }

  .unSelected{
    fill: #c9c9c9;
  }

  /*.mint-checkbox-core {*/
  /*top: 0.06rem;*/
  /*!*left: 0.18rem;*!*/
  /*border-radius: 100%;*/
  /*}*/


  /*.mint-checkbox-core::after {*/
  /*!*top: 0.10rem;*!*/
  /*!*left: 0.18rem;*!*/
  /*top: 0.06rem;*/
  /*width: 0.15rem;*/
  /*height: 0.3rem;*/
  /*}*/


  /*.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate {*/
  /*background-color: #f44336;*/
  /*border-color: #f44336;*/
  /*}*/

  /*.el-checkbox__input.is-checked + .el-checkbox__label {*/
  /*color: #f44336;*/
  /*}*/

  /*.el-checkbox__inner:hover {*/
  /*border-color: #f44336;*/
  /*}*/

  /*.el-checkbox__input.is-checked + .el-checkbox__label {*/
  /*color: #f44336;*/

  /*}*/

  /*.el-checkbox__inner {*/
  /*border-color: #dcdfe6;*/
  /*}*/

  /*.el-checkbox__input.is-focus {*/

  /*border-color: #606266;*/
  /*!*color: #f44336;*!*/
  /*}*/


</style>

<!--购物车-->
<template>
  <div id="cart">
    <div class="myCart">
      <div v-if="goods==null || goods.length<=0">
        <img @click="toClz" src="/img/cart_empty.png" style="width: 100%;height: 100%">
      </div>
      <div v-else>
        <!--购物车头部-->
        <div class="cart-head">
          <div class="cart-head-left">
            <div class="mycheckbox">
              <span ><input id="selectAll1" type="checkbox" v-model="isSelectAll"  value=true>
                <label for="selectAll1"></label>
                <label class="text-label"  for="selectAll1">全选</label>
              </span>
            </div>


          </div>

          <div class="cart-head-right">
            已免运费
          </div>
        </div>
        <!--购物车商品-->
        <div class="cart-good">
          <div class="cart-good-one" v-for="(item,index) in goods">
            <mt-cell-swipe :right="[ {
                content: '删除',
                style: { background: 'red', color: '#fff' },
                handler: deleteGood
                }]"  class="cart-good-swipe">

              <!--左边勾选框-->
              <div class="good-one-left">
                <div class="mycheckbox">
                  <span><input :id="'check'+index" :value="item" type="checkbox" v-model="selectGoods"><label :for="'check'+index"></label></span>
                </div>
              </div>

              <!--右边商品-->
              <div class="good-one-right">
                  <div class="good-img">
                    <img :src="item.img" style="width: 100%;height: auto">
                  </div>

                  <div class="good-info">
                    <div class="goodName">{{item.name}}</div>
                    <div class="goodPrice">{{item.price}}</div>
                    <InputNumber size="small" value="item.selectCount"></InputNumber>
                  </div>
                <div class="good-sore">可获得积分：10</div>
              </div>


            </mt-cell-swipe>

          </div>

        </div>


      </div>
    </div>

    <!--猜你喜欢-->
    <div class="guess-like">
      <div class="guess-like-title">可能您会喜欢</div>
      <Show2goods :goods="guessGoods" style="padding: 0"></Show2goods>
    </div>

    <!--底部菜单栏-->
    <Menu/>

  </div>
</template>

<script>
  import Show2goods from '@/components/Show2goods'
  import Menu from '@/components/Menu'
  import {Checkbox, CheckboxGroup,InputNumber} from 'element-ui'
  import {Checklist,CellSwipe } from 'mint-ui';
  // import {InputNumber} from 'iview'
  // import 'iview/dist/styles/iview.css'
  // import { XNumber } from 'vux'



  Vue.component(Checklist.name, Checklist);
  Vue.component(CellSwipe.name, CellSwipe);

  // import { Checklist } from 'mint-ui';
  import Vue from 'vue'


  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxGroup.name, CheckboxGroup);

  export default {
    name: 'cart',
    components: {
      Show2goods,
      Menu,
      InputNumber,
      // XNumber
    },
    data: function () {
      return {
        goods: [{}], //商品
        guessGoods: [],//可能喜欢商品
        selectGoods: [],//选中商品
        // selectGood: [],
        isSelectAll:false,
      }
    },
    mounted: function () {
      this.$nextTick(function () {


        for (let i = 0; i < 8; i++) {
          this.guessGoods.push({
            id: i,
            name: '车载配件' + i,
            originalPrice: 1500,
            price: 1058 + Math.floor(Math.random() * 200),
            sellCount: Math.floor(Math.random() * 200),
            img: '/img/good/' + (i + 1) + '.jpg',
            isSelected:true,
            selectCount:0
          })

        }

        this.goods = this.guessGoods;



      })
    },
    methods: {
      toClz() {
        //跳转到分类
        this.$router.push('/clz')
      },
      selectGood(){
        console.log("选中商品",this.goods);
      },
      deleteGood(){
        //删除购物车商品
        console.log("删除购物车商品");
      }

    },
    watch: {
      selectGoods: function (val) {
        console.log("已选中商品", val);
        if(val.length>0){
          //有商品被选中
          val.forEach((item)=>{
            console.log("选中的商品",item);
          })
        }else {

        }
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
        position: absolute;
        left: 15px;
        top: 7px;
        justify-content: center;
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
      display: flex;
      width: 100%;
      height: 100px;
      border-bottom:  1px solid blue;


      .cart-good-swipe{
        display: flex;
        width: 100%;
        height: 100%;
        /*justify-content: left;*/

        /*padding: 0;*/

        .good-one-left{
          display: flex;
          width: 60px;
          height: 100px;
          justify-content: center;
          line-height: 120px;
          /*position: absolute;*/
          /*left: 0;*/

        }



        .good-one-right{
          /*display: flex;*/
          width: 315px;
          height: 100px;
          text-align: left;
          font-size: 15px;
          position: relative;
          .good-img{
            position: relative;
            bottom: 20px;
            display: inline-block;
            width: 80px;
            height: 80px;
          }

          .good-info{
            display: inline-block;
            margin-left: 10px;
            .goodName{
              margin: 5px 0;
            }

          }


          .good-sore{
            position: absolute;
            bottom: 5px;
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
        left: 0.08rem;
        bottom: 0.35rem;
        width: 0.38rem;
        height: 0.18rem;
        border: 3px solid white;
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

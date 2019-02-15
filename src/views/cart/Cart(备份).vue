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
                style: { background: 'red', color: '#fff',lineHeight:'3rem' },
                handler: () => deleteGood(index)
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
                    <div class="goodPrice">¥{{item.price}}元</div>
                    <!--<input-number ></input-number>-->
                    <!--<XNumber  :value="item.selectCount" width="100px"></XNumber>-->
                    <!--<InlineXNumber></InlineXNumber>-->
                    <div class="buyCount">
                      <div class="buyCount-cut" @click="cut(item)">-</div>
                      <input class="buyCount-input" type="number" v-model="item.buyCount" v-on:input="countInputListen(index)" v-on:change="calculateBuyInfo"></input>
                      <div class="buyCount-add" @click="add(item)" >+</div>
                    </div>

                  </div>
                <div class="good-sore">可获积分：10分</div>
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


    <!--结算栏-->
    <div class="pay-div" v-show="selectGoods.length>0">
      <div class="pay-div-left">
        <div class="mycheckbox">
              <span ><input id="selectAll1" type="checkbox" v-model="isSelectAll"  value=true>
                <label for="selectAll1"></label>
                <label class="text-label"  for="selectAll1">全选</label>
              </span>
        </div>
      </div>

      <div class="pay-div-right">
        <div class="pay-info">
          合计：
          <span style="color: #995454">{{totalPrice.toFixed(2)}}元</span>

        </div>
        <div class="pay">
          结算({{selectCount}})
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
  // import {Checkbox, CheckboxGroup,InputNumber} from 'element-ui'
  import {CellSwipe } from 'mint-ui';
  // // import {InputNumber} from 'iview'
  // // import 'iview/dist/styles/iview.css'
  import { Checklist   } from 'vux'
  //
  //
  //
  // Vue.component(Checklist.name, Checklist);
  Vue.component(CellSwipe.name, CellSwipe);
  //
  // // import { Checklist } from 'mint-ui';
  import Vue from 'vue'
  //
  //
  // Vue.component(Checkbox.name, Checkbox);
  // Vue.component(CheckboxGroup.name, CheckboxGroup);

  export default {
    name: 'cart',
    components: {
      Show2goods,
      Menu,
      Checklist,
      // InputNumber,
      // XNumber,
      // InlineXNumber
    },
    data: function () {
      return {
        goods: [{}], //商品
        guessGoods: [],//可能喜欢商品
        selectGoods: [],//选中商品
        // selectGood: [],
        isSelectAll:false,
        selectCount:0,//已选中数量
        totalPrice:0,//选中商品总价
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
            img: 'img/good/' + (i + 1) + '.jpg',
            isSelected:true,
            buyCount:1,//购买数量
            maxNum:200,//单件购买最大数量
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
      deleteGood(index){
        //删除购物车商品
        this.goods.splice(index,1)
      },
      add(item){
        item.buyCount<item.maxNum?item.buyCount++:item.maxNum;
        this.calculateBuyInfo();
      },
      cut(item){
        item.buyCount>1?item.buyCount--:1
        this.calculateBuyInfo();
      },
      countInputListen(index){
        let item = this.goods[index];
        // console.log("输入商品数量事件",item);
        if(item.buyCount<0){
          item.buyCount = 0
        }
        if(item.buyCount>item.maxNum){
          // console.log("进入最大值")
          item.buyCount = item.maxNum

        }
        this.calculateBuyInfo();
      },
      calculateBuyInfo(){
        // console.log("执行该计算函数");
        if(this.selectGoods.length>0){
          //有商品被选中
          this.selectCount = 0;
          this.totalPrice = 0;
          this.selectGoods.forEach((item)=>{
            // console.log("选中的商品",item);
            this.selectCount += item.buyCount;
            this.totalPrice += item.buyCount*item.price;
          })
        }
      }

    },
    watch: {
      selectGoods: function (val) {
        // console.log("已选中商品", val);
        //每次改变，重新结算价格
        this.calculateBuyInfo();

        if(val.length == this.goods.length){
          this.isSelectAll = true;
        }else{
          this.isSelectAll = false;
        }
      },
      isSelectAll: function (val) {
        console.log("全选",val)
        if(val){
          this.selectGoods = [];
          this.selectGoods = this.goods;
        }else {
          if(this.selectGoods.length == this.goods.length){
            this.selectGoods = [];
          }
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
      height: 120px;
      border-bottom:  1px solid #e5e5e5;
      justify-content: center;


      .cart-good-swipe{
        display: flex;
        width: 100%;
        height: 100%;
        /*justify-content: left;*/

        /*padding: 0;*/

        .good-one-left{
          display: flex;
          width: 60px;
          height: 120px;
          justify-content: center;
          line-height: 120px;
          /*position: absolute;*/
          /*left: 0;*/

        }



        .good-one-right{
          /*display: flex;*/
          margin: auto 0;
          width: 315px;
          height: 100px;
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
            margin-left: 10px;
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
            bottom: 0;
            /*color: black;*/
            font-size: 14px;
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

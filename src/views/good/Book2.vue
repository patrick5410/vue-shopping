<!--个人卖书展示页面-->
<template>
  <div class="book2" v-if="$store.state.goodDetail">
    <div class="head">
      <div class="navigation-bar">
        <img src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png" @click="$router.back()"/>
        <img src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_homeNormal.png" />
      </div>
      <div class="book-img">
        <img :src="$store.state.goodDetail.img">
      </div>
      <div class="publish-box">
        <div class="book-title">{{ $store.state.goodDetail.subTitle }}</div>
        <div class="book-info">
          <div class="title">作者</div>
          <div class="content">{{ $store.state.goodDetail.author }} 著</div>
        </div>
        <div class="book-info">
          <div class="title">出版社</div>
          <div class="content">{{ $store.state.goodDetail.publishingHouse }}</div>
        </div>
        <div class="book-info">
          <div class="title">出版时间</div>
          <div class="content">{{ $store.state.goodDetail.publishingDate }}</div>
        </div>
        <div class="book-info">
          <div class="title">ISBN</div>
          <div class="content">{{ $store.state.goodDetail.ISBN }}</div>
        </div>
      </div>
    </div>
    <div class="book-detail">
      <div class="title">图书描述</div>
      <div class="content" v-html="$store.state.goodDetail.detailHtml">近腾中学——一所*所未有的学校，凭借难以想象的另类教学，维持着奇迹般的升学率。而在光鲜亮丽的成绩背后，反抗的种子正在悄悄萌芽。当近腾内部发生骚乱时，世界上出现了许多神秘事件：一辆大卡车无端腾空，无数神秘石碑从地底涌出。最终，人类在衰败的文明中苟延残喘。此时，近腾中学的一群高中生成了人类最后的炬火，最后的光……</div>
    </div>
    <div class="bottom-pane">
      <div class="collection" @click="collect">
        <div class="img">
          <img v-if="$store.state.goodDetail.isCollect" src="../../assets/img/collection.png" alt="collection">
          <img v-else src="../../assets/img/uncollection.png" alt="collection">
        </div>
        <!--<span v-if="!$store.state.goodDetail.isCollect">收藏</span>-->
        <!--<span v-else>取消收藏</span>-->
      </div>
      <div class="price" v-if="$store.state.goodDetail.price">
        ¥{{ $store.state.goodDetail.price.toFixed(2) }}<span class="original-price">原价：{{ $store.state.goodDetail.originalPrice.toFixed(2) }}元</span>
      </div>
      <div class="buy" @click="buy">
        <img src="../../assets/img/cart3.png"/>
        <div>去购买</div>
      </div>
    </div>
    <Popup v-model="popupVisible" position="bottom" class="toBuy">
      <div class="toBuy_container">
        <div class="good">
          <div><img :src="$store.state.goodDetail.img" alt="logo" /></div>
          <div class="text">
            <div class="name">{{ $store.state.goodDetail.name }}</div>
            <div class="price">¥{{ $store.state.goodDetail.price }}</div>
          </div>
          <div class="kucun">
            库存：{{ $store.state.goodDetail.remainCount }}件
          </div>
        </div>
        <div class="numSelect">
          <span style="color: #808080">数量</span><br>
          <InputNumber class="InputNumber" size="small" v-model="selectNum" :min="1" :max="$store.state.goodDetail.remainCount"></InputNumber>
        </div>
        <div class="button">
          <div class="buy" @click="toPayPage">
            <img src="../../assets/img/cart3.png"/>
            <div>去购买</div>
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
  import  { ConfirmPlugin,ToastPlugin} from 'vux'
  import Vue from 'vue'
  import  { LoadingPlugin } from 'vux'
  import {Badge,InputNumber} from 'element-ui'
  import {Popup} from 'mint-ui'

  Vue.use(LoadingPlugin)
  Vue.use(ConfirmPlugin)
  Vue.use(ToastPlugin)
  export default {
    components:{
      Popup,
      Badge,
      InputNumber
    },
    data(){
      return{
        selectNum: 1,// 购买数量
        popupVisible: false
      }

    },
    methods:{
      toPayPage(){
        if(!this.$store.state.goodDetail.onSell){
          this.$vux.toast.show({
            type:"text",
            width:"14em",
            text: '该书籍目前还没上架喔'
          })
          return
        }
        if(!this.$store.state.goodDetail.remainCount){
          this.$vux.toast.show({
            type:"text",
            width:"16em",
            text: '该书籍库存不足，稍后再试'
          })
          return
        }

        let specificationItemIds = [0]

        //这里不用传选中书籍id，直接存储在store中
        let that = this
        this.$store.commit("createOrder",{ data: { goodId: that.$store.state.goodDetail.id
            ,buyCount:that.selectNum
            ,goodSpecificationItemIds:specificationItemIds
          }
          ,successCallBack:function () {
            //成功
            that.$router.push({name:'payPage'})
          },failCallBack:function () {
            //失败
            that.$vux.toast.show({
              type:"warn",
              text: '生成订单出错'
            })
          } })


      },
      buy(){
        console.log("测试购买点击")
        if(!this.popupVisible){
          this.popupVisible= true
        }else {
          if(!this.$store.state.goodDetail.onSell){
            this.$vux.toast.show({
              type:"text",
              width:"14em",
              text: '该书籍目前还没上架喔'
            })
            return
          }
          //这里不用传选中书籍id，直接存储在store中
          let that = this
          this.$store.commit("createOrder",{ data: { goodId: that.$store.state.goodDetail.id
              ,buyCount:that.selectNum
              ,goodSpecificationItemIds:[0]
            }
            ,successCallBack:function () {
              //成功
              that.$router.push({name:'payPage'})
            },failCallBack:function () {
              //失败
              that.$vux.toast.show({
                type:"warn",
                text: '生成订单出错'
              })
            } })
        }
      },
      collect(){
        //收藏
        // this.goodDetail.isCollect = !this.goodDetail.isCollect
        if(!this.$store.state.goodDetail.isCollect){
          let that = this
          this.$store.commit("collectGood",{ data: { goodId: that.$store.state.goodDetail.id },successCallBack:function () {
              that.$store.state.goodDetail.isCollect = true
            } })
        }else {
          let that = this
          this.$store.commit("deleteCollect",{ data: { goodId: that.$store.state.goodDetail.id },successCallBack:function () {
              that.$store.state.goodDetail.isCollect = false
            } })
        }


      }
    }
  }
</script>

<style lang="less" scoped>
  .book2{
    width: 100%;
    font-size: 16px;

    .head{
      width: 100%;
      background-color: white;

      .navigation-bar{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img{
          margin: 0 10px;
          width: 40px;
          height: 100%;
        }
      }

      .book-img{
        width: 100%;
        height: 220px;

        img{
          height: 100%;
          width: auto;
          max-width: 375px;
        }
      }

      .publish-box{
        width: 335px;
        padding: 25px 20px 15px 20px;

        .book-title{
          font-size: 18px;
          margin-bottom: 16px;
          width: 335px;
        }

        .book-info{
          width: 100%;
          height: 27px;
          color: #999;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;

          .title{
            width: 70px;
            margin-right: 10px;
            text-align: left;
          }

          .content{
            color: #000;
            text-align: left;
            /*margin-top: 10px;*/
            /*padding: 20px;*/
            height: 100%;
            display: flex;
            align-items: center;

          }


        }
      }


    }

    .book-detail{
      margin-top: 10px;
      width: 335px;
      padding: 0 20px;
      padding-bottom: 60px;
      background-color: white;

      .title{
        width: 100%;
        height: 40px;
        font-size: 18px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .content{
        width: 100%;
        text-align: left;
        font-size: 16px;
        color: #808080;

        img{
          max-width: 100%;
          border: 0 none;
          vertical-align: top;

        }
      }

    }

    .bottom-pane{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e5e5e5;
      background-color: white;
      z-index: 9999;

      .collection{
        margin-left: 10px;
        width: 30px;
        /*height: 41px;*/
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 24px;
          height: 24px;
        }
      }

      .price{
        color: #9e100e;
        font-size: 22px;
        margin-left: 5px;
        height: 100%;
        display: flex;
        align-items: center;

        .original-price{
          font-size: 14px;
          color: #808080;
          text-decoration: line-through;
          margin-left: 10px;
        }
      }

      .buy{
        width: 120px;
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9e100e;
        margin-right: 5px;
        border-radius: 5px;
        color: white;
        z-index: 999;

        img{
          height: 50%;
          width: auto;
          margin-right: 5px;
        }
      }
    }

    .toBuy{
      position: fixed;
      width: 100%;
      /*height: 375px;*/
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      bottom: 0;
      /*left: 0;*/
      background-color: #fff;
      z-index: 2;
      /*padding-bottom: 100px;*/
      .toBuy_container{
        width: 95%;
        margin: 10px;
        padding-bottom: 150px;
        .good{
          display: flex;
          flex-direction: row;
          img{
            width: 50px;
            height: 50px;
            border: #e5e5e5 1px solid;
            box-sizing: border-box;
          }
          .text{
            margin-left: 10px;
            font-size: 16px;
            text-align: left;
            .name{color: rgb(51, 51, 51);}
            .price{color: rgb(153, 84, 84);margin-top: 6px}
          }
          .kucun{
            margin-left: 10px;
            font-size: 14px;
            color: rgb(128, 128, 128)
          }
        }
        .specification{
          font-size: 14px;
          text-align: left;
          margin-top: 10px;
          color: #808080;

          .specification-item{
            display: flex;
            justify-content: flex-start;
            flex-flow:wrap;
            align-items: flex-start;
            align-content: flex-start;
            margin-top: 5px;
            margin-left: 5px;

            .specification-item-one{
              display: flex;
              font-size: 14px;
              align-items: center;
              justify-content: center;
              color: rgb(51,51,51);
              margin-top: 5px;
              margin-right: 10px;
              padding: 5px 8px;
              border: 1px solid #e5e5e5;
              /*font-size: 12px;*/
              border-radius: 3px;
              /*color: #808080;*/

            }

            .specificationItemActive{
              border: 1px solid #3d7a99;
              color: #3d7a99;
            }


          }

        }

        .numSelect{
          margin-top: 10px;
          text-align: left;
          font-size: 14px;
          color: rgb(51,51,51);
          .InputNumber{
            margin-top: 10px;
          }
        }
        .button{
          position: absolute;
          bottom: 15px;
          font-size: 16px;
          color: #fff;
          display: flex;
          justify-content:space-between;
          width: 355px;

          /*div{*/
            /*display: flex;*/
            /*justify-content: center;*/
            /*align-items: center;*/
            /*width: 150px;*/
            /*height: 36px;*/
            /*border-radius: 10px;*/
            /*line-height: 32px;*/
            /*!*background-color: rgb(153,84,84);*!*/


          /*}*/

          .buy{
            width: 120px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9e100e;
            margin-right: 20px;
            margin-left: 250px;
            border-radius: 5px;
            color: white;

            img{
              height: 50%;
              width: auto;
              margin-right: 5px;
              /*margin-left: 10px;*/
            }
          }

          .toCart{
            /*width: 150px;*/
            /*height: 36px;*/
            /*border-radius: 10px;*/
            /*line-height: 32px;*/
            background-color:rgb(61,122,153);
          }
        }
      }
    }
  }
</style>

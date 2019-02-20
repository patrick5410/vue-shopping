<template>
    <div class="good_item">
        <!-- 商品轮播图 -->
        <div class="item">
            <img class="back" src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png" @click="$router.back()"/>
            <img class="home" src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_homeNormal.png" @click="toIndex"/>
            <Swipe :auto="3000">
                <SwipeItem v-for="item in $store.state.goodDetail.slideshow" :key="item">
                    <img :src="item" alt="item">
                </SwipeItem>
            </Swipe>
        </div>
        <!-- 商品简单介绍 -->
        <div class="item_info">
            <div class="name">{{$store.state.goodDetail.name}}</div>
            <div v-html="$store.state.goodDetail.introduction" class="introduction"></div>
            <div class="price"><span class="money">¥</span>{{$store.state.goodDetail.price}}&nbsp;&nbsp;&nbsp;<span v-if="$store.state.goodDetail.price<$store.state.goodDetail.originalPrice" style="font-size: 0.34rem;color: #808080;text-decoration: line-through">原价：{{$store.state.goodDetail.originalPrice}}元</span></div>
        </div>
        <!-- 商品数量选择 -->
        <div class="selectNum" @click="popupVisible=!popupVisible">
            &nbsp;&nbsp;已选：<span>{{selectNum}}件</span>
            <img src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png"/>
        </div>
        <!-- 商品说明 -->
        <div class="description">
            <div class="description-title">说明：</div>
            <div class="explain" v-html="$store.state.goodDetail.explain"></div>
        </div>
        <!-- 商品详情 -->
        <div class="details" v-html="$store.state.goodDetail.detailHtml">
            <!--<img v-for="item in list" :key="item" :src="item" alt="item">-->
        </div>
        <!-- 底部工具栏 -->
        <div class="bottom_tool">
            <div class="service">
                <div class="img">
                    <img src="../../assets/img/service.png" alt="service">
                </div>
                <span>客服</span>
            </div>
            <div class="collection" @click="collect">
                <div class="img">
                    <img v-if="$store.state.goodDetail.isCollect" src="../../assets/img/collection.png" alt="collection">
                    <img v-else src="../../assets/img/uncollection.png" alt="collection">
                </div>
                <span v-if="!$store.state.goodDetail.isCollect">收藏</span>
                <span v-else>取消收藏</span>
            </div>
            <div class="cart" @click="toCart">
                <span class="add_num" :class="add_num?'add_num_show':''" id="popone">+1</span>
                <Badge :value="$store.state.goodDetail.cartCount" v-if="$store.state.goodDetail.cartCount>0">
                    <div class="img">
                        <img src="../../assets/img/cart_item.png" alt="cart">
                    </div>
                </Badge>
                <div v-else class="img">
                  <img src="../../assets/img/cart.png" alt="cart">
                </div>
                <p>购物车</p>
            </div>
            <div class="buy" @click="popupVisible=!popupVisible">
                立即购买
            </div>
            <div class="takein" @click="popupVisible=!popupVisible">
                加入购物车
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
              <div class="specification" v-if="!$store.state.goodDetail.specifications || $store.state.goodDetail.specifications.length<=0">
                <div>商品规格</div>
                <div class="specification-item">
                  <div class="specification-item-one specificationItemActive">默认</div>
                  <!--<div class="specification-item-one">默认</div>-->
                </div>
              </div>

              <div class="specification" v-else v-for="(item,index) in $store.state.goodDetail.specifications">
                <div>{{item.specification}}</div>
                <div class="specification-item">
                  <div class="specification-item-one" v-for="(specificationItem,index) in item.specificationItems" :class="{specificationItemActive : specificationItem.specificationItemId == item.currentSpecificationItemId }" @click="item.currentSpecificationItemId=specificationItem.specificationItemId">{{specificationItem.specificationItem}}</div>
                </div>
              </div>
              <div class="numSelect">
                  <span style="color: #808080">数量</span><br>
                  <InputNumber class="InputNumber" size="small" v-model="selectNum" :min="1" :max="$store.state.goodDetail.maxBuyCount"></InputNumber>
              </div>
              <div class="button">
                  <div class="buy" @click="toPayPage">
                      立即购买
                  </div>
                  <div class="toCart" @click="turn_add_num">
                      加入购物车
                  </div>
              </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import {Swipe,SwipeItem,Popup} from 'mint-ui'
import {Badge,InputNumber} from 'element-ui'
import { ToastPlugin  } from 'vux'
import Vue from 'vue'

Vue.use(ToastPlugin)
export default {
    name: "good",
    components:{
        Swipe,
        SwipeItem,
        Popup,
        Badge,
        InputNumber
    },
    data(){
        return{
            selectNum: 1,
            popupVisible: false,
            add_num: false
        }
    },
    created(){


    },
    methods:{
        turn_add_num(){
          console.log("this.$store.state.goodDetail.specifications",this.$store.state.goodDetail.specifications);
          let specifications =  this.$store.state.goodDetail.specifications;
          let specificationItemIds = []
          if(specifications.length<=0){
            //没有商品规格
            specificationItemIds.push(0)
          }else {
            for (let i = 0; i < specifications.length; i++) {
              if(specifications[i].currentSpecificationItemId>0){
                specificationItemIds.push(specifications[i].currentSpecificationItemId)
              }else {
                console.log("currentSpecificationItemId",specifications,specifications[i].currentSpecificationItemId)
                this.$vux.toast.show({
                  type:"text",
                  width:"14em",
                  text: '请先选中商品规格'
                })
                return
              }
            }
          }
          let that = this
          this.$store.commit('addGood', { data: { goodId: that.$route.query.goodId,specificationItemIds:specificationItemIds,count:that.selectNum },successCallBack:function () {
              console.log("添加成功");
              that.$vux.toast.show({
                text: '添加成功'
              })
            },failCallBack:function () {
              that.$vux.toast.show({
                type:"warn",
                text: '添加失败'
              })
            } })
        },
        toPayPage(){
          //这里不用传选中商品id，直接存储在store中
          this.$router.push({name:'payPage'})
        },
        toIndex(){
          //返回首页
          this.$router.push({name:'index'})
        },
        toCart(){
          //跳转到购物车
          this.$router.push({name:'cart'})
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

<style lang="scss">
    @-webkit-keyframes de_add_num{
        0%{top:-10px;opacity:1}
        50%{top:-25px;opacity:1}
        100%{top:-25px;opacity:0}
    }
    .good_item{
        width: 100%;
        height: 100vh;
        background-color: #e5e5e5;
        // position: fixed;
    }
    // 商品轮播图
    .item{
        width: 100%;
        height: 211px;
        background-color: rgb(223, 201, 201);
        color: #222;
        font-size: 28px;
        .mint-swipe{
          z-index: 1;
            img{
                width: 100%;
                height: 211px;
            }
        }
        .back{
            position: absolute;
            top: 0;
            left: 0;
            height: 48px;
            width: 48px;
            transform: rotateX(180deg);
            z-index: 2;
        }
        .home{
            position: absolute;
            top: 0;
            right: 0;
            height: 48px;
            width: 48px;
            z-index: 2;
        }
    }
    // 商品价格及介绍
    .item_info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #fff;
        /*height: 58px;*/
        padding: 10px;
        .name{
            font-size: 16px;
            color: rgb(51, 51, 51);
        }
        .introduction{
            font-size: 14px;
            color: rgb(128, 128, 128);
            padding-top: 5px;
            padding-bottom: 8px;
        }
        .price{
            font-size: 18px;
            color: rgb(153, 84, 84);
            .money{
                font-size: 12px;
            }
        }
    }
    //选择商品购买数量
    .selectNum{
        margin-top: 10px;
        height: 35px;
        background-color: #fff;
        font-size: 14px;
        line-height: 35px;
        display: flex;
        color: rgb(128, 128, 128);
        span{
            color: rgb(51, 51, 51);
        }
        img{
            position: absolute;
            right: 0;
            width: 35px;
            height: 35px;
            transform: rotateY(180deg)
        }
    }
    //商品说明
    .description{
        margin-top: 10px;
        margin-bottom: 10px;
        /*height: 77px;*/
        background-color: #fff;
        padding: 10px;
        display: flex;
        font-size: 14px;
        justify-content: flex-start;
        align-items: flex-start;

        .description-title{
          align-items: center;
          width: 45px;
          height: auto;
          color: rgb(128, 128, 128);
        }

        .explain{
          width: 330px;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: left;

        }


    }
    //商品详情图
    .details{
        padding-bottom: 49px;

        img{
            width: 100%;
            border: 0 none;
            vertical-align: top;
        }
    }

    //底部工具栏
    .bottom_tool{
        position: fixed;
        bottom: 0;
        display: flex;
        flex-flow: nowrap;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 49px;
        background-color: #fff;
        font-size: 12px;
        img{
            width: 24px;
            height: 24px;
        }
        .service{
            margin-left: 10px;
            width: 24px;
            height: 41px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
        }
        .collection{
            width: 24px;
            height: 41px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
        }
        .cart{
            width: 36px;
            height: 41px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            .add_num{
                position: absolute;
                padding: 2px 3px;
                color: #e4393c;
                font-weight: 700;
                bottom: 15px;
                display: none;
                font-size: 18px;
                pointer-events: none;
                z-index: 30;
            }
            .add_num_show{
                display: block;
                opacity: 0;
                /*-webkit-animation: de_add_num 2s;*/
            }

        }

        .buy{
            width: 100px;
            height: 32px;
            line-height: 32px;
            color: #fff;
            background-color: rgb(153,84,84);
            border-radius: 10px;
        }
        .takein{
            margin-right: 10px;
            width: 100px;
            height: 32px;
            line-height: 32px;
            color: #fff;
            background-color:rgb(61,122,153);
            border-radius: 10px;
        }
    }
    //点击立即购买弹出层
    .toBuy{
        position: fixed;
        width: 100%;
        /*height: 375px;*/
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        bottom: 0;
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

                div{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 150px;
                  height: 36px;
                  border-radius: 10px;
                  line-height: 32px;
                  background-color: rgb(153,84,84);
                }

                .buy{
                    /*width: 150px;*/
                    /*height: 36px;*/
                    /*border-radius: 10px;*/
                    /*line-height: 32px;*/
                    background-color: rgb(153,84,84);
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
</style>



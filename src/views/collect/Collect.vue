<!--收藏-->
<template>
  <div class="collect-container">

    <swipeout>
      <swipeout-item transition-mode="follow"  v-for="(item,index) in $store.state.collectGoods" >
        <div slot="right-menu">
          <swipeout-button @click.native="deleteGood(item)" type="warn" :width="parseInt(120*containerWidth/750)">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t good">
          <div class="good-left">
            <div class="good-img-div">
              <img :src="item.img" style="width: 100%;height: auto">
            </div>
            <div class="good-info">
              <div>{{item.name}}</div>
              <div style="color: #995454">¥{{item.price}}</div>
            </div>
          </div>
          <div class="good-right" @click="goodDetail(item.goodId)">
            <img src="../../assets/img/forward_right.png">
          </div>
        </div>
      </swipeout-item>
    </swipeout>



    <!--<div class="good" v-for="(item,index) in goods">-->
      <!--<div class="good-left">-->
        <!--<div class="good-img-div">-->
          <!--<img v-lazy="item.img">-->
        <!--</div>-->
        <!--<div class="good-info">-->
          <!--<div>{{item.name}}</div>-->
          <!--<div style="color: #995454">¥{{item.price}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="good-right" @click="goodDetail(item.id)">-->
        <!--<img src="../../assets/img/forward_right.png">-->
      <!--</div>-->
    <!--</div>-->


  </div>
</template>

<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import { ToastPlugin  } from 'vux'
  import Vue from 'vue'

  Vue.use(ToastPlugin)

  export default {
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
    },
    data(){
      return{
        goods:[],
        containerWidth:750,//容器高度
      }
    },
    created() {
      this.containerWidth = window.innerWidth
      console.log("containerHeight",this.containerWidth)

      // 模拟商品数据
      // for (let i = 1; i <= 9; i++) {
      //   if (i % 3 === 0) {
      //     this.goods.push({
      //       id: Math.floor(Math.random()*100),
      //       name: '车载配件' + i,
      //       originalPrice: 1108,
      //       price: 1058,
      //       img: 'img/good/' + i + '.jpg'
      //     })
      //   } else if (i % 3 === 1) {
      //     this.goods.push({
      //       id: Math.floor(Math.random()*100),
      //       name: '车载配件' + i,
      //       originalPrice: 1304,
      //       price: 1058,
      //       img: 'img/good/' + i + '.jpg'
      //     })
      //   } else {
      //     this.goods.push({
      //       id: Math.floor(Math.random()*100),
      //       name: '车载配件' + i,
      //       originalPrice: 1406,
      //       price: 1058,
      //       img: 'img/good/' + i + '.jpg'
      //     })
      //   }
      // }

      // console.log("初始化商品",this.goods);
    },
    methods:{
      //商品详情页面
      goodDetail(goodId)
      {
        this.$router.push({name: 'good', query: {goodId: goodId}})
      },
      //删除收藏
      deleteGood(item){
        // let index = this.goods.indexOf(item)
        // // console.log("删除之前",this.goods,item,index);
        // if(index>-1){
        //   this.goods.splice(index,1)
        // }
        // console.log("删除之后",this.goods);
        let that = this
        this.$store.commit("deleteCollect",{ data: { goodId: item.goodId },successCallBack:function () {
            let index = that.$store.state.collectGoods.indexOf(item)
            // // console.log("删除之前",this.goods,item,index);
            if(index>-1){
              that.$store.state.collectGoods.splice(index,1)
            }

          },failCallBack:function () {
            that.$vux.toast.show({
              type:"warn",
              text: '收藏失败'
            })

          } })
      }
    }
  }
</script>

<style lang="less" scoped>

  .collect-container{

    .good{
      display: flex;
      justify-content: space-between;
      width: 355px;
      height: 100px;
      padding: 0 10px;
      border-bottom: 1px solid #e5e5e5;
      background-color: white;

      .good-left{
        width: 320px;
        height: 100px;
        display: flex;

        .good-img-div{
          width: 100px;
          height: 100%;
          overflow: hidden;

          img{
            height: 100%;
            width: auto
          }
        }

        .good-info{
          margin-left: 20px;
          font-size: 15px;
          text-align: left;

          div{
            margin: 15px;
          }

        }
      }

      .good-right{
        display: flex;
        justify-content: center;
        align-items: center;

        img{
          width: 10px;
          height: 16px;
        }
      }

    }
  }
</style>

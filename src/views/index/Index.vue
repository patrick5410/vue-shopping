<template>
  <div class="index">
    <!--顶部搜索-->
    <Header/>

    <RemainSpace>
      <scroller lock-x :scroll-bottom-offset="0"  height="100%" @on-scroll-bottom="loadMore" class="scroller-container">
        <div class="container">
          <!--积分-->
          <Credit></Credit>
          <!--推荐商品类型-->
          <div class="recommend-good">
            <div class="re-class">
              <div class="re-className">{{recommendClass}}</div>
              <div class="re-more" @click="toRecommendClass">更多</div>
            </div>
            <img class="re-classImg" :src="recommendImgUrl"/>
          </div>

          <!--商品列表-->
          <div class="goods-container">
            <div class="goods" >
              <div class="good" v-for="(item,index) in goods" :key="item.id" @click="goodDetail(item.id)">
                <div class="good-img">
                  <!--<img :src="item.img" lowsrc="../../assets/img/good/加载失败.png" style="width: 100%;height: 100%">-->
                  <img v-lazy="item.img" style="width: 100%;height: auto"  ref='itemImg' />
                  <div v-show="item.originalPrice>item.price" style="position: absolute;left: 0;bottom: 0">
                    <span class="cutPrice" :style="item.originalPrice-item.price>100?(item.originalPrice-item.price>300?'background-color:#995454':'background-color:#ffbf80'):'background-color:#52992e'" >&nbsp;直降{{item.originalPrice-item.price}}元&nbsp;</span>
                  </div>
                </div>
                <div class="good-bottom">
                  <div>{{item.name}}</div>
                  <div style="color:#995454">¥{{item.price}}</div>
                </div>
              </div>
              <div class="loading" v-show="loading">
                <!--<mt-spinner :size="60"></mt-spinner>-->
                <img  class="loading-img" src="../../assets/img/loading.gif"/>
                加载中...
              </div>
              <div v-show="isFinish" class="bottom-line">
                <divider >我是有底线滴</divider>
              </div>
            </div>
          </div>

        </div>

      </scroller>
    </RemainSpace>


    <!--底部菜单-->
    <Menu/>
  </div>
</template>

<script>

import Menu from '@/components/Menu'
import Header from '@/components/head/Header'
import Credit from '@/components/Credit'
import RemainSpace from '@/components/RemainSpace'
import { Divider,Scroller } from 'vux'


export default {
  name: 'index',
  components: {
    Menu,
    Header,
    Credit,
    Divider,
    Scroller,
    RemainSpace
  },
  data: function () {
    return {
      creditSort: 425, // 用户积分
      recommendClass: '车载配件', // 推荐商品类型
      recommendClassUrl: '/showMore', // 推荐商品链接
      recommendImgUrl: 'img/good/banner.png', // 推荐商品图片
      loading: false, // 加载
      isFinish:false,
      goods: [],
      num: 4
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // vm.$Lazyload.$once('loaded', function ({ el, src }) {
      //   console.log(el, src)
      // })
      //加载商品
      this.loadMore ()
    })
  },
  beforeDestroy: function() {
    // console.log("页面跳转之前");
  },
  methods: {
    toRecommendClass () {
      this.$router.push({name:'showMore',query:{clzName:this.recommendClass}})
    },
    //加载更多
    loadMore () {
      let that = this;
      if(!that.isFinish && !this.loading ){
        this.loading = true
        setTimeout(() => {
          let last = this.goods[this.goods.length - 1]
          for (let i = 1; i <= 9; i++) {
            if(i%3==0){
              this.goods.push({
                id: that.num++,
                name: '车载配件' + i,
                originalPrice:1108,
                price: 1058,
                img: 'img/good/'+i+'.jpg'
              })
            }else if(i%3==1){
              this.goods.push({
                id: that.num++,
                name: '车载配件' + i,
                originalPrice:1304,
                price: 1058,
                img: 'img/good/'+i+'.jpg'
              })
            }else {
              this.goods.push({
                id: that.num++,
                name: '车载配件' + i,
                originalPrice:1406,
                price: 1058,
                img: 'img/good/'+i+'.jpg'
              })
            }


          }
          this.loading = false

          if(this.num>50){
            that.isFinish = true;
          }

        }, 2000)
      }
    },
    //商品详情页面
    goodDetail(goodId){
      this.$router.push({name:'good',query:{goodId:goodId}})
    }

  }

}

</script>

<style lang="scss" scoped>
  .container{
    width: 375px;
    /*height: 230px;*/
    background-color: white;
    /*margin-top: 36px;*/
    /*margin-bottom: 65px;*/
  }


  /*推荐商品*/
  .recommend-good{
    display: flex;
    width: 100%;
    height: 120px;
    background-color: white;
    position: relative;
  }

  .re-class{
    display: flex;
    width: 355px;
    margin: 5px 10px;
    height: 20px;
    position: relative;
    /*justify-content: center;*/
    align-items:center;
  }

  .re-className{
    display: inline-flex;
    font-size: 16px;
  }

  .re-more{
    display: inline-flex;
    position: absolute;
    /*justify-content: center;*/
    align-items: baseline;
    width: 50px;
    right: 0;
    color: #808080;
    background-image: url("../../assets/img/foward.png");
    background-size: 17px 17px;
    background-position: right;
    background-repeat: no-repeat;
    font-size: 14px;
  }

  .re-classImg{
    width: 355px;
    height: 80px;
    position: absolute;
    top: 30px;
    left: 10px;
  }



  /*商品列表*/
  .goods-container{
    display: flex;
    width: 375px;
    background-color: white;
    /*padding-bottom: 60px;*/

    /*border: 1px solid blue;*/
  }

  .goods{
    display: flex;
    width: 355px;
    margin: 0 auto;
    flex-wrap:wrap;
    justify-content:space-between;
  }

  .good{
    width: 110px;
    height: 150px;
    margin: 5px 0;
    /*text-align: left;*/
    /*background-color: blue;*/
    /*border: 1px solid blue;*/
  }

  .good-img{
    width: 110px;
    height: 110px;
    overflow: hidden;
    position: relative;
    /*background-color: #f2f2f2;*/
    background: rgba(0,0,0,0.02);
  }
  .good-bottom{
    display: block;
    width: 100%;
    text-align: left;
  }
  .good-bottom>div{
    width: 110px;
  }

  .cutPrice{
    /*display: flex;*/
    /*width: 50px;*/
    /*height: 12px;*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*background-color: #52992e;*/
    /*color: white;*/
    /*justify-content: center;*/
    /*align-items: baseline;*/
    /*font-size: 10px;*/
    /*border-radius: 1px;*/

    color: white;
    /*justify-content: center;*/
    /*align-items: center;*/
    font-size: 12px;
    border-radius: 1px;
  }

  .loading{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 15px;
    margin: 10px auto;
  }

  .loading-img{
    height: 22px;
    width: 22px;
    margin-right: 10px;
  }

  .bottom-line{
    width: 100%;
    margin: 10px;
  }

  .scroller-container{
    /*height :10px;*/
    margin-top: 36px;
    width: 100%;
    /*height: 600px;*/
    /*border: 1px solid yellow;*/
    background-color: white;
  }



</style>

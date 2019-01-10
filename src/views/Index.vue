<template>
  <div class="index">
    <!--顶部搜索-->
    <Header/>
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
        <div class="goods" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
          <div class="good" v-for="item in goods" :key="item.id">
            <div class="good-img">
              <!--<img :src="item.img" lowsrc="/img/good/加载失败.png" style="width: 100%;height: 100%">-->
              <img v-lazy="item.img" style="width: 100%;height: 100%"/>
            </div>
            <div>{{item.name}}</div>
            <div style="color:#995454">¥{{item.price}}</div>
          </div>
          <div class="loading" v-show="loading">
            <!--<mt-spinner :size="60"></mt-spinner>-->
            <!--<mt-spinner color="yellow"></mt-spinner>-->
            <img  class="loading-img" src="/img/loading.gif"/>
            加载中...
          </div>
          <div class="sigma-content" v-show="isFinish">
            <div class="sigma-middle-line">
              <span class="sigma-line-text">我是有底线滴</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--底部菜单-->
    <Menu/>
  </div>
</template>

<script>

import Menu from '@/components/Menu'
import Header from '@/components/head/Header'
import Credit from '@/components/Credit'
// import { Scroll } from 'iview'
import { InfiniteScroll, Spinner } from 'mint-ui'

import VueLazyLoad from 'vue-lazyload'

import Vue from 'vue'

Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner);
Vue.use(VueLazyLoad,{
  error:'/img/good/加载失败.png',
  loading:'/img/good/加载.png'
})

export default {
  name: 'index',
  components: {
    Menu,
    Header,
    Credit
  },
  data: function () {
    return {
      creditSort: 425, // 用户积分
      recommendClass: '车载配件', // 推荐商品类型
      recommendClassUrl: '/clz', // 推荐商品链接
      recommendImgUrl: '/img/banner.png', // 推荐商品图片
      loading: false, // 加载
      isFinish:false,
      goods: [],
      num: 4
    }
  },
  methods: {
    toRecommendClass () {
      this.$router.push(this.recommendClassUrl)
    },
    loadMore () {
      let that = this;
      if(!that.isFinish){
        this.loading = true
        setTimeout(() => {
          let last = this.goods[this.goods.length - 1]
          for (let i = 1; i <= 9; i++) {
            this.goods.push({
              id: that.num++,
              name: '车载配件' + i,
              price: 1058,
              img: '/img/good/'+i+'.png'
            })
          }
          this.loading = false

          if(this.num>50){
            that.isFinish = true;
          }

        }, 2000)
      }


    }

  }

}

</script>

<style lang="scss">
  .container{
    width: 375px;
    height: 230px;
    background-color: white;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    margin-top: 36px;
    margin-bottom: 65px;
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
    background-image: url("/img/箭头.png");
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
    padding-bottom: 60px;
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
    /*background-color: blue;*/
    /*border: 1px solid blue;*/
  }

  .good-img{
    width: 110px;
    height: 110px;
    overflow: hidden;
    img[lazy=loading]{
      width: 110px;
      height: 110px;
      margin: auto;
    }
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

  /*底部横线样式*/
  .sigma-content{
    width: 100%;
    margin: 10px;
    text-align: center;
    background-color: #fff;

  }
  .sigma-middle-line:before{
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    /*width: 375px;*/
    background-color: #999;/*颜色需与主题大背景色一致*/
    position: relative;
    top: 10px;/*调节线高*/
    left: 0;
  }
  .sigma-line-text{
    display: inline-block;
    background: #fff;
    padding: 0 18px 0 18px;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: #808080;
  }

</style>

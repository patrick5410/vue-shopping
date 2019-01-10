<template>
  <div class="index">
    <!--顶部搜索-->
    <Header/>
    <div class="container">
      <!--积分-->
      <div class="credit">
        <!--<img src="/img/积分.png"/>-->
        {{creditSort}}
      </div>

      <!--推荐商品类型-->
      <div class="recommend-good">
        <div class="re-class">
          <div class="re-className" style="font-size: 16px">{{recommendClass}}</div>
          <div class="re-more" @click="toRecommendClass" style="font-size: 14px">更多</div>
        </div>

        <div>
          <!--<img class="re-classImg" :src="recommendImgUrl"/>-->
        </div>
      </div>

    </div>

    <!--底部菜单-->
    <Menu/>
  </div>
</template>

<script>

import Menu from '@/components/Menu'
import Header from '@/components/Header'

export default {
  name: 'index',
  components: {
    Menu,
    Header
  },
  data: function () {
    return {
      creditSort: 425, // 用户积分
      recommendClass: '车载配件', // 推荐商品类型
      recommendClassUrl: '/clz',// 推荐商品链接
      recommendImgUrl:'/img/cart.png'//推荐商品图片
    }
  },
  methods: {
    toRecommendClass () {
      this.$router.push(this.recommendClassUrl)
    }
  }

}

</script>

<style>

  .container{
    width: 375px;
    height: 230px;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 51px;
    margin-bottom: 60px;
  }

  /*积分*/
  .credit{
    background-image: url("/img/积分.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 325px 210px;
    width: 100%;
    height: 210px;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items:center;
    color: #e5cf8a;
    font-size: 28px;
    font-style: italic;
  }

  /*推荐商品*/
  .recommend-good{
    display: flex;
    width: 100%;
    height: 100px;
    background-color: white;
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
  }

  .re-more{
    display: inline-flex;
    position: absolute;
    width: 50px;
    right: 0;
    color: #808080;
    background-image: url("/img/箭头.png");
    background-size: 18px 18px;
    background-position: right;
    background-repeat: no-repeat;
  }

  .re-classImg{
    width: 100%;
    height: 20px;
  }
</style>

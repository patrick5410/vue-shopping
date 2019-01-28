<!--底部菜单-->
<template>
  <div class="menu" id="menu">
      <div class="m-index" @click="toIndex" :class="{indexActive: $route.path.indexOf('index') !== -1}">首页</div>
      <div class="m-clz" @click="toClz"  :class="{clzActive: $route.path.indexOf('clz') !== -1}">分类</div>
      <div class="m-cart" @click="toCart"  :class="{cartActive: $route.path.indexOf('cart') !== -1}">购物车</div>
      <div class="m-personal" @click="toPersonal" :class="{personalActive: $route.path.indexOf('personal') !== -1}">我的</div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    toIndex () {
      //跳转到首页
      this.$router.push({name:'index'})
    },
    toClz () {
      //跳转到分类
      this.$router.push({name:'clz'})
    },
    toCart(){
      //跳转到购物车
      this.$router.push({name:'cart'})
    },
    toPersonal(){
      //跳转到个人中心
      this.$router.push({name:'personal'})
    }
  },
  created () {
    // console.log(this.$route.path)
  }

}

</script>

<style lang="scss" scoped>
  .menu{
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: white;
    border-top: 1px solid #e5e5e5;
    font-size: 14px;
  }
  .menu>div{
    display: inline-flex;
    width: 80px;
    justify-content: space-around;
    align-items:flex-end;
    background-size: 28px 28px;
    background-repeat: no-repeat;
    background-position: center 5px;
    font-weight: bold;
  }

  .m-index{
    background-image: url("../assets/img/index.png");
  }

  .indexActive{
    background-image: url("../assets/img/index2.png");
    color: #3d7a99;
  }

  .m-clz{
    background-image: url("../assets/img/clz.png");
  }

  .clzActive{
    background-image: url("../assets/img/clz2.png");
    color: #3d7a99;
  }

  .m-cart{
    background-image: url("../assets/img/cart.png");
  }

  .cartActive{
    background-image: url("../assets/img/cart2.png");
    color: #3d7a99;
  }

  .m-personal{
    background-image: url("../assets/img/personal.png");
  }

  .personalActive{
    background-image: url("../assets/img/personal2.png");
    color: #3d7a99;
  }

</style>

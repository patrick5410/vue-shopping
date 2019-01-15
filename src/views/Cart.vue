<!--购物车-->
<template>
  <div class="cart">
    <div class="myCart">
      <div v-if="goods==null || goods.length<=0">
        <img @click="toClz" src="/img/cart_empty.png" style="width: 100%;height: 100%">
      </div>
      <div v-else>
        <!--购物车头部-->
        <div>
          <Checkbox v-model="single">Checkbox</Checkbox>
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


  import { Checklist } from 'mint-ui';
  import Vue from 'vue'


  Vue.component('Checkbox', Checkbox);

  export default{
    name:'cart',
    components: {
      Show2goods,
      Menu,
      Checklist
    },
    data: function () {
      return {
        goods: [{}], //商品
        guessGoods:[],//可能喜欢商品
        selectGoods:[],//选中商品
        value:[],
        single:false
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        for (let i = 0; i < 8; i++) {
          this.guessGoods.push({
            id: i,
            name: '车载配件' + i,
            originalPrice: 1500,
            price: 1058 + Math.floor(Math.random() * 200),
            sellCount: Math.floor(Math.random() * 200),
            img: '/img/good/' + (i + 1) + '.jpg'
          })

        }

      })
    },
    methods:{
      toClz() {
        //跳转到分类
        this.$router.push('/clz')

      },

    }


  }

</script>

<style lang="scss" scoped>
  .cart{
    background-color: #e5e5e5;
  }

  .myCart{
    width: 100%;
    /*height: 150px;*/
    border-bottom: 1px solid #e5e5e5;
  }

  .guess-like{
    margin-top: 10px;
    padding-bottom: 60px;
    width: 100%;
    background-color: white;
  }

  .guess-like-title{
    padding-top: 10px;
    display: flex;
    width: 100%;
    height: 30px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
  }

  .mint-checkbox-core{
    top: 0.09rem;
    left: 0.18rem;
  }

</style>

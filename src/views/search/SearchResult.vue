<!--搜索结果页面-->
<template>
  <div class="searchResult-container">
    <Header style="border-bottom: 0"></Header>
    <ShowMore :isChange="true" :pGoods="goods"></ShowMore>
  </div>
</template>

<script>
  import ShowMore from '../showMore/ShowMore'
  import Header from '@/components/head/Header'
  export default {
    components: {
      ShowMore,
      Header
    },
    data(){
      return{
        goods:[]
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        // console.log("测试组件变量",Show2goods.props);

        //模拟数据
        for (let i = 8; i >0; i--) {
          this.goods.push({
            id: i,
            name: '车载配件' + i,
            originalPrice: 1558,
            price: 1058 + Math.floor(Math.random() * 500),
            sellCount: Math.floor(Math.random() * 500),
            img: '/img/good/' + (i + 1) + '.jpg'
          })
        }
      })
    }

  }
</script>

<!--每行显示2个书籍-->
<template>
  <div class="goods">
    <div class="good" v-for="(item,index) in goods" :key="item.id" @click="goodDetail(item)">
      <img v-if="item.sellUserId ===0" class="book-sign" src="../assets/img/book_sign.png">
      <div class="good-img-div">
        <img v-lazy="item.img">
      </div>
      <div v-show="item.originalPrice>item.price" style="text-align: left">
        <span class="cutPrice" :style="item.originalPrice-item.price>100?(item.originalPrice-item.price>300?'background-color:#995454':'background-color:#ffbf80'):'background-color:#52992e'">&nbsp;直降{{item.originalPrice-item.price}}元&nbsp;</span>
      </div>
      <div class="good-bottom">
        <div>{{item.name}}</div>
        <div style="color:#995454">¥{{item.price.toFixed(2)}}   <span class="org-price" v-show="item.originalPrice>item.price">¥{{item.originalPrice.toFixed(2)}}</span></div>
      </div>
    </div>
  </div>
</template>


<script>
  import VueLazyLoad from 'vue-lazyload'
  import Vue from 'vue'

  Vue.use(VueLazyLoad,{
    error:'../assets/img/good/加载失败.png',
    loading:'img/logo2.png',
    adapter: {
      loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init}) {
        // do something here
        // example for call LoadedHandler
        // console.log("图片加载完毕",el,naturalHeight,naturalWidth,src,$parent,Init);
        // if(naturalHeight>naturalWidth){
        //   console.log("高度比宽度大",el);
        // }

      }
    }
  })


  export default {
    data: function () {
      return {
        // goods: [{name:'我是书籍',price:123}], //书籍
      }
    },
    props: {
      goods: Array
    },
    methods:{
      //书籍详情页面
      goodDetail(item){
        if(item.sellUserId ===0 ){
          this.$router.push({name:'good',query:{goodId:item.id}})
        }else {
          this.$router.push({name:'personalBook',query:{goodId:item.id}})
        }
      }
    }

  }

</script >


<style lang="scss" scoped>
  .goods{
    display: flex;
    flex-wrap:wrap;
    justify-content:space-around;
    /*z-index: 1;*/
    padding-top: 45px;
  }

  .good{
    width: 170px;
    /*height: 230px;*/
    /*border: 1px solid blue;*/
    margin-bottom: 10px;
    position: relative;

    .book-sign{
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      /*z-index: 1;*/

    }
  }

  .good-img-div{
    width: 100%;
    height: 170px;
    overflow: hidden;
    background-color: white;

    img{
      height: 100%;
      width: auto;
      max-width: 100%;
    }
  }


  .cutPrice{
    /*display: flex;*/
    /*width: 65px;*/
    /*height: 16px;*/
    /*background-color: #52992e;*/
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 1px;
  }

  .org-price{
    margin-left: 2px;
    color: #b3b3b3;
    text-decoration-line: line-through;
  }

  .good-bottom{
    display: block;
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
</style>

<!--收藏-->
<template>
  <div class="collect-container">
    <div class="good" v-for="(item,index) in goods">
      <div class="good-left">
        <div class="good-img-div">
          <img v-lazy="item.img">
        </div>
        <div class="good-info">
          <div>{{item.name}}</div>
          <div style="color: #995454">¥{{item.price}}</div>
        </div>
      </div>
      <div class="good-right" @click="goodDetail(item.id)">
        <img src="../../assets/img/forward_right.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        goods:[]
      }
    },
    created() {
      // 模拟商品数据
      for (let i = 1; i <= 9; i++) {
        if (i % 3 == 0) {
          this.goods.push({
            id: Math.random()*100,
            name: '车载配件' + i,
            originalPrice: 1108,
            price: 1058,
            img: 'img/good/' + i + '.jpg'
          })
        } else if (i % 3 == 1) {
          this.goods.push({
            id: Math.random()*100,
            name: '车载配件' + i,
            originalPrice: 1304,
            price: 1058,
            img: 'img/good/' + i + '.jpg'
          })
        } else {
          this.goods.push({
            id: Math.random()*100,
            name: '车载配件' + i,
            originalPrice: 1406,
            price: 1058,
            img: 'img/good/' + i + '.jpg'
          })
        }
      }
    },
    methods:{
      //商品详情页面
      goodDetail(goodId)
      {
        this.$router.push({name: 'good', query: {goodId: goodId}})
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

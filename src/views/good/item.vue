<template>
  <div class="good_item">
    <!-- 商品轮播图 -->
    <div class="item">
      <img
        class="back"
        src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png"
        @click="$router.back()"
      />
      <img
        class="home"
        src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_homeNormal.png"
      />
      <Swipe :auto="3000">
        <SwipeItem v-for="item in itemList" :key="item">
          <img :src="item" alt="item" />
        </SwipeItem>
      </Swipe>
    </div>
    <!-- 商品简单介绍 -->
    <div class="item_info">
      <div class="name">{{ name }}</div>
      <div v-html="introduction" class="introduction"></div>
      <div class="price"><span class="money">¥</span>{{ price }}</div>
    </div>
    <!-- 商品数量选择 -->
    <div class="selectNum" @click="popupVisible = !popupVisible">
      &nbsp;&nbsp;已选：<span>{{ selectNum }}件</span>
      <img
        src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png"
      />
    </div>
    <!-- 商品说明 -->
    <div class="description">
      说明：
      <p>1、本产品为公司商品</p>
    </div>
    <!-- 商品详情 -->
    <div class="details">
      <img v-for="item in list" :key="item" :src="item" alt="item" />
    </div>
    <!-- 底部工具栏 -->
    <div class="bottom_tool">
      <div class="service">
        <div class="img"><img src="/img/service.png" alt="service" /></div>
        <span>客服</span>
      </div>
      <div class="collection">
        <div class="img">
          <img src="/img/collection.png" alt="collection" />
        </div>
        <span>收藏</span>
      </div>
      <div class="cart">
        <span class="add_num" :class="add_num ? 'add_num_show' : ''" id="popone"
          >+1</span
        >
        <Badge :value="1">
          <div class="img"><img src="/img/cart_item.png" alt="cart" /></div>
        </Badge>
        <p>购物车</p>
      </div>
      <div class="buy" @click="popupVisible = !popupVisible">立即购买</div>
      <div class="takein" @click="turn_add_num">加入购物车</div>
    </div>
    <Popup v-model="popupVisible" position="bottom" class="toBuy">
      <div class="toBuy_container">
        <div class="good">
          <div><img src="/img/logo.png" alt="logo" /></div>
          <div class="text">
            <div class="name">{{ name }}</div>
            <div class="price">¥{{ price }}</div>
          </div>
          <div class="kucun">库存：{{ maxNum }}件</div>
        </div>
        <div class="numSelect">
          <span>数量</span><br />
          <InputNumber
            class="InputNumber"
            size="small"
            v-model="selectNum"
            :min="1"
            :max="maxNum"
          ></InputNumber>
        </div>
        <div class="button">
          <div class="buy">立即购买</div>
          <div class="toCart" @click="turn_add_num">加入购物车</div>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Popup } from 'mint-ui'
import { Badge, InputNumber } from 'element-ui'
export default {
  name: 'good',
  components: {
    Swipe,
    SwipeItem,
    Popup,
    Badge,
    InputNumber
  },
  data() {
    return {
      name: '我是商品名字',
      introduction: '我是商品内容介绍',
      price: '1399',
      selectNum: 1,
      maxNum: 10,
      popupVisible: false,
      add_num: false,
      list: [],
      itemList: []
    }
  },
  created() {
    let that = this

    for (let i = 0; i < 20; i++) {
      that.list.push('/img/item/item_' + i + '.jpg')
    }
    for (let i = 1; i < 4; i++) {
      that.itemList.push('/img/item/item/item_' + i + '.jpg')
    }
  },
  methods: {
    turn_add_num() {
      let that = this

      that.popupVisible = false
      that.add_num = !that.add_num
      setTimeout(() => {
        that.add_num = !that.add_num
      }, 1500)
    },
    backTo() {
      console.log('返回上一页')
      this.$route.go(-1)
    }
  }
}
</script>
<style lang="scss">
@-webkit-keyframes de_add_num {
  0% {
    top: -10px;
    opacity: 1;
  }
  50% {
    top: -25px;
    opacity: 1;
  }
  100% {
    top: -25px;
    opacity: 0;
  }
}
.good_item {
  width: 100%;
  height: 100vh;
  background-color: #e5e5e5;
  // position: fixed;
}
// 商品轮播图
.item {
  width: 100%;
  height: 211px;
  background-color: rgb(223, 201, 201);
  color: #222;
  font-size: 28px;
  .mint-swipe {
    z-index: 1;
    img {
      // width: 100%;
      height: 211px;
    }
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    height: 48px;
    width: 48px;
    transform: rotateX(180deg);
    z-index: 2;
  }
  .home {
    position: absolute;
    top: 0;
    right: 0;
    height: 48px;
    width: 48px;
    z-index: 2;
  }
}
// 商品价格及介绍
.item_info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  height: 58px;
  padding: 10px;
  .name {
    font-size: 14px;
    color: rgb(51, 51, 51);
  }
  .introduction {
    font-size: 12px;
    color: rgb(128, 128, 128);
  }
  .price {
    font-size: 18px;
    color: rgb(153, 84, 84);
    .money {
      font-size: 12px;
    }
  }
}
//选择商品购买数量
.selectNum {
  margin-top: 10px;
  height: 35px;
  background-color: #fff;
  font-size: 14px;
  line-height: 35px;
  display: flex;
  color: rgb(128, 128, 128);
  span {
    color: rgb(51, 51, 51);
  }
  img {
    position: absolute;
    right: 0;
    width: 35px;
    height: 35px;
    transform: rotateY(180deg);
  }
}
//商品说明
.description {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 77px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  font-size: 14px;
}
//商品详情图
.details {
  padding-bottom: 49px;

  img {
    width: 100%;
    border: 0 none;
    vertical-align: top;
  }
}

//底部工具栏
.bottom_tool {
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
  img {
    width: 24px;
    height: 24px;
  }
  .service {
    margin-left: 10px;
    width: 24px;
    height: 41px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
  .collection {
    width: 24px;
    height: 41px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
  .cart {
    width: 36px;
    height: 41px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    .add_num {
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
    .add_num_show {
      display: block;
      opacity: 0;
      -webkit-animation: de_add_num 2s;
    }
  }

  .buy {
    width: 100px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    background-color: rgb(153, 84, 84);
    border-radius: 10px;
  }
  .takein {
    margin-right: 10px;
    width: 100px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    background-color: rgb(61, 122, 153);
    border-radius: 10px;
  }
}
//点击立即购买弹出层
.toBuy {
  position: fixed;
  width: 100%;
  height: 375px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  .toBuy_container {
    width: 95%;
    margin: 10px;
    .good {
      display: flex;
      flex-direction: row;
      img {
        width: 50px;
        height: 50px;
        border: #e5e5e5 1px solid;
        box-sizing: border-box;
      }
      .text {
        margin-left: 10px;
        font-size: 16px;
        text-align: left;
        .name {
          color: rgb(51, 51, 51);
        }
        .price {
          color: rgb(153, 84, 84);
        }
      }
      .kucun {
        margin-left: 10px;
        font-size: 14px;
        color: rgb(128, 128, 128);
      }
    }
    .numSelect {
      margin-top: 10px;
      text-align: left;
      font-size: 14px;
      color: rgb(51, 51, 51);
      .InputNumber {
        margin-top: 10px;
      }
    }
    .button {
      position: relative;
      top: 160px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #fff;
      display: flex;
      justify-content: space-around;
      .buy {
        width: 150px;
        height: 32px;
        border-radius: 10px;
        line-height: 32px;
        background-color: rgb(153, 84, 84);
      }
      .toCart {
        width: 150px;
        height: 32px;
        border-radius: 10px;
        line-height: 32px;
        background-color: rgb(61, 122, 153);
      }
    }
  }
}
</style>

<template>
    <div class="good_item">
        <!-- 商品轮播图 -->
        <div class="item">
            <img class="back" src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png"/>
            <img class="home" src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_homeNormal.png"/>
            <Swipe :auto="3000">
                <SwipeItem>1</SwipeItem>
                <SwipeItem>2</SwipeItem>
                <SwipeItem>3</SwipeItem>
            </Swipe>
        </div>
        <!-- 商品简单介绍 -->
        <div class="item_info">
            <div class="name">{{name}}</div>
            <div v-html="introduction" class="introduction"></div>
            <div class="price"><span class="money">¥</span>{{price}}</div>
        </div>
        <!-- 商品数量选择 -->
        <div class="selectNum">
            &nbsp;&nbsp;已选：<span>{{selectNum}}件</span>
            <img src="https://app.youpin.mi.com/youpin/static/m/res/images/std_titlebar_detailBackNormal.png"/>
        </div>
        <!-- 商品说明 -->
        <div class="remark">

        </div>
        <!-- 底部工具栏 -->
        <div class="bottom_tool">
            <div class="service">
                <div class="img">
                    <img src="/img/service.png" alt="service">
                </div>
                <span>客服</span>
            </div>
            <div class="collection">
                <div class="img">
                    <img src="/img/collection.png" alt="collection">
                </div>
                <span>收藏</span>
            </div>
            <div class="cart">
                <div class="img">
                    <img src="/img/cart.png" alt="cart">
                </div>
                <p>购物车</p>
            </div>
            <div class="buy">
                立即购买
            </div>
            <div class="takein">
                加入购物车
            </div>
        </div>
    </div>
</template>
<script>
import {Swipe,SwipeItem} from 'mint-ui'
export default {
    name: "good",
    components:{
        Swipe,
        SwipeItem
    },
    data(){
        return{
            name: '我是商品名字',
            introduction: '我是商品内容介绍',
            price: '1399',
            selectNum: 1
        }
    }
}
</script>
<style lang="scss">
    .good_item{
        width: 100%;
        height: 100vh;
        background-color: #e5e5e5;
    }
    // 商品轮播图
    .item{
        width: 100%;
        height: 211px;
        background-color: #e5e5e5;
        color: #fff;
        font-size: 28px;
        img{
            height: 48px;
            width: 48px;
        }
        .back{
            position: absolute;
            top: 0;
            left: 0;     
            transform: rotateX(180deg)       
        }
        .home{
            position: absolute;
            top: 0;
            right: 0;
            height: 48px;
            width: 48px;
        }
    }
    // 商品价格及介绍
    .item_info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #fff;
        height: 78px; 
        padding: 10px;
        .name{
            // margin-bottom: 10px;
            font-size: 14px;
            color: rgb(51, 51, 51);
        }
        .introduction{
            // margin-bottom: 10px;
            font-size: 12px;
            color: rgb(128, 128, 128);
        }
        .price{
            font-size: 18px;
            color: rgb(153, 84, 84);
            .money{
                font-size: 12px;
            }
        }
    }
    //选择商品购买数量
    .selectNum{
        margin-top: 10px;
        height: 35px;
        background-color: #fff;
        font-size: 14px;
        line-height: 35px;
        display: flex;
        color: rgb(128, 128, 128);
        span{
            color: rgb(51, 51, 51);
        }
        img{
            position: absolute;
            right: 0;
            width: 35px;
            height: 35px;
            transform: rotateY(180deg)  
        }
    }
    //商品说明
    .remark{
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        height: 97px;
        background-color: #fff;
    }
    .bottom_tool{
        position: fixed;
        bottom: 0;
        display: flex;
        flex-flow: nowrap;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px; 
        width: 100%;
        height: 49px;
        background-color: #fff;
        font-size: 12px;
        img{
            width: 24px;
            height: 24px;
        }
        .service{
            width: 24px;
            height: 41px;
        }
        .collection{
            width: 24px;
            height: 41px;
        }
        .cart{
            width: 36px;
            height: 41px;         
        }
        
        .buy{
            width: 100px;
            height: 32px;
            line-height: 32px;
            background-color: rgb(153,84,84); 
            border-radius: 10px;           
        }
        .takein{
            width: 100px;
            height: 32px;
            line-height: 32px;
            background-color:rgb(61,122,153);
            border-radius: 10px;           
        }
    }
</style>



<template>
  <div class="index">
    <!--搜索框-->
    <Header/>

    <!--内容框-->
    <!--<transition name="fade-choose">-->
      <!--<section  class="food_container">-->
        <!--<section class="menu_container">-->
          <!--<section class="menu_left" id="wrapper_menu" ref="wrapperMenu">-->
            <!--<ul>-->
              <!--<li class="menu_left_li" @click="chooseMenu(index)">-->
                <!--<img :src="/img/good/1.png">-->
                <!--<span>gigi</span>-->
                <!--<span class="category_num" >fstet</span>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</section>-->
          <!--<section class="menu_right" ref="menuFoodList">-->
            <!--<ul>-->
              <!--<li>-->
                <!--<header class="menu_detail_header">-->
                  <!--<section class="menu_detail_header_left">-->
                    <!--<strong class="menu_item_title">jud</strong>-->
                    <!--<span class="menu_item_description">udtrur</span>-->
                  <!--</section>-->
                  <!--<span class="menu_detail_header_right"></span>-->
                  <!--<p class="description_tip" >-->
                    <!--<span>uery</span>-->
                   <!--ysey-->
                  <!--</p>-->
                <!--</header>-->
                <!--<section  class="menu_detail_list">-->
                  <!--<router-link  :to="/index" tag="div" class="menu_detail_link">-->
                    <!--<section class="menu_food_img">-->
                      <!--<img :src="/img/good/1.png">-->
                    <!--</section>-->
                    <!--<section class="menu_food_description">-->
                      <!--<h3 class="food_description_head">-->
                        <!--<strong class="description_foodname">hboh</strong>-->
                        <!--<ul class="attributes_ul">-->
                          <!--<li :style="{color: '#' + attribute.icon_color,borderColor:'#' + attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">-->
                            <!--&lt;!&ndash;<p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>&ndash;&gt;-->
                            <!--<p>fFf</p>-->
                          <!--</li>-->
                        <!--</ul>-->

                      <!--</h3>-->
                      <!--<p class="food_description_content">{{foods.description}}</p>-->
                      <!--<p class="food_description_sale_rating">-->
                        <!--<span>月售{{foods.month_sales}}份</span>-->
                        <!--<span>好评率{{foods.satisfy_rate}}%</span>-->
                      <!--</p>-->
                      <!--<p v-if="foods.activity" class="food_activity">-->
                        <!--<span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>-->
                      <!--</p>-->
                    <!--</section>-->
                  <!--</router-link>-->
                  <!--<footer class="menu_detail_footer">-->
                    <!--<section class="food_price">-->
                      <!--<span>¥</span>-->
                      <!--<span>{{foods.specfoods[0].price}}</span>-->
                      <!--<span v-if="foods.specifications.length">起</span>-->
                    <!--</section>-->
                    <!--<buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>-->
                  <!--</footer>-->
                <!--</section>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</section>-->
        <!--</section>-->
        <!--&lt;!&ndash;<section class="buy_cart_container">&ndash;&gt;-->
          <!--&lt;!&ndash;<section @click="toggleCartList" class="cart_icon_num">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">&ndash;&gt;-->
                                <!--&lt;!&ndash;<span v-if="totalNum" class="cart_list_length">&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{totalNum}}&ndash;&gt;-->
                                <!--&lt;!&ndash;</span>&ndash;&gt;-->
              <!--&lt;!&ndash;<svg class="cart_icon">&ndash;&gt;-->
                <!--&lt;!&ndash;<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>&ndash;&gt;-->
              <!--&lt;!&ndash;</svg>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="cart_num">&ndash;&gt;-->
              <!--&lt;!&ndash;<div>¥ {{totalPrice}}</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div>配送费¥{{deliveryFee}}</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</section>&ndash;&gt;-->
          <!--&lt;!&ndash;<section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay_button_style" v-else >去结算</router-link>&ndash;&gt;-->
          <!--&lt;!&ndash;</section>&ndash;&gt;-->
        <!--&lt;!&ndash;</section>&ndash;&gt;-->
        <!--&lt;!&ndash;<transition name="toggle-cart">&ndash;&gt;-->
          <!--&lt;!&ndash;<section class="cart_food_list" v-show="showCartList&&cartFoodList.length">&ndash;&gt;-->
            <!--&lt;!&ndash;<header>&ndash;&gt;-->
              <!--&lt;!&ndash;<h4>购物车</h4>&ndash;&gt;-->
              <!--&lt;!&ndash;<div @click="clearCart">&ndash;&gt;-->
                <!--&lt;!&ndash;<svg>&ndash;&gt;-->
                  <!--&lt;!&ndash;<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>&ndash;&gt;-->
                <!--&lt;!&ndash;</svg>&ndash;&gt;-->
                <!--&lt;!&ndash;<span class="clear_cart">清空</span>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</header>&ndash;&gt;-->
            <!--&lt;!&ndash;<section class="cart_food_details" id="cartFood">&ndash;&gt;-->
              <!--&lt;!&ndash;<ul>&ndash;&gt;-->
                <!--&lt;!&ndash;<li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">&ndash;&gt;-->
                  <!--&lt;!&ndash;<div class="cart_list_num">&ndash;&gt;-->
                    <!--&lt;!&ndash;<p class="ellipsis">{{item.name}}</p>&ndash;&gt;-->
                    <!--&lt;!&ndash;<p class="ellipsis">{{item.specs}}</p>&ndash;&gt;-->
                  <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--&lt;!&ndash;<div class="cart_list_price">&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>¥</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>{{item.price}}</span>&ndash;&gt;-->
                  <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--&lt;!&ndash;<section class="cart_list_control">&ndash;&gt;-->
                                            <!--&lt;!&ndash;<span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<svg>&ndash;&gt;-->
                                                    <!--&lt;!&ndash;<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</svg>&ndash;&gt;-->
                                            <!--&lt;!&ndash;</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<span class="cart_num">{{item.num}}</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">&ndash;&gt;-->
                      <!--&lt;!&ndash;<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>&ndash;&gt;-->
                    <!--&lt;!&ndash;</svg>&ndash;&gt;-->
                  <!--&lt;!&ndash;</section>&ndash;&gt;-->
                <!--&lt;!&ndash;</li>&ndash;&gt;-->
              <!--&lt;!&ndash;</ul>&ndash;&gt;-->
            <!--&lt;!&ndash;</section>&ndash;&gt;-->
          <!--&lt;!&ndash;</section>&ndash;&gt;-->
        <!--&lt;!&ndash;</transition>&ndash;&gt;-->
        <!--&lt;!&ndash;<transition name="fade">&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>&ndash;&gt;-->
        <!--&lt;!&ndash;</transition>&ndash;&gt;-->
      <!--</section>-->
    <!--</transition>-->

    <!--底部菜单-->
    <Menu/>
  </div>
</template>

<script>

import Menu from '@/components/Menu'
import Header from '@/components/head/Header'

// import {mapState, mapMutations} from 'vuex'
// import {msiteAddress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from 'src/service/getData'
// import loading from 'src/components/common/loading'
// import buyCart from 'src/components/common/buyCart'
// import ratingStar from 'src/components/common/ratingStar'
// import {loadMore, getImgPath} from 'src/components/common/mixin'
// import {imgBaseUrl} from 'src/config/env'
// import BScroll from 'better-scroll'



export default {
  name: 'index',
  components: {
    Menu,
    Header
  },
  data(){
    return{
      geohash: '', //geohash位置信息
      shopId: null, //商店id值
      showLoading: true, //显示加载动画
      changeShowType: 'food',//切换显示商品或者评价
      shopDetailData: null, //商铺详情
      showActivities: false, //是否显示活动详情
      menuList: [], //食品列表
      menuIndex: 0, //已选菜单索引值，默认为0
      menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
      shopListTop: [], //商品列表的高度集合
      TitleDetailIndex: null, //点击展示列表头部详情
      categoryNum: [], //商品类型右上角已加入购物车的数量
      totalPrice: 0, //总共价格
      cartFoodList: [], //购物车商品列表
      showCartList: false,//显示购物车列表
      receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
      ratingList: null, //评价列表
      ratingOffset: 0, //评价获取数据offset值
      ratingScoresData: null, //评价总体分数
      ratingTagsList: null, //评价分类列表
      ratingTageIndex: 0, //评价分类索引
      preventRepeatRequest: false,// 防止多次触发数据请求
      ratingTagName: '',//评论的类型
      loadRatings: false, //加载更多评论是显示加载组件
      foodScroll: null,  //食品列表scroll
      showSpecs: false,//控制显示食品规格
      specsIndex: 0, //当前选中的规格索引值
      choosedFoods: null, //当前选中视频数据
      showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
      showMoveDot: [], //控制下落的小圆点显示隐藏
      windowHeight: null, //屏幕的高度
      elLeft: 0, //当前点击加按钮在网页中的绝对top值
      elBottom: 0, //当前点击加按钮在网页中的绝对left值
      ratingScroll: null, //评论页Scroll
      imgBaseUrl:'/img/good/',
    }
  }




}

</script>

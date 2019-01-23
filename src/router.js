import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 跳转到新页面时，默认位置为最顶端
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/Test.vue'], resolve),
      meta: {
        title: '临时测试页面'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/About.vue'], resolve)
    },
    {
      path: '/good',
      name: 'good',
      component: (resolve) => require(['./views/good/item.vue'], resolve),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/index/Index.vue'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/clz',
      name: 'clz',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/clz/Clz.vue'], resolve),
      meta: {
        title: '分类'
      }
    },
    {
      path: '/showMore',
      name: 'showMore',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/showMore/ShowMore.vue'], resolve),
      meta: {
        title: '更多'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/cart/Cart.vue'], resolve),
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/order/Order.vue'], resolve),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/addressManage',
      name: 'addressManage',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/address/AddressManage.vue'], resolve),
      meta: {
        title: '地址管理'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 跳转到新页面时，默认位置为最顶端
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
    },
    {
      path: '/test',
      name: 'test',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ ['./views/Test.vue'], resolve),
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
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ ['./views/About.vue'], resolve)
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
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/index/Index.vue'
        ], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/search/Search.vue'], resolve),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/search/SearchResult.vue'], resolve),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/clz',
      name: 'clz',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/clz/Clz.vue'
        ], resolve),
      meta: {
        title: '分类'
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/personal/Personal.vue'
        ], resolve),
      meta: {
        title: '盟友淘'
      }
    },
    {
      path: '/personalData',
      name: 'personalData',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/personal/PersonalData.vue'
        ], resolve),
      meta: {
        title: '个人资料'
      }
    },
    {
      path: '/showMore',
      name: 'showMore',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/showMore/ShowMore.vue'
        ], resolve),
      meta: {
        title: '更多'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/cart/Cart.vue'
        ], resolve),
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/order/Order.vue'
        ], resolve),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/addressManage',
      name: 'addressManage',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/address/AddressManage.vue'
        ], resolve),
      meta: {
        title: '地址管理'
      }
    },
    {
      path: '/addressEdit',
      name: 'addressEdit',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/address/AddressEdit.vue'], resolve),
      meta: {
        title: '收货地址'
      }
    },
    {
      path: '/payPage',
      name: 'payPage',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/pay/Pay.vue'
        ], resolve),
      meta: {
        title: '确认信息'
      }
    },
    {
      path: '/payResult',
      name: 'payResult',
      component: (resolve) =>
        require(/* webpackChunkName: "about" */ [
          './views/pay/PayResult.vue'
        ], resolve),
      meta: {
        title: '支付结果'
      }
    },
    {
      path: '/collect',
      name: 'collect',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/collect/Collect.vue'], resolve),
      meta: {
        title: '我的收藏'
      }
    },
    {
      // 订单详情
      path: '/orderDetail',
      name: 'orderDetail',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/order/OrderDetail.vue'], resolve),
      meta: {
        title: '盟友淘'
      }
    },
    {
      // 404页面，放在最后
      path: '*',
      name: '404',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/other/404.vue'], resolve),
      meta: {
        title: '盟友淘'
      }
    }
  ]
})

// console.log('Vue', Vue)
router.beforeEach((to, from, next) => {
  if (process.env.NODE_ENV === 'development') {
    // 开发环境就不进行微信授权
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  } else {
    // 在切换页面时，都要检查userInfo，如果没有的话，得发起微信授权
    var code = to.query.code
    if (code) {
      // 有微信code值
      console.log('有code值', code)
      store.commit('getUserInfo', { code: code })
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        document.title = to.meta.title
      }
      next()
    } else {
      console.log('store.state.userInfo', store.state.userInfo)
      // 没有的话，需判断是否已经获取微信相关信息了
      if (!store.state.userInfo.wechatInfo) {
        // 需要微信授权获取用户信息
        var curWwwPath = window.document.location.href
        // 获取主机地址之后的目录
        var pathName = window.document.location.pathname
        var pos = curWwwPath.indexOf(pathName)
        // 获取主机地址
        var localhostPaht = curWwwPath.substring(0, pos)
        let fromUrl = localhostPaht + router.history.base + to.path
        // console.log('需要微信访问路径', fromUrl)
        window.location.href = ' https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3411d52f54a19541&redirect_uri=' + encodeURIComponent(fromUrl) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
      } else {
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
          document.title = to.meta.title
        }
        next()
      }
    }
  }
})

export default router

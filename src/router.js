import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import initApi from './initApi'
import VueCookies from 'vue-cookies'


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
      redirect: { name: 'index' }
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
      component: (resolve) => require(['./views/good/Book.vue'], resolve),
      meta: {
        title: '书籍详情'
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
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/clz/Clz.vue'], resolve),
      meta: {
        title: '分类'
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/personal/Personal.vue'], resolve),
      meta: {
        title: '汇书阁'
      }
    },
    {
      path: '/personalData',
      name: 'personalData',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/personal/PersonalData.vue'], resolve),
      meta: {
        title: '个人资料'
      }
    },
    {
      path: '/personalAdrress',
      name: 'personalAdrress',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/personal/AddressEdit.vue'], resolve),
      meta: {
        title: '个人信息'
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
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/pay/Pay.vue'], resolve),
      meta: {
        title: '确认信息'
      }
    },
    {
      path: '/payResult',
      name: 'payResult',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/pay/PayResult.vue'], resolve),
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
        title: '汇书阁'
      }
    },
    {
      // 售后中心
      path: '/afterSale',
      name: 'afterSale',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/afterSale/AfterSale.vue'], resolve),
      meta: {
        title: '售后中心'
      }
    },
    {
      // 退货申请
      path: '/returnApplication',
      name: 'returnApplication',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/afterSale/ReturnApplication.vue'], resolve),
      meta: {
        title: '退货申请'
      }
    },
    {
      // 退货进度
      path: '/returnDetail',
      name: 'returnDetail',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/afterSale/ReturnDetail.vue'], resolve),
      meta: {
        title: '服务单详情'
      }
    },
    {
      // 快递页面
      path: '/express',
      name: 'express',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/express/Express.vue'], resolve),
      meta: {
        title: '快递页面'
      }
    },
    {
      // 个人书籍
      path: '/personalBook',
      name: 'personalBook',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/good/Book2.vue'], resolve),
      meta: {
        title: '个人书籍'
      }
    },
    {
      // 书籍管理
      path: '/bookManage',
      name: 'bookManage',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/manage/BookManage.vue'], resolve),
      meta: {
        title: '书籍管理'
      }
    },
    {
      // 卖出书籍
      path: '/sellOrder',
      name: 'sellOrder',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/order/SellOrder.vue'], resolve),
      meta: {
        title: '卖出书籍'
      }
    },
    {
      // 404页面，放在最后
      path: '*',
      name: '404',
      component: (resolve) => require(/* webpackChunkName: "about" */ ['./views/other/404.vue'], resolve),
      meta: {
        title: '汇书阁'
      }
    }
  ]
})

// console.log('Vue', Vue)
router.beforeEach((to, from, next) => {
  if (!store.state.userInfo.wechatInfo && VueCookies.isKey('userInfo')) {
    // 重新进入页面时，如果cookie存在userInfo就不用重新微信登录验证
    console.log('VueCookies-userInfo', VueCookies.get('userInfo'))
    store.state.userInfo = VueCookies.get('userInfo')
  }
  if (process.env.NODE_ENV === 'development') {
    // 开发环境就不进行微信授权
    initApi.init(to)
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
      if (code !== store.state.userInfo.code) {
        // 防止微信回调两次相同的code值，请求后台出错
        store.commit('getUserInfo', { code: code,
          callBack: function () {
            // 设置cookie
            VueCookies.set('userInfo', JSON.stringify(store.state.userInfo), 60 * 60 * 1) // 一个小时过期
            console.log('跳转的路径名', to.name)
            // 这里回调只是为了调用页面api之前先完成了getUserInfo请求
            initApi.init(to)
            let param = to.query
            var obj = new Object()
            for (let paramKey in param) {
              if (paramKey !== 'code' && paramKey !== 'state') {
                obj[paramKey] = param[paramKey]
              }
            }
            console.log('请求参数', obj)
            router.push({ name: to.name, query: obj })
          } })
      } else {
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
          document.title = to.meta.title
        }
        // 防止微信回调两次相同的code值，请求后台出错
        store.state.userInfo.code = code
        next()
      }
    } else {
      console.log('store.state.userInfo', store.state.userInfo)
      // 没有的话，需判断是否已经获取微信相关信息了
      if (!store.state.userInfo.wechatInfo) {
        if (!store.state.isGetUserInfoing) {
          // 需要微信授权获取用户信息
          var curWwwPath = window.document.location.href
          // 获取主机地址之后的目录
          var pathName = window.document.location.pathname
          var pos = curWwwPath.indexOf(pathName)
          // 获取主机地址
          var localhostPaht = curWwwPath.substring(0, pos)
          localhostPaht = localhostPaht + router.history.base + to.path
          // console.log('需要微信访问路径', fromUrl)
          // initApi.init(to)
          let param = to.query
          var obj = new Object()
          let paramStr = ''
          for (let paramKey in param) {
            if (paramKey !== 'code' && paramKey !== 'state') {
              obj[paramKey] = param[paramKey]
              paramStr += paramKey + '=' + param[paramKey] + '&'
            }
          }
          paramStr = paramStr.substr(0, paramStr.length - 1)
          if (paramStr){
            localhostPaht = localhostPaht + '?' + paramStr
          }
          console.log('访问微信授权链接', localhostPaht)
          // alert('访问微信授权链接:' + localhostPaht)
          window.location.href = ' https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxad55a11373d3ad0d&redirect_uri=' + encodeURIComponent(localhostPaht) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
        }
        /* 路由发生变化修改页面title */
        // if (to.meta.title) {
        //   document.title = to.meta.title
        // }
        // next()
      } else {
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
          document.title = to.meta.title
        }
        // wechatInfo不为空，直接调用初始化api
        initApi.init(to)
        next()
      }
    }
  }
})

export default router

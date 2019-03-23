import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import 'mint-ui/lib/style.css'
// 滚动监听
import { InfiniteScroll, Spinner } from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'

import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api/install'

Vue.use(api)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 全局注册滚动监听和图片懒加载
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.use(VueLazyLoad, {
  error: '../assets/img/good/加载失败.png',
  loading: 'img/logo2.png',
  adapter: {
    loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      // do something here
      // example for call LoadedHandler
      // console.log("图片加载完毕",el,naturalHeight,naturalWidth,src,$parent,Init);
      // if(naturalHeight>naturalWidth){
      //   console.log("高度比宽度大",el);
      // }

    }
  }
})

// 这部分已经移至到router.js
// console.log(encodeURIComponent('http://www.tdxiov.com/shopping/index'))
// 获取微信用户信息
// console.log(store.state.userInfo, router.history)
// var getRequerst = function () {
//   var url = window.location.search
//   var theRequest = new Object()
//   var strs = []
//   if (url.indexOf('?') != -1) {
//     var str = url.substr(1)
//     strs = str.split('&')
//     for (var i = 0; i < strs.length; i++) {
//       theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
//     }
//   }
//   return theRequest
// }
//
// var Request = new Object()
// Request = getRequerst()
// var code = Request['code']
// console.log('code', code)
// if (code) {
//   // 有微信code值
//   console.log('有code值', code)
//   alert('有code值:' + code)
// } else {
//   // 没有的话，需判断是否已经获取微信相关信息了
//   if (!store.state.userInfo.wechatInfo) {
//     // 需要微信授权获取用户信息
//     let fromUrl = window.location.href
//     console.log('需要微信访问路径', fromUrl)
//     window.location.href = ' https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3411d52f54a19541&redirect_uri=' + encodeURIComponent(fromUrl) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
//   }
// }
//
// // router.push({name:'cart'})

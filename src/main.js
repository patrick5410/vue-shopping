import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/install'
import 'lib-flexible'
import 'mint-ui/lib/style.css'
// 滚动监听
import { InfiniteScroll, Spinner } from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'

import axios from 'axios'

Vue.use(axios)
Vue.use(api)

Vue.config.productionTip = false

// 商品详情路径
Vue.prototype.goodDetailUrl = '/good'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// 全局注册滚动监听和图片懒加载
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.use(VueLazyLoad, {
  error: '/img/good/加载失败.png',
  loading: '/img/good/加载.png',
  adapter: {
    loaded({
      bindType,
      el,
      naturalHeight,
      naturalWidth,
      $parent,
      src,
      loading,
      error,
      Init
    }) {
      // do something here
      // example for call LoadedHandler
      // console.log("图片加载完毕",el,naturalHeight,naturalWidth,src,$parent,Init);
      // if(naturalHeight>naturalWidth){
      //   console.log("高度比宽度大",el);
      // }
    }
  }
})
console.log('加载')

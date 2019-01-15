import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
// import 'iview/dist/styles/iview.css'
// import 'mint-ui/lib/checklist/style.css'
import { Input } from 'iview'

Vue.config.productionTip = false

Vue.component('Input', Input)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

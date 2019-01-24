import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    choosedAddress: null, // 选择地址：结算确认地址或选择编辑地址
    order: null// 当前订单
  },
  mutations: {

  },
  actions: {

  }
})

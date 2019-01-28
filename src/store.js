import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// console.log('Vue', Vue)

export default new Vuex.Store({
  state: {
    choosedAddress: null, // 选择地址：结算确认地址或选择编辑地址
    order: null, // 当前订单
    userInfo: {// 用户信息
      /**
       * 微信相关信息（openid用户的唯一标识 nickname用户昵称 sex用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
       * province用户个人资料填写的省份
       * city普通用户个人资料填写的城市
       * country国家，如中国为CN headimgurl用户头像）
       **/
      wechatInfo: null,
      code: ''
    }
  },
  mutations: {
    async getUserInfo (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.user.getUserInfo({ code: payload.code })
        if (res.success) {
          state.userInfo = res.data
        }
        console.log('​getMatches -> res', res, state.userInfo)
      } catch (e) {
        console.log('​catch -> e', e)
      }
    }
  },
  actions: {

  }

})

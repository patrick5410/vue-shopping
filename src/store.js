import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// console.log('Vue', Vue)

export default new Vuex.Store({
  state: {
    userInfo: {// 用户信息
      /**
       * 微信相关信息（openid用户的唯一标识 nickname用户昵称 sex用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
       * province用户个人资料填写的省份
       * city普通用户个人资料填写的城市
       * country国家，如中国为CN headimgurl用户头像）
       **/
      wechatInfo: null,
      code: '',
      token: ''
    },
    recommendClass: {},
    goods: [], // 首页商品
    goodPage: {}, // 每次请求的商品分页封装
    classes: [], // 所有类型商品
    class: {}, // 某类型商品
    searchGoods: {}, // 某类型商品
    goodDetail: {}, // 商品详情
    choosedAddress: null, // 选择地址：结算确认地址或选择编辑地址
    order: null // 当前订单
  },
  mutations: {
    /**
     * 获取用户信息
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getUserInfo (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.user.getUserInfo({ code: payload.code })
        if (res.success) {
          state.userInfo = res.data
          // window.localStorage.setItem('token', res.data.token)
        }
        console.log('​getMatches -> res', res, state.userInfo)
      } catch (e) {
        console.log('​catch -> e', e)
      }
      // console.log('回调函数', payload)
      if (payload.callBack && typeof payload.callBack === 'function') {
        payload.callBack()
      }
    },
    /**
     * 获取推荐商品类型
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getRecommend (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.clz.getRecommend()
        if (res.success) {
          state.recommendClass = res.data
        }
        console.log('​getMatches -> res', res, state.userInfo)
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 分页获取商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getGoods (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let currentPage = 1
        if (payload.hasOwnProperty('currentPage') && payload.currentPage) {
          currentPage = payload.currentPage
        }
        let res = await this._vm.$api.good.getGoods({ currentPage: currentPage })
        if (res.success) {
          state.goodPage = res.data
          state.goods = state.goods.concat(res.data.listData)
        }
        console.log('请求商品接口完毕', state.goodPage, state.goods)
      } catch (e) {
        console.log('​catch -> e', e)
      }

      // console.log('回调函数', payload)
      if (payload.callBack && typeof payload.callBack === 'function') {
        payload.callBack()
      }
    },
    /**
     * 获取所有类型商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getClasses (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.clz.getClasses()
        if (res.success) {
          state.classes = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取某个类型商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getClass (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.clz.getClass(payload.data)
        if (res.success) {
          state.class = res.data
        }
        console.log('​getMatches -> res', res, state.userInfo)
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 关键字搜索商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async search (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.good.search(payload.data)
        if (res.success) {
          state.searchGoods = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 商品详情
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async detail (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.good.detail(payload.data)
        if (res.success) {
          state.goodDetail = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    async test (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.user.getTest()
        if (res.success) {
          console.log('请求测试成功')
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

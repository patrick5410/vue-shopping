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
    currentClzId: 0, // 分类id
    class: {}, // 某类型商品
    searchGoods: {}, // 搜索商品
    goodDetail: {}, // 商品详情
    cartGoods: [], // 购物车商品
    guessGoods: [], // 测试商品
    collectGoods: [], // 收藏商品
    afterSaleGoods: [], // 售后商品
    returnGood: {}, // 退货商品
    returnGoodDetail: {}, // 退货详情
    addresses: [], // 收货地址
    choosedAddress: null, // 选择地址：选择编辑地址
    orders: [], // 所有订单
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
          console.log('调试商品goods', state.goods)
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
          state.currentClzId = state.classes[0].classId
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
    /**
     * 添加商品到购物车
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async addGood (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.cart.addGood(payload.data)
        if (res.success) {
          state.goodDetail.cartCount = res.data.cartCount
          // console.log('回调函数', payload)
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack(res)
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取购物车商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getCartGoods (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.cart.getGoods()
        if (res.success) {
          console.log('请求测试成功')
          state.cartGoods = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 改变购物车商品数量
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async changeCartCount (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.cart.changeCount(payload.data)
        if (res.success) {
          for (let i = 0; i < state.cartGoods; i++) {
            let cartGood = state.cartGoods[i]
            if (cartGood.id === payload.data.cartId) {
              cartGood.count = res.count
            }
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 删除购物车商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async deleteCartGood (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.cart.deleteGood(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 收藏商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async collectGood (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.collect.addGood(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 删除收藏
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async deleteCollect (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.collect.deleteGood(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取收藏商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getCollect (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.collect.getCollect()
        if (res.success) {
          state.collectGoods = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取用户所有收货地址
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getAddresses (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.address.getAddresses()
        if (res.success) {
          state.addresses = res.data
          console.log('state.addresses', state.addresses)
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 添加地址
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async addAddress (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.address.addAddress(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 编辑地址
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async editAddress (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.address.editAddress(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 删除地址
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async deleteAddress (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.address.deleteAddress(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 设置默认收货地址
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async setDefaultAddress (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.address.setDefault(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 生成订单
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async createOrder (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.createOrder(payload.data)
        if (res.success) {
          state.order = res.data
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取用户所有订单
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getOrders (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.getOrders()
        if (res.success) {
          state.orders = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 根据订单id获取订单
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getOrder (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.getOrder(payload.data)
        if (res.success) {
          state.order = res.data
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 取消订单
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async cancelOrder (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.cancelOrder(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 购物车商品下单
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async cartToBuy (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.cart.cartToBuy(payload.data)
        if (res.success) {
          state.order = res.data
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 支付订单
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async payOrder (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.payOrder(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack(res.data)
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 订单退款
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async refundOrder (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.refundOrder(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack(res.data)
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 删除订单
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async deleteOrder (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.deleteOrder(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 确认收货
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async confirmReceive (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.order.confirmReceive(payload.data)
        if (res.success) {
          console.log('更新前state.userInfo', state.userInfo)
          state.userInfo.creditScore = res.data.creditScore
          console.log('更新后state.userInfo', state.userInfo)
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack()
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取用户可能喜欢的商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async guessGoods (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.good.guess()
        if (res.success) {
          state.guessGoods = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取售后商品
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getAfterSaleGoods (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.afterSale.getAfterSaleGoods()
        if (res.success) {
          state.afterSaleGoods = res.data
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 上传图片
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async upload (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.upload.upload(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack(res.data)
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack()
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 获取退货信息
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async getReturnGood (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.afterSale.getReturnGood(payload.data)
        if (res.success) {
          state.returnGood = res.data
          // 重新封装下显示信息
          let reasons = [{
            label: '请选择退货原因',
            type: 'info'
          }]
          for (let i = 0; i < state.returnGood.reasons.length; i++) {
            reasons.push(state.returnGood.reasons[i])
          }
          // 退货原因
          state.returnGood.reasons = reasons
          let imgs = []
          for (let i = 0; i < state.returnGood.returnImgs.length; i++) {
            imgs.push({
              img: state.returnGood.returnImgs[i],
              show: false
            })
          }
          // 退货上传照片
          state.returnGood.returnImgs = imgs
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    /**
     * 退货申请
     * @param state
     * @param payload
     * @returns {Promise<void>}
     */
    async returnApplication (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.afterSale.returnApplication(payload.data)
        if (res.success) {
          if (payload.successCallBack && typeof payload.successCallBack === 'function') {
            payload.successCallBack(res.data)
          }
        } else {
          if (payload.failCallBack && typeof payload.failCallBack === 'function') {
            payload.failCallBack(res)
          }
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    async getReturnGoodDetail (state, payload) {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      try {
        let res = await this._vm.$api.afterSale.getReturnGoodDetail(payload.data)
        if (res.success) {
          state.returnGoodDetail = res.data
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

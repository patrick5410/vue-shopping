import store from './store'

export default {
  init: function (router) {
    console.log('测试是否初始化接口', router)
    switch (router.name) {
      case 'index':
        // console.log('首页接口')
        if (store.state.goods.length <= 0) {
          store.commit('getRecommend')
          store.commit('getGoods', { currentPage: 1 })
        }
        break
      case 'clz':
        // console.log('分类接口')
        store.commit('getClasses')
        break
      case 'showMore':
        store.commit('getClass', { data: { classId: router.query.classId } })
        break
      case 'searchResult':
        store.commit('search', { data: { keyword: router.query.keyword } })
        break
      case 'good':
        store.commit('detail', { data: { goodId: router.query.goodId } })
        break
      case 'cart':
        store.commit('getCartGoods')
        break
      case 'collect':
        store.commit('getCollect')
        break
      case 'addressManage':
        store.commit('getAddresses')
        break
      case 'order':
        store.commit('getOrders')
        break
      case 'payPage':
        if (!store.state.order || router.query.orderId) {
          // 如果没有订单，需从后台获取
          store.commit('getOrder', { data: { orderId: router.query.orderId } })
        }
        break
      case 'orderDetail':
        store.commit('getOrder', { data: { orderId: router.query.orderId } })
        break
    }
  }
}

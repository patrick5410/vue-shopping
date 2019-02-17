import store from './store'

export default {
  init: function (name) {
    console.log('测试是否初始化接口')
    switch (name) {
      case 'index':
        console.log('首页接口')
        store.commit('getRecommend')
        store.commit('getGoods', { currentPage: 1 })
        break
      case 'clz':
        console.log('分类接口')
        // 测试访问
        store.commit('test')
        break
    }
  }
}

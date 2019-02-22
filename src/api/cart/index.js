import api from '../index'
import urls from './urls'

// const header = {}

export default {
  addGood (data) {
    // return出去了一个promise
    return api.post(urls.addGood, null, null, data)
  },
  getGoods () {
    // return出去了一个promise
    return api.post(urls.getGoods, null, null, null)
  },
  changeCount (data) {
    // return出去了一个promise
    return api.post(urls.changeCount, null, null, data)
  },
  deleteGood (data) {
    // return出去了一个promise
    return api.post(urls.deleteGood, null, null, data)
  },
  cartToBuy (data) {
    // return出去了一个promise
    return api.post(urls.cartToBuy, null, null, data)
  }
}

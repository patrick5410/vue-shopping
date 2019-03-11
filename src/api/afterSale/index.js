import api from '../index'
import urls from './urls'

// const header = {}

export default {
  getAfterSaleGoods () {
    // return出去了一个promise
    return api.post(urls.getAfterSaleGoods, null, null, null)
  },
  getReturnGood (data) {
    // return出去了一个promise
    return api.post(urls.getReturnGood, null, null, data)
  },
  returnApplication (data) {
    // return出去了一个promise
    return api.post(urls.returnApplication, null, null, data)
  },
  getReturnGoodDetail (data) {
    // return出去了一个promise
    return api.post(urls.getReturnGoodDetail, null, null, data)
  },
  updateDeliveryId (data) {
    // return出去了一个promise
    return api.post(urls.updateDeliveryId, null, null, data)
  }
}

import api from '../index'
import urls from './urls'

// const header = {}

export default {
  createOrder (data) {
    // return出去了一个promise
    return api.post(urls.createOrder, null, null, data)
  },
  pay (data) {
    // return出去了一个promise
    return api.post(urls.createOrder, null, null, data)
  },
  getOrders () {
    // return出去了一个promise
    return api.post(urls.getOrders, null, null, null)
  },
  getOrder (data) {
    // return出去了一个promise
    return api.post(urls.getOrder, null, null, data)
  },
  detail (data) {
    // return出去了一个promise
    return api.post(urls.detail, null, null, data)
  },
  cancelOrder (data) {
    // return出去了一个promise
    return api.post(urls.cancelOrder, null, null, data)
  },
  payOrder (data) {
    // return出去了一个promise
    return api.post(urls.payOrder, null, null, data)
  },
  refundOrder (data) {
    // return出去了一个promise
    return api.post(urls.refundOrder, null, null, data)
  },
  deleteOrder (data) {
    // return出去了一个promise
    return api.post(urls.deleteOrder, null, null, data)
  },
  confirmReceive (data) {
    // return出去了一个promise
    return api.post(urls.confirmReceive, null, null, data)
  }
}

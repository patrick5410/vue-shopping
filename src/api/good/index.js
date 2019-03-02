import api from '../index'
import urls from './urls'

// const header = {}

export default {
  getGoods (data) {
    // return出去了一个promise
    return api.post(urls.getGoods, null, null, data)
  },
  search (data) {
    // return出去了一个promise
    return api.post(urls.search, null, null, data)
  },
  detail (data) {
    // return出去了一个promise
    return api.post(urls.detail, null, null, data)
  },
  guess (data) {
    // return出去了一个promise
    return api.post(urls.guess, null, null, data)
  }
}

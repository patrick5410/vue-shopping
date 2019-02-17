import api from '../index'
import urls from './urls'

// const header = {}

export default {
  getGoods (data) {
    // return出去了一个promise
    return api.post(urls.getGoods, null, null, data)
  }
}

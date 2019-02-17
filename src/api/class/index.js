import api from '../index'
import urls from './urls'

// const header = {}

export default {
  getRecommend () {
    // return出去了一个promise
    return api.post(urls.getRecommend, null, null, null)
  }
}

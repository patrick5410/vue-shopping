import api from '../index'
import urls from './urls'

// const header = {}

export default {
  getUserInfo (data) {
    // return出去了一个promise
    return api.post(urls.userInfo, null, null, data)
  },
  getTest () {
    return api.post(urls.test, null, null, null)
  }
}

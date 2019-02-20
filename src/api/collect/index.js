import api from '../index'
import urls from './urls'

// const header = {}

export default {
  addGood (data) {
    // return出去了一个promise
    return api.post(urls.addGood, null, null, data)
  },
  getCollect () {
    // return出去了一个promise
    return api.post(urls.getCollect, null, null, null)
  },
  deleteGood (data) {
    // return出去了一个promise
    return api.post(urls.deleteGood, null, null, data)
  }
}

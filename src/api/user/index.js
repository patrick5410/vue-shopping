import api from '../index'
import urls from './urls'

const header = {}

export default {
  getUserInfo (params) {
    // return出去了一个promise
    return api.post(urls.matches, params, header)
  }
}

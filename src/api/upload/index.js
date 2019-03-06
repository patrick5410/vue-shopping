import api from '../index'
import urls from './urls'

// const header = {}

export default {
  upload () {
    // return出去了一个promise
    return api.post(urls.upload, null, null, null)
  }
}

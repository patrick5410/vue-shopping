import api from '../index'
import urls from './urls'

// const header = {}

export default {
  getAddresses () {
    // return出去了一个promise
    return api.post(urls.getAddress, null, null, null)
  },
  addAddress (data) {
    // return出去了一个promise
    return api.post(urls.addAddress, null, null, data)
  },
  editAddress (data) {
    // return出去了一个promise
    return api.post(urls.editAddress, null, null, data)
  },
  deleteAddress (data) {
    // return出去了一个promise
    return api.post(urls.deleteAddress, null, null, data)
  },
  setDefault (data) {
    // return出去了一个promise
    return api.post(urls.setDefault, null, null, data)
  }
}

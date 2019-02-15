import apiList from './apiList'

const install = function (Vue) {
  if (install.installed) {
    // return
  } else {
    // console.log('未安装', Vue)
    install.installed = true
    Object.defineProperties(Vue.prototype, {
      $api: {
        get () {
          return apiList
        }
      }
    })
  }
}
export default {
  install
}

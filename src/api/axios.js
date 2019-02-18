import axios from 'axios'
import store from "../store";

// 创建 axios 实例
let service = axios.create({
  // headers: {'Content-Type': 'application/json'},
  timeout: 60000
})

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
      // console.log('请求前打印this', this)
      // console.log('请求前打印store', store)
      // console.log('请求前打印token', store.state.userInfo.token)
      // console.log('请求前打印header', service.defaults.headers)
      // // service.defaults.headers.post['token'] = store.state.userInfo.token
      // console.log('请求之后打印header', service.defaults.headers)
      if (store.state.userInfo.wechatInfo) {
        // console.log('缓存token', window.localStorage.getItem('token'))
        // config.headers['token'] = window.localStorage.getItem('token')
        config.headers['token'] = store.state.userInfo.token
      }
    }
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data } = response
    console.log('response', data)
    if (!data.success) {
      if (data.errorCode === 10000 || data.errorCode === 10010) {
        // 没有登录或token过期需删除token,重新刷新页面登录
        // window.localStorage.removeItem('token')
        store.state.userInfo.wechatInfo = null
        window.location.reload()
      }
    }
    return data
  },
  (error) => {
    let info = {}

    let { status, statusText, data } = error.response

    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      }
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      }
    }
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return service
}

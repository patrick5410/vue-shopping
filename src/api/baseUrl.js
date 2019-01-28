let baseUrl = '/api' // 本地代理

switch (process.env.NODE_ENV) {
  case 'dev':
    baseUrl = 'http://localhost:8080/' // 测试环境
    break
  case 'pre':
    baseUrl = 'http://localhost:8080/' // 预上线
    break
  case 'production':
    baseUrl = 'http://localhost:8080/' // 生产环境
    break
  default:
    break
}

export default {
  baseUrl
}

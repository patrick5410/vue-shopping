let baseUrl = '/api' // 本地代理

switch (process.env.NODE_ENV) {
  case 'dev':
    baseUrl = 'https://www.tdxiov.com:28443/shopping' // 测试环境url
    break
  case 'pre':
    baseUrl = 'https://www.tdxiov.com:28443/shopping' // 预上线环境url
    break
  case 'production':
    baseUrl = 'https://www.tdxiov.com:28443/shopping' // 生产环境url
    break
}

export default baseUrl

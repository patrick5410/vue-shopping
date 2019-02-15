let baseUrl = '/api' // 本地代理
console.log('baseUrl改变前', baseUrl, process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'https://www.tdxiov.com:28443/shopping' // 测试环境url
    break
  case 'pre':
    baseUrl = 'https://www.tdxiov.com:18443/shopping' // 预上线环境url
    break
  case 'production':
    baseUrl = 'https://www.tdxiov.com:28443/shopping' // 生产环境url
    break
}
console.log('baseUrl改变后', baseUrl)

export default baseUrl

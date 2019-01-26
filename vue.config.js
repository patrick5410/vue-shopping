const vuxLoader = require('vux-loader')
module.exports = {
  publicPath: '/shopping',
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: ['vux-ui'],
      assetsPublicPath: '/shopping'
    })
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  devServer: {
    port: 8080
  }
}

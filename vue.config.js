const vuxLoader = require('vux-loader')

module.exports = {
  configureWebpack: (config) => {
    vuxLoader.merge(config, {
      plugins: ['vux-ui']
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

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/commute' : '/',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: 'http://10.75.240.238:38080/app/mock/22/'
  }
}

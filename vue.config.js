module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/commute' : '/',
  publicPath: '/',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: 'http://8.131.89.39:8008/'
  }
}

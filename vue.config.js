module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/VueCli3-vuex/'
    : '/',
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  }
}

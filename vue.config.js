module.exports = {
  publicPath: './',
  // publicPath: '../static/',
  devServer: {
    proxy: {
      '': {
        // target:'http://10.8.0.120:8778/', //测试环境地址
        // target:'http://localhost:8778', //线上服务器地址
        // target:'http://10.8.0.120:8803',   //新测试环境
        // target:'https://api.vvhan.com/api',
        target:'https://10.8.0.249:8804',
        ws: true,
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数  https:false
        pathRewrite: { '^': '' }
      }
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hotOnly: false,
    disableHostCheck: true,
  },
}

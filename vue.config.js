module.exports = {
  publicPath: './',
  // publicPath: '../static/',
  devServer: {
    proxy: {
      '': {
        // target:'http://172.19.19.50:8000',
        // target: 'http://10.8.0.120:8000',//测试地址
        // target:'http://10.8.0.249:8805',//线上地址newnew
        target:'http://172.19.19.41:8000',//服务器地址newnew
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

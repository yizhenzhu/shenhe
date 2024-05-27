import axios from 'axios'
import https from 'https'
import router from '@/router' // 引入路由对象实例
const baseUrl = '/platform'

const instance = axios.create({
  // baseURL:baseUrl,
  headers: { 'Content-Type': 'application/json' },
  //忽略证书
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
  // timeout:10000
});

instance.interceptors.response.use(function (response) {
  // 响应数据  返回得到的响应数据  第一层data是axios默认包data, 第二个data是接口返回里面的包的data
// 请求拦截器
// instance.interceptors.request.use(config => {
//   // 如果请求包含特定的路径，修改 baseURL
//   if (config.url.includes('/export/markdown')) {
//     config.baseURL = 'http://rap2api.taobao.org';
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// // 响应拦截器
// instance.interceptors.response.use(function (response) {
//   // 响应数据  
  
  
  try {
    return response
    
  } catch (error) {
    return response
  }
},

 async function (error) {
  // 错误的时候 token容易失效  处理token失效的问题
  // 如何判断失效
  // error  => config (当前请求 的配置) request(请求) response(响应)
  if ((error.response && error.response.code=== 403)||(error.response && error.response.status=== 403)) {
    // 将path换成fullPath, 目的是丢失我们的参数
    // this.$message('连接超时，请重新登录')
    console.log('超时')
    router.push('/')
   
  }
  if ((error.response && error.response.status=== 404)||(error.response && error.response.code=== 404)) {
    // 将path换成fullPath, 目的是丢失我们的参数
    // this.$message('页面不存在，请重新登录')
        router.push('/notPage')
    // router.push('/')
    // router.push('/login')
  }
  // if (error.response && error.response.status === 500) {
  //   // 将path换成fullPath, 目的是丢失我们的参数
  //   router.push('/notPage')
  // }
  return Promise.reject(error)
})
export default instance

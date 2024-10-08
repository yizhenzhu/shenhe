//入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/api/axios'

// 这句全局引用element-ui（pc端）
import Element from 'element-ui'
import 'jquery'
import store from './store'

// 这句把所有组件都导入了
import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/index.css'
import preventClick from './utils/controlClickState'
import formatDate from './utils/formatDate'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

//原型链
Vue.prototype.$echarts = echarts
// Vue.prototype.$=jquery

Vue.prototype.$http = axios//调用this.$http
Vue.prototype.formatDate = formatDate//格式化时间
Vue.prototype.$times = dayjs

// 插件安装初始化，内部将所有的element-ui组件导入并注册
Vue.use(Element) //element ui--button组件实例、https://element.eleme.cn/#/en-US/component/button---现有样式学习
Vue.use(preventClick)
// Vue.use(store)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




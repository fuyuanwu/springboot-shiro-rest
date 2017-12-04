import 'es6-promise/auto'
import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import router from './router'
import store from './store/index'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
// 统一设置ajax请求超时时长
Axios.interceptors.request.use(function (config) {
  config.timeout = 1000 * 30 // 30秒
  return config
}, function (error) {
  return Promise.reject(error)
})
Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
Axios.defaults.withCredentials = true
router.beforeEach((to, from, next) => {
  next()
  // if (to.fullPath !== '/login' && !store.state.data.authorized) {
  //   next('/login')
  // } else {
  //   next()
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

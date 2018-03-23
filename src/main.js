// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import'./assets/css/icons/font-icons/iconfont.css'
import'./assets/css/bootstrap/dist/css/bootstrap.min.css'
import'./assets/css/custom.css'
import './assets/js/jquery.min.js'
import './assets/js/jquery.cookie.js'
import apiUrl from './assets/js/url.js'
Vue.prototype.apiUrl = apiUrl
import'./assets/css/bootstrap/dist/js/bootstrap.min.js'
import'./assets/js/sidebar-nav.min.js'
import'./assets/js/jquery.slimscroll.js'
import'./assets/js/custom.js'
import './assets/css/index.css'
import {xhr} from '@/assets/js/api'
Vue.prototype.$xhr = xhr


Vue.config.productionTip = false
Vue.prototype.slideName = 'slide-left';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

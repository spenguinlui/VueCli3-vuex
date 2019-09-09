import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'

import './bus'
import currencyFilter from '@/components/filters/currency'
import dateFilter from '@/components/filters/date'
import numberFilter from '@/components/filters/number_2'

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zhTW', zhTWValidate)

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)
Vue.filter('number', numberFilter)

Vue.config.productionTip = false
axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        console.log('驗證通過')
        next()
      } else {
        console.log('驗證失敗')
        next({
          path: './login'
        })
      }
    })
  } else {
    next()
  }
})

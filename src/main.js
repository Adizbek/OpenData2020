import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueChimera from "vue-chimera"

Vue.config.productionTip = false

import './scss/main.scss'

Vue.use(VueChimera, {
  baseURL: 'https://api.expert.uz'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

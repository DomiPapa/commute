import Vue from 'vue'

import vuetify from './plugins/vuetify'

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

document.title = '基地至管理中心考斯特乘车预约'

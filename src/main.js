import Vue from 'vue'

import vuetify from './plugins/vuetify'

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'
// 引入video player
import VueVideoPlayer from 'vue-video-player'
// require videojs style
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

document.title = '基地至管理中心考斯特乘车预约'

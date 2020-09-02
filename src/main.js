import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'

import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')

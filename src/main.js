import Vue from 'vue';

import App from './App.vue';

import { firestorePlugin } from 'vuefire';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

import 'bootstrap';
import { BootstrapVue} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);


new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue';

import { firestorePlugin } from 'vuefire';
Vue.config.productionTip = false;
Vue.use(firestorePlugin);

import 'bootstrap';
import { BootstrapVue} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import DataTable from '@andresouzaabreu/vue-data-table'
Vue.component("data-table", DataTable)
import 'bootstrap/dist/css/bootstrap.min.css'
import '@andresouzaabreu/vue-data-table/dist/DataTable.css'


import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from './Home.vue';
import Reports from './Reports.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/reports', component: Reports },
];

const router = new VueRouter({
	routes
});

new Vue({
	router
}).$mount('#app');
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './router/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Result from './components/Result.vue';

Vue.component(Result)
Vue.use(VueAxios, axios)
Vue.use(VueRouter);

// export const eventBus = new Vue();

const router = new VueRouter({
	routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

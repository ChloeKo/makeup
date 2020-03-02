import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './router/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Result from './components/Result.vue';
import {store} from './store.js'

Vue.component(Result)
Vue.use(VueAxios, axios)
Vue.use(VueRouter);
// 請求攔截
axios.interceptors.request.use((req)=>{
	if(localStorage.eleToken){
		req.headers.Authorization = localStorage.eleToken;
		return req;
	}else{
		return req;
	}
})
// 響應攔截
axios.interceptors.response.use(res=>{
	return res
	})
const router = new VueRouter({
	routes
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

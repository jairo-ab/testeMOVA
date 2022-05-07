import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App'
import axios from "axios";
import VueAxios from 'vue-axios'
import VueMask from 'v-mask'
import VueMaterial from 'vue-material'
import Vuex from 'vuex'
import modules from './modules'
import 'vue-material/dist/vue-material.css'

import routes from "./routes/routes";

import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const router = new VueRouter({
  mode: "history",
  routes, 
});

const originalPush = router.push;
router.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originalPush.call(this, location, onResolve, onReject);
	}
	return originalPush.call(this, location).catch(err => err);
}

Vue.prototype.$http = axios

Vue.use(VueRouter);
Vue.use(VueMask);
Vue.use(Vuex)
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.use(IconsPlugin);
Vue.use(VueMaterial)

const store = new Vuex.Store({ modules })

/* eslint-disable no-new */
new Vue({
  el: "#app",
	render: (h) => h(App),
	store,
  router,
  axios,
});

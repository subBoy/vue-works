// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './app';
import details from 'components/details/details';
import list from 'components/list/list';
import user from 'components/user/user';
import index from 'components/index/index';
import input from 'components/input/app';

Vue.use(Vuex);
Vue.use(VueRouter);

const routes = [
	{path: '/', component: index},
	{path: '/index', component: index},
	{path: '/detail', component: details},
	{path: '/list', component: list},
	{path: '/user', component: user},
	{path: '/input', component: input}
];

const router = new VueRouter({
	linkActiveClass: 'active',
	routes: routes
});

const store = new Vuex.Store({
	state: {
		subScribeStatus: false,
		projectId: ''
	},
	mutations: {
		setTrue (state) {
			state.subScribeStatus = true;
		},
		setFalse (state) {
			state.subScribeStatus = false;
		},
		setProjectID (state, id) {
			state.projectId = id;
		},
		clearProjectID (state) {
			state.projectId = '';
		}
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	template: '<App/>',
	router: router,
	components: { App }
});


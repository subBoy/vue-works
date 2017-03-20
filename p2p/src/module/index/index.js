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
import signOn from 'components/signOn/signOn';

Vue.use(Vuex);
Vue.use(VueRouter);

const routes = [
	{path: '/', component: index},
	{path: '/index', component: index},
	{path: '/detail', component: details},
	{path: '/list', component: list},
	{path: '/user', component: user},
	{path: '/input', component: input},
	{path: '/signOn', component: signOn}
];

const router = new VueRouter({
	linkActiveClass: 'active',
	routes: routes
});

const store = new Vuex.Store({
	state: {
		subScribeStatus: false,
		projectId: '',
		confirmContent: {
			Status: false,
			Title: '',
			cancelText: '',
			okText: ''
		},
		userId: ''
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
		},
		setConfirmTrue (state, content) {
			state.confirmContent = {
				Status: true,
				Title: content.Title,
				cancelText: content.cancelText,
				okText: content.okText,
				cancelOperate: content.cancelOperate, // 如果值为0；该操作只关闭当前弹窗；并留在当前页，如果值为路径则跳转到当前路径
				okOperate: content.OkOperate // 如果值为0；该操作只关闭当前弹窗；并留在当前页，如果值为路径则跳转到当前路径
			};
		},
		setConfirmFalse (state) {
			state.confirmContent = {
				Status: false,
				Title: '',
				cancelText: '',
				okText: '',
				cancelOperate: '',
				okOperate: ''
			};
		},
		setUserId (state, userId) {
			state.userId = userId;
		},
		clearUserId (state, userId) {
			state.userId = '';
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


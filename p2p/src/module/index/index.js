// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';
import details from 'components/details/details';
import list from 'components/list/list';
import user from 'components/user/user';
import index from 'components/index/index';

Vue.use(VueRouter);

const routes = [
	{path: '/index', component: index},
  {path: '/detail', component: details},
  {path: '/list', component: list},
  {path: '/user', component: user}
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
});

router.push('/index');

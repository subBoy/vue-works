// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';
import details from 'components/details/details';

Vue.use(VueRouter);

const routes = [
  {path: '/detail', component: details}
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

import VueRouter from 'vue-router';

import UserList from '../components/UserList'
import UserEdit from '../components/UserEdit'

const routes = [
  { path: '*', redirect: '/list' },
  { component: UserList, path: '/list' },
  { component: UserEdit, path: '/user' }
];

export default new VueRouter({
  linkActiveClass: 'is-active',
  routes
});

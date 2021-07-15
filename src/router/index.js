import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import {users} from '../assets/users'
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      isAdminRequired: true
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach( async (to, from, next) => {
  const user = store.state.User.user;

  if(!user) { //get user from api in real world app if no user
    await store.dispatch( 'User/setUser', users[0]); //dispatch is the one that calls the store.actions
  }

  const isAdmin = true;
  const isAdminRequired = to.matched.some( record => record.meta.isAdminRequired);

  if(isAdminRequired && !isAdmin) {
    next( {name: 'Home'} )
  }else{
    next(); //goes to where you want to
  }
})

export default router

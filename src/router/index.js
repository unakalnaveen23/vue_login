import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/login.vue'
import register from '../views/register.vue'
import forgotpwd from '../views/forgotpwd.vue'
import Events from '../views/Events.vue'
import Participants from '../views/Participants.vue'
import dashboard from '../views/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/forgotpwd',
    name: 'forgotpwd',
    component: forgotpwd
  },
  {
    path: '/Events/:state',
    name: 'Events',
    component: Events,
    props:true
  },
  {
    path: '/Participants',
    name: 'Participants',
    component: Participants
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router

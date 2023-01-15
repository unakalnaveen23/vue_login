import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/login.vue'
import register from '../views/register.vue'
import forgotpwd from '../views/forgotpwd.vue'
import admin from '../views/admin.vue'
import employee from '../views/employee.vue'
import employeecreate from '../views/employeecreate.vue'
import employeeedit from '../views/employeeedit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/admin',
    name: 'admin',
    component: admin,
  },
      {
        path: '/employee',
        name: 'employee',
        component: employee
      },
      {
        path: '/employeecreate',
        name: 'employeecreate',
        component: employeecreate
      },
      {
        path: '/employee/:id/edit',
        component: employeeedit,
        name: 'employeeedit',
        props: true
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

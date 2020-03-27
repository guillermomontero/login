import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '@/firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: () => import(/* webpackChunkName: "ingreso" */ '../views/Ingreso.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      next({
        path: '/ingreso',
      })
    }
  } else {
    next()
  }
})

export default router

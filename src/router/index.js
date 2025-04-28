import { createRouter, createWebHistory } from 'vue-router'
import RouterFacade from '@/router/RouterFacade'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginVIew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !RouterFacade.isAuthenticated()) {
    sessionStorage.setItem('lastAttemptedRoute', to.fullPath)
    return next({ name: 'login' })
  }
  next()
})

export default router

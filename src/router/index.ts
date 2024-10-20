import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboard' },
      name: 'home',
      component: () => import('../views/home/index.vue'),
      beforeEnter: (to, from, next) => {
        const hasUser = checkUser()
        if (!hasUser) next('/login')
        next()
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/home/dashboard/index.vue')
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('../views/home/admin/index.vue'),
          beforeEnter: (to, from, next) => {
            const allowed = checkCredentials({ allowed: ['ADMIN'] })
            if (allowed) next()
            else next('/')
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      beforeEnter: (to, from, next) => {
        const hasUser = checkUser()
        const hasJwt = Cookies.get('JWT_TOKEN')
        if (hasJwt && hasUser) next('/')
        next()
      }
    }
  ]
})


const checkCredentials = (options: { allowed: string[] }) => {
  const authStore = useAuthStore()
  const user = authStore.user
  if (options.allowed.includes(user?.access_level)) {
    return true
  }
  return false
}

const checkUser = () => {
  const authStore = useAuthStore()
  const user = authStore.user
  if (!user) return false
  return true
}

export default router

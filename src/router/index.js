import { createRouter, createWebHistory } from 'vue-router'
import AnalyticPage from '@/components/pages/AnalyticPage.vue'
import MainPage from '@/components/pages/MainPage.vue'
const routes = [
  { path: '/analytics', component: AnalyticPage },
  { path: '/main', component: MainPage }
]
/*
const routes = [
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/App.vue'),
    meta: {
      auth: true,
      layout: 'default',
      title: 'Аналитика',
    },
  },
]
*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

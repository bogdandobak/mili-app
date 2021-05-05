import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import WelcomeQuiz from '@/pages/WelcomeQuiz.vue'
const Leaderboard = () => import('@/pages/Leaderboard.vue')
const Quiz = () => import('@/pages/Quiz.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'WelcomeQuiz',
    component: WelcomeQuiz
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/:notFound(.*)',
    component: WelcomeQuiz
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import WelcomeQuiz from '@/components/WelcomeQuiz.vue'
const Leaderboard = () => import('@/components/Leaderboard.vue')
const Quiz = () => import('@/components/Quiz.vue')

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

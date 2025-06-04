import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/views/Home.vue'
import Horses from '@/views/Horses.vue'
import Race from '@/views/Race/index.vue'
import Program from '@/views/Program.vue'
import Results from '@/views/Results.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/horses', component: Horses, name: 'Horses' },
  { path: '/race', component: Race, name: 'Race' },
  { path: '/program', component: Program, name: 'Program' },
  { path: '/results', component: Results, name: 'Results' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
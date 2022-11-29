import { createRouter, createWebHistory } from 'vue-router'
import FazerCadastro from '../views/FazerCadastro.vue'
import FazerLogin from '../views/FazerLogin.vue'
import HomePage from '../views/HomePage.vue'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/',
    name: 'FazerLogin',
    component: FazerLogin,
  },

  {
    path: '/',
    name: 'FazerCadastro',
    component: FazerCadastro,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

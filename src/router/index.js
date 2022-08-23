import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewCity from '../views/ViewCity.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/weather/:state/:city',
      name: 'ViewCity',
      component: ViewCity 
    }
  ]
})

export default router

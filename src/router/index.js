import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Tienda from '@/views/Tienda.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sistema',
    component: Home
  },
  {
    path: '/tienda',
    name: 'Tienda',
    component: Tienda
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Tienda from '@/views/Tienda.vue'
import Intro from '@/views/Intro.vue'
import Marco from '@/views/Marco.vue'
import Confeti from '@/views/Confeti.vue'
import HitCounter from '@/views/HitCounter.vue'
import Knotches from '@/views/Knotches.vue'

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
  },
  {
    path: '/intro/',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/intro/:message/:fontfamily/:fontsize/',
    name: 'Intro',
    props: true,
    component: Intro
  },
  {
    path: '/marco',
    name: 'Marco',
    component: Marco
  },
  {
    path: '/confeti',
    name: 'Confeti',
    component: Confeti
  },
  {
    path: '/hitCounter/:id?',
    name: 'HitCounter',
    component: HitCounter
  },
  {
    path: '/knotches',
    name: 'Knotches',
    component: Knotches
  }
]

const router = new VueRouter({
  routes
})

export default router

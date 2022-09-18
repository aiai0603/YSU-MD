import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
// import ImageGallery from '@/views/ImageGallery.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '主页',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
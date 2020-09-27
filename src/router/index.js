import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/commute',
    children: [
      {
        path: 'commute',
        component: () => import('@/views/commute/index'),
        name: 'Commute'
      }
    ]
  },
  {
    path: '/detail',
    component: Layout,
    redirect: '/detail/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/detail/index'),
        name: 'Detail'
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    routes: constantRoutes
  })

const router = createRouter()

export default router

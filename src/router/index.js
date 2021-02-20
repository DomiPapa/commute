import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
//import Layout from '@/layout-low'
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
  // 查看车辆预约情况
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
  },
  // 查看个人订车信息
  {
    path: '/reservation',
    component: Layout,
    redirect: '/reservation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/reservation/index'),
        name: 'Reservation'
      }
    ]
  },
  // 查看操作说明
  {
    path: '/instruction',
    component: Layout,
    redirect: '/instruction/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/instruction/index'),
        name: 'Instruction'
      }
    ]
  },
  // 反馈意见
  {
    path: '/suggestion',
    component: Layout,
    redirect: '/suggestion/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/suggestion/index'),
        name: 'Suggestion'
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

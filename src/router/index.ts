import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes: Array<RouteRecordRaw> = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

/**
 * 公开路由表
 */
export const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu: string) => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router

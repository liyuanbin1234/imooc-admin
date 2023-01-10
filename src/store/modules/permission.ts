import { publicRoutes, privateRoutes } from '@/router'
interface State {
  routes: any[]
}
export default {
  namespaced: true,
  state: () => ({
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state: State, newRoutes: any[]) {
      state.routes = [...publicRoutes, newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     * @param menus 可以被展示的路由
     */
    filterRoutes(context: any, menus: any[]): any[] {
      const routes = []
      // 路由权限匹配
      menus.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}

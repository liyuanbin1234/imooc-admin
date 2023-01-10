import router from '@/router'
import store from '@/store'

// 没有 token 时可以进入的页面白名单
const whiteList = ['/login']

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 有 token
  if (store.getters.token) {
    // 不可以进入 login 页面
    if (to.path === '/login') {
      next('/')
    } else {
      // 没有用户信息就去请求用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/loadUserInfo')
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes: any[] = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 没有token，只能进入白名单页面
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})

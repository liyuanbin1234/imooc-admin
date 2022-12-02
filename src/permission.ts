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
        await store.dispatch('user/loadUserInfo')
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

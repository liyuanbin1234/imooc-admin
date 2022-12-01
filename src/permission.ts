import router from '@/router'
import store from '@/store'

// 没有 token 时可以进入的页面白名单
const whiteList = ['/login']

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log('jinru', store.getters.token)
  // 有 token
  if (store.getters.token) {
    // 不可以进入 login 页面
    if (to.path === '/login') {
      next('/')
    } else {
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

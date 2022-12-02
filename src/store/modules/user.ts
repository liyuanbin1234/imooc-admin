import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant/index'
import { setTimeStamp } from '@/utils/auth'
import router from '@/router'
import md5 from 'md5'
// userInfo 数据类型
interface userInfo {
  username: string;
  password: string
}
// state 数据类型
interface state {
  token: string;
  userInfo: object
}

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken: (state: state, token: string) => {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo: (state: state, userInfo: object) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 不要给【接口请求的返回值】设定返回类型，因为我们不知道【接口请求的返回值】的数据结构
    login(context: any, userInfo: userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then((data: any) => {
          context.commit('setToken', data.token)
          router.push('/')
          // 设置时间戳
          setTimeStamp()
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    // 获取用户信息
    async loadUserInfo(context: any) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res)
      console.log(res)
      return res
    },
    // 退出登陆
    logout(context: any) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}

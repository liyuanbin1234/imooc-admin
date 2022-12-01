import { login } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant/index'
import router from '@/router'
import md5 from 'md5'
// userInfo 数据类型
interface userInfo {
  username: string;
  password: string
}
// state 数据类型
interface state {
  token: string
}

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken: (state: state, token: string) => {
      state.token = token
      setItem(TOKEN, token)
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
          resolve(data)
        }).catch(err => reject(err))
      })
    }
  }
}

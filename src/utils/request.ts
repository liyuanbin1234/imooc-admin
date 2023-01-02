import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'
import store from '@/store'

// 处理【类型'AxiosResponse<any, any>'上不存在属性'xxx'】问题
declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface AxiosResponse<T = any> {
    success: boolean;
    message: string;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    config.headers = config.headers || {}
    config.headers.icode = '3D7CCFB8184F6097'
    if (store.getters.token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 处理接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  (error: any): any => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse): any => {
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  }, (error: any): any => {
    // true表示 token 过期，false没过期
    if (error.response && error.response.data && error.response.data.code === 401) {
      // 过期退出登陆
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return new Error(error)
  }
)

export default service

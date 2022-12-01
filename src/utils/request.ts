import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

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
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers = config.headers || {}
    config.headers.icode = 'A748D538DF8D2A6A'
    return config
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
    ElMessage.error(error.message)
    return new Error(error)
  }
)

export default service

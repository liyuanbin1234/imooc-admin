import request from '@/utils/request'

/**
 * @param data 登陆数据
 * @returns 封装的 request 方法
 */
export const login = (data: object) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

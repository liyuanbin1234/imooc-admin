import request from '@/utils/request'

/**
 * 登陆
 * @param data 登陆数据
 * @returns Promise
 */
export const login = (data: object) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}

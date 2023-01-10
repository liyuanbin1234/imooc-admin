import request from '@/utils/request'

/**
 * 获取权限列表
 */
export const getPermissionList = (): any => {
  return request({
    url: '/permission/list'
  })
}

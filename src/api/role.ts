import request from '@/utils/request'

interface DistributePermissionData {
  roleId: string;
  permissions: any[];
}

/**
 * 获取所有角色
 */
export const getRoleList = (): any => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = (roleId: string) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 为角色修改权限
 */
export const distributePermission = (data: DistributePermissionData) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}

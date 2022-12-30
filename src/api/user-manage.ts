import request from '@/utils/request'

interface UserManageList {
  page: number;
  size: number;
}

/**
 * 获取用户列表数据
 */
export const getUserManageList = (data: UserManageList) => {
  return request({
    url: 'user-manage/list',
    params: data
  })
}

/**
 * 获取全部用户列表数据
 */
export const getUserManageAllList = (): any => {
  return request({
    url: 'user-manage/all-list'
  })
}

/**
 * 批量导入
 */
export const userBatchImport = (data: any[]) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

/**
 * 删除指定用户
 * @param id 用户id
 */
export const deleteUser = (id: string) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

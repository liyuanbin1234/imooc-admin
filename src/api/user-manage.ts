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
 * 批量导入
 */
export const userBatchImport = (data: any[]) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

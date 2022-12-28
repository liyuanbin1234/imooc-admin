/**
 * 导入数据对应表
 */
export const USER_RELATIONS: any = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = (numb: number) => {
  const time: any = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (parseInt(month) < 10 ? '0' + month : month) +
    '-' +
    (parseInt(date) < 10 ? '0' + date : date)
  )
}

import dayjs from 'dayjs'

export const dateFilter = (val: any, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

export default (app: any) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}

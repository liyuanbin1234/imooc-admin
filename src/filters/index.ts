import dayjs from 'dayjs'

const dateFilter = (val: string, format = 'YYYY-MM-DD'): string => {
  let valNumber: number
  if (!isNaN(Number(val))) {
    valNumber = parseInt(val)
    return dayjs(valNumber).format(format)
  } else {
    return val
  }
}

export default (app: any) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}

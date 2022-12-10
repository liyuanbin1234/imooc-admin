// 保存 storage
export const setItem = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取 storage
export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key) || '0'
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除单个 storage
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}

// 删除所有 storage
export const removeAllItem = () => {
  window.localStorage.clear()
}

const whiteList = ['/login', '/404', '/401', '/']

export const isTags = (path: string): boolean => {
  return whiteList.indexOf(path) === -1
}

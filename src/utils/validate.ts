/**
 * 验证是否为外部图标
 * @param path 图标地址
 * @returns 返回 true｜false
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

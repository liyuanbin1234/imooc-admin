/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 解决scss文件在 script 中引入报错
declare module '*.scss' {
  const css: any
  export default css
}
// 解决sass文件在 script 中引入报错
declare module '*.sass' {
  const css: any
  export default css
}

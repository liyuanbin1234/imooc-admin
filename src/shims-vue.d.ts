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
// 解决ts文件中引入 json 文件把报错
declare module '*.json' {
  const value: any;
  export default value;
}
// 解决 css-color-function 引入报错
declare module 'css-color-function'
// 解决 vue3-print-nb 引入报错
declare module 'vue3-print-nb'

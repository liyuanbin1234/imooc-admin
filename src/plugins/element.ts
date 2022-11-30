/**
 * 该文件原本为 js 文件，但是 main.ts 导入 js 文件报错，所以该为 ts 文件
 * 并且把 app 类型定义为 any 类型
 */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (app: any) => {
  app.use(ElementPlus, { locale })
}

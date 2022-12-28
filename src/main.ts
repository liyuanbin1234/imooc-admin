import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import installElementPlus from './plugins/element'
// 导入初始化样式表
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import '@/permission'
// 全局过滤器
import installFilters from '@/filters'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilters(app)
app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')

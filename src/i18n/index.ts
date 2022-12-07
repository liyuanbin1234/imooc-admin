import { createI18n } from 'vue-i18n'
import store from '@/store'
import mEnLocale from './lang/en'
import mZhLocale from './lang/zh'

const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

const locale = store?.getters?.language || 'zh'

const i18n = createI18n({
  // 使用 composition api，需要讲 legacy 设置为 false
  legacy: false,
  // 是否全局注册 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n

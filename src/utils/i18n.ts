import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

export function generateTitle(title: string | unknown): string {
  return i18n.global.t('msg.route.' + title)
}

// 监听 i18n 语言变化，并且返回回调函数
export function watchSwitchLang(...cbs: any[]) {
  watch(() => store.getters.language, () => {
    cbs.forEach(cb => {
      return cb(store.getters.language)
    })
  })
}

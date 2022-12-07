import { setItem, getItem } from '@/utils/storage'
import { LANG } from '@/constant'
interface state {
  sidebarOpened: boolean;
  language: string;
}

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened(state: state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state: state, lang: string) {
      setItem(LANG, lang)
      state.language = lang
    }
  }
}

import { setItem, getItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
interface state {
  sidebarOpened: boolean;
  language: string;
  tagsViewList: any[];
}

interface changeTagsView {
  index: number; tag: any;
}

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state: state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state: state, lang: string) {
      setItem(LANG, lang)
      state.language = lang
    },
    /**
     * 增加 tag
     */
    addTagsViewList(state: state, tag: any) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * 为指定的 tag 做修改
     */
    changeTagsView(state: state, { index, tag }: changeTagsView) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}

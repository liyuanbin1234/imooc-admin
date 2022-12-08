import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant/index'
import { setItem, getItem } from '@/utils/storage'
import variables from '@/styles/variables.module.scss'

interface state {
  mainColor: string;
  variables: any;
}

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    setMainColor(state: state, newColor: string): void {
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
      state.mainColor = newColor
    }
  }
}

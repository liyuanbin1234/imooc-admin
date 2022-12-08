import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {
  token: (state: any) => state.user.token,
  /**
   * @returns 返回 true 代表已经有用户信息，false 没有用户信息
   */
  hasUserInfo: (state: any) => JSON.stringify(state.user.userInfo) !== '{}',
  userInfo: (state: any) => state.user.userInfo,
  cssVar: (state: any) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: (state: any) => state.app.sidebarOpened,
  language: (state: any) => state.app.language,
  mainColor: (state: any) => state.theme.mainColor
}

export default getters

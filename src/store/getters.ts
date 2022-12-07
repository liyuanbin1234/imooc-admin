import variables from '@/styles/variables.module.scss'

const getters = {
  token: (state: any) => state.user.token,
  /**
   * @returns 返回 true 代表已经有用户信息，false 没有用户信息
   */
  hasUserInfo: (state: any) => JSON.stringify(state.user.userInfo) !== '{}',
  userInfo: (state: any) => state.user.userInfo,
  cssVar: () => variables,
  sidebarOpened: (state: any) => state.app.sidebarOpened,
  language: (state: any) => state.app.language
}

export default getters

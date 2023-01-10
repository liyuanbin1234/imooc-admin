import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import getters from './getters'
import permission from './modules/permission'

export default createStore({
  state: {
  },
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    app,
    theme,
    permission
  }
})

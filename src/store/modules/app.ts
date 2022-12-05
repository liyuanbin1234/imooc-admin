
interface state {
  sidebarOpened: boolean;
}

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true
  }),
  mutations: {
    triggerSidebarOpened(state: state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}

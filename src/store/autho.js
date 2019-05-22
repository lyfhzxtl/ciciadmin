export default {
  state: {
    menuKeys: [],
    menuOfUsername: ''
  },
  mutations: {
    setMenuKeys(state, value) {
      state.menuKeys = value;
    },
    setMenuOfUsername(state, value) {
      state.menuOfUsername = value;
    }
  }
}

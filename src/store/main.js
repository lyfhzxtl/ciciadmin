export default {
  // 数据
  state: {
    username: '',
    netWork: true,
    token: '',
    pricode: 0,
    routes: [],
    menuData: []
  },
  // 同步消息
  mutations: {
    setToken(state, value) {
      state.token = value;
      window.localStorage.setItem('token', value);
    },
    setRoutes(state, value) {
      state.routes = value;
    },
    setUser(state, value) {
      state.username = value;
    },
    setMenu(state, value) {
      window.Vue.set(state, 'menuData', value);
    },
    setPricode(state, value) {
      state.pricode = value;
    },
    changeNetwork(state, value) {
      state.netWork = value;
    }
  },
  // 订阅异步
  actions: {}
}

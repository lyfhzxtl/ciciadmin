import moduleMain from './main';
import moduleAutho from './autho';
export default new window.Vuex.Store({
  modules: {
    main: moduleMain,
    autho: moduleAutho
  }
})

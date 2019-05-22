// import Vue from 'vue';
import App from '@/App.vue'
import {
  Form,
  Input,
  Icon,
  Button,
  Card,
  Upload,
  Layout,
  Table,
  Menu,
  message,
  Radio,
  Drawer,
  Tree,
  Modal,
  InputNumber,
  Popconfirm
} from 'ant-design-vue'
import router from '@/router/index'
import store from '@/store/index'
import axios from '@/axios/index'
window.Vue.prototype.$http = axios
window.Vue.prototype.$md5 = window.md5
window.Vue.prototype.$message = message
window.Vue.prototype.$info = Modal.info;
window.Vue.prototype.$success = Modal.success;
window.Vue.prototype.$error = Modal.error;
window.Vue.prototype.$warning = Modal.warning;
window.Vue.prototype.$confirm = Modal.confirm;
window.Vue.use(Form)
window.Vue.use(Input)
window.Vue.use(Icon)
window.Vue.use(Button)
window.Vue.use(Card)
window.Vue.use(Upload)
window.Vue.use(Layout)
window.Vue.use(Table)
window.Vue.use(Menu)
window.Vue.use(Radio)
window.Vue.use(Drawer)
window.Vue.use(Tree)
window.Vue.use(Modal)
window.Vue.use(InputNumber)
window.Vue.use(Popconfirm)
/* new window.Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') */
/* eslint-disable no-new */
new window.Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

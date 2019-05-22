import store from '../store/index'
import axios from '../axios/index'
import routesFormat from '@/utils/routesFormat'
import menuFormat from '@/utils/menuFormat'
import routeKeysFormat from '@/utils/routeKeysFormat'

// 导入vue模块
// import Vue from 'vue';
// 导入路由模块
// import VueRouter from 'vue-router';
// 引入组件,路由懒加载
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const NotFound = () => import('@/views/NotFind.vue')
// 安装路由模块
// Vue.use(VueRouter);
// 配置路由规则、实例化路由
const router = new window.VueRouter({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'register',
    path: '/register',
    component: Register
  },
  {
    name: '404',
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/404') {
    next()
  } else {
    let token = window.localStorage.getItem('token')
    if (token) {
      if (store.state.main.routes.length > 0) {
        next()
      } else {
        axios.get(`/checkToken?token=${token}`).then(({
          data
        }) => {
          if (data.error === 0) {
            let routesData = routesFormat(data.data.routes)
            let menuData = menuFormat(data.data.routes)
            router.addRoutes(routesData)
            router.options.routes.push(...routesData)
            store.commit('setRoutes', routesData)
            store.commit('setMenu', menuData)
            store.commit('setUser', data.data.username)
            store.commit('setPricode', data.data.pricode)
            store.commit('setToken', token)
            let path = window.location.hash.slice(1)
            let routeKeys = routeKeysFormat(data.data.routes)
            if (routeKeys.indexOf(path) !== -1) {
              next({
                path
              })
            } else {
              next({
                path: data.data.routes[0].children[0].key
              })
            }
          } else {
            next({
              path: '/login'
            })
          }
        })
      }
    } else {
      next({
        path: '/login'
      })
    }
  }
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import role from './modules/role'
import file from './modules/file'
import {instance} from '../libs/fetchData'
import {getToken} from '../utils/util'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.localStorage.getItem('user')),
    routes: []
  },
  mutations: {
    initMenu (state, menus) {
      state.routes = menus
      console.log('state.routes', state.routes)
      window.localStorage.setItem('menu', JSON.stringify(menus))
    },
    login (state, user) {
      state.userInfo = user
    }
  },
  actions: {},
  modules: {
    user,
    menu,
    role,
    file
  }
})

instance.interceptors.request.use(config => {
  console.log('我是拦截器')
  console.log('getToken()getToken()getToken()', getToken())
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  if (response.status === 200) {
    return response
  } else {
    Promise.reject(new Error('errorMsg'))
  }
}, error => {
  if (error.code === 401) {
    router.replace('/login')
  }
  return Promise.reject(new Error('errorMsg'))
})
export default store

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import store from './store'
import {initMenu} from './utils/util'

Vue.use(ViewUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (window.localStorage.getItem('user')) {
      initMenu(router, store)
      next()
    } else {
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

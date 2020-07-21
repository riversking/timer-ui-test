import Cookies from 'js-cookie'
import {Message} from 'view-design'
import Router from 'vue-router'

export const TOKEN_KEY = 'token'

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }
  store.dispatch('menuByUserId').then(res => {
    if (res) {
      if (res.code === '0') {
        const fmtRoutes = formatRoutes(res.data)
        router.matcher = new Router().matcher
        router.addRoutes(fmtRoutes)
        store.commit('initMenu', fmtRoutes)
        // store.dispatch('connect');
      } else {
        Message.error(res.message)
        router.replace('/login')
      }
    } else {
      router.replace('/login')
    }
  })
}

export const formatRoutes = (routes) => {
  let fmRoutes = []
  if (routes != null) {
    routes.forEach(router => {
      let {
        path,
        component,
        name,
        meta,
        icon,
        children
      } = router
      if (children !== null && children instanceof Array) {
        children = formatRoutes(children)
      }
      let fmRouter = {
        path: path,
        name: name,
        icon: icon,
        meta: meta,
        children: children,
        component (resolve) {
          require(['../components/' + component + '.vue'], resolve)
        }
      }
      fmRoutes.push(fmRouter)
    })
  }
  return fmRoutes
}

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: 1})
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

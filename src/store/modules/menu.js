import {postData} from '../../libs/fetchData'

const namespace = 'api/v1/user/menu'

export default {
  state: {
    userName: '',
    userId: '',
    hasGetInfo: false,
    listData: []
  },
  actions: {
    async menuByUserId ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/getMenuByUserId`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async getMenu ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/getMenuTree`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async getMenuById ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/getMenuById`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async getParentMenu ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/getParentMenu`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async addMenu ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/addMenu`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async updateMenu ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/updateMenu`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async deleteMenu ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/deleteMenu`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async getMenuByRoleId ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/getMenuByRoleId`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    }
  },
  mutations: {

  }
}

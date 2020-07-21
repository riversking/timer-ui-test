import {postData} from '../../libs/fetchData'

const namespace = 'api/v1/user/role'

export default {
  state: {},

  actions: {
    async roleList ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/roleList`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async addRoleByUserId ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/addRoleByUserId`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async getRoleByUserId ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/addRoleByUserId`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async getRolePage ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/rolePage`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async addRole ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/addRole`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async getRoleById ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/roleDetail`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async deleteRole ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/deleteRole`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async editRole ({commit}, obj) {
      try {
        let res = await postData(`${namespace}/updateRoleById`, obj).catch(err => {
          commit('GLOBAL_ERR', err, {root: true})
        })
        return res.data
      } catch (error) {
        console.log('error: ', error)
      }
    }
  },

  mutations: {}
}

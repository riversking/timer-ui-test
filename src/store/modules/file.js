import {getData} from '../../libs/fetchData'

const namespace = 'api/v1/file'

export default {
  state: {
    userName: '',
    userId: '',
    avator: '',
    hasGetInfo: false,
    listData: []
  },
  actions: {
    async exportUser ({commit}, obj) {
      try {
        let res = await getData(`${namespace}/exportUser`, obj).catch(err => {
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

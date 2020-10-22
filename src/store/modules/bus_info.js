import { fetchBusInfo } from '@/api/bus-info'

const state = {
  infoItems: '',
  currentItemId: ''
}

const mutations = {
  SET_BUS_INFO_ITEMS: (state, data) => {
    state.infoItems = data
  },
  SET_CURRENT_ITEM_ID: (state, id) => {
    state.currentItemId = id
  }
}

const actions = {
  fetchBusInfo({ commit }) {
    return new Promise((resolve, reject) => {
      fetchBusInfo()
        .then(response => {
          const { data } = response.data
          if (!data) {
            reject('未获取到数据')
          }
          commit('SET_BUS_INFO_ITEMS', data)
          resolve(data)
        })
        .catch(error => {
          console.log('action提交请求阶段错误')
          reject(error)
        })
    })
  },
  setCurrentItemId({ commit }, id) {
    commit('SET_CURRENT_ITEM_ID', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

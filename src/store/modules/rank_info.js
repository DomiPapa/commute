import { fetchRankInfo } from '@/api/rank-info'

const state = {
  currentRankItems: ''
}

const mutations = {
  SET_RANK_INFO_ITEMS: (state, data) => {
    state.currentRankItems = data
  }
}

const actions = {
  fetchRankInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      fetchRankInfo(id)
        .then(response => {
          const { data } = response
          if (!data) {
            reject('未获取到数据')
          }
          commit('SET_RANK_INFO_ITEMS', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import { fetchRankInfo } from '@/api/rank-info'

const state = {
  currentRankItems: '',
  reservationDateInfo: {}
}

const mutations = {
  SET_RANK_INFO_ITEMS: (state, data) => {
    state.currentRankItems = data
  },
  SET_RESERVATION_DATE_INFO: (state, data) => {
    state.reservationDateInfo = data
  }
}

const actions = {
  fetchRankInfo({ commit }, prams) {
    return new Promise((resolve, reject) => {
      fetchRankInfo(prams)
        .then(response => {
          const { data } = response
          if (Array.isArray(data)) {
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

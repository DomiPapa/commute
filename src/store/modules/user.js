import { fetchUserInfo } from '@/api/user'

const state = {
  userId: '2069621466776250',
  userName: '张博'
}

const mutations = {
  SET_USER_ID: (state, data) => {
    state.userId = data
  },
  SET_USER_NAME: (state, data) => {
    state.userName = data
  }
}

const actions = {
  fetchUserInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      fetchUserInfo(params)
        .then(response => {
          const { result } = response
          const { userId, userName } = result
          commit('SET_USER_ID', userId)
          commit('SET_USER_NAME', userName)
          resolve(result)
        })
        .catch(error => {
          console.log('用户信息错误')
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

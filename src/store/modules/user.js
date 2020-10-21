import { fetchUserInfo } from '@/api/user'

const state = {
  uid: '111'
}

const mutations = {
  SET_USER_ID: (state, data) => {
    state.uid = data
  }
}

const actions = {
  fetchUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      fetchUserInfo()
        .then(response => {
          const { data } = response
          console.log('获得用户信息了' + data)
          commit('SET_USER_ID', data)
          resolve(data)
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

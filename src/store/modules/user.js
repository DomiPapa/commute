import { fetchUserLoginInfo, fetchUserReservationInfo } from '@/api/user'
import { Array } from 'core-js'

const state = {
  /*
  userId: '2014672533791258',
  userName: '徐聪',
  */
  userId: '',
  userName: '',
  phone: '',
  department: '',
  shuttleInfos: []
}

const mutations = {
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_USER_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_USER_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_USER_SHUTTLE_INFOS: (state, shuttleInfos) => {
    state.shuttleInfos = shuttleInfos
    console.log('更新了用户订单信息')
  }
}

const actions = {
  fetchUserLoginInfo({ commit }, authData) {
    return new Promise((resolve, reject) => {
      fetchUserLoginInfo(authData)
        .then(response => {
          const { userId, userName } = response.data.result
          commit('SET_USER_ID', userId)
          commit('SET_USER_NAME', userName)
          resolve(userId)
        })
        .catch(error => {
          console.log('fetchUserLoginInfo error -->')
          console.log(error)
          reject(error)
        })
    })
  },
  fetchUserReservationInfo({ commit }, params) {
    console.log(`fetchUserReservationInfo的参数-->`)
    console.log(params)
    return new Promise((resolve, reject) => {
      fetchUserReservationInfo(params)
        .then(response => {
          let shuttleInfos = []
          const { data } = response.data
          console.log('获取用户订车信息->')
          console.log(data)
          if (Array.isArray(data) && data.length != 0) {
            // 用戶有訂車數據
            commit('SET_USER_PHONE', data[0].phone)
            commit('SET_USER_DEPARTMENT', data[0].department)
            data.forEach(el => {
              let elObj = {}
              elObj.shuttleId = el.shuttleId
              elObj.orderId = el.id
              shuttleInfos.push(elObj)
            })
          }
          commit('SET_USER_SHUTTLE_INFOS', shuttleInfos)
          resolve(data)
        })
        .catch(error => {
          console.log('fetchUserReservationInfo error -->')
          console.log(error)
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

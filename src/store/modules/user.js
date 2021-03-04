import { fetchUserLoginInfo, fetchUserReservationInfo } from '@/api/user'
import { Array } from 'core-js'

const state = {
  // userId: '2014672533791258',
  // userName: '徐聪',
  userId: '2069621466776250',
  userName: '张博',
  // userId: '',
  // userName: '',
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
          console.log('登录验证后返回数据-->')
          console.log(response)
          const { userId, userName, userInfo } = response.data.result
          commit('SET_USER_ID', userId)
          commit('SET_USER_NAME', userName)
          commit('SET_USER_PHONE', userInfo.mobile)
          if (Array.isArray(userInfo.departments)) {
            commit('SET_USER_DEPARTMENT', userInfo.departments.join('-'))
          }
          commit('SET_USER_DEPARTMENT', userInfo.departments[0])
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
            data.forEach(el => {
              let elObj = {}
              elObj.shuttleId = el.shuttle.sid
              elObj.orderId = el.rid
              elObj.department = el.department
              elObj.name = el.name
              elObj.pickUpPoint = el.pickUpPoint
              elObj.reserveTime = el.reserveTime
              elObj.arrival = el.shuttle.arrival
              elObj.departure = el.shuttle.departure
              elObj.departureTime = el.shuttle.departureTime
              elObj.remaining = el.shuttle.remaining
              shuttleInfos.push(elObj)
            })
          }
          commit('SET_USER_SHUTTLE_INFOS', shuttleInfos)
          resolve(shuttleInfos)
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

import { fetchRankInfo } from '@/api/rank-info'
import moment from 'moment'

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
  },
  handleDate({ commit }) {
    let reservation = {}
    if (moment().format('HH') >= 18) {
      // 当天18点以后
      reservation['day'] = '明日'
      reservation['date'] = moment()
        .add(1, 'day')
        .format('MM月DD日')
      reservation['startTime'] = moment().format('YYYY-MM-DD') + ' 18:00'
      reservation['endTime'] =
        moment()
          .add(1, 'day')
          .format('YYYY-MM-DD') + ' 18:00'
    } else {
      reservation['day'] = '今日'
      reservation['date'] = moment().format('MM月DD日')
      reservation['startTime'] =
        moment()
          .add(-1, 'day')
          .format('YYYY-MM-DD ') + ' 18:00'
      reservation['endTime'] = moment().format('YYYY-MM-DD') + ' 20:00'
    }
    commit('SET_RESERVATION_DATE_INFO', reservation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

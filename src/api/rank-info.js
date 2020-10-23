import request from '@/utils/request'
import store from '@/store'

export function fetchRankInfo(query) {
  return request({
    url: '/reservation/findAllReservations',
    method: 'get',
    params: query
  })
}
export function updateOrderSubmit(data) {
  return request({
    url:
      '/reservation/add/?startTime=' +
      store.getters.reservationDateInfo.startTime +
      '&endTime=' +
      store.getters.reservationDateInfo.endTime,
    method: 'post',
    data
  })
}
export function updateOrderCancel(query) {
  return request({
    url: '/reservation/cancel',
    method: 'get',
    params: query
  })
}

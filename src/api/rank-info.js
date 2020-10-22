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
    url: '/reservation/add/' + store.getters.userId,
    method: 'post',
    data
  })
}
export function updateOrderCancel(data) {
  return request({
    url: '/reservation/cancel/' + data.id,
    method: 'post'
  })
}

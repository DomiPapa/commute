import request from '@/utils/request'

export function fetchRankInfo(query) {
  return request({
    url: '/reservation/findAllReservations',
    method: 'get',
    params: query
  })
}
export function updateOrderSubmit(data) {
  return request({
    url: '/order-submit',
    method: 'post',
    data
  })
}
export function updateOrderCancel(data) {
  return request({
    url: '/order-cancel',
    method: 'post',
    data
  })
}

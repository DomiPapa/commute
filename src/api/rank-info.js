import request from '@/utils/request'

export function fetchRankInfo(id) {
  return request({
    url: '/rank-info',
    method: 'get',
    params: { id }
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

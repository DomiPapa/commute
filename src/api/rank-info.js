import request from '@/utils/request'
// import store from '@/store'

export function fetchRankInfo(query) {
  return request({
    url: '/reservation/findReservationsBySid',
    method: 'get',
    params: query
  })
}
export function updateOrderSubmit(data) {
  return request({
    url: `/reservation/addMany/?userId=${data[0].userId}&shuttleId=${data[0].shuttleId}`,
    method: 'post',
    data
  })
}
export function updateOrderCancel(query) {
  return request({
    url: '/reservation/cancelMany',
    method: 'get',
    params: query
  })
}

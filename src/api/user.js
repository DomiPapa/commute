import request from '@/utils/request'

export function fetchUserLoginInfo(data) {
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

export function fetchUserReservationInfo(query) {
  return request({
    url: '/reservation/findByUserId',
    method: 'get',
    params: query
  })
}

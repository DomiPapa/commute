import request from '@/utils/request'

export function fetchUserLoginInfo(data) {
  return request({
    url: '/login?authCode=' + data.authCode,
    method: 'post'
  })
}

export function fetchUserReservationInfo(query) {
  return request({
    url: '/reservation/findByUserId',
    method: 'get',
    params: query
  })
}

// 按分页请求数据

export function fetchUserReservationInfoByPages(query) {
  return request({
    url: '/reservation/findByUser',
    method: 'get',
    params: query
  })
}

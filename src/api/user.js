import request from '@/utils/request'

export function fetchUserInfo(query) {
  return request({
    url: '/login',
    method: 'get',
    params: query
  })
}

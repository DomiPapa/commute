import request from '@/utils/request'

export function fetchUserInfo(data) {
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

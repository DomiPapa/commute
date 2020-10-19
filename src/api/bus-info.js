import request from '@/utils/request'

export function fetchBusInfo() {
  return request({
    url: '/shuttle/findAll',
    method: 'get'
  })
}

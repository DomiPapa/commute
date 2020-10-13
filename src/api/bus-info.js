import request from '@/utils/request'

export function fetchBusInfo() {
  return request({
    url: '/bus-info',
    method: 'get'
  })
}

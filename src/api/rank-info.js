import request from '@/utils/request'

export function fetchRankInfo(id) {
  return request({
    url: '/rank-info',
    method: 'get',
    params: { id }
  })
}

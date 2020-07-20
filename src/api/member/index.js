import request from '@/utils/request'

// 获取用户列表
export function getmemberList(data) {
  return request({
    url: "/members",
    method: 'get',
    params:data
  })
}
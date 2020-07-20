import request from '@/utils/request'

// 获取列表
export function gettbeauty(data) {
  return request({
    url: "/beauty",
    method: 'get',
    params:data
  })
}
//驳回
export function bohui(id, data) {
  return request({
    url: `/beauty/${id}/status/0?remark=` + data,
    method: 'put',
  })
}
//通过
export function shenhe(id) {
  return request({
    url: `/beauty/${id}/status/1`,
    method: 'put'
  })
}
//搜索

export function search(data) {
  return request({
    url: "/beauty?full_name=" + data,
    method: 'get',
  })
}
//导出
export function outexport(data) {
  return request({
    url: "/beauty/export",
    method: 'get',
  })
}
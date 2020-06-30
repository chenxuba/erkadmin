import request from '@/utils/request'

export function getcourseType() {
  return request({
    url: '/courseType',
    method: 'get',
  })
}
export function AddcourseType(data) {
    return request({
      url: '/courseType',
      method: 'post',
      data
    })
  }

  export function PutcourseType(data,id) {
    return request({
      url: '/courseType/'+id,
      method: 'put',
      data
    })
  }
  export function DelcourseType(data) {
    return request({
      url: '/courseType',
      method: 'delete',
      data
    })
  }
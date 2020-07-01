import request from '@/utils/request'
// 类别管理
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

export function PutcourseType(data, id) {
  return request({
    url: '/courseType/' + id,
    method: 'put',
    data
  })
}
export function DelcourseType(id) {
  return request({
    url: '/courseType/' + id,
    method: 'delete',
  })
}
// 课程列表
export function gettrainingCourse() {
  return request({
    url: 'trainingCourse',
    method: 'get',
  })
}
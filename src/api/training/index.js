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
// 新建课程 trainingCourse
export function AddTrainingCourse(data) {
  return request({
    url: '/trainingCourse',
    method: 'post',
    data
  })
}
// 删除课程
// /trainingCourse/{:id}
export function DelTrainingCourse(id) {
  return request({
    url: '/trainingCourse/' + id,
    method: 'delete',
  })
}
// 编辑课程 /trainingCourse    put
export function PuttrainingCourse(data, id) {
  return request({
    url: '/trainingCourse/' + id,
    method: 'put',
    data
  })
}
// 查看课件  /trainingCourse/{:id}/getCourseware
export function gettrainingCourseItem(params,id) {
  return request({
    url: `/trainingCourse/${id}/getCourseware`,
    method: 'get',
    params
  })
}

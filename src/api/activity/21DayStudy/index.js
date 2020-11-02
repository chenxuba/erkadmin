import request from '@/utils/request'

// 获取列表
export function getVideos(data) {
  return request({
    url: "/videos",
    method: 'get',
    params: data
  })
}
// /study/courses
export function getStudyCourses(data) {
  return request({
    url: "/study/courses",
    method: 'get',
    params:data
    // data
  })
}
// 新增视频
export function AddStudyCourses(data) {
  return request({
    url: "/study/courses",
    method: 'post',
    data
  })
}
// 立即修改
export function EditStudyCourses(data, id) {
  return request({
    url: "/study/courses/" + id,
    method: 'put',
    data
  })
}
// 删除
export function DelStudyCourses(id) {
  return request({
    url: "/study/courses/" + id,
    method: 'delete',
  })
}
export function getStudyCoursesrank(data) {
  return request({
    url: "/study/courses/rank",
    method: 'get',
    params:data
    // data
  })
}
export function getStudystatics(data) {
  return request({
    url: "/study/statics",
    method: 'get',
    params:data
    // data
  })
}
// /study/questionnaire
export function getquestionnaire(data) {
  return request({
    url: "/study/questionnaire",
    method: 'get',
    params:data,
  })
}
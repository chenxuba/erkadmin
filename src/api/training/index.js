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
// 新增课件获取课件分类 /courseType/getFirstClass
export function getChild(id) {
  return request({
    url: `/courseType/${id}/getChild`,
    method: 'get',
  })
}
//新增课件 /trainingCourseware
export function addtrainingCourse(data) {
  return request({
    url: '/trainingCourseware',
    method: 'post',
    data
  })
}
//获取老师列表 /teachers
export function getteachers(id) {
  return request({
    url: `/teachers`,
    method: 'get',
  })
}
//删除课件
// /trainingCourseware/{:id}
export function DeltrainingCourseware(id) {
  return request({
    url: '/trainingCourseware/' + id,
    method: 'delete',
  })
}
//获取课件详情 /trainingCourseware/1
export function trainingCoursewareDetail(id) {
  return request({
    url: `/trainingCourseware/${id}`,
    method: 'get',
  })
}
//编辑课件
// /trainingCourseware/{:id}
export function edittrainingCourse(data,id) {
  return request({
    url: `/trainingCourseware/${id}`,
    method: 'put',
    data
  })
}
// 试卷管理 /examination
// 获取列表
export function getExamination(params) {
  return request({
    url: `/examination`,
    method: 'get',
    params
  })
}
// 创建试卷 /examination
export function AddExamination(data) {
  return request({
    url: `/examination`,
    method: 'post',
    data
  })
}
// /courseType/:id/getCourseWare
export function getCourseWare(id) {
  return request({
    url: `/courseType/${id}/getCourseWare`,
    method: 'get',
  })
}
// 删除 /examination/:id
export function DelExamination(id) {
  return request({
    url: `/examination/${id}`,
    method: 'delete',
  })
}
// /examination/{:id} 详情
export function getexaminationDetail(id) {
  return request({
    url: `/examination/${id}`,
    method: 'get',
  })
}
// EditExamination
export function EditExamination(data,id) {
  return request({
    url: `/examination/`+id,
    method: 'put',
    data
  })
}
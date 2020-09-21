import request from '@/utils/request'

// 获取类别列表
export function getcourseCategory(data) {
    return request({
        url: "/courseCategory",
        method: 'get',
        params: data
    })
}
// 新增 /courseCategory
export function AddcourseCategory(data) {
    return request({
        url: "/courseCategory",
        method: 'post',
        data
    })
}
// 删除 /courseCategory/{:id}
export function DelcourseCategory(id) {
    return request({
        url: "/courseCategory/" + id,
        method: 'delete',
    })
}
// 编辑
export function EditcourseCategory(data, id) {
    return request({
        url: "/courseCategory/" + id,
        method: 'put',
        data
    })
}
// 课程
// 获取课程列表 
export function getCourseList(data) {
    return request({
        url: "/course",
        method: 'get',
        params: data
    })
}
//获取导师列表 /teachers
export function getTeachersList(data) {
    return request({
        url: "/teachers",
        method: 'get',
        params: data
    })
}
//新增课程
export function addCourse(data) {
    return request({
        url: "/course",
        method: 'post',
        data
    })
}
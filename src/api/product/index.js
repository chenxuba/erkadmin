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
// 删除课程 /course/:id
export function delCourse(id) {
    return request({
        url: "/course/" + id,
        method: 'delete',
    })
}
//获取课程详情 /course/:id
export function getCourseDetail(id) {
    return request({
        url: "/course/" + id,
        method: 'get',
    })
}
// 编辑课程 
export function editCourse(data, id) {
    return request({
        url: "/course/" + id,
        method: 'put',
        data
    })
}
//获取指定课程的视频列表
export function getVideoList(id, data) {
    return request({
        url: "/video/" + id,
        method: 'get',
        params: data
    })
}
//新增视频 
export function addVideo(data, id) {
    return request({
        url: "/video/" + id,
        method: 'post',
        data
    })
}
// 删除视频
export function delVideo(id) {
    return request({
        url: "/video/" + id,
        method: 'delete',
    })
}
// 编辑视频
export function editVideo(data, id) {
    return request({
        url: "/video/" + id,
        method: 'put',
        data
    })
}
//获取文章列表 chapter
export function getWordList(id, data) {
    return request({
        url: "/chapter/" + id,
        method: 'get',
        params: data
    })
}
//新增word
export function addWord(data, id) {
    return request({
        url: "/chapter/" + id,
        method: 'post',
        data
    })
}
// 删除文章
export function delWord(id) {
    return request({
        url: "/chapter/" + id,
        method: 'delete',
    })
}
// 编辑文章
export function editWord(data, id) {
    return request({
        url: "/chapter/" + id,
        method: 'put',
        data
    })
}
//获取审核资源列表 course/commitList
export function getCommitList(data) {
    return request({
        url: "/course/commitList",
        method: 'get',
        params: data
    })
}
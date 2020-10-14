import request from '@/utils/request'

// 获取列表
export function getLivetList(data) {
    return request({
        url: "/broadcast",
        method: 'get',
        params: data
    })
}
//新增 
export function addLive(data) {
    return request({
        url: "/broadcast",
        method: 'post',
        data
    })
}
//获取直播间详情
export function getLivetDetail(id) {
    return request({
        url: "/broadcast/" + id,
        method: 'get',
    })
}
//修改
export function putLivetDetail(data, id) {
    return request({
        url: "/broadcast/" + id,
        method: 'put',
        data
    })
}
//审核通过 /broadcast/:id/status/1
export function shenheLive(id, type) {
    return request({
        url: `/broadcast/${id}/status/${type}`,
        method: 'put',
    })
}
// 删除房间 /broadcast/1
export function delRoom(id) {
    return request({
        url: `/broadcast/${id}`,
        method: 'delete',
    })
}
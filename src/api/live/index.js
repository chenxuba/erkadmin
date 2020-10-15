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
// 获取流量信息 /broadcast/live
export function getInfo() {
    return request({
        url: "/broadcast/live",
        method: 'get',
    })
}
// /broadcast/:id/liveConfig 直播间配置
export function getLiveConfig(id) {
    return request({
        url: `/broadcast/${id}/liveConfig`,
        method: 'get',
    })
}
// 查看直播间会员列表 /broadcast/14/liveMembers
export function getLiveMemberList(id, data) {
    return request({
        url: `/broadcast/${id}/liveMembers`,
        method: 'get',
        params: data
    })
}
// 直播带货
export function getLiveGoods(data) {
    return request({
        url: `/broadcast/liveGoods`,
        method: 'get',
        params: data
    })
}
// 提交直播带货 /broadcast/14/liveWithGoods
export function putliveWithGoods(id, data) {
    return request({
        url: `/broadcast/${id}/liveWithGoods`,
        method: 'put',
        data
    })
}
// 嘉宾列表 /broadcast/:id/liveGuests 
export function getLiveGuests(id) {
    return request({
        url: `/broadcast/${id}/liveGuests`,
        method: 'get',
    })
}
// 获取用户列表
export function getmemberList(data) {
    return request({
        url: "/members",
        method: 'get',
        params: data
    })
}
// 确认添加助教 /broadcast/:id/liveWithGuest
export function putliveWithGuest(data, id) {
    return request({
        url: `/broadcast/${id}/liveWithGuests`,
        method: 'put',
        data
    })
}
// 获取直播配置 /broadcast/config
export function getConfig(data) {
    return request({
        url: `/broadcast/getConfig`,
        method: 'get',
        params: data
    })
}
//修改直播配置 /broadcast/config
export function putConfig(data) {
    return request({
        url: `/broadcast/config`,
        method: 'put',
        data
    })
}
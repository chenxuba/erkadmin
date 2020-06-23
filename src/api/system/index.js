import request from '@/utils/request'

// 添加角色
export function addRole(data) {
    return request({
        url: "/group",
        method: 'post',
        params: data
    })
}
// 编辑角色
export function editRole(id,data) {
    return request({
        url: `/group/${id}`,
        method: 'put',
        data
    })
}
//获取角色
export function getRole(data) {
    return request({
        url: '/group',
        method: 'get',
        data
    })
}
// 关闭启动角色
export function PutRoleStatus(id,value) {
    return request({
        url: `/group/${id}/status/${value}`,
        method: 'put',
    })
}
//路由信息
export function getAntRouter(data) {
    return request({
      url: "/menu",
      method: 'get',
      params: data
    })
  }
//   分配权限
export function PostAuthorize(id,data) {
    return request({
      url: `/group/${id}/authorize`,
      method: 'post',
      data
    })
  }

  //编辑菜单
export function editmenu(id,data) {
    return request({
      url: '/menu/'+id,
      method: 'put',
      data
    })
  }

  //新增菜单
export function addmenu(data) {
    return request({
      url: '/menu',
      method: 'post',
      data
    })
  }
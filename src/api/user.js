import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/detail',
    method: 'get',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function captcha(data) {
  return request({
    url: '/captcha/1',
    method: 'post',
    data
  })
}
// 动态路由
export function getAntRouter(data) {
  return request({
    url: "/menu",
    method: 'get',
    params: data
  })
}

// 动态路由
export function DongtRouter() {
  return request({
    url: `/group/subMenu`,
    method: 'get',
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
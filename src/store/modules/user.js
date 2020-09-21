import {
  login,
  logout,
  getInfo,
  getAntRouter,
  DongtRouter
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    menus: "",
    roles: ""
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password, // captcha
    } = userInfo // 解构出用户名和密码
    return new Promise((resolve, reject) => {
      // 执行登录请求
      login({
        username: username.trim(),
        password: password, // captcha: captcha
      }).then(response => {
        const {
          data
        } = response
        commit("SET_TOKEN", data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 获取到用户信息
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('验证失败，请重新登录')
        }
        // 获取到用户信息
        const {
          nickname,
          avatar,
          username
        } = data // 解构出名字和头像
        commit("SET_NAME", nickname) // 触发vuex SET_NAME 保存名字到vuex
        commit("SET_AVATAR", avatar) // 触发vuex SET_AVATAR 保存头像到vuex
        commit("SET_ROLES", username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取路由表
  getAntRouter({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      DongtRouter().then(response => {
        const {
          list
        } = response.data
        if (!list) {
          reject('验证失败，请重新登录')
        }
        const menus = list
        //如果需要404 页面，请在此处添加
        menus.push({
          path: "/404",
          component: "404",
          hidden: true
        }, {
          path: "*",
          redirect: "/404",
          hidden: true
        })
        commit("SET_MENUS", menus) // 触发vuex SET_MENUS 保存路由表到vuex
        resolve(list)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()

    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

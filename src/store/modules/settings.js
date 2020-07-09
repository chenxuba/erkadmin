import defaultSettings from '@/settings'

const { showSettings,tagsView, fixedHeader, sidebarLogo,showFooter,footerTxt, caseNumber } = defaultSettings

const state = {
  tagsView: tagsView,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  showFooter: showFooter,
  footerTxt: footerTxt,
  caseNumber: caseNumber
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


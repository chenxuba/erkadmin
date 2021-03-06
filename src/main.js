import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

//引入必要的文件 集成秀米所需
import '@/icons' // icon
import '@/permission' // permission control
import '@/assets/css/reset.css'
import '../public/UEditor/ueditor.config'
import '../public/UEditor/ueditor.all.js'
// import '../public/UEditor/ueditor.parse.js'
import '../public/UEditor/dialogs/xiumi-ue-dialog-v5'
import '../public/UEditor/dialogs/xiumi-ue-v5.css'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.directive('permission', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el, binding, node) {
        const { value } = binding
        const roles = node.child.$route.meta.roles
        // if (roles.indexOf(value) >= 0) {
        //   return value
        // } else {
        //   el.parentNode && el.parentNode.removeChild(el) 
        // } //使用方式： v-permission="'add'"

        if (value && value instanceof Array && value.length > 0) {
            const permissionRoles = value
            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role)
            })

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`使用方式： v-permission="['admin','editor']"`)
        }
    }
})

Vue.component('pagination', () => import('@/components/Common/pagination'))

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI, {
    size: Cookies.get('size') || 'small' // set element-ui default size
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 点击复制插件
import Clipboard from 'v-clipboard'
Vue.use(Clipboard)
// filters
import './filters'
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
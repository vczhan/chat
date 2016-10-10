import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Router from './router.js'
import App from './App.vue'
import store from './vuex/store'
import { getToken } from './vuex/getters'

Vue.config.devtools = true

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()
Router(router)

router.beforeEach(({to, next, redirect}) => {
  const token = getToken(store.state)

  if (to.auth) {
    if (token) {
      next()
    } else {
      redirect({ name: 'login' })
    }
  } else {
    next()
  }

})

//重定向
// router.redirect({
//   '*': '/login',
//   '/index': '/'
// })

// 别名
// router.alias({})

router.start(App, '#app')

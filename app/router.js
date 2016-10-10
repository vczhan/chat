// import Login from './components/login.vue'

// module.exports = function(router) {
//   router.map({})
// }

export default (router) => router.map({
  '/': {
    name: 'index',
    component: require('./views/index.vue'),
    // component(resolve) {  // 动态组件
    //   require(['./views/index.vue'], resolve)
    // },
    auth: true
  },
  '/login': {
    name: 'login',
    component: require('./views/login.vue')
  },
  '*': {
    component: require('./views/404.vue')
  }
})

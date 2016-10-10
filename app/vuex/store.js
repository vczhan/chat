import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
  owner: {},
  userList: [],
  messages: []
}

const mutations = {
  OWNER_LOGIN (state, data) {
    state.owner = data
    state.token = data.uin
  },
  OWNER_LOGOUT (state) {
    state.owner = {}
    state.token = ''
  },
  USERS_UPDATE (state, users) {
    state.userList = users
  },
  USERS_REST (state) {
    state.userList = []
  },
  MESSAGES_UPDATE (state, msg) {
    state.messages.push(msg)
  }
}

export default new Vuex.Store({
  state,
  mutations
})

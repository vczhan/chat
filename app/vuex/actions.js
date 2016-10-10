import api from '../api'

// 获取登录用户信息
export const getOwnerInfo = ({ dispatch }, uin) => {
  return api.getOwnerInfo(uin)
    .then(info => {
      dispatch('OWNER_LOGIN', {...info, uin})
      return {...info, uin}
    })
}

// 更新登录用户列表
export const usersUpdate = ({dispatch}, users) => dispatch('USERS_UPDATE', users)

// 获取新的聊天内容
export const messagesUpdate = ({dispatch}, data) => dispatch('MESSAGES_UPDATE', data)

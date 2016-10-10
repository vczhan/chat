// 是否登录
export const getToken = state => state.token

// 获取登录用户信息
export const getOwnerInfo = (state) => state.owner

// 在线列表
export const getUserList = (state) => state.userList

// 获取信息，暂时不做历史记录
export const getMessages = (state) => state.messages

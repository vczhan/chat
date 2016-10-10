<style>

.fade-transition {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}

</style>

<template>
  <component
    :is="view"
    transition="fade"
    transition-mode="out-in"
  ></component>
</template>

<script>
import io from 'socket.io-client'
import load from '../components/load'
import chat from '../components/chat'
import Notify from '../assets/libraries/notify'
import { getOwnerInfo } from '../vuex/getters'
import {
  usersUpdate,
  messagesUpdate
} from '../vuex/actions'
import config from 'configuration'

const isProd = process.env.NODE_ENV === 'production'
const serveUrl = isProd ? config.api.socket : 'http://localhost:8888'

export default {
  data() {
    return {
      view: 'load'
    }
  },
  route: {
    data({ to }) {
      // console.log('~~~~~~~~', to.params)
    }
  },
  created() {
    this.socket = io(serveUrl)
    console.log('%cAuthenticating...', 'background:yellow')
  },
  ready() {
    const socket = this.socket

    socket.emit('login', this.ownerInfo)
    socket.on('login', info => {
      this.view = 'chat'
      console.log('%c' + info, 'background:green')
    })

    socket.on('logout', user => {
      Notify({
        title: `系统消息：`,
        icon: user.avatar,
        body: `${user.nickname}离开聊天室`,
        timer: 2000
      })

      console.log(
        `%c%s%c离开聊天室`,
        'color:red;font-weight:bold',
        user.nickname,
        'color:gray;'
      )
    })

    // 通知有新用户加入
    socket.on('join', user => {
      Notify({
        title: `系统消息：`,
        icon: user.avatar,
        body: `${user.nickname}加入聊天室`,
        timer: 2000
      })

      console.log(
        `%c%s%c加入聊天室`,
        'color:red;font-weight:bold',
        user.nickname,
        'color:gray;'
      )
    })

    // 更新登录用户列表
    socket.on('usersUpdate', users => {
      this.usersUpdate(users)
      // socket.emit('message', {msg: 'Oh, I got.'})
    })

    // 接收消息
    socket.on('message', data => {
      this.messagesUpdate(data)

      Notify({
        title: `${data.nickname}说：`,
        icon: data.avatar,
        body: data.content.replace(/<img\b[^>]*>/g, '[图片]'),
        timer: 3000
      })
    })

    // 错误。1. 错误的帐号；2. 帐号已经登录
    socket.on('loginErr', info => {
      // socket.disconnect()
      console.warn('%c' + info, 'font-weight:bold;color:red')
      this.$route.router.replace('/login')
    })

  },
  events: {
    sendMsg(msg) {
      this.socket.emit('message', {
        ...this.ownerInfo,
        content: msg
      })
    },
    logout() {
      this.socket.disconnect()
      this.$route.router.replace('/login')
    }
  },
  vuex: {
    actions: {
      usersUpdate,
      messagesUpdate
    },
    getters: {
      ownerInfo: getOwnerInfo
    }
  },
  components: {
    load,
    chat
  }
}


</script>

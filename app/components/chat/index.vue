<style scoped>
.chat {
  width: 590px;
  height: 540px;
  margin: 20px auto;
}

.chat-box {
  position: relative;
  width: 590px;
  height: 540px;
  /* background-image: url(~images_path/chat@1x.png);
  background-image: image-set(url(~images_path/chat@1x.png) 1x, url(~images_path/chat@2x.png) 2x); */
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 5px;
  box-shadow: 0 0 30px #b2b2b2;
}

/** ctrlBtn **/
.ctrl-btn {
  width: 100%;
  height: 54px;
  padding: 20px 0 0 12px;
  background: rgba(245,245,245,.9);
  border-radius: 5px 5px 0 0;
  box-sizing: border-box;
  backdrop-filter: blur(2px);
}

.ctrl-btn i {
  float: left;
  width: 10px;
  height: 10px;
  margin-right: 9px;
  border-radius: 50%;
  background: #ddd;
  border: 1px solid #dcdcdc;
  cursor: default;
}

.ctrl-btn .logout-btn {
  font-style: normal;
  font-size: 12px;
  text-align: center;
  color: #fc635d;
  background: #fc635d;
  border: 1px solid #ec5855;
  transform: rotate(45deg);
}

.ctrl-btn .logout-btn:hover {
  color: rgba(0,0,0,.7);
}

/** owner avatar **/
.owner-avatar {
  position: absolute;
  top: 11px;
  right: 33px;
  width: 30px;
  height: 30px;
}

.owner-avatar img {
  display: block;
  width: 27px;
  height: 27px;
  border-radius: 50%;

}

.owner-avatar i {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 13px;
  height: 13px;
  background: #4ad93a;
  border-radius: 50%;
}

</style>
<template>
  <div class="chat">
    <div class="chat-box">
      <div class="ctrl-btn">
        <i class="logout-btn" @click="logout">+</i>
        <i class="disabled-btn"></i>
        <i class="disabled-btn"></i>
      </div>

      <!-- 头像 -->
      <div class="owner-avatar">
        <img :src="ownerInfo.avatar" alt="">
        <i class="online"></i>
      </div>

      <tips-box></tips-box>

      <notice-box></notice-box>

      <users-box
        :users="users"
        :count="userCount">
      </users-box>

      <message-box
        :uin="ownerInfo.uin"
        :messages="messages">
      </message-box>

      <input-box></input-box>

    </div>
  </div>
</template>

<script>
import {
  getOwnerInfo,
  getUserList,
  getMessages
} from '../../vuex/getters'

import tipsBox from './tips'
import noticeBox from './notice'
import usersBox from './users'
import messageBox from './message'
import inputBox from './input'

export default {
  data() {
    return {}
  },
  vuex: {
    getters: {
      ownerInfo: getOwnerInfo,
      users: getUserList,
      messages: getMessages
    },
  },
  methods: {
    logout() {
      this.$dispatch('logout')
    }
  },
  computed: {
    userCount() {
      return this.users.length
    }
  },
  ready () {
    // console.log('chat-users', this.users)
  },
  router: {
    activate({ from }) {}
  },
  components: {
    tipsBox,
    noticeBox,
    usersBox,
    messageBox,
    inputBox
  }
}

</script>

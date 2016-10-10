<style scoped>
.container {
  position: relative;
  margin: 50px auto 0;
  width: 248px;
  height: 316px;
  padding: 30px;
  background: #f8f8f8;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0,0,0,.2);
  outline: none;
}

.user-box {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.transition-img {
  position: absolute;
  transition: all ease .5s;
}

.transition-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.avatar {
  display: block;
  position: relative;
  margin: 10px auto;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  border-radius: 50%;
}

.avatar:hover {
  box-shadow: 0 0 0 1px #7cddfc;
}

.avatar img {
  border-radius: 50%;
  overflow: hidden;
}

.avatar i {
  position: absolute;
  left: 44px;
  bottom: -10px;
  z-index: 1;
  width: 13px;
  height: 13px;
  background: #4ad93a;
  border-radius: 50%;
}

/** 登录列表 **/
.uin-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}


.uin-list li {
  flex-basis: 73px;
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 22px;
}

.uin-list li:nth-child(3n) {
  flex-basis: auto;
}

.uin-item {
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
}

.uin-item.add {
  border-radius: 50%;
  border: 1px solid #d9d8e2;
  color: #d9d8e2;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  box-sizing: border-box;
}

.uin-item::after {
  display: none;
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 8;
  width: 36px;
  height: 36px;
  border: 1px solid #6ed0f2;
  border-radius: 50%;
  cursor: default;
}

.uin-item.add::after {
  top: 0;
  left: 0;
}

.uin-item img {
  border-radius: 50%;
}

.uin-item i {
  display: none;
  position: absolute;
  top: -5px;
  left: 0px;
  z-index: 9;
  width: 13px;
  height: 13px;
  background: #f9716f;
  border-radius: 50%;
  opacity: .85;
}

.uin-item i::before,
.uin-item i::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 2px;
  width: 9px;
  height: 1px;
  background: #fff;
  transform: rotate(45deg);
}

.uin-item i::before {
  transform: rotate(45deg);
}

.uin-item i::after {
  transform: rotate(-45deg);
}

.uin-item:hover::after,
.uin-item:hover i {
  display: block;
}


/** 账号密码 **/
.uin-box {
  position: relative;
}

.uin-box input {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #d9dcde;
  background: transparent;
  font-size: 16px;
  line-height: 1;
  color: #424242;
  outline: none;
}

.uin-box input[disabled] {
  color: #ddd;
}

.uin-box button {
  position: absolute;
  right: 0;
  bottom: 10px;
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  border: 1px solid #0d0115;
  font-size: 13px;
  color: #0d0115;
  border-radius: 50%;
  outline: none;
}

.uin-box button:hover {
  border: 1px solid #11b7f5;
  color: #11b7f5;
}

.uin-box button[disabled],
.uin-box button[disabled]:hover {
  border: 1px solid #ddd;
  color: #ddd;
}

.uin-box::selection {
  color: #fff;
  background-color: #39f;
}

.login-loader {
  position: relative;
}

.load-svg {
  position: absolute;
  top: -8px;
  left: 50%;
  margin-left: -58px;
  width: 116px;
}

.load-svg g {
  animation: loading linear 1s infinite;
}

.loader-info {
  text-align: center;
}

.loader-info p {
  margin: 0;
  padding: 30px 0 20px;
  line-height: 1;
}

.loader-info button {
  width: 110px;
  height: 32px;
  background: transparent;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  font-weight: bold;
  outline: none;
}

.extend-ctrl {
  position: absolute;
  left: 50%;
  bottom: -20px;
  width: 10px;
  height: 10px;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #8b8b95;
  transform: translate(-50%,20px) rotate(45deg);
}

.extend-ctrl:hover {
  border-color: #ceced2;
}

.extend {
  position: absolute;
  left: -1px;
  bottom: 0;
  z-index: -1;
  width: 248px;
  height: 54px;
  padding: 20px;
  background: rgba(240,240,240,.8);
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 0 0 4px 4px;
  box-sizing: border-box;
  box-shadow: inset 0 5px 25px -25px #000;
  transition: bottom 0.1s;
}

.extend.active {
  bottom: -50px;
}

.auto-txt {
  font-size: 12px;
}

@keyframes loading {
  from {
    transform: translate(100px,100px) rotate(0deg);
  }
  to {
    transform: translate(100px,100px) rotate(360deg);
  }
}
</style>
<template>
  <div class="container" tabindex=1
    @keyup.enter="login">
    <div class="user-box" v-show="status!=='loading'">
      <div class="transition-img"
        v-show="status==='transition'"
        v-el:transition-img>
        <img :src="avatar" alt="">
      </div>

      <!-- 用户列表 -->
      <ul class="uin-list"
        v-el:uin-list
        v-show="status==='list'">
        <li v-for="user in users" track-by="$index">
          <a class="uin-item" title="{{ user.nickname }}"
          @mouseenter="enterUin(user)"
          @mouseleave="leaveUin"
          @click.prevent="clickToMain(user, $index)">
            <img :src="user.avatar" alt="" width=40 height=40>
            <i @click.stop="removeUin($index)"></i>
          </a>
        </li>
        <li v-show="users.length<6">
          <a class="uin-item add" @click.prevent="addUin">┼</a>
        </li>
      </ul>

      <!-- 单个用户 -->
      <div class="avatar-box" v-show="status==='main'||status==='loading'">
        <a class="avatar" v-el:avatar @click.prevent="clickToList(uin)">
          <img :src="avatar" alt="" width=100 height=100 />
          <i></i>
        </a>
      </div>
    </div>

    <div class="uin-box" v-show="status!=='loading'">
      <input type="text" class="uin" placeholder="输入帐号"
        v-model="uin"
        @click="clickInput" />
      <input type="password" class="pwd" disabled value="********" />
      <button @click="login" :disabled="logDisabled">➜</button>

      <i class="extend-ctrl" @click="isExtend=!isExtend"></i>
    </div>

    <div class="login-loader" v-show="status==='loading'">
      <div class="avatar-box">
        <a class="avatar">
          <img :src="avatar" alt="" width=100 height=100 />
          <i></i>
        </a>
      </div>

      <svg class="load-svg" viewBox="-2 -2 204 204">
        <g fill="none" stroke-width="2" transform="translate(100,100)">
          <path d="M 0,-100 A 100,100 0 1 0 0,100" stroke="#44c4fa" />
          <path d="M 0,100 A 100,100 1 0 0 100,0" stroke="url(#gradient)" />
        </g>
      </svg>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0">
            <stop stop-color="#44c4fa" />
            <stop offset="100%" stop-color="#44c4fa" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div class="loader-info">
        <p>{{ nickname }}</p>
        <!-- fetch没有取消方法，暂时不做了
        <button>取消</button> -->
      </div>
    </div>

    <!-- 扩展 -->
    <div class="extend" :class="{ 'active': isExtend }">
      <input type="checkbox" id="auto" class="auto"
        @click="changePermission"
        :checked="permission==='granted'"
        :disabled="permission!=='default'" />
      <label for="auto" class="auto-txt">开启消息通知</label>
    </div>

  </div>
</template>

<script>
import { getOwnerInfo } from '../vuex/actions'

const point = [43, 10]
const points = [
  [0, 22], [73, 22], [146, 22],
  [0, 84], [73, 84], [146, 84]
]
const defaultAvatar = require('../assets/images/avatar.png')


export default {
  data() {
    // 登录帐户列表，当前帐户信息
    let users, uin, avatar, nickname

    if (localStorage.users && JSON.parse(localStorage.users).length > 0) {
      users = JSON.parse(localStorage.users)
      uin = users[0].uin
      avatar = users[0].avatar
      nickname = users[0].nickname
    } else {
      users = []
      uin = ''
      avatar = defaultAvatar
      nickname = ''
    }

    return {
      status: 'main',
      uin,
      avatar,
      nickname,
      users,
      isExtend: false,
      permission: Notification.permission
    }
  },
  vuex: {
    actions: {
      login({ dispatch }) {
        const uin = this.uin

        if (this.logDisabled) return

        this.status = 'loading'

        getOwnerInfo({ dispatch }, uin).then((res) => {
          const idx  = this.users.findIndex(v => v.uin === uin)
          let user = {
            uin,
            nickname: res.nickname,
            avatar: res.avatar.replace('spec=40', 'spec=100')
          }

          // 存在列表中，表示以前登陆过的
          if (~idx) {
            // this.users = [...this.users.splice(idx, 1), ...this.users]
            // 重新获取昵称头像比较好吧
            // 把登录的号从列表里取出来，再更新昵称头像等信息，插入到数组前面
            user = {
              ...this.users.splice(idx, 1)[0],
              ...user
            }
          }

          // 插入到数组最前面
          this.users.unshift(user)

          localStorage.setItem('users', JSON.stringify(this.users))
          this.$route.router.replace('/')
        }, err => console.log(err))
      }
    }
  },
  methods: {
    enterUin(user) {
      this.uin = user.uin
    },
    leaveUin() {
      if (this.status === 'list') {
        this.uin = ''
      }
    },
    clickToMain(user, idx) {
      this.uin = user.uin
      this.nickname = user.nickname
      this.avatar = user.avatar

      const transitionImg = this.$els.transitionImg

      transitionImg.style.cssText = `
        left: ${points[idx][0]}px;
        top: ${points[idx][1]}px;
        width: 40px;
        height: 40px;`

      this.status = 'transition'

      // forcing reflow for transition？
      {transitionImg.offsetWidth}

      transitionImg.style.cssText = `
        left: ${point[0]}px;
        top: ${point[1]}px;
        width: 100px;
        height: 100px;`

      setTimeout(() => this.status = 'main', 500)
    },
    addUin() {
      const user = {
        uin: '',
        avatar: defaultAvatar
      }
      const idx = this.users.length

      this.clickToMain(user, idx)
    },
    removeUin(idx) {
      this.users.splice(idx, 1)
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    clickToList(uin) {
      // loading情况下
      if (this.status !== 'main') return

      // 大图到小图
      const transitionImg = this.$els.transitionImg
      // 不存在列表中等情况，默认定位到添加按钮
      let idx = this.users.length

      if (this.users.length === 0) return

      transitionImg.style.cssText = `
        left: ${point[0]}px;
        top: ${point[1]}px;
        width: 100px;
        height: 100px;`

      this.status = 'transition'

      if (uin) {
        idx = this.users.findIndex(v => v.uin == uin)

        // 不存在列表中则定位到添加按钮
        if (idx === -1) {
          idx = this.users.length
        }
      }

      // forcing reflow for transition？
      {transitionImg.offsetWidth}

      transitionImg.style.cssText = `
        left: ${points[idx][0]}px;
        top: ${points[idx][1]}px;
        width: 40px;
        height: 40px;`

      setTimeout(() => this.status = 'list', 500)
    },
    // 点击输入框，当时列表状态时，相当于添加uin
    clickInput() {
      if (this.status === 'list') {
        this.addUin()
      }
    },
    changePermission(e) {
      e.preventDefault()

      if (this.permission === 'default') {
        Notification.requestPermission(permission => {
          if (permission === 'granted') {
            let notification = new Notification('已开启消息通知')
            notification.onshow = function () {
              setTimeout(() => notification.close(), 2000)
            }
          }

          this.permission = permission
        })
      }
    }
  },
  watch: {
    uin(val) {
      if (!this.status === 'main') return

      // string or number ?
      const exsist  = this.users.find(v => v.uin == val)

      if (exsist) {
        this.avatar = exsist.avatar
      } else {
        this.avatar = defaultAvatar
      }
    }
  },
  computed: {
    uinError() {
      return !/^[1-9]\d{4,10}$/.test(this.uin)
    },
    logDisabled() {
      return this.status !== 'main' || this.uinError
    }
  },
  ready() {}
  // transitions: {}
}



</script>

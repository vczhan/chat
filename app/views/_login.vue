<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 454px;
  height: 354px;
}

.backskin {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 430px;
  height: 180px;
  background-color: #0ca5dd;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
}

.box {
  position: relative;
  width: 454px;
  height: 354px;
  background-image: url(../assets/images/login-bg.png);
}

.avatar {
  position: absolute;
  top: 206px;
  left: 54px;
  border-radius: 3px;
}

.uin-box {
  display: block;
  position: absolute;
  top: 206px;
  left: 145px;
  padding: 5px 6px;
  width: 180px;
  height: 18px;
  border: 1px solid #d1d1d1;
  border-radius: 3px 3px 0 0;
}
.uin-box:hover {
  border: 1px solid #1583dd;
}
.uin-box::selection {
  color: #fff;
  background-color: #39f;
}
.uin {
  width: 160px;
  border: 0;
  outline: 0;
}
.uin-box i {
  position: absolute;
  top: 0;
  right: 0;
  width: 23px;
  height: 28px;
  background: #fff;
  border-radius: 0 3px 0 3px;
  cursor: default;
}
.uin-box i::after {
  content: "";
  position: absolute;
  top: 12px;
  left: 5px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: #b1b1b1 transparent transparent transparent;
}
.uin-box i:hover::after {
  border-top-color: #000;
}
.uin-box i.on {
  transform: scale(-1);
}
.uin-box i.on::after {
  border-top-color: #000;
}
.uin-list {
  display: none;
  position: absolute;
  top: 236px;
  left: 145px;
  z-index: 9;
  width: 190px;
  padding: 1px;
  border: 1px solid #0093d1;
  background-color: #fff;
}
.uin-list li {
  position: relative;
  padding: 2px 1px;
  height: 30px;
  background-color: #fff;
  border-radius: 2px;
  vertical-align: middle;
  transition: all .15s ease;
}

.auto {
  position: absolute;
  top: 273px;
  left: 273px;
  margin: 0;
  width: 13px;
  height: 13px;
  border: 1px solid transparent;
  border-radius: 1px;
  outline: 0;
  -webkit-appearance: none;
}
.auto:hover {
  border-color: #1583dd;
}
.auto:checked {
  background-color: #3076c1;
  border-color: #3076c1;
}
.auto:checked::before {
  content: "";
  position: absolute;
  top: 5px;
  left: 1px;
  width: 11px;
  height: 2px;
  background-color: #fff;
  transform: rotate(-45deg);
}
.auto:checked::after {
  content: "";
  position: absolute;
  top: 7px;
  left: 0;
  width: 4px;
  height: 2px;
  background-color: #fff;
  transform: rotate(45deg);
}
.auto:checked:hover {
  background-color: #278cde;
  border-color: #278cde;
}
.auto-txt {
  position: absolute;
  top: 273px;
  left: 287px;
  width: 52px;
  height: 13px;
}

.submit {
  position: absolute;
  top: 299px;
  left: 146px;
  width: 194px;
  height: 30px;
  background-color: #09a3dc;
  border: 0;
  border-radius: 3px;
  color: #fff;
  outline: 0;
  transition: background .5s ease-in-out;
}
.submit:hover {
  background-color: #3cc3f5;
}
.submit:checked {
  background-color: #098cbc;
}

</style>
<template>
  <div class="container" @keyup.enter="submit">
    <div id="backskin" class="backskin">
      <div id="output" class="output"></div>
    </div>
    <div class="box">
      <img class="avatar" :src="avatar" alt="" width=80 height=80 />
      <div class="uin-box">
        <input type="text" class="uin" v-model="uin" />
        <i></i>
      </div>
      <ul class="uin-list">
        <li v-for="user in users">
          <div class="img-box">
            <img :src="user.avtart" alt="" />
          </div>
          <span>{{user.nick}}</span>
          <p>{{user.uin}}</p>
        </li>
      </ul>
      <input type="checkbox" id="auto" class="auto" v-model="auto" />
      <label for="auto" class="auto-txt"></label>
      <button class="submit" @click="submit">登&nbsp;&nbsp;录</button>
    </div>
  </div>
</template>

<script>
import FSS from '../assets/lib/fss.js'

import { getOwnerInfo } from '../vuex/actions'

export default {
  data() {
    return {
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3333333&spec=100',
      uin: localStorage.user ? JSON.parse(localStorage.user).uin : '',
      auto: false,
      users: [],
      user: localStorage.user
    }
  },
  vuex: {
    actions: {
      submit ({ dispatch }) {
        const uin = this.uin
        const auto = !!this.auto
        if (this.isQQ(uin)) {
          getOwnerInfo({ dispatch }, uin).then((res) => {
            localStorage.setItem('user', JSON.stringify({uin: res.uin, isAuto: auto}))
            this.$route.router.replace('/index')
          }, err => console.log(err))
        } else {
          console.log('error')
          // this.$route.router.go('/404')
        }
      }
    },
    computed: {
      avatar () {

      }
    }
  },
  methods: {
    isQQ(uin) {
      return /^[1-9]\d{4,10}$/.test(uin)
    }
  },
  ready() {
    FSS('backskin')
  }
}



</script>

/**
 * 右侧在线用户列表
 */

<style scoped>

.list-box {
  overflow-y: auto;
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 15px;
  padding-right: 20px;
  width: 153px;
  height: 358px;
  background: #f8f9fa;
  border-left: 1px solid #e4e7e9;
  border-bottom: 3px solid #fff;
  border-bottom-right-radius: 5px;
  box-sizing: border-box;
  cursor: default;
}

.user-count {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: #424242;
}

.user-list li {
  overflow: hidden;
  width: 100%;
  height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis
}

.user-list li.online {
  -webkit-animation: online 1.5s ease
}

.user-list img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: middle
}

.user-list .nickname {
  color: #8a8a8a;
  font-size: 12px;
  margin-left: 2px;
  /*vertical-align: middle;*/
}

.user-list .uin {
  vertical-align: middle;
}

</style>

<template>
  <div class="list-box">
   <div class="user-count">成员: {{ count }}</div>
   <ul class="user-list">
     <li v-for="user in users" title="{{ user.nickname }}({{ user.uin }})">
       <img :src="user.avatar" width=20 height=20>
       <span class="nickname">{{ user.nickname }}</span>
       <!-- <span class="uin">({{ user.uin }})</span> -->
     </li>
   </ul>
  </div>
</template>

<script>
export default {
  props: ['users', 'count']
}
</script>

/**
 * 公告
 */

<style scoped>
.notice-box {
  position: absolute;
  top: 54px;
  right: 0;
  width: 153px;
  height: 128px;
  padding: 15px 10px;
  background: #f8f9fa;
  border-left: 1px solid #e4e7e9;
  box-sizing: border-box;
  color: #8a8a8a;
}

.notice-box::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10px;
  width: 133px;
  height: 1px;
  background: linear-gradient(to right, rgba(218,218,218,0), rgba(218,218,218,1), rgba(218,218,218,0));
}
</style>

<template>
  <div class="notice-box">{{ text }}</div>
</template>

<script>
import config from 'configuration'

export default {
  data() {
    return {
      text: config.notice.text
    }
  }
}
</script>

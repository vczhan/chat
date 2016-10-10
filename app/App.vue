<style>

body {
  margin: 0;
}

ul, li {
	list-style: none;
  margin: 0;
  padding: 0;
}

</style>

<template>
  <div>
    <!-- <chat-header></chat-header> -->
    <router-view></router-view>
  </div>
</template>

<script>

import chatHeader from './components/header.vue'
import store from './vuex/store'

export default {
  data() {
    return {
      msg: 'hello world'
    }
  },
  components: {
    chatHeader
  },
  store
}

</script>

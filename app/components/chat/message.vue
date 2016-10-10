/**
 * 聊天信息展示区域
 */
<style>
.msg-content img {
  max-width: 200px;
  max-height: 1000px;
  vertical-align: bottom;
  cursor: default
}
</style>

<style scoped>

.msg-box {
  position: absolute;
  top: 80px;
  left: 0px;
  padding: 5px 20px 25px;
  width: 437px;
  height: 340px;
  background: #fefefe;
  border-bottom: 1px solid #e4e7e9;
  box-sizing: border-box;
  overflow-y: auto;
}

.msg-item {
  overflow: hidden;
  position: relative;
  margin-top: 15px;
}

.msg-avatar {
  display: inline-block;
  border-radius: 50%;
  vertical-align: top
}

.msg-item.owner>.msg-avatar {
  float: right
}

.msg-nickname {
  position: absolute;
  top: 2px;
  margin-left: 13px;
  font-size: 12px;
  line-height: 1;
  color: #9ea8c7;
}

.msg-item.owner>.msg-nickname {
  right: 20px;
  margin-right: 13px;
  color: #9f9f9f;

}

.msg-content {
  display: inline-block;
  position: relative;
  margin-top: 16px;
  margin-left: 8px;
  padding: 7px 12px;
  min-width: 14px;
  min-height: 14px;
  max-width: 280px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.4;
  border: 1px solid #ececed;
  border-radius: 4px;
  background: #fff;
  word-break: break-all;
}

.msg-content::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -8px;
  width: 8px;
  height: 10px;
  border-bottom: 6px solid #ececed;
  border-radius: 0 0 0 10px;
}

.msg-content::after {
  content: '';
  position: absolute;
  top: 1px;
  left: -7px;
  width: 9px;
  height: 8px;
  border-bottom: 7px solid #fff;
  border-radius: 0 0 0 9px;
  transform: scale(1,.7);
}

.msg-item.owner .msg-content {
  float: right;
  margin-top: 17px;
  margin-right: 8px;
  background: #d3edf5;
  border: 1px solid #d3edf5;
}

.msg-item.owner .msg-content::before {
  left: auto;
  right: -8px;
  border-bottom-color: #d3edf5;
  border-radius: 0 0 10px 0;
}

.msg-item.owner .msg-content::after {
  left: auto;
  right: -7px;
  border-bottom: 7px solid #d3edf5;
  border-radius: 0 0 9px 0;
}

.msg-box::-webkit-scrollbar {
  width: 7px
}

.msg-box::-webkit-scrollbar-button {
  display: none
}

.msg-box::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 6px
}

.msg-box:hover::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.5)
}

.msg-box::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 6px
}

/* .msg-box::-webkit-scrollbar-track:hover {
  background: rgba(0,0,0,.25)
} */


</style>

<template>
  <div class="msg-box" v-el:list>
   <div class="msg-cnt">
     <div class="msg-item" :class="{ owner: uin===sender.uin }" track-by="$index" v-for="sender in msgs">
       <img class="msg-avatar" :src="sender.avatar" width=25 height=25>
       <span class="msg-nickname">{{ sender.nickname }}</span>
       <div class="msg-content" @dblclick="zoom">{{{ sender.content }}}</div>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  props: ['uin', 'messages'],
  methods: {
    zoom(e) {
      if (e.target.tagName === 'IMG') {
        const img = e.target

        if (img.naturalWidth > 200) {
          window.open(e.target.src)
        }
      }
    }
  },
  computed: {
    msgs() {
      return this.messages.slice(-100)
    }
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        let list = this.$els.list
        list.scrollTop = list.scrollHeight
      })
    }
  }
}
</script>

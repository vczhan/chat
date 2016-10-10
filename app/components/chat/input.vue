/**
 * 输入区域
 */

<style>
.input-cnt img {
  max-width: 420px;
  max-height: 420px;
  vertical-align: bottom;
  cursor: default
}
</style>

<style scoped>
.input-box {
  position: absolute;
  top: 460px;
  left: 0;
  width: 437px;
  height: 77px;
  padding: 0 8px 10px;
  background: #fdfdfd;
  box-sizing: border-box;
}

.input-cnt {
  width: 100%;
  height: 70px;
  font-family: 'Helvetica Neue', Helvetica;
  font-size: 13px;
  background: transparent;
  line-height: 18px;
  border: 0;
  outline: 0;
  resize: none;
  overflow: hidden;
  overflow-y: auto
}

.input-cnt::-webkit-scrollbar {
  display: none
}

</style>

<template>
  <tool-box></tool-box>
  <div class="input-box">
    <div class="input-cnt" contenteditable spellcheck="false"
      v-el:content
      @keydown.enter.prevent="send"
      @paste.stop.prevent="paste"
      @dblclick="zoom"
      @blur="blur">
    </div>
    <div id="saveMsg" style="display:none;"></div>
  </div>
</template>

<script>
import toolBox from './toolbox'
import RichText from 'lib_path/richText'
import api from 'app_path/api'

export default {
  ready() {
    RichText.focusRange(this.$els.content)
  },
  methods: {
    send(e) {
      if (e.target.innerHTML !== '') {
        const content = e.target.innerHTML

        this.$dispatch('sendMsg', content)
        e.target.innerHTML = ''
      }

    },
    paste(e) {
      RichText.onPaste(e, img => {
        api.postImage(img._file)
          .then(res => {
            const content = `<img src="${res.src}" />`

            this.$dispatch('sendMsg', content)
          })
      })
    },
    zoom(e) {
      // console.log(Object.prototype.toString.call(e.target))
      // if (e.target.tagName === 'IMG') {
      //   window.open(e.target.src)
      // }
    },
    blur() {
      RichText.saveRange()
    }
  },
  components: {
    toolBox
  }
}
</script>

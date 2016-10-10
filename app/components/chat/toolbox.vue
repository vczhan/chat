/**
 * 工具栏
 */

<style>
body.clip {
  cursor:url("~images_path/capture.png"),default;
  cursor: -webkit-image-set(
    url("~images_path/capture.png") 1x,
    url("~images_path/capture@2x.png") 2x
  ),default;
}
</style>

<style scoped>
.tool-box {
  position: absolute;
  top: 420px;
  left: 0;
  width: 437px;
  height: 40px;
  padding: 10px;
  background: #fdfdfd;
  box-sizing: border-box;
}

.tool-box a,
.tool-box label {
  float: left;
  margin: 0 10px;
  width: 20px;
  height: 20px;
  background-image: url(~images_path/toolbar.png);
  background-image: image-set(url(~images_path/toolbar.png) 1x, url(~images_path/toolbar@2x.png) 2x);
  background-repeat: no-repeat;
  background-position-y: 0;
  cursor: default;
}

.tool-box a:hover,
.tool-box label:hover {
  background-position-y: -20px;
}

.tool-box .emoji {
  background-position-x: 0;
}

.tool-box .snapshot {
  background-position-x: -20px;
}

.tool-box .fileup {
  background-position-x: -40px;
}

.tool-box a.on,
.tool-box label:active {
  background-position-y: -40px;
}


.emoji-cnt {
  position: absolute;
  left: -80px;
  bottom: 40px;
  padding: 7px 5px 0 7px;
  width: 453px;
  height: 220px;
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 3px;
  box-shadow: 1px 1px 2px #d8d8d8;
  background: #fff url(http://webchat.b.qq.com/img/system-face2/all.gif) no-repeat 5px 5px;
}

.emoji-cnt::after {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 103px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-right: 1px solid rgba(0,0,0,.3);
  border-bottom: 1px solid rgba(0,0,0,.3);
  transform: rotate(45deg);
}

.emoji-cnt::after {

}

.emoji-cnt i {
  float: left;
  margin-top: -1px;
  margin-left: -1px;
  width: 29px;
  height: 28px;
  border: 1px solid transparent;
}

.emoji-cnt i:hover {
  border-color: #4ca0d9;
}

</style>

<template>
  <div class="tool-box">
    <a class="emoji"
      :class="{ 'on': emojiShow }"
      @click="emojiShow=!emojiShow"></a>
    <div class="emoji-cnt" v-show="emojiShow">
      <i v-for="i in 105" @click="clickEmoji($index)"></i>
    </div>
    <a class="snapshot" @click="capture"></a>
    <input id="fileup" type="file" style="display:none"  accept="image/jpeg,image/png"
      @change="fileUp">
    <label for="fileup" class="fileup"></label>
  </div>
</template>

<script>
import RichText from 'lib_path/richText'
import Clip from 'lib_path/clip'
import api from 'app_path/api'

export default {
  data() {
    return {
      emojiShow: false
    }
  },
  ready() {
    require('lib_path/html2canvas')
  },
  methods: {
    // 选择表情
    clickEmoji(index) {
      var img = new Image
      img.src = `http://0.web.qstatic.com/webqqpic/style/face/${index}.gif`

      RichText.focusRange(this.$parent.$els.content)
      RichText.insertToContent(img)

      this.emojiShow = false
    },
    // 截图
    capture(e) {
      var clip = new Clip(this.captureRender)
      clip.printMod(e)
    },
    captureRender(clip) {
      const _this = this

      html2canvas(document.body, {
          onrendered: function(canvas) {
            const cvs = document.createElement('canvas')
            const ctx = cvs.getContext('2d')

            cvs.width = clip.clipObj.w
            cvs.height = clip.clipObj.h

            ctx.drawImage(
              canvas,
              clip.clipObj.x, clip.clipObj.y,
              clip.clipObj.w, clip.clipObj.h,
              0, 0,
              clip.clipObj.w, clip.clipObj.h
            )

            const base64 = cvs.toDataURL()
            const bytes = window.atob(base64.split(',')[1])
            const ia = new Uint8Array(bytes.length)
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i)
            }
            const blob = new Blob([ia], {type: 'image/png'})

            // const img = new Image
            // img.src = URL.createObjectURL(blob)
            // RichText.insertToContent(img);

            api.postImage(blob).then(res => {
              const content = `<img src="${res.src}" />`
              _this.$dispatch('sendMsg', content)
            })

            clip.init()
          }
      })
    },
    // 上传本地图片
    fileUp(e) {
      RichText.onUpload(e, img => {
        api.postImage(img._file).then(res => {
          const content = `<img src="${res.src}" />`
          this.$dispatch('sendMsg', content)
        })
      })
    }
  }
}

</script>

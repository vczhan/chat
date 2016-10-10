var rangeObj = {
  startContainer: null,
  startOffset: 0,
  endContainer: null,
  endOffset: 0
}

export default {
  // 失去焦点时先保存range信息
  saveRange() {
    let range = window.getSelection().getRangeAt(0)
    rangeObj.startContainer = range.startContainer
    rangeObj.startOffset = range.startOffset
    rangeObj.endContainer = range.endContainer
    rangeObj.endOffset = range.endOffset
  },
  focusRange(node) {
    node.focus()
  },
  insertToContent(val) {
    let node

    if (val.tagName === undefined) {
      node = document.createTextNode(val)
    } else {
      node = val
    }

    let selection = window.getSelection()
    let range = selection.getRangeAt(0)

    range.setStart(rangeObj.startContainer, rangeObj.startOffset)
    range.setEnd(rangeObj.endContainer, rangeObj.endOffset)

    range.deleteContents()
    range.insertNode(node)

    // 纠正光标位置
    range = range.cloneRange()
    range.setStartAfter(node)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  },
  // 截图粘贴或复制的是图片时，直接发送处理
  onPaste(e, callback) {
    const cbd = e.clipboardData

    if ( !(cbd && cbd.items) ) {
      return
    }

    // 直接复制图片，第一项为字符串，第二项为file
    // 如果单独复制图片，第一项为空字符串
    // 如果同时复制图片和文字，第一项为所有字符串相连，无论是图片前还是后，这样就不能正确的插入文字
    // 所有同时复制图片或文字的时候要选择保留文字或图片
    if (
      cbd.items.length === 2 &&
      cbd.items[0].kind === 'string' &&
      cbd.items[1].kind === 'file' &&
      cbd.types.length === 2 &&
      cbd.types[0] === 'text/plain' &&
      cbd.types[1] === 'Files'
    ) {
      let file = cbd.items[1].getAsFile()
      let img = new Image

      img.src = window.URL.createObjectURL(file)
      img._file = file

      // 做直接发送处理
      if (callback) {
        return callback(img)
      }

      this.insertToContent(img)
      return
    }

    // 复制文本，直接从剪贴板拿到纯文本，丢失富文本文本信息
    if (cbd.items[0].kind === 'string') {
      // e.clipboardData.items[0].getAsString(str => console.log())
      // console.log(e.clipboardData.getData('text/html'))
      this.insertToContent(cbd.getData('text/plain'))
      return
    }

    // QQ截图
    if(cbd.items[0].kind === 'file') {
      let file = cbd.items[0].getAsFile()
      let img = new Image

      img.src = window.URL.createObjectURL(file)
      img._file = file

      // 做直接发送处理
      if (callback) {
        return callback(img)
      }

      this.insertToContent(img)

      // var reader = new FileReader
      // reader.onload = function(e) {
      //   // this.result 为base64
      // }
      // reader.readAsDataURL(file)
    }
  },
  // 图片input
  onUpload(e, callback) {
    let file = e.target.files[0]

    if (file && file.type.indexOf('image') > -1) {
      let img = new Image

      img.src = window.URL.createObjectURL(file)
      img._file = file

      // 做直接发送处理
      if (callback) {
        return callback(img)
      }

      this.insertToContent(img)
    }
  },
  onCapture() {},
  // 发送前上传图片
  deal() {}
}

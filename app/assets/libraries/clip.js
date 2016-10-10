var doc = document,
    bd = doc.body;

// 鼠标偏移
var mouseOffset = 9;

function Clip(callback) {
  this.callback = callback
  this.initEvent()
}

Clip.prototype = {
  constructor: Clip,
  init : function() {
    this.status = 0;

    this.isMdown = false;
    this.isMask = false;

    this.maskDiv = null;
    this.clipDiv = null;

    this.clipObj = {};

    this.node = bd;

    this.st = null;
    clearTimeout(this.st);

    bd.classList.remove('clip');
  },

  initEvent : function(e) {
    var _this = this;

    this.init();

    doc.addEventListener('mousedown', this.mouseDown.bind(this), false);
    doc.addEventListener('mousemove', this.areaOp.bind(this), false);
    doc.addEventListener('dblclick', this.clipOp.bind(this), false);
    doc.addEventListener('keydown', function (e) {
      if (_this.isMask && e.keyCode === 27) {
        _this.ESC();
      }
    }, false);

    window.addEventListener('resize', function(e) {
      if (_this.status) {
        _this.docW = bd.scrollWidth;
        if (_this.status === 1) {
          // _this.areaRender();
        } else {
          _this.maskDiv.style.borderRightWidth = (_this.docW - _this.clipObj.x - _this.clipObj.w - 2) + 'px';
        }
      }
    }, false);

    doc.addEventListener('mouseup', function() {
      !!_this.isMdown && (_this.isMdown = false);
    }, false);

  },

  printMod : function(e) {
    e.stopPropagation();

    if (!this.isMask) {
      bd.classList.add('clip');
      this.status = 1;
      this.isMask = true;

      this.docW = bd.scrollWidth;
      this.docH = bd.scrollHeight;

      this.maskDiv = doc.createElement('div');
      this.maskDiv.dataset.mark = 'mask';
      this.maskDiv.style.cssText = 'position:absolute;top:0;left:0;right:0;border:0 solid rgba(0,0,0,.5); border-bottom-width:' + this.docH + 'px;z-index:99;';
      bd.appendChild(this.maskDiv);
    }
  },

  mouseDown : function(e) {
    var _this = this

    if (this.status) {
      if (e.button === 0 && this.status === 1) {
        clearTimeout(this.st);
        this.st = setTimeout(function() {
          _this.status = 2;
          _this.maskDiv.style.cssText += 'width:auto;height:auto;border:0 solid rgba(0,0,0,.5);border-bottom-width:' + _this.docH + 'px';

          _this.clipObj.x = _this.clipObj._x = e.pageX + mouseOffset;
          _this.clipObj.y = _this.clipObj._y = e.pageY + mouseOffset;

          _this.clipDiv = doc.createElement('div');
          _this.clipDiv.dataset.mark = 'clip';
          _this.clipDiv.style.cssText = 'position:absolute;left:'+ (e.pageX+mouseOffset) +'px;top:'+ (e.pageY+mouseOffset) +'px;border:1px solid #0A7CCA;';
          bd.appendChild(_this.clipDiv);
          _this.isMdown = true;
        }, 250);
      } else if (e.button === 2) {
        doc.addEventListener('contextmenu', this.cancelRmouse.bind(this), false);
        if (this.status === 1) {
          this.ESC();
        } else {
          this.status = 1;
          this.maskDiv.style.cssText = 'position:absolute;top:0;left:0;right:0;width:auto;height:auto;border:0 solid rgba(0,0,0,.5); border-bottom-width:' + this.docH + 'px;pointer-events:none;';
          bd.removeChild(this.clipDiv);
          this.clipDiv = null;
        }
      }
    }
  },

  areaOp : function(e) {
    if (!!this.isMdown) {
      if (e.pageX > this.docW || e.pageX < 0 || e.pageY > this.docH || e.pageY < 0) {
        return;
      }

      this.clipObj._w = (e.pageX + mouseOffset) - this.clipObj._x,
      this.clipObj._h = (e.pageY + mouseOffset) - this.clipObj._y;
      this.clipObj.w = Math.abs(this.clipObj._w);
      this.clipObj.h = Math.abs(this.clipObj._h);

      this.clipDiv.style.width = this.clipObj.w + 'px';
      this.clipDiv.style.height = this.clipObj.h + 'px';

      if (this.clipObj._w < 0) {
        this.clipDiv.style.left = (e.pageX + mouseOffset) + 'px';
        this.clipObj.x = e.pageX + mouseOffset;
      }

      if (this.clipObj._h < 0) {
        this.clipDiv.style.top = (e.pageY - mouseOffset) + 'px';
        this.clipObj.y = e.pageY - mouseOffset;
      }

      this.maskRender();
    }
  },

  clipOp : function(e) {
    if (!this.status) {
      return;
    }

    clearTimeout(this.st);

    // if (!this.sound) {
    //   this.sound = doc.createElement('audio');
    //   this.sound.src = require('/app/assets/clip.mp3');
    // }
    // this.sound.play();

    this.clearRender();

    this.callback && this.callback(this)
  },

  maskRender : function() {
    var brw = this.docW - this.clipObj.x - this.clipObj.w - 2,
      bbw = this.docH - this.clipObj.y - this.clipObj.h - 2;

    brw = brw > 0 ? brw : 0;
    bbw = bbw > 0 ? bbw : 0;

    var maskHtml =
      'width:' + (this.clipObj.w + 2) + 'px;\
      height:' + (this.clipObj.h + 2) + 'px;\
      border-width:' + this.clipObj.y + 'px \
      ' + (brw) + 'px\
      ' + (bbw) + 'px\
      ' + this.clipObj.x + 'px';

    this.maskDiv.style.cssText += maskHtml;
  },

  clearRender : function() {
    !!this.maskDiv && bd.removeChild(this.maskDiv);
    !!this.clipDiv && bd.removeChild(this.clipDiv);
  },

  ESC : function() {
    this.clearRender();
    this.init();
  },

  cancelRmouse : function(e) {
    e.preventDefault();
    doc.removeEventListener('contextmenu', this.cancelRmouse, false);
  },

  getNode : function(el, arg) {
    do {
      if (el.getAttribute(arg) || el == document.body) {
        return el;
      }
    } while(el = el.parentNode);
  },

  getPos : function(el) {
    var _x = 0, _y = 0, self = el;
    do{
      if(el == self) {
        _x = el.offsetLeft;
        _y = el.offsetTop;
      }
      else {
        _x += el.offsetLeft + el.clientLeft;
        _y += el.offsetTop + el.clientTop;
      }
    } while (el = el.offsetParent);
    return {x: _x, y: _y};
  }
}

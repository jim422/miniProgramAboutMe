let deviceHeight = wx.getSystemInfoSync().windowHeight;
let deviceWidth = wx.getSystemInfoSync().windowWidth;

let setTopAndLeft = require('./setTopAndLeft.js')

Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    cancel: {
      type: String,
      value: ''
    },
    confirm: {
      type: String,
      value: ''
    },
    width: {
      type: Number,
      value: 200
    },
    height: {
      type: Number,
      value: 200
    },
    name: {
      type: String,
      value: ''
    },
    visible: {
      type: Boolean,
      value: false,
      observer: function(cur, pre) {
        if (cur === true) {
          this.caculatePosition(this.data.positionInfo)
        }
        
      }
    },
  },
  relations: {
    "../common-tips-area/common-tips-area": {
      type: 'parent'
    }
  },
  options: {
    multipleSlots: true
  },
  data: {
    deviceHeight: deviceHeight,
    deviceWidth: deviceWidth,
    standard_across_line: deviceHeight / 2, // 横线
    standard_vertical_line: deviceWidth / 2, //竖线
    top: 0,
    left: 0,
    positionInfo: {}
  },
  methods: {
    trigger: function(e) {
      let self = this;
      let touch = e.touches[0];

      self.setData({
        positionInfo: {
          offsetLeft: e.target.offsetLeft,
          offsetTop: e.target.offsetTop,
          clientX: touch.clientX,
          clientY: touch.clientY,
          pageX: touch.pageX,
          pageY: touch.pageY,
        }
      })

      this.triggerEvent('tips', {
        name: e.target.id
      }, {
        composed: true,
        bubbles: true
      });
    },
    caculatePosition: function(positionInfo) {
      let vertical;
      let across;
      console.log(positionInfo)
      if (positionInfo.clientX > this.data.standard_vertical_line) {
        across = positionInfo.clientX + this.properties.width / 2 > this.data.deviceWidth ?
          'left' :
          'center'
      }

      if (positionInfo.clientX <= this.data.standard_vertical_line) {
        across = positionInfo.clientX - this.properties.width / 2 < 0 ?
          'right' :
          'center'
      }

      if (positionInfo.clientY < this.data.standard_across_line) {
        vertical = 'top'
      }

      if (positionInfo.clientY >= this.data.standard_across_line) {
        vertical = positionInfo.clientY + this.properties.height > this.data.deviceHeight ?
          'bottom' :
          'top'
      }
      console.log(across, vertical)
      setTopAndLeft.positionList[across + '_' + vertical](positionInfo, this)
    }
  }
})
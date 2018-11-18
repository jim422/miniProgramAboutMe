let deviceHeight = wx.getSystemInfoSync().windowHeight;
let deviceWidth = wx.getSystemInfoSync().windowWidth;

let setTopAndLeft = require('./setTopAndLeft.js')

Component({
  properties: {
    title: {
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
        this.setData({
          caculateDone: false
        })
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
    standardAcrossLine: deviceHeight / 2, // 横线
    standardVerticalLine: deviceWidth / 2, //竖线
    top: 0,
    left: 0,
    positionInfo: {},
    arrowClass: '',
    arrowTop: 0,
    arrowLeft: 0,
    caculateDone: false
  },
  attached: function() {
    this.setData({
      deviceHeight: wx.getSystemInfoSync().windowHeight,
      deviceWidth: wx.getSystemInfoSync().windowWidth,
      standardAcrossLine: wx.getSystemInfoSync().windowHeight / 2, 
      standardVerticalLine: wx.getSystemInfoSync().windowWidth / 2
    })
  },
  methods: {
    trigger: function(e) {
      let self = this;
      let touch = e.touches[0];
      let query = wx.createSelectorQuery();

    
      query.select('#' + e.target.id).boundingClientRect();

      query.exec(function (res) {
        self.setData({
          positionInfo: {
            offsetLeft: res[0]['left'],
            offsetTop: res[0]['top'],
            clientX: touch.clientX,
            clientY: touch.clientY,
            pageX: touch.pageX,
            pageY: touch.pageY,
            elWidth: res[0]['width'],
            elHeight: res[0]['height']
          }
        })

        self.triggerEvent('tips', {
          name: e.target.id
        }, {
            composed: true,
            bubbles: true
          });
      })
      
    },

    caculatePosition: function(positionInfo) {
      let vertical;
      let across;
      if (positionInfo.clientX > this.data.standardVerticalLine) {
        across = positionInfo.clientX + this.properties.width / 2 > this.data.deviceWidth ?
          'left' :
          'center'
      }

      if (positionInfo.clientX <= this.data.standardVerticalLine) {
        across = positionInfo.clientX - this.properties.width / 2 < 0 ?
          'right' :
          'center'
      }

      if (positionInfo.clientY < this.data.standardAcrossLine) {
        vertical = 'top'
      }

      if (positionInfo.clientY >= this.data.standardAcrossLine) {
        vertical = positionInfo.clientY + this.properties.hpagddddddddddddddsfsdfddfeight > this.data.deviceHeight ?
          'top' :
          'bottom'
      }

      this.setData({
        arrowClass: 'arrow-direct-' + across,
        arrowTop: positionInfo.pageY,
        arrowLeft: positionInfo.offsetLeft
      })
      setTopAndLeft.positionList[across + '_' + vertical](positionInfo, this)
      console.log(vertical)
      this.setData({
        caculateDone: true
      })
    }
  }
})
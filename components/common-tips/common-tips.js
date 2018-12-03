let deviceHeight;
let deviceWidth;
let standardAcrossLine; // 横线
let standardVerticalLine;  //竖线
let positionInfo = {};
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
    tipsId: {
      type: String,
      value: '',
      observer: function(cur, pre) {
        
      }
    },
    visible: {
      type: Boolean,
      value: false,
      observer: function(cur, pre) {
        this.setData({
          caculateDone: false
        })
        if (cur === true) {
          this.caculatePosition(positionInfo)
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
    top: 0,
    left: 0,
    positionInfo: {},
    arrowClass: '',
    arrowTop: 0,
    arrowLeft: 0,
    caculateDone: false
  },
  attached: function() {
      deviceHeight = wx.getSystemInfoSync().windowHeight;
      deviceWidth = wx.getSystemInfoSync().windowWidth;
      standardAcrossLine = deviceHeight / 2;
      standardVerticalLine = deviceWidth / 2;
      this.triggerEvent('tipsIdAdd', {
        tipsId: this.properties.tipsId
      }, {
        bubbles: true,
        composed: true
      })
  },
  methods: {
    trigger: function(e) {
      let self = this;
      let touch = e.touches[0];
      let query = wx.createSelectorQuery();

    
      query.select('#' + e.target.id).boundingClientRect();
      
      query.exec(function (res) {
        positionInfo = {
          offsetLeft: res[0]['left'],
          offsetTop: res[0]['top'],
          clientX: touch.clientX,
          clientY: touch.clientY,
          pageX: touch.pageX,
          pageY: touch.pageY,
          elWidth: res[0]['width'],
          elHeight: res[0]['height']
        }
        self.triggerEvent('tips', {
          tipsId: e.target.id
        }, {
            composed: true,
            bubbles: true
          });
      })
      
    },
    caculatePosition: function(positionInfo) {
      let vertical;
      let across;
      if (positionInfo.clientX > standardVerticalLine) {
        across = positionInfo.clientX + this.properties.width > deviceWidth ?
          'left' :
          'center'
      }

      if (positionInfo.clientX <= standardVerticalLine) {
        across = positionInfo.clientX - this.properties.width  < 0 ?
          'right' :
          'center'
      }

      if (positionInfo.clientY < standardAcrossLine) {
        vertical = 'bottom'
      }

      if (positionInfo.clientY >= standardAcrossLine) {
        vertical = positionInfo.clientY + this.properties.height > deviceHeight ?
          'top' :
          'bottom'
      }

      setTopAndLeft.positionList[across + '_' + vertical](positionInfo, this)
      
      this.setData({
        caculateDone: true
      })
    }
  }
})
// components/common-map/common-map.js
let mpMap = require('../../libs/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    centerX: 113.3245211,
    centerY: 23.10229,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    created: function() {
      this.myMap = wx.createMapContext('myMapj')
    },
    ready: function () {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: (res) => {
          console.log(res)
         this.setData({
           centerX: res.latitude,
           centerY: res.longitude
         })
        }
      });
      
    },
  },
  regionchange(e) {
    console.log(e)
  }
})

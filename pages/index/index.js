//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
  },
  giveCall: function(event) {
    console.log(app)
    wx.makePhoneCall({
      phoneNumber: app.globalData.phoneNumber,
    })
  },
  goToMap: function() {
    wx.navigateTo({
      url: '/pages/my-map/my-map',
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    
  }
})

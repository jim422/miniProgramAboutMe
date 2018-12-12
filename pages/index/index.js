const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    product: 1,
    interactive: 1,
    runningSlow: false
  },
  giveCall: function(event) {
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
    
  },
  handleEvaluate: function(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [field]: e.detail.index
    })
  },
  toggle: function(e) {
    this.setData({
      runningSlow: e.detail.value
    })
  },
  showSkillCanvas: function() {
    wx.navigateTo({
      url: '/pages/canvas-of-skill/canvas-of-skill'
    })
  },
  submit: function(e) {
    let runningSlow = this.data.runningSlow ? 1 : 0;
    wx.reportMonitor('product', this.data.product);
    wx.reportMonitor('interactive', this.data.interactive);
    wx.reportAnalytics('runningSlow', runningSlow);
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000
    })
  }
})

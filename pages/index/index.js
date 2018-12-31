const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    product: 1,
    interactive: 1,
    runningSlow: false,
    showVisitMapTip: false,
    actions: [{
      name: '进去看看',
      color: '#2d8cf0'
    }, {
      name: '取消'
    }],
    mapHighlight: false
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
  },
  swiperChange(e) {
    if (e.detail.current == 4 && app.globalData.visitedMap == false) {
      setTimeout(() => {
          this.setData({
            showVisitMapTip: true
          })
      }, 500)
      
    }
  },
  handleModal(e) {
    if (e.detail.index === 0) {
      wx.navigateTo({
        url: '/pages/my-map/my-map',
      })
    }
    app.globalData.visitedMap = true
    this.setData({
      showVisitMapTip: false
    });

  }
})

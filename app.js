//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo'] == undefined) {
        }

        if (res.authSetting['scope.userLocation'] == undefined) {
          wx.authorize({
            scope: 'scope.userLocation'
          })
        }
      }
    })

    wx.getSystemInfo({
      success: function(res) { 
      },
    })
  },
  globalData: {
    userInfo: null,
    phoneNumber: '15201381389',
    route: null
  }
})
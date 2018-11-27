let mapSdk = require('../../libs/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js')
import { coostsType } from './handleCoots.js'
import { handleMarkers, myPointMarker, markersKeyMap } from './handleMarkers.js'
const myKey = 'S2OBZ-SG3R3-XJE36-3WSVH-ND7NT-HIF5Y'
Page({
  data: {
    longitude: '',
    latitude: '',
    markers: myPointMarker,
    polyline: [],
    myPoint: {
      latitude: 40.072019,
      longitude: 116.360161
    },
    company: '',
    includePoints: [],
    animationData: {},
    resultPoints: [],
    selectedMarkerId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    }) 
    this.myMap = wx.createMapContext('myMap')
    this.sdk = new mapSdk({
      key: myKey
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        this.myMap.moveToLocation()
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  regionchange: function() {
    
  },
  fetchDistance: function(e) {
    let data = e.target.dataset;
    let fromLon = this.data.myPoint.longitude;
    let fromLa =  this.data.myPoint.latitude;
    let toLon = data.lon;
    let toLa = data.la
    var opt = {
      url: `https://apis.map.qq.com/ws/direction/v1/transit/?from=${fromLa},${fromLon}&to=${toLa},${toLon}&key=${myKey}`,
       method: 'GET',
       dataType: 'json',
       success: (res) => {
         let data = res.data;

         if (data.status != 0) {
           wx.showToast({
             title: '服务器异常',
             duration: 1000
           })
           return
         }

         let coots = data.result.routes[0]

         let info = coostsType['transit'](coots)

         this.setData({
           polyline: [{
             points: info.pl,
             color: '#FF0000DD',
             width: 2
           }]
         })
       }
    }

    wx.request(opt)
  },
  companyValueChange: function(e) {
    this.setData({
      company: e.detail.detail.value
    })
  },
  searchCompany: function() {
    
    this.search(this.data.company)
  },
  search: function(value) {
    var self = this
    this.sdk.search({
      keyword: value,
      success: function (res) {
        var handledRes = handleMarkers(res)
        self.myMap.includePoints({
          padding: [10],
          points: handledRes.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude
          }))
        })
        let height = handledRes.length > 0 
          ? 150
          : 0
        self.animation.height(150).step()
        self.setData({
          markers: myPointMarker.concat(handledRes),
          resultPoints: handledRes,
          animationData: self.animation.export(),
          selectedMarkerId: null
        })
        
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  markerTap: function(e) {
    this.setData({
      selectedMarkerId: e.markerId
    })
  },
  setTerminal: function(e) {
    this.setData({
      longitude: e.target.dataset.lon,
      latitude: e.target.dataset.la
    })
    this.fetchDistance(e)
  },
  observeWithMap(e) {
    let markerId = e.currentTarget.id;
    let longitude = markersKeyMap[markerId].longitude;
    let latitude = markersKeyMap[markerId].latitude;

    this.setData({
      longitude,
      latitude
    })
  }
})
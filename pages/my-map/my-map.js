let mapSdk = require('../../libs/qqmap-wx-jssdk/qqmap-wx-jssdk.min.js')
import {
  coostsType
} from './handleCoots.js';
import {
  handleMarkers,
  myPointMarker,
  markersKeyMap,
  hrPointMarker
} from './handleMarkers.js';

const myKey = 'S2OBZ-SG3R3-XJE36-3WSVH-ND7NT-HIF5Y';
let app = getApp();
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
    selectedMarkerId: null,
    evaluateResultVisible: false,
    terminalText: ''
  },
  onLoad: function(options) {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });

    this.myMap = wx.createMapContext('myMap')
    this.sdk = new mapSdk({
      key: myKey
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let hrMarker = hrPointMarker(res.longitude, res.latitude);
        let hrMarkerId = hrMarker[0].id
        markersKeyMap[hrMarkerId] = hrMarker[0]

        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: myPointMarker.concat(hrMarker),
          selectedMarkerId: hrMarker[0].id,
          terminalText: markersKeyMap[hrMarkerId].title
        })
        this.myMap.moveToLocation()
      }
    })
    app.globalData.visitedMap = true;
  },
  fetchDistance: function(e) {
    let data = e.target.dataset;
    let fromLon = this.data.myPoint.longitude;
    let fromLa = this.data.myPoint.latitude;
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

        let info = coostsType['transit'](coots);

        this.setData({
          polyline: [{
            points: info.pl,
            color: '#FF0000DD',
            width: 2
          }],
          evaluateResultVisible: true
        })

        app.globalData.route = data.result.routes[0]
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
      success: function(res) {
        if (res.count == 0) {
          wx.showToast({
            title: '没有找到相关信息',
            duration: 1000,
            icon: 'none'
          })
        }

        var handledRes = handleMarkers(res)
        self.myMap.includePoints({
          padding: [10],
          points: handledRes.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude
          }))
        })
        let height = handledRes.length > 0 ?
          140 :
          0;
        self.animation.height(height).step()
        self.setData({
          markers: myPointMarker.concat(handledRes),
          resultPoints: handledRes,
          animationData: self.animation.export(),
          evaluateResultVisible: false
        })

      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  markerTap: function(e) {
    let marker = markersKeyMap[e.markerId];
    this.setData({
      longitude: marker.longitude,
      latitude: marker.latitude,
      selectedMarkerId: e.markerId,
      terminalText: marker.title,
      evaluateResultVisible: false
    })
  },
  observeWithMap(e) {
    let markerId = e.currentTarget.id;
    let longitude = markersKeyMap[markerId].longitude;
    let latitude = markersKeyMap[markerId].latitude;

    this.setData({
      longitude,
      latitude,
      selectedMarkerId: markerId,
      terminalText: markersKeyMap[markerId].title,
      evaluateResultVisible: false
    })
  },
  redirectToAnalysis() {
    wx.navigateTo({
      url: '/pages/canvas-of-analysis/canvas-of-analysis',
    })
  }
})
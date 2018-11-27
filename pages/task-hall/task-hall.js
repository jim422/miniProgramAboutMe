import {
  list
} from './task-list.js'
import { $Toast } from '../../components/iview-weapp/base/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: list,
    platformList: [{
      pid: 'all',
      text: '全部'
    }, {
      pid: '9',
      text: '微信'
    }, {
      pid: '1',
      text: '新浪'
    }, {
      pid: '24',
      text: '秒拍'
    }, {
      pid: '103',
      text: '快手'
    }, {
      pid: '26',
      text: '今日头条'
    }],
    currentPlatform: 'all',
    currentTask: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  filterPlatform: function({
    detail
  }) {
    this.setData({
      currentPlatform: detail.key
    })
    this.filter()
    
  },
  filterTask: function({
    detail
  }) {
    this.setData({
        currentTask: detail.key
      })
    this.filter()
  },
  filter: function () {
    let filteredList = list.filter(item => {
      if (this.data.currentPlatform === 'all') {
        return true
      } else {
        return item.weiboTypes.includes(this.data.currentPlatform)
      }
    }).filter(item => {
      if (this.data.currentTask === 'all') {
        return true
      } else {
        return item.category.id == this.data.currentTask
      }
    })
    this.setData({
      list: filteredList
    })
  },
  receiveTask: function(e) {
    let id = e.currentTarget.dataset.id;

    let res = list.find(item => {
      return item.id == id
    })
    res.status = 2

    this.setData({
      list
    })

    $Toast({
      content: '领取成功',
      type: 'success'
    })
  }
})
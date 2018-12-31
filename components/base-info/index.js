// components/base-info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    containerClassName: {
      type: String,
      value: 'prop-class',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    email: 'jinfengjie_12@126.com',
    weChat: 'jinfengjie01'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    copyInfo(e) {
      console.log(e)
      wx.setClipboardData({
        data: e.currentTarget.dataset.info
      })
    }
  },
  options: {
    addGlobalClass: true,
  }
})

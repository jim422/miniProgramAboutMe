// components/common-modal/common-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      value: '',
      type: String
    }
  },
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    visible: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle: function(e) {
      this.setData({
        visible: !this.data.visible
      })
    }
  }
})

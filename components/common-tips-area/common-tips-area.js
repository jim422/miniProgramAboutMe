// components/common-tips-area/common-tips-area.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  relations: {
    '../common-tips/common-tips': {
      type: 'child'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickFn(e) {
      let name = e.detail.name;
      const allList = this.getRelationNodes('../common-tips/common-tips');
      allList.forEach(item => {
        if (name === item.data.name) {
          item.setData({
            visible: true
          });
        } else {
          item.setData({
            visible: false
          })
        }
      })
    },
    handle: function(e) {

      const allList = this.getRelationNodes('../common-tips/common-tips');
      allList.forEach(item => {
        item.setData({
          visible: false
        });
      })
    },
  }
})
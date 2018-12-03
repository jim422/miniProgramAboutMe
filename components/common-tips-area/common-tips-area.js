let tipsKeyMap = {};
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
    tipsKeyMap: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickFn(e) {
      let tipsId = e.detail.tipsId;
      const allList = this.getRelationNodes('../common-tips/common-tips');
      allList.forEach(item => {
        if (tipsId === item.data.tipsId) {
          item.setData({
            visible: !item.data.visible
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
    tipsIdAdd(e) {
      let id = e.detail.tipsId;
      tipsKeyMap[id] = {
        visible: false
      };
    }
  }
})
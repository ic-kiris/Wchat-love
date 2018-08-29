Component({
  properties: {
    title: {
      type: String,
      value: '弹窗标题'
    },
    content: {
      type: String,
      value: '弹窗内容'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    okText: {
      type: String,
      value: '确定'
    }
  },
  data: {
    isShow: false
  },
  methods: {
    show: function () {
      this.setData({
        isShow: true
      })
    },
    close: function () {
      this.setData({
        isShow: false
      })
    },
    _cancelEvent: function () {
      this.triggerEvent('cancelEvent');
    },
    _okEvent: function () {
      this.triggerEvent('okEvent');
    },
    bindGetUserInfo(e) {
      if (e.detail.userInfo) {
        this.triggerEvent("bindGetUserInfo");
        wx.showModal({
          title: '授权成功',
          content: '感谢您的使用',
        })
      } else {
        wx.showModal({
          title: '请授权使用',
          content: '点击按钮重新授权',
          success: res => {
          }
        })
      }

    }
  }
})




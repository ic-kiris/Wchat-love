//app.js
const AV = require('./libs/av-weapp-min.js');
App({
  onLaunch() { //小程序启动后 触发的函数
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/scan/scan',
          })
        }
      }
    })
  },

  onShow() {
    this.login()
    AV.init({
      appId: 'GFObn0F7ok9y2ldtGbekdYbX-gzGzoHsz',
      appKey: 'MqPzpFkxFFlMM1t4pfYkCClP',
    });
  },
  scroll(e) {
    console.log(e);
  },
  getUserInfo(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      this.login()
    }
  },
  login(cb) {
    var that = this
    wx.login({
      success: res => {
        var code = res.code
        wx.getUserInfo({
          success: res => {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      },
      fail: err => {
        wx.showModal({
          title: "温馨提示",
          content: "小程序需要获取头像信息，点击确认前往设置或退出程序？",
          showCancel: !0,
          confirmColor: "#d85940",
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/scan/scan?user_id=111',
              })
            }
          }
        })

      }

    })

  },
  globalData: {
    userInfo: null
  }
});
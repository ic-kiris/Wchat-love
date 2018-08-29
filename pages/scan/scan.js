// page/dstal/pages/login/login.js
var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {

  },
  onShow: function() {

  },
  onAuth() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '/pages/tabBar/Today/index',
          })
        }
      }
    })

  },

})
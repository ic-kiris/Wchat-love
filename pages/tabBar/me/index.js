var app = getApp();
Page({
  data: {
    bannerSrc: "../../../image/banner-user-bj.png",
    userInfo: {},
    avatarUrl: "",
    userinfoList: [{
        text: "历史消息",
      icon: "../../../image/ic/ic-release.png",
        url: "../../me/pages/user-comment/user-comment"
      },
      {
        text: "朋友圈",
        icon: "../../../image/fb.png",
        url: "../../me/pages/location/location"
      },
      {
        text: "关于我们",
        icon: "../../../image/ic/ic-user-active.png",
        url: "../../me/pages/user-about/user-about"
      },
      {
        text: "我的名片",
        icon: "../../../image/heart.png",
        url: "../../me/pages/mine/index"
      }
    ]
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowHeight);
        that.setData({
          height: res.windowHeight / 2.2
        })
        // console.log(that.data.height);

      },
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      });
    });
  },

})
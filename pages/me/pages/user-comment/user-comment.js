// pages/user-comment/user-comment.js
var app = getApp();
const AV = require('../../../../libs/av-weapp-min.js');
var Lovelist = AV.Object.extend('Lovelist');
var getList = function (_that) {
  var query = new AV.Query('Lovelist');
  AV.Object.createWithoutData('Lovelist', _that.data.userInfo.nickname).fetch().then(function (products) {
    _that.setData({
      commentList:products.attributes.results
    });
    console.log(_that.data.commentList);
  }).catch(function (error) {
    alert(JSON.stringify(error));
  });
}
Page({
  data:{
    userInfo:"",
    commentList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var _that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      _that.setData({
        userInfo: userInfo
      });
    });
    getList(this);
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  goDetails:function (e) {
    var objId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../../../Today/pages/details/details?objId=" + objId
    })
  },
})
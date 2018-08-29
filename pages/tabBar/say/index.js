//获取应用实例
var app = getApp();
const AV = require('../../../libs/av-weapp-min.js');
var toolTip = require('../../../libs/ToolTip/toolTip.js');
var productSrc = [];
Page({
  data: {
    focus: false,
    title: "",
    content: "",
    isCheck: false,
    productSrc: [],
    isShow: false,
    userInfo: {},
    isRefresh: false,
    textareaContent: "",
    tempFilePaths: {},
    msgList: []
  },
  onLoad: function() {
    toolTip.init(this);
    //获取个人信息
    var _that = this;
    _that.data.productSrc = [];
    productSrc = [];
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      _that.setData({
        userInfo: userInfo
      });
    });
  },
  onShow:function(){
    wx.getSetting({
      success: (res) => {
        if (res.userInfo) {
          wx.reLaunch({
            url: '/pages/scan/scan',
          })
        }
      }
    })
  },
  onReady: function() {
    new AV.Query('Newslist')
      .find()
      .then(msgList => this.setData({
        msgList
      }))
      .catch(console.error);
  },
  titleEventFunc: function(e) {
    if (e.detail && e.detail.value) {
      this.data.title = e.detail.value;
    }
  },
  contentEventFunc: function(e) {
    if (e.detail && e.detail.value) {
      this.data.content = e.detail.value;
    }
  },
  isNameEventFunc: function(e) {
    this.data.isCheck = e.detail.value;
  },
  formSubmit: function(e) {
    var _that = this;
    var titleVal = _that.data.title;
    var contentVal = _that.data.content;
    var isChecked = _that.data.isCheck;
    var userName, headImg;
    if (titleVal == '' || titleVal.length < 0) {
      wx.showModal({
        title: '亲，要向谁表白呀！',
        content:'请填写你要@的心上人'
      })
      toolTip.showToolTip('error', '请填写标题', 2000);
      return;
    } else if (contentVal === "" || contentVal.length < 4) {
      wx.showModal({
        title: '多点诚意，字数太少了',
        content: '请认真填写内容',
      })
      toolTip.showToolTip('error', '表白内容为空或字数不超过4个字', 2000);
      return;
    } else { //表白内容没有问题可以发送
      if (!isChecked) { //不匿名
        userName = _that.data.userInfo.nickName;
        headImg = _that.data.userInfo.avatarUrl;
      } else {
        userName = '匿名（坦白者）';
        headImg = "./../../../image/heart.png";
      }
      wx.showToast({
        title: '表白ok',
        icon: 'loading',
        duration: 2000,
        success: function() {
          var Lovelist = AV.Object.extend('Lovelist');
          var lovelist = new Lovelist();
          lovelist.set('title', titleVal);
          lovelist.set('content', contentVal);
          lovelist.set('isName', !isChecked);
          lovelist.set('username', userName);
          lovelist.set('headImg', headImg);
          lovelist.set('contentImg', _that.data.productSrc);
          lovelist.save().then(function() {
            wx.navigateBack();
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
              mask: true,
              success: function() {
                setTimeout(function() {
                  wx.hideToast();
                }, 2000);
                wx.reLaunch({
                  url: '/pages/tabBar/Today/index',
                })
              }
            });
          }, function(error) {
            // console.log(error);
          });
        },
        fail: function() {
          wx.showToast({
            title: '抱歉,网络好像差了点',
            icon: 'success',
            duration: 2000,
            success: function() {}
          });
        }
      });

      wx.navigateBack();
    }
  },
  formReset: function() {},
  //上传图片
  uploadImg: function() {
    var _this = this;
    //上传照片
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        res.tempFilePaths.forEach(function(url, index) {
          let localFile = url;
          new AV.File('ImageSrc', {
            blob: {
              uri: localFile,
            }
          }).save().then(function(file) {
            // 文件保存成功
            productSrc.push(file.url());
            _this.setData({
              productSrc: productSrc
            });
          }, function(error) {
            // 异常处理
            console.error(error);
          });
        });
        _this.setData({
          productSrc: productSrc,
          tempFilePaths: res.tempFilePaths
        });
      }
    })
  },
  previewImage: function(e) {
    var that = this;
    var dataid = e.currentTarget.dataset.id;
    var productSrc = that.data.productSrc;
    wx.previewImage({
      current: productSrc[dataid],
      productSrc: this.data.productSrc
    });
  },
  handDeleteImg: function(e) {
    var index = e.currentTarget.dataset.index;
    productSrc.splice(index, 1);
    this.setData({
      productSrc: productSrc,
    });
  }
})

var app = getApp();
const AV = require('../../../../libs/av-weapp-min.js');
var util = require('../../../../utils/util.js');
var toolTip = require('../../../../libs/ToolTip/toolTip.js');
function addSupprt(_that) {
  var username = _that.data.userInfo.nickName;
  _that.data.support.push(username);
  var order = AV.Object.createWithoutData('Lovelist', _that.data.review.id);
  order.set('supportNum',_that.data.support);
  order.save().then(function () {
    _that.setData({
      supportNum:_that.data.support.length
    })
    return;
  }, (error) => {
    throw error;
  });
}
Page({
  data:{
    userInfo:"",
    order: {},
    time:"",
    review:{},
    comments: [],
    commentObj: {},
    isReview:false,
    support:[], //点赞数
    supportNum:0,
    objects:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    toolTip.init(this);
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
    // 查询单个对象
    var lovelist = new AV.Query('Lovelist');
    lovelist.get(options.objId).then(function(order){
      var time = order.get('updatedAt');
      that.setData({
        order: order.attributes,
        review:order,
        time: time.getFullYear() + '年' + (time.getMonth() + 1) + "月" + time.getDate() + "日" + time.getHours()+"时"+":"+time.getMinutes()+"分"
      });
      if(order.attributes.comments && order.attributes.comments.length > 0) {
        that.setData({
          comments : order.attributes.comments
        });
      }
      if(order.attributes.supportNum.length>0){
       
        that.setData({
          support : order.attributes.supportNum,
          supportNum : order.attributes.supportNum.length
        });
      }
    });
    
  },
  onShow(){

  },
  onHide(){
    // 页面隐藏
  },
  onUnload(){
    // 页面关闭
  },
  commentInput: function(e){
    this.data.commentObj.author = this.data.userInfo;//用户的信息
    this.data.commentObj.commentStr = e.detail.value;
    this.data.commentObj.createAt = new Date();
    this.data.commentObj.formatDate = util.formatTime(this.data.commentObj.createAt);
  },
  commentSubmit: function(e) {
    var that  = this;
    if(!that.data.commentObj.commentStr || that.data.commentObj.commentStr === ''){
      toolTip.showToolTip('error', '评论为空', 2000);
      return false;
    }
    this.data.comments.unshift(that.data.commentObj);
    var order = AV.Object.createWithoutData('Lovelist', that.data.review.id);
    order.set('comments', this.data.comments);
    order.save().then(function () {
      wx.redirectTo({
        url: './details?objId=' + that.data.review.id
      });
    }, (error) => {
      throw error;
    });
  },
  handleReviewInput() {
    this.setData({
        isReview: true
    })
  },
  handleSupport(e) { //点赞事件
    var _that = this;
    if(_that.data.support.length==0){
      addSupprt(_that);
    }
    else{
      for(let x in _that.data.support){
        if(_that.data.support[x]==_that.data.userInfo.nickName){ //有相同的
          toolTip.showToolTip('error', '你已经点过赞了', 2000);
          return;
        }
        else{  //没有赞过
          addSupprt(_that);
        }
      }
    }

  },
  dbbug(e){
    var src = e.currentTarget.dataset.src;
    var imgList = e.currentTarget.dataset.list;
    wx.previewImage({
      current: src,
      urls:imgList
    });
  },
  onShareAppMessage () {
    return {
      title: '临职表白墙出明星了，电哥正在直播',
      imageUrl:'/image/heart.png',
      path: '/pages/details/details?id=123',

    }
  }
})
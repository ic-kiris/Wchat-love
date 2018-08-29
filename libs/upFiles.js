// const AV = require('./av-weapp-min.js');
// var productSrc = [];
// var chooseImage = (_this, count) => {
//   wx.chooseImage({
//     count: 9, // 默认9
//     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//     success: res => {
//       console.log(res)
//       res.tempFilePaths.forEach(function(url, index) {
//         let localFile = url;
//         new AV.File('ImageSrc', {
//           blob: {
//             uri: localFile,
//           }
//         }).save().then(function(file) {
//           // 文件保存成功
//           productSrc.push(file.url());
//           _this.setData({
//             productSrc: productSrc
//           });
//         }, function(error) {
//           // 异常处理
//           console.error(error);
//         });
//       });
//       _this.setData({
//         productSrc: productSrc,
//         tempFilePaths: res.tempFilePaths
//       });
//     }
//   })
// }
// var chooseVideo = (_this, count) => {
//   wx.chooseVideo({
//     sourceType: ['album', 'camera'],
//     maxDuration: 360,
//     compressed: true,
//     camera: 'back',
//     success: res => {
//       console.log(res)
//      res.tempFilePath.forEach(function(url,index){
//       //  let localFile = url;
//        console.log(url)
//      })
//     }
//   })
// }


// module.exports = {
//   chooseImage,
//   chooseVideo
// }
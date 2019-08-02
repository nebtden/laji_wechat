//index.js
//获取应用实例
const app = getApp()

// var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
//
// // 设置APPID/AK/SK
// var APP_ID = "16823419";
// var API_KEY = "tMnr5twPkVeIylmfFP0UD2et";
// var SECRET_KEY = "G3dlw7YM3ohl8NBC7sCyQxyIkYOzYmrC";
// var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

Page({
  data: {
    laji: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    takePhoto() {
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                var self = this;
                this.setData({
                    src: res.tempImagePath
                });
                console.log(res);

                wx.uploadFile({
                    url: 'http://www.yunche168.com/tianxing.php', //仅为示例，非真实的接口地址
                    filePath: res.tempImagePath,
                    name: 'file',
                    header: { "Content-Type": "multipart/form-data" },
                    success: function(res){
                        var data = res.data
                        console.log(data);

                        var data = JSON.parse(data);
                        console.log(data.newslist);
                         var  result = data.newslist;
                         var item = result[0];

                        self.setData({
                            laji: item.name
                        });
                        self.setData({
                            laji_tip: item.lajitip
                        })

                    }
                })

                //百度成功案例
                // wx.uploadFile({
                //     url: 'http://www.yunche168.com/baidu.php', //仅为示例，非真实的接口地址
                //     filePath: res.tempImagePath,
                //     name: 'file',
                //     header: { "Content-Type": "multipart/form-data" },
                //     success: function(res){
                //         var data = res.data
                //         console.log(data);
                //
                //         var data = JSON.parse(data);
                //         console.log(data.result);
                //         var  result = data.result;
                //         var item = result[0];
                //         console.log(item);
                //         console.log(item.keyword);
                //         self.setData({
                //             laji: item.keyword
                //         })
                //
                //     }
                // })
                //  wx.getFileSystemManager().readFile({
                //     'filePath':res.tempImagePath,
                //     'encoding':'base64',
                //      success: re => {
                //          //返回临时文件路径
                //          console.log('----');
                //
                //          wx.uploadFile({
                //              rl: 'http://www.yunche168.com/baidu.php', //仅为示例，非真实的接口地址
                //              filePath: res.tempImagePath,
                //              name: 'file',
                //              header: { "Content-Type": "multipart/form-data" },
                //              success: function(res){
                //                  var data = res.data
                //                  console.log(data);
                //              }
                //          })
                //
                //
                //          // wx.request({
                //          //     url: 'https://dtplus-cn-shanghai.data.aliyuncs.com/image/tag',
                //          //     method: 'POST',
                //          //
                //          //     header: {
                //          //         'content-type': 'application/json' // 默认值
                //          //     },
                //          //     //{"image_url":"http://www.yunche168.com/frontend/web/images/shubiao.jpg","type":1}
                //          //     data: {
                //          //         "type":1,
                //          //         "content":re.data,
                //          //     },
                //          //     success (res) {
                //          //         console.log(res)
                //          //     }
                //          // })
                //      },
                // });

                console.log('----');


            }
        })
    },
    error(e) {
        console.log(e)
    },

})

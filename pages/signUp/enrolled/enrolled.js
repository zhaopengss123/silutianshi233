const app = getApp();
const Http = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData() {
    Http.post('/Home/Silu/mytype', {
      token: app.globalConfig.token
    }).then(res => {
      wx.hideLoading();
      this.setData({
        memberDetail: res.data[0]
      })
    }, _ => {
      wx.hideLoading();
    });
  }
  
})
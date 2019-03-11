const app = getApp();
const Http = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    Http.post('/Home/Silu/mycollect', {
      token: app.globalConfig.token,
    }).then(res => {
      wx.hideLoading();
      that.setData({
        swiperArray: res.data
      })
    }, _ => {
      wx.hideLoading();
    });
  },
  toIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})
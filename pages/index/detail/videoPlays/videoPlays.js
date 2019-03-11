const app = getApp();
const Http = require('../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heart:false,
    shares:false,
    fabulous:false,
    vid:null,
    videoDetail:{},
    likeDetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id);
    this.setData({ vid:options.id })
    this.getLike();
  },
  getData(id){
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    Http.post('/Home/Silu/detail', {
      vid: id,
      token: app.globalConfig.token
    }).then(res => {
      wx.hideLoading();
      if (res.code == 200) {
        that.setData({
          videoDetail:res.data
        })
        
      }
    }, _ => {
      wx.hideLoading();
    });
  },
  /********收藏************/
  clickHeart(){
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    Http.post('/Home/Silu/tocollect', {
      vid: that.data.vid,
      token: app.globalConfig.token
    }).then(res => {
      wx.hideLoading();
      
        let ss = that.data.videoDetail;
       ss.num =  ss.snum ? ss.snum + 1 : 1;

          that.setData({
            heart: true,
            videoDetail: ss
          })
        console.log(that.data.videoDetail);
          wx.showToast({
            title: '收藏成功！',
          })
      
    }, _ => {
      wx.hideLoading();
      }); 
  },
  /********投票************/
  clickFabulous() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    Http.post('/Home/Silu/tozan', {
      vid: that.data.vid,
      token: app.globalConfig.token
    }).then(res => {
      wx.hideLoading();
      if (res.code == 200) {
        that.setData({
          fabulous: true
        })
        wx.showToast({
          title: '投票成功！',
        })
      }
    }, _ => {
      wx.hideLoading();
    }); 
  },
   /********获取猜你喜欢***********/
  getLike() {
    let that = this;
    Http.post('/Home/Silu/myfavo', {
      vid: that.data.vid,
    }).then(res => {
      wx.hideLoading();
      if (res.code == 200) {
          that.setData({
            likeDetail:res.data
          })
      }
    }, _ => {
      wx.hideLoading();
    });
  },
  onShareAppMessage: function () {
      return {
        title: '分享给好友~',
        path: `/pages/index/detail/videoPlay/videoPlay?id=${this.data.vid}`,
        imageUrl: this.data.videoDetail.pic
      }
   
  },


})
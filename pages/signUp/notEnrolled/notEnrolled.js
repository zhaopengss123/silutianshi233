const app = getApp();
const Http = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday:'',
    sexIndex:0,
    sex:'男',
    sexArray:['男','女'],
    provinceList:[],
    provinceIndex:null,
    provinceid : null,
    cityList:[],
    cityIndex:null,
    areaIndex:0,
    areaList:[],
    areaid:null,
    cityid:null,
    jigouList:[],
    jigouId:null,
    jigouIndex:0,
    name:'',
    parents:'',
    pphone:'',
    typeList:[],
    typeInde:0,
    jigou:null,
    areaid:null
  },

  onLoad: function (options) {
    this.getProvince();
    this.getJigou();
    this.getkind();
  },
  //获取省
  getProvince() {
    Http.post('/Home/Silu/sheng', {
    }).then(res => {
      wx.hideLoading();
      this.setData({
        provinceList: res.data
      })
    }, _ => {
      wx.hideLoading();
    });
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },
  parentsInput(e){
    this.setData({
      parents: e.detail.value
    });
  },
  pphoneInput(e) {
    this.setData({
      pphone: e.detail.value
    });
  },
  getkind(){
    let that = this;
    Http.post('/Home/Silu/kind', {
    }).then(res => {
      wx.hideLoading();
      that.setData({
        typeList :res.data
      })
    }, _ => {
      wx.hideLoading();
    });
  },
  typeChange(e){
    this.setData({
      typeIndex: e.detail.value,
      type: this.data.typeList[e.detail.value].id
    })
    console.log(this.data.type);
  },
  submits() {
    let that = this;
    let isMobile = /^1[3|4|5|6|7|8][0-9]\d{4,8}$/;
    if (isMobile.test(this.data.pphone) && this.data.pphone.length == 11) {
      if (!that.data.name){
        wx.showToast({
          icon: "none",
          title: '请输入参赛者姓名',
        })
        return false;
      }
      if (!that.data.birthday) {
        wx.showToast({
          icon: "none",
          title: '请输入参赛者年龄',
        })
        return false;
      }  
      if (!that.data.parents) {
        wx.showToast({
          icon: "none",
          title: '请输入监护人姓名',
        })
        return false;
      }    
      if (!that.data.type) {
        wx.showToast({
          icon: "none",
          title: '请选择报名类目',
        })
        return false;
      }    
      if (!that.data.provinceid) {
        wx.showToast({
          icon: "none",
          title: '请选择省',
        })
        return false;
      }   
      if (!that.data.areaid) {
        wx.showToast({
          icon: "none",
          title: '请选择区',
        })
        return false;
      }                        
    } else {
      wx.showToast({
        icon: "none",
        title: '请输入正确手机号',
      })
      return false;
    }
    Http.post('/Home/Silu/myinfo', {
      name: that.data.name,
      birthday: that.data.birthday,
      sex: that.data.sex,
      parents: that.data.parents,
      pphone: that.data.pphone,
      type: that.data.type,
      area: that.data.areaid,
      Provinceid: that.data.provinceid,
      jigou: that.data.name,
      token: app.globalConfig.token
    }).then(res => {
      wx.hideLoading();
      if(res.code == 200){
       wx.showToast({
         title: '报名成功！',
       })
       setTimeout(function(){
         wx.switchTab({
           url: '/pages/user/user',
         })
       },1500);

      }
    }, _ => {
      wx.hideLoading();
    });
  },
// 获取机构
getJigou(){
  let that = this;
  Http.post('/Home/Silu/jigou', {
  }).then(res => {
    wx.hideLoading();
    that.setData({
      jigouList: res.data
    })
  }, _ => {
    wx.hideLoading();
  });
},

  provinceChange(e){
      this.setData({
        provinceIndex: e.detail.value,
        provinceid: this.data.provinceList[e.detail.value].provinceid
      })
      
      this.getCity();
  },

  cityChange(e){
    this.setData({
      cityIndex: e.detail.value,
      cityid: this.data.cityList[e.detail.value].cityid
    })
    this.getArea();
  },
  getArea(){
    let that = this;
    Http.post('/Home/Silu/qu', {
      cityid: this.data.cityid
    }).then(res => {
      wx.hideLoading();
      that.setData({
        areaList: res.data,
        areaIndex: null
      })
    }, _ => {
      wx.hideLoading();
    });
  },

  getCity(){
    let that = this;
    Http.post('/Home/Silu/shi', {
      provinceid: this.data.provinceid
    }).then(res => {
      wx.hideLoading();
      that.setData({
        cityList: res.data,
        cityIndex: null
      })
    }, _ => {
      wx.hideLoading();
    });
  },
  areaChange(e){
    this.setData({
      areaIndex: e.detail.value,
      areaid: this.data.areaList[e.detail.value].id
    })

  },
  jigouChange(e) {
    this.setData({
      jigouIndex: e.detail.value,
      jigou: this.data.jigouList[e.detail.value].cityid
    })
  },
  //选择生日
  birthdayChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  // 选择性别
  sexChange(e) {
    this.setData({
      sexIndex: Number(e.detail.value),
      sex: this.data.sexArray[this.data.sexIndex]
    })
    
  },
})
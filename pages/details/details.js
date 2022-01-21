const { envList } = require('../../envList.js');
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    list: [
      {
        id: 0,
        name : "数据结构",
        introduce: "这是一门很难的课",
        src: '../../image/000.jpg',      
        showModalStatus: false,
        catalog: [
          { section: "第一章" },
          { section: "第二章" },
        ]
      },
    ]
  },

  /**
   * 自己添加的 powerDrawer
   */
  powerDrawer: function (e) {
    console.log("clicked");

    var currentStatu = e.currentTarget.dataset.statu;
    var index = e.currentTarget.id;

    // 关闭
    if (currentStatu == 'close') {
      this.data.list[index].showModalStatus = false;
      this.setData({
        showModalStatus: false,
        list: this.data.list,
      });
    }

    // 显示
    if (currentStatu == 'open') {
      this.data.list[index].showModalStatus = true;
      this.setData({
        showModalStatus: true,
        list: this.data.list,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  
})

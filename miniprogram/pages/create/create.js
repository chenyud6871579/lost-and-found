// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src1: "../../images/find_something.png",
    img_src2: "../../images/lost_something.png",
    style: 'width: 350rpx; height: 350rpx;'
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

  find_create: function () {
      wx.navigateTo({
        url: 'find_create/find_create',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },

    lost_create: function () {
      wx.navigateTo({
        url: 'lost_create/lost_create',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },

})
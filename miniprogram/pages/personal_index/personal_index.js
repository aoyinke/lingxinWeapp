// miniprogram/pages/personal_index/personal_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 更换头像
   */
  changeImage: function (e) {
    //第一种方式，只能跳转到tarBar页面
    wx.switchTab({
      url: '/pages/personal/personal',
    })
    //第二种方式：可以跳转到tabBar或者非tabBar页面
    wx.reLaunch({
      url: '/pages/personal/personal',
    })
  },

  /**
   * 跳转到修改资料页面
   */
  changeToDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
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

  }
})
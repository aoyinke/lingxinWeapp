// miniprogram/pages/show_listenInfo/show_listenInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight:"400",
    imgUrls: [
 
    ],
    swiperIndex: 0 //这里不写第一次启动展示的时候会有问题
  },
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let tempFilePaths = options.tempFilePaths.split(',')

    that.setData({
      imgUrls: tempFilePaths,
      mainContent: options.mainContent
    })

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
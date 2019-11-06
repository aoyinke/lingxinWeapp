// miniprogram/pages/tuanwu/tuanwu.js
const db = wx.cloud.database();
const MAX_LIMIT = 4

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 50,
    imgUrls: [
      '/images/m1.jpg',
      '/images/star.jpg',
      '/images/timg.jpg'
    ],
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    animationRotate: {},
    item: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  
  onLoad: function (options) {
    db.collection('messages').get().then(res => {
      console.log("获取数据成功")
      this.setData({
        messages: res.data
      })
      for (var i in this.data.messages) {
        console.log(this.data.messages[i])
      }
      console.log(this.data.messages)
    }).catch(err => {
      console.error(err)
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
const app = getApp();
Page({
  credit:function(){
    wx.request({
      url: 'http://127.0.0.1:3000/credit',
      data:{token:app.globalData.token},
      success:res =>{
        console.log(res.data)
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    active: '',
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
  },
    constellation:'',
    qqNumber:'',
    phoneNumber:''
  },
  changeToDetail:function(e){
    const index = e.currentTarget.dataset.index
    this.setData({
      active:index
    })
    console.log(this.data.active)
    wx.navigateTo({
      url: '/pages/personal_index/personal_index',
      success: function(res) {
        wx.showToast({
          title: '跳转到了个人中心~',
          icon:'success'
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  info:function(e){
    //第一种方式：保留当前页面，单机页面左上角箭头，返回上一个页面
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
    //第二种方式：关闭当前页，左上角没有返回箭头，不能返回上一个页面
    wx.redirectTo({
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
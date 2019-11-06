// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'女',
    username:"小海狮",
    imgUrl:"/images/avatar.jpg",  //初始化头像图片
    phoneNumber:'',
  },
  /**
   * 选择头像：从本地相册选择图片或使用相机拍照wx.chooseImage
   * 
   */
  changeAvatar:function(e){
    var that =this;
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],

      success: function(res) {
        //tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
         console.log(tempFilePaths)
        that.setData({
          imgUrl:tempFilePaths[0]
        })
      },
    })
  },

  /**
   * 跳转到修改资料
   */

  jump:function(){
    wx.navigateTo({
      url: '/pages/modify/modify?username=' + encodeURIComponent(this.data.username) + '&gender=' + encodeURIComponent(this.data.gender),
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
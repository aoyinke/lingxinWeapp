// miniprogram/pages/answer/answer.js
const db = wx.cloud.database()
var myDate = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problem:'',
    type:'',
    problemId:'',
    answerQuestion:'',
    time: myDate.toLocaleString()

  },
  answerQuestion:function(e){
    this.setData({
      answerQuestion:e.detail
    })
    
  },

  submit:function(){
    db.collection('answerQuestion').add({
      data:{
        type:this.data.type,
        answerQuestion:this.data.answerQuestion,
        problemId:this.data.problemId,
        time:this.data.time
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:1000
    })
    this.setData({
      problem:options.problem,
      type: options.problemtype

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
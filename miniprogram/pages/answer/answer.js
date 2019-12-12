// miniprogram/pages/answer/answer.js
const db = wx.cloud.database()
var myDate = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    problem:'',
    type:'',
    problemId:'',
    answerQuestion:'',
    time: myDate.toLocaleDateString() + myDate.toLocaleTimeString(), //获取当前时间
    tempFilePaths:[]

  },
  /**
   * 上传图片
   */
  uploadImg:function(e){
    var that = this;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
          that.setData({
            tempFilePaths: tempFilePaths
          })
        
      }
    })
  },
  answerQuestion:function(e){
    this.setData({
      answerQuestion:e.detail.value
    })
    
  },
  getOpenid:function(e){
    var that = this
    wx.cloud.callFunction({
      name:"login",
      data:{},
      success:res=>{
        that.setData({
          openid: res.result.openid
        })
        wx.getUserInfo({
          success:res=>{
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            console.log(nickName)
            console.log(avatarUrl)
          }
        })
        
      },
      fali:err=>{
        console.error(err)
      }
    })
  },
  submit:function(){
    
    if (this.data.answerQuestion && this.data.tempFilePaths[0]){
      db.collection('answerQuestion').add({
        data: {
          type: this.data.type,
          answerQuestion: this.data.answerQuestion,
          problemId: this.data.problemId,
          time: this.data.time,
          openid:this.data.openid,
          tempFilePaths: this.data.tempFilePaths
        }
      })
      wx.navigateTo({
        url: `../answer_show/answer_show?problemId=${this.data.problemId}`,
        success:res=>{
          wx.showToast({
            title: '跳转到问题展示界面~',
            icon:"success"
          })
        }
      })
      
    }else{
      wx.showToast({
        title: '回答的问题不能为空~',
        icon:'none'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:1000
    })
    this.setData({
      problem:options.problem,
      type: options.problemtype,
      problemId:options.problemId

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
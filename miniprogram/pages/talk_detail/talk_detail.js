// miniprogram/pages/talk_deatail/talk_deatail.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useropenid: "",
    tempFilePaths: [],
    mainContent: "",
    value: "",
    _id:""
  },

  /**
   * 处理用户输入内容
   */
  handleInput: function (e) {
    let mainContent = e.detail.value
    this.setData({
      mainContent: mainContent
    })
  },
  /**
   * 上传照片
   */
  submitImg: function (e) {
    var that = this
    var timestamp = Date.parse(new Date());
    

    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: tempFilePaths
        })
        for (var i in tempFilePaths){
          var filePath = tempFilePaths[i]
          var cloudPath = 'tree_hole/' + timestamp + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
             console.log(res)
            }
          })
        }
      }
    })
  },
  /**
   * 提交数据
   */
  submit: function (e) {
    var that = this
    let tempFilePaths = that.data.tempFilePaths
    let useropenid = that.data.useropenid
    let mainContent = that.data.mainContent
    console.log(mainContent)
    if (mainContent) {
      db.collection('listeningInfo').add({
        data: {
          mainContent: mainContent,
          useropenid: useropenid,
          tempFilePaths: tempFilePaths
        }
      }).then(res => {
        db.collection('user').doc(that.data._id).update({
          data:{
            credit:_.inc(5)
          },
          success:(res)=>{
            wx.showModal({
              title: '成功扔进了树洞~',
              content: '奖励你5新宝哦~',
              showCancel: false,//是否显示取消按钮
              cancelText: "否",//默认是“取消”
              cancelColor: 'skyblue',//取消文字的颜色
              confirmText: "笑纳了",//默认是“确定”
              confirmColor: 'skyblue',//确定文字的颜色
            })
            that.setData({
              tempFilePaths: [],
              value: ""
            })
          }
        })
        
      })

    } else {
      wx.showToast({
        title: '没有填写内容哦~',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      useropenid: options.useropenid
    })
    db.collection('user').where({
      _openid: options.useropenid
    }).get().then(res=>{
      that.setData({
        _id:res.data[0]._id
      })
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
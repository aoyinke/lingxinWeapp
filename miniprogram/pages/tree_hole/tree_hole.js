// miniprogram/pages/tree_hole/tree_hole.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit: "",
    isListening: false,
    show: false,
    index: 0,
    currentIndex: 0,
    userInfo: [],
    listeningInfo: [],
    listeningInfo_self: [],
    _id:""

  },
  /**
   * 处理聆听的选择
   */

  onClose() {
    this.setData({ show: false });
  },
  /**
   * 聆听自己的树洞
   */
  listenToSelf: function (e) {
    wx.showModal({
      title: '是否聆听自己的树洞',
      content: '花费5新宝就可以啦~',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: (res) => {
        console.log(this.data.credit)
        if (res.cancel) {

        } else if(this.data.credit>=5){
          var that = this
          console.log(that.data._id)
          db.collection('user').doc(that.data._id).update({
            data: {
              // 表示指示数据库将字段自增 -5
              credit: _.inc(-5)
            },
            success:function(e){
              wx.showToast({
                title: '成功扣除5新宝~',
                icon:"none"
              })
            }
          })
 
          let listeningInfo_self = that.data.listeningInfo_self
          let listeningInfo_self_num = Math.floor(Math.random() * listeningInfo_self.length)
          let listeningInfo_self_single = listeningInfo_self[listeningInfo_self_num]
          console.log(listeningInfo_self_single)
          let mainContent = listeningInfo_self_single.mainContent
          let tempFilePaths = listeningInfo_self_single.tempFilePaths
          wx.navigateTo({
            url: `../show_listenInfo/show_listenInfo?tempFilePaths=${tempFilePaths}&mainContent=${mainContent}`,
          })
        }else{
          wx.showToast({
            title: '新宝不足~',
            icon:"none"
          })
        }

      }
    })


  },
  /**
   * 处理聆听他人的树洞
   */
  listenToOthers: function (e) {
    wx.showModal({
      title: '是否聆听他人的树洞',
      content: '花费5新宝就可以啦~',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: (res) => {
        console.log(this.data.credit)
        if (res.cancel) {

        } else if (this.data.credit >= 5) {
          var that = this
          console.log(that.data._id)
          db.collection('user').doc(that.data._id).update({
            data: {
              // 表示指示数据库将字段自增 -5
              credit: _.inc(-5)
            },
            success: function (e) {
              wx.showToast({
                title: '成功扣除5新宝~',
                icon: "none"
              })
            }
          })

          let listeningInfo_others = that.data.listeningInfo
          let listeningInfo_others_num = Math.floor(Math.random() * listeningInfo_others.length)
          let listeningInfo_others_single = listeningInfo_others[listeningInfo_others_num]
          console.log(listeningInfo_others)
          let mainContent = listeningInfo_others_single.mainContent
          let tempFilePaths = listeningInfo_others_single.tempFilePaths
          wx.navigateTo({
            url: `../show_listenInfo/show_listenInfo?tempFilePaths=${tempFilePaths}&mainContent=${mainContent}`,
          })
        } else {
          wx.showToast({
            title: '新宝不足~',
            icon: "none"
          })
        }

      }
    })
    
  },
  /**
   * 处理聆听
   */
  startToListen: function (e) {
    var that = this
    that.setData({
      isListening: true,
      show: true
    })
  },
  /**
   * 处理轮播页面的同步
   */
  handleSwiperChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  /**
   * 处理页面之间的转换
   */
  handlePage: function (e) {
    var that = this
    that.setData({
      index: e.currentTarget.dataset.index
    })

  },
  /**
   * 处理开始倾诉
   */
  startTalk: function (e) {
    var that = this
    let useropenid = e.currentTarget.dataset.useropenid
    wx.navigateTo({
      url: `../talk_detail/talk_detail?useropenid=${useropenid}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 处理用户列表的切换
   */
  changeHoleList: function (e) {
    var that = this
    let userNum = that.data.userNum
    let randomNum = Math.random() * 10
    if (userNum > 9) {
      that.setData({
        userInfo: that.data.userInfo.slice(randomNum, randomNum + 9)
      })
    } else {
      wx.showToast({
        title: '没有更多的树洞了~',
        icon: "none"
      })
    }
  },

  /**
   * 处理页面之间的转换
   */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('listeningInfo').get().then(res => {
      that.setData({
        listeningInfo: res.data
      })
    })
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      let userId = res.result.openid
      db.collection('listeningInfo').where({
        useropenid: userId
      }).get().then(res => {
        that.setData({
          listeningInfo_self: res.data
        })

      })
      db.collection('user').where({
        _openid: userId
      }).get().then(res=>{
        that.setData({
          credit:res.data[0].credit,
          _id:res.data[0]._id
        })
      })
    })

    db.collection('user').get().then(res => {
      that.setData({
        userInfo: res.data,
        userNum: res.data.length,


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
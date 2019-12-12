// miniprogram/pages/learning/learning.js
var app = getApp();//取得全局App({..})实例

const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learning_resources: [],
    showPhoto: true,
    showLink: false,
    openid: "",
    dataId: "",
    item: 0,
    credit: "",
    learning_English:"",
    learning_movie:"",
    learning_cailiao:""
  },

  changeItem: function (e) {
    this.setData({
      item: e.currentTarget.dataset.item
    })
  },
  handleChange: function (e) {
    this.setData({
      item: e.detail.current
    })
  },
  /**
   * 处理获取资源积分
   */
  handleClick: function (e) {
    var that = this
    var link = e.currentTarget.dataset.link
    db.collection('user').where({
      _openid: that.data.openid
    }).get().then(res => {
      console.log(res.data)
      that.setData({
        dataId: res.data[0]._id,
        credit: res.data[0].credit
      })
      wx.showModal({
        title: '获取资源~',
        content: '请问您是否确认花费5新宝获取资源？',
        showCancel: true,//是否显示取消按钮
        cancelText: "否",//默认是“取消”
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "是",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: (res) => {
          if (res.confirm) {
            if (that.data.credit >= 5) {
              db.collection('user').doc(that.data.dataId).update({
                data: {
                  credit: _.inc(-5)
                }
              }).then(res => {
                wx.setClipboardData({
                  data: link,
                  success(res) {
                    wx.getClipboardData({
                      success(res) {
                        wx.showToast({
                          title: '已复制百度网盘链接',
                          icon: "none",
                          duration: 2000
                        })
                      }
                    })
                  }
                })
              })
            } else {
              wx.showToast({
                title: '新宝不足~',
              })
            }
          }


        }
      })


    })

  },
  /**
   * 处理获取资源积分
   */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      that.setData({
        openid: res.result.openid
      })
    })
    db.collection('learning_resources').where({
      type: "test_paper"
    }).get().then(res => {
      this.setData({
        learning_resources: res.data
      })
    })

    db.collection('learning_resources').where({
      type: "English"
    }).get().then(res => {
      this.setData({
        learning_English: res.data
      })
      console.log(that.data.learning_English)
    })
    /**推荐电影 */
    db.collection('learning_resources').where({
      type: "movie"
    }).get().then(res => {
      this.setData({
        learning_movie: res.data
      })
    })

    /**最新材料 */
    db.collection('learning_resources').where({
      type: "cailiao"
    }).get().then(res => {
      this.setData({
        learning_cailiao: res.data
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);

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
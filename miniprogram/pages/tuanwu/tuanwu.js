// miniprogram/pages/tuanwu/tuanwu.js
const db = wx.cloud.database();
const MAX_LIMIT = 4

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "",
    userAuth: "",
    show: true,
    managers: [],
    isUser: true,
    openid: "",
    statusBarHeight: 50,
    imgUrls: [
      '/images/m1.jpg',
      '/images/m2.jpg',
      '/images/m3.jpg'
    ],
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    animationRotate: {},
    item: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleAuthoration: function (e) {
    this.setData({
      show: false
    })

  },
  /**
   * 跳转到风采展示界面
   */
  naviToActivity:function(e){
    wx.switchTab({
      url: '../activity_show/activity_show',
      success:(res)=>{
        wx.showLoading({
          title: '正在跳转',
          duration:2000,
          success:(res)=>{
            wx.showToast({
              title: '跳转成功',
            })
          }
        })
      }
    })
  },
  /**
   * 展示授权弹窗
   */
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  onLoad: async function (options) {
    var that = this
    that.checkIfGetSetting()
    await wx.cloud.callFunction({
      name: "login",
      data: {},
      success: res => {
        let openid = res.result.openid
        db.collection('user').where({
          _openid: openid
        }).get().then(res => {
          console.log(res.data[0])
          if (res.data[0] === undefined) {
            let isUser = false
            if (that.data.userAuth) {
              if (!isUser && that.data.show) {
                wx.showModal({
                  title: '欢迎使用领新~',
                  content: '首次登录~赠送您100新宝',
                  showCancel: false
                })
                db.collection('user').add({
                  data: {
                    avatarUrl: that.data.avatarUrl,
                    nickName: that.data.nickName,
                    credit: 100,
                    anonyAvatarUrl:"",
                    anonyNickName:""
                  }
                })


              } else {
                console.log("已经存在该用户")
              }
            }
          }else{
            that.setData({
              show:false
            })
          }

        })
      }
    })

    // 查看是否授权


  
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

  },

  /**
     * 验证用户权限是否获取
     */
  checkIfGetSetting: function (e) {
    var that = this
    wx.getSetting({
      success(res) {

        let userAuth = res.authSetting['scope.userInfo']

        if (userAuth) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName,
                userAuth: userAuth
              })
              console.log(res.userInfo)
            }
          })
        } else {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
            }
          })
        }

        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
    if (that.data.userAuth) {
      that.setData({
        show: false
      })
    }
  },

})


  
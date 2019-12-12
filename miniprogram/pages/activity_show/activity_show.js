// miniprogram/pages/activity_show/activity_show.js
wx.cloud.init()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memory: [
    'https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/%E7%AC%AC%E4%B8%80%E6%AC%A1%E4%BE%8B%E4%BC%9A%20(4).jpg?sign=308ae0c0dfea769ac16ea2a82c9e8185&t=1573888471',
    'https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/%E7%AC%AC%E4%B8%80%E6%AC%A1%E4%BE%8B%E4%BC%9A%20(4).jpg?sign=42784eb8244d5b948e8ed925c4d00a12&t=1573888478',
    'https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/10.22%20(4).jpg?sign=3eba253e8f36e6f0ddf7123ee04ed8ac&t=1573888489'],
    openid: "",
    studentId: "",
    singal: false,
    totalNum: "",
    yibaoming: "",
    form_info: "",
    showImg: "",
    imgUrls: [
      '/images/m1.jpg',
      '/images/m2.jpg',
      '/images/m3.jpg'
    ],
    huiyi: [
      'https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/%E7%AC%AC%E4%B8%80%E6%AC%A1%E4%BE%8B%E4%BC%9A%20(7).jpg?sign=b298eacbdf28cc9aebd94c88c0de6a81&t=1573871128',
      'https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/%E7%AC%AC%E4%B8%80%E6%AC%A1%E4%BE%8B%E4%BC%9A%20(2).jpg?sign=670ecc2c6638d03399df6c5cb1b25d9b&t=1573871173',
      'https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/10.22%20(6).jpg?sign=ac927f7a8c33b9f0773ddce92e785eed&t=1573871182',
      'https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/10.22%20(1).jpg?sign=4abed436fea80fb46bbc76da10fd4254&t=1573871192'
    ],
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    animationRotate: {},
    item: 0,
    teacherInfo: []
  },
  /**
   * 处理轮播图同步的问题
   */
  handleChange:function(e){
    this.setData({
      item:e.detail.current
    })
  },
  /**
   * 跳转到课程报名界面
   */
  handleRegister: function(e) {
    var that = this
    const lessonId = e.currentTarget.dataset.lessonid
    db.collection('students').where({
      _openid: this.data.openid
    }).get().then(res => {
      if (res.data[0]) {
        wx.showToast({
          title: '您已经报过名了~',
          icon: "none"
        })
      }else if (this.data.yibaoming <= this.data.totalNum) {
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            db.collection('students').add({
              data: {
                nickName: nickName,
                avatarUrl: avatarUrl,
                gender: gender,
                lessonId: lessonId
              }
            }).then(res => {
              console.log(res.data)
              that.setData({
                studentId: res._id,
                openid: res._openid
              })
              console.log(that.data.openid)
              const _ = db.command
              wx.showToast({
                title: '报名成功',
                duration: 2000
              })

              db.collection('teacher').doc(lessonId).update({
                data: {
                  yibaoming: _.inc(1)
                }

              }).then(res => {
                console.log(res.data)
                that.onLoad()
              })
            })
          }
        })
      }else {
      wx.showToast({
        title: '人数已经满了~',
        icon: "none"
      })
    }
    })
  },
  /**
   * 取消报名
   */
  handCancel: function(e) {
    var that = this
    const _ = db.command
    const lessonId = e.currentTarget.dataset.lessonid
    console.log(that.data.studentId)
    try{
      db.collection('students').doc(that.data.studentId).remove().then(res => {
        db.collection('teacher').doc(lessonId).update({
          data: {
            yibaoming: _.inc(-1)
          }

        }).then(res => {
          wx.showToast({
            title: '取消报名成功',
            icon: "none"
          })
          that.onLoad()
        })
      })
    }catch(e){
      wx.showToast({
        title: '您还未报名课程',
        icon:"none"
      })
    }
    
    
  },
  /**
   * 取消报名
   */

  /**
   * 跳转到课程报名界面
   */
  /**
   * 获取输入框的信息
   */
  introduction: function(e) {
    this.setData({
      selfIntro: e.detail.value
    })
  },
  /**
   * 获取输入框的信息
   */
  /**
   * 表单上传登录信息
   */
  formSubmit: function(e) {
    const outperform = e.detail.value.outperform
    const stuid = e.detail.value.stuid
    const classInfo = e.detail.value.classInfo
    const selfIntro = this.data.selfIntro
    if (outperform && stuid && classInfo && selfIntro && this.data.showImg) {
      db.collection('submitTeacher').add({
        data: {
          outperform: outperform,
          stuid: stuid,
          classInfo: classInfo,
          selfIntro: selfIntro,
          showImg: this.data.showImg

        }
      }).then(res => {
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          form_info: "",
          showImg: ""
        })
      })
    } else {
      wx.showToast({
        title: '您有信息还没填~',
        icon: "none"
      })
    }

  },
  /**
   * 上传个人照片
   */
  uploadImg: function(e) {
    const that = this;
    wx.chooseImage({
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          showImg: tempFilePaths[0]
        })
      },
    })
  },
  changeItem: function(e) {
    this.setData({
      item: e.currentTarget.dataset.item
    })
  },
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      this.setData({
        openid: res.result.openid
      })
      db.collection('students').where({
        _openid: res.result.openid,
        success: function(res) {
          /*console.log(res.data)*/
        }
      })
    })
    db.collection("teacher").get()
      .then(async res => {
        await this.setData({
          teacherInfo: res.data
        })
        for (var i in res.data) {
          this.setData({
            yibaoming: res.data[i].yibaoming,
            totalNum: res.data[i].totalNum,
          })
        }
        if (this.data.yibaoming == this.data.totalNum) {
          this.setData({
            singal: true
          })
        } else {
          this.setData({
            singal: false
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
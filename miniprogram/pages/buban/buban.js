// miniprogram/pages/buban/buban.js
const db = wx.cloud.database();  //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form_info: "",
    images: [], //上传的图片
    classInfo: '',
    name: '',
    phoneNumber: '',
    studentId: '',
    fileIds: [],
    reasons: ""
  },
  /**
   * 
   */

  /**
   * 生命周期函数--监听页面加载
   */
  losingReason: function (e) {
    this.setData({
      reasons: e.detail.value
    })
  },
  formsubmit: function (e) {
    console.log(e.detail.formId)
    wx.showLoading({
      title: '信息提交中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    const classInfo = e.detail.value.classInfo
    const stuName = e.detail.value.stuName
    const contact = e.detail.value.contact
    const weixin = e.detail.value.weixin
    const reasons = this.data.reasons

    if (classInfo && stuName && contact && weixin && reasons) {
      wx.login({
        success: res => {
          const formId = e.detail.formId

          server.post({ formId, code: res.code }, () => {
            wx.showToast({
              title: '提交成功',
              icon: "success",
              duration: 1500
            })
            setTimeout(()=>{
              server.sendTemplateMessage(res => {
                console.log("模板消息发送结果：", res.data)
              })
            },3000)
            


          })
        }
      })
      db.collection('buban').add({
        data: {
          classInfo: classInfo,
          name: stuName,
          phoneNumber: contact,
          studentId: weixin,
          reasons: reasons

        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          form_info: ''
        })
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
        })
        consoloe.error(err);
      })
    } else {
      wx.showToast({
        title: '您提交的信息不全~',
        icon: "none",
        duration: 3000
      })
    }
    //上传图片到云存储
    let promiseArr = [];
    for (let i = 0; i < this.data.images.length; i++) {
      promiseArr.push(new Promise((resolve, reject) => {
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0]; //正则表达式，返回文件扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,//上传至云端的路径
          filePath: item,  //小程序临时文件路径
          success: res => {
            //返回文件ID
            console.log(res.fileID)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            });
            resolve();
          },
          fail: console.error
        })
      }))
    }
    Promise.all(promiseArr).then(res => {
      //插入数据

    });

  },

  uploadImage: function () {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })
  },


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

var server = {
  appid: "wx9a27842ce15e1186",
  secret: "1025e7f28a169f86015e624bec8d259d",
  user: { opeid: "", formId: "" },
  post: function (data, success) {
    console.log("收到客户端提交的数据：", data)
    this.user.formId = data.formId
    this.getOpenid(data, res => {
      console.log('用户openid:' + res.data.opeid)
      this.user.openid = res.data.openid
      success()
    })
  },
  getOpenid: function (code, success) {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {
        appid: this.appid,
        secret: this.secret,
        grant_type: 'authorization_code',
        js_code: code
      },
      success: success
    })
  },
  sendTemplateMessage: function (success) {
    var user = this.user
    var data = {
      touser: "o2DJt5eZ5NTnXO2cy8RiXWzqS2RY",
      template_id: "D1so6RZ-n_DWnzfUJt24hBlJk0pt9DwMmG-7k457gLo",
      page: "tuanwu",
      form_id: user.formId,
      data: {
        keyword1: { value: "领新团总支" }
      }
    }
    this.getAccessToken(res => {
      var token = res.data.access_token
      console.log("服务器access_token:" + token)
      var url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token
      wx.request({
        url: url,
        method: 'post',
        data: data,
        success: success
      })
    })
  },
  getAccessToken: function (success) {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + this.appid + '&secret=' + this.secret
    wx.request({
      url: url,
      success: success
    })
  }
}
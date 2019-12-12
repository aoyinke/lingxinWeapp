//app.js
wx.cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: wx.cloud.DYNAMIC_CURRENT_ENV
})
const db = wx.cloud.database()
const TOKEN = 'token'
const app = getApp()
App({
  globalData:{
    credit: ""
  },
  /**
   * 处理用户积分
   */
  handleCredit:function(res){
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      let openId = res.result.openid
      // console.log(openId)
      db.collection("user").where({
        _openid: openId
      }).get().then(res => {
        // console.log(res.data[0].credit)
        return res.data[0].credit
      })
    })
  },
  /**
   * 处理用户积分
   */
  onLaunch: function (query) {
      var that = this
      let result  = that.handleCredit()
      console.log(result)

    }
    


})
  

  

//app.js
const TOKEN = 'token'
const app = getApp()
App({
  
  onLaunch: function (query) {
    //先从缓存中取出token
    const token = wx.getStorage({
      key: TOKEN,
    })
    //判断token是否为空
    if(token && token.length !==0){
      //验证token是否过期
      this.check_token(token)
    }else{
      this.login()
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    
    this.globalData = {}
  },
  check_token(token){
    wx.request({
      url: '',
      method:'post',
      header:{
        token
      },
      success:res =>{
        console.log(res)
      },
      fail:err =>{
        console.error(err)
      }
    })
  },
  login: function () {
    wx.login({
      success: res => {
        //code只有5分钟的有效期
        console.log('login code:' + res.code)
        //向自己的服务器发送请求
        wx.request({
          url: 'http://127.0.0.1:3000/login',
          method: 'post',
          data: { code: res.code },
          success: res => {
            console.log('token:' + res.data.token)
            //将token保存为公共数据（用于在多页面中访问）
            this.globalData.token = res.data.token
            //将token保存到数据缓存（下次打开小程序无需重新获取token）
            wx.setStorage({
              key: TOKEN,
              data: res.data.token,
              success:function(res){
                console.log(res)
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    statusBarHeight: 0,
    titleBarHeight: 0,
    token: '' //保存token

  }

})
  

  

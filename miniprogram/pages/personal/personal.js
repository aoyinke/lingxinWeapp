const app = getApp();
wx.cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: wx.cloud.DYNAMIC_CURRENT_ENV
})
import { openAnonymous} from './anonymous.js'
const db = wx.cloud.database();
const _ = db.command
var _animation;
var _animationIndex
const _ANIMATION_TIME = 500;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: '',
    anonyAvatarUrl:"",
    anonyNickName:"",
    _id:"",
    value:"",
    advice:"",
    scroll_height: 0,
    userInfo: [],
    swiperIndex: "",
    openid: "",
    credit: "",
    fixed: false,
    active: 0,
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
    }
  },
  /**
   * 跳转到小程序使用指南
   */
  naviToIntroductor:function(e){
    wx.navigateTo({
      url: '../instructor/instructor',
    })
  },
  /**
   * 实现轮播页面的同步
   */
  handleChange:function(e){
    this.setData({
      active:e.detail.current
    })
  },
  /**
   * 开启匿名
   */
  openAnonymous:function(e){
    var that = this
    db.collection('user').doc(that.data._id).update({
      data:{
        anonyAvatarUrl:"https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/timg.jpg?sign=33a082222f0fd36543cf32d0cecd3a8e&t=1575163311",
        anonyNickName:"海事小萌新"
      },
      success:(res)=>{
        that.setData({
          anonyAvatarUrl: "https://6765-gengyc-zb5zk-1300303404.tcb.qcloud.la/timg.jpg?sign=33a082222f0fd36543cf32d0cecd3a8e&t=1575163311",
          anonyNickName: "海事小萌新"
        })
        wx.showToast({
          title: '开启了匿名',
        })
      }
    })
    
  },
  /**
   * 关闭匿名
   */
  closeAnonymous:function(e){
    var that = this
    db.collection('user').doc(that.data._id).update({
      data: {
        anonyAvatarUrl: "",
        anonyNickName: ""
      },
      success: (res) => {
        that.setData({
          anonyAvatarUrl: "",
          anonyNickName: ""
        })
        wx.showToast({
          title: '关闭了匿名',
          icon:"none"
        })
      }
    })
  },
  /**
   * 获取意见
   */
  getAdvice:function(e){
    this.setData({
      advice:e.detail.value
    })
  },
  /**
   * 处理意见反馈
   */
  handleAdvice:function(e){
    var that = this
    let advice = that.data.advice
    if(advice){
      db.collection('advice').add({
        data:{
          advice: advice
        }
      }).then(res=>{
        wx.showToast({
          title: '意见提交成功',
        })
        
        db.collection('user').doc(that.data._id).update({
          data:{
            credit:_.inc(10)
          },
          success:res=>{
            wx.showModal({
              title: '感谢提交意见',
              content: '奖励10新宝~',
              showCancel: false,//是否显示取消按钮
              cancelText: "否",//默认是“取消”
              cancelColor: 'skyblue',//取消文字的颜色
              confirmText: "是",//默认是“确定”
              confirmColor: 'skyblue',//确定文字的颜色
            })
          }
        })
      })
    }else{
      wx.showToast({
        title: '您没有提交问题哦~',
        icon:"none"
      })
    }
  },
  /**
   * 对应的swiper滑动
   */
  changeIndex: function (e) {
    this.setData({
      swiperIndex: e.currentTarget.dataset.swiperindex
    })
  },
  /**
   * 对应的swiper滑动
   */

  /**
   * 标签栏切换
   */
  onChange(event) {
    this.setData({
      active: event.detail
    })
  },
  /**
   * 标签栏切换
   */
  changeToDetail: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      active: index
    })
    console.log(this.data.active)

  },

  info: function (e) {
    //第一种方式：保留当前页面，单机页面左上角箭头，返回上一个页面
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
    //第二种方式：关闭当前页，左上角没有返回箭头，不能返回上一个页面
    wx.redirectTo({
      url: '/pages/detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var that = this;
    /**
   * 计算小程序的高度
   */
    wx.getSystemInfo({
      
      success: function(res) {
        that.setData({
          scroll_height:res.windowHeight - res.windowWidth/750*195
        })
      },
    })
    /**
     * 计算小程序的高度
     */
    await wx.cloud.callFunction({
      name: "login",
      data: {}
    }).then(res => {
      this.setData({
        openid: res.result.openid
      })
    })




    

    db.collection('user').where({
      _openid: this.data.openid
    }).get().then(res => {
      this.setData({
        userInfo: res.data,
        credit:res.data[0].credit,
        _id:res.data[0]._id,
        avatarUrl:res.data[0].avatarUrl,
        nickName:res.data[0].nickName

      })
      console.log(this.data.userInfo)
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
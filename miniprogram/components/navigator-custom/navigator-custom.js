// components/navigator-custom/navigator-custom.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'在此修改标题'
    },
    back:{
      type:Boolean,
      value:false
    },
    home:{
      type:Boolean,
      value:false
    }
  },

  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.statusBarHeight + 'px',
    navigationBarHeight:(app.statusBarHeight + 44) + 'px'
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backHome:function(){
      wx.reLaunch({
        url: '/pages/tuanwu/tuanwu',
      })
    },
    back:function(){
      wx.navigateBack({
        delta:1
      })
    }
  }
})

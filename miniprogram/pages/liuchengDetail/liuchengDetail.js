const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:'',
    content:'',
    stepID:'',
    fileContent:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      step:options.text,
      content:options.desc,
      stepID:options.dataId
    })
    this.showFileContent()
  },
  /**
   * 设置文件名称
   */
  showFileContent:function(){
    let stepID = this.data.stepID
    console.log(stepID)
    if(stepID==0){
      this.setFileName("谈话记录.docx")
    } else if (stepID == 1){
      this.setFileName("谈话记录.docx")
    } else if (stepID == 2) {
      this.setFileName("团章考试试卷及答案.doc")
    } else if (stepID == 3) {
      this.setFileName("谈话记录.docx")
    } else if (stepID == 4) {
      this.setFileName("谈话记录.docx")
    } else if (stepID == 5) {
      this.setFileName("谈话记录.docx")
    } else if (stepID == 6) {
      this.setFileName("谈话记录.docx")
    } else if (stepID == 7) {
      this.setFileName("谈话记录.docx")
    } else if (stepID == 8) {
      this.setFileName("谈话记录.docx")
    }
    
    console.log(this.data.fileContent)
  },
  setFileName:function(name){
    this.setData({
      fileContent: name
    })
  },
  /**
   * 获取入团流程文件
   */
  getFile:function(){
    let stepID = this.data.stepID
    console.log(stepID)
    db.collection('liucheng').where({
      stepID: stepID
    }).get({
      success: function (res) {
        console.log(res.data[0].fileID)
        wx.cloud.downloadFile({
          fileID: res.data[0].fileID,
          success:res=>{
            console.log(res.tempFilePath)
            wx.saveFile({
              tempFilePath: res.tempFilePath,
              success:function(res){
                const savedFilePath = res.savedFilePath;
                wx.openDocument({
                  filePath: savedFilePath,
                  success:res=>{
                    wx.showToast({
                      title: '文件下载中',
                      icon:'success',
                      duration:2000
                    })
                    console.log('打开文档成功')
                  }
                })
              },
              fail:err=>{
                console.error("保存失败：",err)
              }
            })
          },
          fail:err=>{
            console.error("下载失败:",err)
          }
        })
      }
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
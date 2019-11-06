// miniprogram/pages/buban/buban.js
const db = wx.cloud.database();  //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[], //上传的图片
    classInfo:'',
    name:'',
    phoneNumber:'',
    studentId:'',
    fileIds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  submit:function(){
    wx.showLoading({
      title: '信息提交中',
    })
    console.log(this.data.classInfo)
    console.log(this.data.name)
    console.log(this.data.phoneNumber)
    console.log(this.data.studentId)

    //上传图片到云存储
    let promiseArr = [];
    for(let i = 0;i < this.data.images.length;i++){
      promiseArr.push(new Promise((resolve,reject) =>{
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0]; //正则表达式，返回文件扩展名
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime() + suffix,//上传至云端的路径
          filePath:item,  //小程序临时文件路径
          success: res =>{
            //返回文件ID
            console.log(res.fileID)
            this.setData({
              fileIds:this.data.fileIds.concat(res.fileID)
            });
            resolve();
          },
          fail:console.error
        })
      }))
    }
    Promise.all(promiseArr).then(res =>{
      //插入数据
      db.collection('buban').add({
        data:{
          classInfo:this.data.classInfo,
          name:this.data.name,
          phoneNumber:this.data.phoneNumber,
          studentId:this.data.studentId,
          fileIds:this.data.fileIds

        }
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
        })
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
        })
        consoloe.error(err);
      })
    });
    
  },

  uploadImage:function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          images:this.data.images.concat(tempFilePaths)
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
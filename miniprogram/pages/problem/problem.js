import Toast from 'vant-weapp/toast/toast';
wx.cloud.init();
const db = wx.cloud.database();
const time = new Date();
console.log(time)
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    popShow:false,
    studentid:"",
    classinfo:'',
    username: "",
    problem:'',
    problemtype:'',
    sideBar: ['场地租借', '情感话题', '近期活动', '外联任务', '入党入团','社团活动'],
    problems:[],
    index:0,
    choice:'',
    sidebarIndex:0,
    showInput:false,
    counter:0,
    time: time.toLocaleString(), //获取当前时间
    imgUrls: [
      '/images/m1.jpg',
      '/images/star.jpg',
      '/images/timg.jpg'
    ],
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
  },

  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  /**
   * 监听普通picker选择器
   */
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },

  /**
   * 展示出问题的输入界面
   */
  showInput:function(){
    this.setData({
      counter:this.data.counter + 1
    })
    if (this.data.counter%2==0){
      this.setData({
        showInput: false
      })
    }else{
      this.setData({
        showInput: true
      })
    }
    
  },
  getChoice:function(e){

    this.setData({
      choice: this.data.sideBar[e.detail.value]
    })
  },
  
  
  getusername:function(event){
    this.setData({
      username:event.detail
    })
  },

  getclassinfo: function (event){
    this.setData({
      classinfo:event.detail
    })
  },

  getstudentid: function (event){
    this.setData({
      studentid:event.detail
    })
  },

  theproblem: function (event){
    this.setData({
      problem:event.detail
    })
  },
  

  onClose() {
    this.setData({ close: false });
  },

  submit:function(){
    
    this.setData({
      show:true
    })
    db.collection('problem').add({
      data:{
        classinfo:this.data.classinfo,
        username:this.data.username,
        studentid:this.data.studentid,
        problem:this.data.problem,
        type:this.data.choice,
        time:this.data.time
      }
    }).then(res=>{
      wx.showToast({
        title: '提交成功',
        icon:"success",
        duration:1000
      })
      console.log(res)
      console.log("提交问题成功")
      console.log(`${this.data.username}你的问题是${this.data.problem}`)
      this.setData({
        classinfo:'',
        studentid:'',
        problem:'',
        username:'',
        choice:''
      })
    }).catch(err=>{
      console.error(err)
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
  
/**
 * 弹出层
 */
showPopup() {
  this.setData({ popShow: true });
  },

  onClose() {
    this.setData({ popShow: false });
  },

  /**
   * 选择展示的问题
   */
  handleChoice:function(event){
    const index = event.currentTarget.dataset.index;
    if(index==0){
      this.useProblem("场地租借")
    }else if(index==1){
      this.useProblem("情感话题")
    } else if (index == 2) {
      this.useProblem("近期活动")
    } else if (index == 3) {
      this.useProblem("外联任务")
    } else if (index == 4) {
      this.useProblem("入党入团")
    }else{
      this.useProblem("社团活动")
    }
  },
  /**
   * 调用页面加载的问题类型
   */
  useProblem:function(problemType){
    db.collection('problem').where({
      type: problemType
    })
      .get().then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        this.setData({
          problems: res.data
        })
      })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('problem').where({
      type: '场地租借'
    })
      .get().then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        this.setData({
          problems: res.data
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
  
})




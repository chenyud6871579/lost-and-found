var util = require('../../util/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [], //选择图片
    fileIDs: [], //上传云存储后的返回值
    type:'lostfound',
    isChecked: false,
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['卡类/证照','数码产品','钱包/钱','钥匙','手袋/挎包','衣服/鞋帽','首饰/挂饰','行李/包裹','书籍/文件','其他'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    selectText:"请选择",
    position: '八里台'
  },
 // 点击下拉显示框
 selectTap(){
  this.setData({
   show: !this.data.show
  });
  },
  // 点击下拉列表
  optionTap(event){
  let Index=event.currentTarget.dataset.index;//获取点击的下拉列表的下标
  console.log("selector发生change事件，携带value值为：", this.data.selectData[Index])
  this.setData({
   index:Index,
   show:!this.data.show,
   selectText:this.data.selectData[Index],
   kind:this.data.selectData[Index]
  });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '拾物发布'
    })
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          user: res.data
        })
      },
    })
  },

  pName(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      pName: event.detail.value
    })
  },
  pCall(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      pCall: event.detail.value
    })
  },
  pWechat(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      pWechat: event.detail.value
    })
  },
  name(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      name: event.detail.value
    })
  },
  price(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      price: event.detail.value
    })
  },
  info(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      info: event.detail.value
    })
  },
  position(event) {
    console.log("radio发生change事件，携带value值为：", event.detail.value)
    this.setData({
      position: event.detail.value
    })
  },
  pQQnum(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      pQQnum: event.detail.value
    })
  },
  // 删除照片 &&
  imgDelete1: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addPic1: function(e) {
    var imgbox = this.data.imgbox;
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },
  serviceSelection(){
    this.setData({
      isChecked:true
    })
},
   //发布按钮
   fb: function(e) {
    if (this.data.type == 'lostlost') {
      var room = 'lost'
    } else if (this.data.type == 'lostfound') {
      var room = 'found'
    } else {
      var room = 'xianzhi'
    }

    console.log(room)
    if (!this.data.imgbox.length) {
      wx.showToast({
        icon: 'none',
        title: '图片内容为空'
      });
    } else {
      //上传图片到云存储
      wx.showLoading({
        title: '上传中',
      })
      let promiseArr = [];
      for (let i = 0; i < this.data.imgbox.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {

          let item = this.data.imgbox[i];
          let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名

          var that = this
          const fileContent = wx.getFileSystemManager().readFileSync(item, 'base64');
          wx.cloud.callFunction({
            name: 'img',
            data: {
              fileContent: fileContent,
              cloudPath: new Date().getTime() + suffix
            },
            success: function(res) {
              that.setData({
                fileIDs: that.data.fileIDs.concat(res.result.fileID)
              });
              console.log(res.result.fileID) //输出上传后图片的返回地址
              wx.cloud.callFunction({
                name: 'face',
                data: {
                  myfileID:res.result.fileID
                },
                success: res => {
                  console.log(1)
                  console.log(res.result)
                  console.log(1)
                  
                  that.setData({
                    fileIDs: []
                  });

                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: '检测到发布内容包含个人隐私，请重新填写发布内容',
                    success (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                },
                fail:res => {
                  console.log(1)
                  console.log(res.result)
                  console.log(1)

                  reslove();
                  wx.showToast({
                    title: "上传成功",
                  })
                }
              })
            },
            fail: function(res) {
              console.log(res)
              // wx.hideLoading();
              wx.showToast({
                icon: 'none',
                title: "上传失败",
              })
            }
          })
        }));
      }
      Promise.all(promiseArr).then(res => { //等数组都做完后做then方法
        wx.cloud.callFunction({
          name: 'send',
          data: {
            room,
            fileIDs: this.data.fileIDs,
            sendTime: util.formatTime(new Date()),
            pName: this.data.pName,
            pCall: this.data.pCall,
            pWechat: this.data.pWechat,
            position: this.data.position,
            pQQnum: this.data.pQQnum,
            kind:this.data.kind,
            name: this.data.name,
            price: this.data.price,
            info: this.data.info,
            images: this.data.imgbox,
            touxiang: this.data.user.avatarUrl,
            userName: this.data.user.nickName
          },
          success: res => {
            // wx.hideLoading()
            wx.showToast({
              title: '发布成功',
            })
            console.log('发布成功', res)
            wx.navigateBack({
            })
          },
          fail: err => {
            // wx.hideLoading()
            wx.showToast({
              icon: 'none',
              title: '网络不给力....'
            })
            console.error('发布失败', err)
          }
        })
      })

    }
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
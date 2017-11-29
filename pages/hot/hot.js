var app = getApp()
Page({
  data: {
    imgUrls: [
      {
        link: '/pages/new/new',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        link: '/pages/care/care',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
        link: '/pages/mine/mine',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    userInfo: {},
    hotData: {},
    dataReady: false,
    smallImgs: [] // 小的图片的路径
  },
  onLoad: function () {
    this.getHotData();
  },
  getHotData () {
    var vm = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      method: 'GET',
      header: {
        "content-type": "json"
      },
      data: {
        city: '成都'
      },
      success: function (res) {
        if(res.statusCode === 200) {
          vm.data.hotData = res.data;
          var imgs = [], simgs = [];
          for (var item of vm.data.hotData.subjects.slice(0, 3)) {
            var imgObj = {url: item.images.small}
            imgs.push(imgObj)
          }
          
          for (var sImgs of vm.data.hotData.subjects) {
            var sImgObj = { url: sImgs.images.small, id: sImgs.id, intro: sImgs.title, year: sImgs.year, avg: sImgs.rating.average, stars: sImgs.rating.stars}
            simgs.push(sImgObj);
          }
          vm.setData({
            dataReady: true,
            imgUrls: imgs,
            smallImgs: simgs
          })
          wx.setNavigationBarTitle({
            title: res.data.title
          })
        }
      }
    })
  }
})  
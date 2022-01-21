const { envList } = require('../../envList.js');

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '数据结构',
      tip: '数据结构是计算机存储、组织数据的方式。',
      showItem: false,
      item: [{
        title: '线性结构',
        page: 'n1n1'
      },
       {
        title: '非线性结构',
        page: 'n1n2'
      },
      {
        title: '网盘资料',
        page: 'n1n3'
      },
    ]
    }, 
    {
      title: '离散数学',
      tip: '研究离散量的结构及其相互关系的数学学科。',
      showItem: false,
      item: [{
        title: '基本概念',
        page: 'n2n1',
      }, {
        title: '网盘资料',
        page: 'n2n2'
      }, ]
    }, 
    {
      title: '计算机组成',
      tip: '机器机内的数据流和控制流的组成及逻辑设计等。',
      showItem: false,
      item: [{
        title: '基本概念',
        page: 'n3n1'
      }, {
        title: '网盘资料',
        page: 'n3n2'
      }, ]
    },
    {
      title: '计算机网络',
      tip: '一些相互连接的、以共享资源为目的的计算机的集合。',
      showItem: false,
      item: [{
        title: '基本概念',
        page: 'n4n1'
      }, {
        title: '网盘资料',
        page: 'n4n2'
      }, ]
    },
  ],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },
  
  onClickPowerInfo(e) {
    wx.showShareMenu()
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showShareMenu()
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    wx.showShareMenu()
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.showShareMenu()
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index`,
    });
  },

  onClickDatabase(powerList) {
    wx.showShareMenu()
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  }
});

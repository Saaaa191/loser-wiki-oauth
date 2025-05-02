App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'loser-1alpha-1go717lefdd83db5', // 替换为你的环境ID
        traceUser: true
      })
    }

    this.autoLogin()
  },

  autoLogin: function() {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        if (res.result.success) {
          // 存储用户信息
          wx.setStorageSync('userInfo', res.result.userInfo)
          
          if (res.result.isNew) {
            wx.showToast({
              title: '欢迎新用户',
              icon: 'success'
            })
          }
        } else {
          console.error('登录失败:', res.result.message)
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        console.error('调用登录云函数失败:', err)
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  globalData: {
    userInfo: null
  }
}) 
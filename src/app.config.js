export default defineAppConfig({
  pages: [
    'pages/home-music/index',
    'pages/home-video/index',
    'pages/home-shop/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home-music/index',
        text: '首页',
        iconPath: 'assets/images/tabbar/music_normal.png',
        selectedIconPath: 'assets/images/tabbar/music_active.png'
      },
      {
        pagePath: 'pages/home-video/index',
        text: '视屏',
        iconPath: 'assets/images/tabbar/video_normal.png',
        selectedIconPath: 'assets/images/tabbar/video_active.png'
      },
      {
        pagePath: 'pages/home-shop/index',
        text: '商城',
        iconPath: 'assets/images/tabbar/shop_normal.png',
        selectedIconPath: 'assets/images/tabbar/shop_active.png'
      }
    ]
  }
})

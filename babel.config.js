// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  sourceMap: true,
  plugins: [
    [
      'import',
      {
        libraryName: 'taro-hooks',
        camel2DashComponentName: false
      },
      'taro-hooks'
    ],
    [
      'import',
      {
        libraryName: '@icon-park/react',
        libraryDirectory: 'es/icons',
        camel2DashComponentName: false
      }
    ],
    [
      'import',
      {
        libraryName: '@taroify/core',
        libraryDirectory: '',
        style: true
      },
      '@taroify/core'
    ],
    [
      'import',
      {
        libraryName: '@taroify/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
        style: () => '@taroify/icons/style'
      },
      '@taroify/icons'
    ]
  ],
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: false,
        hot: true
      }
    ]
  ]
}

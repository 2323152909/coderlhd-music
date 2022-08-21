import React, { useCallback, useEffect } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import {
  getBanners,
  getRankings,
  getSongMenu,
  getSongHotMenu,
  getPersonalized,
  getToplist
} from '../../http'
import { Search, SafeArea, Swiper, Navbar } from '@taroify/core'
import CustomNavBar from '../../components/custom-nav-bar'
import './index.less'
import { useImmer } from 'use-immer'

function Index() {
  const [state, setState] = useImmer({
    searchValue: '',
    banners: [],
    playlists: []
  })

  const changeSearchValue = useCallback((e) => {
    setState((state) => {
      state.searchValue = e.detail.value
    })
  }, [])

  const searchConfirm = useCallback((e) => {
    const value = e.detail.value
    console.log(value)
  }, [])

  const getPageData = useCallback(async () => {
    const { banners } = await getBanners()
    console.log(banners)
    const { playlists } = await getSongMenu()
    console.log(playlists)

    setState((state) => {
      state.banners = banners
      state.playlists = playlists
    })
  }, [])

  useEffect(() => {
    getPageData()
  }, [])

  const { searchValue, banners } = state
  return (
    <View className="index">
      <CustomNavBar title="音乐首页" />
      <SafeArea position="top" />
      <Search
        value={searchValue}
        placeholder="请输入搜索关键词"
        onChange={changeSearchValue}
        shape="rounded"
        onSearch={searchConfirm}
      />
      <Swiper className="basic-swiper" autoplay={3000}>
        <Swiper.Indicator />
        {banners.map((item) => {
          return (
            <Swiper.Item key={item.bannerId}>
              <Image src={item.pic}></Image>
            </Swiper.Item>
          )
        })}
      </Swiper>
      <SafeArea position="bottom" />
    </View>
  )
}

export default Index

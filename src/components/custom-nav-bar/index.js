import React, { useCallback, useMemo } from 'react'
import { Navbar } from '@taroify/core'
import Taro from '@tarojs/taro'

const { NavLeft, NavRight, Title } = Navbar

function Index(props) {
  // 判断环境是否为h5，为h5则不展示导航栏
  const type = Taro.getEnv()
  if (type !== 'WEB') return ''

  const {
    title = 'CodlhdMusic',
    hasLeft = false,
    leftText,
    onJump,
    rightContent
  } = props

  const leftJump = useCallback(() => {
    if (onJump) {
      onJump()
    } else {
      Taro.navigateBack()
    }
  }, [])

  const Left = useMemo(() => {
    if (!hasLeft) return
    return <NavLeft onClick={leftJump}>{leftText}</NavLeft>
  }, [leftJump, leftText, hasLeft])

  return (
    <Navbar fixed>
      {Left}
      <Title>{title}</Title>
      <NavRight>{rightContent}</NavRight>
    </Navbar>
  )
}

export default Index

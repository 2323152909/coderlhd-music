import Api from './request'

/**
 * 获取轮播图数据
 * type为资源类型0: pc 1: android 2: iphone 3: ipad
 * @param {Number} type
 */
export function getBanners(type = 2) {
  return Api.get('/banner', {
    type
  })
}

/**
 * 获取歌曲排行
 * @param {Number} idx
 */
export function getRankings(id) {
  return Api.get('/top/list', {
    id
  })
}

/**
 * 获取歌单
 * order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param {Number} offset
 * @param {Number} limit
 * @param {String} order
 */
export function getSongMenu(
  cat = '全部',
  offset = 0,
  limit = 6,
  order = 'hot'
) {
  return Api.get('/top/playlist', {
    offset,
    limit,
    order,
    cat
  })
}

/**
 * 获取热门歌单分类
 */
export function getSongHotMenu() {
  return Api.get('/playlist/hot')
}

/**
 * 获取歌单详细列表
 * @param {Number} id
 */
export function getgetSongMenuDetail(id) {
  return Api.get('/playlist/track/all', {
    id
  })
}

/**
 * 获取歌单详情信息
 * @param {Number} id
 */
export function getPlaylistDetail(id) {
  return Api.get('/playlist/detail', {
    id
  })
}

/**
 * 获取歌单详情信息
 * @param {Number} id
 */
export function getPlaylistDetailDynamic(id) {
  return Api.get('/playlist/detail/dynamic', {
    id
  })
}

/**
 * 获取个性推荐歌单
 * @param {Number} limit
 */
export function getPersonalized(limit = 30) {
  return Api.get('/personalized', {
    limit
  })
}

/**
 * 获取素有榜单
 */
export function getToplist() {
  return Api.get('/toplist')
}

import Api from './request'

// 获取热门搜索关键词
export function getSearchHot() {
  return Api.get('/search/hot')
}

/**
 * 获取搜索建议
 * 必选参数 :`keywords` : 关键词
 * 可选参数 :`type` : 如果传 'mobile' 则返回移动端数据
 * @param {String} keywords
 * @param {String} type
 */
export function getSearchSuggest(keywords, type = 'mobile') {
  return Api.get('/search/suggest', {
    keywords,
    type
  })
}

/**
 * 搜索接口
 * 必选参数 : `keywords` : 关键词
 * 可选参数 : `limit` : 返回数量 , 默认为 30
 * `offset` : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * `type`: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * 接口地址 : `/search` 或者 `/cloudsearch`(更全)
 * @param {String} keywords
 */
export function getSearchData(keywords) {
  return Api.get('/cloudsearch', {
    keywords
  })
}

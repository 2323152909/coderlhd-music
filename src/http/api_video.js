import Api from './request'

export function getTopMV(offset, limit = 10) {
  return Api.get('/top/mv', {
    offset,
    limit
  })
}

/**
 * 获取mv数据
 * @param {Number} mvid
 */
export function getMVData(mvid) {
  return Api.get('/mv/detail', {
    mvid
  })
}

/**
 * 获取mv地址
 * @param {Number} id
 */
export function getMVUrl(id) {
  return Api.get('/mv/url', {
    id
  })
}
/**
 * 获取相关推荐视频
 * @param {Number} id
 */
export function getMVRelated(id) {
  return Api.get('/related/allvideo', {
    id
  })
}
